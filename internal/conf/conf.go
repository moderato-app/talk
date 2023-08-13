package conf

type Config struct {
	Server       ServerConfig       `mapstructure:"server"`
	SpeechToText SpeechToTextConfig `mapstructure:"speech-to-text"`
	TextToSpeech TextToSpeechConfig `mapstructure:"text-to-speech"`
	Llm          LlmConfig          `mapstructure:"llm"`
}

type ServerConfig struct {
	Port                int               `mapstructure:"port"`
	EagerCheckProviders bool              `mapstructure:"eager-check-providers"`
	BasicAuth           map[string]string `mapstructure:"basic-auth"`
}

type SpeechToTextConfig struct {
	OpenAIWhisper OpenAIWhisperConfig `mapstructure:"open-ai-whisper"`
}

type OpenAIWhisperConfig struct {
	APIKey string `mapstructure:"api-key"`
}

type TextToSpeechConfig struct {
	ElevenLabs ElevenLabsConfig `mapstructure:"elevenlabs"`
}

type ElevenLabsConfig struct {
	APIKey     string `mapstructure:"api-key"`
	VoiceID    string `mapstructure:"voice-id"`
	Expressive int    `mapstructure:"expressive"`
	Clarity    int    `mapstructure:"clarity"`
}

type LlmConfig struct {
	OpenAIChatGPT OpenAIChatGPTConfig `mapstructure:"open-ai-chat-gpt"`
}

// model for ChatGPT
const (
	GPT432K0613           = "gpt-4-32k-0613"
	GPT432K0314           = "gpt-4-32k-0314"
	GPT432K               = "gpt-4-32k"
	GPT40613              = "gpt-4-0613"
	GPT40314              = "gpt-4-0314"
	GPT4                  = "gpt-4"
	GPT3Dot5Turbo0613     = "gpt-3.5-turbo-0613"
	GPT3Dot5Turbo0301     = "gpt-3.5-turbo-0301"
	GPT3Dot5Turbo16K      = "gpt-3.5-turbo-16k"
	GPT3Dot5Turbo16K0613  = "gpt-3.5-turbo-16k-0613"
	GPT3Dot5Turbo         = "gpt-3.5-turbo"
	GPT3Dot5TurboInstruct = "gpt-3.5-turbo-instruct"
)

type OpenAIChatGPTConfig struct {
	APIKey             string `mapstructure:"api-key"`
	Model              string `mapstructure:"model"`
	MaxGenerationToken int    `mapstructure:"max-generation-token"`
}
