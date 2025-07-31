import React, { useState, useRef, useEffect, useMemo, useCallback, memo } from 'react';
import { ToolbarProps, ToolbarButtonType } from '../types';

interface ToolbarGroup {
  name: string;
  buttons: ToolbarButton[];
}

interface ToolbarButton {
  command: string;
  value?: string;
  icon: string;
  title: string;
  type?: 'button' | 'dropdown' | 'color' | 'separator';
  options?: { value: string; label: string; icon?: string }[];
}

const toolbarGroups: ToolbarGroup[] = [
  {
    name: 'clipboard',
    buttons: [
      { command: 'undo', icon: '↶', title: 'Undo' },
      { command: 'redo', icon: '↷', title: 'Redo' },
      { type: 'separator', command: '', icon: '', title: '' }
    ]
  },
  {
    name: 'editing',
    buttons: [
      { command: 'findReplace', icon: '🔍', title: 'Find & Replace' },
      { type: 'separator', command: '', icon: '', title: '' }
    ]
  },
  {
    name: 'basicstyles',
    buttons: [
      { command: 'bold', icon: 'B', title: 'Bold' },
      { command: 'italic', icon: 'I', title: 'Italic' },
      { command: 'underline', icon: 'U', title: 'Underline' },
      { command: 'strikethrough', icon: 'S̶', title: 'Strikethrough' },
      { command: 'subscript', icon: 'X₂', title: 'Subscript' },
      { command: 'superscript', icon: 'X²', title: 'Superscript' },
      { command: 'removeFormat', icon: '🧹', title: 'Clear Formatting' },
      { type: 'separator', command: '', icon: '', title: '' }
    ]
  },
  {
    name: 'paragraph',
    buttons: [
      // Individual heading buttons for test compatibility
      { command: 'formatBlock', value: 'H1', icon: 'H1', title: 'Heading 1' },
      { command: 'formatBlock', value: 'H2', icon: 'H2', title: 'Heading 2' },
      { command: 'formatBlock', value: 'H3', icon: 'H3', title: 'Heading 3' },
      {
        command: 'formatBlock',
        icon: '¶',
        title: 'Format',
        type: 'dropdown',
        options: [
          { value: 'P', label: 'Normal', icon: '¶' },
          { value: 'H1', label: 'Heading 1', icon: 'H1' },
          { value: 'H2', label: 'Heading 2', icon: 'H2' },
          { value: 'H3', label: 'Heading 3', icon: 'H3' },
          { value: 'H4', label: 'Heading 4', icon: 'H4' },
          { value: 'H5', label: 'Heading 5', icon: 'H5' },
          { value: 'H6', label: 'Heading 6', icon: 'H6' },
          { value: 'BLOCKQUOTE', label: 'Quote', icon: '"' },
          { value: 'PRE', label: 'Code Block', icon: '</>' }
        ]
      },
      {
        command: 'fontSize',
        icon: '🔤',
        title: 'Font Size',
        type: 'dropdown',
        options: [
          { value: '1', label: '8pt' },
          { value: '2', label: '10pt' },
          { value: '3', label: '12pt' },
          { value: '4', label: '14pt' },
          { value: '5', label: '18pt' },
          { value: '6', label: '24pt' },
          { value: '7', label: '36pt' }
        ]
      },
      {
        command: 'fontName',
        icon: 'Aa',
        title: 'Font Family',
        type: 'dropdown',
        options: [
          { value: 'Arial', label: 'Arial' },
          { value: 'Georgia', label: 'Georgia' },
          { value: 'Times New Roman', label: 'Times New Roman' },
          { value: 'Courier New', label: 'Courier New' },
          { value: 'Verdana', label: 'Verdana' },
          { value: 'Helvetica', label: 'Helvetica' }
        ]
      },
      { type: 'separator', command: '', icon: '', title: '' }
    ]
  },
  {
    name: 'colors',
    buttons: [
      { command: 'fontColor', icon: 'A', title: 'Text Color', type: 'color' },
      { command: 'backgroundColor', icon: '🎨', title: 'Background Color', type: 'color' },
      { type: 'separator', command: '', icon: '', title: '' }
    ]
  },
  {
    name: 'list',
    buttons: [
      { command: 'insertUnorderedList', icon: '•', title: 'Bullet List' },
      { command: 'insertOrderedList', icon: '1.', title: 'Numbered List' },
      { command: 'outdent', icon: '⇤', title: 'Decrease Indent' },
      { command: 'indent', icon: '⇥', title: 'Increase Indent' },
      { type: 'separator', command: '', icon: '', title: '' }
    ]
  },
  {
    name: 'align',
    buttons: [
      { command: 'justifyLeft', icon: '⬅', title: 'Align Left' },
      { command: 'justifyCenter', icon: '⬌', title: 'Align Center' },
      { command: 'justifyRight', icon: '➡', title: 'Align Right' },
      { command: 'justifyFull', icon: '⬌', title: 'Justify' },
      { type: 'separator', command: '', icon: '', title: '' }
    ]
  },
  {
    name: 'links',
    buttons: [
      { command: 'createLink', icon: '🔗', title: 'Insert Link' },
      { command: 'unlink', icon: '🔗✕', title: 'Remove Link' },
      { type: 'separator', command: '', icon: '', title: '' }
    ]
  },
  {
    name: 'insert',
    buttons: [
      { command: 'insertImage', icon: '🖼️', title: 'Insert Image' },
      { command: 'insertTable', icon: '⊞', title: 'Insert Table' },
      { command: 'insertHorizontalRule', icon: '―', title: 'Horizontal Rule' },
      { command: 'insertSpecialChar', icon: 'Ω', title: 'Special Characters' },
      { command: 'uploadFile', icon: '📎', title: 'Upload File' },
      { type: 'separator', command: '', icon: '', title: '' }
    ]
  },
  {
    name: 'tools',
    buttons: [
      { command: 'sourceCode', icon: '</>', title: 'Source Code' },
      { command: 'fullscreen', icon: '⛶', title: 'Fullscreen' },
      { command: 'print', icon: '🖨️', title: 'Print' },
      { command: 'spellCheck', icon: '✓', title: 'Spell Check' }
    ]
  }
];

const colorPalette = [
  // Black / Grayscale
  '#ffffff', '#e6e6e6', '#999999', '#4d4d4d', '#1a1a1a', '#000000',

  // Red
  '#ffebee', '#ef9a9a', '#ef5350', '#f44336', '#d32f2f', '#b71c1c',

  // Blue
  '#e3f2fd', '#90caf9', '#42a5f5', '#2196f3', '#1976d2', '#0d47a1',

  // Green
  '#e8f5e9', '#a5d6a7', '#66bb6a', '#4caf50', '#388e3c', '#1b5e20',

  // Orange
  '#fff3e0', '#ffcc80', '#ffa726', '#ff9800', '#f57c00', '#e65100',

  // Grey
  '#fafafa', '#eeeeee', '#bdbdbd', '#9e9e9e', '#616161', '#212121'
];

/**
 * Memoized toolbar button component for performance optimization
 */
const MemoizedToolbarButton = memo<{
  button: ToolbarButton;
  groupName: string;
  index: number;
  isActive: boolean;
  isDisabled: boolean;
  openDropdown: string | null;
  openColorPicker: string | null;
  onButtonClick: (button: ToolbarButton) => void;
  onDropdownSelect: (command: string, value: string) => void;
  onColorSelect: (command: string, color: string) => void;
  setOpenColorPicker: (value: string | null) => void;
  dropdownRefs: React.MutableRefObject<{ [key: string]: HTMLDivElement | null }>;
}>(({
  button,
  groupName,
  index,
  isActive,
  isDisabled,
  openDropdown,
  openColorPicker,
  onButtonClick,
  onDropdownSelect,
  onColorSelect,
  setOpenColorPicker,
  dropdownRefs
}) => {
  if (button.type === 'separator') {
    return <div key={`${groupName}-sep-${index}`} className="toolbar-separator" />;
  }

  const buttonId = `${groupName}-${button.command}-${index}`;

  return (
    <div key={buttonId} className="relative">
      <button
        className={`toolbar-button ${isActive ? 'active' : ''} ${button.type === 'dropdown' || button.type === 'color' ? 'dropdown' : ''
          }`}
        title={button.title}
        aria-label={button.title}
        disabled={isDisabled}
        onClick={() => onButtonClick(button)}
        onMouseDown={(e) => e.preventDefault()}
      >
        <span className="button-icon" aria-hidden="true">
          {button.icon}
        </span>
        {(button.type === 'dropdown' || button.type === 'color') && (
          <span className="dropdown-arrow">▼</span>
        )}
      </button>

      {/* Dropdown Menu */}
      {button.type === 'dropdown' && openDropdown === button.command && (
        <div
          ref={(el) => (dropdownRefs.current[button.command] = el)}
          className="toolbar-dropdown"
        >
          {button.options?.map((option) => (
            <button
              key={option.value}
              className="dropdown-item"
              onClick={() => onDropdownSelect(button.command, option.value)}
            >
              {option.icon && <span className="option-icon">{option.icon}</span>}
              <span className="option-label">{option.label}</span>
            </button>
          ))}
        </div>
      )}

      {/* Color Picker */}
      {button.type === 'color' && openColorPicker === button.command && (
        <div
          ref={(el) => (dropdownRefs.current[button.command] = el)}
          className="toolbar-color-picker"
        >
          <div className="color-picker-header">
            <h4 className="color-picker-title">
              {button.command === 'fontColor' ? 'Text Color' : 'Background Color'}
            </h4>
            <button
              className="color-picker-close"
              onClick={() => setOpenColorPicker(null)}
              aria-label="Close color picker"
            >
              ×
            </button>
          </div>

          <div className="color-grid">
            {colorPalette.map((color) => (
              <button
                key={color}
                className="color-swatch"
                style={{ backgroundColor: color }}
                onClick={() => onColorSelect(button.command, color)}
                title={color}
                aria-label={`Select color ${color}`}
              />
            ))}
          </div>

          <div className="color-input-section">
            <input
              type="color"
              className="color-input"
              onChange={(e) => onColorSelect(button.command, e.target.value)}
              title="Choose custom color"
            />
            <span className="color-input-label">Custom Color</span>
            <button
              className="color-remove-btn"
              onClick={() => onColorSelect(button.command, button.command === 'fontColor' ? 'inherit' : 'transparent')}
              title="Remove color"
            >
              Remove
            </button>
          </div>
        </div>
      )}
    </div>
  );
});

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

  // Advanced formatting
  fontColor: { command: 'fontColor', icon: 'A', title: 'Text Color', type: 'color' },
  backgroundColor: { command: 'backgroundColor', icon: '🎨', title: 'Background Color', type: 'color' },
  fontSize: {
    command: 'fontSize',
    icon: '🔤',
    title: 'Font Size',
    type: 'dropdown',
    options: [
      { value: '1', label: '8pt' },
      { value: '2', label: '10pt' },
      { value: '3', label: '12pt' },
      { value: '4', label: '14pt' },
      { value: '5', label: '18pt' },
      { value: '6', label: '24pt' },
      { value: '7', label: '36pt' }
    ]
  },
  fontFamily: {
    command: 'fontName',
    icon: 'Aa',
    title: 'Font Family',
    type: 'dropdown',
    options: [
      { value: 'Arial', label: 'Arial' },
      { value: 'Georgia', label: 'Georgia' },
      { value: 'Times New Roman', label: 'Times New Roman' },
      { value: 'Courier New', label: 'Courier New' },
      { value: 'Verdana', label: 'Verdana' },
      { value: 'Helvetica', label: 'Helvetica' }
    ]
  },
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

export const AdvancedToolbar: React.FC<ToolbarProps> = ({
  onCommand,
  activeFormats,
  canUndo,
  canRedo,
  toolbarConfig,
  showConfigDropdown = false,
  configOptions,
  selectedConfigKey,
  onConfigChange
}) => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [openColorPicker, setOpenColorPicker] = useState<string | null>(null);
  const dropdownRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  // Convert resolved toolbar config to toolbar groups, or use default groups
  const effectiveToolbarGroups = useMemo(() => {
    if (toolbarConfig) {
      // Use the resolved configuration groups and respect the order
      // The buttons in groups are already filtered by the resolver, so no need to filter again
      return toolbarConfig.groups.map(group => ({
        name: group.name,
        buttons: group.buttons
          .map(buttonType => buttonTypeToConfig[buttonType])
          .filter(Boolean) // Remove any undefined buttons
      })).filter(group => group.buttons.length > 0); // Remove empty groups
    }
    return toolbarGroups;
  }, [toolbarConfig]);

  // Memoized callback functions for performance
  const handleButtonClick = useCallback((button: ToolbarButton) => {
    if (button.type === 'dropdown') {
      setOpenDropdown(openDropdown === button.command ? null : button.command);
      setOpenColorPicker(null);
    } else if (button.type === 'color') {
      setOpenColorPicker(openColorPicker === button.command ? null : button.command);
      setOpenDropdown(null);
    } else {
      onCommand(button.command, button.value);
      setOpenDropdown(null);
      setOpenColorPicker(null);
    }
  }, [onCommand, openDropdown, openColorPicker]);

  const handleDropdownSelect = useCallback((command: string, value: string) => {
    onCommand(command, value);
    setOpenDropdown(null);
  }, [onCommand]);

  const handleColorSelect = useCallback((command: string, color: string) => {
    onCommand(command, color);
    setOpenColorPicker(null);
  }, [onCommand]);

  // Memoized button state calculations
  const isButtonActive = useCallback((command: string, value?: string): boolean => {
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
      'createLink': 'CREATE_LINK'
    };

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

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;

      // Check if click is outside all dropdown-related elements
      if (!target.closest('.toolbar-dropdown') &&
        !target.closest('.toolbar-color-picker') &&
        !target.closest('.toolbar-button')) {
        setOpenDropdown(null);
        setOpenColorPicker(null);
      }
    };

    // Only add the listener if there's an open dropdown
    if (openDropdown || openColorPicker) {
      // Use a small delay to ensure the button click has been processed
      const timeoutId = setTimeout(() => {
        document.addEventListener('click', handleClickOutside);
      }, 0);

      return () => {
        clearTimeout(timeoutId);
        document.removeEventListener('click', handleClickOutside);
      };
    }
  }, [openDropdown, openColorPicker]);

  // Memoized render function for buttons with lazy rendering
  const renderButton = useCallback((button: ToolbarButton, groupName: string, index: number) => {
    // Early return for separators (no need to compute states)
    if (button.type === 'separator') {
      return <div key={`${groupName}-sep-${index}`} className="toolbar-separator" />;
    }

    // Lazy computation of button states only when needed
    const isActive = isButtonActive(button.command, button.value);
    const isDisabled = isButtonDisabled(button.command);

    return (
      <MemoizedToolbarButton
        key={`${groupName}-${button.command}-${index}`}
        button={button}
        groupName={groupName}
        index={index}
        isActive={isActive}
        isDisabled={isDisabled}
        openDropdown={openDropdown}
        openColorPicker={openColorPicker}
        onButtonClick={handleButtonClick}
        onDropdownSelect={handleDropdownSelect}
        onColorSelect={handleColorSelect}
        setOpenColorPicker={setOpenColorPicker}
        dropdownRefs={dropdownRefs}
      />
    );
  }, [
    isButtonActive,
    isButtonDisabled,
    openDropdown,
    openColorPicker,
    handleButtonClick,
    handleDropdownSelect,
    handleColorSelect
  ]);

  return (
    <div className="advanced-toolbar toolbar" role="toolbar" aria-label="Rich text formatting toolbar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div className="toolbar-left" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
        {effectiveToolbarGroups.map((group) => (
          <div key={group.name} className="toolbar-group">
            {group.buttons.map((button, index) => renderButton(button, group.name, index))}
          </div>
        ))}
      </div>


      {/* Configuration Dropdown */}
      {showConfigDropdown && configOptions && (
        <div className="toolbar-right" style={{ marginLeft: 'auto' }}>
          <div className="toolbar-group">
            <div className="relative">
              <button
                className={`toolbar-button dropdown ${openDropdown === 'config' ? 'active' : ''}`}
                title="Toolbar Configuration"
                aria-label="Change toolbar configuration"
                onClick={(e) => {
                  e.stopPropagation(); // Prevent the click from bubbling up
                  setOpenDropdown(openDropdown === 'config' ? null : 'config');
                }}
                onMouseDown={(e) => e.preventDefault()}
              >
                <span className="button-icon" aria-hidden="true">⚙️</span>
                <span className="dropdown-arrow">▼</span>
              </button>

              {/* Configuration Dropdown Menu */}
              {openDropdown === 'config' && (
                <div
                  ref={(el) => (dropdownRefs.current['config'] = el)}
                  className="toolbar-dropdown config-dropdown"
                  style={{
                    position: 'absolute',
                    top: '100%',
                    right: 0,
                    left: 'auto',
                    minWidth: '280px',
                    maxHeight: '300px',
                    overflowY: 'auto',
                    zIndex: 1000,
                    backgroundColor: 'white',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                  }}
                >
                  <div className="config-dropdown-header">
                    <h4 className="config-dropdown-title">Toolbar Configuration</h4>
                    <button
                      className="config-dropdown-close"
                      onClick={() => setOpenDropdown(null)}
                      aria-label="Close configuration menu"
                    >
                      ×
                    </button>
                  </div>

                  {Object.entries(configOptions).map(([key, config]) => (
                    <button
                      key={key}
                      className={`config-dropdown-item ${selectedConfigKey === key ? 'active' : ''}`}
                      onClick={() => {
                        onConfigChange?.(key);
                        setOpenDropdown(null);
                      }}
                    >
                      <div className="config-item-name">{config.name}</div>
                      {config.description && (
                        <div className="config-item-description">{config.description}</div>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};