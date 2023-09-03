package providers

import (
	"context"
	"errors"
	"io"
	"strings"

	resource "github.com/proxoar/talk"

	"github.com/sashabaranov/go-openai"
	"go.uber.org/zap"
)

type Whisper struct {
	Client *openai.Client
	Logger *zap.Logger
}

func (c *Whisper) MustFunction(_ context.Context) {
	voice, fileName, err := resource.HelloVoice()

	trans, err := c.SpeechToText(context.Background(), voice, fileName)
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

func (c *Whisper) SpeechToText(ctx context.Context, audio io.Reader, fileName string) (string, error) {
	c.Logger.Sugar().Infow("transcribe...", "fileName", fileName)
	// File uploads are currently limited to 25 MB and the following input file types are supported: mp3, mp4, mpeg, mpga, m4a, wav, and webm.
	// see https://platform.openai.com/docs/guides/speech-to-text/introduction
	resp, err := c.Client.CreateTranscription(
		ctx,
		openai.AudioRequest{
			Model:    openai.Whisper1,
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
