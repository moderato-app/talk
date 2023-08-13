package internal

import (
	"fmt"
	"github.com/bubblelight/talk/pkg/providers"
	"github.com/labstack/echo/v4"
	"net/http"
)

func ErrorHandler(err error, c echo.Context) {
	fmt.Printf(" %+v", err)
	c.Echo().DefaultHTTPErrorHandler(err, c)
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

	id := TalkCache.PutSpeech(bytes)
	m := map[string]string{
		"text":     content,
		"speechId": id,
	}
	return c.JSON(http.StatusOK, m)
}

type Ask struct {
	Ms []providers.Message `json:"conversation"`
}

func (t *Talker) Speech(c echo.Context) error {
	id := c.Param("id")
	data, ok := TalkCache.GetSpeech(id)
	if !ok {
		c.Logger().Info("failed to find speech from cache, speechId:", id)
		return c.NoContent(http.StatusNotFound)
	}
	return c.Blob(http.StatusOK, "audio/mp3", data)
}

func (t *Talker) Stat(c echo.Context) error {
	used, total, err := t.ToSpeech.Quota(c.Request().Context())
	if err != nil {
		return err
	}
	stat := fmt.Sprintf("text-to-speech quota used: %d/%d", used, total)
	return c.String(http.StatusOK, stat)
}
