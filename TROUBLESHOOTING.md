# Troubleshooting Guide

This guide helps you resolve common issues with the WYSIWYG Editor, including the new toolbar configuration system.

## Table of Contents

- [Toolbar Configuration Issues](#toolbar-configuration-issues)
- [General Editor Issues](#general-editor-issues)
- [Performance Issues](#performance-issues)
- [Integration Issues](#integration-issues)
- [Browser Compatibility](#browser-compatibility)
- [Development Issues](#development-issues)

## Toolbar Configuration Issues

### Empty Toolbar

**Problem**: Toolbar appears with no buttons after adding `toolbarConfig`.

**Symptoms**:
- Toolbar container is visible but empty
- No buttons render in the toolbar area

**Causes & Solutions**:

1. **Empty Configuration Object**
   ```tsx
   // ❌ Problem: Empty config results in no buttons
   <WYSIWYGEditor toolbarConfig={{}} />
   
   // ✅ Solution: Use a preset or include buttons
   <WYSIWYGEditor toolbarConfig={{ preset: 'minimal' }} />
   ```

2. **Excluding Everything**
   ```tsx
   // ❌ Problem: Excluding all categories
   <WYSIWYGEditor 
     toolbarConfig={{
       preset: 'full',
       exclude: { 
         categories: ['formatting', 'structure', 'lists', 'alignment', 'media', 'links', 'advanced'] 
       }
     }} 
   />
   
   // ✅ Solution: Don't exclude everything
   <WYSIWYGEditor 
     toolbarConfig={{
       preset: 'full',
       exclude: { categories: ['media'] }
     }} 
   />
   ```

3. **Invalid Button Names**
   ```tsx
   // ❌ Problem: All button names are invalid
   <WYSIWYGEditor 
     toolbarConfig={{
       include: { buttons: ['invalid1', 'invalid2'] }
     }} 
   />
   
   // ✅ Solution: Use valid button names
   <WYSIWYGEditor 
     toolbarConfig={{
       include: { buttons: ['bold', 'italic', 'underline'] }
     }} 
   />
   ```

**Debugging Steps**:
1. Check browser console for warnings
2. Verify button names against documentation
3. Test with a simple preset first
4. Use the resolver to inspect configuration:

```tsx
import { ToolbarConfigResolver } from "@prmargas/react-wysiwyg-editor";

const config = { /* your config */ };
const resolved = ToolbarConfigResolver.resolve(config);
console.log('Enabled buttons:', Array.from(resolved.enabledButtons));
console.log('Groups:', resolved.groups);
```

### Invalid Button/Category Warnings

**Problem**: Console shows warnings about invalid buttons or categories.

**Symptoms**:
- Console warnings: `Invalid button "xyz" ignored`
- Console warnings: `Invalid category "xyz" ignored`
- Some expected buttons don't appear

**Solution**: Check names against the valid lists:

**Valid Categories**:
- `formatting`, `structure`, `lists`, `alignment`, `media`, `links`, `advanced`

**Valid Buttons**:
- **Formatting**: `bold`, `italic`, `underline`, `strikethrough`, `subscript`, `superscript`
- **Structure**: `h1`, `h2`, `h3`, `h4`, `h5`, `h6`
- **Lists**: `bulletList`, `numberedList`, `indent`, `outdent`
- **Alignment**: `alignLeft`, `alignCenter`, `alignRight`, `alignJustify`
- **Media**: `image`, `file`, `table`
- **Links**: `link`, `unlink`
- **Advanced**: `fontColor`, `backgroundColor`, `fontSize`, `fontFamily`, `specialChar`, `horizontalRule`, `findReplace`, `sourceCode`, `fullscreen`, `print`, `undo`, `redo`, `removeFormat`

```tsx
// ❌ Invalid names
<WYSIWYGEditor 
  toolbarConfig={{
    include: { 
      categories: ['text-formatting'], // Invalid
      buttons: ['make-bold', 'make-italic'] // Invalid
    }
  }} 
/>

// ✅ Valid names
<WYSIWYGEditor 
  toolbarConfig={{
    include: { 
      categories: ['formatting'], // Valid
      buttons: ['bold', 'italic'] // Valid
    }
  }} 
/>
```

### Configuration Not Taking Effect

**Problem**: Changes to `toolbarConfig` don't appear in the UI.

**Symptoms**:
- Toolbar doesn't update when configuration changes
- Same buttons appear regardless of configuration

**Causes & Solutions**:

1. **Object Reference Not Changing**
   ```tsx
   // ❌ Problem: Mutating existing object
   const [config, setConfig] = useState({ preset: 'minimal' });
   
   // This won't trigger re-render:
   const changeConfig = () => {
     config.preset = 'full';
   };
   
   // ✅ Solution: Create new object reference
   const changeConfig = () => {
     setConfig({ preset: 'full' });
   };
   ```

2. **Nested Object Mutation**
   ```tsx
   // ❌ Problem: Mutating nested objects
   const [config, setConfig] = useState({
     include: { buttons: ['bold', 'italic'] }
   });
   
   // This won't trigger re-render:
   const addButton = () => {
     config.include.buttons.push('underline');
   };
   
   // ✅ Solution: Create new nested objects
   const addButton = () => {
     setConfig({
       include: { 
         buttons: [...config.include.buttons, 'underline'] 
       }
     });
   };
   ```

3. **Memoization Issues**
   ```tsx
   // ❌ Problem: Over-memoization
   const config = useMemo(() => ({ preset: 'minimal' }), []); // Never updates
   
   // ✅ Solution: Proper dependencies
   const config = useMemo(() => ({ 
     preset: userLevel === 'beginner' ? 'minimal' : 'full' 
   }), [userLevel]);
   ```

### Unexpected Button Order

**Problem**: Buttons don't appear in the expected order.

**Symptoms**:
- Buttons appear in different order than specified
- Related buttons are separated

**Causes & Solutions**:

1. **Default Category-Based Ordering**
   ```tsx
   // ❌ Problem: Buttons grouped by category, not input order
   <WYSIWYGEditor 
     toolbarConfig={{
       include: { buttons: ['bulletList', 'bold', 'h1', 'italic'] }
     }} 
   />
   // Results in: [bold, italic] [h1] [bulletList] (grouped by category)
   
   // ✅ Solution: Use explicit ordering
   <WYSIWYGEditor 
     toolbarConfig={{
       include: { buttons: ['bulletList', 'bold', 'h1', 'italic'] },
       order: ['bulletList', 'bold', 'h1', 'italic']
     }} 
   />
   ```

2. **Custom Groups for Better Control**
   ```tsx
   // ✅ Solution: Use custom groups
   <WYSIWYGEditor 
     toolbarConfig={{
       include: {
         groups: [
           { name: 'primary', buttons: ['bold', 'italic'] },
           { name: 'structure', buttons: ['h1', 'bulletList'] }
         ]
       }
     }} 
   />
   ```

### Performance Issues with Configuration

**Problem**: Slow rendering or frequent re-processing of toolbar configuration.

**Symptoms**:
- Slow editor initialization
- Laggy toolbar updates
- High CPU usage during configuration changes

**Solutions**:

1. **Memoize Configuration Objects**
   ```tsx
   // ❌ Problem: New object every render
   function Editor({ userLevel }) {
     const config = { preset: userLevel === 'beginner' ? 'minimal' : 'full' };
     return <WYSIWYGEditor toolbarConfig={config} />;
   }
   
   // ✅ Solution: Memoize configuration
   function Editor({ userLevel }) {
     const config = useMemo(() => ({
       preset: userLevel === 'beginner' ? 'minimal' : 'full'
     }), [userLevel]);
     
     return <WYSIWYGEditor toolbarConfig={config} />;
   }
   ```

2. **Use Stable References**
   ```tsx
   // ❌ Problem: New object every render
   function Editor() {
     return <WYSIWYGEditor toolbarConfig={{ preset: 'minimal' }} />;
   }
   
   // ✅ Solution: Stable reference
   const MINIMAL_CONFIG = { preset: 'minimal' };
   
   function Editor() {
     return <WYSIWYGEditor toolbarConfig={MINIMAL_CONFIG} />;
   }
   ```

3. **Simplify Complex Configurations**
   ```tsx
   // ❌ Problem: Overly complex configuration
   const complexConfig = {
     include: {
       groups: [
         { name: 'group1', buttons: ['bold'] },
         { name: 'group2', buttons: ['italic'] },
         // ... many small groups
       ]
     },
     order: [/* complex ordering */]
   };
   
   // ✅ Solution: Simplified configuration
   const simpleConfig = {
     include: {
       categories: ['formatting', 'structure']
     }
   };
   ```

## General Editor Issues

### Content Not Updating

**Problem**: Editor content doesn't update when `initialContent` changes.

**Solution**: The `initialContent` prop only sets the initial value. Use a key to force re-initialization:

```tsx
// ❌ Problem: initialContent doesn't update
<WYSIWYGEditor initialContent={content} />

// ✅ Solution: Use key to force re-initialization
<WYSIWYGEditor 
  key={contentId} 
  initialContent={content} 
/>

// ✅ Better: Control content externally
const [editorContent, setEditorContent] = useState(content);

useEffect(() => {
  setEditorContent(content);
}, [content]);

<WYSIWYGEditor 
  initialContent={editorContent}
  onChange={setEditorContent}
/>
```

### Styling Issues

**Problem**: Editor doesn't look right or styles are missing.

**Solutions**:

1. **Import Styles**
   ```tsx
   // Make sure to import styles
   import "@prmargas/react-wysiwyg-editor/styles";
   ```

2. **CSS Conflicts**
   ```css
   /* Check for conflicting CSS */
   .wysiwyg-editor {
     /* Your custom styles */
   }
   
   /* Ensure specificity */
   .my-app .wysiwyg-editor {
     /* More specific styles */
   }
   ```

3. **Height Issues**
   ```tsx
   // Set explicit height if needed
   <WYSIWYGEditor 
     height="300px"
     // or
     height={300}
   />
   ```

### Focus/Blur Issues

**Problem**: Focus and blur events not working correctly.

**Solutions**:

1. **Check Event Handlers**
   ```tsx
   <WYSIWYGEditor 
     onFocus={() => console.log('Focused')}
     onBlur={() => console.log('Blurred')}
   />
   ```

2. **Programmatic Focus**
   ```tsx
   const editorRef = useRef();
   
   const focusEditor = () => {
     // Focus the editor programmatically
     const editableArea = editorRef.current?.querySelector('[contenteditable]');
     editableArea?.focus();
   };
   ```

## Performance Issues

### Slow Initialization

**Problem**: Editor takes a long time to initialize.

**Solutions**:

1. **Optimize Toolbar Configuration**
   ```tsx
   // Use presets instead of complex configurations
   <WYSIWYGEditor toolbarConfig={{ preset: 'standard' }} />
   ```

2. **Lazy Loading**
   ```tsx
   const LazyEditor = lazy(() => import('./EditorComponent'));
   
   function App() {
     return (
       <Suspense fallback={<div>Loading editor...</div>}>
         <LazyEditor />
       </Suspense>
     );
   }
   ```

### Memory Leaks

**Problem**: Memory usage increases over time.

**Solutions**:

1. **Clear Cache When Needed**
   ```tsx
   import { ToolbarConfigResolver } from "@prmargas/react-wysiwyg-editor";
   
   // Clear cache on unmount if needed
   useEffect(() => {
     return () => {
       ToolbarConfigResolver.clearCache();
     };
   }, []);
   ```

2. **Avoid Creating New Objects**
   ```tsx
   // ❌ Creates new objects
   const config = { preset: 'minimal' };
   
   // ✅ Reuse objects
   const CONFIGS = {
     minimal: { preset: 'minimal' },
     standard: { preset: 'standard' }
   };
   ```

## Integration Issues

### React Hook Form

**Problem**: Editor doesn't work with React Hook Form.

**Solution**:
```tsx
import { Controller } from 'react-hook-form';

<Controller
  name="content"
  control={control}
  render={({ field }) => (
    <WYSIWYGEditor
      initialContent={field.value || ''}
      onChange={field.onChange}
      onBlur={field.onBlur}
    />
  )}
/>
```

### Next.js SSR Issues

**Problem**: Editor doesn't work with server-side rendering.

**Solution**:
```tsx
import dynamic from 'next/dynamic';

const WYSIWYGEditor = dynamic(
  () => import('@prmargas/react-wysiwyg-editor').then(mod => mod.WYSIWYGEditor),
  { ssr: false }
);
```

### TypeScript Issues

**Problem**: TypeScript errors with editor props.

**Solutions**:

1. **Import Types**
   ```tsx
   import { 
     WYSIWYGEditor, 
     WYSIWYGEditorProps,
     ToolbarConfig 
   } from "@prmargas/react-wysiwyg-editor";
   ```

2. **Type Configuration**
   ```tsx
   const config: ToolbarConfig = {
     preset: 'minimal'
   };
   ```

## Browser Compatibility

### Internet Explorer

**Problem**: Editor doesn't work in Internet Explorer.

**Solution**: Internet Explorer is not supported. Use a modern browser or polyfills.

### Safari Issues

**Problem**: Specific issues in Safari.

**Solutions**:

1. **ContentEditable Issues**
   ```css
   /* Add Safari-specific styles */
   .editable-area {
     -webkit-user-select: text;
   }
   ```

2. **Focus Issues**
   ```tsx
   // Handle Safari focus differently
   const handleFocus = () => {
     if (navigator.userAgent.includes('Safari')) {
       // Safari-specific focus handling
     }
   };
   ```

## Development Issues

### Hot Reload Issues

**Problem**: Editor state lost during development hot reload.

**Solution**:
```tsx
// Preserve editor state during development
const [content, setContent] = useState(() => {
  if (process.env.NODE_ENV === 'development') {
    return localStorage.getItem('editor-content') || '';
  }
  return '';
});

useEffect(() => {
  if (process.env.NODE_ENV === 'development') {
    localStorage.setItem('editor-content', content);
  }
}, [content]);
```

### Testing Issues

**Problem**: Editor doesn't work in tests.

**Solutions**:

1. **Mock the Editor**
   ```tsx
   // In test setup
   jest.mock('@prmargas/react-wysiwyg-editor', () => ({
     WYSIWYGEditor: ({ onChange, initialContent }) => (
       <textarea 
         data-testid="wysiwyg-editor"
         defaultValue={initialContent}
         onChange={(e) => onChange?.(e.target.value)}
       />
     )
   }));
   ```

2. **Use Testing Library**
   ```tsx
   import { render, screen } from '@testing-library/react';
   
   test('editor renders', () => {
     render(<WYSIWYGEditor placeholder="Test editor" />);
     expect(screen.getByPlaceholderText('Test editor')).toBeInTheDocument();
   });
   ```

## Debug Mode

### Enable Debug Logging

```tsx
// Enable debug mode in development
if (process.env.NODE_ENV === 'development') {
  // Check cache statistics
  const stats = ToolbarConfigResolver.getCacheStats();
  console.log('Toolbar cache stats:', stats);
  
  // Log configuration resolution
  const config = { preset: 'minimal' };
  const resolved = ToolbarConfigResolver.resolve(config);
  console.log('Resolved config:', resolved);
}
```

### Performance Monitoring

```tsx
function PerformanceMonitor({ children }) {
  useEffect(() => {
    const observer = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        if (entry.name.includes('wysiwyg')) {
          console.log('Performance entry:', entry);
        }
      });
    });
    
    observer.observe({ entryTypes: ['measure'] });
    
    return () => observer.disconnect();
  }, []);
  
  return children;
}
```

---

## Getting Help

If you're still experiencing issues:

1. **Check the Console**: Look for error messages and warnings
2. **Minimal Reproduction**: Create a minimal example that reproduces the issue
3. **Check Documentation**: Review the configuration guide and examples
4. **Update Dependencies**: Ensure you're using the latest version
5. **Browser DevTools**: Use React DevTools to inspect component state

For additional support:
- Review the [configuration guide](TOOLBAR_CONFIGURATION.md)
- Check the [examples](TOOLBAR_EXAMPLES.md)
- See the [migration guide](MIGRATION_GUIDE.md) for upgrade issues