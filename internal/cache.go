package internal

import (
	"time"

	"github.com/patrickmn/go-cache"
	"github.com/proxoar/talk/pkg/ability"
	"go.uber.org/zap"
)

const (
	cleanupInterval   = time.Minute
	defaultExpireTime = 10 * time.Minute
)

const (
	abilityKey        = "ability"
	abilityExpireTime = time.Hour
	abilityShortLived = time.Minute
)

var TalkCache talkCache

func init() {
	TalkCache = newTalkCache()
}

type talkCache struct {
	cache  *cache.Cache
	logger *zap.Logger
}

func newTalkCache() talkCache {
	return talkCache{
		cache:  cache.New(defaultExpireTime, cleanupInterval),
		logger: defaultLogger(),
	}
}

func (s *talkCache) PutAbility(data ability.Ability) {
	s.cache.Set(abilityKey, data, abilityExpireTime)
	s.logger.Sugar().Debug("put ability into cache")
}

func (s *talkCache) PutShortLivedAbility(data ability.Ability) {
	s.cache.Set(abilityKey, data, abilityShortLived)
	s.logger.Sugar().Debug("put ability into cache")
}

func (s *talkCache) GetAbility() (ability.Ability, bool) {
	data, ok := s.cache.Get(abilityKey)
	s.logger.Sugar().Debug("get abilityKey from cache")
	if ok {
		return data.(ability.Ability), true
	} else {
		return ability.Ability{}, false
	}
}
