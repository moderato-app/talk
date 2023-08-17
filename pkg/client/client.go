package client

import (
	"context"
)

type Quota interface {
	// Quota return usage of resources, which may be characters, minutes of voice, balance, etc
	Quota(ctx context.Context) (used, total int, err error)
}

type MustFunction interface {
	// MustFunction performs a request to server and PANICS if there are severe error such as invalid API key, connection error, etc.
	// Error should be logged before panicking.
	// Warning should be logged if there are any issues(bad smell), such as quota exhaustion or incorrect transcriptions.
	// This request consumes a minimal amount of quota or even no quota.
	MustFunction(ctx context.Context)
}
