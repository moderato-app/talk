package internal

import (
	"context"
	"fmt"
	"time"

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
	var stts []client.SpeechToText
	var ttss []client.TextToSpeech

	// choose an LLMAb provider
	if cfg := tc.Llm.OpenAIChatGPT; cfg.APIKey != "" {
		// by default, the underlying http.Client utilizes the proxy from the environment.
		c := openai.NewClient(cfg.APIKey)
		llms = append(llms, &providers.ChatGPT{
			Client: c,
			Logger: logger,
		})
	}

	if cfg := tc.TextToSpeech.ElevenLabs; cfg.APIKey != "" {
		// elevenlabs.Client create a new http.Client everytime it makes a request
		// by default, the underlying http.Client utilizes the proxy from the environment.
		c := elevenlabs.NewClient(ctx, cfg.APIKey, 30*time.Second)
		ttss = append(ttss, &providers.ElevenLabs{
			Client: c,
			Logger: logger,
		})
	}

	if cfg := tc.TextToSpeech.GoogleTextTOSpeech; cfg.ServiceAccountJson != "" {
		// by default, the underlying http.Client utilizes the proxy from the environment.
		c, err := texttospeech.NewClient(ctx, option.WithCredentialsJSON([]byte(cfg.ServiceAccountJson)))
		if err != nil {
			return nil, fmt.Errorf("failed to initialise Google text-to-speech client: %v", err)
		}
		ttss = append(ttss, &providers.GoogleTTS{Client: c, Logger: logger})
	}

	// choose a speech-to-text provider
	if cfg := tc.SpeechToText.OpenAIWhisper; cfg.APIKey != "" {
		// by default, the underlying http.Client utilizes the proxy from the environment.
		c := openai.NewClient(cfg.APIKey)
		stts = append(stts, &providers.Whisper{Client: c, Logger: logger})
	}

	talker := Talker{llms, stts, ttss, logger}
	return &talker, nil
}

// ProvidersMustFunction performs a request to each provider in the process server initialization.
//
//	Shutdown the server by panic() if there are any errors, such as invalid API key or connection error.
//	Log a warning if there are any issues, such as quota exhaustion or incorrect transcriptions, indicating a potential problem
//	These requests consume a minimal amount of quota or even no quota.
//
// todo refactor this into status checking and do not panic, display output on a simple page for troubleshooting purposes
func (t *Talker) ProvidersMustFunction() {
	//ctx := context.Background()
	//for _, v := range t.llmProviders {
	//	v.MustFunction(ctx)
	//}
	//for _, v := range t.ttsProviders {
	//	v.MustFunction(ctx)
	//}
	//for _, v := range t.sstProviders {
	//	v.MustFunction(ctx)
	//}
}

func (t *Talker) Ability(ctx context.Context) (ability.Ability, error) {
	ab, ok := TalkCache.GetAbility()
	if ok {
		return ab, nil
	}
	ab = ability.Ability{}
	var es []error
	for _, llm := range t.llmProviders {
		err := llm.SetAbility(ctx, &ab.LLM)
		if err != nil {
			es = append(es, err)
			t.logger.Sugar().Error("failed to get LLM Ability", err)
		}
	}
	for _, tts := range t.ttsProviders {
		err := tts.SetAbility(ctx, &ab.TTS)
		if err != nil {
			es = append(es, err)
			t.logger.Sugar().Error("failed to get text-to-speech Ability", err)
		}
	}
	for _, stt := range t.sstProviders {
		err := stt.SetAbility(ctx, &ab.STT)
		if err != nil {
			es = append(es, err)
			t.logger.Sugar().Error("failed to get speech-to-text Ability", err)
		}
	}
	TalkCache.PutAbility(ab)
	return ab, nil
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
