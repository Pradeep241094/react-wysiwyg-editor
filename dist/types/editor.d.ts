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
export declare const FONT_SIZES: string[];
export declare const FONT_FAMILIES: string[];
export interface FontModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSelect: (fontFamily: string) => void;
    currentFont: string;
}
