package providers

import (
	"context"
	"github.com/bubblelight/talk/pkg/client"
	"github.com/pkg/errors"
	"github.com/sashabaranov/go-openai"
	"go.uber.org/zap"
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
	content, err := c.Complete(context.Background(), []client.Message{m}, nil)
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

func (c *ChatGPT) Complete(ctx context.Context, ms []client.Message, o *client.COption) (string, error) {
	c.Logger.Info("complete...")

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
