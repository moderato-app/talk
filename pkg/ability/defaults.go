package ability

// DefaultChatGPTLLM
// see https://platform.openai.com/docs/api-reference/chat/create
func DefaultChatGPTLLM() ChatGPTAb {
	return ChatGPTAb{
		Available: true,
		Models:    []string{
			//"gpt-3.5-turbo",
			//"gpt-3.5-turbo-0613",
			//"gpt-3.5-turbo-0301",
			//"gpt-3.5-turbo-16k",
			//"gpt-3.5-turbo-16k-0613",
			//"gpt-3.5-turbo-instruct",
			//"gpt-4",
			//"gpt-4-0613",
			//"gpt-4-0314",
			//"gpt-4-32k-0613",
			//"gpt-4-32k-0314",
			//"gpt-4-32k"
		},
	}
}

func DefaultChatGPTOption() *ChatGPTOption {
	model := "gpt-3.5-turbo"
	return &ChatGPTOption{
		Model:            model,
		MaxTokens:        2000,
		Temperature:      1,
		PresencePenalty:  0,
		FrequencyPenalty: 0,
	}
}

func DefaultLLMAbility() LLMAb {
	return LLMAb{
		Available: true,
		ChatGPT:   DefaultChatGPTLLM(),
	}
}
