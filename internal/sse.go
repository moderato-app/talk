package internal

import (
	"context"
	"encoding/json"
	"sync"
	"time"

	"github.com/labstack/echo/v4"
	"github.com/proxoar/talk/internal/api"
	"github.com/proxoar/talk/internal/util"
	"github.com/r3labs/sse/v2"
	"go.uber.org/zap"
)

const (
	keepAliveInterval = 15 * time.Second
)

type SSE struct {
	*sse.Server
	talker         *Talker
	logger         *zap.Logger
	keepAliveStops sync.Map
}

func NewSSE(talker *Talker, logger *zap.Logger) *SSE {
	sseServer := sse.New()
	sseServer.AutoReplay = false // AutoReplay is not mature. Enabling AutoReplay doesn't ensure idempotency
	sseServer.AutoStream = true  // create the stream when client connects
	s := SSE{
		Server:         sseServer,
		talker:         talker,
		logger:         logger,
		keepAliveStops: sync.Map{},
	}
	s.OnSubscribe = s.onSubscribe
	s.OnUnsubscribe = s.onUnsubscribe
	return &s
}

func (s *SSE) HandleEcho(c echo.Context) error {
	s.ServeHTTP(c.Response(), c.Request())
	return nil
}

// emit an Ability to on client subscription, and keepalive
func (s *SSE) onSubscribe(streamID string, _ *sse.Subscriber) {
	ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
	defer cancel()
	errs, ab := s.talker.Ability(ctx)
	for i, v := range errs {
		s.logger.Sugar().Errorf("error-%d when getting Ability: %s", i, v)
	}
	s.PublishData(streamID, api.EventSystemAbility, ab)

	go func() {
		stop := util.Every(keepAliveInterval, func(_ time.Time) bool {
			s.PublishData(streamID, api.EventSystemKeepAlive, "")
			return true
		})
		s.keepAliveStops.Store(streamID, stop)
	}()
}

func (s *SSE) onUnsubscribe(streamID string, _ *sse.Subscriber) {
	stop, ok := s.keepAliveStops.LoadAndDelete(streamID)
	if ok {
		stop.(chan bool) <- true
	}
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
