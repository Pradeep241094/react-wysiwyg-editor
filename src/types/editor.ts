export type EditorMode = 'markdown' | 'wysiwyg';

export interface EditorStyles {
  block: string;
  fontSize: string;
  fontFamily: string;
  textAlign: string;
  color: string;
  backgroundColor: string;
  isBold: boolean;
  isItalic: boolean;
  isUnderline: boolean;
  isStrikethrough: boolean;
}

export interface EditorCommand {
  type: 'block' | 'inline' | 'list' | 'align' | 'indent' | 'special' | 'media';
  name: string;
  value?: string;
}

export interface EditorProps {
  initialContent?: string;
  onChange: (content: string, markdown: string) => void;
  mode?: EditorMode;
  height?: string;
}

export interface ToolbarProps {
  onCommand: (command: EditorCommand) => void;
  currentStyles: EditorStyles;
  mode: EditorMode;
  onModeChange: (mode: EditorMode) => void;
}

export interface PreviewProps {
  markdown: string;
  height?: string;
}

export interface SplitViewProps {
  editor: React.ReactNode;
  preview: React.ReactNode;
  mode: EditorMode;
}

export const FONT_SIZES = [
  '8pt', '9pt', '10pt', '11pt', '12pt', '14pt', '16pt', '18pt', '20pt', '24pt', '30pt', '36pt', '48pt', '60pt', '72pt'
];

export const FONT_FAMILIES = [
  'Arial',
  'Arial Black',
  'Courier New',
  'Georgia',
  'Helvetica',
  'Times New Roman',
  'Trebuchet MS',
  'Verdana'
];

export interface FontModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (fontFamily: string) => void;
  currentFont: string;
} 