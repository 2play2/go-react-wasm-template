import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import App from './App';

// =============================================================================
// WASM MOCKING PATTERN
// =============================================================================
// This file demonstrates how to test React components that use WASM.
// The key is mocking the useWasm hook to return a controllable mock.

const mockWasmInstance = {
  greet: vi.fn(),
  fibonacci: vi.fn(),
};

const mockInit = vi.fn();

vi.mock('./useWasm', () => ({
  useWasm: () => ({
    init: mockInit,
    loading: false,
    error: null,
  }),
}));

describe('App', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockInit.mockResolvedValue(mockWasmInstance);
  });

  it('renders the main heading', () => {
    render(<App />);
    expect(screen.getByText('Go WASM Starter')).toBeInTheDocument();
  });

  it('renders both example sections', () => {
    render(<App />);
    expect(screen.getByText('Example 1: Simple Function')).toBeInTheDocument();
    expect(
      screen.getByText("Example 2: Beyond JavaScript's Limits")
    ).toBeInTheDocument();
  });

  it('calls greet function when button is clicked', async () => {
    mockWasmInstance.greet.mockResolvedValue('Hello, Developer!');

    render(<App />);

    const greetButton = screen.getByText('Call greet("Developer")');
    fireEvent.click(greetButton);

    await waitFor(() => {
      expect(mockInit).toHaveBeenCalled();
    });

    await waitFor(() => {
      expect(mockWasmInstance.greet).toHaveBeenCalledWith('Developer');
    });
  });

  it('displays greet result after successful call', async () => {
    const greeting = 'Hello, Developer! From Go WASM.';
    mockWasmInstance.greet.mockResolvedValue(greeting);

    render(<App />);

    fireEvent.click(screen.getByText('Call greet("Developer")'));

    await waitFor(() => {
      expect(screen.getByText(greeting)).toBeInTheDocument();
    });
  });

  it('calls fibonacci function when button is clicked', async () => {
    mockWasmInstance.fibonacci.mockResolvedValue('12345');

    render(<App />);

    const fibButton = screen.getByText('Calculate F(1000)');
    fireEvent.click(fibButton);

    await waitFor(() => {
      expect(mockWasmInstance.fibonacci).toHaveBeenCalledWith(
        1000,
        expect.any(Function)
      );
    });
  });

  it('displays fibonacci result with digit count', async () => {
    const fibResult = '1234567890'.repeat(21); // 210 digits
    mockWasmInstance.fibonacci.mockResolvedValue(fibResult);

    render(<App />);

    fireEvent.click(screen.getByText('Calculate F(1000)'));

    await waitFor(() => {
      expect(
        screen.getByText(`F(1000) = ${fibResult.length} digits`)
      ).toBeInTheDocument();
    });
  });

  it('shows instructions for adding Go functions', () => {
    render(<App />);
    expect(
      screen.getByText('To add your own Go functions:')
    ).toBeInTheDocument();
    expect(screen.getByText(/pkg\/task\/task.go/)).toBeInTheDocument();
    expect(screen.getByText(/wasm\/main.go/)).toBeInTheDocument();
  });
});

// =============================================================================
// TESTING PATTERNS EXPLAINED
// =============================================================================
//
// 1. MOCK THE HOOK, NOT THE MODULE
//    Instead of mocking GoWasm.init directly, mock the useWasm hook.
//    This gives you full control over the WASM state (loading, error, init).
//
// 2. RESET MOCKS IN beforeEach
//    Always clear mocks between tests to ensure test isolation.
//
// 3. USE waitFor FOR ASYNC OPERATIONS
//    WASM calls are async. Use waitFor() to wait for state updates.
//
// 4. TEST USER INTERACTIONS
//    Use fireEvent or userEvent to simulate clicks, then verify the
//    mock WASM functions were called with correct arguments.
//
// 5. TEST LOADING STATES (if needed)
//    You can control the loading state by modifying the mock:
//
//    vi.mock('./useWasm', () => ({
//      useWasm: () => ({
//        init: mockInit,
//        loading: true,  // <-- force loading state
//        error: null,
//      }),
//    }));
//
// 6. TEST ERROR STATES (if needed)
//    Similarly, inject errors to test error handling:
//
//    vi.mock('./useWasm', () => ({
//      useWasm: () => ({
//        init: mockInit,
//        loading: false,
//        error: new Error('WASM failed to load'),
//      }),
//    }));
