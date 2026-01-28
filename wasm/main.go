//go:build js && wasm

// Package main is the WASM entry point.
// Export functions here to make them callable from JavaScript.
// Run `npm run wasm` after adding new exports.
package main

import (
	"github.com/user/go-wasm-react-starter/pkg/task"
)

// Greet returns a greeting message.
// Simple example showing basic string input/output.
func Greet(name string) string {
	return task.Greet(name)
}

// Fibonacci calculates the Nth Fibonacci number with arbitrary precision.
// Demonstrates: callbacks, large computations, returning data JS can't compute.
func Fibonacci(n int, onProgress func(percent int, message string)) (string, error) {
	return task.Fibonacci(n, onProgress)
}

// =============================================================================
// EXPORT YOUR FUNCTIONS ABOVE
// =============================================================================
//
// Steps to add a new function:
// 1. Write your logic in pkg/task/task.go
// 2. Create a wrapper function here that calls it
// 3. Run `npm run wasm` to rebuild WASM and TypeScript bindings
// 4. Use it in React: await wasm.yourFunction(args)
//
// Supported types: int, float64, string, bool, []byte, callbacks, errors
// See: https://github.com/13rac1/gowasm-bindgen

func main() {
	// Keep WASM runtime alive
	select {}
}
