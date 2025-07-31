import React, { useMemo, useCallback, memo } from 'react';
import { ToolbarProps, ToolbarButton, ToolbarButtonType } from '../types';

// Default toolbar buttons (used when no configuration is provided)
const defaultToolbarButtons: ToolbarButton[] = [
  // Basic text formatting
  { command: 'bold', icon: 'B', title: 'Bold' },
  { command: 'italic', icon: 'I', title: 'Italic' },
  { command: 'underline', icon: 'U', title: 'Underline' },
  
  // Heading formatting
  { command: 'formatBlock', value: 'H1', icon: 'H1', title: 'Heading 1' },
  { command: 'formatBlock', value: 'H2', icon: 'H2', title: 'Heading 2' },
  { command: 'formatBlock', value: 'H3', icon: 'H3', title: 'Heading 3' },
  
  // List formatting
  { command: 'insertUnorderedList', icon: '•', title: 'Bullet List' },
  { command: 'insertOrderedList', icon: '1.', title: 'Numbered List' },
  
  // Text alignment
  { command: 'justifyLeft', icon: '⬅', title: 'Align Left' },
  { command: 'justifyCenter', icon: '⬌', title: 'Align Center' },
  { command: 'justifyRight', icon: '➡', title: 'Align Right' },
  
  // Link management
  { command: 'createLink', icon: '🔗', title: 'Insert Link' },
  { command: 'editLink', icon: '✏️🔗', title: 'Edit Link' },
  { command: 'unlink', icon: '🔗✕', title: 'Remove Link' },
  
  // Media insertion
  { command: 'insertImage', icon: '🖼️', title: 'Insert Image' },
  { command: 'uploadFile', icon: '📎', title: 'Upload File' },
  
  // History management
  { command: 'undo', icon: '↶', title: 'Undo' },
  { command: 'redo', icon: '↷', title: 'Redo' },
  
  // Format clearing
  { command: 'removeFormat', icon: '✕', title: 'Clear Formatting' }
];

// Mapping from ToolbarButtonType to ToolbarButton configuration
const buttonTypeToConfig: Record<ToolbarButtonType, ToolbarButton> = {
  // Basic formatting
  bold: { command: 'bold', icon: 'B', title: 'Bold' },
  italic: { command: 'italic', icon: 'I', title: 'Italic' },
  underline: { command: 'underline', icon: 'U', title: 'Underline' },
  strikethrough: { command: 'strikethrough', icon: 'S̶', title: 'Strikethrough' },
  subscript: { command: 'subscript', icon: 'X₂', title: 'Subscript' },
  superscript: { command: 'superscript', icon: 'X²', title: 'Superscript' },
  
  // Headings
  h1: { command: 'formatBlock', value: 'H1', icon: 'H1', title: 'Heading 1' },
  h2: { command: 'formatBlock', value: 'H2', icon: 'H2', title: 'Heading 2' },
  h3: { command: 'formatBlock', value: 'H3', icon: 'H3', title: 'Heading 3' },
  h4: { command: 'formatBlock', value: 'H4', icon: 'H4', title: 'Heading 4' },
  h5: { command: 'formatBlock', value: 'H5', icon: 'H5', title: 'Heading 5' },
  h6: { command: 'formatBlock', value: 'H6', icon: 'H6', title: 'Heading 6' },
  
  // Lists
  bulletList: { command: 'insertUnorderedList', icon: '•', title: 'Bullet List' },
  numberedList: { command: 'insertOrderedList', icon: '1.', title: 'Numbered List' },
  indent: { command: 'indent', icon: '⇥', title: 'Increase Indent' },
  outdent: { command: 'outdent', icon: '⇤', title: 'Decrease Indent' },
  
  // Alignment
  alignLeft: { command: 'justifyLeft', icon: '⬅', title: 'Align Left' },
  alignCenter: { command: 'justifyCenter', icon: '⬌', title: 'Align Center' },
  alignRight: { command: 'justifyRight', icon: '➡', title: 'Align Right' },
  alignJustify: { command: 'justifyFull', icon: '⬌', title: 'Justify' },
  
  // Media
  image: { command: 'insertImage', icon: '🖼️', title: 'Insert Image' },
  file: { command: 'uploadFile', icon: '📎', title: 'Upload File' },
  table: { command: 'insertTable', icon: '⊞', title: 'Insert Table' },
  
  // Links
  link: { command: 'createLink', icon: '🔗', title: 'Insert Link' },
  unlink: { command: 'unlink', icon: '🔗✕', title: 'Remove Link' },
  
  // Advanced formatting (simplified for basic toolbar)
  fontColor: { command: 'fontColor', icon: 'A', title: 'Text Color' },
  backgroundColor: { command: 'backgroundColor', icon: '🎨', title: 'Background Color' },
  fontSize: { command: 'fontSize', icon: '🔤', title: 'Font Size' },
  fontFamily: { command: 'fontName', icon: 'Aa', title: 'Font Family' },
  specialChar: { command: 'insertSpecialChar', icon: 'Ω', title: 'Special Characters' },
  horizontalRule: { command: 'insertHorizontalRule', icon: '―', title: 'Horizontal Rule' },
  
  // Tools
  findReplace: { command: 'findReplace', icon: '🔍', title: 'Find & Replace' },
  sourceCode: { command: 'sourceCode', icon: '</>', title: 'Source Code' },
  fullscreen: { command: 'fullscreen', icon: '⛶', title: 'Fullscreen' },
  print: { command: 'print', icon: '🖨️', title: 'Print' },
  undo: { command: 'undo', icon: '↶', title: 'Undo' },
  redo: { command: 'redo', icon: '↷', title: 'Redo' },
  removeFormat: { command: 'removeFormat', icon: '🧹', title: 'Clear Formatting' }
};

/**
 * Memoized toolbar button component for performance optimization
 */
const MemoizedBasicToolbarButton = memo<{
  button: ToolbarButton;
  isActive: boolean;
  isDisabled: boolean;
  ariaLabel: string;
  buttonId: string;
  onButtonClick: (button: ToolbarButton) => void;
  onKeyDown: (event: React.KeyboardEvent, button: ToolbarButton) => void;
}>(({
  button,
  isActive,
  isDisabled,
  ariaLabel,
  buttonId,
  onButtonClick,
  onKeyDown
}) => (
  <button
    key={buttonId}
    id={buttonId}
    className={`toolbar-button ${isActive ? 'active' : ''}`}
    title={button.title}
    aria-label={ariaLabel}
    aria-pressed={isActive}
    disabled={isDisabled}
    tabIndex={isDisabled ? -1 : 0}
    onClick={() => onButtonClick(button)}
    onKeyDown={(event) => onKeyDown(event, button)}
    onMouseDown={(event) => {
      // Prevent focus loss from editor when clicking toolbar buttons
      event.preventDefault();
    }}
  >
    <span aria-hidden="true">{button.icon}</span>
  </button>
));

export const Toolbar: React.FC<ToolbarProps> = ({
  onCommand,
  activeFormats,
  canUndo,
  canRedo,
  toolbarConfig
}) => {
  // Process toolbar configuration to determine which buttons to show
  const toolbarButtons = useMemo(() => {
    if (toolbarConfig) {
      // Use the resolved configuration to create buttons
      const buttons: ToolbarButton[] = [];
      const enabledButtons = toolbarConfig.enabledButtons; // Cache the Set reference
      
      // Flatten all buttons from all groups in the resolved config
      for (const group of toolbarConfig.groups) {
        for (const buttonType of group.buttons) {
          if (enabledButtons.has(buttonType)) {
            const buttonConfig = buttonTypeToConfig[buttonType];
            if (buttonConfig) {
              buttons.push(buttonConfig);
            }
          }
        }
      }
      
      return buttons;
    }
    
    // Use default buttons when no configuration is provided (backward compatibility)
    return defaultToolbarButtons;
  }, [toolbarConfig]);
  const handleButtonClick = useCallback((button: ToolbarButton) => {
    onCommand(button.command, button.value);
  }, [onCommand]);

  const handleKeyDown = useCallback((event: React.KeyboardEvent, button: ToolbarButton) => {
    // Handle keyboard activation (Enter or Space)
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleButtonClick(button);
    }
  }, [handleButtonClick]);

  const isButtonActive = useCallback((command: string, value?: string): boolean => {
    // Map toolbar commands to format keys used by command system
    const formatMap: Record<string, string> = {
      'bold': 'BOLD',
      'italic': 'ITALIC',
      'underline': 'UNDERLINE',
      'strikethrough': 'STRIKETHROUGH',
      'subscript': 'SUBSCRIPT',
      'superscript': 'SUPERSCRIPT',
      'insertUnorderedList': 'INSERT_UNORDERED_LIST',
      'insertOrderedList': 'INSERT_ORDERED_LIST',
      'justifyLeft': 'JUSTIFY_LEFT',
      'justifyCenter': 'JUSTIFY_CENTER',
      'justifyRight': 'JUSTIFY_RIGHT',
      'justifyFull': 'JUSTIFY_FULL',
      'createLink': 'CREATE_LINK',
      'editLink': 'EDIT_LINK',
      'unlink': 'UNLINK'
    };
    
    // Handle formatBlock commands (headings)
    if (command === 'formatBlock' && value) {
      const formatKey = `FORMAT_${value}`;
      return activeFormats.has(formatKey);
    }
    
    const formatKey = formatMap[command];
    return formatKey ? activeFormats.has(formatKey) : false;
  }, [activeFormats]);

  const isButtonDisabled = useCallback((command: string): boolean => {
    if (command === 'undo') return !canUndo;
    if (command === 'redo') return !canRedo;
    return false;
  }, [canUndo, canRedo]);

  const getButtonAriaLabel = (button: ToolbarButton): string => {
    const isActive = isButtonActive(button.command, button.value);
    const isDisabled = isButtonDisabled(button.command);
    
    let label = button.title;
    
    // Add keyboard shortcut information to aria-label
    const shortcuts: Record<string, string> = {
      'bold': 'Ctrl+B',
      'italic': 'Ctrl+I',
      'underline': 'Ctrl+U',
      'createLink': 'Ctrl+K',
      'undo': 'Ctrl+Z',
      'redo': 'Ctrl+Y',
      'removeFormat': 'Ctrl+\\'
    };
    
    // Add heading shortcuts
    if (button.command === 'formatBlock' && button.value) {
      const headingNum = button.value.replace('H', '');
      shortcuts[`${button.command}-${button.value}`] = `Ctrl+${headingNum}`;
    }
    
    // Add alignment shortcuts
    if (button.command === 'justifyLeft') shortcuts[button.command] = 'Ctrl+L';
    if (button.command === 'justifyCenter') shortcuts[button.command] = 'Ctrl+E';
    if (button.command === 'justifyRight') shortcuts[button.command] = 'Ctrl+R';
    if (button.command === 'insertOrderedList') shortcuts[button.command] = 'Ctrl+Shift+L';
    
    const shortcutKey = button.value ? `${button.command}-${button.value}` : button.command;
    const shortcut = shortcuts[shortcutKey];
    
    if (shortcut) {
      label += `, keyboard shortcut ${shortcut}`;
    }
    
    if (isDisabled) {
      label += ', disabled';
    } else if (isActive) {
      label += ', currently active';
    }
    
    return label;
  };

  const getButtonId = (button: ToolbarButton, index: number): string => {
    // Create unique ID for each button
    const baseId = button.value ? `${button.command}-${button.value}` : button.command;
    return `toolbar-${baseId}-${index}`;
  };

  return (
    <div 
      className="toolbar" 
      role="toolbar" 
      aria-label="Text formatting toolbar"
    >
      {toolbarButtons.map((button, index) => {
        const buttonId = getButtonId(button, index);
        const isActive = isButtonActive(button.command, button.value);
        const isDisabled = isButtonDisabled(button.command);
        const ariaLabel = getButtonAriaLabel(button);
        
        return (
          <MemoizedBasicToolbarButton
            key={buttonId}
            button={button}
            isActive={isActive}
            isDisabled={isDisabled}
            ariaLabel={ariaLabel}
            buttonId={buttonId}
            onButtonClick={handleButtonClick}
            onKeyDown={handleKeyDown}
          />
        );
      })}
    </div>
  );
};