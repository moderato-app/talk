package internal

import (
	"context"
	"sync"
	"time"

	demo "github.com/proxoar/talk-demo-resource/v2"
	"github.com/proxoar/talk/internal/config"
	"github.com/proxoar/talk/pkg/ability"
	"github.com/proxoar/talk/pkg/client"
	"github.com/proxoar/talk/pkg/providers"
	"go.uber.org/zap"
)

type Talker struct {
	llmProviders []client.LLM
	sstProviders []client.SpeechToText
	ttsProviders []client.TextToSpeech
	logger       *zap.Logger
}

func NewTalker(tc config.TalkConfig, logger *zap.Logger) (*Talker, error) {
	var llms []client.LLM
	var ttss []client.TextToSpeech
	var stts []client.SpeechToText
	if tc.Server.DemoMode {
		pool, err := demo.NewResourcePool()
		if err != nil {
			return nil, err
		}
		llm := providers.NewChatGPTDemo(pool, logger)
		llms = append(llms, llm)
		tts := providers.NewElevenlabsDemo(pool, logger)
		ttss = append(ttss, tts)
		stt := providers.NewWhisperDemo(logger)
		stts = append(stts, stt)
	} else {

		if apiKey, ok := tc.Creds[tc.Llm.ChatGPT]; ok {
			llm := providers.NewChatGPT(apiKey, logger)
			llms = append(llms, llm)
		}

		if apiKey, ok := tc.Creds[tc.TextToSpeech.ElevenLabs]; ok {
			tts := providers.NewElevenLabs(apiKey, logger)
			ttss = append(ttss, tts)
		}

		if accountJson, ok := tc.Creds[tc.TextToSpeech.Google]; ok {
			tts, err := providers.NewGoogleTTS(accountJson, logger)
			if err != nil {
				return nil, err
			}
			ttss = append(ttss, tts)
		}

		if apiKey, ok := tc.Creds[tc.SpeechToText.Whisper]; ok {
			whisper := providers.NewWhisper(apiKey, logger)
			stts = append(stts, whisper)
		}

		if accountJson, ok := tc.Creds[tc.SpeechToText.Google]; ok {
			stt, err := providers.NewGoogleSTT(accountJson, logger)
			if err != nil {
				return nil, err
			}
			stts = append(stts, stt)
		}
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
