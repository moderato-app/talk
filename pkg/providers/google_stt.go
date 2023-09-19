package providers

import (
	"context"
	"errors"
	"io"
	"strings"
	"sync"

	resourcemanager "cloud.google.com/go/resourcemanager/apiv3"
	"cloud.google.com/go/resourcemanager/apiv3/resourcemanagerpb"
	speech "cloud.google.com/go/speech/apiv2"
	"cloud.google.com/go/speech/apiv2/speechpb"
	"github.com/proxoar/talk/pkg/ability"
	"go.uber.org/zap"
	"google.golang.org/api/iterator"
	"google.golang.org/genproto/googleapis/cloud/location"
)

type GoogleSTT struct {
	SpeechClient  *speech.Client
	ProjectClient *resourcemanager.ProjectsClient
	Logger        *zap.Logger
}

func (g *GoogleSTT) CheckHealth(ctx context.Context) {
	projects, err := g.getProjects(ctx)
	if err != nil {
		g.Logger.Sugar().Errorf("[Google speech-to-text] failed to get response from server: %+v", err)
	} else if len(projects) == 0 {
		g.Logger.Sugar().Warn("[Google speech-to-text] bad smell: no projects are found")
	} else {
		g.Logger.Info("[Google speech-to-text] is healthy")
	}
}

func (g *GoogleSTT) SpeechToText(ctx context.Context, audio io.Reader, fileName string, option ability.STTOption) (string, error) {
	g.Logger.Sugar().Infow("transcribe...", "fileName", fileName, "option", option)

	bytes, err := io.ReadAll(audio)
	if err != nil {
		return "", err
	}
	var lang []string
	if option.Google.Language != "" {
		lang = append(lang, option.Google.Language)
	}
	req := &speechpb.RecognizeRequest{
		Recognizer: option.Google.Recognizer,
		Config: &speechpb.RecognitionConfig{
			Model:         option.Google.Model,
			LanguageCodes: lang,
			Features: &speechpb.RecognitionFeatures{
				EnableAutomaticPunctuation: true,
			},
		},
		AudioSource: &speechpb.RecognizeRequest_Content{Content: bytes},
	}
	resp, err := g.SpeechClient.Recognize(ctx, req)
	if err != nil {
		return "", err
	}
	g.Logger.Sugar().Info("transcribe result alternatives: ", len(resp.Results))
	if len(resp.Results) == 0 {
		return "", errors.New("google speech-to-text service did not provide any alternative results," +
			" which typically occurs when the audio quality is poor or language doesn't match your voice")
	}
	text := resp.Results[0].Alternatives[0].Transcript
	g.Logger.Sugar().Info("transcribe result text length:", len(text))
	if len(text) == 0 {
		return "", errors.New("content of transcription is empty: " + err.Error())
	}
	return text, nil
}

// SetAbility set `GoogleSTTAb` and `available` field of ability.STTAblt
func (g *GoogleSTT) SetAbility(ctx context.Context, a *ability.STTAblt) error {
	errs, recs := g.getAllRecognizers(ctx)
	a.Google = ability.GoogleSTTAb{
		Available:   true,
		Recognizers: recs,
	}
	a.Available = true

	if len(errs) != 0 {
		return errors.Join(errs...)
	}
	return nil
}

// Support
//
// read ability.STTOption to check if current provider support the option
func (g *GoogleSTT) Support(o ability.STTOption) bool {
	return o.Google != nil
}

// getAllRecognizers
// obtain all recognizers and bypass any errors that may occur
//
// both the item slice and error slice can contain elements simultaneously
// to emphasize this fact, we interchange the positions of errors and items.
func (g *GoogleSTT) getAllRecognizers(ctx context.Context) ([]error, []ability.TaggedItem) {
	g.Logger.Info("get all recognizers...")
	projects, err := g.getProjects(ctx)
	if err != nil {
		return []error{err}, nil
	}

	var errs []error
	var locations []string
	for _, p := range projects {
		locs, err := g.getLocations(ctx, p)
		if err != nil {
			errs = append(errs, err)
			locations = append(locations, locs...)
		} else {
			locations = append(locations, locs...)
		}
	}

	var recognizers []ability.TaggedItem
	var mu sync.Mutex
	var wg sync.WaitGroup
	for _, loc := range locations {
		wg.Add(1)
		go func(loc_ string) {
			defer wg.Done()
			recs, err := g.getRecognizers(ctx, loc_)
			mu.Lock()
			if err != nil {
				errs = append(errs, err)
			} else {
				recognizers = append(recognizers, recs...)
			}
			mu.Unlock()
		}(loc)
	}
	wg.Wait()
	g.Logger.Sugar().Debug("all recognizers count:", len(recognizers))
	g.Logger.Sugar().Debug("all errs count:", len(errs))
	return errs, recognizers
}

func (g *GoogleSTT) getRecognizers(ctx context.Context, location string) ([]ability.TaggedItem, error) {
	g.Logger.Sugar().Infof("get recognizers of location %s ...", location)
	iter := g.SpeechClient.ListRecognizers(ctx, &speechpb.ListRecognizersRequest{
		Parent:   location,
		PageSize: 100, // max
	})
	recs := make([]ability.TaggedItem, 0, 10)
	for {
		next, err := iter.Next()
		if errors.Is(err, iterator.Done) {
			break
		} else if err != nil {
			// rpc error: code = InvalidArgument desc = Expected resource location to be global, but found europe-west2 in resource name.
			if strings.Contains(err.Error(), "Expected resource location to be global") {
				// It appears that there is a bug in the Google Speech-to-Text API, which limits users to
				// only querying recognizers for the global location.
				// The issue is here: https://github.com/googleapis/google-cloud-go/issues/8593
				break
			}
			return nil, err
		}
		disp := next.DisplayName
		if disp == "" {
			disp = next.Name
		}
		rec := ability.TaggedItem{
			Id:   next.Name,
			Name: disp,
			Tags: []string{
				"model=" + next.Model,
				"lang=" + strings.Join(next.LanguageCodes, ","),
			},
		}
		recs = append(recs, rec)
	}
	g.Logger.Sugar().Debugf("count of recognizers of %s: %d", location, len(recs))

	return recs, nil
}

func (g *GoogleSTT) getLocations(ctx context.Context, projectName string) ([]string, error) {
	g.Logger.Sugar().Infof("get locations of project %s ...", projectName)
	iter := g.SpeechClient.ListLocations(ctx, &location.ListLocationsRequest{
		PageSize: 100, // max
		Name:     projectName,
	})
	locs := make([]string, 0, 10)
	for {
		next, err := iter.Next()
		if errors.Is(err, iterator.Done) {
			break
		} else if err != nil {
			return nil, err
		}
		locs = append(locs, next.Name)
	}
	g.Logger.Sugar().Infof("count of locations of  %s: %d", projectName, len(locs))

	return locs, nil
}

func (g *GoogleSTT) getProjects(ctx context.Context) ([]string, error) {
	resp := g.ProjectClient.SearchProjects(ctx,
		&resourcemanagerpb.SearchProjectsRequest{
			Query:    "",
			PageSize: 100,
		})
	var projects []string
	for {
		next, err := resp.Next()
		if errors.Is(err, iterator.Done) {
			return projects, nil
		}
		if err != nil {
			return projects, err
		}
		projects = append(projects, next.Name)
	}
}
