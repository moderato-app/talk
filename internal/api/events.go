package api

import "github.com/proxoar/talk/pkg/client"

const (
	EventMessageThinking    = "message/thinking"
	EventMessageTextTyping  = "message/text/typing"
	EventMessageTextEOF     = "message/text/EOF"
	EventMessageAudio       = "message/audio"
	EventMessageError       = "message/error"
	EventSystemAbility      = "system/ability"
	EventSystemNotification = "system/notification"
)

type ContentCmd string

/*
* thinking -> typing -> EOF
*	|		    |
*	|		    v
*	|-------> error
*   |
*   v
*   EOF
 */

type MessageMeta struct {
	ChatId    string      `json:"chatId"`    // unique ID for the whole chat(contains maybe hundreds of messages)
	TicketId  string      `json:"ticketId"`  // A distinctive ID for each request, utilised by the client to associate messages.
	MessageID string      `json:"messageID"` // unique ID for each message
	Role      client.Role `json:"role"`
}

type Text struct {
	MessageMeta
	Text string `json:"text"`
}

type Audio struct {
	MessageMeta
	Audio      []byte `json:"audio"`
	DurationMs int    `json:"durationMs,omitempty"`
}

type Error struct {
	MessageMeta
	EMessage string `json:"eMessage"`
}
