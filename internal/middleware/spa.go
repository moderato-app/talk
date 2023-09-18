package middleware

import (
	"github.com/labstack/echo/v4"
)

// SinglePageApp
// acts like nginx try_files: {try_files $uri /index.html}
//
// This is useful when serving a single page application
func SinglePageApp(fallback string) echo.MiddlewareFunc {
	return func(next echo.HandlerFunc) echo.HandlerFunc {
		return func(c echo.Context) (returnErr error) {
			err := next(c)
			if err == echo.ErrNotFound {
				// echo.StaticFS reads path from here
				c.SetParamNames("*")
				c.SetParamValues(fallback)
				//  and here, wtf?
				c.Request().URL.Path = fallback
				return next(c)
			} else {
				return err
			}
		}
	}
}
