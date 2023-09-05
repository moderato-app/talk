package client

type Message struct {
	Role    Role   `json:"role" validate:"required"` // options: system, user, assistant and function
	Content string `json:"content" validate:"required"`
}

type Role string

const (
	RoleUser      Role = "user"
	RoleAssistant Role = "assistant"
	RoleSystem    Role = "system"
)
