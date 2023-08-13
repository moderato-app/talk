package main

import (
	"context"
	"fmt"
	"github.com/brpaz/echozap"
	"github.com/bubblelight/talk/internal"
	"github.com/bubblelight/talk/internal/conf"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"go.uber.org/zap"
	"go.uber.org/zap/zapcore"
	"io/fs"
	"net/http"
)

func main() {
	logger := DefaultLogger()

	conf := conf.MustLoadConfig(logger)

	// initialise Talker
	t, err := internal.NewTalker(context.Background(), *conf, logger)
	if err != nil {
		logger.Sugar().Panicf("failed to create a talker: %+v", err)
	}
	if conf.Server.EagerCheckProviders {
		t.MustCheckProviders()
	}

	// Echo instance
	e := echo.New()

	// Middleware
	e.Use(echozap.ZapLogger(logger))
	e.Use(middleware.Logger())
	e.Use(middleware.Recover())
	// enable basic auth only when there is at least one pair of username and password
	if len(conf.Server.BasicAuth) > 0 {
		e.Use(middleware.BasicAuth(func(username, password string, c echo.Context) (bool, error) {
			if p, ok := conf.Server.BasicAuth[username]; ok && (p == "*" || p == password) {
				return true, nil
			}
			return false, nil
		}))
	}
	// Routes
	e.GET("/stat", t.Stat)
	e.POST("/transcribe", t.Transcribe)
	e.POST("/ask", t.Ask)
	e.GET("/speech/:id", t.Speech)

	// serve static files
	public, err := fs.Sub(internal.Public, "public")
	if err != nil {
		logger.Sugar().Panicf("%+v", err)
	}
	f := http.FS(public)
	e.GET("/*", echo.WrapHandler(http.FileServer(f)))

	// Custom HTTP error handler
	e.HTTPErrorHandler = func(err error, c echo.Context) {
		fmt.Printf(" %+v", err)
		e.DefaultHTTPErrorHandler(err, c)
	}

	addr := fmt.Sprintf(":%d", conf.Server.Port)
	e.Logger.Fatal(e.Start(addr))
}

func DefaultLogger() *zap.Logger {
	config := zap.NewDevelopmentConfig()
	config.EncoderConfig.EncodeLevel = zapcore.CapitalColorLevelEncoder
	logger, _ := config.Build()
	return logger
}
