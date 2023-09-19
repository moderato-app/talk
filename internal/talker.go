package internal

import (
	"context"
	"fmt"
	"sync"
	"time"

	resourcemanager "cloud.google.com/go/resourcemanager/apiv3"
	speech "cloud.google.com/go/speech/apiv2"
	texttospeech "cloud.google.com/go/texttospeech/apiv1"
	"github.com/haguro/elevenlabs-go"
	"github.com/proxoar/talk/internal/config"
	"github.com/proxoar/talk/pkg/ability"
	"github.com/proxoar/talk/pkg/client"
	"github.com/proxoar/talk/pkg/providers"
	"github.com/sashabaranov/go-openai"
	"go.uber.org/zap"
	"google.golang.org/api/option"
)

type Talker struct {
	llmProviders []client.LLM
	sstProviders []client.SpeechToText
	ttsProviders []client.TextToSpeech
	logger       *zap.Logger
}

func NewTalker(ctx context.Context, tc config.TalkConfig, logger *zap.Logger) (*Talker, error) {
	var llms []client.LLM
	var ttss []client.TextToSpeech
	var stts []client.SpeechToText

	if apiKey, ok := tc.Creds[tc.Llm.ChatGPT]; ok {
		// by default, the underlying http.Client utilizes the proxy from the environment.
		c := openai.NewClient(apiKey)
		llms = append(llms, &providers.ChatGPT{
			Client: c,
			Logger: logger,
		})
	}

	if apiKey, ok := tc.Creds[tc.TextToSpeech.ElevenLabs]; ok {
		// elevenlabs.Client create a new http.Client everytime it makes a request
		// by default, the underlying http.Client utilizes the proxy from the environment.
		c := elevenlabs.NewClient(ctx, apiKey, 30*time.Second)
		ttss = append(ttss, &providers.ElevenLabs{
			Client: c,
			Logger: logger,
		})
	}

	if accountJson, ok := tc.Creds[tc.TextToSpeech.Google]; ok {
		// by default, the underlying http.Client utilizes the proxy from the environment.
		c, err := texttospeech.NewClient(ctx, option.WithCredentialsJSON([]byte(accountJson)))
		if err != nil {
			return nil, fmt.Errorf("failed to initialise Google text-to-speech client: %v", err)
		}
		ttss = append(ttss, &providers.GoogleTTS{Client: c, Logger: logger})
	}

	if apiKey, ok := tc.Creds[tc.SpeechToText.Whisper]; ok {
		// by default, the underlying http.Client utilizes the proxy from the environment.
		c := openai.NewClient(apiKey)
		stts = append(stts, &providers.Whisper{Client: c, Logger: logger})
	}

	if accountJson, ok := tc.Creds[tc.SpeechToText.Google]; ok {
		// by default, the underlying http.Client utilizes the proxy from the environment.
		speechClient, err := speech.NewClient(ctx, option.WithCredentialsJSON([]byte(accountJson)))
		if err != nil {
			return nil, fmt.Errorf("failed to initialise Google text-to-speech client: %v", err)
		}
		projectClient, err := resourcemanager.NewProjectsClient(ctx, option.WithCredentialsJSON([]byte(accountJson)))
		if err != nil {
			return nil, fmt.Errorf("failed to initialise Google project client: %v", err)
		}
		stts = append(stts, &providers.GoogleSTT{
			SpeechClient:  speechClient,
			ProjectClient: projectClient,
			Logger:        logger,
		})
	}

	talker := Talker{llms, stts, ttss, logger}
	if tc.Server.CheckHealthOnStartup {
		go func() { talker.checkProvidersHealth() }()
	}
	return &talker, nil
}

// checkProvidersHealth performs a request to each provider in the process server initialization.
//
//	Log an error if there are any, such as invalid API key or connection error.
//	Log a warning if there are any issues, such as quota exhaustion or incorrect transcriptions, indicating a potential problem
//	These requests consume a minimal amount of quota or even no quota.
func (t *Talker) checkProvidersHealth() {
	var clients []client.Client
	for _, v := range t.llmProviders {
		clients = append(clients, v)
	}
	for _, v := range t.ttsProviders {
		clients = append(clients, v)
	}
	for _, v := range t.sstProviders {
		clients = append(clients, v)
	}

	var wg sync.WaitGroup
	ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
	defer cancel()
	for _, c := range clients {
		wg.Add(1)
		go func(c_ client.Client) {
			defer wg.Done()
			c_.CheckHealth(ctx)
		}(c)
	}

	wg.Wait()
	err := ctx.Err()
	if err != nil {
		t.logger.Sugar().Error("", err)
	}
}

// Ability
// set ability and bypass any errors that may occur
//
// both the ability and error slice can contain elements simultaneously
// to emphasize this fact, we interchange the positions of errors and items.
func (t *Talker) Ability(ctx context.Context) ([]error, ability.Ability) {
	ab, ok := TalkCache.GetAbility()
	if ok {
		return nil, ab
	}
	ab = ability.Ability{}
	var errs []error
	var errsMu sync.Mutex
	var wg sync.WaitGroup
	for _, p := range t.llmProviders {
		wg.Add(1)
		go func(p_ client.LLM) {
			defer wg.Done()
			err := p_.SetAbility(ctx, &ab.LLM)
			if err != nil {
				errsMu.Lock()
				errs = append(errs, err)
				errsMu.Unlock()
				t.logger.Sugar().Error("failed to get LLM Ability: ", err)
			}
		}(p)
	}
	for _, p := range t.ttsProviders {
		wg.Add(1)
		go func(p_ client.TextToSpeech) {
			defer wg.Done()
			err := p_.SetAbility(ctx, &ab.TTS)
			if err != nil {
				errsMu.Lock()
				errs = append(errs, err)
				errsMu.Unlock()
				t.logger.Sugar().Error("failed to get text-to-speech Ability: ", err)
			}
		}(p)
	}
	for _, p := range t.sstProviders {
		wg.Add(1)
		go func(p_ client.SpeechToText) {
			defer wg.Done()
			err := p_.SetAbility(ctx, &ab.STT)
			if err != nil {
				errsMu.Lock()
				errs = append(errs, err)
				errsMu.Unlock()
				t.logger.Sugar().Error("failed to get speech-to-text Ability: ", err)
			}
		}(p)
	}
	wg.Wait()
	TalkCache.PutAbility(ab)
	return errs, ab
}

func (t *Talker) SelectLLMProvider(o *ability.LLMOption) (llm client.LLM, ok bool) {
	if o == nil {
		return nil, false
	}
	for _, p := range t.llmProviders {
		if p.Support(*o) {
			return p, true
		}
	}
	return nil, false
}

func (t *Talker) SelectTTSProvider(o *ability.TTSOption) (tts client.TextToSpeech, ok bool) {
	if o == nil {
		return nil, false
	}
	for _, p := range t.ttsProviders {
		if p.Support(*o) {
			return p, true
		}
	}
	return nil, false
}

func (t *Talker) SelectSTTProvider(o *ability.STTOption) (tts client.SpeechToText, ok bool) {
	if o == nil {
		return nil, false
	}
	for _, p := range t.sstProviders {
		if p.Support(*o) {
			return p, true
		}
	}
	return nil, false
}
