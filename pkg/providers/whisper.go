package providers

import (
	"context"
	"errors"
	"io"
	"sort"
	"strings"

	resource "github.com/proxoar/talk"
	"github.com/proxoar/talk/pkg/ability"
	"github.com/sashabaranov/go-openai"
	"go.uber.org/zap"
)

type Whisper struct {
	Client *openai.Client
	Logger *zap.Logger
}

func (c *Whisper) MustFunction(_ context.Context) {
	voice, fileName, err := resource.HelloVoice()
	o := ability.STTOption{
		Whisper: &ability.WhisperOption{Model: openai.Whisper1},
	}
	trans, err := c.SpeechToText(context.Background(), voice, fileName, o)
	if err != nil {
		c.Logger.Sugar().Panicf("failed to get response Whisper server: %+v", err)
	}
	if !strings.Contains(strings.ToLower(trans), "hello") {
		c.Logger.Warn(`bad smell: transcription from Whisper server does not contains "hello"`)
	}
	c.Logger.Info("Whisper is healthy")
}

func (c *Whisper) Quota(_ context.Context) (used, total int, err error) {
	// openai.Client doesn't support billing query
	return 0, 0, nil
}

func (c *Whisper) SpeechToText(ctx context.Context, audio io.Reader, fileName string, option ability.STTOption) (string, error) {
	c.Logger.Sugar().Infow("transcribe...", "fileName", fileName, "option", option)
	// File uploads are currently limited to 25 MB and the following input file types are supported: mp3, mp4, mpeg, mpga, m4a, wav, and webm.
	// see https://platform.openai.com/docs/guides/speech-to-text/introduction
	resp, err := c.Client.CreateTranscription(
		ctx,
		openai.AudioRequest{
			Model:    option.Whisper.Model,
			FilePath: fileName,
			Reader:   audio,
		},
	)

	if err != nil {
		return "", err
	}
	c.Logger.Sugar().Info("transcribe result text length:", len(resp.Text))
	if len(resp.Text) == 0 {
		return "", errors.New("content of transcription is empty: " + err.Error())
	}
	transcription := resp.Text
	return transcription, nil
}

// SetAbility set `WhisperAb` and `available` field of ability.STTAb
func (c *Whisper) SetAbility(ctx context.Context, a *ability.STTAb) error {
	models, err := c.setModels(ctx)
	if err != nil {
		return err
	}
	a.Whisper = ability.WhisperSTTAb{
		Available: true,
		Models:    models,
	}
	a.Available = true
	return nil
}

// Support
//
// read ability.STTOption to check if current provider support the option
func (c *Whisper) Support(o ability.STTOption) bool {
	return o.Whisper != nil
}

func (c *Whisper) setModels(ctx context.Context) ([]string, error) {
	c.Logger.Info("get models...")
	ml, err := c.Client.ListModels(ctx)
	if err != nil {
		return nil, err
	}
	models := make([]string, 0, len(ml.Models))
	for i := 0; i < len(ml.Models); i++ {
		if strings.Contains(ml.Models[i].ID, "whisper") {
			models = append(models, ml.Models[i].ID)
		}
	}
	sort.Strings(models)
	return models, err
}
