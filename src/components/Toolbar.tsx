import React from 'react';
import { ToolbarProps, ToolbarButton } from '../types';

const toolbarButtons: ToolbarButton[] = [
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

export const Toolbar: React.FC<ToolbarProps> = ({
  onCommand,
  activeFormats,
  canUndo,
  canRedo
}) => {
  const handleButtonClick = (button: ToolbarButton) => {
    onCommand(button.command, button.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent, button: ToolbarButton) => {
    // Handle keyboard activation (Enter or Space)
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleButtonClick(button);
    }
  };

  const isButtonActive = (command: string, value?: string): boolean => {
    // Map toolbar commands to format keys used by command system
    const formatMap: Record<string, string> = {
      'bold': 'BOLD',
      'italic': 'ITALIC',
      'underline': 'UNDERLINE',
      'insertUnorderedList': 'INSERT_UNORDERED_LIST',
      'insertOrderedList': 'INSERT_ORDERED_LIST',
      'justifyLeft': 'JUSTIFY_LEFT',
      'justifyCenter': 'JUSTIFY_CENTER',
      'justifyRight': 'JUSTIFY_RIGHT',
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
  };

  const isButtonDisabled = (command: string): boolean => {
    if (command === 'undo') return !canUndo;
    if (command === 'redo') return !canRedo;
    return false;
  };

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
        const isActive = isButtonActive(button.command, button.value);
        const isDisabled = isButtonDisabled(button.command);
        
        return (
          <button
            key={getButtonId(button, index)}
            id={getButtonId(button, index)}
            className={`toolbar-button ${isActive ? 'active' : ''}`}
            title={button.title}
            aria-label={getButtonAriaLabel(button)}
            aria-pressed={isActive}
            disabled={isDisabled}
            tabIndex={isDisabled ? -1 : 0}
            onClick={() => handleButtonClick(button)}
            onKeyDown={(event) => handleKeyDown(event, button)}
            onMouseDown={(event) => {
              // Prevent focus loss from editor when clicking toolbar buttons
              event.preventDefault();
            }}
          >
            <span aria-hidden="true">{button.icon}</span>
          </button>
        );
      })}
    </div>
  );
};