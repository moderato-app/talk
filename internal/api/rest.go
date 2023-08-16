package api

import "github.com/bubblelight/talk/pkg/providers"

type AskReq struct {
	Ms []providers.Message `json:"conversation"`
}

type AskResp struct {
	Text     string `json:"text"`
	SpeechId string `json:"speechId"`
}

type TranscribeResp struct {
	Text string `json:"text"`
}
