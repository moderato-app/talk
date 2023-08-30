package api

import (
	"errors"

	"github.com/go-playground/validator/v10"
	"github.com/proxoar/talk/pkg/client/tune"
)

var RestfulValidator *validator.Validate

func init() {
	RestfulValidator = validator.New()
	err := errors.Join(
		RestfulValidator.RegisterValidation("msIsNotEmpty", msIsNotEmpty),
		RestfulValidator.RegisterValidation("stringNotZeroLength", stringNotZeroLength),
	)
	if err != nil {
		panic(err)
	}
}

type Conversation struct {
	Id         string          `json:"id" validate:"required"` // unique ID for every Q&A
	Ms         []Message       `json:"ms" validate:"msIsNotEmpty,dive"`
	TuneOption tune.TuneOption `json:"TuneOption" validate:"required"`
}

type Message struct {
	Role    string `json:"role" validate:"required"` // options: system, user, assistant and function
	Content string `json:"content" validate:"required"`
}

func msIsNotEmpty(fl validator.FieldLevel) bool {
	switch fl.Field().Interface().(type) {
	case []Message:
		return len(fl.Field().Interface().([]Message)) > 0
	default:
		return false
	}
}

func stringNotZeroLength(fl validator.FieldLevel) bool {
	switch fl.Field().Interface().(type) {
	case string:
		return len(fl.Field().Interface().(string)) > 0
	default:
		return false
	}
}
