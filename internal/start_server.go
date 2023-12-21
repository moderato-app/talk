package internal

import (
	"fmt"
	"io/fs"
	"net/http"
	"time"

	"github.com/brpaz/echozap"
	"github.com/caddyserver/certmagic"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"github.com/labstack/gommon/log"
	talk "github.com/proxoar/talk"
	"github.com/proxoar/talk/internal/config"
	middleware2 "github.com/proxoar/talk/internal/middleware"
	"github.com/suyashkumar/ssl-proxy/gen"
	"go.uber.org/zap"
)

func StartServer() {
	logger := mustDefaultLogger()

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

	serve(conf.Server.Tls, e, conf.Server.Port, logger)
}

func serve(t config.TLS, e *echo.Echo, port int, logger *zap.Logger) {
	serveRedirect := func() {
		e := echo.New()
		e.HideBanner = true
		e.Use(middleware.HTTPSRedirectWithConfig(middleware.RedirectConfig{Code: http.StatusTemporaryRedirect}))
		logger.Sugar().Fatal(e.Start(":80"))
	}

	var stopError error
	if t.SelfSigned {
		cert, key, _, err := gen.Keys(time.Hour * 24 * 30)
		if err != nil {
			logger.Sugar().Fatal("failed to create a cert:", err)
		}
		go serveRedirect()
		stopError = e.StartTLS(":443", cert.Bytes(), key.Bytes())
	} else if t.Provided.Cert != "" {
		go serveRedirect()
		stopError = e.StartTLS(":443", []byte(t.Provided.Cert), []byte(t.Provided.Key))
	} else if len(t.Auto.Domains) > 0 {
		// Why choose CertMagic over Echo's AutoTLSManager?
		// CertMagic provides more comprehensive information when issues arise, and is presently in a state of ongoing development

		// read and agree to your CA's legal documents
		certmagic.DefaultACME.Agreed = true
		// provide an email address
		certmagic.DefaultACME.Email = t.Auto.Email
		// use the staging endpoint while we're developing
		certmagic.DefaultACME.CA = certmagic.LetsEncryptProductionCA

		// Obtain the TLS configuration
		tlsConfig, err := certmagic.TLS(t.Auto.Domains)

		if err != nil {
			logger.Sugar().Fatal("failed to create a cert:", err)
		}
		httpsServer := &http.Server{
			Addr:      ":443",
			Handler:   e,
			TLSConfig: tlsConfig,
		}
		go serveRedirect()

		// print [::]:443 in green color
		green := "\033[32m"
		reset := "\033[0m"
		fmt.Printf("⇨ http server started on %s[::]:443%s\n", green, reset)
		stopError = httpsServer.ListenAndServeTLS("", "")
	} else {
		addr := fmt.Sprintf(":%d", port)
		stopError = e.Start(addr)
	}
	logger.Sugar().Fatal(stopError)
}
