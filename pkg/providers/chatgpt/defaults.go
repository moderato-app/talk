package chatgpt

import (
	"github.com/proxoar/talk/pkg/client/ability"
)

// DefaultChatGPTLLM
// see https://platform.openai.com/docs/api-reference/chat/create
var DefaultChatGPTLLM = ability.ChatGPTLLM{
	Available: true,
	Models: []string{"gpt-3.5-turbo",
		"gpt-3.5-turbo-0613",
		"gpt-3.5-turbo-0301",
		"gpt-3.5-turbo-16k",
		"gpt-3.5-turbo-16k-0613",
		"gpt-3.5-turbo-instruct",
		"gpt-4",
		"gpt-4-0613",
		"gpt-4-0314",
		"gpt-4-32k-0613",
		"gpt-4-32k-0314",
		"gpt-4-32k"},
}

func DefaultChatGPTTuneOption() ability.LLMTuneOption {
	model := "gpt-3.5-turbo"
	return ability.LLMTuneOption{
		Model:            &model,
		MaxTokens:        nil,
		Temperature:      nil,
		PresencePenalty:  nil,
		FrequencyPenalty: nil,
	}
}
