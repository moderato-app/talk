package providers

import (
	"context"
	"errors"
	"fmt"

	"github.com/dustin/go-humanize"
	"github.com/haguro/elevenlabs-go"
	"github.com/proxoar/talk/pkg/ability"
	"github.com/proxoar/talk/pkg/client"
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

func (e *ElevenLabs) Voices(_ context.Context) ([]client.Voice, error) {
	e.Logger.Info("get voices...")
	voices, err := e.Client.GetVoices()
	if err != nil {
		return nil, err
	}
	e.Logger.Sugar().Debug("result", voices)
	gvs := make([]client.Voice, len(voices))
	for i, v := range voices {
		gvs[i] = elevenlabsVoiceToGeneralVoice(v)
	}
	return gvs, nil
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

func (e *ElevenLabs) SetAbility(_ context.Context, a *ability.TTSAb) error {
	voices, err := e.Client.GetVoices()
	if err != nil {
		return err
	}
	vs := make([]ability.Voice, len(voices))
	for i, voice := range voices {
		vs[i] = elevenlabsVoiceToAbilityVoice(voice)
	}
	a.Elevenlabs = ability.ElevenlabsTTSAb{
		Available: true,
		Voices:    vs,
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

// choose voice id by priority:
// 1. voiceId parameter
// 2. predefined ElevenLabs.VoiceId
// 3. choose a voiceId from voice list. In such case, set ElevenLabs.VoiceId to the chosen voiceId for future usage
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

// elevenlabsVoiceToGeneralVoice convert elevenlabs.Voice to client.Voice
func elevenlabsVoiceToGeneralVoice(v elevenlabs.Voice) client.Voice {
	if v.Labels == nil {
		v.Labels = map[string]string{}
	}
	return client.Voice{
		Id:         v.VoiceId,
		Name:       v.Name,
		Lang:       "English", // ElevenLabs focuses only on English in the moment
		Accent:     v.Labels["accent"],
		Gender:     v.Labels["gender"],
		PreviewUrl: v.PreviewUrl,
		Labels:     v.Labels,
	}
}

// elevenlabsVoiceToAbilityVoice convert elevenlabs.Voice to ability.Voice
func elevenlabsVoiceToAbilityVoice(voice elevenlabs.Voice) ability.Voice {
	if voice.Labels == nil {
		voice.Labels = map[string]string{}
	}
	tags := make([]string, len(voice.Labels))
	for key, v := range voice.Labels {
		t := fmt.Sprintf("%s=%s", key, v)
		tags = append(tags, t)
	}
	return ability.Voice{
		Id:   voice.VoiceId,
		Name: voice.Name,
		Tags: tags,
	}
}
