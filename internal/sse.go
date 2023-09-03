package internal

import (
	"context"
	"encoding/json"
	"io"

	. "github.com/proxoar/talk/internal/api"
	"github.com/proxoar/talk/pkg/client"
	"github.com/r3labs/sse/v2"
	"go.uber.org/zap"
)

type SSEHandler struct {
	*sse.Server
	talker *Talker
	logger *zap.Logger
}

func NewSSEHandler(talker *Talker, logger *zap.Logger) *SSEHandler {
	sseServer := sse.New()
	sseServer.AutoReplay = false // AutoReplay is not mature. Enabling AutoReplay doesn't ensure idempotency
	sseServer.AutoStream = true  // create the stream when client connects
	s := SSEHandler{
		Server: sseServer,
		talker: talker,
		logger: logger,
	}
	s.OnSubscribe = s.emitAbility
	return &s
}

// emit an Ability to on client subscription
func (s *SSEHandler) emitAbility(streamID string, _ *sse.Subscriber) {
	ab, err := s.talker.Ability(context.Background())
	if err != nil {
		s.logger.Sugar().Error("failed to get Ability", err)
		return
	}
	s.publishData(streamID, EventAbility, ab)
}

// conv
//
// 1. Ask LLM for an answer
// 2. Send the answer to the client
// 3. Send the answer to a text-to-speech server and obtains the corresponding audio
// 4. Send the audio to the client
func (s *SSEHandler) conv(ctx context.Context, streamId string, conv *Conversation) {
	if conv.TalkOption.LLM == nil || conv.TalkOption.LLM.ChatGPT == nil {
		s.logger.Sugar().Debug("client did not provide ChatGPT option, will not ask LLM for an answer")
		return
	}
	ms := make([]client.Message, len(conv.Ms))
	for i, m := range conv.Ms {
		ms[i] = client.Message{Role: m.Role, Content: m.Content}
	}
	// 1. Ask LLM for an answer
	ch := s.talker.LLM.CompletionStream(ctx, ms, *conv.TalkOption.LLM)
	content := ""
	// 2. Send the answer to the client
	for {
		chunk, ok := <-ch
		if ok {
			if chunk.Err != nil {
				s.publishData(streamId, EventAnswer, EventMeta{
					ConvId: conv.Id,
					EMsg:   "got error from LLM sever: " + chunk.Err.Error(),
				})
				return
			}
			s.publishData(streamId, EventAnswer, Answer{
				EventMeta: EventMeta{
					ConvId: conv.Id,
				},
				Text: chunk.Message,
				EOF:  false,
			})
			content += chunk.Message
		} else {
			// if ch is closed
			s.publishData(streamId, EventAnswer, Answer{
				EventMeta: EventMeta{
					ConvId: conv.Id,
				},
				Text: "",
				EOF:  true,
			})
			break
		}
	}
	if content == "" {
		s.logger.Sugar().Error("content should not be empty")
		return
	}

	// 3. Send the answer to a text-to-speech server and obtains the corresponding audio
	audio, err := s.talker.TextToSpeech.TextToSpeech(ctx, content, "", TTSEnGBOption)
	if err != nil {
		s.publishData(streamId, EventAudio, EventMeta{
			ConvId: conv.Id,
			EMsg:   "got empty content from text-to-speech sever",
		})
		return
	}

	// 4. Send the audio to the client
	s.publishData(streamId, EventAudio, Audio{
		EventMeta: EventMeta{
			ConvId: conv.Id,
		},
		Audio: audio,
	})
}

// audio
//
// 1. Ask speech-to-text server for text
// 2. Sends the text to the client
// 3. Append the text to conversation, and call conv
func (s *SSEHandler) audio(ctx context.Context, streamId string, audio io.Reader, fileName string, conv *Conversation) {

	// 1. Ask speech-to-text server for text
	text, err := s.talker.SpeechToText.SpeechToText(ctx, audio, fileName)
	if err != nil {
		s.publishData(streamId, EventTrans, EventMeta{
			ConvId: conv.Id,
			EMsg:   "got an error from speech-to-text sever: " + err.Error(),
		})
		return
	}
	// 2. Sends the text to the client
	s.publishData(streamId, EventTrans, Trans{
		EventMeta: EventMeta{
			ConvId: conv.Id,
		},
		Text: text,
	})

	newConv := *conv
	newConv.Ms = append(newConv.Ms, Message{Role: "user", Content: text})
	// 3. Append the text to conversation, and call conv
	s.conv(ctx, streamId, &newConv)
}

func (s *SSEHandler) toEvent(eventName string, data interface{}) (event *sse.Event, err error) {
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

func (s *SSEHandler) publishData(streamId, eventName string, data interface{}) {
	event, err := s.toEvent(eventName, data)
	if err != nil {
		s.logger.Error(err.Error())
		return
	}
	s.Publish(streamId, event)
}
