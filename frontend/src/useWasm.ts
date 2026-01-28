import { useCallback, useRef, useState } from 'react';
import { GoWasm } from './generated/go-wasm';

interface UseWasmResult {
  loading: boolean;
  error: Error | null;
  init: () => Promise<GoWasm>;
}

// Singleton instance shared across all hook consumers
let wasmInstance: GoWasm | null = null;
let initPromise: Promise<GoWasm> | null = null;

export function useWasm(): UseWasmResult {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const mountedRef = useRef(true);

  const init = useCallback(async (): Promise<GoWasm> => {
    // Return existing instance
    if (wasmInstance) {
      return wasmInstance;
    }

    // Return pending initialization
    if (initPromise) {
      return initPromise;
    }

    // Start new initialization
    setLoading(true);
    setError(null);

    initPromise = GoWasm.init('./worker.js')
      .then((instance) => {
        wasmInstance = instance;
        if (mountedRef.current) {
          setLoading(false);
        }
        return instance;
      })
      .catch((err) => {
        if (mountedRef.current) {
          setError(err);
          setLoading(false);
        }
        initPromise = null;
        throw err;
      });

    return initPromise;
  }, []);

  return { loading, error, init };
}
