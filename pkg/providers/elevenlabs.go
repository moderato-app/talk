package providers

import (
	"context"
	"github.com/haguro/elevenlabs-go"
	"github.com/pkg/errors"
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
		return 0, 0, errors.Wrap(err, "")
	}
	e.Logger.Sugar().Debug("get subscription result", subscription)
	return subscription.CharacterCount, subscription.CharacterLimit, nil
}

func (e *ElevenLabs) Voices(_ context.Context) ([]Voice, error) {
	e.Logger.Info("get voices...")
	voices, err := e.Client.GetVoices()
	if err != nil {
		return nil, errors.Wrap(err, "")
	}
	e.Logger.Sugar().Debug("result", voices)
	gvs := make([]Voice, len(voices))
	for i, v := range voices {
		gvs[i] = elevenlabsVoiceToGeneralVoice(v)
	}
	return gvs, nil
}

func (e *ElevenLabs) TextToSpeech(ctx context.Context, text string, voiceId string, o VOption) ([]byte, error) {
	e.Logger.Info("text to speech...")
	req := elevenlabs.TextToSpeechRequest{
		Text:    text,
		ModelID: defaultModelID,
		VoiceSettings: &elevenlabs.VoiceSettings{
			Stability:       o.Stability,
			SimilarityBoost: o.Clarity,
		},
	}
	id, err := e.chooseVoiceId(ctx, voiceId)
	if err != nil {
		return nil, err
	}
	bytes, err := e.Client.TextToSpeech(id, req)
	if err != nil {
		return nil, errors.Wrap(err, "")
	}
	e.Logger.Sugar().Debug("text to speech result, audio bytes length:", len(bytes))
	return bytes, nil
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
		return "", errors.New("user have no voice available from ElevenLabs")
	}
	// voices created by user are placed at the end of list
	id := voices[len(voices)-1].Id
	// ignore the risk of race at the moment, as `talk` project is for personal usage
	e.VoiceId = &id
	return id, nil
}

func (e *ElevenLabs) voiceSettings(o *VOption) *elevenlabs.VoiceSettings {
	stability := e.Stability
	clarity := e.Clarity
	// VOption has high priority
	if o != nil {
		if o.Stability != 0 {
			stability = o.Stability
		}
		if o.Clarity != 0 {
			clarity = o.Clarity
		}
	}
	return &elevenlabs.VoiceSettings{
		Stability:       stability,
		SimilarityBoost: clarity,
	}
}

// elevenlabsVoiceToGeneralVoice convert elevenlabs.Voice to providers.Voice
func elevenlabsVoiceToGeneralVoice(v elevenlabs.Voice) Voice {
	if v.Labels == nil {
		v.Labels = map[string]string{}
	}
	return Voice{
		Id:         v.VoiceId,
		Name:       v.Name,
		Lang:       "English", // ElevenLabs focuses only on English in the moment
		Accent:     v.Labels["accent"],
		Gender:     v.Labels["gender"],
		PreviewUrl: v.PreviewUrl,
		Labels:     v.Labels,
	}
}
