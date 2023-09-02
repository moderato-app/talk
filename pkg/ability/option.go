package ability

type TalkOption struct {
	LLM *LLMOption `json:"llm,omitempty"`
}

// LLMOption clients use TalkOption to guide LLMAb in generating text
type LLMOption struct {
	ChatGPT *ChatGPTOption `json:"chatGPT"`
}

type ChatGPTOption struct {
	Model            string  `json:"model"`
	MaxTokens        int     `json:"maxTokens"`
	Temperature      float32 `json:"temperature"`
	PresencePenalty  float32 `json:"presencePenalty"`
	FrequencyPenalty float32 `json:"frequencyPenalty"`
}
