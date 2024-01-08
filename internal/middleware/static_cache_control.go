package middleware

import (
	"path/filepath"
	"strings"

	"github.com/labstack/echo/v4"
)

var staticFileExtensions = []string{
	".css",
	".js",
	".png",
	".jpg",
	".jpeg",
	".gif",
	".svg",
}

// StaticCacheControl
// Set max-age for static resources
func StaticCacheControl() echo.MiddlewareFunc {
	staticExts := make(map[string]struct{})
	for _, ext := range staticFileExtensions {
		staticExts[ext] = struct{}{}
		staticExts[strings.ToUpper(ext)] = struct{}{}
	}

	return func(next echo.HandlerFunc) echo.HandlerFunc {
		return func(c echo.Context) (returnErr error) {
			err := next(c)
			if err != nil {
				return err
			}
			path := c.Request().URL.Path
			ext := filepath.Ext(path)
			if _, ok := staticExts[ext]; ok {
				c.Response().Header().Set("Cache-Control", "max-age=300") // 5 min in seconds
			}
			return
		}
	}
}
