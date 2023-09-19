package providers

import (
	"context"
	"errors"
	"fmt"

	"github.com/dustin/go-humanize"
	"github.com/haguro/elevenlabs-go"
	"github.com/proxoar/talk/pkg/ability"
	"go.uber.org/zap"
)

const (
	defaultModelID = "eleven_multilingual_v1" // newer than "eleven_monolingual_v1"
)

type ElevenLabs struct {
	Client    *elevenlabs.Client
	VoiceId   *string
	Stability float32
	Clarity   float32
	Logger    *zap.Logger
}

func (e *ElevenLabs) MustFunction(_ context.Context) {
	used, total, err := e.Quota(context.Background())
	if err != nil {
		e.Logger.Sugar().Panicf("failed to get response from ElevenLabs server: %+v", err)
	}
	e.Logger.Sugar().Debugf("ElevenLabs quota: %d/%d used", used, total)
	if total == 0 || used >= total {
		e.Logger.Warn(`bad smell: ElevenLabs quota may has been exhausted`)
	}
	e.Logger.Info("ElevenLabs is healthy")
}

func (e *ElevenLabs) Quota(_ context.Context) (used, total int, err error) {
	e.Logger.Info("get subscription...")
	subscription, err := e.Client.GetSubscription()
	if err != nil {
		return 0, 0, err
	}
	e.Logger.Sugar().Debug("get subscription result", subscription)
	return subscription.CharacterCount, subscription.CharacterLimit, nil
}

func (e *ElevenLabs) Voices(_ context.Context) ([]ability.TaggedItem, error) {
	e.Logger.Info("get voices...")
	voices, err := e.Client.GetVoices()
	if err != nil {
		return nil, err
	}
	vs := make([]ability.TaggedItem, len(voices))
	for i, voice := range voices {
		vs[i] = elevenlabsVoiceToAbilityVoice(voice)
	}
	e.Logger.Sugar().Debug("voices count:", len(vs))
	return vs, nil
}

func (e *ElevenLabs) TextToSpeech(ctx context.Context, text string, o ability.TTSOption) ([]byte, error) {
	e.Logger.Info("text to speech...")
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
	bytes, err := e.Client.TextToSpeech(id, req)
	if err != nil {
		return nil, fmt.Errorf("TextToSpeech %s %v", id, err)
	}
	e.Logger.Sugar().Debug("text to speech result, audio bytes size:", humanize.Bytes(uint64(len(bytes))))
	return bytes, nil
}

func (e *ElevenLabs) SetAbility(ctx context.Context, a *ability.TTSAblt) error {
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
func (e *ElevenLabs) Support(o ability.TTSOption) bool {
	return o.Elevenlabs != nil
}

func (e *ElevenLabs) chooseVoiceId(ctx context.Context, voiceId string) (string, error) {
	if voiceId != "" {
		return voiceId, nil
	}
	if e.VoiceId != nil && *e.VoiceId != "" {
		return *e.VoiceId, nil
	}
	voices, err := e.Voices(ctx)
	if err != nil {
		return "", err
	}
	if len(voices) == 0 {
		return "", errors.New("user have no voice available on ElevenLabs")
	}
	// voices created by user are placed at the end of list
	id := voices[len(voices)-1].Id
	// ignore the risk of race at the moment, as `talk` project is for personal usage
	e.VoiceId = &id
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
