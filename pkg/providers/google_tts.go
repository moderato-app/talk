package providers

import (
	"context"
	"fmt"

	texttospeech "cloud.google.com/go/texttospeech/apiv1"
	"cloud.google.com/go/texttospeech/apiv1/texttospeechpb"
	"github.com/dustin/go-humanize"
	"github.com/proxoar/talk/pkg/ability"
	"github.com/proxoar/talk/pkg/client"

	"go.uber.org/zap"
)

type GoogleTTS struct {
	Client *texttospeech.Client
	Logger *zap.Logger
}

func (g *GoogleTTS) MustFunction(ctx context.Context) {
	o := ability.TTSOption{
		Google: &ability.GoogleTTSOption{
			VoiceId:      "",
			LanguageCode: "en-GB",
			Gender:       texttospeechpb.SsmlVoiceGender_FEMALE,
			SpeakingRate: 0.8,
			Pitch:        0,
			VolumeGainDb: 0,
		},
	}
	audio, err := g.TextToSpeech(ctx, "Hello!", o)
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
func (g *GoogleTTS) Voices(ctx context.Context) ([]ability.Voice, error) {
	g.Logger.Info("get voices...")
	voices, err := g.Client.ListVoices(ctx, &texttospeechpb.ListVoicesRequest{})
	if err != nil {
		return nil, err
	}
	ids := make(map[string]struct{}, len(voices.Voices))
	vs := make([]ability.Voice, len(voices.Voices))
	for i, voice := range voices.Voices {
		_, ok := ids[voice.Name]
		if ok {
			// google may return duplicated voice names, such as `en-GB-Standard-A`
			continue
		}
		ids[voice.Name] = struct{}{}
		vs[i] = googleVoiceToAbVoice(voice)
	}
	g.Logger.Sugar().Debug("voices count:", len(vs))
	return vs, nil
}

func (g *GoogleTTS) TextToSpeech(ctx context.Context, text string, o ability.TTSOption) ([]byte, error) {
	g.Logger.Sugar().Infow("text to speech...", "option", o)
	req := texttospeechpb.SynthesizeSpeechRequest{
		Input: &texttospeechpb.SynthesisInput{
			InputSource: &texttospeechpb.SynthesisInput_Text{Text: text},
		},
		Voice: &texttospeechpb.VoiceSelectionParams{
			LanguageCode: o.Google.LanguageCode,
			Name:         o.Google.VoiceId,
			SsmlGender:   o.Google.Gender,
		},
		AudioConfig: &texttospeechpb.AudioConfig{
			SpeakingRate:  o.Google.SpeakingRate,
			Pitch:         o.Google.Pitch,
			VolumeGainDb:  o.Google.VolumeGainDb,
			AudioEncoding: texttospeechpb.AudioEncoding_MP3,
		},
	}

	resp, err := g.Client.SynthesizeSpeech(ctx, &req)
	if err != nil {
		return nil, fmt.Errorf("SynthesizeSpeech: %v", err)
	}
	g.Logger.Sugar().Info("text to speech result audio bytes size: ", humanize.Bytes(uint64(len(resp.AudioContent))))
	return resp.AudioContent, nil
}

func (g *GoogleTTS) SetAbility(ctx context.Context, a *ability.TTSAblt) error {
	voices, err := g.Voices(ctx)
	if err != nil {
		return err
	}
	a.Google = ability.GoogleTTSAblt{
		Available: true,
		Voices:    voices,
	}
	a.Available = true
	return nil
}

// Support
//
// read ability.TTSOption to check if current provider support the option
func (g *GoogleTTS) Support(o ability.TTSOption) bool {
	return o.Google != nil
}

// googleVoiceToGeneralVoice convert texttospeechpb.Voice to client.Voice
func googleVoiceToGeneralVoice(v *texttospeechpb.Voice) client.Voice {
	// Voice.LanguageCodes contains only one code; keep Voice.Lang as string type for simplicity
	langCode := ""
	if len(v.LanguageCodes) > 0 {
		langCode = v.LanguageCodes[0]
	}
	gender := convertGender(v.SsmlGender)
	return client.Voice{
		Id:     v.Name,
		Name:   v.Name,
		Lang:   langCode,
		Accent: langCode,
		Gender: gender,
	}
}

// googleVoiceToAbVoice convert texttospeechpb.Voice to ability.Voice
func googleVoiceToAbVoice(v *texttospeechpb.Voice) ability.Voice {
	// Voice.LanguageCodes contains only one code in the moment
	tags := v.LanguageCodes
	gender := convertGender(v.SsmlGender)
	tags = append(tags, gender)
	return ability.Voice{
		Id:   v.Name,
		Name: v.Name,
		Tags: tags,
	}
}

func convertGender(g texttospeechpb.SsmlVoiceGender) string {
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
		return ""
	}
}
