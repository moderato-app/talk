package internal

import (
	"github.com/gorilla/websocket"
	"github.com/labstack/echo/v4"
	"go.uber.org/zap"
	"net/http"
)

type WebsocketHandler struct {
	talker *Talker
	logger *zap.Logger
}

func (w *WebsocketHandler) HandleWebSocket(c echo.Context) error {
	// 将HTTP连接升级为WebSocket连接
	upgrader := websocket.Upgrader{
		CheckOrigin: func(r *http.Request) bool {
			return true
		},
	}
	conn, err := upgrader.Upgrade(c.Response(), c.Request(), nil)
	if err != nil {
		return err
	}

	h := NewEventHandler(conn, w.talker, w.logger)
	return h.loop()
}
