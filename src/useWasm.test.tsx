import { renderHook, act, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock WASM instance
const mockWasmInstance = {
  greet: vi.fn().mockResolvedValue('Hello, Test!'),
  fibonacci: vi.fn().mockResolvedValue('12345'),
};

// Mock init function - accessible without importing the generated file
const mockInit = vi.fn();

vi.mock('./generated/go-wasm', () => ({
  GoWasm: {
    init: mockInit,
  },
}));

describe('useWasm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.resetModules();
  });

  it('returns initial state with loading false', async () => {
    const { useWasm: freshUseWasm } = await import('./useWasm');
    const { result } = renderHook(() => freshUseWasm());

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(null);
    expect(typeof result.current.init).toBe('function');
  });

  it('initializes WASM successfully', async () => {
    mockInit.mockResolvedValueOnce(mockWasmInstance);
    const { useWasm: freshUseWasm } = await import('./useWasm');
    const { result } = renderHook(() => freshUseWasm());

    let wasmResult: unknown;
    await act(async () => {
      wasmResult = await result.current.init();
    });

    expect(mockInit).toHaveBeenCalledWith('./worker.js');
    expect(wasmResult).toBe(mockWasmInstance);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(null);
  });

  it('returns cached instance on subsequent calls', async () => {
    mockInit.mockResolvedValueOnce(mockWasmInstance);
    const { useWasm: freshUseWasm } = await import('./useWasm');
    const { result } = renderHook(() => freshUseWasm());

    // First call
    await act(async () => {
      await result.current.init();
    });

    // Second call should return cached instance
    let secondResult: unknown;
    await act(async () => {
      secondResult = await result.current.init();
    });

    expect(mockInit).toHaveBeenCalledTimes(1);
    expect(secondResult).toBe(mockWasmInstance);
  });

  it('handles initialization error', async () => {
    const testError = new Error('WASM load failed');
    mockInit.mockRejectedValueOnce(testError);
    const { useWasm: freshUseWasm } = await import('./useWasm');
    const { result } = renderHook(() => freshUseWasm());

    await act(async () => {
      try {
        await result.current.init();
      } catch {
        // Expected to throw
      }
    });

    await waitFor(() => {
      expect(result.current.error).toBe(testError);
    });
    expect(result.current.loading).toBe(false);
  });

  it('sets loading state during initialization', async () => {
    let resolveInit: (value: unknown) => void;
    const initPromise = new Promise((resolve) => {
      resolveInit = resolve;
    });
    mockInit.mockReturnValueOnce(initPromise);

    const { useWasm: freshUseWasm } = await import('./useWasm');
    const { result } = renderHook(() => freshUseWasm());

    // Start initialization
    act(() => {
      result.current.init();
    });

    // Should be loading
    await waitFor(() => {
      expect(result.current.loading).toBe(true);
    });

    // Resolve the promise
    await act(async () => {
      resolveInit!(mockWasmInstance);
    });

    // Should no longer be loading
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
  });

  it('shares instance across multiple hook consumers', async () => {
    mockInit.mockResolvedValueOnce(mockWasmInstance);
    const { useWasm: freshUseWasm } = await import('./useWasm');

    const { result: result1 } = renderHook(() => freshUseWasm());
    const { result: result2 } = renderHook(() => freshUseWasm());

    // Initialize from first hook
    let instance1: unknown;
    await act(async () => {
      instance1 = await result1.current.init();
    });

    // Get instance from second hook
    let instance2: unknown;
    await act(async () => {
      instance2 = await result2.current.init();
    });

    expect(instance1).toBe(instance2);
    expect(mockInit).toHaveBeenCalledTimes(1);
  });
});
