package client

import (
	"context"

	"github.com/proxoar/talk/pkg/ability"
)

type LLM interface {
	MustFunction
	Quota
	Completion(ctx context.Context, ms []Message, t ability.LLMOption) (string, error)
	// CompletionStream
	//
	// return a chunk that contains an error if stream is not supported
	CompletionStream(ctx context.Context, ms []Message, t ability.LLMOption) <-chan Chunk
	SetAbility(ctx context.Context, a *ability.LLMAb) error
}

type Message struct {
	Role    string `json:"role"` // options: system, user, assistant and function
	Content string `json:"content"`
}

type Chunk struct {
	Message string
	Err     error
}
