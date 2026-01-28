# Go WASM React Starter

Run Go code in the browser via WebAssembly with a React + TypeScript frontend.

## How It Works

1. Write Go code in `pkg/task/`
2. Export functions in `wasm/main.go`
3. **gowasm-bindgen** compiles Go → WASM and generates TypeScript bindings
4. WASM runs in a **Web Worker** (doesn't block UI)

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
├── pkg/task/task.go      # Your Go logic (testable without WASM)
├── wasm/main.go          # WASM exports (what JS can call)
├── frontend/
│   ├── src/
│   │   ├── App.tsx       # React app
│   │   └── generated/    # Auto-generated TypeScript client
│   └── public/           # WASM runtime (built automatically)
```

## Adding Your Own Functions

> **Why two files?** `pkg/task/` contains your business logic (testable without WASM). `wasm/main.go` exports functions to JavaScript.

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

### 3. Rebuild WASM

```bash
npm run wasm
```

### 4. Call from React

```tsx
const wasm = await GoWasm.init('./worker.js');
const result = await wasm.yourFunction("input");
```

## Type Mapping

| Go | TypeScript |
|----|------------|
| `string` | `string` |
| `int`, `float64` | `number` |
| `bool` | `boolean` |
| `[]byte` | `Uint8Array` |
| `error` | rejected Promise |
| `func(int, string)` | `(n: number, s: string) => void` |

## npm Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run wasm` | Rebuild WASM and TypeScript bindings |

## Requirements

- [Go 1.23+](https://go.dev/dl/) - The programming language
- [TinyGo](https://tinygo.org/getting-started/install/) - Go compiler optimized for small WASM (304KB vs 2.4MB)
- [Node.js 20+](https://nodejs.org/)
- [gowasm-bindgen](https://github.com/13rac1/gowasm-bindgen) - Compiles Go to WASM with TypeScript bindings
  ```bash
  go install github.com/13rac1/gowasm-bindgen@latest
  ```

## Why Go in the Browser?

- **Arbitrary precision math**: Go's `math/big` handles numbers JS can't (JS loses precision at Fibonacci(79))
- **Existing Go libraries**: Reuse battle-tested code
- **CPU-intensive work**: Offload to Web Worker without blocking UI
- **Type safety**: End-to-end types from Go → TypeScript

## Tech Stack

- **Go** → TinyGo → WebAssembly (~230KB)
- **React 19** + TypeScript + Vite
- **Tailwind CSS** for styling
- **gowasm-bindgen** for compilation and type-safe bindings

## License

MIT
