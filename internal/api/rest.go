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
