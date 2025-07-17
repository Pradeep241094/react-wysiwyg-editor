import React, { useState, useRef, useCallback, useEffect } from 'react';
import { AdvancedToolbar } from './AdvancedToolbar';
import { EditableArea } from './EditableArea';
import { ImageCropModal } from './ImageCropModal';
import { FileUploadModal } from './FileUploadModal';
import { ImageManager } from './ImageManager';
import { TableInsertModal } from './TableInsertModal';
import { SpecialCharModal } from './SpecialCharModal';
import { UrlInputModal } from './UrlInputModal';
import { FindReplaceModal } from './FindReplaceModal';
import { NotificationModal } from './NotificationModal';
import { LinkPreviewPopup } from './LinkPreviewPopup';
import { WYSIWYGEditorProps, SelectionState } from '../types';
import { commandExecutor } from '../utils/commandSystem';

export const WYSIWYGEditor: React.FC<WYSIWYGEditorProps> = ({
  initialContent = '',
  placeholder = 'Start typing...',
  onChange,
  onFocus,
  onBlur
}) => {
  const [content, setContent] = useState(initialContent);
  const [isEditorFocused, setIsEditorFocused] = useState(false);
  const [activeFormats, setActiveFormats] = useState<Set<string>>(new Set());
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);
  const [isImageCropModalOpen, setIsImageCropModalOpen] = useState(false);
  const [isFileUploadModalOpen, setIsFileUploadModalOpen] = useState(false);
  const [selectedImageUrl, setSelectedImageUrl] = useState<string>('');
  const [uploadType, setUploadType] = useState<'image' | 'file'>('image');
  const [selectedImage, setSelectedImage] = useState<HTMLImageElement | null>(null);
  const [_imageManagers, _setImageManagers] = useState<HTMLImageElement[]>([]);
  const [isTableModalOpen, setIsTableModalOpen] = useState(false);
  const [isSpecialCharModalOpen, setIsSpecialCharModalOpen] = useState(false);
  const [isUrlInputModalOpen, setIsUrlInputModalOpen] = useState(false);
  const [urlInputType, setUrlInputType] = useState<'create' | 'edit'>('create');
  const [currentLinkUrl, setCurrentLinkUrl] = useState('');
  const [isFindReplaceModalOpen, setIsFindReplaceModalOpen] = useState(false);
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);
  const [notificationData, setNotificationData] = useState({
    title: '',
    message: '',
    type: 'info' as 'info' | 'success' | 'warning' | 'error'
  });
  const [savedSelection, setSavedSelection] = useState<Range | null>(null);
  const [isLinkPreviewOpen, setIsLinkPreviewOpen] = useState(false);
  const [linkPreviewData, setLinkPreviewData] = useState({
    url: '',
    text: '',
    position: { x: 0, y: 0 },
    element: null as HTMLAnchorElement | null
  });
  const editorRef = useRef<HTMLDivElement>(null);
  const announcementRef = useRef<HTMLDivElement>(null);

  // Update format states based on current selection
  const updateFormatStates = useCallback(() => {
    if (!isEditorFocused || !editorRef.current) return;

    const formats = commandExecutor.getActiveFormats();
    setActiveFormats(formats);
    setCanUndo(commandExecutor.canUndo());
    setCanRedo(commandExecutor.canRedo());
  }, [isEditorFocused]);

  // Announce formatting changes to screen readers
  const announceToScreenReader = useCallback((message: string) => {
    if (announcementRef.current) {
      announcementRef.current.textContent = message;
      // Clear the announcement after a short delay to allow for repeated announcements
      setTimeout(() => {
        if (announcementRef.current) {
          announcementRef.current.textContent = '';
        }
      }, 1000);
    }
  }, []);

  // Get human-readable format name for announcements
  const getFormatName = useCallback((command: string, value?: string): string => {
    const formatNames: Record<string, string> = {
      'bold': 'bold',
      'italic': 'italic',
      'underline': 'underline',
      'insertUnorderedList': 'bullet list',
      'insertOrderedList': 'numbered list',
      'justifyLeft': 'left aligned',
      'justifyCenter': 'center aligned',
      'justifyRight': 'right aligned',
      'createLink': 'link',
      'unlink': 'link removed',
      'insertImage': 'image inserted',
      'uploadFile': 'file uploaded',
      'undo': 'undone',
      'redo': 'redone',
      'removeFormat': 'formatting cleared'
    };

    if (command === 'formatBlock' && value) {
      return `heading ${value.toLowerCase()}`;
    }

    return formatNames[command] || command;
  }, []);

  // Handle image upload and cropping
  const handleImageUpload = useCallback((file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const imageUrl = e.target?.result as string;
      setSelectedImageUrl(imageUrl);
      setIsFileUploadModalOpen(false);
      setIsImageCropModalOpen(true);
    };
    reader.readAsDataURL(file);
  }, []);

  // Handle cropped image insertion
  const handleCroppedImage = useCallback((croppedImageUrl: string) => {
    const result = commandExecutor.insertImage(croppedImageUrl);

    if (result.success) {
      announceToScreenReader('Image inserted');
      // Update content after successful image insertion
      setTimeout(() => {
        if (editorRef.current) {
          const newContent = editorRef.current.innerHTML;
          setContent(newContent);
          onChange?.(newContent);
          updateFormatStates();
          // Set up image management for the newly inserted image
          setupImageManagement();
        }
      }, 0);
    } else {
      console.warn('Image insertion failed:', result.error);
      announceToScreenReader('Image insertion failed');
    }

    setIsImageCropModalOpen(false);
    setSelectedImageUrl('');
  }, [onChange, updateFormatStates, announceToScreenReader]);

  // Set up image management for all images in the editor
  const setupImageManagement = useCallback(() => {
    if (!editorRef.current) return;

    const images = editorRef.current.querySelectorAll('img.editor-image');
    const imageElements = Array.from(images) as HTMLImageElement[];

    // Add click handlers to images for management
    imageElements.forEach((img) => {
      // Remove existing listeners to avoid duplicates
      img.removeEventListener('click', handleImageClick);
      img.addEventListener('click', handleImageClick);

      // Add drag and drop functionality
      img.addEventListener('dragstart', handleImageDragStart);
      img.addEventListener('dragend', handleImageDragEnd);
    });

    _setImageManagers(imageElements);
  }, []);

  // Handle image click for management
  const handleImageClick = useCallback((event: Event) => {
    event.stopPropagation();
    const img = event.target as HTMLImageElement;
    setSelectedImage(img);
  }, []);

  // Handle image drag start
  const handleImageDragStart = useCallback((event: DragEvent) => {
    const img = event.target as HTMLImageElement;
    if (event.dataTransfer) {
      event.dataTransfer.effectAllowed = 'move';
      event.dataTransfer.setData('text/html', img.outerHTML);
      img.style.opacity = '0.5';
    }
  }, []);

  // Handle image drag end
  const handleImageDragEnd = useCallback((event: DragEvent) => {
    const img = event.target as HTMLImageElement;
    img.style.opacity = '1';
  }, []);

  // Handle image update from ImageManager
  const handleImageUpdate = useCallback(() => {
    if (editorRef.current) {
      const newContent = editorRef.current.innerHTML;
      setContent(newContent);
      onChange?.(newContent);
    }
  }, [onChange]);

  // Handle image removal from ImageManager
  const handleImageRemove = useCallback(() => {
    if (selectedImage && selectedImage.parentNode) {
      selectedImage.parentNode.removeChild(selectedImage);
      setSelectedImage(null);

      // Update content after image removal
      if (editorRef.current) {
        const newContent = editorRef.current.innerHTML;
        setContent(newContent);
        onChange?.(newContent);
      }

      announceToScreenReader('Image removed');
    }
  }, [selectedImage, onChange, announceToScreenReader]);

  // Handle file upload
  const handleFileUpload = useCallback((file: File) => {
    // For demo purposes, create a blob URL
    // In a real application, you would upload to a server
    const blobUrl = URL.createObjectURL(file);

    // Create file link element
    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = file.name;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';

    // Set link text based on file type
    const fileIcon = getFileIcon(file.type);
    link.innerHTML = `${fileIcon} ${file.name}`;

    // Style the file link
    link.style.display = 'inline-block';
    link.style.padding = '8px 12px';
    link.style.margin = '4px';
    link.style.backgroundColor = '#f0f0f0';
    link.style.border = '1px solid #ccc';
    link.style.borderRadius = '4px';
    link.style.textDecoration = 'none';
    link.style.color = '#333';

    // Insert the link at cursor position
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      range.deleteContents();
      range.insertNode(link);

      // Move cursor after the link
      range.setStartAfter(link);
      range.setEndAfter(link);
      selection.removeAllRanges();
      selection.addRange(range);

      announceToScreenReader('File uploaded and inserted');

      // Update content
      setTimeout(() => {
        if (editorRef.current) {
          const newContent = editorRef.current.innerHTML;
          setContent(newContent);
          onChange?.(newContent);
          updateFormatStates();
        }
      }, 0);
    } else {
      announceToScreenReader('File upload failed - no cursor position');
    }

    setIsFileUploadModalOpen(false);
  }, [onChange, updateFormatStates, announceToScreenReader]);

  // Get file icon based on file type
  const getFileIcon = useCallback((fileType: string): string => {
    if (fileType.startsWith('image/')) return '🖼️';
    if (fileType.startsWith('video/')) return '🎥';
    if (fileType.startsWith('audio/')) return '🎵';
    if (fileType.includes('pdf')) return '📕';
    if (fileType.includes('word') || fileType.includes('document')) return '📝';
    if (fileType.includes('excel') || fileType.includes('spreadsheet')) return '📊';
    if (fileType.includes('powerpoint') || fileType.includes('presentation')) return '📊';
    if (fileType.includes('zip') || fileType.includes('archive')) return '🗜️';
    return '📄';
  }, []);

  // Handle table insertion
  const handleTableInsert = useCallback((rows: number, cols: number, hasHeaders: boolean) => {
    if (!editorRef.current) return;

    const tableConfig = `${rows},${cols},${hasHeaders}`;
    const result = commandExecutor.executeCommand('INSERT_TABLE', tableConfig, editorRef.current);

    if (result.success) {
      announceToScreenReader('Table inserted');
      setTimeout(() => {
        if (editorRef.current) {
          const newContent = editorRef.current.innerHTML;
          setContent(newContent);
          onChange?.(newContent);
          updateFormatStates();
        }
      }, 0);
    } else {
      console.warn('Table insertion failed:', result.error);
      announceToScreenReader('Table insertion failed');
    }

    setIsTableModalOpen(false);
  }, [onChange, updateFormatStates, announceToScreenReader]);

  // Handle special character insertion
  const handleSpecialCharInsert = useCallback((char: string) => {
    if (!editorRef.current) return;

    const result = commandExecutor.executeCommand('INSERT_SPECIAL_CHAR', char, editorRef.current);

    if (result.success) {
      announceToScreenReader(`Special character ${char} inserted`);
      setTimeout(() => {
        if (editorRef.current) {
          const newContent = editorRef.current.innerHTML;
          setContent(newContent);
          onChange?.(newContent);
          updateFormatStates();
        }
      }, 0);
    } else {
      console.warn('Special character insertion failed:', result.error);
      announceToScreenReader('Special character insertion failed');
    }

    setIsSpecialCharModalOpen(false);
  }, [onChange, updateFormatStates, announceToScreenReader]);

  // Handle URL input for links
  const handleUrlSubmit = useCallback((url: string) => {
    if (!editorRef.current) return;

    // Restore the saved selection before creating the link
    if (savedSelection && urlInputType === 'create') {
      const selection = window.getSelection();
      if (selection) {
        selection.removeAllRanges();
        selection.addRange(savedSelection);

        // Focus the editor to ensure the selection is active
        editorRef.current.focus();
      }
    }

    const commandKey = urlInputType === 'create' ? 'CREATE_LINK' : 'EDIT_LINK';
    const result = commandExecutor.executeCommand(commandKey, url, editorRef.current);

    if (result.success) {
      const action = urlInputType === 'create' ? 'created' : 'updated';
      announceToScreenReader(`Link ${action}`);
      setTimeout(() => {
        if (editorRef.current) {
          const newContent = editorRef.current.innerHTML;
          setContent(newContent);
          onChange?.(newContent);
          updateFormatStates();
        }
      }, 0);
    } else {
      showNotification('Error', result.error || 'Failed to create link', 'error');
    }

    // Clear the saved selection and reset state
    setSavedSelection(null);
    setCurrentLinkUrl('');
    setIsUrlInputModalOpen(false);
  }, [urlInputType, savedSelection, onChange, updateFormatStates, announceToScreenReader]);

  // Handle find and replace
  const handleFindReplace = useCallback((findText: string, replaceText: string) => {
    if (!editorRef.current) return;

    // Simple find and replace implementation
    const currentContent = editorRef.current.innerHTML;
    const updatedContent = currentContent.replace(new RegExp(findText, 'gi'), replaceText);

    if (currentContent !== updatedContent) {
      editorRef.current.innerHTML = updatedContent;
      setContent(updatedContent);
      onChange?.(updatedContent);

      const matches = (currentContent.match(new RegExp(findText, 'gi')) || []).length;
      showNotification('Find & Replace', `Replaced ${matches} occurrence(s)`, 'success');
      announceToScreenReader(`Replaced ${matches} occurrences`);
    } else {
      showNotification('Find & Replace', 'No matches found', 'info');
    }
  }, [onChange, announceToScreenReader]);

  // Show notification helper
  const showNotification = useCallback((title: string, message: string, type: 'info' | 'success' | 'warning' | 'error' = 'info') => {
    setNotificationData({ title, message, type });
    setIsNotificationModalOpen(true);
  }, []);

  // Handle link preview popup
  const handleLinkClick = useCallback((event: MouseEvent, linkElement: HTMLAnchorElement) => {
    // Prevent default link navigation
    event.preventDefault();
    event.stopPropagation();

    // Calculate popup position
    const rect = linkElement.getBoundingClientRect();
    const position = {
      x: rect.left,
      y: rect.bottom + 5 // Position below the link
    };

    // Set link preview data
    setLinkPreviewData({
      url: linkElement.href,
      text: linkElement.textContent || '',
      position,
      element: linkElement
    });
    setIsLinkPreviewOpen(true);
  }, []);

  // Handle link preview actions
  const handleLinkPreviewEdit = useCallback(() => {
    if (linkPreviewData.element) {
      setCurrentLinkUrl(linkPreviewData.element.href);
      setUrlInputType('edit');
      setIsUrlInputModalOpen(true);
      setIsLinkPreviewOpen(false);
    }
  }, [linkPreviewData.element]);

  const handleLinkPreviewRemove = useCallback(() => {
    if (linkPreviewData.element) {
      // Remove the link but keep the text
      const textContent = linkPreviewData.element.textContent || '';
      const textNode = document.createTextNode(textContent);
      linkPreviewData.element.parentNode?.replaceChild(textNode, linkPreviewData.element);
      
      // Update content
      if (editorRef.current) {
        const newContent = editorRef.current.innerHTML;
        setContent(newContent);
        onChange?.(newContent);
      }
      
      announceToScreenReader('Link removed');
      setIsLinkPreviewOpen(false);
    }
  }, [linkPreviewData.element, onChange, announceToScreenReader]);

  const handleLinkPreviewGoTo = useCallback(() => {
    if (linkPreviewData.url) {
      window.open(linkPreviewData.url, '_blank', 'noopener,noreferrer');
      setIsLinkPreviewOpen(false);
    }
  }, [linkPreviewData.url]);

  const handleLinkPreviewClose = useCallback(() => {
    setIsLinkPreviewOpen(false);
  }, []);

  // Handle command execution
  const executeCommand = useCallback((command: string, value?: string, _fromKeyboard = false) => {
    if (!editorRef.current) return;

    // Save the current selection before executing commands that might open modals
    const selection = window.getSelection();
    let savedRange: Range | null = null;
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      // Check if cloneRange is available (for test environment compatibility)
      if (typeof range.cloneRange === 'function') {
        savedRange = range.cloneRange();
      }
    }

    // Handle special commands that open modals
    if (command === 'insertImage') {
      setUploadType('image');
      setIsFileUploadModalOpen(true);
      return;
    }

    if (command === 'uploadFile') {
      setUploadType('file');
      setIsFileUploadModalOpen(true);
      return;
    }

    if (command === 'insertTable') {
      setIsTableModalOpen(true);
      return;
    }

    if (command === 'insertSpecialChar') {
      setIsSpecialCharModalOpen(true);
      return;
    }

    if (command === 'createLink') {
      // Save the current selection before opening the modal
      setSavedSelection(savedRange);
      setUrlInputType('create');
      setCurrentLinkUrl('');
      setIsUrlInputModalOpen(true);
      return;
    }

    if (command === 'editLink') {
      // Get current link URL if cursor is on a link
      const selection = window.getSelection();
      let linkElement: HTMLAnchorElement | null = null;

      // Method 1: Try to find link from current selection/cursor position
      if (selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);

        // Helper function to find link element from a node
        const findLinkFromNode = (node: Node): HTMLAnchorElement | null => {
          if (node.nodeType === Node.TEXT_NODE) {
            return node.parentElement?.closest('a') as HTMLAnchorElement || null;
          } else if (node.nodeType === Node.ELEMENT_NODE) {
            const element = node as Element;
            if (element.tagName === 'A') {
              return element as HTMLAnchorElement;
            }
            return element.closest('a') as HTMLAnchorElement || null;
          }
          return null;
        };

        // Check start container first
        linkElement = findLinkFromNode(range.startContainer);

        // If not found and we have a selection, check end container too
        if (!linkElement && !selection.isCollapsed) {
          const endLink = findLinkFromNode(range.endContainer);
          // Only use end link if it's the same as what we'd find from start
          if (endLink) {
            linkElement = endLink;
          }
        }

        // If still not found, check the common ancestor
        if (!linkElement) {
          linkElement = findLinkFromNode(range.commonAncestorContainer);
        }

        // Last resort: check if the range intersects with any links
        if (!linkElement && editorRef.current) {
          const allLinks = editorRef.current.querySelectorAll('a[href]');
          for (const link of Array.from(allLinks)) {
            if (range.intersectsNode(link)) {
              linkElement = link as HTMLAnchorElement;
              break;
            }
          }
        }
      }

      // Method 2: If still no link found, check if there's only one link in the editor
      if (!linkElement && editorRef.current) {
        const allLinks = editorRef.current.querySelectorAll('a[href]');
        if (allLinks.length === 1) {
          linkElement = allLinks[0] as HTMLAnchorElement;
        }
      }

      if (linkElement && linkElement.href) {
        // Set the current URL as the initial value for editing
        setCurrentLinkUrl(linkElement.href);
        setUrlInputType('edit');
        setIsUrlInputModalOpen(true);
        return;
      }

      showNotification('Edit Link', 'Please place your cursor on a link to edit it, or select the link text first', 'info');
      return;
    }

    if (command === 'findReplace') {
      setIsFindReplaceModalOpen(true);
      return;
    }

    // Map toolbar commands to command system keys
    const commandMap: Record<string, string> = {
      'bold': 'BOLD',
      'italic': 'ITALIC',
      'underline': 'UNDERLINE',
      'strikethrough': 'STRIKETHROUGH',
      'subscript': 'SUBSCRIPT',
      'superscript': 'SUPERSCRIPT',
      'formatBlock': 'FORMAT_H1', // Will be handled specially
      'fontSize': 'FONT_SIZE',
      'fontName': 'FONT_NAME',
      'fontColor': 'FONT_COLOR',
      'backgroundColor': 'BACKGROUND_COLOR',
      'insertUnorderedList': 'INSERT_UNORDERED_LIST',
      'insertOrderedList': 'INSERT_ORDERED_LIST',
      'indent': 'INDENT',
      'outdent': 'OUTDENT',
      'justifyLeft': 'JUSTIFY_LEFT',
      'justifyCenter': 'JUSTIFY_CENTER',
      'justifyRight': 'JUSTIFY_RIGHT',
      'justifyFull': 'JUSTIFY_FULL',
      'createLink': 'CREATE_LINK',
      'editLink': 'EDIT_LINK',
      'unlink': 'UNLINK',
      'insertHorizontalRule': 'INSERT_HORIZONTAL_RULE',
      'findReplace': 'FIND_REPLACE',
      'sourceCode': 'SOURCE_CODE',
      'fullscreen': 'FULLSCREEN',
      'print': 'PRINT',
      'spellCheck': 'SPELL_CHECK',
      'undo': 'UNDO',
      'redo': 'REDO',
      'removeFormat': 'REMOVE_FORMAT'
    };

    // Handle special cases for formatBlock commands
    let commandKey = commandMap[command];
    if (command === 'formatBlock' && value) {
      commandKey = `FORMAT_${value}`;
    }

    if (commandKey) {
      const result = commandExecutor.executeCommand(commandKey, value, editorRef.current);

      if (result.success) {
        // Announce the formatting change to screen readers
        const formatName = getFormatName(command, value);
        const isActive = activeFormats.has(commandKey);
        const action = isActive ? 'removed' : 'applied';
        announceToScreenReader(`${formatName} ${action}`);

        // Update content after successful command execution
        setTimeout(() => {
          if (editorRef.current) {
            const newContent = editorRef.current.innerHTML;
            setContent(newContent);
            onChange?.(newContent);
            updateFormatStates();
          }
        }, 0);
      } else {
        console.warn('Command execution failed:', result.error);
        announceToScreenReader('Command failed');
      }
    }
  }, [onChange, updateFormatStates, activeFormats, getFormatName, announceToScreenReader]);

  // Handle keyboard shortcuts
  const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
    // Only handle shortcuts when editor is focused
    if (!isEditorFocused) return;

    const { ctrlKey, metaKey, key, shiftKey } = event;
    const isModifierPressed = ctrlKey || metaKey; // Support both Ctrl (Windows/Linux) and Cmd (Mac)

    if (!isModifierPressed) return;

    // Define keyboard shortcuts
    const shortcuts: Record<string, { command: string; value?: string }> = {
      'b': { command: 'bold' },
      'i': { command: 'italic' },
      'u': { command: 'underline' },
      'k': { command: 'createLink' },
      'z': { command: shiftKey ? 'redo' : 'undo' },
      'y': { command: 'redo' },
      '1': { command: 'formatBlock', value: 'H1' },
      '2': { command: 'formatBlock', value: 'H2' },
      '3': { command: 'formatBlock', value: 'H3' },
      'l': { command: shiftKey ? 'insertOrderedList' : 'justifyLeft' },
      'e': { command: 'justifyCenter' },
      'r': { command: 'justifyRight' },
      '\\': { command: 'removeFormat' }
    };

    const shortcut = shortcuts[key.toLowerCase()];
    if (shortcut) {
      event.preventDefault();
      executeCommand(shortcut.command, shortcut.value, true);
    }
  }, [isEditorFocused, executeCommand]);

  // Handle content changes from the editable area
  const handleContentChange = useCallback((newContent: string) => {
    setContent(newContent);
    onChange?.(newContent);
    // Update format states after content change
    setTimeout(updateFormatStates, 0);
  }, [onChange, updateFormatStates]);

  // Handle selection changes from the editable area
  const handleSelectionChange = useCallback((_selectionState: SelectionState) => {
    // Update active formats based on current selection
    updateFormatStates();
  }, [updateFormatStates]);

  const handleFocus = useCallback(() => {
    setIsEditorFocused(true);
    onFocus?.();
    // Update format states when editor gains focus
    setTimeout(updateFormatStates, 0);
  }, [onFocus, updateFormatStates]);

  const handleBlur = useCallback(() => {
    setIsEditorFocused(false);
    onBlur?.();
  }, [onBlur]);

  // Update format states when editor becomes focused
  useEffect(() => {
    if (isEditorFocused) {
      updateFormatStates();
    }
  }, [isEditorFocused, updateFormatStates]);

  // Set up image management when content changes
  useEffect(() => {
    setupImageManagement();
    // Also ensure all links have proper attributes
    ensureLinksHaveProperAttributes();
  }, [content, setupImageManagement]);

  // Ensure all links in the editor have target="_blank" and rel="noopener noreferrer"
  const ensureLinksHaveProperAttributes = useCallback(() => {
    if (!editorRef.current) return;

    const links = editorRef.current.querySelectorAll('a[href]');
    links.forEach((link) => {
      const anchorElement = link as HTMLAnchorElement;
      if (!anchorElement.hasAttribute('target')) {
        anchorElement.setAttribute('target', '_blank');
      }
      if (!anchorElement.hasAttribute('rel')) {
        anchorElement.setAttribute('rel', 'noopener noreferrer');
      }
    });
  }, []);

  // Handle clicks outside of images to deselect
  useEffect(() => {
    const handleDocumentClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('img.editor-image') && !target.closest('.image-manager')) {
        setSelectedImage(null);
      }
    };

    document.addEventListener('click', handleDocumentClick);
    return () => document.removeEventListener('click', handleDocumentClick);
  }, []);

  // Set up drag and drop for the editor area
  useEffect(() => {
    if (!editorRef.current) return;

    const editorElement = editorRef.current;

    const handleDragOver = (event: DragEvent) => {
      event.preventDefault();
      event.dataTransfer!.dropEffect = 'move';
    };

    const handleDrop = (event: DragEvent) => {
      event.preventDefault();
      const htmlData = event.dataTransfer?.getData('text/html');

      if (htmlData && htmlData.includes('<img')) {
        // Handle image repositioning
        const selection = window.getSelection();
        if (selection && selection.rangeCount > 0) {
          const range = selection.getRangeAt(0);

          // Create a temporary div to parse the HTML
          const tempDiv = document.createElement('div');
          tempDiv.innerHTML = htmlData;
          const draggedImg = tempDiv.querySelector('img') as HTMLImageElement;

          if (draggedImg) {
            // Remove the original image if it exists
            const existingImg = editorElement.querySelector(`img[src="${draggedImg.src}"]`);
            if (existingImg && existingImg !== draggedImg) {
              existingImg.remove();
            }

            // Insert at new position
            range.deleteContents();
            range.insertNode(draggedImg);

            // Update content
            const newContent = editorElement.innerHTML;
            setContent(newContent);
            onChange?.(newContent);
          }
        }
      }
    };

    editorElement.addEventListener('dragover', handleDragOver);
    editorElement.addEventListener('drop', handleDrop);

    return () => {
      editorElement.removeEventListener('dragover', handleDragOver);
      editorElement.removeEventListener('drop', handleDrop);
    };
  }, [onChange]);

  return (
    <div
      className="wysiwyg-editor"
      onKeyDown={handleKeyDown}
      role="application"
      aria-label="Rich text editor with keyboard shortcuts"
    >
      <AdvancedToolbar
        onCommand={executeCommand}
        activeFormats={activeFormats}
        canUndo={canUndo}
        canRedo={canRedo}
      />
      <EditableArea
        content={content}
        placeholder={placeholder}
        onContentChange={handleContentChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        editorRef={editorRef}
        onSelectionChange={handleSelectionChange}
        onLinkClick={handleLinkClick}
      />
      {/* Screen reader announcements */}
      <div
        ref={announcementRef}
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
        role="status"
      />
      {/* Keyboard shortcuts help (hidden but available to screen readers) */}
      <div className="sr-only" id="keyboard-shortcuts-help">
        Keyboard shortcuts: Ctrl+B for bold, Ctrl+I for italic, Ctrl+U for underline,
        Ctrl+K for link, Ctrl+Z for undo, Ctrl+Y for redo, Ctrl+1/2/3 for headings,
        Ctrl+L for left align, Ctrl+E for center align, Ctrl+R for right align,
        Ctrl+Shift+L for numbered list, Ctrl+\ for clear formatting
      </div>

      {/* File Upload Modal */}
      <FileUploadModal
        isOpen={isFileUploadModalOpen}
        onClose={() => setIsFileUploadModalOpen(false)}
        onFileSelect={uploadType === 'image' ? handleImageUpload : handleFileUpload}
        accept={uploadType === 'image' ? 'image/*' : '*/*'}
        maxSize={uploadType === 'image' ? 5 * 1024 * 1024 : 10 * 1024 * 1024} // 5MB for images, 10MB for files
        title={uploadType === 'image' ? 'Upload Image' : 'Upload File'}
        description={uploadType === 'image' ? 'Select an image to upload and crop' : 'Select a file to upload'}
      />

      {/* Image Crop Modal */}
      <ImageCropModal
        isOpen={isImageCropModalOpen}
        imageUrl={selectedImageUrl}
        onClose={() => {
          setIsImageCropModalOpen(false);
          setSelectedImageUrl('');
        }}
        onCropComplete={handleCroppedImage}
      />

      {/* Table Insert Modal */}
      <TableInsertModal
        isOpen={isTableModalOpen}
        onClose={() => setIsTableModalOpen(false)}
        onInsert={handleTableInsert}
      />

      {/* Special Character Modal */}
      <SpecialCharModal
        isOpen={isSpecialCharModalOpen}
        onClose={() => setIsSpecialCharModalOpen(false)}
        onInsert={handleSpecialCharInsert}
      />

      {/* URL Input Modal */}
      <UrlInputModal
        isOpen={isUrlInputModalOpen}
        onClose={() => setIsUrlInputModalOpen(false)}
        onSubmit={handleUrlSubmit}
        title={urlInputType === 'create' ? 'Insert Link' : 'Edit Link'}
        placeholder="https://example.com"
        initialValue={currentLinkUrl}
        description={urlInputType === 'create' ? 'Enter the URL for the link' : 'Update the URL for this link'}
      />

      {/* Find Replace Modal */}
      <FindReplaceModal
        isOpen={isFindReplaceModalOpen}
        onClose={() => setIsFindReplaceModalOpen(false)}
        onFindReplace={handleFindReplace}
      />

      {/* Notification Modal */}
      <NotificationModal
        isOpen={isNotificationModalOpen}
        onClose={() => setIsNotificationModalOpen(false)}
        title={notificationData.title}
        message={notificationData.message}
        type={notificationData.type}
      />

      {/* Link Preview Popup */}
      <LinkPreviewPopup
        isOpen={isLinkPreviewOpen}
        linkUrl={linkPreviewData.url}
        linkText={linkPreviewData.text}
        position={linkPreviewData.position}
        onEdit={handleLinkPreviewEdit}
        onRemove={handleLinkPreviewRemove}
        onGoToLink={handleLinkPreviewGoTo}
        onClose={handleLinkPreviewClose}
      />

      {/* Image Manager */}
      {selectedImage && (
        <ImageManager
          imageElement={selectedImage}
          onUpdate={handleImageUpdate}
          onRemove={handleImageRemove}
        />
      )}
    </div>
  );
};