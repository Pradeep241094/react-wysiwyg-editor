# WYSIWYG Editor Troubleshooting Guide

This guide helps you diagnose and fix common issues with the WYSIWYG editor.

## Table of Contents

1. [Common Issues](#common-issues)
2. [Browser Compatibility](#browser-compatibility)
3. [Performance Issues](#performance-issues)
4. [Content Issues](#content-issues)
5. [Styling Problems](#styling-problems)
6. [Integration Issues](#integration-issues)
7. [Accessibility Issues](#accessibility-issues)
8. [Development Issues](#development-issues)
9. [Debugging Tips](#debugging-tips)
10. [Getting Help](#getting-help)

## Common Issues

### Editor Not Rendering

**Problem**: The editor component doesn't appear on the page.

**Possible Causes & Solutions**:

1. **Missing CSS imports**
   ```tsx
   // Make sure you import the CSS file
   import './styles/editor.css';
   ```

2. **Component not properly imported**
   ```tsx
   // Correct import
   import { WYSIWYGEditor } from './components/WYSIWYGEditor';
   
   // Not this
   import WYSIWYGEditor from './components/WYSIWYGEditor';
   ```

3. **Missing React dependencies**
   ```bash
   npm install react react-dom
   ```

4. **TypeScript errors preventing compilation**
   - Check the browser console for compilation errors
   - Ensure all TypeScript types are properly imported

### Toolbar Buttons Not Working

**Problem**: Clicking toolbar buttons doesn't apply formatting.

**Possible Causes & Solutions**:

1. **Focus issues**
   - The editor must be focused for commands to work
   - Check if `editorRef.current` is properly set
   - Ensure focus is restored after toolbar clicks

2. **Browser compatibility**
   ```javascript
   // Check if execCommand is supported
   if (!document.execCommand) {
     console.warn('execCommand not supported in this browser');
   }
   ```

3. **Selection issues**
   ```javascript
   // Debug selection state
   const selection = window.getSelection();
   console.log('Selection:', selection?.toString());
   console.log('Range count:', selection?.rangeCount);
   ```

4. **Command execution errors**
   ```javascript
   // Add error handling to command execution
   try {
     const success = document.execCommand(command, false, value);
     if (!success) {
       console.warn(`Command ${command} failed`);
     }
   } catch (error) {
     console.error('Command execution error:', error);
   }
   ```

### Content Not Updating

**Problem**: Changes in the editor don't trigger the `onChange` callback.

**Possible Causes & Solutions**:

1. **Event listener issues**
   ```tsx
   // Ensure proper event listeners are attached
   useEffect(() => {
     const editor = editorRef.current;
     if (!editor) return;

     const handleInput = () => {
       onChange(editor.innerHTML);
     };

     editor.addEventListener('input', handleInput);
     return () => editor.removeEventListener('input', handleInput);
   }, [onChange]);
   ```

2. **React state updates**
   ```tsx
   // Use functional updates for state
   const [content, setContent] = useState('');
   
   const handleChange = useCallback((newContent: string) => {
     setContent(prevContent => {
       if (prevContent !== newContent) {
         return newContent;
       }
       return prevContent;
     });
   }, []);
   ```

3. **Controlled vs uncontrolled components**
   ```tsx
   // Make sure you're handling controlled updates properly
   useEffect(() => {
     if (editorRef.current && editorRef.current.innerHTML !== content) {
       editorRef.current.innerHTML = content;
     }
   }, [content]);
   ```

### Paste Functionality Issues

**Problem**: Pasted content doesn't appear or appears with unwanted formatting.

**Possible Causes & Solutions**:

1. **Content sanitization too strict**
   ```javascript
   // Check sanitization rules
   const ALLOWED_TAGS = ['p', 'br', 'strong', 'em', 'u', 'h1', 'h2', 'h3', 'ul', 'ol', 'li', 'a'];
   
   // Add more tags if needed
   const EXTENDED_TAGS = [...ALLOWED_TAGS, 'span', 'div'];
   ```

2. **Paste event not handled**
   ```tsx
   const handlePaste = (e: ClipboardEvent) => {
     e.preventDefault();
     const text = e.clipboardData?.getData('text/plain');
     const html = e.clipboardData?.getData('text/html');
     
     // Process and insert content
     const sanitized = sanitizeContent(html || text);
     document.execCommand('insertHTML', false, sanitized);
   };
   ```

3. **Browser security restrictions**
   - Some browsers restrict clipboard access
   - Test in different browsers
   - Provide fallback for manual paste

## Browser Compatibility

### Internet Explorer Issues

**Problem**: Editor doesn't work in older browsers.

**Solutions**:
1. **Check browser support**
   ```javascript
   const isSupported = () => {
     return (
       'contentEditable' in document.createElement('div') &&
       typeof document.execCommand === 'function'
     );
   };
   
   if (!isSupported()) {
     // Show fallback textarea
     return <textarea />;
   }
   ```

2. **Polyfills for older browsers**
   ```javascript
   // Add polyfills for missing features
   if (!window.getSelection) {
     // Add selection polyfill
   }
   ```

### Safari-Specific Issues

**Problem**: Different behavior in Safari browser.

**Solutions**:
1. **WebKit-specific CSS**
   ```css
   .wysiwyg-editable {
     -webkit-user-select: text;
     -webkit-user-modify: read-write-plaintext-only;
   }
   ```

2. **Safari execCommand quirks**
   ```javascript
   // Safari sometimes needs different approaches
   const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
   
   if (isSafari && command === 'insertHTML') {
     // Use alternative method for Safari
   }
   ```

### Mobile Browser Issues

**Problem**: Editor doesn't work well on mobile devices.

**Solutions**:
1. **Touch event handling**
   ```css
   .wysiwyg-editable {
     touch-action: manipulation;
   }
   ```

2. **Virtual keyboard issues**
   ```javascript
   // Handle virtual keyboard appearance
   const handleResize = () => {
     if (window.visualViewport) {
       // Adjust editor height
     }
   };
   
   window.visualViewport?.addEventListener('resize', handleResize);
   ```

## Performance Issues

### Slow Typing Response

**Problem**: Editor becomes sluggish with large documents.

**Solutions**:
1. **Debounce content updates**
   ```javascript
   const debouncedUpdate = useMemo(() => 
     debounce((content: string) => {
       onChange(content);
     }, 300), [onChange]
   );
   ```

2. **Optimize DOM operations**
   ```javascript
   // Batch DOM updates
   const updateContent = (content: string) => {
     requestAnimationFrame(() => {
       if (editorRef.current) {
         editorRef.current.innerHTML = content;
       }
     });
   };
   ```

3. **Limit content length**
   ```javascript
   const MAX_CONTENT_LENGTH = 50000; // characters
   
   const handleContentChange = (content: string) => {
     if (content.length > MAX_CONTENT_LENGTH) {
       alert('Content too long. Please reduce the length.');
       return;
     }
     onChange(content);
   };
   ```

### Memory Leaks

**Problem**: Memory usage increases over time.

**Solutions**:
1. **Clean up event listeners**
   ```tsx
   useEffect(() => {
     const editor = editorRef.current;
     if (!editor) return;

     const handlers = {
       input: handleInput,
       paste: handlePaste,
       keydown: handleKeyDown
     };

     Object.entries(handlers).forEach(([event, handler]) => {
       editor.addEventListener(event, handler);
     });

     return () => {
       Object.entries(handlers).forEach(([event, handler]) => {
         editor.removeEventListener(event, handler);
       });
     };
   }, []);
   ```

2. **Clear timers and intervals**
   ```javascript
   useEffect(() => {
     const timer = setInterval(() => {
       // Auto-save logic
     }, 5000);

     return () => clearInterval(timer);
   }, []);
   ```

## Content Issues

### Formatting Lost on Save/Load

**Problem**: Rich text formatting disappears when content is saved and reloaded.

**Solutions**:
1. **Proper HTML serialization**
   ```javascript
   // Save HTML content, not plain text
   const saveContent = () => {
     const htmlContent = editorRef.current?.innerHTML;
     localStorage.setItem('content', htmlContent || '');
   };
   
   const loadContent = () => {
     const htmlContent = localStorage.getItem('content');
     if (htmlContent && editorRef.current) {
       editorRef.current.innerHTML = htmlContent;
     }
   };
   ```

2. **Content validation**
   ```javascript
   const validateHTML = (html: string) => {
     // Check if HTML is valid
     const parser = new DOMParser();
     const doc = parser.parseFromString(html, 'text/html');
     return !doc.querySelector('parsererror');
   };
   ```

### Unwanted HTML Tags

**Problem**: Editor generates unwanted HTML tags or attributes.

**Solutions**:
1. **Strict content sanitization**
   ```javascript
   const sanitizeContent = (html: string) => {
     const allowedTags = ['p', 'br', 'strong', 'em', 'u', 'h1', 'h2', 'h3', 'ul', 'ol', 'li', 'a'];
     const allowedAttributes = {
       'a': ['href', 'title']
     };
     
     // Remove unwanted tags and attributes
     return cleanHTML(html, allowedTags, allowedAttributes);
   };
   ```

2. **Normalize content on save**
   ```javascript
   const normalizeContent = (html: string) => {
     // Remove empty paragraphs
     html = html.replace(/<p><\/p>/g, '');
     
     // Remove unnecessary attributes
     html = html.replace(/style="[^"]*"/g, '');
     
     return html;
   };
   ```

### List Navigation Issues

**Problem**: Enter key doesn't work properly in lists.

**Solutions**:
1. **Custom list handling**
   ```javascript
   const handleKeyDown = (e: KeyboardEvent) => {
     if (e.key === 'Enter') {
       const selection = window.getSelection();
       const range = selection?.getRangeAt(0);
       const listItem = range?.startContainer.parentElement?.closest('li');
       
       if (listItem) {
         e.preventDefault();
         // Custom list item creation logic
       }
     }
   };
   ```

2. **List exit handling**
   ```javascript
   const handleDoubleEnter = (e: KeyboardEvent) => {
     if (e.key === 'Enter' && lastKeyWasEnter) {
       const listItem = getParentListItem();
       if (listItem && listItem.textContent?.trim() === '') {
         e.preventDefault();
         exitList();
       }
     }
     setLastKeyWasEnter(e.key === 'Enter');
   };
   ```

## Styling Problems

### CSS Conflicts

**Problem**: Editor styles conflict with existing page styles.

**Solutions**:
1. **CSS specificity**
   ```css
   /* Use more specific selectors */
   .wysiwyg-editor .wysiwyg-editable p {
     margin: 0 0 1em 0;
   }
   
   /* Or use CSS modules */
   .editor :global(.wysiwyg-editable) {
     /* styles */
   }
   ```

2. **CSS isolation**
   ```css
   /* Create a CSS namespace */
   .wysiwyg-container {
     /* Reset styles within editor */
     * {
       box-sizing: border-box;
     }
   }
   ```

3. **CSS-in-JS solution**
   ```tsx
   const editorStyles = {
     container: {
       border: '1px solid #ccc',
       borderRadius: '4px',
       // ... other styles
     }
   };
   
   <div style={editorStyles.container}>
     <WYSIWYGEditor />
   </div>
   ```

### Responsive Design Issues

**Problem**: Editor doesn't work well on different screen sizes.

**Solutions**:
1. **Responsive toolbar**
   ```css
   @media (max-width: 768px) {
     .wysiwyg-toolbar {
       flex-wrap: wrap;
     }
     
     .wysiwyg-toolbar-button {
       min-width: 44px; /* Touch target size */
       min-height: 44px;
     }
   }
   ```

2. **Flexible editor height**
   ```css
   .wysiwyg-editable {
     min-height: 200px;
     max-height: 60vh;
     overflow-y: auto;
   }
   ```

## Integration Issues

### React State Management

**Problem**: Editor state doesn't sync with React component state.

**Solutions**:
1. **Controlled component pattern**
   ```tsx
   const [content, setContent] = useState('');
   
   // Sync editor content with React state
   useEffect(() => {
     if (editorRef.current && editorRef.current.innerHTML !== content) {
       editorRef.current.innerHTML = content;
     }
   }, [content]);
   ```

2. **Use refs for immediate updates**
   ```tsx
   const contentRef = useRef(content);
   contentRef.current = content;
   
   const handleChange = useCallback((newContent: string) => {
     if (contentRef.current !== newContent) {
       setContent(newContent);
     }
   }, []);
   ```

### Form Integration

**Problem**: Editor content doesn't submit with forms.

**Solutions**:
1. **Hidden input field**
   ```tsx
   <form onSubmit={handleSubmit}>
     <WYSIWYGEditor onChange={setContent} />
     <input type="hidden" name="content" value={content} />
     <button type="submit">Submit</button>
   </form>
   ```

2. **Form data handling**
   ```javascript
   const handleSubmit = (e: FormEvent) => {
     e.preventDefault();
     const formData = new FormData();
     formData.append('content', content);
     // Submit form data
   };
   ```

### Server-Side Rendering (SSR)

**Problem**: Editor doesn't work with SSR frameworks like Next.js.

**Solutions**:
1. **Dynamic imports**
   ```tsx
   import dynamic from 'next/dynamic';
   
   const WYSIWYGEditor = dynamic(
     () => import('./components/WYSIWYGEditor'),
     { ssr: false }
   );
   ```

2. **Client-side only rendering**
   ```tsx
   const [isClient, setIsClient] = useState(false);
   
   useEffect(() => {
     setIsClient(true);
   }, []);
   
   return (
     <div>
       {isClient ? (
         <WYSIWYGEditor />
       ) : (
         <div>Loading editor...</div>
       )}
     </div>
   );
   ```

## Accessibility Issues

### Screen Reader Support

**Problem**: Screen readers don't announce formatting changes.

**Solutions**:
1. **ARIA live regions**
   ```tsx
   <div aria-live="polite" aria-atomic="true" className="sr-only">
     {formatAnnouncement}
   </div>
   ```

2. **Descriptive button labels**
   ```tsx
   <button
     aria-label="Apply bold formatting to selected text"
     aria-pressed={activeFormats.has('bold')}
   >
     B
   </button>
   ```

### Keyboard Navigation

**Problem**: Users can't navigate the editor with keyboard only.

**Solutions**:
1. **Proper tab order**
   ```tsx
   <div className="wysiwyg-editor">
     <div className="wysiwyg-toolbar" role="toolbar">
       {buttons.map((button, index) => (
         <button key={button.command} tabIndex={0}>
           {button.icon}
         </button>
       ))}
     </div>
     <div 
       className="wysiwyg-editable"
       contentEditable
       tabIndex={0}
     />
   </div>
   ```

2. **Keyboard shortcuts**
   ```javascript
   const handleKeyDown = (e: KeyboardEvent) => {
     if (e.ctrlKey || e.metaKey) {
       switch (e.key) {
         case 'b':
           e.preventDefault();
           executeCommand('bold');
           break;
         case 'i':
           e.preventDefault();
           executeCommand('italic');
           break;
       }
     }
   };
   ```

## Development Issues

### TypeScript Errors

**Problem**: TypeScript compilation errors.

**Solutions**:
1. **Proper type definitions**
   ```typescript
   // Make sure all interfaces are properly defined
   interface WYSIWYGEditorProps {
     initialContent?: string;
     placeholder?: string;
     onChange?: (content: string) => void;
     onFocus?: () => void;
     onBlur?: () => void;
   }
   ```

2. **DOM type assertions**
   ```typescript
   const editor = editorRef.current as HTMLDivElement;
   const selection = window.getSelection() as Selection;
   ```

### Build Issues

**Problem**: Build fails or produces errors.

**Solutions**:
1. **Check dependencies**
   ```bash
   npm ls
   npm audit
   npm update
   ```

2. **Clear build cache**
   ```bash
   rm -rf node_modules
   rm package-lock.json
   npm install
   ```

3. **Check for circular dependencies**
   ```bash
   npx madge --circular src/
   ```

## Debugging Tips

### Enable Debug Mode

Add debugging to your editor:

```tsx
const DEBUG = process.env.NODE_ENV === 'development';

const debugLog = (message: string, data?: any) => {
  if (DEBUG) {
    console.log(`[WYSIWYG Debug] ${message}`, data);
  }
};

// Use throughout your code
debugLog('Content changed', newContent);
debugLog('Command executed', { command, value, success });
```

### Browser Developer Tools

1. **Console debugging**
   ```javascript
   // Check editor state
   console.log('Editor element:', editorRef.current);
   console.log('Selection:', window.getSelection());
   console.log('Active formats:', activeFormats);
   ```

2. **DOM inspection**
   - Right-click on editor → Inspect Element
   - Check for proper HTML structure
   - Verify CSS classes are applied

3. **Network tab**
   - Check if CSS files are loading
   - Verify API calls for content saving

### Common Debug Commands

```javascript
// Check if editor is focused
document.activeElement === editorRef.current

// Get current selection
window.getSelection()?.toString()

// Check command support
document.queryCommandSupported('bold')

// Get command state
document.queryCommandState('bold')

// Get command value
document.queryCommandValue('formatBlock')
```

## Getting Help

### Before Asking for Help

1. **Check browser console** for error messages
2. **Test in different browsers** to isolate browser-specific issues
3. **Create a minimal reproduction** of the problem
4. **Check this troubleshooting guide** for similar issues

### Information to Include

When reporting issues, include:

- Browser and version
- Operating system
- React version
- Complete error messages
- Steps to reproduce
- Expected vs actual behavior
- Minimal code example

### Resources

- **Browser compatibility**: [Can I Use - contentEditable](https://caniuse.com/contenteditable)
- **MDN Documentation**: [contentEditable](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/contentEditable)
- **React Documentation**: [React Hooks](https://reactjs.org/docs/hooks-intro.html)

### Performance Monitoring

```javascript
// Monitor performance
const measurePerformance = (name: string, fn: Function) => {
  const start = performance.now();
  const result = fn();
  const end = performance.now();
  console.log(`${name} took ${end - start} milliseconds`);
  return result;
};

// Usage
measurePerformance('Content update', () => {
  setContent(newContent);
});
```

Remember: Most issues can be resolved by checking the browser console, verifying proper imports, and ensuring event handlers are correctly attached. When in doubt, start with a minimal example and gradually add complexity.