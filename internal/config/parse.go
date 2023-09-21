package config

import (
	"errors"
	"strings"

	"github.com/spf13/pflag"
	"github.com/spf13/viper"
	"go.uber.org/zap"
)

const (
	DefaultServerPort = 8000
)

func setDefaultValue() {
	viper.SetDefault("server.port", DefaultServerPort)
	viper.SetDefault("server.check-health-on-startup", false)
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

func bindEnv() {
	viper.AutomaticEnv()
}

func LoadConfig(logger *zap.Logger) (*TalkConfig, error) {
	path := pflag.String("config", "", "Path to config file. ")
	pflag.Parse()

	setDefaultValue()
	if path != nil && *path != "" {
		logger.Sugar().Info("reading config file: ", *path)
		viper.SetConfigFile(*path)
		err := viper.ReadInConfig()
		if err != nil {
			return nil, err
		}
	} else {
		logger.Sugar().Info("searching config file")
		err := readFile()
		if err != nil {
			if strings.Contains(err.Error(), "While parsing config: yaml: invalid trailing UTF-8 octet") {
				// viper takes our talk binary as config file
				return nil, errors.New(" Config File \"talk\" Not Found in \"[/etc/talk /Users/clement/.config/talk /Users/clement/.talk /Users/clement /Users/clement/projects/talk]\"")
			}
			return nil, err
		}
	}

	bindEnv()

	c := TalkConfig{}
	err := viper.UnmarshalExact(&c)
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
