package client

import (
	"context"
)

type LLM interface {
	MustFunction
	Quota
	Completion(ctx context.Context, ms []Message, o *COption) (string, error)
	// CompletionStream
	//
	// return an error if stream is not supported
	CompletionStream(ctx context.Context, ms []Message, o *COption) <-chan Chunk
}

type Message struct {
	Role    string `json:"role"` // options: system, user, assistant and function
	Content string `json:"content"`
}

type COption struct {
	Model              string // optional
	MaxGenerationToken int    // optional
}

type Model struct {
	Name string `json:"name"`
}

type Chunk struct {
	Message string
	Err     error
}
