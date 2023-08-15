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
	transcribe, err := t.SpeechToText.SpeechToText(c.Request().Context(), reader)
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

	// there is no place to set vOption on web page, use hard coded vOption in the moment
	vOption := providers.VOption{
		LanguageCode: "en-GB",
		Gender:       "female",
		SpeakingRate: 0.8,
		Pitch:        0,
		VolumeGainDb: 0,
		Stability:    0.3,
		Clarity:      0.5,
	}

	// there is no place to set voiceId on web page, use pre-defined voiceId in the moment

	bytes, err := t.TextToSpeech.TextToSpeech(c.Request().Context(), content, "", vOption)
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
	used, total, err := t.TextToSpeech.Quota(c.Request().Context())
	if err != nil {
		return err
	}
	stat := fmt.Sprintf("text-to-speech quota used: %d/%d", used, total)
	return c.String(http.StatusOK, stat)
}
