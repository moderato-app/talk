package internal

import (
	"context"
	"encoding/json"
	"errors"
	"net/http"

	v2 "github.com/bubblelight/talk/internal/api/v2"
	"github.com/bubblelight/talk/internal/middleware"
	"github.com/bubblelight/talk/pkg/client"
	"github.com/labstack/echo/v4"
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

func (s *SSEHandler) HandleConv(c echo.Context) error {
	conv := new(v2.Conversation)
	err := c.Bind(conv)
	if err != nil {
		return err
	}
	err = v2.RestfulValidator.Struct(conv)
	if err != nil {
		return err
	}
	id := c.Get(middleware.StreamIdKey).(string)
	go func() { s.conv(context.Background(), id, conv) }()
	return c.NoContent(http.StatusOK)
}

func (s *SSEHandler) HandleAudioConv(c echo.Context) error {
	// there are 2 files in the form: "conversation" and "file"
	convStr := c.FormValue("conversation")
	if len(convStr) == 0 {
		s.logger.Sugar().Error("conversation is empty")
		return errors.New("conversation is empty")
	}

	conv := new(v2.Conversation)
	err := json.Unmarshal([]byte(convStr), conv)
	if err != nil {
		return err
	}
	err = v2.RestfulValidator.Struct(conv)
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
