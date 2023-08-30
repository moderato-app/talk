package tune

// LLMTunability instruct clients on how to tune the parameters
type LLMTunability struct {
	Model            SingleChoice[string] `json:"model"`
	MaxTokens        IntRange             `json:"maxTokens"`
	Temperature      FloatRange           `json:"temperature"`
	PresencePenalty  FloatRange           `json:"presencePenalty"`
	FrequencyPenalty FloatRange           `json:"frequencyPenalty"`
}

// LLMTuneOption clients use TuneOption to instruct LLM on how to generate text
//
// Nil pointer means default value should be used
type LLMTuneOption struct {
	Model            string   `json:"model,omitempty"`
	MaxTokens        *int     `json:"maxTokens,omitempty"`
	Temperature      *float32 `json:"temperature,omitempty"`
	PresencePenalty  *float32 `json:"presencePenalty,omitempty"`
	FrequencyPenalty *float32 `json:"frequencyPenalty,omitempty"`
}
