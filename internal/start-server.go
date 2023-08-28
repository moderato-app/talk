package internal

import (
	"context"
	"fmt"
	"io/fs"

	"github.com/brpaz/echozap"
	talk "github.com/bubblelight/talk"
	"github.com/bubblelight/talk/internal/config"
	middleware2 "github.com/bubblelight/talk/internal/middleware"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"github.com/labstack/gommon/log"
	"github.com/r3labs/sse/v2"
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
	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins:  []string{"*"},
		AllowHeaders:  []string{"*"},
		AllowMethods:  []string{"*"},
		ExposeHeaders: []string{"*"},
	}))
	e.Use(middleware2.StreamId)

	// enable basic auth only when there is at least one pair of username and password
	if len(conf.Server.BasicAuth) > 0 {
		e.Use(middleware.BasicAuth(func(username, password string, c echo.Context) (bool, error) {
			if p, ok := conf.Server.BasicAuth[username]; ok && (p == "*" || p == password) {
				return true, nil
			}
			return false, nil
		}))
	}

	logger.Info("initialise SSE server...")
	s := sse.New()
	s.AutoReplay = false // AutoReplay is not mature. Enabling AutoReplay doesn't ensure idempotency
	s.AutoStream = true  // create the stream when client connects
	e.Any("/events", func(c echo.Context) error {
		s.ServeHTTP(c.Response(), c.Request())
		return nil
	})

	sh := NewSSEHandler(s, talker, logger)

	// route API
	api := e.Group("/api")
	api.POST("/conversation", sh.HandleConv)
	api.POST("/audio-conversation", sh.HandleAudioConv)

	//route static files
	w, err := fs.Sub(talk.Web, "web")
	if err != nil {
		logger.Sugar().Panic(err)
	}
	e.StaticFS("/", w)

	addr := fmt.Sprintf(":%d", conf.Server.Port)
	e.Logger.Fatal(e.Start(addr))
}
