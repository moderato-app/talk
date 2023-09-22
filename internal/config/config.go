package config

type TalkConfig struct {
	Server       ServerConfig       `mapstructure:"server"`
	SpeechToText SpeechToTextConfig `mapstructure:"speech-to-text"`
	TextToSpeech TextToSpeechConfig `mapstructure:"text-to-speech"`
	Llm          LlmConfig          `mapstructure:"llm"`

	Creds map[string]string `mapstructure:"creds"`
}

type ServerConfig struct {
	Port                 int      `mapstructure:"port"`
	CheckHealthOnStartup bool     `mapstructure:"check-health-on-startup"`
	Passwords            []string `mapstructure:"passwords"`
	DemoMode             bool     `mapstructure:"demo-mode"`
	Tls                  TLS      `mapstructure:"tls"`
}

type SpeechToTextConfig struct {
	Whisper string `mapstructure:"whisper"`
	Google  string `mapstructure:"google"`
}

type TextToSpeechConfig struct {
	ElevenLabs string `mapstructure:"elevenlabs"`
	Google     string `mapstructure:"google"`
}

type LlmConfig struct {
	ChatGPT string `mapstructure:"chat-gpt"`
}

type TLS struct {
	AutoTlsDomains          []string `mapstructure:"auto-tls-domains"`
	AutoTlsLetsEncryptEmail string   `mapstructure:"auto-tls-lets-encrypt-email"`
}
