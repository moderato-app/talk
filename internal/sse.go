package internal

import (
	"context"
	"encoding/json"

	"github.com/labstack/echo/v4"
	"github.com/proxoar/talk/internal/api"
	"github.com/r3labs/sse/v2"
	"go.uber.org/zap"
)

type SSE struct {
	*sse.Server
	talker *Talker
	logger *zap.Logger
}

func NewSSE(talker *Talker, logger *zap.Logger) *SSE {
	sseServer := sse.New()
	sseServer.AutoReplay = false // AutoReplay is not mature. Enabling AutoReplay doesn't ensure idempotency
	sseServer.AutoStream = true  // create the stream when client connects
	s := SSE{
		Server: sseServer,
		talker: talker,
		logger: logger,
	}
	s.OnSubscribe = s.sendAbilityEvent
	return &s
}

func (s *SSE) HandleEcho(c echo.Context) error {
	s.ServeHTTP(c.Response(), c.Request())
	return nil
}

// emit an Ability to on client subscription
func (s *SSE) sendAbilityEvent(streamID string, _ *sse.Subscriber) {
	errs, ab := s.talker.Ability(context.Background())
	for i, v := range errs {
		s.logger.Sugar().Errorf("error-%d when getting Ability: %s", i, v)
	}
	s.PublishData(streamID, api.EventSystemAbility, ab)
}

func (s *SSE) toEvent(eventName string, data interface{}) (event *sse.Event, err error) {
	marshal, err := json.Marshal(data)
	if err != nil {
		return nil, err
	}

	// ID is not set because r3labs/sse does not utilize the ID
	return &sse.Event{
		Data:  marshal,
		Event: []byte(eventName),
	}, nil
}

func (s *SSE) PublishData(streamId, eventName string, data interface{}) {
	event, err := s.toEvent(eventName, data)
	if err != nil {
		s.logger.Error(err.Error())
		return
	}
	s.Publish(streamId, event)
}
