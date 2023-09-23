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

type TLSPolicy int

const (
	TLSPolicyNone            TLSPolicy = iota
	TLSPolicyProvided        TLSPolicy = iota
	TLSPolicySelfSignedOnFly TLSPolicy = iota
	TLSPolicyAuto            TLSPolicy = iota
)

type Auto struct {
	Domains []string `mapstructure:"domains"`
	Email   string   `mapstructure:"email"`
}

type Provided struct {
	Cert string `mapstructure:"cert"`
	Key  string `mapstructure:"key"`
}

type TLS struct {
	Auto       Auto     `mapstructure:"auto"`
	Provided   Provided `mapstructure:"provided"`
	SelfSigned bool     `mapstructure:"self-signed"`
}

func WhichTLSPolicy(tls TLS) TLSPolicy {
	if tls.SelfSigned {
		return TLSPolicySelfSignedOnFly
	} else if tls.Provided.Cert != "" {
		return TLSPolicyProvided
	} else if len(tls.Auto.Domains) > 0 {
		return TLSPolicyAuto
	} else {
		return TLSPolicyNone
	}
}
