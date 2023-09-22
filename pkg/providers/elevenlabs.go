package providers

import (
	"context"
	"errors"
	"fmt"
	"time"

	"github.com/dustin/go-humanize"
	"github.com/haguro/elevenlabs-go"
	"github.com/proxoar/talk/pkg/ability"
	"github.com/proxoar/talk/pkg/client"
	"go.uber.org/zap"
)

const (
	defaultModelID = "eleven_multilingual_v1" // newer than "eleven_monolingual_v1"
)

type elevenLabs struct {
	client *elevenlabs.Client
	logger *zap.Logger
}

func NewElevenLabs(apiKey string, logger *zap.Logger) client.TextToSpeech {
	// elevenlabs.client create a new http.client everytime it makes a request
	// by default, the underlying http.client utilizes the proxy from the environment.
	c := elevenlabs.NewClient(context.Background(), apiKey, time.Minute)

	return &elevenLabs{
		client: c,
		logger: logger,
	}
}

func (e *elevenLabs) CheckHealth(_ context.Context) {
	used, total, err := e.Quota(context.Background())
	if err != nil {
		e.logger.Sugar().Error("[ElevenLabs] failed to get response from ElevenLabs server: %+v", err)
	} else {
		e.logger.Sugar().Debugf("[ElevenLabs] quota: %d/%d used", used, total)
		if total == 0 || used >= total {
			e.logger.Warn(`[ElevenLabs] bad smell: ElevenLabs quota may has been exhausted`)
		} else {
			e.logger.Info("[ElevenLabs] is healthy")
		}
	}
}

func (e *elevenLabs) Quota(_ context.Context) (used, total int, err error) {
	e.logger.Info("get subscription...")
	subscription, err := e.client.GetSubscription()
	if err != nil {
		return 0, 0, err
	}
	e.logger.Sugar().Debug("get subscription result", subscription)
	return subscription.CharacterCount, subscription.CharacterLimit, nil
}

func (e *elevenLabs) Voices(_ context.Context) ([]ability.TaggedItem, error) {
	e.logger.Info("get voices...")
	voices, err := e.client.GetVoices()
	if err != nil {
		return nil, err
	}
	vs := make([]ability.TaggedItem, len(voices))
	for i, voice := range voices {
		vs[i] = elevenlabsVoiceToAbilityVoice(voice)
	}
	e.logger.Sugar().Debug("voices count:", len(vs))
	return vs, nil
}

func (e *elevenLabs) TextToSpeech(ctx context.Context, text string, o ability.TTSOption) ([]byte, error) {
	e.logger.Info("text to speech...")
	req := elevenlabs.TextToSpeechRequest{
		Text:    text,
		ModelID: defaultModelID,
		VoiceSettings: &elevenlabs.VoiceSettings{
			Stability:       o.Elevenlabs.Stability,
			SimilarityBoost: o.Elevenlabs.Clarity,
		},
	}
	id, err := e.chooseVoiceId(ctx, o.Elevenlabs.VoiceId)
	if err != nil {
		return nil, fmt.Errorf("failed to choose a VoiceId %s: %v", o.Elevenlabs.VoiceId, err)
	}
	bytes, err := e.client.TextToSpeech(id, req)
	if err != nil {
		return nil, fmt.Errorf("TextToSpeech %s %v", id, err)
	}
	e.logger.Sugar().Debug("text to speech result, audio bytes size:", humanize.Bytes(uint64(len(bytes))))
	return bytes, nil
}

func (e *elevenLabs) SetAbility(ctx context.Context, a *ability.TTSAblt) error {
	voices, err := e.Voices(ctx)
	if err != nil {
		return err
	}
	a.Elevenlabs = ability.ElevenlabsTTSAblt{
		Available: true,
		Voices:    voices,
	}
	a.Available = true
	return nil
}

// Support
//
// read ability.TTSOption to check if current provider support the option
func (e *elevenLabs) Support(o ability.TTSOption) bool {
	return o.Elevenlabs != nil
}

func (e *elevenLabs) chooseVoiceId(ctx context.Context, voiceId string) (string, error) {
	if voiceId != "" {
		return voiceId, nil
	}
	voices, err := e.Voices(ctx)
	if err != nil {
		return "", err
	}
	if len(voices) == 0 {
		return "", errors.New("found no voice from ElevenLabs")
	}
	// voices created by user are placed at the end of list
	id := voices[len(voices)-1].Id
	return id, nil
}

// elevenlabsVoiceToAbilityVoice convert elevenlabs.Voice to ability.TaggedItem
func elevenlabsVoiceToAbilityVoice(voice elevenlabs.Voice) ability.TaggedItem {
	if voice.Labels == nil {
		voice.Labels = map[string]string{}
	}
	tags := make([]string, len(voice.Labels))
	deDup := make(map[string]struct{}, len(voice.Labels))
	for key, v := range voice.Labels {
		if key == "" || v == "" {
			continue
		}
		t := fmt.Sprintf("%s=%s", key, v)
		_, ok := deDup[t]
		if ok {
			continue
		}
		deDup[t] = struct{}{}
		tags = append(tags, t)
	}
	return ability.TaggedItem{
		Id:   voice.VoiceId,
		Name: voice.Name,
		Tags: tags,
	}
}
