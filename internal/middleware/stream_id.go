package middleware

import (
	"strings"

	"github.com/labstack/echo/v4"
)

const (
	StreamIdKey    = "stream-id"
	streamIdLength = 32
)

// StreamId
// The stream-id is a randomly generated string used by SSE to identify clients.
// The headers must include a stream id.
func StreamId(next echo.HandlerFunc) echo.HandlerFunc {
	return func(c echo.Context) (returnErr error) {
		if !strings.HasPrefix(c.Path(), "/api/") {
			return next(c)
		}
		id := c.Request().Header.Get(StreamIdKey)
		c.Logger().Debugf("StreamId middleware: stream-id: %s", id)
		if len(id) != streamIdLength {
			return echo.ErrBadRequest
		}
		c.Set(StreamIdKey, id)
		return next(c)
	}
}
