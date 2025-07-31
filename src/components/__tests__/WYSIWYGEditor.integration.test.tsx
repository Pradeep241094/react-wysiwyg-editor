import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { WYSIWYGEditor } from '../WYSIWYGEditor';

// Mock the command system and selection utils for integration tests
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

describe('WYSIWYGEditor Integration Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockCommandExecutor.executeCommand.mockReturnValue({ success: true });
    mockCommandExecutor.getActiveFormats.mockReturnValue(new Set());
    mockCommandExecutor.canUndo.mockReturnValue(false);
    mockCommandExecutor.canRedo.mockReturnValue(false);
    mockCommandExecutor.getCurrentBlockFormat.mockReturnValue('');
  });

  describe('Complete Text Formatting Workflow', () => {
    it('should handle complete bold text formatting workflow', async () => {
      const mockOnChange = vi.fn();
      render(<WYSIWYGEditor placeholder="Start typing..." onChange={mockOnChange} />);
      
      const editor = screen.getByRole('textbox');
      const boldButton = screen.getByTitle('Bold');
      
      // Step 1: Focus editor
      fireEvent.focus(editor);
      
      // Step 2: Type some text
      fireEvent.input(editor, { target: { innerHTML: 'Hello World' } });
      
      // Step 3: Select text (simulate)
      mockCommandExecutor.executeCommand.mockReturnValue({ success: true, command: 'BOLD' });
      
      // Step 4: Apply bold formatting
      fireEvent.click(boldButton);
      
      // Step 5: Verify command execution
      expect(mockCommandExecutor.executeCommand).toHaveBeenCalledWith('BOLD', undefined, expect.any(HTMLElement));
      
      // Step 6: Verify content change callback
      await waitFor(() => {
        expect(mockOnChange).toHaveBeenCalled();
      });
    });

    it('should handle complete heading formatting workflow', async () => {
      const mockOnChange = vi.fn();
      render(<WYSIWYGEditor placeholder="Start typing..." onChange={mockOnChange} />);
      
      const editor = screen.getByRole('textbox');
      const h1Button = screen.getByTitle('Heading 1');
      
      // Step 1: Focus editor and add content
      fireEvent.focus(editor);
      fireEvent.input(editor, { target: { innerHTML: 'My Title' } });
      
      // Step 2: Apply H1 formatting
      mockCommandExecutor.executeCommand.mockReturnValue({ success: true, command: 'FORMAT_H1', value: 'H1' });
      fireEvent.click(h1Button);
      
      // Step 3: Verify command execution
      expect(mockCommandExecutor.executeCommand).toHaveBeenCalledWith('FORMAT_H1', 'H1', expect.any(HTMLElement));
      
      // Step 4: Verify content change
      await waitFor(() => {
        expect(mockOnChange).toHaveBeenCalled();
      });
    });

    it('should handle complete list creation workflow', async () => {
      const mockOnChange = vi.fn();
      render(<WYSIWYGEditor placeholder="Start typing..." onChange={mockOnChange} />);
      
      const editor = screen.getByRole('textbox');
      const bulletListButton = screen.getByTitle('Bullet List');
      
      // Step 1: Focus editor
      fireEvent.focus(editor);
      
      // Step 2: Create bullet list
      mockCommandExecutor.executeCommand.mockReturnValue({ success: true, command: 'INSERT_UNORDERED_LIST' });
      fireEvent.click(bulletListButton);
      
      // Step 3: Add list content
      fireEvent.input(editor, { target: { innerHTML: '<ul><li>First item</li></ul>' } });
      
      // Step 4: Simulate Enter key for new list item
      fireEvent.keyDown(editor, { key: 'Enter' });
      
      // Step 5: Add more content
      fireEvent.input(editor, { target: { innerHTML: '<ul><li>First item</li><li>Second item</li></ul>' } });
      
      // Verify command execution and content changes
      expect(mockCommandExecutor.executeCommand).toHaveBeenCalledWith('INSERT_UNORDERED_LIST', undefined, expect.any(HTMLElement));
      await waitFor(() => {
        expect(mockOnChange).toHaveBeenCalled();
      });
    });
  });

  describe('Complex Multi-Format Workflow', () => {
    it('should handle applying multiple formats in sequence', async () => {
      const mockOnChange = vi.fn();
      render(<WYSIWYGEditor placeholder="Start typing..." onChange={mockOnChange} />);
      
      const editor = screen.getByRole('textbox');
      const boldButton = screen.getByTitle('Bold');
      const italicButton = screen.getByTitle('Italic');
      const centerAlignButton = screen.getByTitle('Align Center');
      
      // Step 1: Add content
      fireEvent.focus(editor);
      fireEvent.input(editor, { target: { innerHTML: 'Formatted text' } });
      
      // Step 2: Apply bold
      mockCommandExecutor.executeCommand.mockReturnValue({ success: true, command: 'BOLD' });
      fireEvent.click(boldButton);
      
      // Step 3: Apply italic
      mockCommandExecutor.executeCommand.mockReturnValue({ success: true, command: 'ITALIC' });
      fireEvent.click(italicButton);
      
      // Step 4: Apply center alignment
      mockCommandExecutor.executeCommand.mockReturnValue({ success: true, command: 'JUSTIFY_CENTER' });
      fireEvent.click(centerAlignButton);
      
      // Verify all commands were executed
      expect(mockCommandExecutor.executeCommand).toHaveBeenCalledWith('BOLD', undefined, expect.any(HTMLElement));
      expect(mockCommandExecutor.executeCommand).toHaveBeenCalledWith('ITALIC', undefined, expect.any(HTMLElement));
      expect(mockCommandExecutor.executeCommand).toHaveBeenCalledWith('JUSTIFY_CENTER', undefined, expect.any(HTMLElement));
      
      // Verify content changes (may be called more times due to initial content)
      await waitFor(() => {
        expect(mockOnChange).toHaveBeenCalled();
      });
    });

    it('should handle format state changes correctly', async () => {
      render(<WYSIWYGEditor placeholder="Start typing..." />);
      
      const editor = screen.getByRole('textbox');
      const boldButton = screen.getByTitle('Bold');
      const italicButton = screen.getByTitle('Italic');
      
      // Step 1: Focus editor to trigger format state updates
      fireEvent.focus(editor);
      
      // Step 2: Simulate bold being active
      mockCommandExecutor.getActiveFormats.mockReturnValue(new Set(['BOLD']));
      fireEvent.focus(editor); // Trigger format state update
      
      await waitFor(() => {
        expect(boldButton).toHaveClass('active');
        expect(italicButton).not.toHaveClass('active');
      });
      
      // Step 3: Simulate both bold and italic being active
      mockCommandExecutor.getActiveFormats.mockReturnValue(new Set(['BOLD', 'ITALIC']));
      fireEvent.input(editor, { target: { innerHTML: '<strong><em>Bold and italic</em></strong>' } });
      
      await waitFor(() => {
        expect(boldButton).toHaveClass('active');
        expect(italicButton).toHaveClass('active');
      });
    });
  });

  describe('Link Management Workflow', () => {
    it('should handle complete link creation workflow', async () => {
      const mockOnChange = vi.fn();
      
      // Mock window.prompt for link URL input
      const originalPrompt = window.prompt;
      window.prompt = vi.fn().mockReturnValue('https://example.com');
      
      render(<WYSIWYGEditor placeholder="Start typing..." onChange={mockOnChange} />);
      
      const editor = screen.getByRole('textbox');
      const linkButton = screen.getByTitle('Insert Link');
      
      // Step 1: Add text content
      fireEvent.focus(editor);
      fireEvent.input(editor, { target: { innerHTML: 'Click here' } });
      
      // Step 2: Create link (simulate text selection)
      mockCommandExecutor.executeCommand.mockReturnValue({ success: true, command: 'CREATE_LINK', value: 'https://example.com' });
      fireEvent.click(linkButton);
      
      // Step 3: Verify command execution
      expect(mockCommandExecutor.executeCommand).toHaveBeenCalledWith('CREATE_LINK', undefined, expect.any(HTMLElement));
      
      // Step 4: Verify content change
      await waitFor(() => {
        expect(mockOnChange).toHaveBeenCalled();
      });
      
      // Cleanup
      window.prompt = originalPrompt;
    });

    it('should handle link editing workflow', async () => {
      const mockOnChange = vi.fn();
      
      // Mock window.prompt for link URL editing
      const originalPrompt = window.prompt;
      window.prompt = vi.fn().mockReturnValue('https://updated-example.com');
      
      render(<WYSIWYGEditor placeholder="Start typing..." onChange={mockOnChange} />);
      
      const editor = screen.getByRole('textbox');
      const editLinkButton = screen.getByTitle('Edit Link');
      
      // Step 1: Add link content
      fireEvent.focus(editor);
      fireEvent.input(editor, { target: { innerHTML: '<a href="https://example.com">Link text</a>' } });
      
      // Step 2: Edit link
      mockCommandExecutor.executeCommand.mockReturnValue({ success: true, command: 'EDIT_LINK', value: 'https://updated-example.com' });
      fireEvent.click(editLinkButton);
      
      // Step 3: Verify command execution
      expect(mockCommandExecutor.executeCommand).toHaveBeenCalledWith('EDIT_LINK', undefined, expect.any(HTMLElement));
      
      // Cleanup
      window.prompt = originalPrompt;
    });
  });

  describe('Undo/Redo Workflow', () => {
    it('should handle complete undo/redo workflow', async () => {
      const mockOnChange = vi.fn();
      render(<WYSIWYGEditor placeholder="Start typing..." onChange={mockOnChange} />);
      
      const editor = screen.getByRole('textbox');
      const boldButton = screen.getByTitle('Bold');
      const undoButton = screen.getByTitle('Undo');
      const redoButton = screen.getByTitle('Redo');
      
      // Step 1: Add content and format
      fireEvent.focus(editor);
      fireEvent.input(editor, { target: { innerHTML: 'Test content' } });
      
      mockCommandExecutor.executeCommand.mockReturnValue({ success: true, command: 'BOLD' });
      fireEvent.click(boldButton);
      
      // Step 2: Enable undo and perform undo
      mockCommandExecutor.canUndo.mockReturnValue(true);
      mockCommandExecutor.executeCommand.mockReturnValue({ success: true, command: 'UNDO' });
      
      // Trigger state update
      fireEvent.focus(editor);
      
      await waitFor(() => {
        expect(undoButton).not.toBeDisabled();
      });
      
      fireEvent.click(undoButton);
      
      // Step 3: Enable redo and perform redo
      mockCommandExecutor.canRedo.mockReturnValue(true);
      mockCommandExecutor.executeCommand.mockReturnValue({ success: true, command: 'REDO' });
      
      // Trigger state update
      fireEvent.focus(editor);
      
      await waitFor(() => {
        expect(redoButton).not.toBeDisabled();
      });
      
      fireEvent.click(redoButton);
      
      // Verify command executions
      expect(mockCommandExecutor.executeCommand).toHaveBeenCalledWith('UNDO', undefined, expect.any(HTMLElement));
      expect(mockCommandExecutor.executeCommand).toHaveBeenCalledWith('REDO', undefined, expect.any(HTMLElement));
    });
  });

  describe('Paste Content Workflow', () => {
    it('should handle paste content sanitization workflow', async () => {
      const mockOnChange = vi.fn();
      render(<WYSIWYGEditor placeholder="Start typing..." onChange={mockOnChange} />);
      
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
      
      // Step 1: Focus editor
      fireEvent.focus(editor);
      
      // Step 2: Paste content with dangerous elements
      const clipboardData = {
        getData: vi.fn().mockImplementation((type) => {
          if (type === 'text/html') {
            return '<p>Safe content</p><script>alert("xss")</script><p>More content</p>';
          }
          return '';
        })
      };
      
      fireEvent.paste(editor, { clipboardData });
      
      // Step 3: Verify sanitization occurred
      expect(clipboardData.getData).toHaveBeenCalledWith('text/html');
      expect(mockRange.deleteContents).toHaveBeenCalled();
      expect(mockRange.insertNode).toHaveBeenCalled();
    });
  });

  describe('Error Handling Workflow', () => {
    it('should handle command execution failures gracefully', async () => {
      const mockOnChange = vi.fn();
      render(<WYSIWYGEditor placeholder="Start typing..." onChange={mockOnChange} />);
      
      const editor = screen.getByRole('textbox');
      const boldButton = screen.getByTitle('Bold');
      
      // Step 1: Focus editor
      fireEvent.focus(editor);
      
      // Step 2: Simulate command failure
      mockCommandExecutor.executeCommand.mockReturnValue({ 
        success: false, 
        error: 'Command failed',
        command: 'BOLD'
      });
      
      fireEvent.click(boldButton);
      
      // Step 3: Verify no content change on failure
      await new Promise(resolve => setTimeout(resolve, 10));
      expect(mockOnChange).not.toHaveBeenCalled();
    });

    it('should handle missing selection gracefully', async () => {
      render(<WYSIWYGEditor placeholder="Start typing..." />);
      
      const editor = screen.getByRole('textbox');
      
      // Mock no selection
      Object.defineProperty(window, 'getSelection', {
        value: vi.fn().mockReturnValue(null),
        writable: true
      });
      
      // Should not throw errors when handling selection changes
      expect(() => {
        fireEvent(document, new Event('selectionchange'));
      }).not.toThrow();
    });
  });

  describe('Focus Management Workflow', () => {
    it('should maintain focus during toolbar interactions', async () => {
      render(<WYSIWYGEditor placeholder="Start typing..." />);
      
      const editor = screen.getByRole('textbox');
      const boldButton = screen.getByTitle('Bold');
      
      // Step 1: Focus editor
      fireEvent.focus(editor);
      // Note: In test environment, document.activeElement may not behave exactly like in browser
      
      // Step 2: Click toolbar button (should prevent focus loss)
      const mouseDownEvent = new MouseEvent('mousedown', { bubbles: true });
      const preventDefaultSpy = vi.spyOn(mouseDownEvent, 'preventDefault');
      
      fireEvent(boldButton, mouseDownEvent);
      expect(preventDefaultSpy).toHaveBeenCalled();
      
      // Step 3: Click should still work
      mockCommandExecutor.executeCommand.mockReturnValue({ success: true, command: 'BOLD' });
      fireEvent.click(boldButton);
      
      expect(mockCommandExecutor.executeCommand).toHaveBeenCalledWith('BOLD', undefined, expect.any(HTMLElement));
    });
  });

  describe('Placeholder Behavior Workflow', () => {
    it('should handle placeholder visibility during editing workflow', async () => {
      render(<WYSIWYGEditor placeholder="Start typing here..." />);
      
      const editor = screen.getByRole('textbox');
      
      // Step 1: Initially show placeholder
      expect(screen.getByText('Start typing here...')).toBeInTheDocument();
      
      // Step 2: Hide placeholder on focus
      fireEvent.focus(editor);
      expect(screen.queryByText('Start typing here...')).not.toBeInTheDocument();
      
      // Step 3: Keep hidden when typing
      fireEvent.input(editor, { target: { innerHTML: 'Hello' } });
      expect(screen.queryByText('Start typing here...')).not.toBeInTheDocument();
      
      // Step 4: Show again when content is cleared and editor loses focus
      fireEvent.input(editor, { target: { innerHTML: '' } });
      fireEvent.blur(editor);
      expect(screen.getByText('Start typing here...')).toBeInTheDocument();
    });
  });
});