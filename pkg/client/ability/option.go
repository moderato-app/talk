package ability

type TuneOption struct {
	LLM LLMTuneOption `json:"LLM"`
}

// LLMTuneOption clients use TuneOption to guide LLM in generating text
//
// A nil pointer indicates that the default value should be used.
//
// What about taking zero value as default value?
// When default value is actually not zero, it can cause problems.
type LLMTuneOption struct {
	Model            *string  `json:"model,omitempty"`
	MaxTokens        *int     `json:"maxTokens,omitempty"`
	Temperature      *float32 `json:"temperature,omitempty"`
	PresencePenalty  *float32 `json:"presencePenalty,omitempty"`
	FrequencyPenalty *float32 `json:"frequencyPenalty,omitempty"`
}
