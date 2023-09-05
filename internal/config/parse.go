package config

import (
	"github.com/spf13/pflag"
	"github.com/spf13/viper"
	"go.uber.org/zap"
)

const (
	DefaultServerPort = 8000
)

func setDefaultValue() {
	viper.SetDefault("server.port", DefaultServerPort)
}

func readFile() error {
	viper.SetConfigName("talk")       // name of config file (without extension)
	viper.SetConfigType("yaml")       // REQUIRED if the config file does not have the extension in the name
	viper.AddConfigPath("/etc/talk/") // path to look for the config file in
	viper.AddConfigPath("$HOME/.config/talk")
	viper.AddConfigPath("$HOME/.talk")
	viper.AddConfigPath("$HOME/")
	viper.AddConfigPath(".")
	return viper.ReadInConfig() // Find and read the config file
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
		return nil, err
	}
	err = parseFlag()
	if err != nil {
		return nil, err
	}
	bindEnv()
	c := TalkConfig{}
	err = viper.UnmarshalExact(&c)
	if err != nil {
		return nil, err
	}
	return &c, nil
}

func MustLoadConfig(logger *zap.Logger) *TalkConfig {
	c, err := LoadConfig(logger)
	if err != nil {
		logger.Sugar().Panic(err)
	}
	return c
}
