package internal

import (
	"context"
	"encoding/json"
	"io"

	"github.com/bwmarrin/snowflake"
	. "github.com/proxoar/talk/internal/api"
	"github.com/proxoar/talk/pkg/client"
	"github.com/r3labs/sse/v2"
	"go.uber.org/zap"
)

type SSEHandler struct {
	*sse.Server
	talker *Talker
	logger *zap.Logger
	sf     *snowflake.Node
}

func NewSSEHandler(s *sse.Server, talker *Talker, logger *zap.Logger) *SSEHandler {
	node, err := snowflake.NewNode(1)
	if err != nil {
		panic(err)
	}

	return &SSEHandler{
		Server: s,
		talker: talker,
		logger: logger,
		sf:     node,
	}
}

// conv
//
// 1. Ask LLM for an answer
// 2. Send the answer to the client
// 3. Send the answer to a text-to-speech server and obtains the corresponding audio
// 4. Send the audio to the client
func (s *SSEHandler) conv(ctx context.Context, streamId string, conv *Conversation) {
	ms := make([]client.Message, len(conv.Ms))
	for i, m := range conv.Ms {
		ms[i] = client.Message{Role: m.Role, Content: m.Content}
	}
	// 1. Ask LLM for an answer
	ch := s.talker.LLM.CompletionStream(ctx, ms, conv.TuneOption.LLM)
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
	s.conv(ctx, streamId, conv)
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
