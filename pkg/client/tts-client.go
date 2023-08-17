package client

import (
	"context"
)

type TextToSpeech interface {
	MustFunction
	Quota
	TextToSpeech(ctx context.Context, text string, voiceId string, o VOption) ([]byte, error)
}

type VOption struct {
	LanguageCode string
	Gender       string
	SpeakingRate float64
	Pitch        float64
	VolumeGainDb float64
	Stability    float32
	Clarity      float32
}
