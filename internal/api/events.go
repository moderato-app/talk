package api

import (
	"github.com/bubblelight/talk/pkg/client"
)

const (
	InEventTypeAudio        = "audio"
	InEventTypeConversation = "conversation"
)

type InMeta struct {
	Type string `json:"type"`
	Id   string `json:"id"` // unique ID for every event
}

type InConversation struct {
	InMeta
	Conversation []client.Message `json:"conversation"`
}

type InAudio struct {
	InMeta
	Audio        []byte           `json:"audio"`
	FileName     string           `json:"fileName"`
	Conversation []client.Message `json:"conversation"`
}

const (
	OutEventTypeAudio         = "audio"
	OutEventTypeMessage       = "message"
	OutEventTypeTranscription = "transcription"
)

type OutMeta struct {
	Type      string `json:"type"`
	Id        string `json:"id"` // unique ID for every event
	ReplyToId string `json:"replyToId"`
	Err       string `json:"err"`
	EOF       bool   `json:"eof"` // Indicates whether it is the last text in the assistant of SSE when set to true
}

type OutMessage struct {
	OutMeta
	Message client.Message `json:"message"`
}

type OutAudio struct {
	OutMeta
	Audio  []byte `json:"audio"`
	Format string `json:"format"` // todo keep or remove?
}

type OutTranscription struct {
	OutMeta
	Text string `json:"text"`
}
