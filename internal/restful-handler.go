package internal

import (
	"encoding/json"
	"errors"
	"net/http"

	"github.com/labstack/echo/v4"
	"github.com/proxoar/talk/internal/api"
	"github.com/proxoar/talk/internal/middleware"
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

func (h *RestfulEHandler) PostConv(c echo.Context) error {
	conv := new(api.Conversation)
	err := c.Bind(conv)
	if err != nil {
		return err
	}
	err = api.RestfulValidator.Struct(conv)
	if err != nil {
		return err
	}
	id := c.Get(middleware.StreamIdKey).(string)

	handler := NewConvHandler(id, conv.Id, conv.TalkOption, h.sse, h.talker, h.logger)
	go func() {
		handler.Start(conv.Ms, nil)
	}()
	return c.NoContent(http.StatusOK)
}

func (h *RestfulEHandler) PostAudioConv(c echo.Context) error {
	// there are 2 files in the form: "conversation" and "file"
	convStr := c.FormValue("conversation")
	if len(convStr) == 0 {
		h.logger.Sugar().Error("conversation is empty")
		return errors.New("conversation is empty")
	}

	conv := new(api.Conversation)
	err := json.Unmarshal([]byte(convStr), conv)
	if err != nil {
		return err
	}
	err = api.RestfulValidator.Struct(conv)
	if err != nil {
		return err
	}

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
	ar := api.AudioReader{
		Reader:   reader,
		FileName: filename,
	}
	handler := NewConvHandler(id, conv.Id, conv.TalkOption, h.sse, h.talker, h.logger)
	go func() {
		handler.Start(conv.Ms, &ar)
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
