export interface EditorCommand {
    type: 'execCommand' | 'custom';
    command: string;
    value?: string;
    requiresSelection?: boolean;
    description: string;
}
export declare const COMMANDS: Record<string, EditorCommand>;
export interface CommandExecutionResult {
    success: boolean;
    error?: string;
    command: string;
    value?: string;
}
export declare class CommandExecutor {
    private static instance;
    private constructor();
    static getInstance(): CommandExecutor;
    /**
     * Execute a command using document.execCommand with error handling
     */
    executeCommand(commandKey: string, value?: string, editorElement?: HTMLElement, _savedSelection?: Range | null): CommandExecutionResult;
    /**
     * Execute custom commands that require special handling
     */
    private executeCustomCommand;
    /**
     * Check if the current selection is empty
     */
    private isSelectionEmpty;
    /**
     * Check if the current selection contains mixed formatting
     */
    private hasMixedFormatting;
    /**
     * Get the current active formatting states
     */
    getActiveFormats(): Set<string>;
    /**
     * Check if undo is available
     */
    canUndo(): boolean;
    /**
     * Check if redo is available
     */
    canRedo(): boolean;
    /**
     * Get current block format (heading level, etc.)
     */
    getCurrentBlockFormat(): string;
    /**
     * Create a hyperlink from selected text or insert new link
     */
    private createLink;
    /**
     * Edit an existing hyperlink
     */
    private editLink;
    /**
     * Find a link element in the current selection or cursor position
     */
    private findLinkInSelection;
    /**
     * Remove a link element while preserving its text content
     */
    private removeLinkElement;
    /**
     * Check if the current selection or cursor is within a link
     */
    private isInLink;
    /**
     * Insert an image into the editor with enhanced positioning
     */
    insertImage(imageUrl: string, options?: {
        width?: number;
        height?: number;
        alignment?: 'left' | 'center' | 'right' | 'none';
        float?: 'left' | 'right' | 'none';
        alt?: string;
    }): CommandExecutionResult;
    /**
     * Apply alignment to an image element
     */
    private applyImageAlignment;
    /**
     * Apply float to an image element
     */
    private applyImageFloat;
    /**
     * Trigger image file upload
     */
    private triggerImageUpload;
    /**
     * Upload and insert a file
     */
    private uploadFile;
    /**
     * Insert a file link into the editor
     */
    private insertFileLink;
    /**
     * Get file icon based on file type
     */
    private getFileIcon;
    /**
     * Insert a table into the editor
     */
    private insertTable;
    /**
     * Insert a special character
     */
    private insertSpecialChar;
    /**
     * Find and replace functionality
     * Note: This function should not be called directly anymore
     * Find/replace is now handled by the modal system in the WYSIWYGEditor component
     */
    private findReplace;
    /**
     * Toggle source code view
     */
    private toggleSourceCode;
    /**
     * Toggle fullscreen mode
     */
    private toggleFullscreen;
    /**
     * Print document
     */
    private printDocument;
    /**
     * Toggle spell check
     */
    private toggleSpellCheck;
    /**
     * Validate if URL is a valid image URL
     */
    private isValidImageUrl;
    /**
     * Set font color for selected text or future text input
     */
    private setFontColor;
    /**
     * Set background color for selected text or future text input
     */
    private setBackgroundColor;
    /**
     * Normalize and validate URL
     */
    private normalizeUrl;
}
export declare const commandExecutor: CommandExecutor;
