package main

import (
	"context"
	"fmt"
	"github.com/brpaz/echozap"
	resource "github.com/bubblelight/talk"
	"github.com/bubblelight/talk/internal"
	"github.com/bubblelight/talk/internal/config"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"io/fs"
)

func main() {
	logger := internal.SharedLogger()

	conf := config.MustLoadConfig(logger)

	logger.Info("initialise talker...")
	// initialise Talker
	t, err := internal.NewTalker(context.Background(), *conf, logger)
	if err != nil {
		logger.Sugar().Panicf("failed to create a talker: %+v", err)
	}
	if conf.Server.EagerCheckProviders {
		t.MustCheckProviders()
	}

	logger.Info("initialise web server...")
	// Echo instance
	e := echo.New()
	e.HideBanner = true

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
	e.POST("/transcribe", t.Transcribe)
	e.POST("/ask", t.Ask)
	e.GET("/speech/:id", t.Speech)
	e.GET("/stat", t.Stat)

	//serve static files
	w, err := fs.Sub(resource.Web, "web")
	if err != nil {
		logger.Sugar().Panicf("%+v", err)
	}
	e.StaticFS("/", w)

	// Custom HTTP error handler
	e.HTTPErrorHandler = internal.ErrorHandler

	addr := fmt.Sprintf(":%d", conf.Server.Port)
	e.Logger.Fatal(e.Start(addr))
}
