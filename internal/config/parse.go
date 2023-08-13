package config

import (
	"github.com/pkg/errors"
	"github.com/spf13/pflag"
	"github.com/spf13/viper"
	"go.uber.org/zap"
)

const (
	DefaultServerPort                = 8000
	DefaultServerEagerCheckProviders = true
	DefaultElevenLabsExpressive      = 50
	DefaultElevenLabsClarity         = 50
	DefaultChatGPTModel              = "gpt-3.5-turbo"
	DefaultChatGPTMaxGenerationToken = 2000
)

func setDefaultValue() {
	viper.SetDefault("server.port", DefaultServerPort)
	viper.SetDefault("server.eager-check-providers", DefaultServerEagerCheckProviders)
	viper.SetDefault("text-to-speech.elevenlabs.expressive", DefaultElevenLabsExpressive)
	viper.SetDefault("text-to-speech.elevenlabs.clarity", DefaultElevenLabsClarity)
	viper.SetDefault("llm.open-ai-chat-gpt.model", DefaultChatGPTModel)
	viper.SetDefault("llm.open-ai-chat-gpt.max-generation-token", DefaultChatGPTMaxGenerationToken)
}

func readFile() error {
	viper.SetConfigName("config")     // name of config file (without extension)
	viper.SetConfigType("yaml")       // REQUIRED if the config file does not have the extension in the name
	viper.AddConfigPath("/etc/talk/") // path to look for the config file in
	viper.AddConfigPath("$HOME/.talk")
	viper.AddConfigPath("$HOME/.config/talk")
	viper.AddConfigPath(".")
	err := viper.ReadInConfig() // Find and read the config file
	return errors.Wrap(err, "")
}

func parseFlag() error {
	pflag.Int("server.port", DefaultServerPort, "Port to run Application server on")
	pflag.Parse()
	return viper.BindPFlags(pflag.CommandLine)
}

func bindEnv() {
	viper.AutomaticEnv()
	//viper.BindEnv("server.port", "SERVER_PORT")
	//viper.BindEnv("speech-to-text.open-ai-whisper.api-key", "OPENAI_WHISPER_API_KEY")
	//viper.BindEnv("text-to-speech.elevenlabs.api-key", "ELEVENLABS_API_KEY")
	//viper.BindEnv("text-to-speech.elevenlabs.voice-id", "ELEVENLABS_VOICE_ID")
	//viper.BindEnv("llm.open-ai-chat-gpt.api-key", "OPENAI_CHATGPT_API_KEY")
}

func LoadConfig(logger *zap.Logger) (*TalkConfig, error) {
	logger.Info("read config...")
	setDefaultValue()
	err := readFile()
	if err != nil {
		return nil, errors.Wrap(err, "cannot readFile")
	}
	err = parseFlag()
	if err != nil {
		return nil, errors.Wrap(err, "cannot parseFlag")
	}
	bindEnv()
	c := TalkConfig{}
	err = viper.UnmarshalExact(&c)
	if err != nil {
		return nil, errors.Wrap(err, "cannot unmarshal into config")
	}
	return &c, nil
}

func MustLoadConfig(logger *zap.Logger) *TalkConfig {
	c, err := LoadConfig(logger)
	if err != nil {
		logger.Sugar().Panicf("%+v", err)
	}
	return c
}
