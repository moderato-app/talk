package tune

// Tunability guide clients in adjusting all parameters.
type Tunability struct {
	LLM LLMTunability `json:"llm"`
}

// LLMTunability guide clients in adjusting LLM parameters.
type LLMTunability struct {
	Model            SingleChoice[string] `json:"model"`
	MaxTokens        IntRange             `json:"maxTokens"`
	Temperature      FloatRange           `json:"temperature"`
	PresencePenalty  FloatRange           `json:"presencePenalty"`
	FrequencyPenalty FloatRange           `json:"frequencyPenalty"`
}
