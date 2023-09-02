package ability

// Ability guide clients in adjusting all parameters.
type Ability struct {
	LLM LLMAb `json:"llm"`
	TTS TTSAb `json:"tts"`
	STT STTAb `json:"stt"`
}

// TTSAb text to speech

type TTSAb struct {
	Available  bool            `json:"available"`
	Google     GoogleTTSAb     `json:"google"`
	Elevenlabs ElevenlabsTTSAb `json:"elevenlabs"`
}

type GoogleTTSAb struct {
	Available bool       `json:"available"`
	Languages []Language `json:"languages"`
}

type ElevenlabsTTSAb struct {
	Available bool       `json:"available"`
	Languages []Language `json:"languages"`
}

// STTAb speech to text

type STTAb struct {
	Available bool         `json:"available"`
	Whisper   WhisperSTTAb `json:"whisper"`
	Google    GoogleSTTAb  `json:"google"`
}

type WhisperSTTAb struct {
	Available bool `json:"available"`
}

type GoogleSTTAb struct {
	Available bool `json:"available"`
}

// LLMAb

type LLMAb struct {
	Available bool      `json:"available"`
	ChatGPT   ChatGPTAb `json:"chatGPT"`
}

type ChatGPTAb struct {
	Available bool     `json:"available"`
	Models    []string `json:"models"`
}

// other

type Language struct {
	Name  string   `json:"name"`  // to display on UI
	Value string   `json:"value"` // used by TTSAb/STTAb client
	Tags  []string `json:"tags"`  // gender, accent, age, etc
}
