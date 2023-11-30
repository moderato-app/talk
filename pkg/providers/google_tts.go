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
	"google.golang.org/api/option"
)

type googleTTS struct {
	client *texttospeech.Client
	logger *zap.Logger
}

func NewGoogleTTS(accountJson string, logger *zap.Logger) (client.TextToSpeech, error) {
	// by default, the underlying http.client utilizes the proxy from the environment.
	c, err := texttospeech.NewClient(context.Background(), option.WithCredentialsJSON([]byte(accountJson)))
	if err != nil {
		return nil, fmt.Errorf("failed to initialise Google text-to-speech client: %v", err)
	}
	return &googleTTS{
		client: c,
		logger: logger,
	}, nil
}

func (g *googleTTS) CheckHealth(ctx context.Context) {
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
	audio, err := g.TextToSpeech(ctx, "Hello!", "Hello!", o)
	if err != nil {
		g.logger.Sugar().Errorf("[Google text-to-speech] failed to get response from server: %+v", err)
	} else if len(audio) < 100 || len(audio) > 10000 {
		g.logger.Sugar().Warn("[Google text-to-speech] bad smell: the audio data received from Google text-to-speech server is"+
			" either too small or too large: %d byte", len(audio))
	} else {
		g.logger.Info("[Google text-to-speech]  is healthy")
	}
}

func (g *googleTTS) Quota(_ context.Context) (used, total int, err error) {
	// texttospeech.client doesn't support quota query
	return 0, 0, nil
}

// Voices list available voices
//
// pass empty langCode or choose one from https://www.rfc-editor.org/rfc/bcp/bcp47.txt,
func (g *googleTTS) Voices(ctx context.Context) ([]ability.TaggedItem, error) {
	g.logger.Info("get voices...")
	voices, err := g.client.ListVoices(ctx, &texttospeechpb.ListVoicesRequest{})
	if err != nil {
		return nil, err
	}
	ids := make(map[string]struct{}, len(voices.Voices))
	vs := make([]ability.TaggedItem, len(voices.Voices))
	for i, voice := range voices.Voices {
		_, ok := ids[voice.Name]
		if ok {
			// google may return duplicated voice names, such as `en-GB-Standard-A`
			continue
		}
		ids[voice.Name] = struct{}{}
		vs[i] = googleVoiceToAbVoice(voice)
	}
	g.logger.Sugar().Debug("voices count:", len(vs))
	return vs, nil
}

func (g *googleTTS) TextToSpeech(ctx context.Context, text string, _ string, o ability.TTSOption) ([]byte, error) {
	g.logger.Sugar().Infow("text to speech...", "option", o)
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

	resp, err := g.client.SynthesizeSpeech(ctx, &req)
	if err != nil {
		return nil, fmt.Errorf("SynthesizeSpeech: %v", err)
	}
	g.logger.Sugar().Info("text to speech result audio bytes size: ", humanize.Bytes(uint64(len(resp.AudioContent))))
	return resp.AudioContent, nil
}

func (g *googleTTS) SetAbility(ctx context.Context, a *ability.TTSAblt) error {
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
func (g *googleTTS) Support(o ability.TTSOption) bool {
	return o.Google != nil
}

// googleVoiceToAbVoice convert texttospeechpb.Voice to ability.TaggedItem
func googleVoiceToAbVoice(v *texttospeechpb.Voice) ability.TaggedItem {
	// TaggedItem.LanguageCodes contains only one code in the moment
	tags := v.LanguageCodes
	gender := convertGender(v.SsmlGender)
	tags = append(tags, gender)
	return ability.TaggedItem{
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
