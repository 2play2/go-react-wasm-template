import { useState } from 'react';
import { useWasm } from './useWasm';

function App() {
  const { init, loading: wasmLoading } = useWasm();
  const [greeting, setGreeting] = useState<string | null>(null);
  const [fibonacci, setFibonacci] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGreet = async () => {
    setLoading(true);
    try {
      const wasm = await init();
      const result = await wasm.greet('Developer');
      setGreeting(result);
    } finally {
      setLoading(false);
    }
  };

  const handleFibonacci = async () => {
    setLoading(true);
    try {
      const wasm = await init();
      const result = await wasm.fibonacci(1000, () => {});
      setFibonacci(result);
    } finally {
      setLoading(false);
    }
  };

  const isLoading = loading || wasmLoading;

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-8">
      <div className="max-w-2xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Go WASM Starter
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Run Go code in the browser via WebAssembly
          </p>
        </div>

        {/* Example 1: Simple function */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Example 1: Simple Function
          </h2>
          <button
            onClick={handleGreet}
            disabled={isLoading}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
          >
            Call greet("Developer")
          </button>
          {greeting && (
            <pre className="mt-4 p-3 bg-gray-100 dark:bg-gray-700 rounded text-sm overflow-x-auto">
              {greeting}
            </pre>
          )}
        </div>

        {/* Example 2: Complex computation */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Example 2: Beyond JavaScript's Limits
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            JavaScript loses precision at F(79). Go's math/big handles any size.
          </p>
          <button
            onClick={handleFibonacci}
            disabled={isLoading}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
          >
            Calculate F(1000)
          </button>
          {fibonacci && (
            <div className="mt-4 p-3 bg-gray-100 dark:bg-gray-700 rounded">
              <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                F(1000) = {fibonacci.length} digits
              </div>
              <pre className="text-xs break-all whitespace-pre-wrap max-h-32 overflow-y-auto">
                {fibonacci}
              </pre>
            </div>
          )}
        </div>

        {/* Instructions */}
        <div className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
          <p className="font-medium">To add your own Go functions:</p>
          <ol className="list-decimal list-inside space-y-1">
            <li>
              Write your logic in{' '}
              <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">
                pkg/task/task.go
              </code>
            </li>
            <li>
              Export it in{' '}
              <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">
                wasm/main.go
              </code>
            </li>
            <li>
              Run{' '}
              <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">
                npm run wasm
              </code>
            </li>
            <li>
              Call it from React:{' '}
              <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">
                await wasm.yourFunction()
              </code>
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
}

export default App;
