import { SelectionState } from '../types';
/**
 * Gets the current selection state from the browser
 */
export declare const getCurrentSelection: () => SelectionState;
/**
 * Restores a previously saved selection
 */
export declare const restoreSelection: (selectionState: SelectionState) => void;
/**
 * Saves the current selection and returns a restore function
 */
export declare const saveSelection: () => (() => void);
/**
 * Gets the currently active text formatting
 */
export declare const getActiveFormats: () => Set<string>;
/**
 * Gets the current block format (heading level, etc.)
 */
export declare const getCurrentBlockFormat: () => string;
/**
 * Checks if the current selection is within the specified editor element
 */
export declare const isSelectionInEditor: (editorElement: HTMLElement) => boolean;
/**
 * Focuses the editor and places cursor at the end
 */
export declare const focusEditor: (editorElement: HTMLElement) => void;
/**
 * Focuses the editor and restores the last known selection
 */
export declare const focusEditorWithSelection: (editorElement: HTMLElement, selectionState?: SelectionState) => void;
