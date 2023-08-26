package internal

import (
	"context"
	"fmt"
	"github.com/brpaz/echozap"
	talk "github.com/bubblelight/talk"
	"github.com/bubblelight/talk/internal/config"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"github.com/labstack/gommon/log"
	"golang.org/x/crypto/acme/autocert"
	_ "golang.org/x/crypto/acme/autocert"
	"io/fs"
	"os"
)

func StartServer() {
	logger := SharedLogger()

	conf := config.MustLoadConfig(logger)

	logger.Info("initialise talker...")
	// initialise Talker
	talker, err := NewTalker(context.Background(), *conf, logger)
	if err != nil {
		logger.Sugar().Panicf("failed to create a talker: %+v", err)
	}
	if conf.Server.ProvidersMustFunction {
		talker.ProvidersMustFunction()
	}

	logger.Info("initialise web server...")
	// Echo instance
	e := echo.New()
	e.Logger.SetOutput(os.Stdout)

	e.Logger.SetLevel(log.DEBUG)

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

	// route API
	apiGroup := e.Group("/api")
	apiGroup.POST("/transcribe", talker.Transcribe)
	apiGroup.POST("/ask", talker.Ask)
	apiGroup.GET("/speech/:id", talker.Speech)
	apiGroup.GET("/stat", talker.Stat)

	//route static files
	w, err := fs.Sub(talk.Web, "web")
	if err != nil {
		logger.Sugar().Panicf("%+v", err)
	}
	e.StaticFS("/", w)

	// Custom HTTP error handler
	e.HTTPErrorHandler = ErrorHandler

	wh := &WebsocketHandler{talker: talker, logger: logger}
	// route websocket
	e.GET("/ws", wh.HandleWebSocket)

	e.AutoTLSManager = autocert.Manager{
		Prompt:     autocert.AcceptTOS,
		HostPolicy: autocert.HostWhitelist("localhost"),
		Cache:      autocert.DirCache("certs"),
	}

	addr := fmt.Sprintf(":%d", conf.Server.Port)
	e.Logger.Fatal(e.Start(addr))
}
