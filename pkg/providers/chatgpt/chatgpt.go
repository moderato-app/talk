package chatgpt

import (
	"context"
	"errors"
	"fmt"
	"io"

	"github.com/proxoar/talk/pkg/client"
	"github.com/proxoar/talk/pkg/client/ability"

	"github.com/sashabaranov/go-openai"
	"go.uber.org/zap"
)

const (
	systemRoleContent = "You are a helpful assistant!"
)

type ChatGPT struct {
	Client *openai.Client
	Logger *zap.Logger
}

func (c *ChatGPT) MustFunction(_ context.Context) {
	m := client.Message{
		Role:    "user",
		Content: "Hello!",
	}
	content, err := c.Completion(context.Background(), []client.Message{m}, DefaultChatGPTTuneOption())
	if err != nil {
		c.Logger.Sugar().Panic("failed to get response from ChatGPT server: ", err)
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

func (c *ChatGPT) Completion(ctx context.Context, ms []client.Message, t ability.LLMTuneOption) (string, error) {
	c.Logger.Info("completion...")

	messages := messageOfComplete(ms)

	req := openai.ChatCompletionRequest{
		Messages: messages,
	}
	applyCOption(&req, t)

	resp, err := c.Client.CreateChatCompletion(ctx, req)
	if err != nil {
		return "", fmt.Errorf("CreateChatCompletion %+v: %v", t, err)
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
func (c *ChatGPT) CompletionStream(ctx context.Context, ms []client.Message, t ability.LLMTuneOption) <-chan client.Chunk {
	c.Logger.Info("completion stream...")

	messages := messageOfComplete(ms)

	req := openai.ChatCompletionRequest{
		Messages: messages,
	}
	applyCOption(&req, t)

	ch := make(chan client.Chunk, 64)

	go func() {
		stream, err := c.Client.CreateChatCompletionStream(ctx, req)
		if err != nil {
			ch <- client.Chunk{Message: "", Err: err}
			return
		}
		defer stream.Close()
		defer close(ch)

		for {
			response, err := stream.Recv()
			if errors.Is(err, io.EOF) {
				break
			}

			if err != nil {
				ch <- client.Chunk{Message: "", Err: err}
				break
			}
			ch <- client.Chunk{Message: response.Choices[0].Delta.Content, Err: nil}
		}
	}()
	return ch
}

func (c *ChatGPT) Ability(_ context.Context) (ability.LLM, error) {
	// todo get latest models from server
	return ability.LLM{ChatGPT: DefaultChatGPTLLM}, nil
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

func applyCOption(req *openai.ChatCompletionRequest, t ability.LLMTuneOption) {
	if t.Model == nil {
		req.Model = *t.Model
	}
	if t.MaxTokens != nil {
		req.MaxTokens = *t.MaxTokens
	}
	if t.Temperature != nil {
		req.Temperature = *t.Temperature
	}
	if t.PresencePenalty != nil {
		req.PresencePenalty = *t.PresencePenalty
	}
	if t.FrequencyPenalty != nil {
		req.FrequencyPenalty = *t.FrequencyPenalty
	}
}
