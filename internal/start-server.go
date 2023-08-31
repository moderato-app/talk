package internal

import (
	"context"
	"fmt"
	"io/fs"

	"github.com/brpaz/echozap"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"github.com/labstack/gommon/log"
	talk "github.com/proxoar/talk"
	"github.com/proxoar/talk/internal/config"
	middleware2 "github.com/proxoar/talk/internal/middleware"
)

func StartServer() {
	logger := defaultLogger()

	conf := config.MustLoadConfig(logger)

	logger.Info("initialise talker...")
	// initialise Talker
	talker, err := NewTalker(context.Background(), *conf, logger)
	if err != nil {
		logger.Sugar().Panic("failed to create a talker:", err)
	}
	if conf.Server.ProvidersMustFunction {
		talker.ProvidersMustFunction()
	}

	logger.Info("initialise web server...")
	// Echo instance
	e := echo.New()
	e.Logger.SetLevel(log.DEBUG)
	e.HideBanner = true
	e.HTTPErrorHandler = func(err error, c echo.Context) {
		fmt.Printf(" %+v", err)
		c.Echo().DefaultHTTPErrorHandler(err, c)
	}

	// Middleware
	e.Use(echozap.ZapLogger(logger))
	e.Use(middleware.Logger())
	e.Use(middleware.Recover())
	e.Use(middleware2.AllowAllCors)

	logger.Info("initialise SSE server...")
	sh := NewSSEHandler(talker, logger)

	// route API
	api := e.Group("/api")
	if len(conf.Server.Passwords) != 0 {
		api.Use(middleware2.SPAuth(conf.Server.Passwords))
	}
	api.Any("/events", func(c echo.Context) error {
		sh.ServeHTTP(c.Response(), c.Request())
		return nil
	})
	api.POST("/conversation", sh.PostConv)
	api.POST("/audio-conversation", sh.PostAudioConv)
	api.GET("/Ability/llm", sh.GetLLMAbility)
	api.GET("/health", sh.Health)
	api.Use(middleware2.StreamId)

	//route static files
	w, err := fs.Sub(talk.Web, "web")
	if err != nil {
		logger.Sugar().Panic(err)
	}
	e.StaticFS("/", w)

	addr := fmt.Sprintf(":%d", conf.Server.Port)
	e.Logger.Fatal(e.Start(addr))
}
