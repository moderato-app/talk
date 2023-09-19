package internal

import (
	"encoding/json"
	"errors"
	"net/http"

	"github.com/labstack/echo/v4"
	"github.com/proxoar/talk/internal/api"
	"github.com/proxoar/talk/internal/middleware"
	"github.com/tidwall/pretty"
	"go.uber.org/zap"
)

type RestfulEHandler struct {
	sse    *SSE
	talker *Talker
	logger *zap.Logger
}

func NewRestfulEHandler(talker *Talker, sse *SSE, logger *zap.Logger) *RestfulEHandler {
	return &RestfulEHandler{
		sse:    sse,
		talker: talker,
		logger: logger,
	}
}

func (h *RestfulEHandler) PostChat(c echo.Context) error {
	chat := new(api.Chat)
	err := c.Bind(chat)
	if err != nil {
		return err
	}
	err = api.RestfulValidator.Struct(chat)
	if err != nil {
		return err
	}
	id := c.Get(middleware.StreamIdKey).(string)
	h.logger.Sugar().Debug("option from client req", prettyJson(chat.TalkOption))
	handler := NewChatHandler(id, chat.ChatId, chat.TicketId, chat.TalkOption, h.sse, h.talker, h.logger)
	go func() {
		handler.Start(chat.Ms, nil)
	}()
	return c.NoContent(http.StatusOK)
}

func (h *RestfulEHandler) PostAudioChat(c echo.Context) error {
	// there are 2 files in the form: "chat" and "file"
	chatStr := c.FormValue("chat")
	if len(chatStr) == 0 {
		h.logger.Sugar().Error("chat is empty")
		return errors.New("chat is empty")
	}

	chat := new(api.Chat)
	err := json.Unmarshal([]byte(chatStr), chat)
	if err != nil {
		return err
	}
	err = api.RestfulValidator.Struct(chat)
	if err != nil {
		return err
	}
	h.logger.Sugar().Debug("option from client req", prettyJson(chat.TalkOption))

	audioFile, err := c.FormFile("audio")
	if err != nil {
		return err
	}
	reader, err := audioFile.Open()
	if err != nil {
		return err
	}
	filename := audioFile.Filename
	id := c.Get(middleware.StreamIdKey).(string)
	ar := AudioReader{
		Reader:   reader,
		FileName: filename,
	}
	handler := NewChatHandler(id, chat.ChatId, chat.TicketId, chat.TalkOption, h.sse, h.talker, h.logger)
	go func() {
		handler.Start(chat.Ms, &ar)
	}()
	return c.NoContent(http.StatusOK)
}

func (h *RestfulEHandler) ProvidersStatus(c echo.Context) error {
	// todo test each providers
	return c.String(http.StatusOK, "")
}

func (h *RestfulEHandler) Health(c echo.Context) error {
	return c.String(http.StatusOK, "healthy")
}

func prettyJson(any interface{}) string {
	marshal, _ := json.Marshal(any)
	return string(pretty.Color(pretty.Pretty(marshal), nil))
}
