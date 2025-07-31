import React from 'react';
export interface WYSIWYGEditorProps {
    initialContent?: string;
    placeholder?: string;
    onChange?: (content: string) => void;
    onFocus?: () => void;
    onBlur?: () => void;
    toolbarConfig?: ToolbarConfig;
    showConfigDropdown?: boolean;
    configOptions?: Record<string, {
        name: string;
        description?: string;
        config?: ToolbarConfig;
    }>;
    selectedConfigKey?: string;
    onConfigChange?: (configKey: string) => void;
    height?: string | number;
}
export interface ToolbarProps {
    onCommand: (command: string, value?: string) => void;
    activeFormats: Set<string>;
    canUndo: boolean;
    canRedo: boolean;
    toolbarConfig?: ResolvedToolbarConfig;
    showConfigDropdown?: boolean;
    configOptions?: Record<string, {
        name: string;
        description?: string;
        config?: ToolbarConfig;
    }>;
    selectedConfigKey?: string;
    onConfigChange?: (configKey: string) => void;
}
export interface ToolbarButton {
    command: string;
    value?: string;
    icon: string;
    title: string;
}
export interface EditableAreaProps {
    content: string;
    placeholder: string;
    onContentChange: (content: string) => void;
    onFocus: () => void;
    onBlur: () => void;
    editorRef: React.RefObject<HTMLDivElement>;
    onSelectionChange?: (selectionState: SelectionState) => void;
    onLinkClick?: (event: MouseEvent, linkElement: HTMLAnchorElement) => void;
    height?: string | number;
}
export interface SelectionState {
    range: Range | null;
    isCollapsed: boolean;
    activeFormats: Set<string>;
    currentBlockFormat: string;
}
export interface EditorCommand {
    type: 'execCommand' | 'custom';
    command: string;
    value?: string;
    requiresSelection?: boolean;
}
export declare const COMMANDS: {
    BOLD: {
        type: "execCommand";
        command: string;
    };
    ITALIC: {
        type: "execCommand";
        command: string;
    };
    UNDERLINE: {
        type: "execCommand";
        command: string;
    };
    CREATE_LINK: {
        type: "execCommand";
        command: string;
        requiresSelection: boolean;
    };
    FORMAT_H1: {
        type: "execCommand";
        command: string;
        value: string;
    };
    FORMAT_H2: {
        type: "execCommand";
        command: string;
        value: string;
    };
    FORMAT_H3: {
        type: "execCommand";
        command: string;
        value: string;
    };
    INSERT_UNORDERED_LIST: {
        type: "execCommand";
        command: string;
    };
    INSERT_ORDERED_LIST: {
        type: "execCommand";
        command: string;
    };
    JUSTIFY_LEFT: {
        type: "execCommand";
        command: string;
    };
    JUSTIFY_CENTER: {
        type: "execCommand";
        command: string;
    };
    JUSTIFY_RIGHT: {
        type: "execCommand";
        command: string;
    };
    UNDO: {
        type: "execCommand";
        command: string;
    };
    REDO: {
        type: "execCommand";
        command: string;
    };
    REMOVE_FORMAT: {
        type: "execCommand";
        command: string;
    };
};
export interface SanitizationConfig {
    allowedTags: string[];
    allowedAttributes: Record<string, string[]>;
}
export declare const DEFAULT_SANITIZATION_CONFIG: SanitizationConfig;
export type ToolbarCategory = 'formatting' | 'structure' | 'lists' | 'alignment' | 'media' | 'links' | 'advanced';
export type ToolbarButtonType = 'bold' | 'italic' | 'underline' | 'strikethrough' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'bulletList' | 'numberedList' | 'indent' | 'outdent' | 'alignLeft' | 'alignCenter' | 'alignRight' | 'alignJustify' | 'image' | 'file' | 'table' | 'link' | 'unlink' | 'fontColor' | 'backgroundColor' | 'fontSize' | 'fontFamily' | 'subscript' | 'superscript' | 'specialChar' | 'horizontalRule' | 'findReplace' | 'sourceCode' | 'fullscreen' | 'print' | 'undo' | 'redo' | 'removeFormat';
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
