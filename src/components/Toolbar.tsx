import React from 'react';
import type { ToolbarProps, EditorCommand } from '../types/editor';

const FONT_FAMILIES = [
  'Inter', 'Arial', 'Georgia', 'Tahoma', 'Courier New', 'Verdana', 
  'Times New Roman', 'Helvetica', 'Calibri', 'Trebuchet MS', 'SF Pro Display'
];
const FONT_SIZES = ['8pt', '9pt', '10pt', '11pt', '12pt', '14pt', '16pt', '18pt', '20pt', '24pt', '28pt', '32pt', '36pt', '48pt'];

const Toolbar: React.FC<ToolbarProps> = ({ onCommand, currentStyles, mode, onModeChange }) => {

  const createCommand = (type: EditorCommand['type'], name: string, value?: string): EditorCommand => ({
    type,
    name,
    value
  });

  // Check if current font size is in the predefined list, if not add it
  const fontSizeOptions = [...FONT_SIZES];
  if (currentStyles.fontSize && !fontSizeOptions.includes(currentStyles.fontSize)) {
    fontSizeOptions.push(currentStyles.fontSize);
    fontSizeOptions.sort((a, b) => parseInt(a) - parseInt(b));
  }

  // Check if current font family is in the predefined list, if not add it
  const fontFamilyOptions = [...FONT_FAMILIES];
  if (currentStyles.fontFamily && !fontFamilyOptions.includes(currentStyles.fontFamily)) {
    fontFamilyOptions.unshift(currentStyles.fontFamily);
  }

  const ToolbarButton: React.FC<{
    onClick: () => void;
    isActive?: boolean;
    title: string;
    children: React.ReactNode;
    className?: string;
    size?: 'sm' | 'md';
  }> = ({ onClick, isActive = false, title, children, className = '', size = 'sm' }) => (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onClick();
      }}
      title={title}
      className={`
        ${size === 'sm' ? 'w-7 h-7 text-xs' : 'w-9 h-8 text-sm'}
        rounded-md transition-all duration-200 flex items-center justify-center font-medium flex-shrink-0
        cursor-pointer select-none relative z-10
        ${isActive 
          ? 'bg-blue-500 text-white shadow-sm' 
          : 'bg-white hover:bg-gray-100 text-gray-700 border border-gray-200 hover:border-gray-300'
        }
        ${className}
      `}
      style={{ pointerEvents: 'auto' }}
    >
      {children}
    </button>
  );

  const ToolbarSeparator = () => (
    <div className="w-px h-5 bg-gray-200 mx-1 flex-shrink-0" />
  );

  return (
    <div className="bg-white border-b border-gray-200 shadow-sm relative z-10 flex-shrink-0" style={{ pointerEvents: 'auto' }}>
      <div className="flex flex-wrap items-center gap-1.5 px-3 py-2 max-w-full">
        {/* Mode Toggle - Compact */}
        <div className="flex items-center bg-gray-100 rounded-md p-0.5 flex-shrink-0">
          <button
            type="button"
            className={`px-2 py-1 rounded text-xs font-medium transition-all cursor-pointer select-none relative z-10 ${
              mode === 'markdown' 
                ? 'bg-emerald-500 text-white shadow-sm' 
                : 'text-gray-600 hover:bg-white'
            }`}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onModeChange('markdown');
            }}
            style={{ pointerEvents: 'auto' }}
          >
            📝
          </button>
          <button
            type="button"
            className={`px-2 py-1 rounded text-xs font-medium transition-all cursor-pointer select-none relative z-10 ${
              mode === 'wysiwyg' 
                ? 'bg-purple-500 text-white shadow-sm' 
                : 'text-gray-600 hover:bg-white'
            }`}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onModeChange('wysiwyg');
            }}
            style={{ pointerEvents: 'auto' }}
          >
            ✨
          </button>
        </div>

        {mode === 'wysiwyg' && (
          <>
            <ToolbarSeparator />

            {/* Block Format - Compact */}
            <select
              value={currentStyles.block}
              onChange={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onCommand(createCommand('block', 'formatBlock', e.target.value));
              }}
              className="px-1.5 py-1 border border-gray-200 rounded-md bg-white text-xs min-w-[80px] max-w-[100px] focus:ring-1 focus:ring-blue-500 focus:border-blue-500 flex-shrink-0 cursor-pointer relative z-10"
              title="Block Format"
              style={{ pointerEvents: 'auto' }}
            >
              <option value="p">Para</option>
              <option value="h1">H1</option>
              <option value="h2">H2</option>
              <option value="h3">H3</option>
              <option value="h4">H4</option>
              <option value="h5">H5</option>
              <option value="h6">H6</option>
              <option value="blockquote">Quote</option>
              <option value="pre">Code</option>
            </select>

            <ToolbarSeparator />

            {/* Font Controls - More Compact */}
            <select
              value={currentStyles.fontFamily}
              onChange={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onCommand(createCommand('inline', 'fontName', e.target.value));
              }}
              className="px-1.5 py-1 border border-gray-200 rounded-md bg-white text-xs min-w-[70px] max-w-[90px] focus:ring-1 focus:ring-blue-500 focus:border-blue-500 flex-shrink-0 cursor-pointer relative z-10"
              title="Font Family"
              style={{ pointerEvents: 'auto' }}
            >
              {fontFamilyOptions.map(f => (
                <option key={f} value={f}>
                  {f.length > 8 ? f.substring(0, 8) + '...' : f}
                </option>
              ))}
            </select>

            <select
              value={currentStyles.fontSize}
              onChange={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onCommand(createCommand('inline', 'fontSize', e.target.value));
              }}
              className="px-1.5 py-1 border border-gray-200 rounded-md bg-white text-xs min-w-[45px] max-w-[55px] focus:ring-1 focus:ring-blue-500 focus:border-blue-500 flex-shrink-0 cursor-pointer relative z-10"
              title="Font Size"
              style={{ pointerEvents: 'auto' }}
            >
              {fontSizeOptions.map(size => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>

            <ToolbarSeparator />

            {/* Text Color - Compact */}
            <input
              type="color"
              value={currentStyles.color}
              onChange={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onCommand(createCommand('inline', 'foreColor', e.target.value));
              }}
              className="w-7 h-7 border border-gray-200 rounded-md cursor-pointer flex-shrink-0 relative z-10"
              title="Text Color"
              style={{ pointerEvents: 'auto' }}
            />

            <ToolbarSeparator />

            {/* Text Formatting - Compact */}
            <div className="flex gap-0.5 flex-shrink-0">
              <ToolbarButton
                onClick={() => onCommand(createCommand('inline', 'bold'))}
                isActive={currentStyles.isBold}
                title="Bold (Ctrl+B)"
              >
                <strong>B</strong>
              </ToolbarButton>
              <ToolbarButton
                onClick={() => onCommand(createCommand('inline', 'italic'))}
                isActive={currentStyles.isItalic}
                title="Italic (Ctrl+I)"
              >
                <em>I</em>
              </ToolbarButton>
              <ToolbarButton
                onClick={() => onCommand(createCommand('inline', 'underline'))}
                isActive={currentStyles.isUnderline}
                title="Underline (Ctrl+U)"
              >
                <u>U</u>
              </ToolbarButton>
              <ToolbarButton
                onClick={() => onCommand(createCommand('inline', 'strikeThrough'))}
                isActive={currentStyles.isStrikethrough}
                title="Strikethrough"
              >
                <s>S</s>
              </ToolbarButton>
            </div>

            <ToolbarSeparator />

            {/* Lists - Compact */}
            <div className="flex gap-0.5 flex-shrink-0">
              <ToolbarButton
                onClick={() => onCommand(createCommand('list', 'insertUnorderedList'))}
                title="Bullet List"
              >
                •
              </ToolbarButton>
              <ToolbarButton
                onClick={() => onCommand(createCommand('list', 'insertOrderedList'))}
                title="Numbered List"
              >
                1.
              </ToolbarButton>
            </div>

            <ToolbarSeparator />

            {/* Alignment - Compact */}
            <div className="flex gap-0.5 flex-shrink-0">
              <ToolbarButton
                onClick={() => onCommand(createCommand('align', 'justifyLeft'))}
                title="Align Left"
                isActive={currentStyles.textAlign === 'left'}
              >
                ⬅
              </ToolbarButton>
              <ToolbarButton
                onClick={() => onCommand(createCommand('align', 'justifyCenter'))}
                title="Align Center"
                isActive={currentStyles.textAlign === 'center'}
              >
                ↔
              </ToolbarButton>
              <ToolbarButton
                onClick={() => onCommand(createCommand('align', 'justifyRight'))}
                title="Align Right"
                isActive={currentStyles.textAlign === 'right'}
              >
                ➡
              </ToolbarButton>
              <ToolbarButton
                onClick={() => onCommand(createCommand('align', 'justifyFull'))}
                title="Justify"
                isActive={currentStyles.textAlign === 'justify'}
              >
                ≡
              </ToolbarButton>
            </div>

            <ToolbarSeparator />

            {/* Insert Actions - Compact */}
            <div className="flex gap-0.5 flex-shrink-0">
              <ToolbarButton
                onClick={() => onCommand(createCommand('special', 'insertHorizontalRule'))}
                title="Insert Horizontal Line"
              >
                ―
              </ToolbarButton>
              <ToolbarButton
                onClick={() => onCommand(createCommand('media', 'insertImage'))}
                title="Insert Image"
              >
                🖼️
              </ToolbarButton>
              <ToolbarButton
                onClick={() => onCommand(createCommand('special', 'createLink'))}
                title="Insert Link"
              >
                🔗
              </ToolbarButton>
              <ToolbarButton
                onClick={() => onCommand(createCommand('special', 'removeFormat'))}
                title="Clear Formatting"
              >
                🧹
              </ToolbarButton>
            </div>
          </>
        )}

        {/* Universal Actions - Available in both modes */}
        <ToolbarSeparator />
        
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onCommand(createCommand('special', 'preview'));
          }}
          title="Preview & Export Document"
          className="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white border border-purple-500 rounded-md transition-all duration-200 flex items-center gap-2 font-medium text-sm cursor-pointer select-none relative z-10 flex-shrink-0 min-w-[100px]"
          style={{ pointerEvents: 'auto' }}
        >
          <span className="text-base">👁️</span>
          <span>Preview</span>
        </button>
      </div>
    </div>
  );
};

export default Toolbar;
