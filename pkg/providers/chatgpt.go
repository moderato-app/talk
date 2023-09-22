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

type chatGPT struct {
	client *openai.Client
	logger *zap.Logger
}

func NewChatGPT(apiKey string, logger *zap.Logger) client.LLM {
	// by default, the underlying http.client utilizes the proxy from the environment.
	c := openai.NewClient(apiKey)

	return &chatGPT{
		client: c,
		logger: logger,
	}
}

func (c *chatGPT) CheckHealth(ctx context.Context) {
	m := client.Message{
		Role:    "user",
		Content: "Hello!",
	}
	o := ability.DefaultChatGPTOption()
	content, err := c.Completion(ctx, []client.Message{m}, ability.LLMOption{ChatGPT: o})
	if err != nil {
		c.logger.Sugar().Error("[ChatGPT] failed to get response from server: ", err)
	} else if len(content) == 0 {
		c.logger.Warn(`[ChatGPT] bad smell: got empty content from ChatGPTAblt server`)
	} else {
		c.logger.Info("[ChatGPT]  is healthy")
	}
}

func (c *chatGPT) Quota(_ context.Context) (used, total int, err error) {
	// openai.client doesn't support billing query
	return 0, 0, nil
}

func (c *chatGPT) Completion(ctx context.Context, ms []client.Message, t ability.LLMOption) (string, error) {
	c.logger.Info("completion...")
	if t.ChatGPT == nil {
		return "", errors.New("client did not provide ChatGPT option")
	}

	messages := messageOfComplete(ms)

	req := openai.ChatCompletionRequest{
		Messages:         messages,
		Model:            t.ChatGPT.Model,
		MaxTokens:        t.ChatGPT.MaxTokens,
		Temperature:      t.ChatGPT.TopP,
		TopP:             t.ChatGPT.Temperature,
		PresencePenalty:  t.ChatGPT.PresencePenalty,
		FrequencyPenalty: t.ChatGPT.FrequencyPenalty,
	}

	resp, err := c.client.CreateChatCompletion(ctx, req)
	if err != nil {
		return "", fmt.Errorf("failed to CreateChatCompletion: %s", err)
	}

	content := resp.Choices[0].Message.Content
	c.logger.Sugar().Info("completion resp content length:", len(content))
	return content, nil
}

// CompletionStream
//
// Return only one chunk that contains the whole content if stream is not supported.
// To make sure the chan closes eventually, caller should either read the last chunk from chan
// or got a chunk whose Err != nil
func (c *chatGPT) CompletionStream(ctx context.Context, ms []client.Message, t ability.LLMOption) <-chan client.Chunk {
	c.logger.Sugar().Infow("completion stream...", "message list length", len(ms))
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
		TopP:             t.ChatGPT.TopP,
		PresencePenalty:  t.ChatGPT.PresencePenalty,
		FrequencyPenalty: t.ChatGPT.FrequencyPenalty,
	}
	reqLog := req
	reqLog.Messages = nil
	c.logger.Sugar().Info("completion stream req without messages:", reqLog)

	go func() {
		stream, err := c.client.CreateChatCompletionStream(ctx, req)
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
			ch <- client.Chunk{Text: response.Choices[0].Delta.Content}
		}
	}()
	return ch
}

// SetAbility set `ChatGPTAblt` and `available` field of ability.LLMAblt
func (c *chatGPT) SetAbility(ctx context.Context, a *ability.LLMAblt) error {
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
func (c *chatGPT) Support(o ability.LLMOption) bool {
	return o.ChatGPT != nil
}

func (c *chatGPT) getModels(ctx context.Context) ([]string, error) {
	c.logger.Info("get models...")
	ml, err := c.client.ListModels(ctx)
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
	c.logger.Sugar().Debug("models count:", len(models))
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
