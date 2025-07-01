import React, { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Toolbar from './Toolbar';
import SplitView from './SplitView';
import ImageUploadModal from './ImageUploadModal';
import type { EditorProps, EditorStyles, EditorCommand, EditorMode } from '../types/editor';
import { marked } from 'marked';
import DOMPurify from 'dompurify';

const WYSIWYGEditor: React.FC<EditorProps> = ({
  initialContent = '',
  onChange,
  mode: initialMode = 'wysiwyg',
  height = '400px'
}) => {
  const navigate = useNavigate();
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
  const forceUpdateToolbarState = () => {
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
  };

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
  }, [mode, markdownContent]);

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
  }, []); // Run only once on mount

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
      onChange(html, markdown);
    } else {
      const markdown = editorRef.current.textContent || '';
      setMarkdownContent(markdown);
      const htmlContent = await marked.parse(markdown);
      onChange(htmlContent, markdown);
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
      '14pt': '14pt',  // 18.67px
      '15pt': '14pt',  // Close to 20px
      '16pt': '16pt',  // 21.33px
    };
    
    if (fontSizeMap[fontSizeInPt]) {
      fontSizeInPt = fontSizeMap[fontSizeInPt];
    }

    // Get font family, removing quotes and taking first family
    let fontFamily = computedStyle.fontFamily.replace(/['"]/g, '');
    fontFamily = fontFamily.split(',')[0].trim();
    
    // Map common system fonts to our dropdown options
    const fontMap: { [key: string]: string } = {
      'system-ui': 'Inter',
      '-apple-system': 'SF Pro Display',
      'BlinkMacSystemFont': 'Inter',
      'Segoe UI': 'Inter',
      'Roboto': 'Inter',
      'Helvetica Neue': 'Helvetica',
      'Arial': 'Arial',
      'sans-serif': 'Inter'
    };
    
    if (fontMap[fontFamily]) {
      fontFamily = fontMap[fontFamily];
    }

    // Get block element type
    let blockType = 'p';
    let blockElement: HTMLElement | null = currentElement as HTMLElement;
    while (blockElement && blockElement !== editorRef.current) {
      const tagName = blockElement.tagName?.toLowerCase();
      if (['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote', 'pre', 'div'].includes(tagName)) {
        blockType = tagName === 'div' ? 'p' : tagName;
        break;
      }
      blockElement = blockElement.parentElement;
    }

    // Get text color - try multiple approaches
    let textColor = '#000000';
    try {
      const rgbColor = computedStyle.color;
      if (rgbColor && rgbColor !== 'rgba(0, 0, 0, 0)') {
        textColor = rgbToHex(rgbColor);
      }
    } catch (e) {
      // Fallback to query command
      const queryColor = document.queryCommandValue('foreColor');
      if (queryColor && queryColor !== 'false') {
        textColor = queryColor;
      }
    }

    // Debug logging (remove this in production)
    console.log('Font detection:', {
      originalPx: computedStyle.fontSize,
      convertedPt: fontSizeInPt,
      detectedFamily: fontFamily,
      blockType: blockType,
      textColor: textColor,
      element: currentElement
    });

    const newStyles = {
      block: blockType,
      fontSize: fontSizeInPt,
      fontFamily: fontFamily,
      textAlign: computedStyle.textAlign as any,
      color: textColor,
      backgroundColor: document.queryCommandValue('backColor') || 'transparent',
      isBold: document.queryCommandState('bold'),
      isItalic: document.queryCommandState('italic'),
      isUnderline: document.queryCommandState('underline'),
      isStrikethrough: document.queryCommandState('strikethrough'),
    };

    // Only update if there's a meaningful change or it's forced
    const hasSignificantChange = forceUpdate || 
      currentStyles.fontSize !== newStyles.fontSize ||
      currentStyles.fontFamily !== newStyles.fontFamily ||
      currentStyles.color !== newStyles.color ||
      currentStyles.block !== newStyles.block ||
      currentStyles.isBold !== newStyles.isBold ||
      currentStyles.isItalic !== newStyles.isItalic ||
      currentStyles.isUnderline !== newStyles.isUnderline ||
      currentStyles.isStrikethrough !== newStyles.isStrikethrough ||
      currentStyles.textAlign !== newStyles.textAlign;

    if (hasSignificantChange) {
      console.log('Setting toolbar styles:', newStyles);
      setCurrentStyles(newStyles);
    } else {
      console.log('No significant style change detected, preserving current toolbar state');
    }
  };

  // Helper function to convert RGB to hex
  const rgbToHex = (rgb: string): string => {
    const result = rgb.match(/\d+/g);
    if (!result) return '#000000';
    
    const r = parseInt(result[0]);
    const g = parseInt(result[1]);
    const b = parseInt(result[2]);
    
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  };

  // Apply font size using direct CSS styling
  const applyFontSize = (fontSize: string) => {
    if (!editorRef.current) return;
    
    const selection = window.getSelection();
    if (!selection?.rangeCount) return;

    const range = selection.getRangeAt(0);
    
    if (range.collapsed) {
      // No selection - apply to current element or create span
      let currentElement = range.startContainer;
      if (currentElement.nodeType === Node.TEXT_NODE) {
        currentElement = currentElement.parentElement || currentElement;
      }
      
      if (currentElement && currentElement !== editorRef.current) {
        (currentElement as HTMLElement).style.fontSize = fontSize;
      }
    } else {
      // Text is selected - wrap in span with font size
      try {
        const selectedContent = range.extractContents();
        const span = document.createElement('span');
        span.style.fontSize = fontSize;
        span.appendChild(selectedContent);
        range.insertNode(span);
        
        // Restore selection
        const newRange = document.createRange();
        newRange.selectNodeContents(span);
        selection.removeAllRanges();
        selection.addRange(newRange);
      } catch (error) {
        console.warn('Font size application failed:', error);
        // Fallback to execCommand
        document.execCommand('fontSize', false, '3');
        if (selection.rangeCount > 0) {
          const element = selection.getRangeAt(0).commonAncestorContainer;
          if (element.nodeType === Node.ELEMENT_NODE) {
            (element as HTMLElement).style.fontSize = fontSize;
          }
        }
      }
    }
    
    setTimeout(() => {
      updateCurrentStyles(true); // Force update after font size change
      handleContentChange();
    }, 10);
  };

  // Apply font family using direct CSS styling  
  const applyFontFamily = (fontFamily: string) => {
    if (!editorRef.current) return;
    
    const selection = window.getSelection();
    if (!selection?.rangeCount) return;

    const range = selection.getRangeAt(0);
    
    if (range.collapsed) {
      // No selection - apply to current element or create span
      let currentElement = range.startContainer;
      if (currentElement.nodeType === Node.TEXT_NODE) {
        currentElement = currentElement.parentElement || currentElement;
      }
      
      if (currentElement && currentElement !== editorRef.current) {
        (currentElement as HTMLElement).style.fontFamily = fontFamily;
      }
    } else {
      // Text is selected - wrap in span with font family
      try {
        const selectedContent = range.extractContents();
        const span = document.createElement('span');
        span.style.fontFamily = fontFamily;
        span.appendChild(selectedContent);
        range.insertNode(span);
        
        // Restore selection
        const newRange = document.createRange();
        newRange.selectNodeContents(span);
        selection.removeAllRanges();
        selection.addRange(newRange);
      } catch (error) {
        console.warn('Font family application failed:', error);
        // Fallback to execCommand
        document.execCommand('fontName', false, fontFamily);
      }
    }
    
    setTimeout(() => {
      updateCurrentStyles(true); // Force update after font family change
      handleContentChange();
    }, 10);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      
      // Preserve current formatting when creating new paragraphs
      const currentFontFamily = currentStyles.fontFamily;
      const currentFontSize = currentStyles.fontSize;
      const currentColor = currentStyles.color;
      
      // Create new paragraph with inherited styling
      const newParagraph = `<p style="font-family: ${currentFontFamily}; font-size: ${currentFontSize}; color: ${currentColor};"><br></p>`;
      
      document.execCommand('insertHTML', false, newParagraph);
      handleContentChange();
      
      // Don't update current styles immediately - they should remain the same
      setTimeout(() => {
        // Only update if we're in a different context now
        if (document.activeElement === editorRef.current) {
          // Keep the current styles instead of detecting new ones
          console.log('Preserving current styles after Enter key');
        }
      }, 50);
    }
  };

  const handleImageInsert = (imageData: string, altText: string, size: string = 'medium') => {
    if (!editorRef.current) {
      return;
    }

    // Define size-specific styles
    const sizeStyles = {
      small: 'max-width: 300px;',
      medium: 'max-width: 600px;',
      large: 'max-width: 900px;',
      original: 'max-width: 100%;'
    };

    const maxWidthStyle = sizeStyles[size as keyof typeof sizeStyles] || sizeStyles.medium;

    // Focus the editor first
    editorRef.current.focus();

    // Create image HTML string with size-aware styling
    const imgHtml = `<img src="${imageData}" alt="${altText}" style="${maxWidthStyle} height: auto; display: block; margin: 16px auto; border: 2px solid #e2e8f0; border-radius: 12px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); transition: all 0.3s ease;" onmouseover="this.style.borderColor='#cbd5e0'; this.style.transform='translateY(-1px)'; this.style.boxShadow='0 10px 15px -3px rgba(0, 0, 0, 0.1)';" onmouseout="this.style.borderColor='#e2e8f0'; this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 6px -1px rgba(0, 0, 0, 0.1)';">`;

    try {
      // Use execCommand to insert HTML at cursor position
      const success = document.execCommand('insertHTML', false, imgHtml + '<p><br></p>');
      
      if (!success) {
        // Fallback: direct innerHTML manipulation
        const selection = window.getSelection();
        if (selection && selection.rangeCount > 0) {
          const range = selection.getRangeAt(0);
          const imgElement = document.createElement('div');
          imgElement.innerHTML = imgHtml + '<p><br></p>';
          
          range.deleteContents();
          range.insertNode(imgElement.firstChild!);
          range.insertNode(imgElement.lastChild!);
        } else {
          // Last resort: append to end
          editorRef.current.innerHTML += imgHtml + '<p><br></p>';
        }
      }
    } catch (error) {
      console.error('Error inserting image:', error);
      // Final fallback
      editorRef.current.innerHTML += imgHtml + '<p><br></p>';
    }

    // Trigger content change to update markdown and parent component
    setTimeout(() => {
      handleContentChange();
      updateCurrentStyles(true); // Force update after image insertion
    }, 100);
  };

  const executeCommand = (command: EditorCommand) => {
    if (!editorRef.current || mode === 'markdown') return;
    editorRef.current.focus();

    try {
      switch (command.type) {
        case 'block': {
          // For block commands, ensure we're working with the current block element
          const selection = window.getSelection();
          if (selection && selection.rangeCount > 0) {
            const range = selection.getRangeAt(0);
            let currentElement = range.commonAncestorContainer;
            
            // Find the current block element
            while (currentElement && currentElement !== editorRef.current) {
              if (currentElement.nodeType === Node.ELEMENT_NODE) {
                const tagName = (currentElement as HTMLElement).tagName?.toLowerCase();
                if (['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote', 'pre', 'div'].includes(tagName)) {
                  // Replace the current block element with the new one
                  const newElement = document.createElement(command.value || 'p');
                  newElement.innerHTML = (currentElement as HTMLElement).innerHTML;
                  if (currentElement.parentNode) {
                    currentElement.parentNode.replaceChild(newElement, currentElement);
                  }
                  
                  // Set cursor position in the new element
                  const newRange = document.createRange();
                  newRange.selectNodeContents(newElement);
                  newRange.collapse(false);
                  selection.removeAllRanges();
                  selection.addRange(newRange);
                  
                  handleContentChange();
                  updateCurrentStyles(true); // Force update after block format change
                  return;
                }
              }
              if (!currentElement.parentNode) break;
              currentElement = currentElement.parentNode;
            }
          }
          
          // Fallback to default behavior
          document.execCommand('formatBlock', false, `<${command.value}>`);
          break;
        }
        case 'inline':
        case 'list':
        case 'align':
        case 'indent':
        case 'special':
                if (command.name === 'preview') {
        // Store current content and navigate to preview
        sessionStorage.setItem('editor-mode', mode);
        navigate(`/preview?mode=${mode}`);
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
