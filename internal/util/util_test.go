package util

import "testing"

func TestRemoveCodeFromText(t *testing.T) {
	type args struct {
		text string
	}
	tests := []struct {
		name string
		args args
		want string
	}{
		{name: "", args: args{text: ""}, want: ""},
		{name: "", args: args{text: "ab"}, want: "ab"},
		{name: "", args: args{text: "abx```go func(){dd}```vvv"}, want: "abx\nvvv"},
		{name: "", args: args{text: "abx``go func(){dd}``vvv"}, want: "abx``go func(){dd}``vvv"},
		{name: "", args: args{text: "abx`go func(){dd}`vvv"}, want: "abx`go func(){dd}`vvv"},
		{name: "", args: args{text: "abx```go func()\n{dd}```\nvvv"}, want: "abx\n\nvvv"},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := RemoveCodeFromText(tt.args.text); got != tt.want {
				t.Errorf("RemoveCodeFromText() = %v, want %v", got, tt.want)
			}
		})
	}
}
