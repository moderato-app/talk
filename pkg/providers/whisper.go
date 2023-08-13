package providers

import (
	"context"
	"github.com/pkg/errors"
	"github.com/sashabaranov/go-openai"
	"go.uber.org/zap"
	"io"
)

const (
	defaultFileName = "audio.wav"
)

type Whisper struct {
	Client *openai.Client
	Logger *zap.Logger
}

func (c *Whisper) Quota(_ context.Context) (used, total int, err error) {
	// openai.Client doesn't support billing query
	return 0, 0, nil
}

func (c *Whisper) Transcribe(ctx context.Context, r io.Reader) (string, error) {
	c.Logger.Info("transcribe...")
	// File uploads are currently limited to 25 MB and the following input file types are supported: mp3, mp4, mpeg, mpga, m4a, wav, and webm.
	// see https://platform.openai.com/docs/guides/speech-to-text/introduction
	resp, err := c.Client.CreateTranscription(
		ctx,
		openai.AudioRequest{
			Model:    openai.Whisper1,
			FilePath: defaultFileName,
			Reader:   r,
		},
	)

	if err != nil {
		return "", errors.Wrap(err, "")
	}
	c.Logger.Sugar().Debug("transcribe result", resp)
	transcription := resp.Text
	c.Logger.Sugar().Info("transcription text:", transcription)
	return transcription, nil
}
