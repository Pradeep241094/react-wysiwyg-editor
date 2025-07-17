import { SelectionState } from '../types';

/**
 * Gets the current selection state from the browser
 */
export const getCurrentSelection = (): SelectionState => {
  const selection = window.getSelection();
  
  if (!selection || selection.rangeCount === 0) {
    return {
      range: null,
      isCollapsed: true,
      activeFormats: new Set(),
      currentBlockFormat: 'div'
    };
  }

  const range = selection.getRangeAt(0);
  const activeFormats = getActiveFormats();
  const currentBlockFormat = getCurrentBlockFormat();

  return {
    range: range.cloneRange(),
    isCollapsed: selection.isCollapsed,
    activeFormats,
    currentBlockFormat
  };
};

/**
 * Restores a previously saved selection
 */
export const restoreSelection = (selectionState: SelectionState): void => {
  if (!selectionState.range) {
    return;
  }

  const selection = window.getSelection();
  if (!selection) {
    return;
  }

  try {
    selection.removeAllRanges();
    selection.addRange(selectionState.range);
  } catch (error) {
    // Range might be invalid, ignore silently
    console.warn('Failed to restore selection:', error);
  }
};

/**
 * Saves the current selection and returns a restore function
 */
export const saveSelection = (): (() => void) => {
  const selectionState = getCurrentSelection();
  
  return () => {
    restoreSelection(selectionState);
  };
};

/**
 * Gets the currently active text formatting
 */
export const getActiveFormats = (): Set<string> => {
  const activeFormats = new Set<string>();
  
  try {
    if (document.queryCommandState('bold')) {
      activeFormats.add('bold');
    }
    if (document.queryCommandState('italic')) {
      activeFormats.add('italic');
    }
    if (document.queryCommandState('underline')) {
      activeFormats.add('underline');
    }
    if (document.queryCommandState('insertUnorderedList')) {
      activeFormats.add('insertUnorderedList');
    }
    if (document.queryCommandState('insertOrderedList')) {
      activeFormats.add('insertOrderedList');
    }
    if (document.queryCommandState('justifyLeft')) {
      activeFormats.add('justifyLeft');
    }
    if (document.queryCommandState('justifyCenter')) {
      activeFormats.add('justifyCenter');
    }
    if (document.queryCommandState('justifyRight')) {
      activeFormats.add('justifyRight');
    }
  } catch (error) {
    // Some browsers might not support all commands
    console.warn('Error checking command state:', error);
  }

  return activeFormats;
};

/**
 * Gets the current block format (heading level, etc.)
 */
export const getCurrentBlockFormat = (): string => {
  try {
    const formatBlock = document.queryCommandValue('formatBlock');
    if (formatBlock) {
      return formatBlock.toLowerCase();
    }
  } catch (error) {
    console.warn('Error getting block format:', error);
  }

  // Fallback: check the current element
  const selection = window.getSelection();
  if (selection && selection.rangeCount > 0) {
    const range = selection.getRangeAt(0);
    let element = range.commonAncestorContainer;
    
    if (element.nodeType === Node.TEXT_NODE) {
      element = element.parentElement || element;
    }
    
    const tagName = (element as Element).tagName?.toLowerCase();
    if (['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'div'].includes(tagName)) {
      return tagName;
    }
  }

  return 'div';
};

/**
 * Checks if the current selection is within the specified editor element
 */
export const isSelectionInEditor = (editorElement: HTMLElement): boolean => {
  const selection = window.getSelection();
  if (!selection || selection.rangeCount === 0) {
    return false;
  }

  const range = selection.getRangeAt(0);
  return editorElement.contains(range.commonAncestorContainer);
};

/**
 * Focuses the editor and places cursor at the end
 */
export const focusEditor = (editorElement: HTMLElement): void => {
  editorElement.focus();
  
  // Place cursor at the end
  const selection = window.getSelection();
  if (selection) {
    const range = document.createRange();
    range.selectNodeContents(editorElement);
    range.collapse(false);
    selection.removeAllRanges();
    selection.addRange(range);
  }
};

/**
 * Focuses the editor and restores the last known selection
 */
export const focusEditorWithSelection = (
  editorElement: HTMLElement, 
  selectionState?: SelectionState
): void => {
  editorElement.focus();
  
  if (selectionState) {
    restoreSelection(selectionState);
  }
};