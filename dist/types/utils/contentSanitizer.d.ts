export interface SanitizationConfig {
    allowedTags: string[];
    allowedAttributes: Record<string, string[]>;
    allowedProtocols: string[];
}
export declare const DEFAULT_SANITIZATION_CONFIG: SanitizationConfig;
export declare class ContentSanitizer {
    private config;
    constructor(config?: SanitizationConfig);
    /**
     * Sanitize HTML content by removing dangerous elements and attributes
     */
    sanitizeHtml(html: string): string;
    /**
     * Sanitize pasted content specifically for the editor
     */
    sanitizePastedContent(html: string): string;
    /**
     * Recursively sanitize a DOM element and its children
     */
    private sanitizeElement;
    /**
     * Check if a tag is dangerous and should be removed completely
     */
    private isDangerousTag;
    /**
     * Sanitize attributes of an element
     */
    private sanitizeAttributes;
    /**
     * Sanitize URL to ensure it uses allowed protocols
     */
    private sanitizeUrl;
    /**
     * Sanitize CSS style attribute
     */
    private sanitizeStyle;
    /**
     * Check if a string contains potentially dangerous script content
     */
    private containsScript;
    /**
     * Clean up common artifacts from pasted content
     */
    private cleanPasteArtifacts;
    /**
     * Normalize whitespace and line breaks
     */
    private normalizeWhitespace;
    /**
     * Extract plain text from HTML content
     */
    extractPlainText(html: string): string;
    /**
     * Check if content is safe (contains no dangerous elements)
     */
    isContentSafe(html: string): boolean;
}
export declare const contentSanitizer: ContentSanitizer;
