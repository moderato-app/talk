package api

const (
	EventAudio   = "audio"
	EventAnswer  = "answer"
	EventTrans   = "trans"
	EventAbility = "ability"
)

type EventMeta struct {
	ConvId string `json:"convId"` // unique ID for every conversation
	EMsg   string `json:"eMsg"`
}

type Answer struct {
	EventMeta
	Text string `json:"text"`
	EOF  bool   `json:"eof"` // whether it is the last piece of content
}

type Audio struct {
	EventMeta
	Audio []byte `json:"audio"`
}

type Trans struct {
	EventMeta
	Text string `json:"text"`
}
