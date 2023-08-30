package internal

import (
	"context"
	"errors"
	"fmt"
	"time"

	texttospeech "cloud.google.com/go/texttospeech/apiv1"
	"github.com/haguro/elevenlabs-go"
	"github.com/proxoar/talk/internal/config"
	"github.com/proxoar/talk/pkg/client"
	"github.com/proxoar/talk/pkg/providers"
	"github.com/proxoar/talk/pkg/providers/chatgpt"
	"github.com/sashabaranov/go-openai"
	"go.uber.org/zap"
	"google.golang.org/api/option"
)

type Talker struct {
	client.LLM
	client.SpeechToText
	client.TextToSpeech
	Logger *zap.Logger
}

func NewTalker(ctx context.Context, tc config.TalkConfig, logger *zap.Logger) (*Talker, error) {
	var llm client.LLM
	var stt client.SpeechToText
	var tts client.TextToSpeech

	// choose an LLM provider
	if cfg := tc.Llm.OpenAIChatGPT; cfg.APIKey != "" {
		// by default, the underlying http.Client utilizes the proxy from the environment.
		c := openai.NewClient(cfg.APIKey)
		llm = &chatgpt.ChatGPT{
			Client: c,
			Logger: logger,
		}
	} else {
		return nil, errors.New("no LLM provider was found")
	}

	// choose a text-to-speech provider
	if cfg := tc.TextToSpeech.ElevenLabs; cfg.APIKey != "" {
		// elevenlabs.Client create a new http.Client everytime it makes a request
		// by default, the underlying http.Client utilizes the proxy from the environment.
		c := elevenlabs.NewClient(ctx, cfg.APIKey, 30*time.Second)
		tts = &providers.ElevenLabs{
			Client:    c,
			Stability: cfg.Stability,
			Clarity:   cfg.Clarity,
			Logger:    logger,
		}
	} else if cfg := tc.TextToSpeech.GoogleTextTOSpeech; cfg.PathToServiceAccountKeyFile != "" {
		// by default, the underlying http.Client utilizes the proxy from the environment.
		c, err := texttospeech.NewClient(ctx, option.WithCredentialsFile(cfg.PathToServiceAccountKeyFile))
		if err != nil {
			return nil, fmt.Errorf("failed to initialise Google text-to-speech client: %v", err)
		}
		tts = &providers.GoogleTTS{Client: c, Logger: logger}
	} else {
		return nil, errors.New("no text-to-speech provider was found")
	}

	// choose a speech-to-text provider
	if cfg := tc.SpeechToText.OpenAIWhisper; cfg.APIKey != "" {
		// by default, the underlying http.Client utilizes the proxy from the environment.
		c := openai.NewClient(cfg.APIKey)
		stt = &providers.Whisper{Client: c, Logger: logger}
	} else {
		return nil, errors.New("no speech-to-text provider was found")
	}

	talker := Talker{llm, stt, tts, logger}
	return &talker, nil
}

// ProvidersMustFunction performs a startup request to each provider of speech-to-text, ext-to-speech, and llm upon server initialization.
//
//	Shutdown the server if there are any errors, such as invalid API key or connection error.
//	Log a warning if there are any issues, such as quota exhaustion or incorrect transcriptions, indicating a potential problem
//	These requests consume a minimal amount of quota or even no quota.
func (t *Talker) ProvidersMustFunction() {
	ctx := context.Background()
	t.LLM.MustFunction(ctx)
	t.SpeechToText.MustFunction(ctx)
	t.TextToSpeech.MustFunction(ctx)
}
