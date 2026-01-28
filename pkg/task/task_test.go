package task

import (
	"strings"
	"testing"
)

func TestGreet(t *testing.T) {
	tests := []struct {
		name     string
		input    string
		contains string
	}{
		{"with name", "Alice", "Hello, Alice!"},
		{"empty name", "", "Hello, World!"},
		{"special chars", "O'Brien", "Hello, O'Brien!"},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			result := Greet(tt.input)
			if !strings.Contains(result, tt.contains) {
				t.Errorf("Greet(%q) = %q, want it to contain %q", tt.input, result, tt.contains)
			}
		})
	}
}

func TestFibonacci(t *testing.T) {
	tests := []struct {
		name    string
		n       int
		want    string
		wantErr bool
	}{
		{"F(0)", 0, "0", false},
		{"F(1)", 1, "1", false},
		{"F(2)", 2, "1", false},
		{"F(10)", 10, "55", false},
		{"F(20)", 20, "6765", false},
		{"negative", -1, "", true},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			got, err := Fibonacci(tt.n, nil)
			if (err != nil) != tt.wantErr {
				t.Errorf("Fibonacci(%d) error = %v, wantErr %v", tt.n, err, tt.wantErr)
				return
			}
			if got != tt.want {
				t.Errorf("Fibonacci(%d) = %q, want %q", tt.n, got, tt.want)
			}
		})
	}
}

func TestFibonacciCallback(t *testing.T) {
	callCount := 0
	lastPercent := -1

	callback := func(percent int, message string) {
		callCount++
		if percent < lastPercent {
			t.Errorf("progress went backwards: %d -> %d", lastPercent, percent)
		}
		lastPercent = percent
	}

	result, err := Fibonacci(100, callback)
	if err != nil {
		t.Fatalf("Fibonacci(100) error = %v", err)
	}

	if callCount == 0 {
		t.Error("callback was never called")
	}

	if lastPercent != 100 {
		t.Errorf("final progress = %d, want 100", lastPercent)
	}

	// F(100) is known
	want := "354224848179261915075"
	if result != want {
		t.Errorf("Fibonacci(100) = %q, want %q", result, want)
	}
}
