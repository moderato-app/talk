package internal

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"net/http"

	"github.com/labstack/echo/v4"
	"github.com/proxoar/talk/internal/api"
	"github.com/proxoar/talk/internal/middleware"
	"github.com/proxoar/talk/pkg/ability"
	"github.com/proxoar/talk/pkg/client"
	"go.uber.org/zap"
)

// there is no place to set vOption on web page, use hardcoded vOption in the moment

var TTSEnGBOption = client.VOption{
	LanguageCode: "en-GB",
	Gender:       "female",
	SpeakingRate: 0.8,
	Pitch:        0,
	VolumeGainDb: 0,
	Stability:    0.3,
	Clarity:      0.5,
}

var TTSZhCNOption = client.VOption{
	LanguageCode: "zh-CN",
	Gender:       "female",
	SpeakingRate: 1,
	Pitch:        0,
	VolumeGainDb: 0,
	Stability:    0.3,
	Clarity:      0.5,
}

func (s *SSEHandler) PostConv(c echo.Context) error {
	conv := new(api.Conversation)
	s.logger.Sugar().Debug("PostConv body:", conv)
	err := c.Bind(conv)
	if err != nil {
		return err
	}
	err = api.RestfulValidator.Struct(conv)
	if err != nil {
		return err
	}
	id := c.Get(middleware.StreamIdKey).(string)
	go func() { s.conv(context.Background(), id, conv) }()
	return c.NoContent(http.StatusOK)
}

func (s *SSEHandler) PostAudioConv(c echo.Context) error {
	// there are 2 files in the form: "conversation" and "file"
	convStr := c.FormValue("conversation")
	if len(convStr) == 0 {
		s.logger.Sugar().Error("conversation is empty")
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
	go func() { s.audio(context.Background(), id, reader, filename, conv) }()
	return c.NoContent(http.StatusOK)
}

func (s *SSEHandler) GetLLMAbility(c echo.Context) error {
	a := ability.LLMAb{}
	err := s.talker.LLM.SetAbility(c.Request().Context(), &a)
	if err != nil {
		s.logger.Error("failed to get Ability of LLM", zap.Error(err))
		return err
	}
	return c.JSON(http.StatusOK, a)
}

func (s *SSEHandler) Stat(c echo.Context) error {
	used, total, err := s.talker.TextToSpeech.Quota(c.Request().Context())
	if err != nil {
		return err
	}
	stat := fmt.Sprintf("text-to-speech quota used: %d/%d", used, total)
	return c.String(http.StatusOK, stat)
}

func (s *SSEHandler) Health(c echo.Context) error {
	return c.String(http.StatusOK, "healthy")
}
