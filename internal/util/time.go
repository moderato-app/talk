package util

import (
	"time"
)

// Every runs the function every tick,
// and return false from the func to stop the ticker
func Every(duration time.Duration, work func(time.Time) bool) chan bool {
	ticker := time.NewTicker(duration)
	stop := make(chan bool, 1)

	go func() {
		for {
			select {
			case t := <-ticker.C:
				if !work(t) {
					stop <- true
				}
			case <-stop:
				return
			}
		}
	}()

	return stop
}
