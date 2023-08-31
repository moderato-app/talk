package chatgpt

import (
	"math"

	"github.com/proxoar/talk/pkg/client/tune"
)

// DefaultChatGPTTunability
// see https://platform.openai.com/docs/api-reference/chat/create
var DefaultChatGPTTunability = tune.LLMTunability{
	Model: tune.SingleChoice[string]{
		Tunable: true,
		Choices: []tune.Choice[string]{
			{Value: "gpt-3.5-turbo"},
			{Value: "gpt-3.5-turbo-0613"},
			{Value: "gpt-3.5-turbo-0301"},
			{Value: "gpt-3.5-turbo-16k"},
			{Value: "gpt-3.5-turbo-16k-0613"},
			{Value: "gpt-3.5-turbo-instruct"},
			{Value: "gpt-4"},
			{Value: "gpt-4-0613"},
			{Value: "gpt-4-0314"},
			{Value: "gpt-4-32k-0613"},
			{Value: "gpt-4-32k-0314"},
			{Value: "gpt-4-32k"},
		},
		Default: "gpt-3.5-turbo",
	},
	MaxTokens: tune.IntRange{
		Tunable:    true,
		RangeStart: 0,
		RangeEnd:   math.MaxInt,
		Default:    16,
	},
	Temperature: tune.FloatRange{
		Tunable:    true,
		RangeStart: 0,
		RangeEnd:   2,
		Default:    1,
	},
	PresencePenalty: tune.FloatRange{
		Tunable:    true,
		RangeStart: -2,
		RangeEnd:   2,
		Default:    0,
	},
	FrequencyPenalty: tune.FloatRange{
		Tunable:    true,
		RangeStart: -2,
		RangeEnd:   2,
		Default:    0,
	},
}

func DefaultChatGPTTuneOption() tune.LLMTuneOption {
	model := "gpt-3.5-turbo"
	return tune.LLMTuneOption{
		Model:            &model,
		MaxTokens:        nil,
		Temperature:      nil,
		PresencePenalty:  nil,
		FrequencyPenalty: nil,
	}
}
