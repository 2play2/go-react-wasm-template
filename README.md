# Go WASM React Starter

Run Go code in the browser via WebAssembly with a React + TypeScript frontend.

## Quick Start

```bash
cd frontend
npm install
npm run dev
```

Open http://localhost:5173

## After Creating from Template

Update these files with your project name:

1. **Go modules** - Replace `github.com/user/go-wasm-react-starter`:
   - `go.mod`
   - `wasm/go.mod`
   - `wasm/main.go` (import statement)

2. **Package name** - Update `frontend/package.json`:
   - `"name": "your-project-name"`

## Project Structure

```
├── pkg/task/task.go      # Your Go logic (runs in WASM and native)
├── wasm/main.go          # WASM exports (what JS can call)
├── frontend/
│   ├── src/
│   │   ├── App.tsx       # React app
│   │   └── generated/    # Auto-generated TypeScript client
│   └── public/
│       └── task.wasm     # Compiled WASM (built automatically)
```

## Adding Your Own Functions

### 1. Write Go logic

```go
// pkg/task/task.go
func YourFunction(input string) (string, error) {
    // Your logic here
    return result, nil
}
```

### 2. Export for WASM

```go
// wasm/main.go
func YourFunction(input string) (string, error) {
    return task.YourFunction(input)
}
```

### 3. Generate TypeScript bindings

```bash
npm run generate
```

### 4. Call from React

```tsx
const wasm = await Main.init('./worker.js');
const result = await wasm.yourFunction("input");
```

## Supported Types

- `int`, `float64`, `string`, `bool`
- `[]byte` (as Uint8Array in JS)
- Callbacks: `func(int, string)` etc.
- Errors (returned as rejected promises)

## npm Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run generate` | Regenerate TS bindings from Go |
| `npm run build:wasm` | Rebuild WASM only |

## Requirements

- [Go 1.23+](https://go.dev/dl/)
- [TinyGo](https://tinygo.org/getting-started/install/)
- [Node.js 20+](https://nodejs.org/)
- [gowasm-bindgen](https://github.com/13rac1/gowasm-bindgen): `go install github.com/13rac1/gowasm-bindgen/cmd/gowasm-bindgen@latest`

## Why Go in the Browser?

- **Arbitrary precision math**: Go's `math/big` handles numbers JS can't (JS loses precision at Fibonacci(79))
- **Existing Go libraries**: Reuse battle-tested code
- **CPU-intensive work**: Offload to Web Worker without blocking UI
- **Type safety**: End-to-end types from Go → TypeScript

## Tech Stack

- **Go** → TinyGo → WebAssembly (304KB)
- **React 19** + TypeScript + Vite
- **Tailwind CSS** for styling
- **gowasm-bindgen** for type-safe bindings

## License

MIT
