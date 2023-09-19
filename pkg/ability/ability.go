package ability

// Ability guide clients in adjusting all parameters.
type Ability struct {
	LLM LLMAblt `json:"llm"`
	TTS TTSAblt `json:"tts"`
	STT STTAblt `json:"stt"`
}

// TTSAblt text to speech

type TTSAblt struct {
	Available  bool              `json:"available"`
	Google     GoogleTTSAblt     `json:"google"`
	Elevenlabs ElevenlabsTTSAblt `json:"elevenlabs"`
}

type GoogleTTSAblt struct {
	Available bool         `json:"available"`
	Voices    []TaggedItem `json:"voices"`
}

type ElevenlabsTTSAblt struct {
	Available bool         `json:"available"`
	Voices    []TaggedItem `json:"voices"`
}

// STTAblt speech to text

type STTAblt struct {
	Available bool         `json:"available"`
	Whisper   WhisperSTTAb `json:"whisper"`
	Google    GoogleSTTAb  `json:"google"`
}

type WhisperSTTAb struct {
	Available bool     `json:"available"`
	Models    []string `json:"models"`
}

type GoogleSTTAb struct {
	Available   bool         `json:"available"`
	Recognizers []TaggedItem `json:"recognizers"`
}

// LLMAblt

type LLMAblt struct {
	Available bool        `json:"available"`
	ChatGPT   ChatGPTAblt `json:"chatGPT"`
}

type ChatGPTAblt struct {
	Available bool     `json:"available"`
	Models    []string `json:"models"`
}

// other

type TaggedItem struct {
	Id   string   `json:"id"`   // used by TTSAblt client
	Name string   `json:"name"` // to display on UI
	Tags []string `json:"tags"` // gender, accent, age, etc
}
