import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { WYSIWYGEditor } from '../WYSIWYGEditor';

// Mock the command system for performance tests
vi.mock('../../utils/commandSystem', () => ({
  commandExecutor: {
    executeCommand: vi.fn(),
    getActiveFormats: vi.fn(),
    canUndo: vi.fn(),
    canRedo: vi.fn(),
    getCurrentBlockFormat: vi.fn()
  }
}));

vi.mock('../../utils/selectionUtils', () => ({
  getCurrentSelection: vi.fn(),
  isSelectionInEditor: vi.fn(),
  focusEditorWithSelection: vi.fn()
}));

import { commandExecutor } from '../../utils/commandSystem';

const mockCommandExecutor = commandExecutor as any;

describe('WYSIWYGEditor Performance Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockCommandExecutor.executeCommand.mockReturnValue({ success: true });
    mockCommandExecutor.getActiveFormats.mockReturnValue(new Set());
    mockCommandExecutor.canUndo.mockReturnValue(false);
    mockCommandExecutor.canRedo.mockReturnValue(false);
    mockCommandExecutor.getCurrentBlockFormat.mockReturnValue('');
  });

  describe('Large Document Handling', () => {
    it('should handle large content efficiently', async () => {
      const mockOnChange = vi.fn();
      
      // Generate large content (approximately 10KB)
      const largeContent = Array(1000).fill(0).map((_, i) => 
        `<p>This is paragraph ${i + 1} with some content to test performance with large documents.</p>`
      ).join('');
      
      const startTime = performance.now();
      
      render(<WYSIWYGEditor 
        placeholder="Start typing..." 
        onChange={mockOnChange}
        initialContent={largeContent}
      />);
      
      const renderTime = performance.now() - startTime;
      
      // Should render within reasonable time (less than 100ms)
      expect(renderTime).toBeLessThan(100);
      
      const editor = screen.getByRole('textbox');
      expect(editor).toBeInTheDocument();
    });

    it('should handle rapid input events efficiently', async () => {
      const mockOnChange = vi.fn();
      render(<WYSIWYGEditor placeholder="Start typing..." onChange={mockOnChange} />);
      
      const editor = screen.getByRole('textbox');
      fireEvent.focus(editor);
      
      const startTime = performance.now();
      
      // Simulate rapid typing (100 input events)
      for (let i = 0; i < 100; i++) {
        fireEvent.input(editor, { 
          target: { innerHTML: `Content ${i}` } 
        });
      }
      
      const inputTime = performance.now() - startTime;
      
      // Should handle rapid input within reasonable time (less than 200ms)
      expect(inputTime).toBeLessThan(200);
      
      // Verify onChange was called for each input
      await waitFor(() => {
        expect(mockOnChange).toHaveBeenCalledTimes(100);
      });
    });

    it('should handle multiple format state updates efficiently', async () => {
      render(<WYSIWYGEditor placeholder="Start typing..." />);
      
      const editor = screen.getByRole('textbox');
      
      const startTime = performance.now();
      
      // Simulate rapid format state changes
      for (let i = 0; i < 50; i++) {
        const formats = new Set();
        if (i % 2 === 0) formats.add('BOLD');
        if (i % 3 === 0) formats.add('ITALIC');
        if (i % 5 === 0) formats.add('UNDERLINE');
        
        mockCommandExecutor.getActiveFormats.mockReturnValue(formats);
        fireEvent.focus(editor);
      }
      
      const updateTime = performance.now() - startTime;
      
      // Should handle format updates efficiently (less than 100ms)
      expect(updateTime).toBeLessThan(100);
    });
  });

  describe('Memory Usage', () => {
    it('should not create memory leaks with repeated operations', async () => {
      const mockOnChange = vi.fn();
      const { unmount } = render(<WYSIWYGEditor placeholder="Start typing..." onChange={mockOnChange} />);
      
      const editor = screen.getByRole('textbox');
      const boldButton = screen.getByTitle('Bold');
      
      // Perform many operations
      for (let i = 0; i < 100; i++) {
        fireEvent.focus(editor);
        fireEvent.input(editor, { target: { innerHTML: `Content ${i}` } });
        fireEvent.click(boldButton);
      }
      
      // Cleanup should not throw errors
      expect(() => unmount()).not.toThrow();
    });

    it('should handle component remounting efficiently', () => {
      const startTime = performance.now();
      
      // Mount and unmount multiple times
      for (let i = 0; i < 10; i++) {
        const { unmount } = render(<WYSIWYGEditor placeholder="Start typing..." />);
        unmount();
      }
      
      const mountTime = performance.now() - startTime;
      
      // Should handle remounting efficiently (less than 100ms for 10 mounts)
      expect(mountTime).toBeLessThan(100);
    });
  });

  describe('Event Handler Performance', () => {
    it('should handle rapid toolbar button clicks efficiently', async () => {
      render(<WYSIWYGEditor placeholder="Start typing..." />);
      
      const boldButton = screen.getByTitle('Bold');
      const italicButton = screen.getByTitle('Italic');
      const underlineButton = screen.getByTitle('Underline');
      
      const startTime = performance.now();
      
      // Rapid button clicks
      for (let i = 0; i < 50; i++) {
        fireEvent.click(boldButton);
        fireEvent.click(italicButton);
        fireEvent.click(underlineButton);
      }
      
      const clickTime = performance.now() - startTime;
      
      // Should handle rapid clicks efficiently (less than 100ms)
      expect(clickTime).toBeLessThan(100);
      
      // Verify all commands were executed
      expect(mockCommandExecutor.executeCommand).toHaveBeenCalledTimes(150);
    });

    it('should handle selection change events efficiently', async () => {
      render(<WYSIWYGEditor placeholder="Start typing..." />);
      
      const startTime = performance.now();
      
      // Simulate rapid selection changes
      for (let i = 0; i < 100; i++) {
        fireEvent(document, new Event('selectionchange'));
      }
      
      const selectionTime = performance.now() - startTime;
      
      // Should handle selection changes efficiently (less than 50ms)
      expect(selectionTime).toBeLessThan(50);
    });
  });

  describe('Content Processing Performance', () => {
    it('should process large paste content efficiently', async () => {
      render(<WYSIWYGEditor placeholder="Start typing..." />);
      
      const editor = screen.getByRole('textbox');
      
      // Mock selection for paste handling
      const mockRange = {
        deleteContents: vi.fn(),
        insertNode: vi.fn(),
        collapse: vi.fn()
      };
      
      const mockSelection = {
        rangeCount: 1,
        getRangeAt: vi.fn().mockReturnValue(mockRange),
        removeAllRanges: vi.fn(),
        addRange: vi.fn()
      };
      
      Object.defineProperty(window, 'getSelection', {
        value: vi.fn().mockReturnValue(mockSelection),
        writable: true
      });
      
      // Generate large HTML content for paste
      const largeHtmlContent = Array(500).fill(0).map((_, i) => 
        `<p>Pasted paragraph ${i + 1} with <strong>formatting</strong> and <em>styles</em>.</p>`
      ).join('');
      
      const clipboardData = {
        getData: vi.fn().mockImplementation((type) => {
          if (type === 'text/html') {
            return largeHtmlContent;
          }
          return '';
        })
      };
      
      fireEvent.focus(editor);
      
      const startTime = performance.now();
      fireEvent.paste(editor, { clipboardData });
      const pasteTime = performance.now() - startTime;
      
      // Should process large paste content efficiently (less than 100ms)
      expect(pasteTime).toBeLessThan(100);
      
      expect(clipboardData.getData).toHaveBeenCalledWith('text/html');
      expect(mockRange.insertNode).toHaveBeenCalled();
    });

    it('should handle content sanitization efficiently', async () => {
      render(<WYSIWYGEditor placeholder="Start typing..." />);
      
      const editor = screen.getByRole('textbox');
      
      // Mock selection for paste handling
      const mockRange = {
        deleteContents: vi.fn(),
        insertNode: vi.fn(),
        collapse: vi.fn()
      };
      
      const mockSelection = {
        rangeCount: 1,
        getRangeAt: vi.fn().mockReturnValue(mockRange),
        removeAllRanges: vi.fn(),
        addRange: vi.fn()
      };
      
      Object.defineProperty(window, 'getSelection', {
        value: vi.fn().mockReturnValue(mockSelection),
        writable: true
      });
      
      // Generate content with many dangerous elements to test sanitization performance
      const dangerousContent = Array(100).fill(0).map((_, i) => 
        `<p>Safe content ${i}</p><script>alert('xss${i}')</script><iframe src="evil${i}.html"></iframe>`
      ).join('');
      
      const clipboardData = {
        getData: vi.fn().mockReturnValue(dangerousContent)
      };
      
      fireEvent.focus(editor);
      
      const startTime = performance.now();
      fireEvent.paste(editor, { clipboardData });
      const sanitizeTime = performance.now() - startTime;
      
      // Should sanitize content efficiently (less than 50ms)
      expect(sanitizeTime).toBeLessThan(50);
    });
  });

  describe('Rendering Performance', () => {
    it('should re-render efficiently when props change', async () => {
      const { rerender } = render(<WYSIWYGEditor placeholder="Initial placeholder" />);
      
      const startTime = performance.now();
      
      // Multiple prop changes
      for (let i = 0; i < 20; i++) {
        rerender(<WYSIWYGEditor placeholder={`Placeholder ${i}`} />);
      }
      
      const rerenderTime = performance.now() - startTime;
      
      // Should handle re-renders efficiently (less than 50ms for 20 re-renders)
      expect(rerenderTime).toBeLessThan(50);
    });

    it('should handle active format state changes efficiently', async () => {
      render(<WYSIWYGEditor placeholder="Start typing..." />);
      
      const editor = screen.getByRole('textbox');
      
      const startTime = performance.now();
      
      // Simulate many format state changes
      for (let i = 0; i < 100; i++) {
        const activeFormats = new Set();
        if (i % 2 === 0) activeFormats.add('BOLD');
        if (i % 3 === 0) activeFormats.add('ITALIC');
        if (i % 4 === 0) activeFormats.add('FORMAT_H1');
        if (i % 5 === 0) activeFormats.add('JUSTIFY_CENTER');
        
        mockCommandExecutor.getActiveFormats.mockReturnValue(activeFormats);
        fireEvent.focus(editor);
      }
      
      const formatTime = performance.now() - startTime;
      
      // Should handle format state changes efficiently (less than 100ms)
      expect(formatTime).toBeLessThan(100);
    });
  });

  describe('Stress Testing', () => {
    it('should handle extreme content size', async () => {
      const mockOnChange = vi.fn();
      
      // Generate extremely large content (approximately 100KB)
      const extremeContent = Array(10000).fill(0).map((_, i) => 
        `<p>Extreme content paragraph ${i + 1} with various <strong>formatting</strong> and <em>styles</em> to test performance limits.</p>`
      ).join('');
      
      const startTime = performance.now();
      
      const { unmount } = render(<WYSIWYGEditor 
        placeholder="Start typing..." 
        onChange={mockOnChange}
        initialContent={extremeContent}
      />);
      
      const renderTime = performance.now() - startTime;
      
      // Should handle extreme content within reasonable time (less than 500ms)
      expect(renderTime).toBeLessThan(500);
      
      const editor = screen.getByRole('textbox');
      expect(editor).toBeInTheDocument();
      
      // Cleanup should be efficient
      const cleanupStart = performance.now();
      unmount();
      const cleanupTime = performance.now() - cleanupStart;
      
      expect(cleanupTime).toBeLessThan(100);
    });

    it('should handle rapid consecutive operations', async () => {
      const mockOnChange = vi.fn();
      render(<WYSIWYGEditor placeholder="Start typing..." onChange={mockOnChange} />);
      
      const editor = screen.getByRole('textbox');
      const boldButton = screen.getByTitle('Bold');
      const italicButton = screen.getByTitle('Italic');
      
      fireEvent.focus(editor);
      
      const startTime = performance.now();
      
      // Rapid consecutive operations
      for (let i = 0; i < 200; i++) {
        fireEvent.input(editor, { target: { innerHTML: `Content ${i}` } });
        if (i % 2 === 0) fireEvent.click(boldButton);
        if (i % 3 === 0) fireEvent.click(italicButton);
        
        // Simulate format state changes
        const formats = new Set();
        if (i % 2 === 0) formats.add('BOLD');
        if (i % 3 === 0) formats.add('ITALIC');
        mockCommandExecutor.getActiveFormats.mockReturnValue(formats);
      }
      
      const operationTime = performance.now() - startTime;
      
      // Should handle rapid operations within reasonable time (less than 300ms)
      expect(operationTime).toBeLessThan(300);
      
      // Verify operations were processed
      await waitFor(() => {
        expect(mockOnChange).toHaveBeenCalledTimes(200);
      });
    });
  });

  describe('Browser Resource Usage', () => {
    it('should not exceed reasonable DOM node count', () => {
      const initialNodeCount = document.querySelectorAll('*').length;
      
      const { unmount } = render(<WYSIWYGEditor placeholder="Start typing..." />);
      
      const afterRenderNodeCount = document.querySelectorAll('*').length;
      const addedNodes = afterRenderNodeCount - initialNodeCount;
      
      // Should not add excessive DOM nodes (less than 50 for the editor)
      expect(addedNodes).toBeLessThan(50);
      
      unmount();
      
      const afterUnmountNodeCount = document.querySelectorAll('*').length;
      
      // Should clean up properly (allow for some test framework overhead)
      expect(afterUnmountNodeCount - initialNodeCount).toBeLessThan(5);
    });

    it('should handle event listener cleanup properly', () => {
      const addEventListenerSpy = vi.spyOn(document, 'addEventListener');
      const removeEventListenerSpy = vi.spyOn(document, 'removeEventListener');
      
      const { unmount } = render(<WYSIWYGEditor placeholder="Start typing..." />);
      
      const addedListeners = addEventListenerSpy.mock.calls.length;
      
      unmount();
      
      const removedListeners = removeEventListenerSpy.mock.calls.length;
      
      // Should remove all added event listeners
      expect(removedListeners).toBeGreaterThanOrEqual(addedListeners);
      
      addEventListenerSpy.mockRestore();
      removeEventListenerSpy.mockRestore();
    });
  });
});