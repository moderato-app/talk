package providers

import (
	"context"
	"time"

	"github.com/dustin/go-humanize"
	demo "github.com/proxoar/talk-demo-resource/v2"
	"github.com/proxoar/talk/pkg/ability"
	"github.com/proxoar/talk/pkg/client"
	"go.uber.org/zap"
)

var elevenlabsDemoVoices = []ability.TaggedItem{
	{
		Id:   "21m00Tcm4TlvDq8ikWAM",
		Name: "Rachel[demo]",
		Tags: []string{
			"accent=american",
			"description=calm",
			"age=young",
			"gender=female",
			"use case=narration",
		},
	},
	{
		Id:   "IKne3meq5aSn9XLyUdCD",
		Name: "Charlie[demo]",
		Tags: []string{
			"age=middle aged",
			"gender=male",
			"use case=conversational",
			"accent=australian",
			"description=casual",
		},
	},
}

type elevenLabsDemo struct {
	pool   *demo.ResourcePool
	logger *zap.Logger
}

func NewElevenlabsDemo(pool *demo.ResourcePool, logger *zap.Logger) client.TextToSpeech {
	return &elevenLabsDemo{
		pool:   pool,
		logger: logger,
	}
}

func (e *elevenLabsDemo) CheckHealth(_ context.Context) {
}

func (e *elevenLabsDemo) Quota(_ context.Context) (used, total int, err error) {
	return 0, 0, nil
}

func (e *elevenLabsDemo) Voices(_ context.Context) ([]ability.TaggedItem, error) {
	e.logger.Info("get voices...")
	e.logger.Sugar().Debug("voices count:", len(elevenlabsDemoVoices))
	return elevenlabsDemoVoices, nil
}

func (e *elevenLabsDemo) TextToSpeech(_ context.Context, _ string, originalText string, _ ability.TTSOption) ([]byte, error) {
	e.logger.Info("text to speech...")
	time.Sleep(2 * time.Second)
	r := e.pool.FindAudioByTextOrRandom(originalText)
	e.logger.Sugar().Debug("text to speech result, audio bytes size:", humanize.Bytes(uint64(len(r.Audio))))
	return r.Audio, nil
}

func (e *elevenLabsDemo) SetAbility(_ context.Context, a *ability.TTSAblt) error {
	a.Elevenlabs = ability.ElevenlabsTTSAblt{
		Available: true,
		Voices:    elevenlabsDemoVoices,
	}
	a.Available = true
	return nil
}

// Support
//
// read ability.TTSOption to check if current provider support the option
func (e *elevenLabsDemo) Support(o ability.TTSOption) bool {
	return o.Elevenlabs != nil
}
