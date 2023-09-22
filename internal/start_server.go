package internal

import (
	"fmt"
	"io/fs"

	"github.com/brpaz/echozap"
	"github.com/caddyserver/certmagic"
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
	talker, err := NewTalker(*conf, logger)
	if err != nil {
		logger.Sugar().Panic("failed to create a talker:", err)
	}

	logger.Info("initialise SSE server...")
	sse := NewSSE(talker, logger)

	logger.Info("initialise web server...")
	e := echo.New()
	e.Logger.SetLevel(log.DEBUG)
	e.HideBanner = true

	e.Use(echozap.ZapLogger(logger))
	e.Use(middleware.Logger())
	e.Use(middleware.Recover())
	e.Use(middleware2.AllowAllCors)

	// API
	h := NewRestfulEHandler(talker, sse, logger)
	api := e.Group("/api")
	if len(conf.Server.Passwords) != 0 {
		api.Use(middleware2.SPAuth(conf.Server.Passwords))
	}
	api.GET("/health", h.Health)
	api.Any("/events", sse.HandleEcho)
	api.Use(middleware2.StreamId)
	api.POST("/chat", h.PostChat)
	api.POST("/audio-chat", h.PostAudioChat)
	api.GET("/providers/status", h.ProvidersStatus)

	// route static files
	w, err := fs.Sub(talk.Web, "web/html")
	if err != nil {
		logger.Sugar().Panic(err)
	}
	s := e.Group("/*")
	s.Use(middleware2.ConstantEtag())
	s.Use(middleware2.SinglePageApp(""))
	s.StaticFS("/*", w)

	// Why choose CertMagic over Echo's AutoTLSManager?
	// CertMagic provides more comprehensive information when issues arise, and is presently in a state of ongoing development
	var tls = conf.Server.Tls
	if len(tls.AutoTlsDomains) > 0 {
		// read and agree to your CA's legal documents
		certmagic.DefaultACME.Agreed = true
		// provide an email address
		certmagic.DefaultACME.Email = tls.AutoTlsLetsEncryptEmail
		// use the staging endpoint while we're developing
		certmagic.DefaultACME.CA = certmagic.LetsEncryptStagingCA
		e.Logger.Fatal(certmagic.HTTPS(tls.AutoTlsDomains, e))
	} else {
		addr := fmt.Sprintf(":%d", conf.Server.Port)
		e.Logger.Fatal(e.Start(addr))
	}
}
