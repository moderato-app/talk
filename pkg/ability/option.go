package ability

import "cloud.google.com/go/texttospeech/apiv1/texttospeechpb"

// LLMOption clients use TalkOption to guide LLMAblt in generating text
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

type STTOption struct {
	Whisper *WhisperOption `json:"whisper"`
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

type ElevenlabsTTSOption struct {
	VoiceId   string  `json:"voiceId"`
	Stability float32 `json:"stability"`
	Clarity   float32 `json:"clarity"`
}
