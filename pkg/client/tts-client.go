package client

import (
	"context"

	"github.com/proxoar/talk/pkg/ability"
)

type TextToSpeech interface {
	TextToSpeech(ctx context.Context, text string, o ability.TTSOption) ([]byte, error)
	SetAbility(ctx context.Context, a *ability.TTSAblt) error
	// Support
	//
	// read ability.TTSOption to check if current provider support the option
	Support(o ability.TTSOption) bool
}
