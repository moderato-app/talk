package providers

import (
	"context"
	"github.com/bubblelight/talk/pkg/client"
	"github.com/pkg/errors"
	"github.com/sashabaranov/go-openai"
	"go.uber.org/zap"
	"io"
)

const (
	systemRoleContent = "You are a helpful assistant!"
)

type ChatGPT struct {
	Client             *openai.Client
	Model              string
	MaxGenerationToken int
	Logger             *zap.Logger
}

func (c *ChatGPT) MustFunction(_ context.Context) {
	m := client.Message{
		Role:    "user",
		Content: "Hello!",
	}
	content, err := c.Completion(context.Background(), []client.Message{m}, nil)
	if err != nil {
		c.Logger.Sugar().Panicf("failed to get response from ChatGPT server: %+v", err)
	}
	if len(content) == 0 {
		c.Logger.Warn(`bad smell: got empty content from ChatGPT server`)
	}
	c.Logger.Info("ChatGPT is healthy")
}

func (c *ChatGPT) Quota(_ context.Context) (used, total int, err error) {
	// openai.Client doesn't support billing query
	return 0, 0, nil
}

func (c *ChatGPT) Completion(ctx context.Context, ms []client.Message, o *client.COption) (string, error) {
	c.Logger.Info("completion...")

	messages := messageOfComplete(ms)

	req := openai.ChatCompletionRequest{
		Model:     c.Model,
		MaxTokens: c.MaxGenerationToken,
		Messages:  messages,
	}
	applyCOption(&req, o)

	resp, err := c.Client.CreateChatCompletion(ctx, req)
	if err != nil {
		return "", errors.Wrap(err, "")
	}

	c.Logger.Sugar().Debug("complete result", resp)
	content := resp.Choices[0].Message.Content
	c.Logger.Sugar().Info("content:", content)
	return content, nil
}

// CompletionStream
//
// Return only one chunk that contains the whole content if stream is not supported.
// To make sure the chan closes eventually, caller should either read the last chunk from chan
// or got a chunk whose Err != nil
func (c *ChatGPT) CompletionStream(ctx context.Context, ms []client.Message, o *client.COption) <-chan client.Chunk {
	c.Logger.Info("completion stream...")

	messages := messageOfComplete(ms)

	req := openai.ChatCompletionRequest{
		Model:     c.Model,
		MaxTokens: c.MaxGenerationToken,
		Messages:  messages,
	}
	applyCOption(&req, o)

	ch := make(chan client.Chunk, 10)

	go func() {
		stream, err := c.Client.CreateChatCompletionStream(ctx, req)
		if err != nil {
			ch <- client.Chunk{Message: "", Err: err}
			return
		}
		defer stream.Close()

		for {
			response, err := stream.Recv()
			if errors.Is(err, io.EOF) {
				close(ch)
				return
			}

			if err != nil {
				ch <- client.Chunk{Message: "", Err: err}
				return
			}

			ch <- client.Chunk{Message: response.Choices[0].Delta.Content, Err: nil}
		}
	}()
	return ch
}

func messageOfComplete(ms []client.Message) []openai.ChatCompletionMessage {
	messages := []openai.ChatCompletionMessage{
		{
			Role:    openai.ChatMessageRoleSystem,
			Content: systemRoleContent,
		},
	}
	for _, m := range ms {
		messages = append(messages, openai.ChatCompletionMessage{
			Role:    m.Role,
			Content: m.Content,
		})
	}
	return messages
}

func applyCOption(req *openai.ChatCompletionRequest, o *client.COption) {
	if o == nil {
		return
	}
	if o.Model != "" {
		req.Model = o.Model
	}
	if o.MaxGenerationToken != 0 {
		req.MaxTokens = o.MaxGenerationToken
	}
}
