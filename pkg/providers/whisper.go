package providers

import (
	"context"
	"errors"
	"io"
	"sort"
	"strings"

	resource "github.com/proxoar/talk"
	"github.com/proxoar/talk/pkg/ability"
	"github.com/proxoar/talk/pkg/client"
	"github.com/sashabaranov/go-openai"
	"go.uber.org/zap"
)

type whisper struct {
	client *openai.Client
	logger *zap.Logger
}

func NewWhisper(apiKey string, logger *zap.Logger) client.SpeechToText {
	// by default, the underlying http.client utilizes the proxy from the environment.
	c := openai.NewClient(apiKey)

	return &whisper{
		client: c,
		logger: logger,
	}
}

func (w *whisper) CheckHealth(_ context.Context) {
	voice, fileName, err := resource.HelloVoice()
	o := ability.STTOption{
		Whisper: &ability.WhisperOption{Model: openai.Whisper1},
	}
	trans, err := w.SpeechToText(context.Background(), voice, fileName, o)
	if err != nil {
		w.logger.Sugar().Errorf("[Whisper] failed to get response from server: %+v", err)
	} else if !strings.Contains(strings.ToLower(trans), "hello") {
		w.logger.Warn(`[Whisper] bad smell: transcription from Whisper server does not contains "hello"`)
	} else {
		w.logger.Info("[Whisper]  is healthy")
	}
}

func (w *whisper) Quota(_ context.Context) (used, total int, err error) {
	// openai.client doesn't support billing query
	return 0, 0, nil
}

func (w *whisper) SpeechToText(ctx context.Context, audio io.Reader, fileName string, option ability.STTOption) (string, error) {
	w.logger.Sugar().Infow("transcribe...", "fileName", fileName, "option", option)
	// File uploads are currently limited to 25 MB and the following input file types are supported: mp3, mp4, mpeg, mpga, m4a, wav, and webm.
	// see https://platform.openai.com/docs/guides/speech-to-text/introduction
	resp, err := w.client.CreateTranscription(
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
	w.logger.Sugar().Info("transcribe result text length:", len(resp.Text))
	if len(resp.Text) == 0 {
		return "", errors.New("content of transcription is empty: " + err.Error())
	}
	transcription := resp.Text
	return transcription, nil
}

// SetAbility set `WhisperAb` and `available` field of ability.STTAblt
func (w *whisper) SetAbility(ctx context.Context, a *ability.STTAblt) error {
	models, err := w.setModels(ctx)
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
func (w *whisper) Support(o ability.STTOption) bool {
	return o.Whisper != nil
}

func (w *whisper) setModels(ctx context.Context) ([]string, error) {
	w.logger.Info("get models...")
	ml, err := w.client.ListModels(ctx)
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
	w.logger.Sugar().Debug("models count:", len(models))
	return models, err
}
