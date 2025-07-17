export interface EditorCommand {
  type: 'execCommand' | 'custom';
  command: string;
  value?: string;
  requiresSelection?: boolean;
  description: string;
}

export const COMMANDS: Record<string, EditorCommand> = {
  BOLD: {
    type: 'execCommand',
    command: 'bold',
    description: 'Toggle bold formatting'
  },
  ITALIC: {
    type: 'execCommand',
    command: 'italic',
    description: 'Toggle italic formatting'
  },
  UNDERLINE: {
    type: 'execCommand',
    command: 'underline',
    description: 'Toggle underline formatting'
  },
  STRIKETHROUGH: {
    type: 'execCommand',
    command: 'strikeThrough',
    description: 'Toggle strikethrough formatting'
  },
  SUBSCRIPT: {
    type: 'execCommand',
    command: 'subscript',
    description: 'Toggle subscript formatting'
  },
  SUPERSCRIPT: {
    type: 'execCommand',
    command: 'superscript',
    description: 'Toggle superscript formatting'
  },
  FORMAT_H1: {
    type: 'execCommand',
    command: 'formatBlock',
    value: 'H1',
    description: 'Format as heading 1'
  },
  FORMAT_H2: {
    type: 'execCommand',
    command: 'formatBlock',
    value: 'H2',
    description: 'Format as heading 2'
  },
  FORMAT_H3: {
    type: 'execCommand',
    command: 'formatBlock',
    value: 'H3',
    description: 'Format as heading 3'
  },
  FORMAT_H4: {
    type: 'execCommand',
    command: 'formatBlock',
    value: 'H4',
    description: 'Format as heading 4'
  },
  FORMAT_H5: {
    type: 'execCommand',
    command: 'formatBlock',
    value: 'H5',
    description: 'Format as heading 5'
  },
  FORMAT_H6: {
    type: 'execCommand',
    command: 'formatBlock',
    value: 'H6',
    description: 'Format as heading 6'
  },
  FORMAT_PARAGRAPH: {
    type: 'execCommand',
    command: 'formatBlock',
    value: 'P',
    description: 'Format as paragraph'
  },
  FORMAT_BLOCKQUOTE: {
    type: 'execCommand',
    command: 'formatBlock',
    value: 'BLOCKQUOTE',
    description: 'Format as blockquote'
  },
  FORMAT_PRE: {
    type: 'execCommand',
    command: 'formatBlock',
    value: 'PRE',
    description: 'Format as preformatted text'
  },
  INSERT_UNORDERED_LIST: {
    type: 'execCommand',
    command: 'insertUnorderedList',
    description: 'Create bullet list'
  },
  INSERT_ORDERED_LIST: {
    type: 'execCommand',
    command: 'insertOrderedList',
    description: 'Create numbered list'
  },
  JUSTIFY_LEFT: {
    type: 'execCommand',
    command: 'justifyLeft',
    description: 'Align text left'
  },
  JUSTIFY_CENTER: {
    type: 'execCommand',
    command: 'justifyCenter',
    description: 'Center align text'
  },
  JUSTIFY_RIGHT: {
    type: 'execCommand',
    command: 'justifyRight',
    description: 'Align text right'
  },
  JUSTIFY_FULL: {
    type: 'execCommand',
    command: 'justifyFull',
    description: 'Justify text'
  },
  INDENT: {
    type: 'execCommand',
    command: 'indent',
    description: 'Increase indent'
  },
  OUTDENT: {
    type: 'execCommand',
    command: 'outdent',
    description: 'Decrease indent'
  },
  FONT_COLOR: {
    type: 'custom',
    command: 'foreColor',
    description: 'Change text color'
  },
  BACKGROUND_COLOR: {
    type: 'custom',
    command: 'backColor',
    description: 'Change background color'
  },
  FONT_NAME: {
    type: 'execCommand',
    command: 'fontName',
    description: 'Change font family'
  },
  FONT_SIZE: {
    type: 'execCommand',
    command: 'fontSize',
    description: 'Change font size'
  },
  INSERT_HORIZONTAL_RULE: {
    type: 'execCommand',
    command: 'insertHorizontalRule',
    description: 'Insert horizontal rule'
  },
  CREATE_LINK: {
    type: 'custom',
    command: 'createLink',
    description: 'Create hyperlink'
  },
  EDIT_LINK: {
    type: 'custom',
    command: 'editLink',
    description: 'Edit existing hyperlink'
  },
  UNLINK: {
    type: 'execCommand',
    command: 'unlink',
    description: 'Remove hyperlink'
  },
  UNDO: {
    type: 'execCommand',
    command: 'undo',
    description: 'Undo last action'
  },
  REDO: {
    type: 'execCommand',
    command: 'redo',
    description: 'Redo last undone action'
  },
  REMOVE_FORMAT: {
    type: 'execCommand',
    command: 'removeFormat',
    description: 'Clear all formatting'
  },
  INSERT_IMAGE: {
    type: 'custom',
    command: 'insertImage',
    description: 'Insert image'
  },
  UPLOAD_FILE: {
    type: 'custom',
    command: 'uploadFile',
    description: 'Upload and insert file'
  },
  INSERT_TABLE: {
    type: 'custom',
    command: 'insertTable',
    description: 'Insert table'
  },
  INSERT_SPECIAL_CHAR: {
    type: 'custom',
    command: 'insertSpecialChar',
    description: 'Insert special character'
  },
  FIND_REPLACE: {
    type: 'custom',
    command: 'findReplace',
    description: 'Find and replace text'
  },
  SOURCE_CODE: {
    type: 'custom',
    command: 'sourceCode',
    description: 'Edit HTML source code'
  },
  FULLSCREEN: {
    type: 'custom',
    command: 'fullscreen',
    description: 'Toggle fullscreen mode'
  },
  PRINT: {
    type: 'custom',
    command: 'print',
    description: 'Print document'
  },
  SPELL_CHECK: {
    type: 'custom',
    command: 'spellCheck',
    description: 'Toggle spell check'
  }
};

export interface CommandExecutionResult {
  success: boolean;
  error?: string;
  command: string;
  value?: string;
}

export class CommandExecutor {
  private static instance: CommandExecutor;

  private constructor() { }

  public static getInstance(): CommandExecutor {
    if (!CommandExecutor.instance) {
      CommandExecutor.instance = new CommandExecutor();
    }
    return CommandExecutor.instance;
  }

  /**
   * Execute a command using document.execCommand with error handling
   */
  public executeCommand(
    commandKey: string,
    value?: string,
    editorElement?: HTMLElement,
    _savedSelection?: Range | null
  ): CommandExecutionResult {
    const command = COMMANDS[commandKey];

    if (!command) {
      return {
        success: false,
        error: `Unknown command: ${commandKey}`,
        command: commandKey
      };
    }

    // Handle custom commands
    if (command.type === 'custom') {
      return this.executeCustomCommand(commandKey, value, editorElement);
    }

    // Check if command requires selection and none exists
    if (command.requiresSelection && this.isSelectionEmpty()) {
      return {
        success: false,
        error: `Command ${commandKey} requires text selection`,
        command: commandKey
      };
    }

    try {
      // Ensure editor has focus before executing command
      if (editorElement && document.activeElement !== editorElement) {
        editorElement.focus();
      }

      const commandValue = value || command.value || '';
      const result = document.execCommand(command.command, false, commandValue);

      if (!result) {
        return {
          success: false,
          error: `Command execution failed: ${command.command}`,
          command: commandKey,
          value: commandValue
        };
      }

      return {
        success: true,
        command: commandKey,
        value: commandValue
      };
    } catch (error) {
      return {
        success: false,
        error: `Command execution error: ${error instanceof Error ? error.message : 'Unknown error'}`,
        command: commandKey,
        value: value || command.value || ''
      };
    }
  }

  /**
   * Execute custom commands that require special handling
   */
  private executeCustomCommand(
    commandKey: string,
    value?: string,
    editorElement?: HTMLElement
  ): CommandExecutionResult {
    try {
      // Ensure editor has focus before executing command
      if (editorElement && document.activeElement !== editorElement) {
        editorElement.focus();
      }

      switch (commandKey) {
        case 'FONT_COLOR':
          return this.setFontColor(value);
        case 'BACKGROUND_COLOR':
          return this.setBackgroundColor(value);
        case 'CREATE_LINK':
          return this.createLink(value);
        case 'EDIT_LINK':
          return this.editLink(value);
        case 'INSERT_IMAGE':
          if (!value) {
            return this.triggerImageUpload();
          }
          return this.insertImage(value as string);
        case 'UPLOAD_FILE':
          return this.uploadFile(value);
        case 'INSERT_TABLE':
          return this.insertTable(value);
        case 'INSERT_SPECIAL_CHAR':
          return this.insertSpecialChar(value);
        case 'FIND_REPLACE':
          return this.findReplace();
        case 'SOURCE_CODE':
          return this.toggleSourceCode();
        case 'FULLSCREEN':
          return this.toggleFullscreen();
        case 'PRINT':
          return this.printDocument();
        case 'SPELL_CHECK':
          return this.toggleSpellCheck();
        default:
          return {
            success: false,
            error: `Unknown custom command: ${commandKey}`,
            command: commandKey
          };
      }
    } catch (error) {
      return {
        success: false,
        error: `Custom command execution error: ${error instanceof Error ? error.message : 'Unknown error'}`,
        command: commandKey,
        value: value || ''
      };
    }
  }

  /**
   * Check if the current selection is empty
   */
  private isSelectionEmpty(): boolean {
    const selection = window.getSelection();
    return !selection || selection.isCollapsed;
  }

  /**
   * Get the current active formatting states
   */
  public getActiveFormats(): Set<string> {
    const activeFormats = new Set<string>();

    try {
      // Check basic formatting states
      if (document.queryCommandState('bold')) {
        activeFormats.add('BOLD');
      }
      if (document.queryCommandState('italic')) {
        activeFormats.add('ITALIC');
      }
      if (document.queryCommandState('underline')) {
        activeFormats.add('UNDERLINE');
      }
      if (document.queryCommandState('strikeThrough')) {
        activeFormats.add('STRIKETHROUGH');
      }
      if (document.queryCommandState('subscript')) {
        activeFormats.add('SUBSCRIPT');
      }
      if (document.queryCommandState('superscript')) {
        activeFormats.add('SUPERSCRIPT');
      }

      // Check heading format states
      const currentBlockFormat = this.getCurrentBlockFormat();
      if (currentBlockFormat === 'H1') {
        activeFormats.add('FORMAT_H1');
      } else if (currentBlockFormat === 'H2') {
        activeFormats.add('FORMAT_H2');
      } else if (currentBlockFormat === 'H3') {
        activeFormats.add('FORMAT_H3');
      } else if (currentBlockFormat === 'H4') {
        activeFormats.add('FORMAT_H4');
      } else if (currentBlockFormat === 'H5') {
        activeFormats.add('FORMAT_H5');
      } else if (currentBlockFormat === 'H6') {
        activeFormats.add('FORMAT_H6');
      } else if (currentBlockFormat === 'BLOCKQUOTE') {
        activeFormats.add('FORMAT_BLOCKQUOTE');
      } else if (currentBlockFormat === 'PRE') {
        activeFormats.add('FORMAT_PRE');
      }

      // Check alignment states
      if (document.queryCommandState('justifyLeft')) {
        activeFormats.add('JUSTIFY_LEFT');
      }
      if (document.queryCommandState('justifyCenter')) {
        activeFormats.add('JUSTIFY_CENTER');
      }
      if (document.queryCommandState('justifyRight')) {
        activeFormats.add('JUSTIFY_RIGHT');
      }
      if (document.queryCommandState('justifyFull')) {
        activeFormats.add('JUSTIFY_FULL');
      }

      // Check list states
      if (document.queryCommandState('insertUnorderedList')) {
        activeFormats.add('INSERT_UNORDERED_LIST');
      }
      if (document.queryCommandState('insertOrderedList')) {
        activeFormats.add('INSERT_ORDERED_LIST');
      }

      // Check link state
      if (this.isInLink()) {
        activeFormats.add('CREATE_LINK');
        activeFormats.add('EDIT_LINK');
      }
    } catch (error) {
      console.warn('Error checking command states:', error);
    }

    return activeFormats;
  }

  /**
   * Check if undo is available
   */
  public canUndo(): boolean {
    try {
      return document.queryCommandEnabled('undo');
    } catch (error) {
      return false;
    }
  }

  /**
   * Check if redo is available
   */
  public canRedo(): boolean {
    try {
      return document.queryCommandEnabled('redo');
    } catch (error) {
      return false;
    }
  }

  /**
   * Get current block format (heading level, etc.)
   */
  public getCurrentBlockFormat(): string {
    try {
      const value = document.queryCommandValue('formatBlock');
      return value.toUpperCase();
    } catch (error) {
      return '';
    }
  }

  /**
   * Create a hyperlink from selected text or insert new link
   */
  private createLink(url?: string): CommandExecutionResult {
    const selection = window.getSelection();

    // If no URL provided, return error (should be handled by modal)
    if (!url) {
      return {
        success: false,
        error: 'URL is required to create a link',
        command: 'CREATE_LINK'
      };
    }

    // Validate and normalize URL
    const normalizedUrl = this.normalizeUrl(url);
    if (!normalizedUrl) {
      return {
        success: false,
        error: 'Invalid URL provided',
        command: 'CREATE_LINK',
        value: url
      };
    }

    try {
      if (!selection || selection.isCollapsed) {
        // No text selected - insert new link with URL as text
        const linkElement = document.createElement('a');
        linkElement.href = normalizedUrl;
        linkElement.textContent = url; // Use original URL as display text
        linkElement.target = '_blank';
        linkElement.rel = 'noopener noreferrer';

        // Insert the link at cursor position
        if (selection && selection.rangeCount > 0) {
          const range = selection.getRangeAt(0);
          range.insertNode(linkElement);
          
          // Move cursor after the link
          range.setStartAfter(linkElement);
          range.setEndAfter(linkElement);
          selection.removeAllRanges();
          selection.addRange(range);
        } else {
          // No cursor position, append to editor
          const editorElement = document.querySelector('.editable-area');
          if (editorElement) {
            editorElement.appendChild(linkElement);
          } else {
            return {
              success: false,
              error: 'No cursor position found and no editor element',
              command: 'CREATE_LINK'
            };
          }
        }

        return {
          success: true,
          command: 'CREATE_LINK',
          value: normalizedUrl
        };
      } else {
        // Text is selected - use document.execCommand to create link
        const result = document.execCommand('createLink', false, normalizedUrl);

        if (!result) {
          return {
            success: false,
            error: 'Failed to create link',
            command: 'CREATE_LINK',
            value: normalizedUrl
          };
        }

        // Find the newly created link and add target and rel attributes
        // We need to do this immediately after the execCommand
        setTimeout(() => {
          const currentSelection = window.getSelection();
          if (currentSelection && currentSelection.rangeCount > 0) {
            const linkElement = this.findLinkInSelection(currentSelection);
            
            if (linkElement) {
              linkElement.setAttribute('target', '_blank');
              linkElement.setAttribute('rel', 'noopener noreferrer');
            } else {
              // Fallback: find all links with the URL we just created
              const editorElement = document.querySelector('.editable-area');
              if (editorElement) {
                const links = editorElement.querySelectorAll(`a[href="${normalizedUrl}"]`);
                links.forEach(link => {
                  if (!link.hasAttribute('target')) {
                    link.setAttribute('target', '_blank');
                    link.setAttribute('rel', 'noopener noreferrer');
                  }
                });
              }
            }
          }
        }, 0);

        return {
          success: true,
          command: 'CREATE_LINK',
          value: normalizedUrl
        };
      }
    } catch (error) {
      return {
        success: false,
        error: `Link creation error: ${error instanceof Error ? error.message : 'Unknown error'}`,
        command: 'CREATE_LINK',
        value: normalizedUrl
      };
    }
  }



  /**
   * Edit an existing hyperlink
   */
  private editLink(url?: string): CommandExecutionResult {
    const selection = window.getSelection();

    if (!selection || !selection.rangeCount) {
      return {
        success: false,
        error: 'No selection available',
        command: 'EDIT_LINK'
      };
    }

    // Find the link element in the current selection
    const linkElement = this.findLinkInSelection(selection);

    if (!linkElement) {
      return {
        success: false,
        error: 'No link found in current selection or cursor position',
        command: 'EDIT_LINK'
      };
    }

    // If no URL provided, return error (should be handled by modal)
    let newUrl = url;
    if (!newUrl) {
      return {
        success: false,
        error: 'URL is required to edit the link',
        command: 'EDIT_LINK'
      };
    }

    // If empty URL provided, remove the link
    if (!newUrl || newUrl.trim() === '') {
      return this.removeLinkElement(linkElement);
    }

    // Validate and normalize URL
    const normalizedUrl = this.normalizeUrl(newUrl);
    if (!normalizedUrl) {
      return {
        success: false,
        error: 'Invalid URL provided',
        command: 'EDIT_LINK',
        value: newUrl
      };
    }

    try {
      // Update the href attribute
      linkElement.setAttribute('href', normalizedUrl);
      
      // Ensure the link has proper target and rel attributes
      if (!linkElement.hasAttribute('target')) {
        linkElement.setAttribute('target', '_blank');
      }
      if (!linkElement.hasAttribute('rel')) {
        linkElement.setAttribute('rel', 'noopener noreferrer');
      }

      return {
        success: true,
        command: 'EDIT_LINK',
        value: normalizedUrl
      };
    } catch (error) {
      return {
        success: false,
        error: `Link editing error: ${error instanceof Error ? error.message : 'Unknown error'}`,
        command: 'EDIT_LINK',
        value: normalizedUrl
      };
    }
  }

  /**
   * Find a link element in the current selection or cursor position
   */
  private findLinkInSelection(selection: Selection): HTMLAnchorElement | null {
    if (!selection.rangeCount) return null;

    const range = selection.getRangeAt(0);
    let element = range.commonAncestorContainer;

    // If the common ancestor is a text node, get its parent element
    if (element.nodeType === Node.TEXT_NODE) {
      element = element.parentElement!;
    }

    // Check if the element itself is a link
    if (element instanceof HTMLAnchorElement) {
      return element;
    }

    // Check if the element is inside a link
    const linkElement = (element as Element).closest('a');
    if (linkElement instanceof HTMLAnchorElement) {
      return linkElement;
    }

    // Check if the selection contains a link
    const selectedContent = range.cloneContents();
    const linkInSelection = selectedContent.querySelector('a');
    if (linkInSelection) {
      // Find the corresponding link in the actual document
      const walker = document.createTreeWalker(
        range.commonAncestorContainer,
        NodeFilter.SHOW_ELEMENT,
        {
          acceptNode: (node) => {
            return node instanceof HTMLAnchorElement ?
              NodeFilter.FILTER_ACCEPT :
              NodeFilter.FILTER_SKIP;
          }
        }
      );

      let currentLink = walker.nextNode();
      while (currentLink) {
        if (range.intersectsNode(currentLink)) {
          return currentLink as HTMLAnchorElement;
        }
        currentLink = walker.nextNode();
      }
    }

    return null;
  }

  /**
   * Remove a link element while preserving its text content
   */
  private removeLinkElement(linkElement: HTMLAnchorElement): CommandExecutionResult {
    try {
      const textContent = linkElement.textContent || '';
      const textNode = document.createTextNode(textContent);

      // Replace the link element with its text content
      linkElement.parentNode?.replaceChild(textNode, linkElement);

      return {
        success: true,
        command: 'EDIT_LINK',
        value: 'Link removed'
      };
    } catch (error) {
      return {
        success: false,
        error: `Error removing link: ${error instanceof Error ? error.message : 'Unknown error'}`,
        command: 'EDIT_LINK'
      };
    }
  }

  /**
   * Check if the current selection or cursor is within a link
   */
  private isInLink(): boolean {
    const selection = window.getSelection();
    if (!selection || !selection.rangeCount) {
      return false;
    }

    return this.findLinkInSelection(selection) !== null;
  }

  /**
   * Insert an image into the editor with enhanced positioning
   */
  public insertImage(imageUrl: string, options?: {
    width?: number;
    height?: number;
    alignment?: 'left' | 'center' | 'right' | 'none';
    float?: 'left' | 'right' | 'none';
    alt?: string;
  }): CommandExecutionResult {
    // Validate image URL
    if (!this.isValidImageUrl(imageUrl)) {
      return {
        success: false,
        error: 'Invalid image URL provided',
        command: 'INSERT_IMAGE',
        value: imageUrl
      };
    }

    try {
      // Create image element with enhanced attributes
      const img = document.createElement('img');
      img.src = imageUrl;
      img.alt = options?.alt || 'Inserted image';
      img.className = 'editor-image';
      img.draggable = true;

      // Set initial styling
      img.style.maxWidth = '100%';
      img.style.height = 'auto';
      img.style.cursor = 'pointer';
      img.style.border = '2px solid transparent';
      img.style.borderRadius = '4px';
      img.style.transition = 'all 0.2s ease';

      // Apply custom dimensions if provided
      if (options?.width) {
        img.style.width = `${options.width}px`;
      }
      if (options?.height) {
        img.style.height = `${options.height}px`;
      }

      // Apply alignment
      if (options?.alignment) {
        this.applyImageAlignment(img, options.alignment);
      }

      // Apply float
      if (options?.float && options.float !== 'none') {
        this.applyImageFloat(img, options.float);
      }

      // Add hover effects
      img.addEventListener('mouseenter', () => {
        img.style.borderColor = '#3b82f6';
        img.style.boxShadow = '0 4px 12px rgba(59, 130, 246, 0.15)';
      });

      img.addEventListener('mouseleave', () => {
        img.style.borderColor = 'transparent';
        img.style.boxShadow = 'none';
      });

      // Insert the image at cursor position or at the end
      const selection = window.getSelection();
      if (selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);

        // If we're inside a text node, we might want to create a new paragraph
        const container = range.commonAncestorContainer;
        if (container.nodeType === Node.TEXT_NODE && container.textContent?.trim()) {
          // Split the text node and insert image in between
          const textNode = container as Text;
          const beforeText = textNode.textContent?.substring(0, range.startOffset) || '';
          const afterText = textNode.textContent?.substring(range.endOffset) || '';

          if (beforeText || afterText) {
            // Create paragraph structure
            const beforeP = document.createElement('p');
            const afterP = document.createElement('p');
            const imgP = document.createElement('p');

            if (beforeText) beforeP.textContent = beforeText;
            imgP.appendChild(img);
            if (afterText) afterP.textContent = afterText;

            // Replace the text node with the new structure
            const parent = textNode.parentNode;
            if (parent) {
              parent.insertBefore(beforeText ? beforeP : imgP, textNode);
              if (beforeText) parent.insertBefore(imgP, textNode);
              if (afterText) parent.insertBefore(afterP, textNode);
              parent.removeChild(textNode);
            }
          } else {
            range.deleteContents();
            range.insertNode(img);
          }
        } else {
          range.deleteContents();
          range.insertNode(img);
        }

        // Move cursor after the image
        range.setStartAfter(img);
        range.setEndAfter(img);
        selection.removeAllRanges();
        selection.addRange(range);
      } else {
        // No selection, append to the end of the editor
        const editorElement = document.querySelector('.editable-area');
        if (editorElement) {
          const p = document.createElement('p');
          p.appendChild(img);
          editorElement.appendChild(p);
        } else {
          return {
            success: false,
            error: 'No cursor position found and no editor element',
            command: 'INSERT_IMAGE'
          };
        }
      }

      return {
        success: true,
        command: 'INSERT_IMAGE',
        value: imageUrl
      };
    } catch (error) {
      return {
        success: false,
        error: `Image insertion error: ${error instanceof Error ? error.message : 'Unknown error'}`,
        command: 'INSERT_IMAGE',
        value: imageUrl
      };
    }
  }

  /**
   * Apply alignment to an image element
   */
  private applyImageAlignment(img: HTMLImageElement, alignment: 'left' | 'center' | 'right' | 'none') {
    switch (alignment) {
      case 'left':
        img.style.display = 'block';
        img.style.marginLeft = '0';
        img.style.marginRight = 'auto';
        break;
      case 'center':
        img.style.display = 'block';
        img.style.marginLeft = 'auto';
        img.style.marginRight = 'auto';
        break;
      case 'right':
        img.style.display = 'block';
        img.style.marginLeft = 'auto';
        img.style.marginRight = '0';
        break;
      case 'none':
        img.style.display = 'inline-block';
        img.style.marginLeft = '';
        img.style.marginRight = '';
        break;
    }
  }

  /**
   * Apply float to an image element
   */
  private applyImageFloat(img: HTMLImageElement, float: 'left' | 'right') {
    img.style.float = float;
    img.style.margin = float === 'left' ? '0 15px 10px 0' : '0 0 10px 15px';
  }

  /**
   * Trigger image file upload
   */
  private triggerImageUpload(): CommandExecutionResult {
    try {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/*';
      input.style.display = 'none';

      input.onchange = (event) => {
        const file = (event.target as HTMLInputElement).files?.[0];
        if (!file) {
          return;
        }

        // Validate file type
        if (!file.type.startsWith('image/')) {
          console.error('Selected file is not an image');
          return;
        }

        // Validate file size (max 5MB)
        const maxSize = 5 * 1024 * 1024; // 5MB
        if (file.size > maxSize) {
          console.error('Image file is too large (max 5MB)');
          return;
        }

        // Convert to data URL
        const reader = new FileReader();
        reader.onload = (e) => {
          const dataUrl = e.target?.result as string;
          this.insertImage(dataUrl);
        };
        reader.onerror = () => {
          console.error('Failed to read image file');
        };
        reader.readAsDataURL(file);
      };

      document.body.appendChild(input);
      input.click();
      document.body.removeChild(input);

      return {
        success: true,
        command: 'INSERT_IMAGE',
        value: 'File upload triggered'
      };
    } catch (error) {
      return {
        success: false,
        error: `File upload error: ${error instanceof Error ? error.message : 'Unknown error'}`,
        command: 'INSERT_IMAGE'
      };
    }
  }

  /**
   * Upload and insert a file
   */
  private uploadFile(fileUrl?: string): CommandExecutionResult {
    if (fileUrl) {
      // Insert file link directly
      return this.insertFileLink(fileUrl);
    }

    try {
      const input = document.createElement('input');
      input.type = 'file';
      input.style.display = 'none';

      input.onchange = (event) => {
        const file = (event.target as HTMLInputElement).files?.[0];
        if (!file) {
          return;
        }

        // Validate file size (max 10MB)
        const maxSize = 10 * 1024 * 1024; // 10MB
        if (file.size > maxSize) {
          console.error('File is too large (max 10MB)');
          return;
        }

        // For demo purposes, create a blob URL
        // In a real application, you would upload to a server
        const blobUrl = URL.createObjectURL(file);
        this.insertFileLink(blobUrl, file.name, file.type);
      };

      document.body.appendChild(input);
      input.click();
      document.body.removeChild(input);

      return {
        success: true,
        command: 'UPLOAD_FILE',
        value: 'File upload triggered'
      };
    } catch (error) {
      return {
        success: false,
        error: `File upload error: ${error instanceof Error ? error.message : 'Unknown error'}`,
        command: 'UPLOAD_FILE'
      };
    }
  }

  /**
   * Insert a file link into the editor
   */
  private insertFileLink(url: string, fileName?: string, fileType?: string): CommandExecutionResult {
    try {
      // Create file link element
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName || 'download';
      link.target = '_blank';
      link.rel = 'noopener noreferrer';

      // Set link text based on file type
      const displayName = fileName || 'Download File';
      const fileIcon = this.getFileIcon(fileType);
      link.innerHTML = `${fileIcon} ${displayName}`;

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
      } else {
        return {
          success: false,
          error: 'No cursor position found',
          command: 'UPLOAD_FILE'
        };
      }

      return {
        success: true,
        command: 'UPLOAD_FILE',
        value: url
      };
    } catch (error) {
      return {
        success: false,
        error: `File insertion error: ${error instanceof Error ? error.message : 'Unknown error'}`,
        command: 'UPLOAD_FILE',
        value: url
      };
    }
  }

  /**
   * Get file icon based on file type
   */
  private getFileIcon(fileType?: string): string {
    if (!fileType) return '📄';

    if (fileType.startsWith('image/')) return '🖼️';
    if (fileType.startsWith('video/')) return '🎥';
    if (fileType.startsWith('audio/')) return '🎵';
    if (fileType.includes('pdf')) return '📕';
    if (fileType.includes('word') || fileType.includes('document')) return '📝';
    if (fileType.includes('excel') || fileType.includes('spreadsheet')) return '📊';
    if (fileType.includes('powerpoint') || fileType.includes('presentation')) return '📊';
    if (fileType.includes('zip') || fileType.includes('archive')) return '🗜️';

    return '📄';
  }

  /**
   * Insert a table into the editor
   */
  private insertTable(tableConfig?: string): CommandExecutionResult {
    try {
      // Parse table configuration (rows,cols,hasHeaders)
      const config = tableConfig ? tableConfig.split(',') : ['3', '3', 'true'];
      const rows = parseInt(config[0]) || 3;
      const cols = parseInt(config[1]) || 3;
      const hasHeaders = config[2] === 'true';

      // Create table element
      const table = document.createElement('table');
      table.className = 'editor-table';
      table.style.borderCollapse = 'collapse';
      table.style.width = '100%';
      table.style.border = '1px solid #ccc';
      table.style.margin = '10px 0';

      const tbody = document.createElement('tbody');

      for (let i = 0; i < rows; i++) {
        const row = document.createElement('tr');

        for (let j = 0; j < cols; j++) {
          const cell = document.createElement(hasHeaders && i === 0 ? 'th' : 'td');
          cell.style.border = '1px solid #ccc';
          cell.style.padding = '8px';
          cell.style.minWidth = '50px';
          cell.style.minHeight = '20px';

          if (hasHeaders && i === 0) {
            cell.style.backgroundColor = '#f5f5f5';
            cell.style.fontWeight = 'bold';
            cell.textContent = `Header ${j + 1}`;
          } else {
            cell.innerHTML = '&nbsp;';
          }

          row.appendChild(cell);
        }

        tbody.appendChild(row);
      }

      table.appendChild(tbody);

      // Insert table at cursor position
      const selection = window.getSelection();
      if (selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        range.deleteContents();
        range.insertNode(table);

        // Move cursor to first cell
        const firstCell = table.querySelector('td, th');
        if (firstCell) {
          range.selectNodeContents(firstCell);
          range.collapse(true);
          selection.removeAllRanges();
          selection.addRange(range);
        }
      } else {
        return {
          success: false,
          error: 'No cursor position found',
          command: 'INSERT_TABLE'
        };
      }

      return {
        success: true,
        command: 'INSERT_TABLE',
        value: `${rows}x${cols} table inserted`
      };
    } catch (error) {
      return {
        success: false,
        error: `Table insertion error: ${error instanceof Error ? error.message : 'Unknown error'}`,
        command: 'INSERT_TABLE'
      };
    }
  }

  /**
   * Insert a special character
   */
  private insertSpecialChar(char?: string): CommandExecutionResult {
    if (!char) {
      return {
        success: false,
        error: 'No character specified',
        command: 'INSERT_SPECIAL_CHAR'
      };
    }

    try {
      const selection = window.getSelection();
      if (selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        range.deleteContents();
        range.insertNode(document.createTextNode(char));

        // Move cursor after the character
        range.setStartAfter(range.endContainer);
        range.collapse(true);
        selection.removeAllRanges();
        selection.addRange(range);
      } else {
        return {
          success: false,
          error: 'No cursor position found',
          command: 'INSERT_SPECIAL_CHAR'
        };
      }

      return {
        success: true,
        command: 'INSERT_SPECIAL_CHAR',
        value: char
      };
    } catch (error) {
      return {
        success: false,
        error: `Special character insertion error: ${error instanceof Error ? error.message : 'Unknown error'}`,
        command: 'INSERT_SPECIAL_CHAR'
      };
    }
  }

  /**
   * Find and replace functionality
   * Note: This function should not be called directly anymore
   * Find/replace is now handled by the modal system in the WYSIWYGEditor component
   */
  private findReplace(): CommandExecutionResult {
    return {
      success: false,
      error: 'Find and replace should be handled by the modal system',
      command: 'FIND_REPLACE'
    };
  }

  /**
   * Toggle source code view
   */
  private toggleSourceCode(): CommandExecutionResult {
    try {
      const editorElement = document.querySelector('.editable-area') as HTMLElement;
      if (!editorElement) {
        return {
          success: false,
          error: 'Editor element not found',
          command: 'SOURCE_CODE'
        };
      }

      // Check if we're currently in source mode
      const isSourceMode = editorElement.getAttribute('data-source-mode') === 'true';

      if (isSourceMode) {
        // Switch back to WYSIWYG mode
        const sourceContent = editorElement.textContent || '';
        editorElement.innerHTML = sourceContent;
        editorElement.contentEditable = 'true';
        editorElement.removeAttribute('data-source-mode');
        editorElement.style.fontFamily = '';
        editorElement.style.whiteSpace = '';
      } else {
        // Switch to source mode
        const htmlContent = editorElement.innerHTML;
        editorElement.textContent = htmlContent;
        editorElement.contentEditable = 'true';
        editorElement.setAttribute('data-source-mode', 'true');
        editorElement.style.fontFamily = 'monospace';
        editorElement.style.whiteSpace = 'pre-wrap';
      }

      return {
        success: true,
        command: 'SOURCE_CODE',
        value: isSourceMode ? 'WYSIWYG mode' : 'Source mode'
      };
    } catch (error) {
      return {
        success: false,
        error: `Source code toggle error: ${error instanceof Error ? error.message : 'Unknown error'}`,
        command: 'SOURCE_CODE'
      };
    }
  }

  /**
   * Toggle fullscreen mode
   */
  private toggleFullscreen(): CommandExecutionResult {
    try {
      const editorContainer = document.querySelector('.wysiwyg-editor') as HTMLElement;
      if (!editorContainer) {
        return {
          success: false,
          error: 'Editor container not found',
          command: 'FULLSCREEN'
        };
      }

      const isFullscreen = editorContainer.classList.contains('fullscreen');

      if (isFullscreen) {
        // Exit fullscreen
        editorContainer.classList.remove('fullscreen');
        document.body.style.overflow = '';
      } else {
        // Enter fullscreen
        editorContainer.classList.add('fullscreen');
        document.body.style.overflow = 'hidden';
      }

      return {
        success: true,
        command: 'FULLSCREEN',
        value: isFullscreen ? 'Exited fullscreen' : 'Entered fullscreen'
      };
    } catch (error) {
      return {
        success: false,
        error: `Fullscreen toggle error: ${error instanceof Error ? error.message : 'Unknown error'}`,
        command: 'FULLSCREEN'
      };
    }
  }

  /**
   * Print document
   */
  private printDocument(): CommandExecutionResult {
    try {
      const editorElement = document.querySelector('.editable-area') as HTMLElement;
      if (!editorElement) {
        return {
          success: false,
          error: 'Editor element not found',
          command: 'PRINT'
        };
      }

      // Create a new window for printing
      const printWindow = window.open('', '_blank');
      if (!printWindow) {
        return {
          success: false,
          error: 'Could not open print window',
          command: 'PRINT'
        };
      }

      const content = editorElement.innerHTML;
      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>Print Document</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            table { border-collapse: collapse; width: 100%; }
            th, td { border: 1px solid #ccc; padding: 8px; }
            th { background-color: #f5f5f5; font-weight: bold; }
            img { max-width: 100%; height: auto; }
          </style>
        </head>
        <body>
          ${content}
        </body>
        </html>
      `);

      printWindow.document.close();
      printWindow.focus();
      printWindow.print();
      printWindow.close();

      return {
        success: true,
        command: 'PRINT',
        value: 'Print dialog opened'
      };
    } catch (error) {
      return {
        success: false,
        error: `Print error: ${error instanceof Error ? error.message : 'Unknown error'}`,
        command: 'PRINT'
      };
    }
  }

  /**
   * Toggle spell check
   */
  private toggleSpellCheck(): CommandExecutionResult {
    try {
      const editorElement = document.querySelector('.editable-area') as HTMLElement;
      if (!editorElement) {
        return {
          success: false,
          error: 'Editor element not found',
          command: 'SPELL_CHECK'
        };
      }

      const currentSpellCheck = editorElement.spellcheck;
      editorElement.spellcheck = !currentSpellCheck;

      return {
        success: true,
        command: 'SPELL_CHECK',
        value: currentSpellCheck ? 'Spell check disabled' : 'Spell check enabled'
      };
    } catch (error) {
      return {
        success: false,
        error: `Spell check toggle error: ${error instanceof Error ? error.message : 'Unknown error'}`,
        command: 'SPELL_CHECK'
      };
    }
  }

  /**
   * Validate if URL is a valid image URL
   */
  private isValidImageUrl(url: string): boolean {
    if (!url || url.trim() === '') return false;

    // Check for data URLs (base64 images)
    if (url.startsWith('data:image/')) return true;

    // Check for blob URLs
    if (url.startsWith('blob:')) return true;

    // Basic URL validation
    try {
      new URL(url);
      // Check if URL ends with common image extensions
      const imageExtensions = /\.(jpg|jpeg|png|gif|bmp|webp|svg)(\?.*)?$/i;
      return imageExtensions.test(url);
    } catch (error) {
      return false;
    }
  }

  /**
   * Set font color for selected text or future text input
   */
  private setFontColor(color?: string): CommandExecutionResult {
    if (!color) {
      return {
        success: false,
        error: 'Color value is required',
        command: 'FONT_COLOR'
      };
    }

    try {
      // Use document.execCommand for font color
      const result = document.execCommand('foreColor', false, color);

      if (!result) {
        return {
          success: false,
          error: 'Failed to set font color',
          command: 'FONT_COLOR',
          value: color
        };
      }

      return {
        success: true,
        command: 'FONT_COLOR',
        value: color
      };
    } catch (error) {
      return {
        success: false,
        error: `Font color error: ${error instanceof Error ? error.message : 'Unknown error'}`,
        command: 'FONT_COLOR',
        value: color
      };
    }
  }

  /**
   * Set background color for selected text or future text input
   */
  private setBackgroundColor(color?: string): CommandExecutionResult {
    if (!color) {
      return {
        success: false,
        error: 'Color value is required',
        command: 'BACKGROUND_COLOR'
      };
    }

    try {
      // Use document.execCommand for background color
      const result = document.execCommand('backColor', false, color);

      if (!result) {
        return {
          success: false,
          error: 'Failed to set background color',
          command: 'BACKGROUND_COLOR',
          value: color
        };
      }

      return {
        success: true,
        command: 'BACKGROUND_COLOR',
        value: color
      };
    } catch (error) {
      return {
        success: false,
        error: `Background color error: ${error instanceof Error ? error.message : 'Unknown error'}`,
        command: 'BACKGROUND_COLOR',
        value: color
      };
    }
  }

  /**
   * Normalize and validate URL
   */
  private normalizeUrl(url: string): string | null {
    if (!url || url.trim() === '') {
      return null;
    }

    const trimmedUrl = url.trim();

    // Basic URL validation
    try {
      // If URL doesn't have a protocol, assume http://
      if (!/^https?:\/\//i.test(trimmedUrl)) {
        // Check if it looks like an email
        if (trimmedUrl.includes('@') && !trimmedUrl.includes(' ')) {
          return `mailto:${trimmedUrl}`;
        }
        // Otherwise assume it's a web URL
        return `http://${trimmedUrl}`;
      }

      // Validate the URL by creating a URL object
      new URL(trimmedUrl);
      return trimmedUrl;
    } catch (error) {
      return null;
    }
  }
}

// Export singleton instance
export const commandExecutor = CommandExecutor.getInstance();