package client

import (
	"fmt"
)

type Message struct {
	Role    Role   `json:"role" validate:"required"` // options: system, user, assistant and function
	Content string `json:"content" validate:"required"`
}

type Role string

const (
	RoleUser Role = "user"

	RoleAssistant Role = "assistant" // for ChatGPT
	RoleSystem    Role = "system"    // for ChatGPT

	RoleModel Role = "model" // for Gemini
)

func (r Role) ToGeminiRole() (Role, error) {
	switch r {
	case RoleUser:
		return RoleUser, nil
	case RoleAssistant:
		return RoleModel, nil
	default:
		return "", fmt.Errorf("role %s is invalid", r)
	}
}
