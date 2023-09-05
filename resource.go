package resource

import (
	"bytes"
	"embed"
	"io"
	"path"
)

const helloVoiceFilePath = "assets/hello_en_gb_1.mp3"

//go:embed assets
var assets embed.FS

// Web
// Opt for web/* over web/, as the latter treats _next directory as a hidden file, thus excluding it.
//
//go:embed web/*
var Web embed.FS

// HelloVoice return the voice of "hello" as io.Reader and file name
func HelloVoice() (io.Reader, string, error) {
	data, err := assets.ReadFile(helloVoiceFilePath)
	if err != nil {
		return nil, "", err
	}
	return bytes.NewReader(data), path.Base(helloVoiceFilePath), err
}
