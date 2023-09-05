package api

import (
	"io"

	"github.com/go-playground/validator/v10"
	"github.com/proxoar/talk/pkg/ability"
	"github.com/proxoar/talk/pkg/client"
)

var RestfulValidator *validator.Validate

func init() {
	RestfulValidator = validator.New()
}

type Conversation struct {
	Id         string           `json:"id" validate:"required"` // unique ID for every Q&A
	Ms         []client.Message `json:"ms" validate:"required,dive"`
	TalkOption TalkOption       `json:"talkOption" validate:"required,dive"`
}

type AudioReader struct {
	Reader   io.Reader
	FileName string
}

type TalkOption struct {
	ToText             bool               `json:"toText,omitempty"`             // transcribe user's speech to text, requiring STTOption option
	ToSpeech           bool               `json:"toSpeech,omitempty"`           // synthesize user's text to speech, requiring TTSOption
	Completion         bool               `json:"completion,omitempty"`         // completion, requires messages or result of transcription, require LLMOption
	CompletionToSpeech bool               `json:"completionToSpeech,omitempty"` // synthesize result of completion to speech, requiring TTSOption
	LLMOption          *ability.LLMOption `json:"llmOption,omitempty"`
	STTOption          *ability.STTOption `json:"sstOption,omitempty"`
	TTSOption          *ability.TTSOption `json:"ttsOption,omitempty"`
}
