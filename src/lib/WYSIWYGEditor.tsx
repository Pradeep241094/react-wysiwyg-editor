import React, { useRef, useEffect, useState, useCallback } from 'react';
import Toolbar from '../components/Toolbar';
import SplitView from '../components/SplitView';
import ImageUploadModal from '../components/ImageUploadModal';
import type { EditorProps, EditorStyles, EditorCommand, EditorMode } from '../types/editor';
import { marked } from 'marked';
import DOMPurify from 'dompurify';

const WYSIWYGEditor: React.FC<EditorProps> = ({
  initialContent = '',
  onChange,
  mode: initialMode = 'wysiwyg',
  height = '400px'
}) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [mode, setMode] = useState<EditorMode>(initialMode);
  const [markdownContent, setMarkdownContent] = useState(initialContent);
  const [showImageModal, setShowImageModal] = useState(false);
  const [currentStyles, setCurrentStyles] = useState<EditorStyles>({
    block: 'p',
    fontSize: '12pt',
    fontFamily: 'Inter',
    textAlign: 'left',
    color: '#000000',
    backgroundColor: 'transparent',
    isBold: false,
    isItalic: false,
    isUnderline: false,
    isStrikethrough: false,
  });

  // Force update toolbar state with current or default values
  const forceUpdateToolbarState = useCallback(() => {
    console.log('Force updating toolbar state...');
    if (!editorRef.current) {
      console.log('No editor ref, setting defaults');
      setCurrentStyles({
        block: 'p',
        fontSize: '12pt',
        fontFamily: 'Inter',
        textAlign: 'left',
        color: '#000000',
        backgroundColor: 'transparent',
        isBold: false,
        isItalic: false,
        isUnderline: false,
        isStrikethrough: false,
      });
      return;
    }
    
    // Try to update from current state, fallback to defaults
    updateCurrentStyles(true); // Force update during initialization
  }, []);

  useEffect(() => {
    if (!editorRef.current) return;
    if (mode === 'wysiwyg') {
      // @ts-ignore
      marked.parse(markdownContent, (err, html) => {
        if (!err && editorRef.current) {
          editorRef.current.innerHTML = DOMPurify.sanitize(html as string);
          // Update styles after content is loaded
          setTimeout(() => {
            forceUpdateToolbarState();
          }, 100);
        }
      });
    } else {
      editorRef.current.textContent = markdownContent;
    }
  }, [mode, markdownContent, forceUpdateToolbarState]);

  // Initialize toolbar state on first mount
  useEffect(() => {
    if (editorRef.current && mode === 'wysiwyg') {
      // Ensure editor has content to style
      if (!editorRef.current.innerHTML.trim() || editorRef.current.innerHTML === '<br>') {
        editorRef.current.innerHTML = '<p><br></p>';
      }
      
      // Focus the editor and create a selection
      editorRef.current.focus();
      
      // Create a selection at the beginning of the content
      const range = document.createRange();
      const selection = window.getSelection();
      
      if (editorRef.current.firstChild) {
        range.setStart(editorRef.current.firstChild, 0);
        range.collapse(true);
        selection?.removeAllRanges();
        selection?.addRange(range);
      }
      
      setTimeout(() => {
        forceUpdateToolbarState();
      }, 250);
      
      // Also try again after a longer delay in case the first attempt fails
      setTimeout(() => {
        forceUpdateToolbarState();
      }, 500);
    }
  }, [mode, forceUpdateToolbarState]); // Run only once when mode changes

  // Add selection change listener for better toolbar sync
  useEffect(() => {
    const handleSelectionChange = () => {
      if (mode === 'wysiwyg' && document.activeElement === editorRef.current) {
        updateCurrentStyles();
      }
    };

    document.addEventListener('selectionchange', handleSelectionChange);
    return () => document.removeEventListener('selectionchange', handleSelectionChange);
  }, [mode]);

  const handleContentChange = async () => {
    if (!editorRef.current) return;
    const html = editorRef.current.innerHTML;

    if (mode === 'wysiwyg') {
      const markdown = convertToMarkdown(html);
      setMarkdownContent(markdown);
      onChange?.(html, markdown);
    } else {
      const markdown = editorRef.current.textContent || '';
      setMarkdownContent(markdown);
      const htmlContent = await marked.parse(markdown);
      onChange?.(htmlContent, markdown);
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const selection = window.getSelection();
    if (!selection?.rangeCount) return;

    const range = selection.getRangeAt(0);
    let pastedContent = mode === 'wysiwyg'
      ? e.clipboardData.getData('text/html') || e.clipboardData.getData('text/plain')
      : e.clipboardData.getData('text/plain');

    if (mode === 'wysiwyg') {
      pastedContent = DOMPurify.sanitize(pastedContent);
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = pastedContent;
      range.deleteContents();
      Array.from(tempDiv.childNodes).forEach(node => {
        range.insertNode(node.cloneNode(true));
        range.collapse(false);
      });
    } else {
      document.execCommand('insertText', false, pastedContent);
    }

    handleContentChange();
  };

  const updateCurrentStyles = (forceUpdate = false) => {
    if (!editorRef.current || mode === 'markdown') return;
    
    const selection = window.getSelection();
    let currentElement: Node | null = null;
    
    // Try to get current element from selection
    if (selection?.rangeCount) {
      currentElement = selection.anchorNode;
      if (currentElement?.nodeType === Node.TEXT_NODE) {
        currentElement = currentElement.parentElement;
      }
    }
    
    // Fallback to editor root if no selection or element found
    if (!currentElement) {
      currentElement = editorRef.current;
      
      // Try to get the first child element if editor is empty or has default content
      if (editorRef.current.children.length > 0) {
        currentElement = editorRef.current.children[0];
      }
    }

    console.log('Updating styles for element:', currentElement, 'Mode:', mode);

    const computedStyle = window.getComputedStyle(currentElement as Element);

    // Convert computed font size to points for consistency with our dropdown
    const fontSizeInPx = parseFloat(computedStyle.fontSize);
    let fontSizeInPt = Math.round(fontSizeInPx * 0.75) + 'pt'; // Convert px to pt (1px = 0.75pt)
    
    // Map common browser defaults to our available sizes
    const fontSizeMap: { [key: string]: string } = {
      '12pt': '12pt',  // 16px default
      '13pt': '12pt',  // Close to 16px
      '14pt': '14pt',  
      '15pt': '14pt',  
      '16pt': '16pt',
      '18pt': '18pt',
      '20pt': '20pt',
      '24pt': '24pt',
      '28pt': '28pt',
      '32pt': '32pt',
      '36pt': '36pt',
      '48pt': '48pt'
    };

    if (fontSizeMap[fontSizeInPt]) {
      fontSizeInPt = fontSizeMap[fontSizeInPt];
    }

    // Get font family and clean it up
    let fontFamily = computedStyle.fontFamily.replace(/['"]/g, '').split(',')[0].trim();
    
    // Map system fonts to our available options
    const fontFamilyMap: { [key: string]: string } = {
      'system-ui': 'Inter',
      '-apple-system': 'Inter',
      'BlinkMacSystemFont': 'Inter',
      'Segoe UI': 'Inter',
      'Roboto': 'Inter',
      'Helvetica Neue': 'Helvetica',
      'Arial': 'Arial',
      'Noto Sans': 'Inter',
      'Liberation Sans': 'Arial',
      'Apple Color Emoji': 'Inter',
      'Segoe UI Emoji': 'Inter',
      'Segoe UI Symbol': 'Inter',
      'Noto Color Emoji': 'Inter'
    };

    if (fontFamilyMap[fontFamily]) {
      fontFamily = fontFamilyMap[fontFamily];
    }

    // Only update if there are actual changes (unless forced)
    const newStyles: EditorStyles = {
      block: getCurrentBlockType(currentElement as Element),
      fontSize: fontSizeInPt,
      fontFamily: fontFamily,
      textAlign: computedStyle.textAlign as 'left' | 'center' | 'right' | 'justify',
      color: rgbToHex(computedStyle.color),
      backgroundColor: computedStyle.backgroundColor === 'rgba(0, 0, 0, 0)' ? 'transparent' : rgbToHex(computedStyle.backgroundColor),
      isBold: computedStyle.fontWeight === 'bold' || parseInt(computedStyle.fontWeight) >= 600,
      isItalic: computedStyle.fontStyle === 'italic',
      isUnderline: computedStyle.textDecoration.includes('underline'),
      isStrikethrough: computedStyle.textDecoration.includes('line-through'),
    };

    // Compare with current styles to avoid unnecessary updates
    const hasChanges = forceUpdate || Object.keys(newStyles).some(key => 
      newStyles[key as keyof EditorStyles] !== currentStyles[key as keyof EditorStyles]
    );

    if (hasChanges) {
      console.log('Updating styles:', newStyles);
      setCurrentStyles(newStyles);
    }
  };

  const getCurrentBlockType = (element: Element): string => {
    if (!element) return 'p';
    
    // Walk up the DOM to find the block element
    let currentEl = element;
    while (currentEl && currentEl !== editorRef.current) {
      const tagName = currentEl.tagName?.toLowerCase();
      if (tagName && ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'blockquote', 'pre'].includes(tagName)) {
        return tagName;
      }
      currentEl = currentEl.parentElement as Element;
    }
    
    return 'p';
  };

  const rgbToHex = (rgb: string): string => {
    const result = rgb.match(/\d+/g);
    if (!result) return '#000000';
    
    const [r, g, b] = result.map(Number);
    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
  };

  const applyFontSize = (fontSize: string) => {
    if (!editorRef.current) return;
    
    console.log('Applying font size:', fontSize);
    
    const selection = window.getSelection();
    if (!selection?.rangeCount) return;
    
    try {
      // Get the selected range
      const range = selection.getRangeAt(0);
      
      if (range.collapsed) {
        // No selection, apply to current element or create a span
        let currentElement = selection.anchorNode;
        
        if (currentElement?.nodeType === Node.TEXT_NODE) {
          currentElement = currentElement.parentElement;
        }
        
        if (currentElement && currentElement !== editorRef.current) {
          (currentElement as HTMLElement).style.fontSize = fontSize;
        }
      } else {
        // Has selection, wrap in a span with the font size
        const selectedContent = range.extractContents();
        const span = document.createElement('span');
        span.style.fontSize = fontSize;
        span.appendChild(selectedContent);
        range.insertNode(span);
        
        // Restore selection
        range.selectNodeContents(span);
        selection.removeAllRanges();
        selection.addRange(range);
      }
      
      // Force update the toolbar state after a short delay
      setTimeout(() => {
        updateCurrentStyles(true);
      }, 50);
      
    } catch (error) {
      console.warn('Font size application failed:', error);
      // Fallback to execCommand
      document.execCommand('fontSize', false, '1');
      
      // Find the font elements and update them
      const fontElements = editorRef.current.querySelectorAll('font[size="1"]');
      fontElements.forEach(el => {
        (el as HTMLElement).style.fontSize = fontSize;
        el.removeAttribute('size');
      });
    }
  };

  const applyFontFamily = (fontFamily: string) => {
    if (!editorRef.current) return;
    
    console.log('Applying font family:', fontFamily);
    
    const selection = window.getSelection();
    if (!selection?.rangeCount) return;
    
    try {
      // Get the selected range
      const range = selection.getRangeAt(0);
      
      if (range.collapsed) {
        // No selection, apply to current element
        let currentElement = selection.anchorNode;
        
        if (currentElement?.nodeType === Node.TEXT_NODE) {
          currentElement = currentElement.parentElement;
        }
        
        if (currentElement && currentElement !== editorRef.current) {
          (currentElement as HTMLElement).style.fontFamily = fontFamily;
        }
      } else {
        // Has selection, wrap in a span with the font family
        const selectedContent = range.extractContents();
        const span = document.createElement('span');
        span.style.fontFamily = fontFamily;
        span.appendChild(selectedContent);
        range.insertNode(span);
        
        // Restore selection
        range.selectNodeContents(span);
        selection.removeAllRanges();
        selection.addRange(range);
      }
      
      // Force update the toolbar state after a short delay
      setTimeout(() => {
        updateCurrentStyles(true);
      }, 50);
      
    } catch (error) {
      console.warn('Font family application failed:', error);
      // Fallback to execCommand
      document.execCommand('fontName', false, fontFamily);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (mode === 'wysiwyg' && e.key === 'Enter') {
      // Get current element styles for inheritance
      const selection = window.getSelection();
      if (selection?.rangeCount) {
        const range = selection.getRangeAt(0);
        let currentElement = range.startContainer;
        
        if (currentElement.nodeType === Node.TEXT_NODE) {
          currentElement = currentElement.parentElement as Node;
        }
        
        // Get the computed styles of the current element
        const currentStyles = window.getComputedStyle(currentElement as Element);
        const fontSize = currentStyles.fontSize;
        const fontFamily = currentStyles.fontFamily;
        
        // Allow default behavior first
        setTimeout(() => {
          // Find the newly created paragraph and apply styles
          const newParagraph = editorRef.current?.querySelector('p:last-child');
          if (newParagraph && newParagraph.innerHTML === '<br>') {
            (newParagraph as HTMLElement).style.fontSize = fontSize;
            (newParagraph as HTMLElement).style.fontFamily = fontFamily;
          }
        }, 10);
      }
    }
  };

  const handleImageInsert = (imageData: string, altText: string, size: string = 'medium') => {
    if (!editorRef.current) return;

    // Define size mappings
    const sizeMap: { [key: string]: { width: number | null; height: string } } = {
      'small': { width: 300, height: 'auto' },
      'medium': { width: 600, height: 'auto' },
      'large': { width: 900, height: 'auto' },
      'original': { width: null, height: 'auto' }
    };

    const sizeConfig = sizeMap[size] || sizeMap['medium'];

    // Create the image element
    const img = document.createElement('img');
    img.src = imageData;
    img.alt = altText || 'Inserted image';
    img.style.maxWidth = '100%';
    img.style.height = sizeConfig.height;
    
    if (sizeConfig.width) {
      img.style.width = `${sizeConfig.width}px`;
    }
    
    img.style.display = 'block';
    img.style.margin = '1rem 0';
    img.style.borderRadius = '8px';
    img.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';

    // Insert the image at the current cursor position or at the end
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      range.deleteContents();
      
      // Create a new paragraph to contain the image
      const p = document.createElement('p');
      p.appendChild(img);
      
      range.insertNode(p);
      
      // Move cursor after the image
      range.setStartAfter(p);
      range.collapse(true);
      selection.removeAllRanges();
      selection.addRange(range);
    } else {
      // Fallback: append to the end
      const p = document.createElement('p');
      p.appendChild(img);
      editorRef.current.appendChild(p);
    }

    // Update content
    handleContentChange();
    setShowImageModal(false);
  };

  const executeCommand = (command: EditorCommand) => {
    if (!editorRef.current || mode === 'markdown') return;

    console.log('Executing command:', command);

    try {
      switch (command.type) {
        case 'block':
          // Handle block-level formatting
          const currentElement = window.getSelection()?.anchorNode;
          if (currentElement) {
            let element = currentElement.nodeType === Node.TEXT_NODE 
              ? currentElement.parentElement 
              : currentElement as Element;
            
            // Walk up to find the appropriate block element
            while (element && element !== editorRef.current && 
                   !['H1','H2','H3','H4','H5','H6','P','BLOCKQUOTE','PRE'].includes(element.tagName)) {
              element = element.parentNode as Element;
            }
          }
          
          // Fallback to default behavior
          document.execCommand('formatBlock', false, `<${command.value}>`);
          break;
        case 'inline':
        case 'list':
        case 'align':
        case 'indent':
        case 'special':
          if (command.name === 'preview') {
            // For library version, just log or provide a callback
            console.log('Preview requested - implement preview functionality in your app');
            return; // Don't call handleContentChange for preview
          } else if (command.name === 'fontSize') {
            // Handle font size with direct CSS styling since execCommand is unreliable
            console.log('Applying font size:', command.value);
            applyFontSize(command.value || '12pt');
          } else if (command.name === 'fontName') {
            // Handle font family with direct CSS styling
            console.log('Applying font family:', command.value);
            applyFontFamily(command.value || 'Arial');
          } else {
            document.execCommand(command.name, false, command.value || '');
          }
          break;
        case 'media':
          if (command.name === 'insertImage') {
            setShowImageModal(true);
          }
          break;
        default:
          break;
      }
    } catch (err) {
      console.warn('Command failed:', command, err);
    }

    handleContentChange();
    updateCurrentStyles();
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editorRef.current) return;

    const reader = new FileReader();
    reader.onload = () => {
      const img = document.createElement('img');
      img.src = reader.result as string;
      img.alt = file.name;
      editorRef.current?.appendChild(img);
      handleContentChange();
    };
    reader.readAsDataURL(file);
  };

  const convertToMarkdown = (html: string): string => {
    const temp = document.createElement('div');
    temp.innerHTML = DOMPurify.sanitize(html);
    let markdown = '';

    const processNode = (node: Node) => {
      switch (node.nodeType) {
        case Node.TEXT_NODE:
          markdown += node.textContent;
          break;
        case Node.ELEMENT_NODE:
          const el = node as HTMLElement;
          switch (el.tagName.toLowerCase()) {
            case 'p': markdown += '\n\n'; el.childNodes.forEach(processNode); break;
            case 'strong':
            case 'b': markdown += '**'; el.childNodes.forEach(processNode); markdown += '**'; break;
            case 'em':
            case 'i': markdown += '_'; el.childNodes.forEach(processNode); markdown += '_'; break;
            case 'h1': markdown += '# '; el.childNodes.forEach(processNode); markdown += '\n\n'; break;
            case 'h2': markdown += '## '; el.childNodes.forEach(processNode); markdown += '\n\n'; break;
            case 'h3': markdown += '### '; el.childNodes.forEach(processNode); markdown += '\n\n'; break;
            case 'h4': markdown += '#### '; el.childNodes.forEach(processNode); markdown += '\n\n'; break;
            case 'h5': markdown += '##### '; el.childNodes.forEach(processNode); markdown += '\n\n'; break;
            case 'h6': markdown += '###### '; el.childNodes.forEach(processNode); markdown += '\n\n'; break;
            case 'ul': el.childNodes.forEach(n => { if (n.nodeName === 'LI') { markdown += '* '; n.childNodes.forEach(processNode); markdown += '\n'; }}); break;
            case 'ol': Array.from(el.childNodes).forEach((n, i) => { if (n.nodeName === 'LI') { markdown += `${i + 1}. `; n.childNodes.forEach(processNode); markdown += '\n'; }}); break;
            case 'a': markdown += `[${el.textContent}](${(el as HTMLAnchorElement).href})`; break;
            case 'img': 
              const imgEl = el as HTMLImageElement;
              markdown += `\n\n![${imgEl.alt || 'Image'}](${imgEl.src})\n\n`; 
              break;
            case 'code': markdown += '`'; el.childNodes.forEach(processNode); markdown += '`'; break;
            case 'pre': markdown += '```\n'; el.childNodes.forEach(processNode); markdown += '\n```'; break;
            case 'blockquote': markdown += '> '; el.childNodes.forEach(processNode); markdown += '\n\n'; break;
            default: el.childNodes.forEach(processNode);
          }
          break;
      }
    };

    temp.childNodes.forEach(processNode);
    return markdown.trim().replace(/\n{3,}/g, '\n\n');
  };

  const editorComponent = (
    <div
      ref={editorRef}
      contentEditable
      suppressContentEditableWarning
      tabIndex={0}
      className={`
        h-full p-8 outline-none transition-all duration-300
        ${mode === 'markdown' 
          ? 'font-mono text-sm leading-relaxed bg-gray-50/50' 
          : 'prose prose-lg max-w-none bg-white/50'
        } 
        wysiwyg-editor-content
        focus:bg-white/80 focus:shadow-inner
        selection:bg-blue-100/60 selection:text-blue-900
        overflow-y-auto overflow-x-hidden
      `}
      onInput={handleContentChange}
      onPaste={handlePaste}
      onMouseUp={() => updateCurrentStyles()}
      onKeyUp={() => updateCurrentStyles()}
      onKeyDown={handleKeyDown}
      style={{
        whiteSpace: 'pre-wrap',
        wordWrap: 'break-word',
        overflowWrap: 'break-word',
        direction: 'ltr',
        unicodeBidi: 'embed',
        scrollbarWidth: 'thin',
        scrollbarColor: '#e2e8f0 #f8fafc',
        lineHeight: mode === 'markdown' ? '1.6' : '1.7',
        letterSpacing: mode === 'markdown' ? '0.01em' : '0.005em'
      }}
    />
  );

  return (
    <div 
      className="group relative bg-gradient-to-br from-white via-slate-50/30 to-white rounded-3xl shadow-[0_20px_60px_-12px_rgba(0,0,0,0.08)] border border-slate-200/60 overflow-hidden transition-all duration-500 hover:shadow-[0_32px_80px_-12px_rgba(0,0,0,0.12)] hover:border-slate-300/80 hover:-translate-y-0.5 backdrop-blur-sm flex flex-col"
      style={{ height }}
    >
      {/* Modern background pattern with subtle grain */}
      <div 
        className="absolute inset-0 opacity-[0.015] mix-blend-overlay" 
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.4'/%3E%3C/svg%3E")`
        }}
      />
      
      {/* Top accent gradient */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />
      
      {/* Corner highlights for premium feel */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-blue-500/5 to-transparent rounded-full -translate-x-16 -translate-y-16" />
      <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-purple-500/5 to-transparent rounded-full translate-x-16 translate-y-16" />
      
      <Toolbar 
        onCommand={executeCommand}
        currentStyles={currentStyles}
        mode={mode}
        onModeChange={setMode}
      />
      <div className="flex-1 min-h-0">
        <SplitView
          editor={editorComponent}
          preview={<div className="prose prose-lg max-w-none p-4 h-full overflow-y-auto" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(marked(markdownContent) as string) }} />}
          mode={mode}
        />
      </div>
      
      {/* Bottom accent gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-purple-500/40 to-transparent" />
      
      <ImageUploadModal
        isOpen={showImageModal}
        onClose={() => setShowImageModal(false)}
        onImageInsert={handleImageInsert}
      />
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleImageUpload}
        style={{ display: 'none' }}
      />
    </div>
  );
};

export default WYSIWYGEditor; 