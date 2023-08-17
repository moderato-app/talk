package internal

import (
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	. "github.com/bubblelight/talk/internal/api"
	"github.com/bubblelight/talk/pkg/client"
	"github.com/google/uuid"
	"github.com/gorilla/websocket"
	"github.com/pkg/errors"
	"go.uber.org/zap"
	"sync"
)

// EventHandler handle all events from a websocket.Conn
type EventHandler struct {
	conn   *websocket.Conn
	mu     sync.Mutex
	talker *Talker
	logger *zap.Logger
}

func NewEventHandler(conn *websocket.Conn, talker *Talker, logger *zap.Logger) *EventHandler {
	return &EventHandler{
		conn:   conn,
		mu:     sync.Mutex{},
		talker: talker,
		logger: logger,
	}
}

func (h *EventHandler) loop() error {
	defer h.conn.Close()
	for {
		// ignore messageType because we use only binary format
		mt, m, err := h.conn.ReadMessage()
		fmt.Print(mt)
		if err != nil {
			var closeErr *websocket.CloseError
			if errors.As(err, &closeErr) {
				h.logger.Sugar().Infow("Connection closed", "remote", h.conn.RemoteAddr(), "error", closeErr)
				return nil
			} else {
				h.logger.Sugar().Error("Failed to read message", h.conn.RemoteAddr(), err)
				return err
			}
		}
		go func() {
			h.dispatch(m)
		}()
	}
}

func (h *EventHandler) dispatch(message []byte) {

	h.logger.Sugar().Debugw("Received message", "remote", h.conn.RemoteAddr(), "len", len(message))
	if len(message) < 1000 {
		h.logger.Sugar().Debug("Received message content: ", string(message))
	}

	meta := new(InMeta)
	err := json.Unmarshal(message, meta)
	if err != nil {
		h.logger.Sugar().Error(err)
		return
	}
	switch meta.Type {
	case InEventTypeAudio:
		i := new(InAudio)
		err := json.Unmarshal(message, i)
		if err != nil {
			h.logger.Sugar().Error(err)
			return
		}
		h.HandleAudio(context.Background(), i)
	case InEventTypeConversation:
		i := new(InConversation)
		err := json.Unmarshal(message, i)
		if err != nil {
			h.logger.Sugar().Error(err)
			return
		}
		h.HandleConv(context.Background(), i)
	}
}

// HandleConv
//
// 1. Requests the answer from LLM (Language Model)
// 2. Sends the answer to the client in a separate goroutine (concurrent execution)
// 3. Sends the answer to a text-to-speech server and obtains the corresponding audio
// 4. Sends the audio to the client
func (h *EventHandler) HandleConv(ctx context.Context, e *InConversation) {
	if len(e.Conversation) == 0 {
		h.writeEvent(OutMeta{Type: OutEventTypeMessage, ReplyToId: e.Id, Err: "conversation is empty"})
		return
	}
	// 1. Requests the answer from LLM (Language Model)
	content, err := h.talker.LLM.Complete(ctx, e.Conversation, nil)
	if err != nil {
		h.writeEvent(OutMeta{Type: OutEventTypeMessage, ReplyToId: e.Id, Err: "got an error from LLM sever"})
		return
	}
	if len(content) == 0 {
		h.writeEvent(OutMeta{Type: OutEventTypeMessage, ReplyToId: e.Id, Err: "got empty content from LLM sever"})
		return
	}
	textEvent := OutMessage{
		OutMeta: OutMeta{
			Type:      OutEventTypeMessage,
			ReplyToId: e.Id,
			EOF:       true,
		},
		Message: client.Message{Role: "assistant", Content: content},
	}
	// 2. Sends the answer to the client in a separate goroutine (concurrent execution)
	go func() {
		h.writeEvent(textEvent)
	}()

	// there is no place to set vOption on web page, use hardcoded vOption in the moment
	vOption := client.VOption{
		LanguageCode: "en-GB",
		Gender:       "female",
		SpeakingRate: 0.8,
		Pitch:        0,
		VolumeGainDb: 0,
		Stability:    0.3,
		Clarity:      0.5,
	}

	// 3. Sends the answer to a text-to-speech server and obtains the corresponding audio
	audio, err := h.talker.TextToSpeech.TextToSpeech(ctx, content, "", vOption)
	if err != nil {
		h.writeEvent(OutMeta{Type: OutEventTypeAudio, ReplyToId: e.Id, Err: "got empty content from text-to-speech sever"})
		return
	}

	audioEvent := OutAudio{
		OutMeta: OutMeta{
			Type:      OutEventTypeAudio,
			ReplyToId: e.Id,
			Err:       "",
			EOF:       true,
		},
		Audio:  audio,
		Format: "audio/mp3",
	}
	// 4. Sends the audio to the client
	h.writeEvent(audioEvent)
}

// HandleAudio
//
// 1. Requests the transcription from speech-to-text server
// 2. Sends the transcription to the client in a separate goroutine (concurrent execution)
// 3. Form an InConversation event by appending transcription to conversation, and send the event to HandleConv
func (h *EventHandler) HandleAudio(ctx context.Context, e *InAudio) {
	if len(e.Audio) == 0 {
		h.writeEvent(OutMeta{Type: OutEventTypeTranscription, Id: e.Id, Err: "audio is empty"})
		return
	}

	reader := bytes.NewBuffer(e.Audio)
	// 1. Requests the transcription from speech-to-text server
	text, err := h.talker.SpeechToText.SpeechToText(ctx, reader)
	if err != nil {
		h.writeEvent(OutMeta{Type: OutEventTypeTranscription, Id: e.Id, Err: "got an error from speech-to-text sever"})
		return
	}
	transcriptionEvent := OutTranscription{
		OutMeta: OutMeta{
			Type:      OutEventTypeTranscription,
			Id:        newEventId(),
			ReplyToId: e.Id,
			Err:       "",
			EOF:       true,
		},
		Text: text,
	}
	// 2. Sends the transcription to the client in a separate goroutine (concurrent execution)
	go func() {
		h.writeEvent(transcriptionEvent)
	}()

	// 3. Form an InConversation event by appending transcription to conversation, and send the event to HandleConv
	inConv := InConversation{
		InMeta: InMeta{
			Id:   e.Id,
			Type: InEventTypeConversation,
		},
		Conversation: append(e.Conversation,
			client.Message{
				Role:    "user",
				Content: text,
			},
		),
	}
	go func() {
		h.HandleConv(ctx, &inConv)
	}()
}

func newEventId() string {
	return uuid.New().String()
}

// writeEvent
//
// write on conn should be queued
// we don't care about error because there's nothing to do except logging
func (h *EventHandler) writeEvent(event interface{}) {
	marshal, err := json.Marshal(event)
	if err != nil {
		h.logger.Sugar().Error(err)
	}
	h.logger.Sugar().Debug("write event to socket", "len", len(marshal))
	h.mu.Lock()
	defer h.mu.Unlock()
	err = h.conn.WriteMessage(websocket.TextMessage, marshal)
	if err != nil {
		h.logger.Sugar().Error(err)
	}
}
