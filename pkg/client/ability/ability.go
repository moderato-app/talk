package ability

// Ability guide clients in adjusting all parameters.
type Ability struct {
	LLM LLM `json:"llm"`
	TTS TTS `json:"tts"`
	STT STT `json:"stt"`
}

// TTS text to speech

type TTS struct {
	Available  bool          `json:"available,omitempty"`
	Google     GoogleTTS     `json:"google"`
	Elevenlabs ElevenlabsTTS `json:"elevenlabs"`
}

type GoogleTTS struct {
	Available bool       `json:"available,omitempty"`
	Languages []Language `json:"languages,omitempty"`
}

type ElevenlabsTTS struct {
	Available bool       `json:"available,omitempty"`
	Languages []Language `json:"languages,omitempty"`
}

// STT speech to text

type STT struct {
	Available bool       `json:"available,omitempty"`
	Whisper   WhisperSTT `json:"whisper"`
	Google    GoogleSTT  `json:"google"`
}

type WhisperSTT struct {
	Available bool `json:"available,omitempty"`
}

type GoogleSTT struct {
	Available bool `json:"available,omitempty"`
}

// LLM

type LLM struct {
	Available bool       `json:"available,omitempty"`
	ChatGPT   ChatGPTLLM `json:"chatGPT"`
}

type ChatGPTLLM struct {
	Available bool     `json:"available,omitempty"`
	Models    []string `json:"models,omitempty"`
}

// other

type Language struct {
	Name  string   `json:"name,omitempty"`  // to display on UI
	Value string   `json:"value,omitempty"` // used by TTS/STT client
	Tags  []string `json:"tags,omitempty"`  // gender, accent, age, etc
}
