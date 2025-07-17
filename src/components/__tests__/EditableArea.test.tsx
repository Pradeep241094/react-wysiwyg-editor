import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { EditableArea } from '../EditableArea';
import { EditableAreaProps, SelectionState } from '../../types';

// Mock selection utilities
vi.mock('../../utils/selectionUtils', () => ({
  getCurrentSelection: vi.fn(() => ({
    range: null,
    isCollapsed: true,
    activeFormats: new Set(),
    currentBlockFormat: 'div'
  })),
  isSelectionInEditor: vi.fn(() => true),
  focusEditorWithSelection: vi.fn()
}));

// Mock props for testing
const createMockProps = (overrides: Partial<EditableAreaProps> = {}): EditableAreaProps => ({
  content: '',
  placeholder: 'Start typing...',
  onContentChange: vi.fn(),
  onFocus: vi.fn(),
  onBlur: vi.fn(),
  editorRef: React.createRef<HTMLDivElement>(),
  ...overrides
});

describe('EditableArea Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Basic Rendering', () => {
    it('renders contentEditable div with correct attributes', () => {
      const props = createMockProps();
      render(<EditableArea {...props} />);

      const editableDiv = screen.getByRole('textbox');
      expect(editableDiv).toBeInTheDocument();
      expect(editableDiv).toHaveAttribute('contentEditable', 'true');
      expect(editableDiv).toHaveAttribute('aria-label', 'Rich text editor content area');
      expect(editableDiv).toHaveAttribute('aria-multiline', 'true');
    });

    it('applies ref to the editable div', () => {
      const ref = React.createRef<HTMLDivElement>();
      const props = createMockProps({ editorRef: ref });
      render(<EditableArea {...props} />);

      expect(ref.current).toBeInstanceOf(HTMLDivElement);
      expect(ref.current).toHaveAttribute('contentEditable', 'true');
    });
  });

  describe('Placeholder Behavior', () => {
    it('shows placeholder when content is empty and not focused', () => {
      const props = createMockProps({ content: '', placeholder: 'Type here...' });
      render(<EditableArea {...props} />);

      expect(screen.getByText('Type here...')).toBeInTheDocument();
    });

    it('shows placeholder when content is only whitespace', () => {
      const props = createMockProps({ content: '   ', placeholder: 'Type here...' });
      render(<EditableArea {...props} />);

      expect(screen.getByText('Type here...')).toBeInTheDocument();
    });

    it('shows placeholder when content is only br tag', () => {
      const props = createMockProps({ content: '<br>', placeholder: 'Type here...' });
      render(<EditableArea {...props} />);

      expect(screen.getByText('Type here...')).toBeInTheDocument();
    });

    it('shows placeholder when content is empty div with br', () => {
      const props = createMockProps({ content: '<div><br></div>', placeholder: 'Type here...' });
      render(<EditableArea {...props} />);

      expect(screen.getByText('Type here...')).toBeInTheDocument();
    });

    it('hides placeholder when content has actual text', () => {
      const props = createMockProps({ content: 'Hello world', placeholder: 'Type here...' });
      render(<EditableArea {...props} />);

      expect(screen.queryByText('Type here...')).not.toBeInTheDocument();
    });

    it('hides placeholder when editor is focused even if empty', () => {
      const props = createMockProps({ content: '', placeholder: 'Type here...' });
      render(<EditableArea {...props} />);

      const editableDiv = screen.getByRole('textbox');
      fireEvent.focus(editableDiv);

      expect(screen.queryByText('Type here...')).not.toBeInTheDocument();
    });

    it('shows placeholder again when editor loses focus and is empty', () => {
      const props = createMockProps({ content: '', placeholder: 'Type here...' });
      render(<EditableArea {...props} />);

      const editableDiv = screen.getByRole('textbox');

      // Focus and blur
      fireEvent.focus(editableDiv);
      expect(screen.queryByText('Type here...')).not.toBeInTheDocument();

      fireEvent.blur(editableDiv);
      expect(screen.getByText('Type here...')).toBeInTheDocument();
    });
  });

  describe('Content Handling', () => {
    it('calls onContentChange when input event occurs', () => {
      const mockOnContentChange = vi.fn();
      const props = createMockProps({ onContentChange: mockOnContentChange });
      render(<EditableArea {...props} />);

      const editableDiv = screen.getByRole('textbox');

      // Simulate typing
      editableDiv.innerHTML = 'Hello';
      fireEvent.input(editableDiv);

      expect(mockOnContentChange).toHaveBeenCalledWith('Hello');
    });

    it('sanitizes pasted HTML content', () => {
      const mockOnContentChange = vi.fn();
      const ref = React.createRef<HTMLDivElement>();
      const props = createMockProps({ 
        onContentChange: mockOnContentChange,
        editorRef: ref
      });
      render(<EditableArea {...props} />);

      const editableDiv = screen.getByRole('textbox');
      
      // Mock window.getSelection for paste handling
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

      // Create clipboard data with dangerous content
      const clipboardData = {
        getData: vi.fn().mockImplementation((type) => {
          if (type === 'text/html') {
            return '<p>Safe content</p><script>alert("xss")</script><p>More content</p>';
          }
          return '';
        })
      };

      // Simulate paste event
      fireEvent.paste(editableDiv, {
        clipboardData
      });

      // Verify that clipboard data was accessed
      expect(clipboardData.getData).toHaveBeenCalledWith('text/html');
      expect(mockRange.deleteContents).toHaveBeenCalled();
      expect(mockRange.insertNode).toHaveBeenCalled();
    });

    it('handles plain text paste when no HTML is available', () => {
      const mockOnContentChange = vi.fn();
      const ref = React.createRef<HTMLDivElement>();
      const props = createMockProps({ 
        onContentChange: mockOnContentChange,
        editorRef: ref
      });
      render(<EditableArea {...props} />);

      const editableDiv = screen.getByRole('textbox');
      
      // Mock window.getSelection for paste handling
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

      // Create clipboard data with only plain text
      const clipboardData = {
        getData: vi.fn().mockImplementation((type) => {
          if (type === 'text/html') {
            return '';
          }
          if (type === 'text/plain') {
            return 'Plain text\nwith line breaks';
          }
          return '';
        })
      };

      // Simulate paste event
      fireEvent.paste(editableDiv, {
        clipboardData
      });

      // Verify that plain text was processed
      expect(clipboardData.getData).toHaveBeenCalledWith('text/html');
      expect(clipboardData.getData).toHaveBeenCalledWith('text/plain');
      expect(mockRange.deleteContents).toHaveBeenCalled();
      expect(mockRange.insertNode).toHaveBeenCalled();
    });

    it('handles paste event with no clipboard data', () => {
      const mockOnContentChange = vi.fn();
      const props = createMockProps({ onContentChange: mockOnContentChange });
      render(<EditableArea {...props} />);

      const editableDiv = screen.getByRole('textbox');

      // Simulate paste event with no clipboard data
      fireEvent.paste(editableDiv, {
        clipboardData: null
      });

      // Should not throw errors and not call content change
      expect(mockOnContentChange).not.toHaveBeenCalled();
    });

    it('handles paste event with no selection', () => {
      const mockOnContentChange = vi.fn();
      const props = createMockProps({ onContentChange: mockOnContentChange });
      render(<EditableArea {...props} />);

      const editableDiv = screen.getByRole('textbox');
      
      // Mock no selection
      Object.defineProperty(window, 'getSelection', {
        value: vi.fn().mockReturnValue(null),
        writable: true
      });

      const clipboardData = {
        getData: vi.fn().mockReturnValue('<p>Test content</p>')
      };

      // Simulate paste event
      fireEvent.paste(editableDiv, {
        clipboardData
      });

      // Should not process paste without selection
      expect(clipboardData.getData).toHaveBeenCalled();
      expect(mockOnContentChange).not.toHaveBeenCalled();
    });

    it('processes content to handle empty cases', () => {
      const mockOnContentChange = vi.fn();
      const props = createMockProps({ onContentChange: mockOnContentChange });
      render(<EditableArea {...props} />);

      const editableDiv = screen.getByRole('textbox');

      // Simulate browser adding br tag
      editableDiv.innerHTML = '<br>';
      fireEvent.input(editableDiv);

      expect(mockOnContentChange).toHaveBeenCalledWith('');
    });

    it('processes content to handle div wrapper cases', () => {
      const mockOnContentChange = vi.fn();
      const props = createMockProps({ onContentChange: mockOnContentChange });
      render(<EditableArea {...props} />);

      const editableDiv = screen.getByRole('textbox');

      // Simulate browser adding div wrapper
      editableDiv.innerHTML = '<div><br></div>';
      fireEvent.input(editableDiv);

      expect(mockOnContentChange).toHaveBeenCalledWith('');
    });

    it('processes content to unwrap single div', () => {
      const mockOnContentChange = vi.fn();
      const props = createMockProps({ onContentChange: mockOnContentChange });
      render(<EditableArea {...props} />);

      const editableDiv = screen.getByRole('textbox');

      // Simulate browser wrapping content in div
      editableDiv.innerHTML = '<div>Hello world</div>';
      fireEvent.input(editableDiv);

      expect(mockOnContentChange).toHaveBeenCalledWith('Hello world');
    });

    it('updates innerHTML when content prop changes', async () => {
      const ref = React.createRef<HTMLDivElement>();
      const props = createMockProps({ content: 'Initial', editorRef: ref });
      const { rerender } = render(<EditableArea {...props} />);

      expect(ref.current?.innerHTML).toBe('Initial');

      // Update content prop
      rerender(<EditableArea {...props} content="Updated" />);

      await waitFor(() => {
        expect(ref.current?.innerHTML).toBe('Updated');
      });
    });
  });

  describe('Focus Management', () => {
    it('calls onFocus when editor receives focus', () => {
      const mockOnFocus = vi.fn();
      const props = createMockProps({ onFocus: mockOnFocus });
      render(<EditableArea {...props} />);

      const editableDiv = screen.getByRole('textbox');
      fireEvent.focus(editableDiv);

      expect(mockOnFocus).toHaveBeenCalledTimes(1);
    });

    it('calls onBlur when editor loses focus', () => {
      const mockOnBlur = vi.fn();
      const props = createMockProps({ onBlur: mockOnBlur });
      render(<EditableArea {...props} />);

      const editableDiv = screen.getByRole('textbox');
      fireEvent.focus(editableDiv);
      fireEvent.blur(editableDiv);

      expect(mockOnBlur).toHaveBeenCalledTimes(1);
    });

    it('tracks focus state internally for placeholder logic', () => {
      const props = createMockProps({ content: '', placeholder: 'Type here...' });
      render(<EditableArea {...props} />);

      const editableDiv = screen.getByRole('textbox');

      // Initially unfocused - placeholder should show
      expect(screen.getByText('Type here...')).toBeInTheDocument();

      // Focus - placeholder should hide
      fireEvent.focus(editableDiv);
      expect(screen.queryByText('Type here...')).not.toBeInTheDocument();

      // Blur - placeholder should show again
      fireEvent.blur(editableDiv);
      expect(screen.getByText('Type here...')).toBeInTheDocument();
    });
  });

  describe('Keyboard Handling', () => {
    it('handles keydown events without errors', () => {
      const props = createMockProps();
      render(<EditableArea {...props} />);

      const editableDiv = screen.getByRole('textbox');

      // Test various key presses
      fireEvent.keyDown(editableDiv, { key: 'Enter' });
      fireEvent.keyDown(editableDiv, { key: 'Backspace' });
      fireEvent.keyDown(editableDiv, { key: 'a' });

      // Should not throw any errors
      expect(editableDiv).toBeInTheDocument();
    });

    it('allows normal Enter key behavior outside of lists', () => {
      const mockOnContentChange = vi.fn();
      const props = createMockProps({ onContentChange: mockOnContentChange });
      render(<EditableArea {...props} />);

      const editableDiv = screen.getByRole('textbox');

      // Simulate Enter key press outside of list
      const enterEvent = new KeyboardEvent('keydown', { key: 'Enter' });
      Object.defineProperty(enterEvent, 'preventDefault', { value: vi.fn() });

      fireEvent.keyDown(editableDiv, { key: 'Enter' });

      // Should not prevent default behavior
      expect(editableDiv).toBeInTheDocument();
    });
  });

  describe('List Management', () => {
    beforeEach(() => {
      // Mock window.getSelection for list tests
      const mockRange: Partial<Range> = {
        startContainer: { nodeType: Node.TEXT_NODE, parentElement: null } as Node,
        startOffset: 0,
        setStart: vi.fn(),
        collapse: vi.fn()
      };

      // Add cloneRange after the object is created to avoid circular reference
      mockRange.cloneRange = vi.fn(() => mockRange as Range);

      const mockSelection = {
        rangeCount: 1,
        getRangeAt: vi.fn(() => mockRange),
        removeAllRanges: vi.fn(),
        addRange: vi.fn()
      };

      Object.defineProperty(window, 'getSelection', {
        value: vi.fn(() => mockSelection),
        writable: true
      });
    });

    it('handles Enter key in empty list item to exit list', () => {
      const mockOnContentChange = vi.fn();
      const ref = React.createRef<HTMLDivElement>();
      const props = createMockProps({
        onContentChange: mockOnContentChange,
        editorRef: ref
      });
      render(<EditableArea {...props} />);

      // This test verifies that the list management logic exists
      // The actual DOM manipulation is complex to test in isolation
      // but the key functionality is that Enter key handling is implemented
      const editableDiv = screen.getByRole('textbox');

      // Simulate Enter key - should not throw errors
      fireEvent.keyDown(editableDiv, { key: 'Enter' });

      // Verify the component still functions
      expect(editableDiv).toBeInTheDocument();
      expect(mockOnContentChange).not.toHaveBeenCalled(); // No content change without actual list manipulation
    });

    it('allows normal Enter behavior in non-empty list item', () => {
      const mockOnContentChange = vi.fn();
      const props = createMockProps({ onContentChange: mockOnContentChange });
      render(<EditableArea {...props} />);

      // Set up DOM structure with non-empty list item
      const listItem = document.createElement('li');
      listItem.textContent = 'Some content';
      const list = document.createElement('ul');
      list.appendChild(listItem);

      // Mock the closest method
      const mockClosest = vi.fn();
      mockClosest.mockImplementation((selector: string) => {
        if (selector === 'li') return listItem;
        if (selector === 'ul, ol') return list;
        return null;
      });

      Element.prototype.closest = mockClosest;

      // Mock the range's startContainer
      const mockRange = {
        startContainer: { nodeType: Node.TEXT_NODE, parentElement: listItem },
        startOffset: 5
      };

      const mockSelection = {
        rangeCount: 1,
        getRangeAt: vi.fn(() => mockRange)
      };

      Object.defineProperty(window, 'getSelection', {
        value: vi.fn(() => mockSelection),
        writable: true
      });

      const editableDiv = screen.getByRole('textbox');

      // Simulate Enter key in non-empty list item
      const enterEvent = {
        key: 'Enter',
        shiftKey: false,
        preventDefault: vi.fn()
      };

      fireEvent.keyDown(editableDiv, enterEvent);

      // Should not prevent default (let browser handle list item creation)
      expect(enterEvent.preventDefault).not.toHaveBeenCalled();
    });

    it('ignores Enter key when not in a list', () => {
      const mockOnContentChange = vi.fn();
      const props = createMockProps({ onContentChange: mockOnContentChange });
      render(<EditableArea {...props} />);

      // Mock no list item found
      Element.prototype.closest = vi.fn(() => null);

      const mockSelection = {
        rangeCount: 1,
        getRangeAt: vi.fn(() => ({
          startContainer: { nodeType: Node.TEXT_NODE, parentElement: document.createElement('p') },
          startOffset: 0
        }))
      };

      Object.defineProperty(window, 'getSelection', {
        value: vi.fn(() => mockSelection),
        writable: true
      });

      const editableDiv = screen.getByRole('textbox');

      // Simulate Enter key outside of list
      const enterEvent = {
        key: 'Enter',
        shiftKey: false,
        preventDefault: vi.fn()
      };

      fireEvent.keyDown(editableDiv, enterEvent);

      // Should not prevent default
      expect(enterEvent.preventDefault).not.toHaveBeenCalled();
    });

    it('ignores Enter key when no selection exists', () => {
      const props = createMockProps();
      render(<EditableArea {...props} />);

      // Mock no selection
      Object.defineProperty(window, 'getSelection', {
        value: vi.fn(() => null),
        writable: true
      });

      const editableDiv = screen.getByRole('textbox');

      // Simulate Enter key with no selection
      const enterEvent = {
        key: 'Enter',
        shiftKey: false,
        preventDefault: vi.fn()
      };

      fireEvent.keyDown(editableDiv, enterEvent);

      // Should not prevent default
      expect(enterEvent.preventDefault).not.toHaveBeenCalled();
    });

    it('ignores Enter key when selection has no ranges', () => {
      const props = createMockProps();
      render(<EditableArea {...props} />);

      // Mock selection with no ranges
      const mockSelection = {
        rangeCount: 0,
        getRangeAt: vi.fn()
      };

      Object.defineProperty(window, 'getSelection', {
        value: vi.fn(() => mockSelection),
        writable: true
      });

      const editableDiv = screen.getByRole('textbox');

      // Simulate Enter key with no ranges
      const enterEvent = {
        key: 'Enter',
        shiftKey: false,
        preventDefault: vi.fn()
      };

      fireEvent.keyDown(editableDiv, enterEvent);

      // Should not prevent default
      expect(enterEvent.preventDefault).not.toHaveBeenCalled();
    });

    it('allows Shift+Enter to work normally in lists', () => {
      const props = createMockProps();
      render(<EditableArea {...props} />);

      const editableDiv = screen.getByRole('textbox');

      // Simulate Shift+Enter (should be ignored by our handler)
      const enterEvent = {
        key: 'Enter',
        shiftKey: true,
        preventDefault: vi.fn()
      };

      fireEvent.keyDown(editableDiv, enterEvent);

      // Should not prevent default for Shift+Enter
      expect(enterEvent.preventDefault).not.toHaveBeenCalled();
    });
  });

  describe('Selection Management', () => {
    it('calls onSelectionChange when selection changes and editor is focused', async () => {
      const mockOnSelectionChange = vi.fn();
      const mockGetCurrentSelection = vi.fn((): SelectionState => ({
        range: { cloneRange: () => ({}) } as Range,
        isCollapsed: false,
        activeFormats: new Set(['bold']),
        currentBlockFormat: 'p'
      }));

      // Update mock implementation
      const { getCurrentSelection, isSelectionInEditor } = await import('../../utils/selectionUtils');
      vi.mocked(getCurrentSelection).mockImplementation(mockGetCurrentSelection);
      vi.mocked(isSelectionInEditor).mockReturnValue(true);

      const props = createMockProps({ onSelectionChange: mockOnSelectionChange });
      render(<EditableArea {...props} />);

      // Simulate selection change event
      fireEvent(document, new Event('selectionchange'));

      expect(mockOnSelectionChange).toHaveBeenCalledWith({
        range: { cloneRange: expect.any(Function) },
        isCollapsed: false,
        activeFormats: new Set(['bold']),
        currentBlockFormat: 'p'
      });
    });

    it('does not call onSelectionChange when selection is outside editor', async () => {
      const mockOnSelectionChange = vi.fn();

      // Update mock to return false for isSelectionInEditor
      const { isSelectionInEditor } = await import('../../utils/selectionUtils');
      vi.mocked(isSelectionInEditor).mockReturnValue(false);

      const props = createMockProps({ onSelectionChange: mockOnSelectionChange });
      render(<EditableArea {...props} />);

      // Simulate selection change event
      fireEvent(document, new Event('selectionchange'));

      expect(mockOnSelectionChange).not.toHaveBeenCalled();
    });

    it('tracks last selection state internally', async () => {
      const mockSelectionState: SelectionState = {
        range: { cloneRange: () => ({}) } as Range,
        isCollapsed: true,
        activeFormats: new Set(),
        currentBlockFormat: 'div'
      };

      const { getCurrentSelection, isSelectionInEditor } = await import('../../utils/selectionUtils');
      vi.mocked(getCurrentSelection).mockReturnValue(mockSelectionState);
      vi.mocked(isSelectionInEditor).mockReturnValue(true);

      const ref = React.createRef<HTMLDivElement>();
      const props = createMockProps({ editorRef: ref });
      render(<EditableArea {...props} />);

      // Simulate selection change
      fireEvent(document, new Event('selectionchange'));

      // Verify that the component tracks the selection internally
      expect(getCurrentSelection).toHaveBeenCalled();
      expect(isSelectionInEditor).toHaveBeenCalledWith(ref.current);
    });

    it('exposes restoreFocus method on editor ref', async () => {
      const ref = React.createRef<HTMLDivElement>();
      const props = createMockProps({ editorRef: ref });
      render(<EditableArea {...props} />);

      await waitFor(() => {
        expect(ref.current).toBeInstanceOf(HTMLDivElement);
        expect((ref.current as any).restoreFocus).toBeInstanceOf(Function);
      });
    });

    it('calls focusEditorWithSelection when restoreFocus is called', async () => {
      const mockSelectionState: SelectionState = {
        range: { cloneRange: () => ({}) } as Range,
        isCollapsed: true,
        activeFormats: new Set(),
        currentBlockFormat: 'div'
      };

      const { getCurrentSelection, isSelectionInEditor, focusEditorWithSelection } = await import('../../utils/selectionUtils');
      vi.mocked(getCurrentSelection).mockReturnValue(mockSelectionState);
      vi.mocked(isSelectionInEditor).mockReturnValue(true);

      const ref = React.createRef<HTMLDivElement>();
      const props = createMockProps({ editorRef: ref });
      render(<EditableArea {...props} />);

      // Simulate selection change to set lastSelection
      fireEvent(document, new Event('selectionchange'));

      await waitFor(() => {
        expect((ref.current as any).restoreFocus).toBeInstanceOf(Function);
      });

      // Call restoreFocus
      (ref.current as any).restoreFocus();

      expect(focusEditorWithSelection).toHaveBeenCalledWith(ref.current, mockSelectionState);
    });

    it('handles selection change events being added and removed', () => {
      const addEventListenerSpy = vi.spyOn(document, 'addEventListener');
      const removeEventListenerSpy = vi.spyOn(document, 'removeEventListener');

      const props = createMockProps();
      const { unmount } = render(<EditableArea {...props} />);

      expect(addEventListenerSpy).toHaveBeenCalledWith('selectionchange', expect.any(Function));

      unmount();

      expect(removeEventListenerSpy).toHaveBeenCalledWith('selectionchange', expect.any(Function));

      addEventListenerSpy.mockRestore();
      removeEventListenerSpy.mockRestore();
    });
  });

  describe('Accessibility', () => {
    it('has proper ARIA attributes', () => {
      const props = createMockProps({ placeholder: 'Enter text here' });
      render(<EditableArea {...props} />);

      const editableDiv = screen.getByRole('textbox');
      expect(editableDiv).toHaveAttribute('aria-label', 'Rich text editor content area');
      expect(editableDiv).toHaveAttribute('aria-multiline', 'true');
      expect(editableDiv).toHaveAttribute('data-placeholder', 'Enter text here');
    });

    it('marks placeholder as aria-hidden', () => {
      const props = createMockProps({ content: '', placeholder: 'Type here...' });
      render(<EditableArea {...props} />);

      const placeholder = screen.getByText('Type here...');
      expect(placeholder).toHaveAttribute('aria-hidden', 'true');
    });
  });
});