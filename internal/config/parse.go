package config

import (
	"github.com/pkg/errors"
	"github.com/spf13/pflag"
	"github.com/spf13/viper"
	"go.uber.org/zap"
)

const (
	DefaultServerPort                           = 8000
	DefaultServerEagerCheckProviders            = true
	DefaultElevenLabsStability                  = 0.5
	DefaultElevenLabsClarity                    = 0.5
	DefaultGoogleTTSPathToServiceAccountKeyFile = "./google-service-account-key.json"
	DefaultGoogleTTSLanguageCode                = "en-US"
	DefaultGoogleTTSGender                      = "female"
	DefaultGoogleTTSSpeakingRate                = 1
	DefaultGoogleTTSPitch                       = 0
	DefaultGoogleTTSVolumeGainDb                = 0
	DefaultChatGPTModel                         = "gpt-3.5-turbo"
	DefaultChatGPTMaxGenerationToken            = 2000
)

func setDefaultValue() {
	viper.SetDefault("server.port", DefaultServerPort)
	viper.SetDefault("server.providers-must-function", DefaultServerEagerCheckProviders)

	viper.SetDefault("text-to-speech.elevenlabs.stability", DefaultElevenLabsStability)
	viper.SetDefault("text-to-speech.elevenlabs.clarity", DefaultElevenLabsClarity)

	viper.SetDefault("text-to-speech.google-text-to-speech.path-to-service-account-key-file", DefaultGoogleTTSPathToServiceAccountKeyFile)
	viper.SetDefault("text-to-speech.google-text-to-speech.gender", DefaultGoogleTTSGender)
	viper.SetDefault("text-to-speech.google-text-to-speech.language-code", DefaultGoogleTTSLanguageCode)
	viper.SetDefault("text-to-speech.google-text-to-speech.speaking-rate", DefaultGoogleTTSSpeakingRate)
	viper.SetDefault("text-to-speech.google-text-to-speech.pitch", DefaultGoogleTTSPitch)
	viper.SetDefault("text-to-speech.google-text-to-speech.volume-gain-db", DefaultGoogleTTSVolumeGainDb)

	viper.SetDefault("llm.open-ai-chat-gpt.model", DefaultChatGPTModel)
	viper.SetDefault("llm.open-ai-chat-gpt.max-generation-token", DefaultChatGPTMaxGenerationToken)
}

func readFile() error {
	viper.SetConfigName("talk")       // name of config file (without extension)
	viper.SetConfigType("yaml")       // REQUIRED if the config file does not have the extension in the name
	viper.AddConfigPath("/etc/talk/") // path to look for the config file in
	viper.AddConfigPath("$HOME/.config/talk")
	viper.AddConfigPath("$HOME/.talk")
	viper.AddConfigPath("$HOME/")
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
