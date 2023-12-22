package ability

func DefaultChatGPTOption() *ChatGPTOption {
	return &ChatGPTOption{
		Model:            "gpt-3.5-turbo",
		MaxTokens:        2000,
		Temperature:      1,
		TopP:             1,
		PresencePenalty:  0,
		FrequencyPenalty: 0,
	}
}

func DefaultGeminiOption() *GeminiOption {
	// https://cloud.google.com/vertex-ai/docs/generative-ai/model-reference/gemini
	return &GeminiOption{
		Model:           "gemini-pro",
		StopSequences:   nil,
		MaxOutputTokens: 8192,
		Temperature:     0.9,
		TopP:            1,
		TopK:            32,
	}
}
