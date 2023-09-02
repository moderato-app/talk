package middleware

import (
	"crypto/sha256"
	"encoding/hex"
	"net/http"
	"strings"
	"time"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

type (
	// SPAuthConfig defines the config for SPAuth middleware.
	SPAuthConfig struct {
		// Skipper defines a function to skip middleware.
		Skipper middleware.Skipper

		Expiration time.Duration
		Passwords  []string
	}

	// SPAuthValidator defines a function to validate SPAuth credentials.
	SPAuthValidator func(string, string, echo.Context) (bool, error)
)

const (
	expiration = 30 * 27 * time.Hour
	bearer     = "Bearer"
	hashLength = 64
)

var (
	// DefaultSPAuthConfig is the default SPAuth middleware config.
	DefaultSPAuthConfig = SPAuthConfig{
		Skipper:    middleware.DefaultSkipper,
		Expiration: expiration,
	}
)

// SPAuth returns an SPAuth middleware.
//
// Header example: Authorization: Bearer 00THIS00IS00A00HASH
// For valid credentials it calls the next handler.
// For missing or invalid credentials, it sends "401 - Unauthorized" response.
func SPAuth(passwords []string) echo.MiddlewareFunc {
	c := DefaultSPAuthConfig
	c.Passwords = passwords
	return SPAuthWithConfig(c)
}

// SPAuthWithConfig returns an SPAuth middleware with config.
// See `SPAuth()`.
func SPAuthWithConfig(config SPAuthConfig) echo.MiddlewareFunc {
	if len(config.Passwords) == 0 {
		// it's meaningless to use SPAuth middleware if no passwords are present
		panic("SPAuth middleware requires at least one password")
	}
	if config.Skipper == nil {
		config.Skipper = DefaultSPAuthConfig.Skipper
	}
	if config.Expiration == 0 {
		config.Expiration = expiration
	}

	// create a map with k=hash, pass=raw-password
	passMap := make(map[string]string, len(config.Passwords))

	for _, pass := range config.Passwords {
		sha := sha256.New()
		sha.Write([]byte(pass))
		b := sha.Sum(nil)
		hash := hex.EncodeToString(b)
		passMap[hash] = pass
	}

	return func(next echo.HandlerFunc) echo.HandlerFunc {
		return func(c echo.Context) error {
			if config.Skipper(c) {
				return next(c)
			}

			auth := c.Request().Header.Get(echo.HeaderAuthorization)
			l := len(bearer)

			if len(auth) > l+1 && strings.EqualFold(auth[:l], bearer) {
				// Invalid base64 shouldn't be treated as error
				// instead should be treated as invalid client input
				hash := auth[l+1:]
				if len(hash) != hashLength {
					return echo.NewHTTPError(http.StatusUnauthorized, "single-password-auth hash is incorrect")
				}

				password, ok := passMap[hash]
				if ok {
					c.Logger().Debug(maskPassword(password) + " has passed single-password-auth")
					return next(c)
				} else {
					return echo.NewHTTPError(http.StatusUnauthorized, "wrong password")
				}
			}
			return echo.NewHTTPError(http.StatusUnauthorized, "single-password-auth malformed")
		}
	}
}

// maskPassword replace the middle part of a password with ***
//
// if pass is too short, just return it
func maskPassword(pass string) string {
	res := make([]byte, len(pass))
	for i := 0; i < len(pass); i++ {
		if len(pass)/4 < i && i < len(pass)*3/4 {
			res[i] = '*'
		} else {
			res[i] = pass[i]
		}
	}
	return string(res)
}
