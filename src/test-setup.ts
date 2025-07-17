import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock window.getSelection for tests
Object.defineProperty(window, 'getSelection', {
  writable: true,
  value: vi.fn().mockImplementation(() => ({
    rangeCount: 0,
    addRange: vi.fn(),
    removeAllRanges: vi.fn(),
    getRangeAt: vi.fn(),
  })),
});

// Mock document.execCommand for tests
Object.defineProperty(document, 'execCommand', {
  writable: true,
  value: vi.fn().mockImplementation(() => true),
});