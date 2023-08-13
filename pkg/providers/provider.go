package providers

import (
	"context"
	"io"
)

type Quota interface {
	// Quota return usage of resources, which may be characters, minutes of voice, balance, etc
	Quota(ctx context.Context) (used, total int, err error)
}

type ToSpeech interface {
	Quota
	TextToSpeech(ctx context.Context, text string, voiceId *string, o *VOption) ([]byte, error)
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
	Expressive int
	Clarity    int
}
type ToText interface {
	Quota
	// Transcribe transcribes voice into text
	Transcribe(ctx context.Context, r io.Reader) (string, error)
}

type LLM interface {
	Quota
	Complete(ctx context.Context, ms []Message, o *COption) (string, error)
}

const (
	ChatMessageRoleSystem    = "system"
	ChatMessageRoleUser      = "user"
	ChatMessageRoleAssistant = "assistant"
	ChatMessageRoleFunction  = "function"
)

type Message struct {
	Role    string `json:"role"`
	Content string `json:"content"`
}

type COption struct {
	Model              string // optional
	MaxGenerationToken int    // optional
}
