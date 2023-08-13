package internal

import (
	"github.com/bubblelight/talk/pkg/client"
	"github.com/google/uuid"
	"github.com/labstack/echo/v4"
	"github.com/patrickmn/go-cache"
	"net/http"
	"time"
)

var speechCache *cache.Cache

func init() {
	speechCache = cache.New(10*time.Minute, time.Minute)
}

func (t *Talker) Transcribe(c echo.Context) error {
	fh, err := c.FormFile("file")
	if err != nil {
		return err
	}
	reader, err := fh.Open()
	if err != nil {
		return err
	}
	transcribe, err := t.ToText.Transcribe(c.Request().Context(), reader)
	if err != nil {
		return err
	}
	m := map[string]string{
		"text": transcribe,
	}
	return c.JSON(http.StatusOK, m)
}

func (t *Talker) Ask(c echo.Context) error {
	ask := new(Ask)
	err := c.Bind(&ask)
	if err != nil {
		return err
	}
	if len(ask.Ms) == 0 {
		return c.String(http.StatusBadRequest, "conversation is empty")
	}
	content, err := t.LLM.Complete(c.Request().Context(), ask.Ms, nil)
	if err != nil {
		return err
	}
	if len(content) == 0 {
		return c.NoContent(http.StatusNoContent)
	}

	bytes, err := t.ToSpeech.TextToSpeech(c.Request().Context(), content, nil, nil)
	if err != nil {
		return err
	}

	id := uuid.New().String()
	speechCache.Set(id, bytes, 10*time.Minute)
	c.Logger().Info("put speech into cache, speechId:", id)
	m := map[string]string{
		"text":     content,
		"speechId": id,
	}
	return c.JSON(http.StatusOK, m)
}

type Ask struct {
	Ms []client.Message `json:"conversation"`
}

func (t *Talker) Speech(c echo.Context) error {
	id := c.Param("id")
	v, ok := speechCache.Get(id)
	if !ok {
		c.Logger().Info("failed to find speech from cache, speechId:", id)
		return c.NoContent(http.StatusNotFound)
	}
	bytes := v.([]byte)
	return c.Blob(http.StatusOK, "audio/mp3", bytes)
}
