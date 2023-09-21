package api

import (
	"github.com/go-playground/validator/v10"
	"github.com/proxoar/talk/pkg/ability"
	"github.com/proxoar/talk/pkg/client"
)

var RestfulValidator *validator.Validate

func init() {
	RestfulValidator = validator.New()
}

type Chat struct {
	ChatId     string           `json:"chatId" validate:"required"`   // unique ID for every Q&A
	TicketId   string           `json:"ticketId" validate:"required"` // A distinctive ID for each request, utilised by the client to associate messages.
	Ms         []client.Message `json:"ms" validate:"required,dive"`
	TalkOption TalkOption       `json:"talkOption"`
}

type TalkOption struct {
	ToText             bool               `json:"toText"`             // transcribe user's speech to text, requiring STTOption option
	ToSpeech           bool               `json:"toSpeech"`           // synthesize user's text to speech, requiring TTSOption
	Completion         bool               `json:"completion"`         // completion, requires messages or result of transcription, require LLMOption
	CompletionToSpeech bool               `json:"completionToSpeech"` // synthesize result of completion to speech, requiring TTSOption
	LLMOption          *ability.LLMOption `json:"llmOption,omitempty"`
	STTOption          *ability.STTOption `json:"sttOption,omitempty"`
	TTSOption          *ability.TTSOption `json:"ttsOption,omitempty"`
}
