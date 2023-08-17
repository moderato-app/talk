package client

import (
	"context"
	"io"
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
	MustFunction
	Quota
	// SpeechToText transcribes voice into text
	SpeechToText(ctx context.Context, r io.Reader) (string, error)
}
