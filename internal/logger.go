package internal

import (
	"go.uber.org/zap"
	"go.uber.org/zap/zapcore"
)

func defaultLogger() *zap.Logger {
	cfg := zap.NewDevelopmentConfig()
	cfg.EncoderConfig.EncodeLevel = zapcore.CapitalColorLevelEncoder
	logger, _ := cfg.Build()
	return logger
}
