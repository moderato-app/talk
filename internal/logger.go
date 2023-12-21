package internal

import (
	"go.uber.org/zap"
	"go.uber.org/zap/zapcore"
	"log"
	"os"
)

func mustDefaultLogger() *zap.Logger {
	logLevel := os.Getenv("LOG_LEVEL")
	level := zap.NewAtomicLevel()
	err := level.UnmarshalText([]byte(logLevel))
	if err != nil {
		log.Fatal("Invalid log level:", err)
	}
	cfg := zap.NewProductionConfig()
	cfg.Level = level
	cfg.Encoding = "console"
	cfg.EncoderConfig.EncodeLevel = zapcore.CapitalColorLevelEncoder
	logger, _ := cfg.Build()
	return logger
}
