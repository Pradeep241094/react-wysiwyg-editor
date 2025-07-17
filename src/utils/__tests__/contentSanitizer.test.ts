import { describe, it, expect, beforeEach } from 'vitest';
import { ContentSanitizer, DEFAULT_SANITIZATION_CONFIG, contentSanitizer } from '../contentSanitizer';

describe('ContentSanitizer', () => {
  let sanitizer: ContentSanitizer;

  beforeEach(() => {
    sanitizer = new ContentSanitizer();
  });

  describe('sanitizeHtml', () => {
    it('should allow basic formatting tags', () => {
      const input = '<p>Hello <strong>world</strong> with <em>emphasis</em> and <u>underline</u></p>';
      const result = sanitizer.sanitizeHtml(input);
      expect(result).toBe('<p>Hello <strong>world</strong> with <em>emphasis</em> and <u>underline</u></p>');
    });

    it('should allow heading tags', () => {
      const input = '<h1>Title</h1><h2>Subtitle</h2><h3>Section</h3>';
      const result = sanitizer.sanitizeHtml(input);
      expect(result).toBe('<h1>Title</h1><h2>Subtitle</h2><h3>Section</h3>');
    });

    it('should allow list tags', () => {
      const input = '<ul><li>Item 1</li><li>Item 2</li></ul><ol><li>First</li><li>Second</li></ol>';
      const result = sanitizer.sanitizeHtml(input);
      expect(result).toBe('<ul><li>Item 1</li><li>Item 2</li></ul><ol><li>First</li><li>Second</li></ol>');
    });

    it('should remove dangerous script tags', () => {
      const input = '<p>Safe content</p><script>alert("xss")</script><p>More content</p>';
      const result = sanitizer.sanitizeHtml(input);
      expect(result).toBe('<p>Safe content</p><p>More content</p>');
    });

    it('should remove dangerous iframe tags', () => {
      const input = '<p>Content</p><iframe src="javascript:alert(1)"></iframe>';
      const result = sanitizer.sanitizeHtml(input);
      expect(result).toBe('<p>Content</p>');
    });

    it('should remove dangerous object and embed tags', () => {
      const input = '<p>Content</p><object data="malicious.swf"></object><embed src="bad.swf">';
      const result = sanitizer.sanitizeHtml(input);
      expect(result).toBe('<p>Content</p>');
    });

    it('should remove form elements', () => {
      const input = '<p>Content</p><form><input type="text"><button>Submit</button></form>';
      const result = sanitizer.sanitizeHtml(input);
      expect(result).toBe('<p>Content</p>');
    });

    it('should handle empty or null input', () => {
      expect(sanitizer.sanitizeHtml('')).toBe('');
      expect(sanitizer.sanitizeHtml(null as any)).toBe('');
      expect(sanitizer.sanitizeHtml(undefined as any)).toBe('');
    });

    it('should preserve text content when removing tags', () => {
      const input = '<p>Keep this <span>remove this</span> and this</p>';
      const result = sanitizer.sanitizeHtml(input);
      expect(result).toBe('<p>Keep this <span>remove this</span> and this</p>');
    });
  });

  describe('sanitizeAttributes', () => {
    it('should allow href attributes on links', () => {
      const input = '<a href="https://example.com" title="Example">Link</a>';
      const result = sanitizer.sanitizeHtml(input);
      expect(result).toBe('<a href="https://example.com" title="Example">Link</a>');
    });

    it('should remove dangerous event handlers', () => {
      const input = '<p onclick="alert(1)" onmouseover="evil()">Content</p>';
      const result = sanitizer.sanitizeHtml(input);
      expect(result).toBe('<p>Content</p>');
    });

    it('should remove dangerous href values', () => {
      const input = '<a href="javascript:alert(1)">Bad Link</a>';
      const result = sanitizer.sanitizeHtml(input);
      expect(result).toBe('<a>Bad Link</a>');
    });

    it('should remove data: protocol links', () => {
      const input = '<a href="data:text/html,<script>alert(1)</script>">Bad Link</a>';
      const result = sanitizer.sanitizeHtml(input);
      expect(result).toBe('<a>Bad Link</a>');
    });

    it('should allow relative URLs', () => {
      const input = '<a href="/relative/path">Relative Link</a>';
      const result = sanitizer.sanitizeHtml(input);
      expect(result).toBe('<a href="/relative/path">Relative Link</a>');
    });

    it('should allow fragment identifiers', () => {
      const input = '<a href="#section1">Fragment Link</a>';
      const result = sanitizer.sanitizeHtml(input);
      expect(result).toBe('<a href="#section1">Fragment Link</a>');
    });

    it('should allow mailto links', () => {
      const input = '<a href="mailto:test@example.com">Email Link</a>';
      const result = sanitizer.sanitizeHtml(input);
      expect(result).toBe('<a href="mailto:test@example.com">Email Link</a>');
    });
  });

  describe('sanitizeStyle', () => {
    it('should allow safe CSS properties', () => {
      const input = '<p style="color: red; font-size: 14px;">Styled text</p>';
      const result = sanitizer.sanitizeHtml(input);
      expect(result).toBe('<p style="color: red; font-size: 14px">Styled text</p>');
    });

    it('should remove dangerous CSS expressions', () => {
      const input = '<p style="background: expression(alert(1));">Bad style</p>';
      const result = sanitizer.sanitizeHtml(input);
      expect(result).toBe('<p>Bad style</p>');
    });

    it('should remove javascript: in CSS', () => {
      const input = '<p style="background: url(javascript:alert(1));">Bad style</p>';
      const result = sanitizer.sanitizeHtml(input);
      expect(result).toBe('<p>Bad style</p>');
    });

    it('should remove position fixed/absolute', () => {
      const input = '<div style="position: fixed; top: 0;">Fixed div</div>';
      const result = sanitizer.sanitizeHtml(input);
      expect(result).toBe('<div>Fixed div</div>');
    });

    it('should remove @import statements', () => {
      const input = '<p style="@import url(evil.css); color: red;">Content</p>';
      const result = sanitizer.sanitizeHtml(input);
      expect(result).toBe('<p>Content</p>');
    });
  });

  describe('sanitizePastedContent', () => {
    it('should clean up Microsoft Word artifacts', () => {
      const input = '<p class="MsoNormal" style="mso-line-height-rule: exactly;"><o:p>Word content</o:p></p>';
      const result = sanitizer.sanitizePastedContent(input);
      expect(result).toContain('Word content');
      expect(result).not.toContain('MsoNormal');
      expect(result).not.toContain('mso-line-height-rule');
      expect(result).not.toContain('<o:p>');
    });

    it('should remove empty paragraphs', () => {
      const input = '<p>Content</p><p></p><p>   </p><p>More content</p>';
      const result = sanitizer.sanitizePastedContent(input);
      expect(result).not.toMatch(/<p>\s*<\/p>/);
    });

    it('should convert font tags to spans', () => {
      const input = '<font color="red" size="3">Old font tag</font>';
      const result = sanitizer.sanitizePastedContent(input);
      expect(result).toContain('<span>');
      expect(result).not.toContain('<font');
    });

    it('should remove HTML comments', () => {
      const input = '<p>Content</p><!-- This is a comment --><p>More content</p>';
      const result = sanitizer.sanitizePastedContent(input);
      expect(result).not.toContain('<!--');
      expect(result).not.toContain('comment');
    });

    it('should normalize multiple br tags to paragraphs', () => {
      const input = 'Line 1<br><br>Line 2<br><br><br>Line 3';
      const result = sanitizer.sanitizePastedContent(input);
      expect(result).toContain('</p><p>');
    });

    it('should wrap unwrapped content in paragraphs', () => {
      const input = 'Plain text content';
      const result = sanitizer.sanitizePastedContent(input);
      expect(result).toBe('<p>Plain text content</p>');
    });
  });

  describe('extractPlainText', () => {
    it('should extract text from HTML', () => {
      const input = '<p>Hello <strong>world</strong> with <em>formatting</em></p>';
      const result = sanitizer.extractPlainText(input);
      expect(result).toBe('Hello world with formatting');
    });

    it('should handle empty input', () => {
      expect(sanitizer.extractPlainText('')).toBe('');
      expect(sanitizer.extractPlainText(null as any)).toBe('');
    });

    it('should extract text from complex HTML', () => {
      const input = '<div><h1>Title</h1><p>Paragraph with <a href="#">link</a></p><ul><li>Item 1</li><li>Item 2</li></ul></div>';
      const result = sanitizer.extractPlainText(input);
      expect(result).toContain('Title');
      expect(result).toContain('Paragraph with link');
      expect(result).toContain('Item 1');
      expect(result).toContain('Item 2');
    });
  });

  describe('isContentSafe', () => {
    it('should return true for safe content', () => {
      const safeContent = '<p>Hello <strong>world</strong></p>';
      expect(sanitizer.isContentSafe(safeContent)).toBe(true);
    });

    it('should return false for content with scripts', () => {
      const unsafeContent = '<p>Content</p><script>alert(1)</script>';
      expect(sanitizer.isContentSafe(unsafeContent)).toBe(false);
    });

    it('should return false for content with javascript: URLs', () => {
      const unsafeContent = '<a href="javascript:alert(1)">Link</a>';
      expect(sanitizer.isContentSafe(unsafeContent)).toBe(false);
    });

    it('should return false for content with event handlers', () => {
      const unsafeContent = '<p onclick="alert(1)">Content</p>';
      expect(sanitizer.isContentSafe(unsafeContent)).toBe(false);
    });

    it('should return false for content with dangerous tags', () => {
      const dangerousTags = ['<iframe>', '<object>', '<embed>', '<form>', '<input>', '<button>'];
      
      dangerousTags.forEach(tag => {
        expect(sanitizer.isContentSafe(`<p>Content</p>${tag}`)).toBe(false);
      });
    });

    it('should return true for empty content', () => {
      expect(sanitizer.isContentSafe('')).toBe(true);
      expect(sanitizer.isContentSafe(null as any)).toBe(true);
    });
  });

  describe('URL sanitization', () => {
    it('should allow HTTP and HTTPS URLs', () => {
      const input = '<a href="https://example.com">HTTPS Link</a><a href="http://example.com">HTTP Link</a>';
      const result = sanitizer.sanitizeHtml(input);
      expect(result).toBe('<a href="https://example.com">HTTPS Link</a><a href="http://example.com">HTTP Link</a>');
    });

    it('should add http:// to URLs without protocol', () => {
      const input = '<a href="example.com">Link</a>';
      const result = sanitizer.sanitizeHtml(input);
      expect(result).toBe('<a href="http://example.com">Link</a>');
    });

    it('should reject dangerous protocols', () => {
      const dangerousUrls = [
        'javascript:alert(1)',
        'data:text/html,<script>alert(1)</script>',
        'vbscript:msgbox(1)',
        'file:///etc/passwd',
        'ftp://malicious.com'
      ];

      dangerousUrls.forEach(url => {
        const input = `<a href="${url}">Link</a>`;
        const result = sanitizer.sanitizeHtml(input);
        expect(result).toBe('<a>Link</a>');
      });
    });
  });

  describe('Complex sanitization scenarios', () => {
    it('should handle nested dangerous content', () => {
      const input = `
        <div>
          <p onclick="alert(1)">
            Safe text
            <script>alert('xss')</script>
            <a href="javascript:void(0)">Bad link</a>
            <span style="expression(alert(1))">Bad style</span>
          </p>
          <iframe src="evil.html"></iframe>
        </div>
      `;
      
      const result = sanitizer.sanitizeHtml(input);
      
      // Should preserve safe content
      expect(result).toContain('Safe text');
      expect(result).toContain('<div>');
      expect(result).toContain('<p>');
      expect(result).toContain('<span>');
      
      // Should remove dangerous content
      expect(result).not.toContain('onclick');
      expect(result).not.toContain('<script>');
      expect(result).not.toContain('javascript:');
      expect(result).not.toContain('expression(');
      expect(result).not.toContain('<iframe>');
    });

    it('should handle malformed HTML gracefully', () => {
      const input = '<p>Unclosed paragraph<div>Nested improperly</p></div>';
      const result = sanitizer.sanitizeHtml(input);
      
      // Should not throw errors and should produce some reasonable output
      expect(typeof result).toBe('string');
      expect(result).toContain('Unclosed paragraph');
      expect(result).toContain('Nested improperly');
    });

    it('should preserve content structure while removing dangerous elements', () => {
      const input = `
        <h1>Article Title</h1>
        <p>Introduction paragraph with <strong>bold text</strong>.</p>
        <script>alert('This should be removed')</script>
        <ul>
          <li>First item</li>
          <li onclick="evil()">Second item with handler</li>
          <li>Third item</li>
        </ul>
        <p>Conclusion with <a href="https://example.com">safe link</a> and 
           <a href="javascript:alert(1)">dangerous link</a>.</p>
      `;
      
      const result = sanitizer.sanitizeHtml(input);
      
      // Should preserve structure
      expect(result).toContain('<h1>Article Title</h1>');
      expect(result).toContain('<strong>bold text</strong>');
      expect(result).toContain('<ul>');
      expect(result).toContain('<li>First item</li>');
      expect(result).toContain('<li>Second item with handler</li>');
      expect(result).toContain('<li>Third item</li>');
      expect(result).toContain('href="https://example.com"');
      
      // Should remove dangerous content
      expect(result).not.toContain('<script>');
      expect(result).not.toContain('alert(\'This should be removed\')');
      expect(result).not.toContain('onclick');
      expect(result).not.toContain('javascript:alert(1)');
    });
  });

  describe('Default sanitizer instance', () => {
    it('should export a working default instance', () => {
      const input = '<p>Test <script>alert(1)</script> content</p>';
      const result = contentSanitizer.sanitizeHtml(input);
      
      expect(result).toBe('<p>Test  content</p>');
      expect(typeof contentSanitizer.sanitizePastedContent).toBe('function');
      expect(typeof contentSanitizer.isContentSafe).toBe('function');
      expect(typeof contentSanitizer.extractPlainText).toBe('function');
    });
  });

  describe('Configuration', () => {
    it('should use custom configuration when provided', () => {
      const customConfig = {
        allowedTags: ['p', 'strong'],
        allowedAttributes: {},
        allowedProtocols: ['https:']
      };
      
      const customSanitizer = new ContentSanitizer(customConfig);
      const input = '<p>Keep this</p><em>Remove this</em><strong>Keep this too</strong>';
      const result = customSanitizer.sanitizeHtml(input);
      
      expect(result).toContain('<p>Keep this</p>');
      expect(result).toContain('<strong>Keep this too</strong>');
      expect(result).toContain('Remove this'); // Text preserved
      expect(result).not.toContain('<em>'); // Tag removed
    });

    it('should have sensible defaults', () => {
      expect(DEFAULT_SANITIZATION_CONFIG.allowedTags).toContain('p');
      expect(DEFAULT_SANITIZATION_CONFIG.allowedTags).toContain('strong');
      expect(DEFAULT_SANITIZATION_CONFIG.allowedTags).toContain('a');
      expect(DEFAULT_SANITIZATION_CONFIG.allowedTags).toContain('h1');
      expect(DEFAULT_SANITIZATION_CONFIG.allowedTags).toContain('ul');
      expect(DEFAULT_SANITIZATION_CONFIG.allowedTags).toContain('li');
      
      expect(DEFAULT_SANITIZATION_CONFIG.allowedAttributes.a).toContain('href');
      expect(DEFAULT_SANITIZATION_CONFIG.allowedProtocols).toContain('https:');
      expect(DEFAULT_SANITIZATION_CONFIG.allowedProtocols).toContain('http:');
      expect(DEFAULT_SANITIZATION_CONFIG.allowedProtocols).toContain('mailto:');
    });
  });
});