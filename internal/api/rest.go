package api

import "github.com/bubblelight/talk/pkg/client"

type AskReq struct {
	Ms []client.Message `json:"conversation"`
}

type AskResp struct {
	Text     string `json:"text"`
	SpeechId string `json:"speechId"`
}

type TranscribeResp struct {
	Text string `json:"text"`
}

const (
	paramTypeRange = iota
	paramTypeSingleChoice
	paramTypeMultiChoice
)

// supported params by client
// todo 发送的时候用这个类，接收的时候用结构化的类unmarshal
type SupportedParamResp struct {
	LLMParam []Param
	STTParam []Param
	TTSParam []Param
}

type Param struct {
	Name string `json:"name"`
	Type int

	// range
	RangeIsFloat bool   `json:"rangeIsFloat"`
	RangeStart   string `json:"rangeStart"`
	RangeEnd     string `json:"rangeEnd"`

	// single choice
	SChoices []string
	// multi choice
	MChoices []string
}
