package internal

import (
	"go.uber.org/zap"
	"go.uber.org/zap/zapcore"
	"sync"
)

var once = sync.Once{}

var sharedLogger *zap.Logger

func SharedLogger() *zap.Logger {
	once.Do(func() {
		sharedLogger = defaultLogger()
	})
	return sharedLogger
}

func defaultLogger() *zap.Logger {
	cfg := zap.NewDevelopmentConfig()
	cfg.EncoderConfig.EncodeLevel = zapcore.CapitalColorLevelEncoder
	logger, _ := cfg.Build()
	return logger
}
