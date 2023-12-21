package providers

import (
	"context"
	"errors"
	"fmt"
	"io"
	"path/filepath"
	"strings"
	"sync"

	resourcemanager "cloud.google.com/go/resourcemanager/apiv3"
	"cloud.google.com/go/resourcemanager/apiv3/resourcemanagerpb"
	speech "cloud.google.com/go/speech/apiv2"
	"cloud.google.com/go/speech/apiv2/speechpb"
	"github.com/proxoar/talk/pkg/ability"
	"github.com/proxoar/talk/pkg/client"
	"go.uber.org/zap"
	"google.golang.org/api/iterator"
	"google.golang.org/api/option"
	"google.golang.org/genproto/googleapis/cloud/location"
)

type googleSTT struct {
	accountJson        string
	globalSpeechClient *speech.Client
	projectClient      *resourcemanager.ProjectsClient
	locToClient        sync.Map
	mu                 sync.Mutex
	logger             *zap.Logger
}

func NewGoogleSTT(accountJson string, logger *zap.Logger) (client.SpeechToText, error) {
	// by default, the underlying http.client utilizes the proxy from the environment.
	speechClient, err := speech.NewClient(context.Background(), option.WithCredentialsJSON([]byte(accountJson)))
	if err != nil {
		return nil, fmt.Errorf("failed to initialise Google text-to-speech client: %v", err)
	}
	projectClient, err := resourcemanager.NewProjectsClient(context.Background(), option.WithCredentialsJSON([]byte(accountJson)))
	if err != nil {
		return nil, fmt.Errorf("failed to initialise Google project client: %v", err)
	}

	return &googleSTT{
		accountJson:        accountJson,
		globalSpeechClient: speechClient,
		projectClient:      projectClient,
		logger:             logger,
	}, nil
}

func (g *googleSTT) CheckHealth(ctx context.Context) {
	projects, err := g.getProjects(ctx)
	if err != nil {
		g.logger.Sugar().Errorf("[Google speech-to-text] failed to get response from server: %+v", err)
	} else if len(projects) == 0 {
		g.logger.Sugar().Warn("[Google speech-to-text] bad smell: no projects are found")
	} else {
		g.logger.Info("[Google speech-to-text] is healthy")
	}
}

func (g *googleSTT) SpeechToText(ctx context.Context, audio io.Reader, fileName string, option ability.STTOption) (string, error) {
	g.logger.Sugar().Infow("transcribe...", "fileName", fileName, "option", option)

	rec := option.Google.Recognizer
	if rec == "" {
		//goland:noinspection GoErrorStringFormat
		return "", errors.New("Recognizer mustn't be empty")
	}
	c, err := g.clientForRecognizer(rec)
	if err != nil {
		return "", err
	}

	bytes, err := io.ReadAll(audio)
	if err != nil {
		return "", err
	}
	var lang []string
	if option.Google.Language != "" {
		lang = append(lang, option.Google.Language)
	}
	req := &speechpb.RecognizeRequest{
		Recognizer: rec,
		Config: &speechpb.RecognitionConfig{
			Model:         option.Google.Model,
			LanguageCodes: lang,
			Features: &speechpb.RecognitionFeatures{
				EnableAutomaticPunctuation: true,
			},
		},
		AudioSource: &speechpb.RecognizeRequest_Content{Content: bytes},
	}
	resp, err := c.Recognize(ctx, req)
	if err != nil {
		return "", err
	}
	g.logger.Sugar().Debug("transcribe result alternatives: ", len(resp.Results))
	if len(resp.Results) == 0 {
		return "", errors.New("google speech-to-text service did not provide any alternative results," +
			" which typically occurs when the audio quality is poor or the chosen language doesn't match your voice")
	}
	text := resp.Results[0].Alternatives[0].Transcript
	g.logger.Sugar().Debug("transcribe result text length:", len(text))
	if len(text) == 0 {
		return "", errors.New("content of transcription is empty: " + err.Error())
	}
	return text, nil
}

// SetAbility set `GoogleSTTAb` and `available` field of ability.STTAblt
func (g *googleSTT) SetAbility(ctx context.Context, a *ability.STTAblt) error {
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
func (g *googleSTT) Support(o ability.STTOption) bool {
	return o.Google != nil
}

// getAllRecognizers
// obtain all recognizers and bypass any errors that may occur
//
// both the item slice and error slice can contain elements simultaneously
// to emphasize this fact, we interchange the positions of errors and items.
func (g *googleSTT) getAllRecognizers(ctx context.Context) ([]error, []ability.TaggedItem) {
	g.logger.Info("get all recognizers...")
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
	g.logger.Sugar().Debug("all recognizers count:", len(recognizers))
	g.logger.Sugar().Debug("all errs count:", len(errs))
	return errs, recognizers
}

func (g *googleSTT) getRecognizers(ctx context.Context, location string) ([]ability.TaggedItem, error) {
	g.logger.Sugar().Infof("get recognizers of location %s ...", location)
	c, err := g.clientForLocation(location)
	if err != nil {
		return nil, err
	}
	iter := c.ListRecognizers(ctx, &speechpb.ListRecognizersRequest{
		Parent:   location,
		PageSize: 100, // max
	})
	recs := make([]ability.TaggedItem, 0, 10)
	for {
		next, err := iter.Next()
		if err != nil {
			if errors.Is(err, iterator.Done) {
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
	g.logger.Sugar().Debugf("count of recognizers of %s: %d", location, len(recs))

	return recs, nil
}

func (g *googleSTT) getLocations(ctx context.Context, projectName string) ([]string, error) {
	g.logger.Sugar().Infof("get locations of project %s ...", projectName)
	iter := g.globalSpeechClient.ListLocations(ctx, &location.ListLocationsRequest{
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
	g.logger.Sugar().Infof("count of locations of %s: %d", projectName, len(locs))

	return locs, nil
}

func (g *googleSTT) getProjects(ctx context.Context) ([]string, error) {
	resp := g.projectClient.SearchProjects(ctx,
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

// clientForLocation
// creates a Client for a specific location, and cache it for future usage
// format of rec: `projects/123456789/locations/us-west1`
// https://github.com/googleapis/google-cloud-go/issues/8593
func (g *googleSTT) clientForLocation(location string) (*speech.Client, error) {
	loc := filepath.Base(location)
	if loc == "global" {
		return g.globalSpeechClient, nil
	}
	c, ok := g.locToClient.Load(loc)

	if ok {
		return c.(*speech.Client), nil
	}

	endpoint := loc + "-speech.googleapis.com"

	// by default, the underlying http.client utilizes the proxy from the environment.
	newC, err := speech.NewClient(context.Background(),
		option.WithCredentialsJSON([]byte(g.accountJson)),
		option.WithEndpoint(endpoint),
	)
	if err != nil {
		return nil, err
	}
	actualC, loaded := g.locToClient.LoadOrStore(loc, newC)
	if loaded {
		// close current client if there exists one in the map
		_ = newC.Close()
	}

	return actualC.(*speech.Client), nil
}

// format of rec: `projects/123456789/locations/us-west1/recognizers/us-west`
func (g *googleSTT) clientForRecognizer(rec string) (*speech.Client, error) {
	loc := filepath.Dir(rec)
	loc = filepath.Dir(loc)
	return g.clientForLocation(loc)
}
