package config

type TalkConfig struct {
	Server       ServerConfig       `mapstructure:"server"`
	SpeechToText SpeechToTextConfig `mapstructure:"speech-to-text"`
	TextToSpeech TextToSpeechConfig `mapstructure:"text-to-speech"`
	Llm          LlmConfig          `mapstructure:"llm"`
}

type ServerConfig struct {
	Port                  int               `mapstructure:"port"`
	ProvidersMustFunction bool              `mapstructure:"providers-must-function"`
	BasicAuth             map[string]string `mapstructure:"basic-auth"`
}

type SpeechToTextConfig struct {
	OpenAIWhisper OpenAIWhisperConfig `mapstructure:"open-ai-whisper"`
}

type OpenAIWhisperConfig struct {
	APIKey string `mapstructure:"api-key"`
}

type TextToSpeechConfig struct {
	ElevenLabs         ElevenLabsConfig         `mapstructure:"elevenlabs"`
	GoogleTextTOSpeech GoogleTextTOSpeechConfig `mapstructure:"google-text-to-speech"`
}

type ElevenLabsConfig struct {
	APIKey    string  `mapstructure:"api-key"`
	VoiceID   string  `mapstructure:"voice-id"`
	Stability float32 `mapstructure:"stability"`
	Clarity   float32 `mapstructure:"clarity"`
}

type GoogleTextTOSpeechConfig struct {
	PathToServiceAccountKeyFile string  `mapstructure:"path-to-service-account-key-file"`
	LanguageCode                string  `mapstructure:"language-code"`
	VoiceID                     string  `mapstructure:"voice-id"`
	Gender                      string  `mapstructure:"gender"`
	SpeakingRate                float32 `mapstructure:"speaking-rate"`
	Pitch                       float32 `mapstructure:"pitch"`
	VolumeGainDb                float32 `mapstructure:"volume-gain-db"`
}

type LlmConfig struct {
	OpenAIChatGPT OpenAIChatGPTConfig `mapstructure:"open-ai-chat-gpt"`
}

type OpenAIChatGPTConfig struct {
	APIKey string `mapstructure:"api-key"`
}
