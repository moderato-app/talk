package client

import (
	"context"
	"io"

	"github.com/proxoar/talk/pkg/ability"
)

type SpeechToText interface {
	Client
	// SpeechToText transcribes voice into text
	SpeechToText(ctx context.Context, audio io.Reader, fileName string, option ability.STTOption) (string, error)
	SetAbility(ctx context.Context, a *ability.STTAblt) error
	// Support
	//
	// read ability.STTOption to check if current provider support the option
	Support(o ability.STTOption) bool
}
