package ability

func DefaultChatGPTOption() *ChatGPTOption {
	model := "gpt-3.5-turbo"
	return &ChatGPTOption{
		Model:            model,
		MaxTokens:        2000,
		Temperature:      1,
		TopP:             1,
		PresencePenalty:  0,
		FrequencyPenalty: 0,
	}
}
