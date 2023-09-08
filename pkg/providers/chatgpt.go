package providers

import (
	"context"
	"errors"
	"fmt"
	"io"
	"sort"
	"strings"

	"github.com/proxoar/talk/pkg/ability"
	"github.com/proxoar/talk/pkg/client"
	"github.com/sashabaranov/go-openai"
	"go.uber.org/zap"
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
	o := ability.DefaultChatGPTOption()
	content, err := c.Completion(context.Background(), []client.Message{m}, ability.LLMOption{ChatGPT: o})
	if err != nil {
		c.Logger.Sugar().Panic("failed to get response from ChatGPT server: ", err)
	}
	if len(content) == 0 {
		c.Logger.Warn(`bad smell: got empty content from ChatGPTAblt server`)
	}
	c.Logger.Info("ChatGPT is healthy")
}

func (c *ChatGPT) Quota(_ context.Context) (used, total int, err error) {
	// openai.Client doesn't support billing query
	return 0, 0, nil
}

func (c *ChatGPT) Completion(ctx context.Context, ms []client.Message, t ability.LLMOption) (string, error) {
	c.Logger.Info("completion...")
	if t.ChatGPT == nil {
		return "", errors.New("client did not provide ChatGPT option")
	}

	messages := messageOfComplete(ms)

	req := openai.ChatCompletionRequest{
		Messages:         messages,
		Model:            t.ChatGPT.Model,
		MaxTokens:        t.ChatGPT.MaxTokens,
		Temperature:      t.ChatGPT.Temperature,
		PresencePenalty:  t.ChatGPT.PresencePenalty,
		FrequencyPenalty: t.ChatGPT.FrequencyPenalty,
	}

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
func (c *ChatGPT) CompletionStream(ctx context.Context, ms []client.Message, t ability.LLMOption) <-chan client.Chunk {
	c.Logger.Sugar().Infow("completion stream...", "message list length", len(ms))
	ch := make(chan client.Chunk, 64)
	if t.ChatGPT == nil {
		ch <- client.Chunk{Text: "", Err: errors.New("client did not provide ChatGPT option")}
		return ch
	}

	messages := messageOfComplete(ms)

	req := openai.ChatCompletionRequest{
		Messages:         messages,
		Model:            t.ChatGPT.Model,
		MaxTokens:        t.ChatGPT.MaxTokens,
		Temperature:      t.ChatGPT.Temperature,
		PresencePenalty:  t.ChatGPT.PresencePenalty,
		FrequencyPenalty: t.ChatGPT.FrequencyPenalty,
	}
	reqLog := req
	reqLog.Messages = nil
	c.Logger.Sugar().Info("completion stream req without messages:", reqLog)

	go func() {
		stream, err := c.Client.CreateChatCompletionStream(ctx, req)
		if err != nil {
			ch <- client.Chunk{Text: "", Err: err}
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
				ch <- client.Chunk{Text: "", Err: err}
				break
			}
			ch <- client.Chunk{Text: response.Choices[0].Delta.Content, Err: nil}
		}
	}()
	return ch
}

// SetAbility set `ChatGPTAblt` and `available` field of ability.LLMAblt
func (c *ChatGPT) SetAbility(ctx context.Context, a *ability.LLMAblt) error {
	models, err := c.getModels(ctx)
	if err != nil {
		return err
	}
	a.ChatGPT = ability.ChatGPTAblt{
		Available: true,
		Models:    models,
	}
	a.Available = true
	return nil
}

// Support
//
// read ability.LLMOption to check if current provider support the option
func (c *ChatGPT) Support(o ability.LLMOption) bool {
	return o.ChatGPT != nil
}

func (c *ChatGPT) getModels(ctx context.Context) ([]string, error) {
	c.Logger.Info("get models...")
	ml, err := c.Client.ListModels(ctx)
	if err != nil {
		return nil, err
	}
	models := make([]string, 0, len(ml.Models))
	for i := 0; i < len(ml.Models); i++ {
		if strings.Contains(ml.Models[i].ID, "gpt") {
			models = append(models, ml.Models[i].ID)
		}
	}
	sort.Strings(models)
	c.Logger.Sugar().Debug("models count:", len(models))
	return models, err
}

func messageOfComplete(ms []client.Message) []openai.ChatCompletionMessage {
	messages := make([]openai.ChatCompletionMessage, len(ms), len(ms))
	for i, m := range ms {
		messages[i] = openai.ChatCompletionMessage{
			Role:    string(m.Role),
			Content: m.Content,
		}
	}
	return messages
}
