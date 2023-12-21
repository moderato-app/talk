package providers

import (
	"context"
	"errors"
	"fmt"
	"sort"
	"strings"

	"github.com/proxoar/talk/pkg/ability"
	"github.com/proxoar/talk/pkg/client"
	"github.com/proxoar/talk/pkg/util"
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
	c.logger.Sugar().Debug("completion resp content length:", len(content))
	return content, nil
}

// CompletionStream
//
// Return only one chunk that contains the whole content if stream is not supported.
// To make sure the chan closes eventually, caller should either read the last chunk from chan
// or got a chunk whose Err != nil
func (c *chatGPT) CompletionStream(ctx context.Context, ms []client.Message, t ability.LLMOption) *util.SmoothStream {
	c.logger.Sugar().Debugw("completion stream...", "message list length", len(ms))
	stream := util.NewSmoothStream()
	if t.ChatGPT == nil {
		stream.WriteError(errors.New("client did not provide ChatGPT option"))
		return stream
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
	c.logger.Sugar().Debugw("completion stream req without messages:", reqLog)

	go func() {
		s, err := c.client.CreateChatCompletionStream(ctx, req)
		if err != nil {
			stream.WriteError(err)
			return
		}
		defer s.Close()
		for {
			response, err := s.Recv()
			if err != nil {
				stream.WriteError(err)
				return
			}
			for _, r := range response.Choices[0].Delta.Content {
				stream.Write(r)
			}
		}
	}()
	return stream
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
