package providers

import (
	"context"
	"errors"
	"math/rand"
	"time"

	demo "github.com/proxoar/talk-demo-resource/v2"
	"github.com/proxoar/talk/pkg/ability"
	"github.com/proxoar/talk/pkg/client"
	"github.com/proxoar/talk/pkg/util"
	"go.uber.org/zap"
)

var chatGPTDemoModels = []string{
	"gpt-4-32k-0613[demo]",
	"gpt-4-32k-0314[demo]",
	"gpt-4-32k[demo]",
	"gpt-4-0613[demo]",
	"gpt-4-0314[demo]",
	"gpt-4[demo]",
	"gpt-3.5-turbo-0613[demo]",
	"gpt-3.5-turbo-0301[demo]",
	"gpt-3.5-turbo-16k[demo]",
	"gpt-3.5-turbo-16k-0613[demo]",
	"gpt-3.5-turbo[demo]",
}

type chatGPTDemo struct {
	pool   *demo.ResourcePool
	logger *zap.Logger
}

func NewChatGPTDemo(pool *demo.ResourcePool, logger *zap.Logger) client.LLM {
	return &chatGPTDemo{
		pool:   pool,
		logger: logger,
	}
}

func (c *chatGPTDemo) CheckHealth(_ context.Context) {
}

func (c *chatGPTDemo) Completion(_ context.Context, _ []client.Message, t ability.LLMOption) (string, error) {
	c.logger.Info("completion...")
	if t.ChatGPT == nil {
		return "", errors.New("client did not provide ChatGPT option")
	}

	r := c.pool.RandomResource()
	c.logger.Sugar().Info("completion resp content length:", len(r.Text))
	return r.Text, nil
}

// CompletionStream
//
// Return only one chunk that contains the whole content if stream is not supported.
// To make sure the chan closes eventually, caller should either read the last chunk from chan
// or got a chunk whose Err != nil
func (c *chatGPTDemo) CompletionStream(_ context.Context, ms []client.Message, t ability.LLMOption) *util.SmoothStream {
	c.logger.Sugar().Infow("completion stream...", "message list length", len(ms))
	stream := util.NewSmoothStream()
	if t.ChatGPT == nil {
		stream.WriteError(errors.New("client did not provide ChatGPT option"))
		return stream
	}
	go func() {
		resource := c.pool.RandomResource()
		time.Sleep(500 * time.Millisecond)

		// mock the act of random typing
		for _, r := range resource.Text {
			stream.Write(r)
			if rand.Float64() < 0.2 {
				time.Sleep(time.Duration(rand.Intn(200)) * time.Millisecond)
			}
		}
		stream.DoneWrite()
	}()
	return stream
}

// SetAbility set `ChatGPTAblt` and `available` field of ability.LLMAblt
func (c *chatGPTDemo) SetAbility(_ context.Context, a *ability.LLMAblt) error {
	a.ChatGPT = ability.ChatGPTAblt{
		Available: true,
		Models:    chatGPTDemoModels,
	}
	a.Available = true
	return nil
}

// Support
//
// read ability.LLMOption to check if current provider support the option
func (c *chatGPTDemo) Support(o ability.LLMOption) bool {
	return o.ChatGPT != nil
}

func (c *chatGPTDemo) getModels(_ context.Context) ([]string, error) {
	c.logger.Info("get models...")

	c.logger.Sugar().Debug("models count:", len(chatGPTDemoModels))
	return chatGPTDemoModels, nil
}
