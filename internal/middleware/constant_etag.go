package middleware

import (
	"fmt"
	"net/http"
	"path/filepath"
	"strings"

	"github.com/labstack/echo/v4"
	"github.com/proxoar/talk/internal/util"
)

var staticFileExtensions = []string{
	".css",
	".js",
	".png",
	".jpg",
	".jpeg",
	".gif",
}

// ConstantEtag
// Static files in this project does not change until the server restarts.
// This middleware writes a constant eTag header into resp when serving static files.
func ConstantEtag() echo.MiddlewareFunc {
	eTag := util.RandomHash16Chars()
	staticExts := make(map[string]struct{}, len(staticFileExtensions)*4)
	for _, ext := range staticFileExtensions {
		staticExts[ext] = struct{}{}
		staticExts[strings.ToUpper(ext)] = struct{}{}
	}

	return func(next echo.HandlerFunc) echo.HandlerFunc {
		return func(c echo.Context) (returnErr error) {
			path := c.Request().URL.Path
			if match := c.Request().Header.Get("If-None-Match"); match == eTag {
				fmt.Printf("got If-None-Match req, path:" + path)
				c.Response().WriteHeader(http.StatusNotModified)
				return
			}
			ext := filepath.Ext(path)
			_, ok := staticExts[ext]
			if ok {
				c.Response().Header().Set("ETag", eTag)
				c.Response().Header().Set("Cache-Control", "max-age=300") // 5 min in seconds
			}
			return next(c)
		}
	}
}
