package internal

import (
	"github.com/google/uuid"
	"github.com/patrickmn/go-cache"
	"go.uber.org/zap"
	"time"
)

const (
	cleanupInterval   = time.Minute
	defaultExpireTime = 10 * time.Minute
)

const (
	speechKeyPrefix  = "speech-"
	speechExpireTime = 10 * time.Minute
)

var TalkCache TCache

func init() {
	TalkCache = newTalkCache()
}

type TCache struct {
	cache  *cache.Cache
	logger *zap.Logger
}

func newTalkCache() TCache {
	return TCache{
		cache:  cache.New(defaultExpireTime, cleanupInterval),
		logger: SharedLogger(),
	}
}

func (s *TCache) PutSpeech(data []byte) string {
	id := speechKeyPrefix + uuid.New().String()
	s.cache.Set(id, data, speechExpireTime)
	s.logger.Sugar().Debug("put speech into cache, speechId:", id)
	return id
}

func (s *TCache) GetSpeech(id string) ([]byte, bool) {
	data, ok := s.cache.Get(id)
	s.logger.Sugar().Debug("put speech into cache, speechId:", id)
	if ok {
		return data.([]byte), true
	} else {
		return nil, false
	}
}
