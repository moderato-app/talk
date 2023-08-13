package internal

import (
	texttospeech "cloud.google.com/go/texttospeech/apiv1"
	"context"
	"github.com/bubblelight/talk/internal/config"
	"github.com/bubblelight/talk/pkg/providers"
	"github.com/haguro/elevenlabs-go"
	"github.com/pkg/errors"
	"github.com/sashabaranov/go-openai"
	"go.uber.org/zap"
	"google.golang.org/api/option"
	"time"
)

type Talker struct {
	providers.LLM
	providers.SpeechToText
	providers.TextToSpeech
	Logger *zap.Logger
}

func NewTalker(ctx context.Context, tc config.TalkConfig, logger *zap.Logger) (*Talker, error) {
	var llm providers.LLM
	var stt providers.SpeechToText
	var tts providers.TextToSpeech

	// choose an llm provider
	if c := tc.Llm.OpenAIChatGPT; c.APIKey != "" {
		// the underlying http.Client uses proxy from environment by default
		client := openai.NewClient(c.APIKey)
		llm = &providers.ChatGPT{
			Client:             client,
			Model:              c.Model,
			MaxGenerationToken: c.MaxGenerationToken,
			Logger:             logger,
		}
	} else {
		return nil, errors.New("no LLM provider was found")
	}

	// choose a text-to-speech provider
	if c := tc.TextToSpeech.ElevenLabs; c.APIKey != "" {
		// elevenlabs.Client create a new http.Client everytime it makes a request
		// it uses proxy from environment by default
		client := elevenlabs.NewClient(ctx, c.APIKey, 30*time.Second)
		tts = &providers.ElevenLabs{
			Client:    client,
			Stability: c.Stability,
			Clarity:   c.Clarity,
			Logger:    logger,
		}
	} else if c := tc.TextToSpeech.GoogleTextTOSpeech; c.PathToServiceAccountKeyFile != "" {
		// todo if proxy is not supported, use http client instead
		client, err := texttospeech.NewClient(ctx, option.WithCredentialsFile(c.PathToServiceAccountKeyFile))
		if err != nil {
			return nil, errors.Wrap(err, "failed to initialise Google text-to-speech client")
		}
		tts = &providers.GoogleTTS{Client: client, Logger: logger}
	} else {
		return nil, errors.New("no text-to-speech provider was found")
	}

	// choose a speech-to-text provider
	if c := tc.SpeechToText.OpenAIWhisper; c.APIKey != "" {
		// the underlying http.Client uses proxy from environment by default
		client := openai.NewClient(c.APIKey)
		stt = &providers.Whisper{Client: client, Logger: logger}
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
