package config

type TalkConfig struct {
	Server       ServerConfig       `mapstructure:"server"`
	SpeechToText SpeechToTextConfig `mapstructure:"speech-to-text"`
	TextToSpeech TextToSpeechConfig `mapstructure:"text-to-speech"`
	Llm          LlmConfig          `mapstructure:"llm"`
}

type ServerConfig struct {
	Port      int      `mapstructure:"port"`
	Passwords []string `mapstructure:"passwords"`
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
	APIKey string `mapstructure:"api-key"`
}

type GoogleTextTOSpeechConfig struct {
	ServiceAccountJson string `mapstructure:"service-account-json"`
}

type LlmConfig struct {
	OpenAIChatGPT OpenAIChatGPTConfig `mapstructure:"open-ai-chat-gpt"`
}

type OpenAIChatGPTConfig struct {
	APIKey string `mapstructure:"api-key"`
}
