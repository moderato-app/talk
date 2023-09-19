package client

import (
	"context"

	"github.com/proxoar/talk/pkg/ability"
)

type LLM interface {
	Client
	Completion(ctx context.Context, ms []Message, t ability.LLMOption) (string, error)
	// CompletionStream
	//
	// return a chunk that contains an error if stream is not supported
	CompletionStream(ctx context.Context, ms []Message, t ability.LLMOption) <-chan Chunk
	SetAbility(ctx context.Context, a *ability.LLMAblt) error
	// Support
	//
	// read ability.LLMOption to check if current provider support the option
	Support(o ability.LLMOption) bool
}

type Chunk struct {
	Text string
	Err  error
}
