import { vi, describe, it, expect, beforeEach } from 'vitest';
import { 
  getCurrentSelection, 
  restoreSelection, 
  saveSelection,
  getActiveFormats,
  getCurrentBlockFormat,
  isSelectionInEditor,
  focusEditor,
  focusEditorWithSelection
} from '../selectionUtils';
import { SelectionState } from '../../types';

// Mock DOM APIs
const mockSelection = {
  rangeCount: 0,
  isCollapsed: true,
  getRangeAt: vi.fn(),
  removeAllRanges: vi.fn(),
  addRange: vi.fn()
};

const mockRange = {
  cloneRange: vi.fn(),
  commonAncestorContainer: document.createElement('div'),
  selectNodeContents: vi.fn(),
  collapse: vi.fn()
};

// Mock document methods
const mockQueryCommandState = vi.fn();
const mockQueryCommandValue = vi.fn();
const mockCreateRange = vi.fn();

beforeEach(() => {
  // Reset mocks
  vi.clearAllMocks();
  
  // Setup DOM mocks
  Object.defineProperty(window, 'getSelection', {
    value: vi.fn(() => mockSelection),
    writable: true
  });
  
  Object.defineProperty(document, 'queryCommandState', {
    value: mockQueryCommandState,
    writable: true
  });
  
  Object.defineProperty(document, 'queryCommandValue', {
    value: mockQueryCommandValue,
    writable: true
  });
  
  Object.defineProperty(document, 'createRange', {
    value: mockCreateRange,
    writable: true
  });
  
  // Setup default mock returns
  mockSelection.getRangeAt.mockReturnValue(mockRange);
  mockRange.cloneRange.mockReturnValue(mockRange);
  mockCreateRange.mockReturnValue(mockRange);
  mockQueryCommandState.mockReturnValue(false);
  mockQueryCommandValue.mockReturnValue('');
});

describe('selectionUtils', () => {
  describe('getCurrentSelection', () => {
    it('should return empty selection state when no selection exists', () => {
      (window.getSelection as any).mockReturnValue(null);
      
      const result = getCurrentSelection();
      
      expect(result).toEqual({
        range: null,
        isCollapsed: true,
        activeFormats: new Set(),
        currentBlockFormat: 'div'
      });
    });

    it('should return empty selection state when no ranges exist', () => {
      mockSelection.rangeCount = 0;
      
      const result = getCurrentSelection();
      
      expect(result).toEqual({
        range: null,
        isCollapsed: true,
        activeFormats: new Set(),
        currentBlockFormat: 'div'
      });
    });

    it('should return current selection state with range', () => {
      mockSelection.rangeCount = 1;
      mockSelection.isCollapsed = false;
      mockQueryCommandState.mockImplementation((command) => {
        return command === 'bold';
      });
      
      const result = getCurrentSelection();
      
      expect(result.range).toBe(mockRange);
      expect(result.isCollapsed).toBe(false);
      expect(result.activeFormats.has('bold')).toBe(true);
      expect(mockRange.cloneRange).toHaveBeenCalled();
    });
  });

  describe('restoreSelection', () => {
    it('should do nothing when no range is provided', () => {
      const selectionState: SelectionState = {
        range: null,
        isCollapsed: true,
        activeFormats: new Set(),
        currentBlockFormat: 'div'
      };
      
      restoreSelection(selectionState);
      
      expect(mockSelection.removeAllRanges).not.toHaveBeenCalled();
    });

    it('should do nothing when no selection API is available', () => {
      (window.getSelection as any).mockReturnValue(null);
      
      const selectionState: SelectionState = {
        range: mockRange,
        isCollapsed: true,
        activeFormats: new Set(),
        currentBlockFormat: 'div'
      };
      
      restoreSelection(selectionState);
      
      expect(mockSelection.removeAllRanges).not.toHaveBeenCalled();
    });

    it('should restore selection when valid range is provided', () => {
      const selectionState: SelectionState = {
        range: mockRange,
        isCollapsed: true,
        activeFormats: new Set(),
        currentBlockFormat: 'div'
      };
      
      restoreSelection(selectionState);
      
      expect(mockSelection.removeAllRanges).toHaveBeenCalled();
      expect(mockSelection.addRange).toHaveBeenCalledWith(mockRange);
    });

    it('should handle errors gracefully when restoring invalid range', () => {
      const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
      mockSelection.addRange.mockImplementation(() => {
        throw new Error('Invalid range');
      });
      
      const selectionState: SelectionState = {
        range: mockRange,
        isCollapsed: true,
        activeFormats: new Set(),
        currentBlockFormat: 'div'
      };
      
      expect(() => restoreSelection(selectionState)).not.toThrow();
      expect(consoleSpy).toHaveBeenCalledWith('Failed to restore selection:', expect.any(Error));
      
      consoleSpy.mockRestore();
    });
  });

  describe('saveSelection', () => {
    it('should return a function that restores the saved selection', () => {
      mockSelection.rangeCount = 1;
      mockSelection.isCollapsed = false;
      
      const restoreFunction = saveSelection();
      
      expect(typeof restoreFunction).toBe('function');
      
      // Call the restore function
      restoreFunction();
      
      expect(mockSelection.removeAllRanges).toHaveBeenCalled();
      expect(mockSelection.addRange).toHaveBeenCalledWith(mockRange);
    });
  });

  describe('getActiveFormats', () => {
    it('should return empty set when no formats are active', () => {
      mockQueryCommandState.mockReturnValue(false);
      
      const result = getActiveFormats();
      
      expect(result.size).toBe(0);
    });

    it('should return set with active formats', () => {
      mockQueryCommandState.mockImplementation((command) => {
        return ['bold', 'italic'].includes(command);
      });
      
      const result = getActiveFormats();
      
      expect(result.has('bold')).toBe(true);
      expect(result.has('italic')).toBe(true);
      expect(result.has('underline')).toBe(false);
    });

    it('should handle errors gracefully', () => {
      const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
      mockQueryCommandState.mockImplementation(() => {
        throw new Error('Command not supported');
      });
      
      const result = getActiveFormats();
      
      expect(result.size).toBe(0);
      expect(consoleSpy).toHaveBeenCalledWith('Error checking command state:', expect.any(Error));
      
      consoleSpy.mockRestore();
    });
  });

  describe('getCurrentBlockFormat', () => {
    it('should return format from queryCommandValue', () => {
      mockQueryCommandValue.mockReturnValue('H1');
      
      const result = getCurrentBlockFormat();
      
      expect(result).toBe('h1');
    });

    it('should fallback to element inspection when queryCommandValue fails', () => {
      mockQueryCommandValue.mockReturnValue('');
      mockSelection.rangeCount = 1;
      
      // Mock a text node with H2 parent
      const textNode = document.createTextNode('test');
      const h2Element = document.createElement('h2');
      h2Element.appendChild(textNode);
      
      mockRange.commonAncestorContainer = textNode;
      
      const result = getCurrentBlockFormat();
      
      expect(result).toBe('h2');
    });

    it('should return div as default format', () => {
      mockQueryCommandValue.mockReturnValue('');
      mockSelection.rangeCount = 0;
      
      const result = getCurrentBlockFormat();
      
      expect(result).toBe('div');
    });
  });

  describe('isSelectionInEditor', () => {
    it('should return false when no selection exists', () => {
      (window.getSelection as any).mockReturnValue(null);
      const editorElement = document.createElement('div');
      
      const result = isSelectionInEditor(editorElement);
      
      expect(result).toBe(false);
    });

    it('should return false when no ranges exist', () => {
      mockSelection.rangeCount = 0;
      const editorElement = document.createElement('div');
      
      const result = isSelectionInEditor(editorElement);
      
      expect(result).toBe(false);
    });

    it('should return true when selection is within editor', () => {
      mockSelection.rangeCount = 1;
      const editorElement = document.createElement('div');
      const textNode = document.createTextNode('test');
      editorElement.appendChild(textNode);
      mockRange.commonAncestorContainer = textNode;
      
      // Mock contains method
      editorElement.contains = vi.fn().mockReturnValue(true);
      
      const result = isSelectionInEditor(editorElement);
      
      expect(result).toBe(true);
      expect(editorElement.contains).toHaveBeenCalledWith(textNode);
    });

    it('should return false when selection is outside editor', () => {
      mockSelection.rangeCount = 1;
      const editorElement = document.createElement('div');
      const outsideNode = document.createTextNode('outside');
      mockRange.commonAncestorContainer = outsideNode;
      
      // Mock contains method
      editorElement.contains = vi.fn().mockReturnValue(false);
      
      const result = isSelectionInEditor(editorElement);
      
      expect(result).toBe(false);
    });
  });

  describe('focusEditor', () => {
    it('should focus editor and place cursor at end', () => {
      // Reset the mock to not throw error for this test
      mockSelection.addRange.mockImplementation(() => {});
      
      const editorElement = document.createElement('div');
      editorElement.focus = vi.fn();
      
      focusEditor(editorElement);
      
      expect(editorElement.focus).toHaveBeenCalled();
      expect(mockRange.selectNodeContents).toHaveBeenCalledWith(editorElement);
      expect(mockRange.collapse).toHaveBeenCalledWith(false);
      expect(mockSelection.removeAllRanges).toHaveBeenCalled();
      expect(mockSelection.addRange).toHaveBeenCalledWith(mockRange);
    });

    it('should handle missing selection API gracefully', () => {
      (window.getSelection as any).mockReturnValue(null);
      const editorElement = document.createElement('div');
      editorElement.focus = vi.fn();
      
      expect(() => focusEditor(editorElement)).not.toThrow();
      expect(editorElement.focus).toHaveBeenCalled();
    });
  });

  describe('focusEditorWithSelection', () => {
    it('should focus editor and restore selection', () => {
      const editorElement = document.createElement('div');
      editorElement.focus = vi.fn();
      
      const selectionState: SelectionState = {
        range: mockRange,
        isCollapsed: true,
        activeFormats: new Set(),
        currentBlockFormat: 'div'
      };
      
      focusEditorWithSelection(editorElement, selectionState);
      
      expect(editorElement.focus).toHaveBeenCalled();
      expect(mockSelection.removeAllRanges).toHaveBeenCalled();
      expect(mockSelection.addRange).toHaveBeenCalledWith(mockRange);
    });

    it('should focus editor without restoring selection when none provided', () => {
      const editorElement = document.createElement('div');
      editorElement.focus = vi.fn();
      
      focusEditorWithSelection(editorElement);
      
      expect(editorElement.focus).toHaveBeenCalled();
      // Should not attempt to restore selection
      expect(mockSelection.removeAllRanges).not.toHaveBeenCalled();
    });
  });
});