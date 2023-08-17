package client

import (
	"context"
)

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
