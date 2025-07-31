import React, { useEffect, useState, useCallback } from 'react';
import { EditableAreaProps, SelectionState } from '../types';
import { 
  getCurrentSelection, 
  isSelectionInEditor,
  focusEditorWithSelection 
} from '../utils/selectionUtils';
import { contentSanitizer } from '../utils/contentSanitizer';

export const EditableArea: React.FC<EditableAreaProps> = ({
  content,
  placeholder,
  onContentChange,
  onFocus,
  onBlur,
  editorRef,
  onSelectionChange,
  onLinkClick,
  height = '300px'
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [lastSelection, setLastSelection] = useState<SelectionState | null>(null);

  // Handle selection changes to track cursor position
  const handleSelectionChange = useCallback(() => {
    if (editorRef.current && isSelectionInEditor(editorRef.current)) {
      const currentSelection = getCurrentSelection();
      setLastSelection(currentSelection);
      
      // Notify parent component of selection change
      if (onSelectionChange) {
        onSelectionChange(currentSelection);
      }
    }
  }, [editorRef, onSelectionChange]);

  // Restore focus and selection after toolbar interactions
  const restoreFocus = useCallback(() => {
    if (editorRef.current && lastSelection) {
      focusEditorWithSelection(editorRef.current, lastSelection);
    }
  }, [editorRef, lastSelection]);

  // Handle input events and content changes
  const handleInput = (event: React.FormEvent<HTMLDivElement>) => {
    const target = event.currentTarget;
    const newContent = target.innerHTML;
    
    // Process the content to handle edge cases
    const processedContent = processContent(newContent);
    onContentChange(processedContent);
  };

  // Process content to handle browser inconsistencies and edge cases
  const processContent = (rawContent: string): string => {
    // Handle empty content cases
    if (!rawContent || rawContent === '<br>' || rawContent === '<div><br></div>') {
      return '';
    }
    
    // Clean up unnecessary wrapper divs that some browsers add
    let processed = rawContent.replace(/^<div><br><\/div>$/, '');
    processed = processed.replace(/^<div>(.*)<\/div>$/, '$1');
    
    return processed;
  };

  // Handle focus events
  const handleFocus = (_event: React.FocusEvent<HTMLDivElement>) => {
    setIsFocused(true);
    onFocus();
  };

  // Handle blur events
  const handleBlur = (_event: React.FocusEvent<HTMLDivElement>) => {
    setIsFocused(false);
    onBlur();
  };

  // Handle paste events with content sanitization
  const handlePaste = (event: React.ClipboardEvent<HTMLDivElement>) => {
    event.preventDefault();

    // Get clipboard data
    const clipboardData = event.clipboardData;
    if (!clipboardData) {
      return;
    }

    // Try to get HTML content first, fall back to plain text
    let pastedContent = clipboardData.getData('text/html');
    
    if (!pastedContent) {
      // If no HTML, get plain text and wrap in paragraph
      const plainText = clipboardData.getData('text/plain');
      if (plainText) {
        pastedContent = `<p>${plainText.replace(/\n/g, '<br>')}</p>`;
      }
    }

    if (!pastedContent) {
      return;
    }

    // Sanitize the pasted content
    const sanitizedContent = contentSanitizer.sanitizePastedContent(pastedContent);

    // Insert the sanitized content at the current cursor position
    insertContentAtCursor(sanitizedContent);
  };

  // Insert content at the current cursor position
  const insertContentAtCursor = (content: string) => {
    const selection = window.getSelection();
    if (!selection || !selection.rangeCount) {
      return;
    }

    const range = selection.getRangeAt(0);
    
    // Delete any selected content first
    range.deleteContents();

    // Create a temporary container to hold the new content
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = content;

    // Insert each child node from the temporary container
    const fragment = document.createDocumentFragment();
    while (tempDiv.firstChild) {
      fragment.appendChild(tempDiv.firstChild);
    }

    range.insertNode(fragment);

    // Move cursor to the end of inserted content
    range.collapse(false);
    selection.removeAllRanges();
    selection.addRange(range);

    // Trigger content change
    if (editorRef.current) {
      const newContent = editorRef.current.innerHTML;
      onContentChange(processContent(newContent));
    }
  };

  // Handle click events to show link preview popup
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement;
    
    // Check if the clicked element is a link or inside a link
    const linkElement = target.closest('a[href]') as HTMLAnchorElement;
    
    if (linkElement && linkElement.href) {
      // Prevent the contentEditable from handling this click
      event.preventDefault();
      event.stopPropagation();
      
      // Trigger the link preview popup via parent component
      if (onLinkClick) {
        onLinkClick(event.nativeEvent, linkElement);
      }
      return;
    }
  };

  // Handle keydown events for special key processing
  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    // Handle Enter key for list management
    if (event.key === 'Enter' && !event.shiftKey) {
      const handled = handleEnterInList(event);
      if (handled) {
        return; // Event was handled, don't let browser process it
      }
      // Let the browser handle Enter key naturally for non-list cases
    }
  };

  // Handle Enter key behavior within lists
  const handleEnterInList = (event: React.KeyboardEvent<HTMLDivElement>): boolean => {
    const selection = window.getSelection();
    if (!selection || !selection.rangeCount) {
      return false;
    }

    const range = selection.getRangeAt(0);
    const currentElement = range.startContainer.nodeType === Node.TEXT_NODE 
      ? range.startContainer.parentElement 
      : range.startContainer as Element;

    // Find the closest list item
    const listItem = currentElement?.closest('li');
    if (!listItem) {
      return false; // Not in a list
    }

    const list = listItem.closest('ul, ol');
    if (!list) {
      return false; // List item not in a list (shouldn't happen)
    }

    // Check if the list item is empty or cursor is at the beginning of an empty item
    const isEmptyListItem = listItem.textContent?.trim() === '' || 
                           (range.startOffset === 0 && listItem.textContent?.trim() === '');

    if (isEmptyListItem) {
      // Double Enter behavior: exit the list
      event.preventDefault();
      exitList(listItem, list);
      return true;
    } else {
      // Single Enter behavior: create new list item
      // Let the browser handle this naturally as it works well
      return false;
    }
  };

  // Exit list by removing empty list item and placing cursor after the list
  const exitList = (listItem: Element, list: Element) => {
    // Remove the empty list item
    listItem.remove();

    // Create a new paragraph after the list
    const newParagraph = document.createElement('p');
    newParagraph.innerHTML = '<br>'; // Ensure paragraph has content for cursor placement
    
    // Insert the paragraph after the list
    if (list.nextSibling) {
      list.parentNode?.insertBefore(newParagraph, list.nextSibling);
    } else {
      list.parentNode?.appendChild(newParagraph);
    }

    // Place cursor in the new paragraph
    const selection = window.getSelection();
    if (selection) {
      const range = document.createRange();
      range.setStart(newParagraph, 0);
      range.collapse(true);
      selection.removeAllRanges();
      selection.addRange(range);
    }

    // Trigger content change
    if (editorRef.current) {
      const newContent = editorRef.current.innerHTML;
      onContentChange(processContent(newContent));
    }
  };

  // Determine if placeholder should be shown
  const shouldShowPlaceholder = (): boolean => {
    if (isFocused) return false;
    
    // Check if content is empty or contains only whitespace/br tags
    const isEmpty = !content || 
                   content === '' || 
                   content === '<br>' || 
                   content === '<div><br></div>' ||
                   content.replace(/<[^>]*>/g, '').trim() === '';
    
    return isEmpty;
  };

  // Update content when prop changes
  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== content) {
      editorRef.current.innerHTML = content || '';
    }
  }, [content, editorRef]);

  // Set up selection change event listener
  useEffect(() => {
    document.addEventListener('selectionchange', handleSelectionChange);
    
    return () => {
      document.removeEventListener('selectionchange', handleSelectionChange);
    };
  }, [handleSelectionChange]);

  // Expose restoreFocus function through ref
  useEffect(() => {
    if (editorRef.current) {
      // Add restoreFocus method to the editor element for external access
      (editorRef.current as any).restoreFocus = restoreFocus;
    }
  }, [editorRef, restoreFocus]);

  return (
    <div className="editable-area-container">
      <div
        ref={editorRef}
        className="editable-area"
        contentEditable={true}
        onInput={handleInput}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        onPaste={handlePaste}
        onClick={handleClick}
        suppressContentEditableWarning={true}
        role="textbox"
        aria-label="Rich text editor content area"
        aria-multiline="true"
        aria-describedby="keyboard-shortcuts-help"
        data-placeholder={placeholder}
        style={{
          height: typeof height === 'number' ? `${height}px` : height,
          minHeight: typeof height === 'number' ? `${height}px` : height
        }}
      />
      {shouldShowPlaceholder() && (
        <div className="placeholder" aria-hidden="true">
          {placeholder}
        </div>
      )}
    </div>
  );
};