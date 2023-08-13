package internal

import (
	"bytes"
	"embed"
	"io"
	"path"
)

const helloVoiceFilePath = "assets/hello_en_gb_1.mp3"

//go:embed assets/*
var assets embed.FS

//go:embed public/*
var Public embed.FS

// HelloVoice return the voice of "hello" as io.Reader and file name
func HelloVoice() (io.Reader, string, error) {
	data, err := assets.ReadFile(helloVoiceFilePath)
	if err != nil {
		return nil, "", err
	}
	return bytes.NewReader(data), path.Base(helloVoiceFilePath), err
}
