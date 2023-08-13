package providers

import (
	"context"
	"io"
)

type Quota interface {
	// Quota return usage of resources, which may be characters, minutes of voice, balance, etc
	Quota(ctx context.Context) (used, total int, err error)
}

type MustFunction interface {
	// MustFunction performs a request to server and PANICS if there are severe error such as invalid API key, connection error, etc.
	// Error should be logged before panicking.
	// Warning should be logged if there are any issues(bad smell), such as quota exhaustion or incorrect transcriptions.
	// This request consumes a minimal amount of quota or even no quota.
	MustFunction(ctx context.Context)
}

type TextToSpeech interface {
	MustFunction
	Quota
	TextToSpeech(ctx context.Context, text string, voiceId string, o VOption) ([]byte, error)
}

type Voice struct {
	Id         string
	Name       string
	Lang       string
	Accent     string
	Gender     string
	PreviewUrl string
	Labels     map[string]string
}

type VOption struct {
	LanguageCode string
	Gender       string
	SpeakingRate float64
	Pitch        float64
	VolumeGainDb float64
	Stability    float32
	Clarity      float32
}

type SpeechToText interface {
	MustFunction
	Quota
	// SpeechToText transcribes voice into text
	SpeechToText(ctx context.Context, r io.Reader) (string, error)
}

type LLM interface {
	MustFunction
	Quota
	Complete(ctx context.Context, ms []Message, o *COption) (string, error)
}

type Message struct {
	Role    string `json:"role"` // options: system, user, assistant and function
	Content string `json:"content"`
}

type COption struct {
	Model              string // optional
	MaxGenerationToken int    // optional
}
