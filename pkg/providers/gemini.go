package providers

import (
	"context"
	"errors"
	"fmt"
	"github.com/google/generative-ai-go/genai"
	"github.com/proxoar/talk/pkg/ability"
	"github.com/proxoar/talk/pkg/client"
	"github.com/proxoar/talk/pkg/util"
	"go.uber.org/zap"
	"google.golang.org/api/iterator"
	"google.golang.org/api/option"
	"io"
	"slices"
	"strings"
)

type gemini struct {
	client *genai.Client
	logger *zap.Logger
}

func NewGemini(apiKey string, logger *zap.Logger) client.LLM {
	c, err := genai.NewClient(context.Background(), option.WithAPIKey(apiKey))
	if err != nil {
		logger.Sugar().Fatal(err)
	}

	return &gemini{
		client: c,
		logger: logger,
	}
}

func (c *gemini) CheckHealth(ctx context.Context) {
	m := client.Message{
		Role:    client.RoleUser,
		Content: "Hello!",
	}
	o := ability.DefaultGeminiOption()
	o.MaxOutputTokens = 10
	content, err := c.Completion(ctx, []client.Message{m}, ability.LLMOption{Gemini: o})
	if err != nil {
		c.logger.Sugar().Errorf("[Gemini] failed to get response from server: %v", err)
	} else if len(content) == 0 {
		c.logger.Warn(`[Gemini] bad smell: got empty content from GeminiAblt server`)
	} else {
		c.logger.Info("[Gemini]  is healthy")
	}
}

func (c *gemini) Quota(_ context.Context) (used, total int, err error) {
	// openai.client doesn't support billing query
	return 0, 0, nil
}

func (c *gemini) Completion(ctx context.Context, ms []client.Message, t ability.LLMOption) (string, error) {
	c.logger.Sugar().Debugw("completion...", "message list length", len(ms))
	if t.Gemini == nil {
		return "", errors.New("client did not provide Gemini option")
	}

	model := c.client.GenerativeModel(t.Gemini.Model)

	model.StopSequences = t.Gemini.StopSequences
	model.MaxOutputTokens = &t.Gemini.MaxOutputTokens
	model.Temperature = &t.Gemini.Temperature
	model.TopP = &t.Gemini.TopP
	model.TopK = &t.Gemini.TopK

	cs := model.StartChat()
	history, question := messageOfGenaiHistory(ms, c.logger)
	cs.History = history
	resp, err := cs.SendMessage(ctx, question.Parts...)

	if err != nil {
		return "", errors.Join(errors.New("failed to SendMessage"), err)
	}

	content := responseString(resp)
	c.logger.Sugar().Debug("completion resp content length:", len(content))
	return content, nil
}

// CompletionStream
//
// Return only one chunk that contains the whole content if stream is not supported.
func (c *gemini) CompletionStream(ctx context.Context, ms []client.Message, t ability.LLMOption) *util.SmoothStream {
	c.logger.Sugar().Debugw("completion stream...", "message list length", len(ms))
	stream := util.NewSmoothStream()
	if t.Gemini == nil {
		stream.WriteError(errors.New("client did not provide Gemini option"))
		return stream
	}

	model := c.client.GenerativeModel(t.Gemini.Model)

	model.StopSequences = t.Gemini.StopSequences
	model.MaxOutputTokens = &t.Gemini.MaxOutputTokens
	model.Temperature = &t.Gemini.Temperature
	model.TopP = &t.Gemini.TopP
	model.TopK = &t.Gemini.TopK

	cs := model.StartChat()
	history, question := messageOfGenaiHistory(ms, c.logger)
	cs.History = history

	go func() {
		iter := cs.SendMessageStream(ctx, question.Parts...)
		for {
			response, err := iter.Next()
			if err != nil {
				if errors.Is(err, iterator.Done) {
					err = io.EOF
				} else {
					err = errors.Unwrap(err)
				}
				stream.WriteError(err)
				return
			}
			content := responseString(response)

			for _, r := range content {
				stream.Write(r)
			}
		}
	}()
	return stream
}

// SetAbility set `GeminiAblt` and `available` field of ability.LLMAblt
func (c *gemini) SetAbility(ctx context.Context, a *ability.LLMAblt) error {
	models, err := c.getModels(ctx)
	if err != nil {
		return err
	}
	a.Gemini = ability.GeminiAblt{
		Available: true,
		Models:    models,
	}
	a.Available = true
	return nil
}

// Support
//
// read ability.LLMOption to check if current provider support the option
func (c *gemini) Support(o ability.LLMOption) bool {
	return o.Gemini != nil
}

func (c *gemini) getModels(ctx context.Context) ([]ability.Model, error) {
	c.logger.Info("get models...")
	ms := c.client.ListModels(ctx)
	var models []ability.Model
	for {
		m, err := ms.Next()
		if errors.Is(err, iterator.Done) {
			break
		}
		if err != nil {
			return nil, err
		}
		if strings.Contains(strings.ToLower(m.Name), "gemini") {
			models = append(models, ability.Model{Name: m.Name, DisplayName: m.DisplayName})
		}
	}
	c.logger.Sugar().Debug("models count:", len(models))
	return models, nil
}

func messageOfGenaiHistory(ms []client.Message, logger *zap.Logger) (history []*genai.Content, question *genai.Content) {
	if len(ms) == 0 {
		logger.Fatal("ms must contain at least one message")
	}
	// To suppress the error: "Please ensure that multiturn requests alternate between user and model."
	var res []client.Message
	var prev *client.Message

	for i := len(ms) - 1; i >= 0; i-- {
		role, err := ms[i].Role.ToGeminiRole()
		if err != nil {
			logger.Sugar().Warn("ignore message with role==", role)
			continue
		}
		ms[i].Role = role

		if prev == nil {
			prev = &ms[i]
			continue
		}
		if role == prev.Role {
			prev = &client.Message{Role: role, Content: ms[i].Content + "\n" + prev.Content}
		} else {
			res = append(res, *prev)
			prev = &ms[i]
		}
	}

	// conversation must start with a message that role==user
	if prev != nil {
		res = append(res, *prev)
		if prev.Role == "model" {
			res = append(res, client.Message{Role: client.RoleUser, Content: ""})
		}
	}

	if len(res) == 0 {
		logger.Fatal("res must contain at least one message")
	}

	slices.Reverse(res)

	logger.Sugar().Debug("history: ")
	for _, v := range res {
		logger.Sugar().Debug(v.Role, ": ", v.Content)
	}

	messages := make([]*genai.Content, 0, len(res))
	for _, r := range res {
		messages = append(messages, &genai.Content{
			Role:  string(r.Role),
			Parts: []genai.Part{genai.Text(r.Content)},
		})
	}

	return messages[:len(messages)-1], messages[len(messages)-1]
}

func responseString(resp *genai.GenerateContentResponse) string {
	var b strings.Builder
	for i, cand := range resp.Candidates {
		if len(resp.Candidates) > 1 {
			fmt.Fprintf(&b, "%d:", i+1)
		}
		b.WriteString(contentString(cand.Content))
	}
	return b.String()
}

func contentString(c *genai.Content) string {
	var b strings.Builder
	if c == nil || c.Parts == nil {
		return ""
	}
	for i, part := range c.Parts {
		if i > 0 {
			fmt.Fprintf(&b, ";")
		}
		fmt.Fprintf(&b, "%v", part)
	}
	return b.String()
}
