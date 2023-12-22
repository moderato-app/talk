package ability

import "cloud.google.com/go/texttospeech/apiv1/texttospeechpb"

// LLMOption clients use TalkOption to guide LLMAblt in generating text
type LLMOption struct {
	ChatGPT *ChatGPTOption `json:"chatGPT"`
	Gemini  *GeminiOption  `json:"gemini"`
}

type ChatGPTOption struct {
	Model            string  `json:"model"`
	MaxTokens        int     `json:"maxTokens"`
	Temperature      float32 `json:"temperature"`
	TopP             float32 `json:"topP"`
	PresencePenalty  float32 `json:"presencePenalty"`
	FrequencyPenalty float32 `json:"frequencyPenalty"`
}

type GeminiOption struct {
	Model           string   `json:"model"`
	StopSequences   []string `json:"stopSequences"`
	MaxOutputTokens int32    `json:"maxOutputTokens"`
	Temperature     float32  `json:"temperature"`
	TopP            float32  `json:"topP"`
	TopK            int32    `json:"topK"`
}

type STTOption struct {
	Whisper *WhisperOption   `json:"whisper"`
	Google  *GoogleSTTOption `json:"google"`
}

type GoogleTTSOption struct {
	// if VoiceId is provided, LanguageCode and Gender will not be used
	VoiceId      string                         `json:"voiceId"`
	LanguageCode string                         `json:"languageCode"`
	Gender       texttospeechpb.SsmlVoiceGender `json:"gender"`
	SpeakingRate float64                        `json:"speakingRate"`
	Pitch        float64                        `json:"pitch"`
	VolumeGainDb float64                        `json:"volumeGainDb"`
}

type TTSOption struct {
	Elevenlabs *ElevenlabsTTSOption `json:"elevenlabs"`
	Google     *GoogleTTSOption     `json:"google"`
}

type WhisperOption struct {
	Model string `json:"model"`
}

type GoogleSTTOption struct {
	Recognizer string `json:"recognizer"`
	Model      string `json:"model"`
	Language   string `json:"language"`
}

type ElevenlabsTTSOption struct {
	VoiceId   string  `json:"voiceId"`
	Stability float32 `json:"stability"`
	Clarity   float32 `json:"clarity"`
}
