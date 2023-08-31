package client

import (
	"context"

	"github.com/proxoar/talk/pkg/client/ability"
)

type LLM interface {
	MustFunction
	Quota
	Completion(ctx context.Context, ms []Message, t ability.LLMTuneOption) (string, error)
	// CompletionStream
	//
	// return a chunk that contains an error if stream is not supported
	CompletionStream(ctx context.Context, ms []Message, t ability.LLMTuneOption) <-chan Chunk
	Ability(ctx context.Context) (ability.LLM, error)
}

type Message struct {
	Role    string `json:"role"` // options: system, user, assistant and function
	Content string `json:"content"`
}

type Chunk struct {
	Message string
	Err     error
}
