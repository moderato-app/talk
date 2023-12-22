package ability

type Model struct {
	Name        string `json:"name" validate:"required"`
	DisplayName string `json:"displayName" validate:"required"`
}
