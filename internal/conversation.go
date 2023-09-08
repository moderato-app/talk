package internal

import (
	"context"

	. "github.com/proxoar/talk/internal/api"
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
	textCh := make(chan string, 1) // text in this channel is intended for completion purpose
	if ar != nil {
		if c.o.ToText {
			go func() { c.toText(ctx, *ar, client.RoleUser, textCh) }()
		}
		text := <-textCh
		if text == "" {
			c.logger.Warn("got empty text, break pipeline")
			return
		}
		ms = append(ms, client.Message{Role: client.RoleUser, Content: text})
	}

	if ar == nil {
		// when transcribing text input by user, Role must be RoleUser
		if c.o.ToSpeech {
			if len(ms) == 0 || ms[len(ms)-1].Role != client.RoleUser {
				c.logger.Warn("if audio is not uploaded, ms should not be empty and the last message should have Role==RoleUser")
				return
			}
			go func() { c.toSpeech(ctx, ms[len(ms)-1].Content, client.RoleUser) }()
		}
	}

	if c.o.Completion {
		cTextCh := make(chan string, 1) // text in this channel is intended for completion purpose

		go func() { c.completion(ctx, ms, client.RoleAssistant, cTextCh) }()

		if c.o.CompletionToSpeech {
			cText := <-cTextCh
			if cText != "" {
				go func() { c.toSpeech(ctx, cText, client.RoleAssistant) }()
			}
		}
	}
}

func (c *ChatHandler) toSpeech(ctx context.Context, text string, role client.Role) {
	meta := MessageMeta{
		ChatId:    c.chatId,
		TicketId:  c.ticketId,
		MessageID: RandomHash(),
		Role:      role,
	}

	tts, ok := c.talker.SelectTTSProvider(c.o.TTSOption)
	if !ok {
		c.sse.PublishData(c.streamId, EventMessageError, Error{
			MessageMeta: meta,
			EMessage:    "no text-to-speech provider matches the request"},
		)
		return
	}

	go func() { c.sse.PublishData(c.streamId, EventMessageThinking, meta) }()

	audio, err := tts.TextToSpeech(ctx, text, *c.o.TTSOption)
	if err != nil {
		c.sse.PublishData(c.streamId, EventMessageError, Error{
			MessageMeta: meta,
			EMessage:    "got empty content from text-to-speech sever"},
		)
		return
	}

	c.sse.PublishData(c.streamId, EventMessageAudio, Audio{
		MessageMeta: meta,
		Audio:       audio,
	})
}

func (c *ChatHandler) toText(ctx context.Context, ar AudioReader, role client.Role, textCh chan<- string) {
	defer close(textCh)
	meta := MessageMeta{
		ChatId:    c.chatId,
		TicketId:  c.ticketId,
		MessageID: RandomHash(),
		Role:      role,
	}

	stt, ok := c.talker.SelectSTTProvider(c.o.STTOption)
	if !ok {
		c.sse.PublishData(c.streamId, EventMessageError, Error{
			MessageMeta: meta,
			EMessage:    "no speech-to-text provider matches the request"},
		)
		return
	}

	go func() { c.sse.PublishData(c.streamId, EventMessageThinking, meta) }()

	text, err := stt.SpeechToText(ctx, ar.Reader, ar.FileName, *c.o.STTOption)
	if err != nil {
		c.sse.PublishData(c.streamId, EventMessageError, Error{
			MessageMeta: meta,
			EMessage:    "got empty content from speech-to-text sever"},
		)
		return
	}

	// should not block
	textCh <- text

	c.sse.PublishData(c.streamId, EventMessageTextEOF, Text{
		MessageMeta: meta,
		Text:        text,
	})
}

func (c *ChatHandler) completion(ctx context.Context, latestMs []client.Message, assistant client.Role, textCh chan<- string) {
	defer close(textCh)
	meta := MessageMeta{
		ChatId:    c.chatId,
		TicketId:  c.ticketId,
		MessageID: RandomHash(),
		Role:      assistant,
	}

	llm, ok := c.talker.SelectLLMProvider(c.o.LLMOption)
	if !ok {
		c.sse.PublishData(c.streamId, EventMessageError, Error{
			MessageMeta: meta,
			EMessage:    "no LLM provider matches the request"},
		)
		return
	}

	go func() { c.sse.PublishData(c.streamId, EventMessageThinking, meta) }()

	ch := llm.CompletionStream(ctx, latestMs, *c.o.LLMOption)
	text := ""
	for {
		chunk, ok := <-ch
		if ok {
			if chunk.Err != nil {
				c.sse.PublishData(c.streamId, EventMessageError,
					Error{MessageMeta: meta, EMessage: chunk.Err.Error()})
				return
			}
			c.sse.PublishData(c.streamId, EventMessageTextTyping,
				Text{MessageMeta: meta, Text: chunk.Text})
			text += chunk.Text
		} else {
			// if ch is closed
			c.sse.PublishData(c.streamId, EventMessageTextEOF, meta)
			break
		}
	}
	if text == "" {
		c.logger.Sugar().Error("text should not be empty")
		return
	}
	// should not block
	textCh <- text
}
