package client

import (
	"context"
)

type Client interface {
	CheckHealth(ctx context.Context)
}
