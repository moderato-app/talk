package internal

import (
	"fmt"
	"net/http"

	"github.com/labstack/echo/v4"
	"github.com/proxoar/talk/internal/api"
	"github.com/proxoar/talk/pkg/client"
)

func (t *Talker) Transcribe(c echo.Context) error {
	fh, err := c.FormFile("file")
	if err != nil {
		return err
	}
	reader, err := fh.Open()
	if err != nil {
		return err
	}
	transcribe, err := t.SpeechToText.SpeechToText(c.Request().Context(), reader, fh.Filename)
	if err != nil {
		return err
	}
	return c.JSON(http.StatusOK, api.TranscribeResp{Text: transcribe})
}

func (t *Talker) Ask(c echo.Context) error {
	askReq := new(api.AskReq)
	err := c.Bind(&askReq)
	if err != nil {
		return err
	}
	if len(askReq.Ms) == 0 {
		return c.String(http.StatusBadRequest, "conversation is empty")
	}
	content, err := t.LLM.Completion(c.Request().Context(), askReq.Ms, nil)
	if err != nil {
		return err
	}
	if len(content) == 0 {
		return c.NoContent(http.StatusNoContent)
	}

	// there is no place to set vOption on web page, use hard coded vOption in the moment
	vOption := client.VOption{
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
	return c.JSON(http.StatusOK, api.AskResp{Text: content, SpeechId: id})
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