package util

import (
	"io"
	"sync"
	"sync/atomic"
	"time"
)

const minSpeedBeforeDone = 15e-3
const totalMsBeforeDone = 1000
const minSpeedWhenDone = 20e-3
const totalMsWhenDone = 500

// it's not a commercial project, and feel free to utilise ample capacity
const chanCap = 1000

type chunk struct {
	Data rune
	Err  error
}

// SmoothStream
// a stream that regulates the reading speed of readers.
type SmoothStream struct {
	mu        sync.Mutex
	ch        chan chunk
	remaining atomic.Int32
	// Although one might question the necessity of 'done' when 'io.EOF' already signals the consumer to cease,
	// it's actually responsible for managing the pace of typing. If the producer has finished its task,
	// the consumer should process all data within totalMsWhenDone, maintaining a minimum rate of 5 characters per second.
	//
	// However, if the producer is stuck but hasn't ceased, the consumer should make every effort
	// to delay the typing speed. In this case, it should process all data within totalMsBeforeDone, maintaining a minimum
	// rate of 20 characters per second.
	done              atomic.Bool
	remainingWhenDone atomic.Int32
	lastRead          time.Time
}

func NewSmoothStream() *SmoothStream {
	return &SmoothStream{
		mu:        sync.Mutex{},
		ch:        make(chan chunk, chanCap),
		remaining: atomic.Int32{},
		lastRead:  time.Time{},
	}
}

func (stream *SmoothStream) Write(r rune) {
	defer stream.remaining.Add(1)
	stream.ch <- chunk{
		Data: r,
		Err:  nil,
	}
}

// WriteError
// io.EOF or other errors
func (stream *SmoothStream) WriteError(err error) {
	stream.ch <- chunk{
		Data: 0,
		Err:  err,
	}
	stream.done.Store(true)
	stream.remainingWhenDone.Store(stream.remaining.Load())
}

func (stream *SmoothStream) DoneWrite() {
	stream.WriteError(io.EOF)
}

// Recv
// is not safe for concurrent read.
// Recv returns io.EOF or other errors
// Its callers' responsibility to close SmoothStream
func (stream *SmoothStream) Recv() (rune, error) {
	chunk := <-stream.ch
	if chunk.Err != nil {
		return 0, chunk.Err
	}
	defer stream.remaining.Add(-1)
	defer func() { stream.lastRead = time.Now() }()

	if stream.lastRead.IsZero() {
		return chunk.Data, nil
	}

	remaining := int(stream.remaining.Load())
	// how many runes per millisecond
	var speed float64
	// set lower limit speed
	if stream.done.Load() {
		speed = float64(stream.remainingWhenDone.Load()) / totalMsWhenDone
		if speed < minSpeedWhenDone {
			speed = minSpeedWhenDone
		}
	} else {
		speed = float64(remaining) / totalMsBeforeDone
		if speed < minSpeedBeforeDone {
			speed = minSpeedBeforeDone
		}
	}

	interval := int(float64(time.Millisecond) / speed)
	shouldWaitTill := stream.lastRead.Add(time.Duration(interval))
	timeToWait := shouldWaitTill.Sub(time.Now())
	//fmt.Printf("done %t remaining %d, speed %d, timeToSleep %f\n", stream.done.Load(), remaining, speed, timeToWait.Seconds())
	if timeToWait < 0 {
		timeToWait = 0
	}
	if timeToWait > 0 {
		time.Sleep(timeToWait)
	}
	return chunk.Data, nil
}

func (stream *SmoothStream) Close() {
	close(stream.ch)
}
