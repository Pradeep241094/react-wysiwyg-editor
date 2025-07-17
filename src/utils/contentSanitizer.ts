export interface SanitizationConfig {
  allowedTags: string[];
  allowedAttributes: Record<string, string[]>;
  allowedProtocols: string[];
}

export const DEFAULT_SANITIZATION_CONFIG: SanitizationConfig = {
  allowedTags: [
    'p', 'br', 'strong', 'em', 'u', 'b', 'i',
    'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
    'ul', 'ol', 'li',
    'a', 'span', 'div'
  ],
  allowedAttributes: {
    'a': ['href', 'title'],
    'span': ['style'],
    'div': ['style'],
    'p': ['style'],
    'h1': ['style'],
    'h2': ['style'],
    'h3': ['style'],
    'h4': ['style'],
    'h5': ['style'],
    'h6': ['style']
  },
  allowedProtocols: ['http:', 'https:', 'mailto:']
};

export class ContentSanitizer {
  private config: SanitizationConfig;

  constructor(config: SanitizationConfig = DEFAULT_SANITIZATION_CONFIG) {
    this.config = config;
  }

  /**
   * Sanitize HTML content by removing dangerous elements and attributes
   */
  public sanitizeHtml(html: string): string {
    if (!html || typeof html !== 'string') {
      return '';
    }

    // Create a temporary DOM element to parse the HTML
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;

    // Recursively sanitize all elements
    this.sanitizeElement(tempDiv);

    return tempDiv.innerHTML;
  }

  /**
   * Sanitize pasted content specifically for the editor
   */
  public sanitizePastedContent(html: string): string {
    // First, clean up common paste artifacts (before sanitization)
    let cleaned = this.cleanPasteArtifacts(html);

    // Then perform basic HTML sanitization
    let sanitized = this.sanitizeHtml(cleaned);

    // Normalize whitespace and line breaks
    sanitized = this.normalizeWhitespace(sanitized);

    return sanitized;
  }

  /**
   * Recursively sanitize a DOM element and its children
   */
  private sanitizeElement(element: Element): void {
    const children = Array.from(element.children);

    for (const child of children) {
      const tagName = child.tagName.toLowerCase();

      // Remove disallowed tags
      if (!this.config.allowedTags.includes(tagName)) {
        // Special handling for dangerous tags - remove completely including content
        if (this.isDangerousTag(tagName)) {
          child.remove();
          continue;
        }

        // For other disallowed tags, preserve text content but remove the tag
        const textContent = child.textContent || '';
        if (textContent.trim()) {
          const textNode = document.createTextNode(textContent);
          child.parentNode?.replaceChild(textNode, child);
        } else {
          child.remove();
        }
        continue;
      }

      // Sanitize attributes
      this.sanitizeAttributes(child);

      // Recursively sanitize children
      this.sanitizeElement(child);
    }
  }

  /**
   * Check if a tag is dangerous and should be removed completely
   */
  private isDangerousTag(tagName: string): boolean {
    const dangerousTags = [
      'script', 'iframe', 'object', 'embed', 'form', 'input', 
      'button', 'textarea', 'select', 'option', 'style', 'link',
      'meta', 'base', 'applet', 'frame', 'frameset'
    ];
    return dangerousTags.includes(tagName);
  }

  /**
   * Sanitize attributes of an element
   */
  private sanitizeAttributes(element: Element): void {
    const tagName = element.tagName.toLowerCase();
    const allowedAttrs = this.config.allowedAttributes[tagName] || [];
    const attributes = Array.from(element.attributes);

    for (const attr of attributes) {
      const attrName = attr.name.toLowerCase();

      // Remove disallowed attributes
      if (!allowedAttrs.includes(attrName)) {
        element.removeAttribute(attr.name);
        continue;
      }

      // Special handling for href attributes
      if (attrName === 'href') {
        const sanitizedHref = this.sanitizeUrl(attr.value);
        if (sanitizedHref) {
          element.setAttribute('href', sanitizedHref);
        } else {
          element.removeAttribute('href');
        }
        continue;
      }

      // Special handling for style attributes
      if (attrName === 'style') {
        const sanitizedStyle = this.sanitizeStyle(attr.value);
        if (sanitizedStyle) {
          element.setAttribute('style', sanitizedStyle);
        } else {
          element.removeAttribute('style');
        }
        continue;
      }

      // For other attributes, ensure they don't contain scripts
      if (this.containsScript(attr.value)) {
        element.removeAttribute(attr.name);
      }
    }
  }

  /**
   * Sanitize URL to ensure it uses allowed protocols
   */
  private sanitizeUrl(url: string): string | null {
    if (!url || typeof url !== 'string') {
      return null;
    }

    const trimmedUrl = url.trim();

    // Check for javascript: or data: protocols and other dangerous schemes
    if (/^(javascript|data|vbscript|file|ftp):/i.test(trimmedUrl)) {
      return null;
    }

    // Allow relative URLs
    if (trimmedUrl.startsWith('/') || trimmedUrl.startsWith('./') || trimmedUrl.startsWith('../')) {
      return trimmedUrl;
    }

    // Allow fragment identifiers
    if (trimmedUrl.startsWith('#')) {
      return trimmedUrl;
    }

    // Check for allowed protocols
    try {
      const urlObj = new URL(trimmedUrl);
      if (this.config.allowedProtocols.includes(urlObj.protocol)) {
        return trimmedUrl;
      }
    } catch (error) {
      // If URL parsing fails, try to add http:// prefix
      try {
        const urlWithProtocol = `http://${trimmedUrl}`;
        const urlObj = new URL(urlWithProtocol);
        if (this.config.allowedProtocols.includes(urlObj.protocol)) {
          return urlWithProtocol;
        }
      } catch (error) {
        // If still fails, return null
        return null;
      }
    }

    return null;
  }

  /**
   * Sanitize CSS style attribute
   */
  private sanitizeStyle(style: string): string | null {
    if (!style || typeof style !== 'string') {
      return null;
    }

    // Remove dangerous CSS properties and values
    const dangerousPatterns = [
      /expression\s*\(/i,
      /javascript\s*:/i,
      /vbscript\s*:/i,
      /data\s*:/i,
      /import\s*['"]/i,
      /@import/i,
      /binding\s*:/i,
      /behavior\s*:/i,
      /position\s*:\s*fixed/i,
      /position\s*:\s*absolute/i
    ];

    for (const pattern of dangerousPatterns) {
      if (pattern.test(style)) {
        return null;
      }
    }

    // Allow only basic text formatting styles
    const allowedStyleProperties = [
      'color', 'background-color', 'font-size', 'font-weight', 'font-style',
      'text-decoration', 'text-align', 'margin', 'padding', 'border',
      'font-family'
    ];

    // Parse and filter CSS properties
    const styleDeclarations = style.split(';').filter(decl => decl.trim());
    const sanitizedDeclarations: string[] = [];

    for (const declaration of styleDeclarations) {
      const [property, value] = declaration.split(':').map(s => s.trim());
      
      if (property && value && allowedStyleProperties.includes(property.toLowerCase())) {
        // Additional check to ensure value doesn't contain dangerous content
        if (!this.containsScript(value)) {
          sanitizedDeclarations.push(`${property}: ${value}`);
        }
      }
    }

    return sanitizedDeclarations.length > 0 ? sanitizedDeclarations.join('; ') : null;
  }

  /**
   * Check if a string contains potentially dangerous script content
   */
  private containsScript(value: string): boolean {
    if (!value || typeof value !== 'string') {
      return false;
    }

    const dangerousPatterns = [
      /javascript\s*:/i,
      /vbscript\s*:/i,
      /data\s*:/i,
      /on\w+\s*=/i, // Event handlers like onclick, onload, etc.
      /<script/i,
      /<\/script/i,
      /expression\s*\(/i,
      /eval\s*\(/i,
      /setTimeout\s*\(/i,
      /setInterval\s*\(/i
    ];

    return dangerousPatterns.some(pattern => pattern.test(value));
  }

  /**
   * Clean up common artifacts from pasted content
   */
  private cleanPasteArtifacts(html: string): string {
    let cleaned = html;

    // Remove Microsoft Word specific tags and attributes
    cleaned = cleaned.replace(/<o:p\s*\/?>/gi, '');
    cleaned = cleaned.replace(/<\/o:p>/gi, '');
    cleaned = cleaned.replace(/\s*mso-[^:]+:[^;"]+;?/gi, '');
    cleaned = cleaned.replace(/\s*class="?Mso[^"]*"?/gi, '');

    // Remove empty paragraphs and divs
    cleaned = cleaned.replace(/<p[^>]*>\s*<\/p>/gi, '');
    cleaned = cleaned.replace(/<div[^>]*>\s*<\/div>/gi, '');

    // Remove font tags and replace with spans
    cleaned = cleaned.replace(/<font[^>]*>/gi, '<span>');
    cleaned = cleaned.replace(/<\/font>/gi, '</span>');

    // Remove comments
    cleaned = cleaned.replace(/<!--[\s\S]*?-->/g, '');

    // Clean up excessive whitespace
    cleaned = cleaned.replace(/\s+/g, ' ');
    cleaned = cleaned.replace(/>\s+</g, '><');

    return cleaned.trim();
  }

  /**
   * Normalize whitespace and line breaks
   */
  private normalizeWhitespace(html: string): string {
    let normalized = html;

    // Convert multiple consecutive <br> tags to paragraph breaks
    normalized = normalized.replace(/(<br\s*\/?>){2,}/gi, '</p><p>');

    // Ensure content is wrapped in paragraphs if it's not already
    if (normalized && !normalized.match(/^<(p|h[1-6]|ul|ol|div)/i)) {
      normalized = `<p>${normalized}</p>`;
    }

    // Clean up empty paragraphs that might have been created
    normalized = normalized.replace(/<p>\s*<\/p>/gi, '');

    return normalized;
  }

  /**
   * Extract plain text from HTML content
   */
  public extractPlainText(html: string): string {
    if (!html || typeof html !== 'string') {
      return '';
    }

    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;
    return tempDiv.textContent || tempDiv.innerText || '';
  }

  /**
   * Check if content is safe (contains no dangerous elements)
   */
  public isContentSafe(html: string): boolean {
    if (!html || typeof html !== 'string') {
      return true;
    }

    // Quick check for obviously dangerous content
    const dangerousPatterns = [
      /<script/i,
      /javascript\s*:/i,
      /vbscript\s*:/i,
      /on\w+\s*=/i,
      /<iframe/i,
      /<object/i,
      /<embed/i,
      /<form/i,
      /<input/i,
      /<button/i
    ];

    return !dangerousPatterns.some(pattern => pattern.test(html));
  }
}

// Export singleton instance
export const contentSanitizer = new ContentSanitizer();