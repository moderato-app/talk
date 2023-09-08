package internal

import "io"

type AudioReader struct {
	Reader   io.Reader
	FileName string
}
