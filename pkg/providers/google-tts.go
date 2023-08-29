package providers

import (
	"context"
	"fmt"

	texttospeech "cloud.google.com/go/texttospeech/apiv1"
	"cloud.google.com/go/texttospeech/apiv1/texttospeechpb"
	"github.com/proxoar/talk/pkg/client"

	"go.uber.org/zap"
)

type GoogleTTS struct {
	Client *texttospeech.Client
	Logger *zap.Logger
}

func (g *GoogleTTS) MustFunction(ctx context.Context) {
	vOption := client.VOption{
		LanguageCode: "en-GB",
		Gender:       "female",
		SpeakingRate: 1.0,
		Pitch:        0,
		VolumeGainDb: 0,
		Stability:    0.3,
		Clarity:      0.5,
	}

	audio, err := g.TextToSpeech(ctx, "Hello!", "", vOption)
	if err != nil {
		g.Logger.Sugar().Panicf("failed to get response from Google text-to-speech server: %+v", err)
	}

	if len(audio) < 100 || len(audio) > 10000 {
		g.Logger.Sugar().Warn("bad smell: the audio data received from Google text-to-speech server is"+
			" either too small or too large: %d byte", len(audio))
	}

	g.Logger.Info("GoogleTTS is healthy")
}

func (g *GoogleTTS) Quota(_ context.Context) (used, total int, err error) {
	// texttospeech.Client doesn't support quota query
	return 0, 0, nil
}

// Voices list available voices
//
// pass empty langCode or choose one from https://www.rfc-editor.org/rfc/bcp/bcp47.txt,
func (g *GoogleTTS) Voices(ctx context.Context, langCode string) ([]client.Voice, error) {
	g.Logger.Info("get voices...")
	resp, err := g.Client.ListVoices(ctx,
		&texttospeechpb.ListVoicesRequest{
			LanguageCode: langCode,
		},
	)
	if err != nil {
		return nil, fmt.Errorf("ListVoices %s %v", langCode, err)
	}
	g.Logger.Sugar().Debug("result", resp)
	voices := resp.GetVoices()
	gvs := make([]client.Voice, len(voices))
	for i, v := range voices {
		gvs[i] = googleVoiceToGeneralVoice(v)
	}
	return gvs, nil
}

func (g *GoogleTTS) TextToSpeech(ctx context.Context, text string, voiceId string, o client.VOption) ([]byte, error) {
	g.Logger.Info("text to speech...")
	g.Logger.Sugar().Debugf("TextToSpeech %s %s %+v", text, voiceId, o)
	req := texttospeechpb.SynthesizeSpeechRequest{
		Input: &texttospeechpb.SynthesisInput{
			InputSource: &texttospeechpb.SynthesisInput_Text{Text: text},
		},
		Voice: &texttospeechpb.VoiceSelectionParams{
			LanguageCode: o.LanguageCode,
			Name:         voiceId,
			SsmlGender:   mustConvertGender2(o.Gender),
		},
		AudioConfig: &texttospeechpb.AudioConfig{
			SpeakingRate:  o.SpeakingRate,
			Pitch:         o.Pitch,
			VolumeGainDb:  o.VolumeGainDb,
			AudioEncoding: texttospeechpb.AudioEncoding_MP3,
		},
	}

	resp, err := g.Client.SynthesizeSpeech(ctx, &req)
	if err != nil {
		return nil, fmt.Errorf("SynthesizeSpeech: %v", err)
	}
	g.Logger.Sugar().Debug("text to speech result, audio bytes length:", len(resp.AudioContent))
	return resp.AudioContent, nil
}

// elevenlabsVoiceToGeneralVoice convert texttospeechpb.Voice to client.Voice
func googleVoiceToGeneralVoice(v *texttospeechpb.Voice) client.Voice {
	// Voice.LanguageCodes contains only one code; keep Voice.Lang as string type for simplicity
	langCode := ""
	if len(v.LanguageCodes) > 0 {
		langCode = v.LanguageCodes[0]
	}
	gender := mustConvertGender(v.SsmlGender)
	return client.Voice{
		Id:     v.Name,
		Name:   v.Name,
		Lang:   langCode,
		Accent: langCode,
		Gender: gender,
	}
}

func mustConvertGender(g texttospeechpb.SsmlVoiceGender) string {
	switch g {
	case texttospeechpb.SsmlVoiceGender_SSML_VOICE_GENDER_UNSPECIFIED:
		return "unspecified"
	case texttospeechpb.SsmlVoiceGender_MALE:
		return "male"
	case texttospeechpb.SsmlVoiceGender_FEMALE:
		return "female"
	case texttospeechpb.SsmlVoiceGender_NEUTRAL:
		return "neutral"
	default:
		panic(fmt.Sprintf("unkonwn gender: %+v", g))
	}
}

func mustConvertGender2(g string) texttospeechpb.SsmlVoiceGender {
	switch g {
	case "unspecified":
		return texttospeechpb.SsmlVoiceGender_SSML_VOICE_GENDER_UNSPECIFIED
	case "male":
		return texttospeechpb.SsmlVoiceGender_MALE
	case "female":
		return texttospeechpb.SsmlVoiceGender_FEMALE
	case "neutral":
		return texttospeechpb.SsmlVoiceGender_NEUTRAL
	default:
		panic(fmt.Sprintf("unkonwn gender: %+v", g))
	}
}
