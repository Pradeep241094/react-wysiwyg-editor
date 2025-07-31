import React from 'react';

// Main WYSIWYG Editor Props
export interface WYSIWYGEditorProps {
  initialContent?: string;
  placeholder?: string;
  onChange?: (content: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  toolbarConfig?: ToolbarConfig;
  showConfigDropdown?: boolean;
  configOptions?: Record<string, { name: string; description?: string; config?: ToolbarConfig }>;
  selectedConfigKey?: string;
  onConfigChange?: (configKey: string) => void;
  height?: string | number; // Height of the editor (e.g., '400px', 400, 'auto')
}

// Toolbar Component Props
export interface ToolbarProps {
  onCommand: (command: string, value?: string) => void;
  activeFormats: Set<string>;
  canUndo: boolean;
  canRedo: boolean;
  toolbarConfig?: ResolvedToolbarConfig;
  showConfigDropdown?: boolean;
  configOptions?: Record<string, { name: string; description?: string; config?: ToolbarConfig }>;
  selectedConfigKey?: string;
  onConfigChange?: (configKey: string) => void;
}

// Toolbar Button Configuration
export interface ToolbarButton {
  command: string;
  value?: string;
  icon: string;
  title: string;
}

// EditableArea Component Props
export interface EditableAreaProps {
  content: string;
  placeholder: string;
  onContentChange: (content: string) => void;
  onFocus: () => void;
  onBlur: () => void;
  editorRef: React.RefObject<HTMLDivElement>;
  onSelectionChange?: (selectionState: SelectionState) => void;
  onLinkClick?: (event: MouseEvent, linkElement: HTMLAnchorElement) => void;
  height?: string | number; // Height of the editable area
}

// Selection State Management
export interface SelectionState {
  range: Range | null;
  isCollapsed: boolean;
  activeFormats: Set<string>;
  currentBlockFormat: string;
}

// Editor Command Configuration
export interface EditorCommand {
  type: 'execCommand' | 'custom';
  command: string;
  value?: string;
  requiresSelection?: boolean;
}

// Command Constants
export const COMMANDS = {
  BOLD: { type: 'execCommand' as const, command: 'bold' },
  ITALIC: { type: 'execCommand' as const, command: 'italic' },
  UNDERLINE: { type: 'execCommand' as const, command: 'underline' },
  CREATE_LINK: { type: 'execCommand' as const, command: 'createLink', requiresSelection: true },
  FORMAT_H1: { type: 'execCommand' as const, command: 'formatBlock', value: 'H1' },
  FORMAT_H2: { type: 'execCommand' as const, command: 'formatBlock', value: 'H2' },
  FORMAT_H3: { type: 'execCommand' as const, command: 'formatBlock', value: 'H3' },
  INSERT_UNORDERED_LIST: { type: 'execCommand' as const, command: 'insertUnorderedList' },
  INSERT_ORDERED_LIST: { type: 'execCommand' as const, command: 'insertOrderedList' },
  JUSTIFY_LEFT: { type: 'execCommand' as const, command: 'justifyLeft' },
  JUSTIFY_CENTER: { type: 'execCommand' as const, command: 'justifyCenter' },
  JUSTIFY_RIGHT: { type: 'execCommand' as const, command: 'justifyRight' },
  UNDO: { type: 'execCommand' as const, command: 'undo' },
  REDO: { type: 'execCommand' as const, command: 'redo' },
  REMOVE_FORMAT: { type: 'execCommand' as const, command: 'removeFormat' }
};

// Content Sanitization Configuration
export interface SanitizationConfig {
  allowedTags: string[];
  allowedAttributes: Record<string, string[]>;
}

export const DEFAULT_SANITIZATION_CONFIG: SanitizationConfig = {
  allowedTags: ['p', 'br', 'strong', 'em', 'u', 'h1', 'h2', 'h3', 'ul', 'ol', 'li', 'a'],
  allowedAttributes: {
    'a': ['href', 'title'],
    '*': ['style'] // Limited style attributes only
  }
};

// Toolbar Configuration Types
export type ToolbarCategory = 
  | 'formatting' 
  | 'structure' 
  | 'lists' 
  | 'alignment' 
  | 'media' 
  | 'links' 
  | 'advanced';

export type ToolbarButtonType = 
  | 'bold' | 'italic' | 'underline' | 'strikethrough'
  | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  | 'bulletList' | 'numberedList' | 'indent' | 'outdent'
  | 'alignLeft' | 'alignCenter' | 'alignRight' | 'alignJustify'
  | 'image' | 'file' | 'table'
  | 'link' | 'unlink'
  | 'fontColor' | 'backgroundColor' | 'fontSize' | 'fontFamily'
  | 'subscript' | 'superscript' | 'specialChar' | 'horizontalRule'
  | 'findReplace' | 'sourceCode' | 'fullscreen' | 'print'
  | 'undo' | 'redo' | 'removeFormat';

export interface ToolbarGroup {
  name: string;
  buttons: ToolbarButtonType[];
}

export interface ToolbarConfig {
  preset?: 'minimal' | 'standard' | 'full';
  include?: {
    categories?: ToolbarCategory[];
    buttons?: ToolbarButtonType[];
    groups?: ToolbarGroup[];
  };
  exclude?: {
    categories?: ToolbarCategory[];
    buttons?: ToolbarButtonType[];
  };
  order?: (ToolbarButtonType | ToolbarGroup)[];
}

export interface ResolvedToolbarConfig {
  groups: ToolbarGroup[];
  enabledButtons: Set<ToolbarButtonType>;
}