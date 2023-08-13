package internal

import (
	"context"
	resource "github.com/bubblelight/talk"
	"github.com/bubblelight/talk/internal/config"
	"github.com/bubblelight/talk/pkg/providers"
	"github.com/haguro/elevenlabs-go"
	"github.com/pkg/errors"
	"github.com/sashabaranov/go-openai"
	"go.uber.org/zap"
	"strings"
	"time"
)

type Talker struct {
	providers.LLM
	providers.ToText
	providers.ToSpeech
	Logger *zap.Logger
}

func NewTalker(ctx context.Context, tc config.TalkConfig, logger *zap.Logger) (*Talker, error) {
	var llm providers.LLM
	var toText providers.ToText
	var toSpeech providers.ToSpeech

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
		toSpeech = &providers.ElevenLabs{
			Client:     client,
			Expressive: c.Expressive,
			Clarity:    c.Clarity,
			Logger:     logger,
		}
	} else {
		return nil, errors.New("no text-to-speech provider was found")
	}

	// choose a speech-to-text provider
	if c := tc.SpeechToText.OpenAIWhisper; c.APIKey != "" {
		// the underlying http.Client uses proxy from environment by default
		client := openai.NewClient(c.APIKey)
		toText = &providers.Whisper{Client: client, Logger: logger}
	} else {
		return nil, errors.New("no speech-to-text provider was found")
	}

	talker := Talker{llm, toText, toSpeech, logger}
	return &talker, nil
}

// MustCheckProviders performs a startup request to each provider of speech-to-text, ext-to-speech, and llm upon server initialization.
//
//	Shutdown the server if there are any errors, such as invalid API key or connection error.
//	Log a warning if there are any issues, such as quota exhaustion or incorrect transcriptions, indicating a potential problem
//	These requests consume a minimal amount of quota or even no quota.
func (t *Talker) MustCheckProviders() {

	m := providers.Message{
		Role:    "user",
		Content: "Hello!",
	}
	content, err := t.LLM.Complete(context.Background(), []providers.Message{m}, nil)
	if err != nil {
		t.Logger.Sugar().Panicf("failed to get response from LLM server: %+v", err)
	}
	if len(content) == 0 {
		t.Logger.Warn(`bad smell: got empty content from LLM server`)
	}
	t.Logger.Info("LLM is healthy")

	used, total, err := t.ToSpeech.Quota(context.Background())
	if err != nil {
		t.Logger.Sugar().Panicf("failed to get response from text-to-speech server: %+v", err)
	}
	t.Logger.Sugar().Debugf("text-to-speech quota: %d/%d used", used, total)
	if total == 0 || used >= total {
		t.Logger.Warn(`bad smell: text-to-speech quota may has been exhausted`)
	}
	t.Logger.Info("text-to-speech is healthy")

	voice, _, err := resource.HelloVoice()

	trans, err := t.ToText.Transcribe(context.Background(), voice)
	if err != nil {
		t.Logger.Sugar().Panicf("failed to get response speech-to-text server: %+v", err)
	}
	if !strings.Contains(strings.ToLower(trans), "hello") {
		t.Logger.Warn(`bad smell: transcription from speech-to-text server does not contains "hello"`)
	}
	t.Logger.Info("text-to-speech is healthy")
}
