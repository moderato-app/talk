package tune

type Boolean struct {
	Tunable bool `json:"tunable,omitempty"`
	Default bool `json:"default,omitempty"`
}

type IntRange struct {
	Tunable    bool `json:"tunable,omitempty"`
	RangeStart int  `json:"rangeStart,omitempty"`
	RangeEnd   int  `json:"rangeEnd,omitempty"`
	Default    int  `json:"default,omitempty"`
}

type FloatRange struct {
	Tunable    bool    `json:"tunable,omitempty"`
	RangeStart float32 `json:"rangeStart,omitempty"`
	RangeEnd   float32 `json:"rangeEnd,omitempty"`
	Default    float32 `json:"default,omitempty"`
}

type SingleChoice[T any] struct {
	Tunable bool        `json:"tunable,omitempty"`
	Choices []Choice[T] `json:"choices,omitempty"`
	Default T           `json:"default,omitempty"`
}

type MultiChoice[T any] struct {
	Tunable bool        `json:"tunable,omitempty"`
	Choices []Choice[T] `json:"choices,omitempty"`
	Default []Choice[T] `json:"default,omitempty"`
}

type Choice[T any] struct {
	Name  string   `json:"name,omitempty"`  // if not provided, use Value as name
	Value T        `json:"value,omitempty"` // must provide
	Tags  []string `json:"tags,omitempty"`
}
