package client

import (
	"context"
	"io"

	"github.com/proxoar/talk/pkg/ability"
)

type Voice struct {
	Id         string
	Name       string
	Lang       string
	Accent     string
	Gender     string
	PreviewUrl string
	Labels     map[string]string
}

type SpeechToText interface {
	// SpeechToText transcribes voice into text
	SpeechToText(ctx context.Context, audio io.Reader, fileName string, option ability.STTOption) (string, error)
	SetAbility(ctx context.Context, a *ability.STTAb) error
	// Support
	//
	// read ability.STTOption to check if current provider support the option
	Support(o ability.STTOption) bool
}
