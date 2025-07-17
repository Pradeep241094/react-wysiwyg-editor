import React from 'react';
export interface WYSIWYGEditorProps {
    initialContent?: string;
    placeholder?: string;
    onChange?: (content: string) => void;
    onFocus?: () => void;
    onBlur?: () => void;
}
export interface ToolbarProps {
    onCommand: (command: string, value?: string) => void;
    activeFormats: Set<string>;
    canUndo: boolean;
    canRedo: boolean;
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
