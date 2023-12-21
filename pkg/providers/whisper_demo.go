package providers

import (
	"context"
	"io"
	"time"

	"github.com/proxoar/talk/pkg/ability"
	"github.com/proxoar/talk/pkg/client"
	"go.uber.org/zap"
)

var whisperDemoModels = []string{"whisper-1[demo]"}

type whisperDemo struct {
	logger *zap.Logger
}

func NewWhisperDemo(logger *zap.Logger) client.SpeechToText {
	return &whisperDemo{
		logger: logger,
	}
}

func (w *whisperDemo) CheckHealth(_ context.Context) {
}

func (w *whisperDemo) SpeechToText(_ context.Context, _ io.Reader, fileName string, option ability.STTOption) (string, error) {
	w.logger.Sugar().Debugw("transcribe...", "fileName", fileName, "option", option)
	time.Sleep(1 * time.Second)
	return "Greetings! Please share with me any arbitrary subject.", nil
}

// SetAbility set `WhisperAb` and `available` field of ability.STTAblt
func (w *whisperDemo) SetAbility(_ context.Context, a *ability.STTAblt) error {
	a.Whisper = ability.WhisperSTTAb{
		Available: true,
		Models:    whisperDemoModels,
	}
	a.Available = true
	return nil
}

// Support
//
// read ability.STTOption to check if current provider support the option
func (w *whisperDemo) Support(o ability.STTOption) bool {
	return o.Whisper != nil
}
