package internal

import (
	"context"
	"errors"
	"fmt"
	"io"

	. "github.com/proxoar/talk/internal/api"
	"github.com/proxoar/talk/internal/util"
	"github.com/proxoar/talk/pkg/client"
	"go.uber.org/zap"
)

type ChatHandler struct {
	streamId string
	chatId   string
	ticketId string
	o        TalkOption
	sse      *SSE
	talker   *Talker
	logger   *zap.Logger
}

func NewChatHandler(
	streamId string,
	chatId string,
	ticketId string,
	o TalkOption,
	sse *SSE,
	talker *Talker,
	logger *zap.Logger,
) *ChatHandler {
	return &ChatHandler{
		streamId: streamId,
		chatId:   chatId,
		ticketId: ticketId,
		o:        o,
		sse:      sse,
		talker:   talker,
		logger:   logger,
	}
}

/*
Start

	if there is an audio

	client --audio--> [toText] --text--> [completion] --text--> [toSpeech] --audio--> client
	                               |                      |                     |
	                               v                      v                     v
	                            client                  client               client


	if there isn't an audio

	client --text--> [completion] --text--> [toSpeech] --audio--> client
	          |                       |
	          v                       v
	      [toAudio]                 client
	          |
	          v
	        client
*/
func (c *ChatHandler) Start(ms []client.Message, ar *AudioReader) {
	ctx := context.Background()
	if ar != nil {
		if c.o.ToText {
			text, err := c.toText(ctx, *ar, client.RoleUser)
			if err != nil {
				c.logger.Sugar().Error("got empty text, break pipeline", err)
				return
			}
			ms = append(ms, client.Message{Role: client.RoleUser, Content: text})
		}
	} else if ar == nil {
		if len(ms) == 0 || ms[len(ms)-1].Role != client.RoleUser {
			c.logger.Warn("if audio is not uploaded, ms should not be empty and the last message should have Role==RoleUser")
			return
		}
		if c.o.ToSpeech {
			go func() { c.toSpeech(ctx, ms[len(ms)-1].Content, client.RoleUser) }()
		}
	}

	if c.o.Completion {
		text, err := c.completion(ctx, ms, client.RoleAssistant)
		if err != nil {
			c.logger.Sugar().Error("got empty text from completion", err)
			return
		}

		if c.o.CompletionToSpeech {
			c.toSpeech(ctx, text, client.RoleAssistant)
		}
	}
}

func (c *ChatHandler) toSpeech(ctx context.Context, text string, role client.Role) {
	meta := MessageMeta{
		ChatId:    c.chatId,
		TicketId:  c.ticketId,
		MessageID: util.RandomHash16Chars(),
		Role:      role,
	}

	tts, ok := c.talker.SelectTTSProvider(c.o.TTSOption)
	if !ok {
		c.sse.PublishData(c.streamId, EventMessageError, Error{
			MessageMeta: meta,
			ErrMsg:      "No text-to-speech providers are available"},
		)
		return
	}

	go func() { c.sse.PublishData(c.streamId, EventMessageThinking, meta) }()

	audio, err := tts.TextToSpeech(ctx, util.RemoveCodeFromText(text), text, *c.o.TTSOption)
	if err != nil {
		c.logger.Sugar().Error(err)
		c.sse.PublishData(c.streamId, EventMessageError, Error{
			MessageMeta: meta,
			ErrMsg:      fmt.Sprintf("Empty content from text-to-speech sever: \n%s", err)},
		)
		return
	}

	c.sse.PublishData(c.streamId, EventMessageAudio, Audio{
		MessageMeta: meta,
		Audio:       audio,
	})
}

func (c *ChatHandler) toText(ctx context.Context, ar AudioReader, role client.Role) (string, error) {
	meta := MessageMeta{
		ChatId:    c.chatId,
		TicketId:  c.ticketId,
		MessageID: util.RandomHash16Chars(),
		Role:      role,
	}

	stt, ok := c.talker.SelectSTTProvider(c.o.STTOption)
	if !ok {
		eMsg := "No speech-to-text providers are available"
		c.sse.PublishData(c.streamId, EventMessageError, Error{
			MessageMeta: meta,
			ErrMsg:      eMsg},
		)
		//goland:noinspection GoErrorStringFormat
		return "", errors.New(eMsg)
	}

	go func() { c.sse.PublishData(c.streamId, EventMessageThinking, meta) }()

	text, err := stt.SpeechToText(ctx, ar.Reader, ar.FileName, *c.o.STTOption)
	if err != nil {
		errMsg := fmt.Sprintf("Failed to get text from speech-to-text sever:\n %s", err.Error())
		c.logger.Error(errMsg)
		c.sse.PublishData(c.streamId, EventMessageError, Error{
			MessageMeta: meta,
			ErrMsg:      errMsg},
		)
		return "", errors.New(errMsg)
	}
	if text == "" {
		eMsg := "Empty content from speech-to-text sever"
		c.sse.PublishData(c.streamId, EventMessageError, Error{
			MessageMeta: meta,
			ErrMsg:      eMsg},
		)
		//goland:noinspection GoErrorStringFormat
		return "", errors.New(eMsg)
	}

	go func() {
		c.sse.PublishData(c.streamId, EventMessageTextEOF, Text{
			MessageMeta: meta,
			Text:        text,
		})
	}()
	return text, nil
}

func (c *ChatHandler) completion(ctx context.Context, latestMs []client.Message, assistant client.Role) (string, error) {
	meta := MessageMeta{
		ChatId:    c.chatId,
		TicketId:  c.ticketId,
		MessageID: util.RandomHash16Chars(),
		Role:      assistant,
	}

	llm, ok := c.talker.SelectLLMProvider(c.o.LLMOption)
	if !ok {
		eMsg := "No Large Language Model providers are available"
		c.sse.PublishData(c.streamId, EventMessageError, Error{
			MessageMeta: meta,
			ErrMsg:      eMsg},
		)
		//goland:noinspection GoErrorStringFormat
		return "", errors.New(eMsg)
	}

	go func() { c.sse.PublishData(c.streamId, EventMessageThinking, meta) }()

	stream := llm.CompletionStream(ctx, latestMs, *c.o.LLMOption)
	defer stream.Close()
	text := ""
	for {

		data, err := stream.Recv()
		if err != nil {
			if errors.Is(err, io.EOF) {
				c.sse.PublishData(c.streamId, EventMessageTextEOF, meta)
				break
			} else {
				c.sse.PublishData(c.streamId, EventMessageError,
					Error{MessageMeta: meta, ErrMsg: err.Error()})
				return text, err
			}
		}
		c.sse.PublishData(c.streamId, EventMessageTextTyping,
			Text{MessageMeta: meta, Text: string(data)})
		text += string(data)
	}
	if text == "" {
		return text, errors.New("text should not be empty")
	}

	return text, nil
}
