# Toolbar Configuration Guide

The WYSIWYG Editor supports comprehensive toolbar customization through the `toolbarConfig` prop. This allows you to create tailored editing experiences by controlling which buttons are displayed, how they're organized, and their order.

## Table of Contents

- [Quick Start](#quick-start)
- [Configuration Interface](#configuration-interface)
- [Presets](#presets)
- [Categories](#categories)
- [Individual Buttons](#individual-buttons)
- [Configuration Patterns](#configuration-patterns)
- [Advanced Usage](#advanced-usage)
- [Migration Guide](#migration-guide)
- [Troubleshooting](#troubleshooting)
- [Performance Considerations](#performance-considerations)

## Quick Start

### Basic Usage

```tsx
import { WYSIWYGEditor } from "@prmargas/react-wysiwyg-editor";

// Minimal toolbar with only basic formatting
<WYSIWYGEditor 
  toolbarConfig={{ preset: 'minimal' }}
  placeholder="Start typing..."
/>

// Custom button selection
<WYSIWYGEditor 
  toolbarConfig={{
    include: {
      buttons: ['bold', 'italic', 'h1', 'h2', 'bulletList', 'link']
    }
  }}
  placeholder="Custom toolbar..."
/>
```

## Configuration Interface

The toolbar configuration is defined by the `ToolbarConfig` interface:

```typescript
interface ToolbarConfig {
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

interface ToolbarGroup {
  name: string;
  buttons: ToolbarButtonType[];
}
```

### Configuration Processing Order

The configuration is processed in the following order:

1. **Default**: Start with empty button set
2. **Preset**: Apply preset if specified
3. **Include**: Add specified categories, buttons, and groups
4. **Exclude**: Remove specified categories and buttons (takes precedence)
5. **Order**: Arrange buttons according to specified order
6. **Fallback**: If no buttons remain, use full preset

## Presets

Presets provide quick access to common toolbar configurations:

### `minimal`
Basic text formatting only.

**Includes**: `bold`, `italic`, `underline`

```tsx
<WYSIWYGEditor toolbarConfig={{ preset: 'minimal' }} />
```

### `standard`
Common editing features for most use cases.

**Includes**: `bold`, `italic`, `underline`, `h1`, `h2`, `h3`, `bulletList`, `numberedList`, `link`, `image`

```tsx
<WYSIWYGEditor toolbarConfig={{ preset: 'standard' }} />
```

### `full`
All available toolbar buttons.

**Includes**: All 35+ available buttons across all categories.

```tsx
<WYSIWYGEditor toolbarConfig={{ preset: 'full' }} />
```

## Categories

Categories group related functionality for easy configuration:

### `formatting`
Text styling and formatting options.

**Buttons**: `bold`, `italic`, `underline`, `strikethrough`, `subscript`, `superscript`

```tsx
<WYSIWYGEditor 
  toolbarConfig={{
    include: { categories: ['formatting'] }
  }} 
/>
```

### `structure`
Document structure and headings.

**Buttons**: `h1`, `h2`, `h3`, `h4`, `h5`, `h6`

```tsx
<WYSIWYGEditor 
  toolbarConfig={{
    include: { categories: ['structure'] }
  }} 
/>
```

### `lists`
List creation and indentation.

**Buttons**: `bulletList`, `numberedList`, `indent`, `outdent`

```tsx
<WYSIWYGEditor 
  toolbarConfig={{
    include: { categories: ['lists'] }
  }} 
/>
```

### `alignment`
Text alignment options.

**Buttons**: `alignLeft`, `alignCenter`, `alignRight`, `alignJustify`

```tsx
<WYSIWYGEditor 
  toolbarConfig={{
    include: { categories: ['alignment'] }
  }} 
/>
```

### `media`
Media insertion and tables.

**Buttons**: `image`, `file`, `table`

```tsx
<WYSIWYGEditor 
  toolbarConfig={{
    include: { categories: ['media'] }
  }} 
/>
```

### `links`
Link management.

**Buttons**: `link`, `unlink`

```tsx
<WYSIWYGEditor 
  toolbarConfig={{
    include: { categories: ['links'] }
  }} 
/>
```

### `advanced`
Advanced formatting and utility features.

**Buttons**: `fontColor`, `backgroundColor`, `fontSize`, `fontFamily`, `specialChar`, `horizontalRule`, `findReplace`, `sourceCode`, `fullscreen`, `print`, `undo`, `redo`, `removeFormat`

```tsx
<WYSIWYGEditor 
  toolbarConfig={{
    include: { categories: ['advanced'] }
  }} 
/>
```

## Individual Buttons

All available toolbar buttons:

### Text Formatting
- `bold` - Bold text
- `italic` - Italic text  
- `underline` - Underlined text
- `strikethrough` - Strikethrough text
- `subscript` - Subscript text
- `superscript` - Superscript text
- `removeFormat` - Remove all formatting

### Document Structure
- `h1` - Heading 1
- `h2` - Heading 2
- `h3` - Heading 3
- `h4` - Heading 4
- `h5` - Heading 5
- `h6` - Heading 6

### Lists and Indentation
- `bulletList` - Bullet point list
- `numberedList` - Numbered list
- `indent` - Increase indentation
- `outdent` - Decrease indentation

### Text Alignment
- `alignLeft` - Align text left
- `alignCenter` - Center text
- `alignRight` - Align text right
- `alignJustify` - Justify text

### Media and Content
- `image` - Insert image
- `file` - Upload file
- `table` - Insert table

### Links
- `link` - Create link
- `unlink` - Remove link

### Advanced Formatting
- `fontColor` - Text color
- `backgroundColor` - Background color
- `fontSize` - Font size
- `fontFamily` - Font family
- `specialChar` - Special characters
- `horizontalRule` - Horizontal line

### Utilities
- `findReplace` - Find and replace
- `sourceCode` - View source code
- `fullscreen` - Fullscreen mode
- `print` - Print document
- `undo` - Undo action
- `redo` - Redo action

## Configuration Patterns

### Pattern 1: Preset-Based Configuration

Use presets for quick setup:

```tsx
// Minimal editor for comments
<WYSIWYGEditor toolbarConfig={{ preset: 'minimal' }} />

// Standard editor for most content
<WYSIWYGEditor toolbarConfig={{ preset: 'standard' }} />

// Full-featured editor
<WYSIWYGEditor toolbarConfig={{ preset: 'full' }} />
```

### Pattern 2: Category-Based Configuration

Include entire categories of functionality:

```tsx
// Blog editor with formatting and structure
<WYSIWYGEditor 
  toolbarConfig={{
    include: {
      categories: ['formatting', 'structure', 'lists', 'links']
    }
  }} 
/>

// Simple editor without media
<WYSIWYGEditor 
  toolbarConfig={{
    include: {
      categories: ['formatting', 'structure']
    }
  }} 
/>
```

### Pattern 3: Custom Button Selection

Pick specific buttons for precise control:

```tsx
// Email editor
<WYSIWYGEditor 
  toolbarConfig={{
    include: {
      buttons: [
        'bold', 'italic', 'underline',
        'bulletList', 'numberedList',
        'link', 'fontColor'
      ]
    }
  }} 
/>

// Note-taking editor
<WYSIWYGEditor 
  toolbarConfig={{
    include: {
      buttons: [
        'bold', 'italic', 'h1', 'h2', 'h3',
        'bulletList', 'numberedList'
      ]
    }
  }} 
/>
```

### Pattern 4: Exclusion-Based Configuration

Start with a preset and remove unwanted features:

```tsx
// Full editor without media buttons
<WYSIWYGEditor 
  toolbarConfig={{
    preset: 'full',
    exclude: {
      categories: ['media']
    }
  }} 
/>

// Standard editor without advanced formatting
<WYSIWYGEditor 
  toolbarConfig={{
    preset: 'standard',
    exclude: {
      buttons: ['subscript', 'superscript']
    }
  }} 
/>
```

### Pattern 5: Mixed Configuration

Combine multiple approaches:

```tsx
// Blog editor with custom additions
<WYSIWYGEditor 
  toolbarConfig={{
    include: {
      categories: ['formatting', 'structure', 'lists'],
      buttons: ['image', 'link', 'undo', 'redo']
    },
    exclude: {
      buttons: ['subscript', 'superscript']
    }
  }} 
/>
```

### Pattern 6: Custom Groups

Organize buttons into custom groups with separators:

```tsx
<WYSIWYGEditor 
  toolbarConfig={{
    include: {
      groups: [
        {
          name: 'basic-formatting',
          buttons: ['bold', 'italic', 'underline']
        },
        {
          name: 'headings',
          buttons: ['h1', 'h2', 'h3']
        },
        {
          name: 'lists',
          buttons: ['bulletList', 'numberedList']
        }
      ]
    }
  }} 
/>
```

### Pattern 7: Custom Ordering

Control the exact order of buttons:

```tsx
<WYSIWYGEditor 
  toolbarConfig={{
    include: {
      buttons: ['bold', 'italic', 'underline', 'h1', 'h2', 'bulletList']
    },
    order: [
      'h1', 'h2',           // Headings first
      'bold', 'italic',     // Then formatting
      'bulletList',         // Lists last
      'underline'           // Underline at the end
    ]
  }} 
/>
```

## Advanced Usage

### Dynamic Configuration

Change toolbar configuration based on user preferences or context:

```tsx
function DynamicEditor() {
  const [userLevel, setUserLevel] = useState<'beginner' | 'advanced'>('beginner');
  
  const configs = {
    beginner: { preset: 'minimal' },
    advanced: { preset: 'full' }
  };

  return (
    <div>
      <select onChange={(e) => setUserLevel(e.target.value as any)}>
        <option value="beginner">Beginner</option>
        <option value="advanced">Advanced</option>
      </select>
      
      <WYSIWYGEditor 
        toolbarConfig={configs[userLevel]}
        placeholder="Start typing..."
      />
    </div>
  );
}
```

### Context-Aware Configuration

Different configurations for different content types:

```tsx
function ContextAwareEditor({ contentType }: { contentType: 'blog' | 'comment' | 'email' }) {
  const configs = {
    blog: {
      include: {
        categories: ['formatting', 'structure', 'lists', 'media', 'links'],
        buttons: ['undo', 'redo']
      }
    },
    comment: {
      include: {
        buttons: ['bold', 'italic', 'link']
      }
    },
    email: {
      include: {
        categories: ['formatting', 'lists'],
        buttons: ['link', 'fontColor']
      },
      exclude: {
        buttons: ['subscript', 'superscript']
      }
    }
  };

  return (
    <WYSIWYGEditor 
      toolbarConfig={configs[contentType]}
      placeholder={`Enter your ${contentType}...`}
    />
  );
}
```

### Using with Basic Toolbar Component

For custom implementations using the basic Toolbar component:

```tsx
import { Toolbar } from "@prmargas/react-wysiwyg-editor";
import { ToolbarConfigResolver } from "@prmargas/react-wysiwyg-editor";

function CustomEditor() {
  const config = {
    include: {
      buttons: ['bold', 'italic', 'h1', 'h2']
    }
  };

  // Resolve the configuration
  const resolvedConfig = ToolbarConfigResolver.resolve(config);

  const handleCommand = (command: string, value?: string) => {
    // Handle toolbar commands
    console.log('Command:', command, value);
  };

  return (
    <div>
      <Toolbar
        onCommand={handleCommand}
        activeFormats={new Set()}
        canUndo={false}
        canRedo={false}
        toolbarConfig={resolvedConfig}
      />
      {/* Your custom editable area */}
    </div>
  );
}
```

## Migration Guide

### From No Configuration (v0.0.2 and earlier)

**Before:**
```tsx
<WYSIWYGEditor placeholder="Start typing..." />
```

**After (Backward Compatible):**
```tsx
// No changes needed - all buttons still shown by default
<WYSIWYGEditor placeholder="Start typing..." />

// Or explicitly use full preset
<WYSIWYGEditor 
  toolbarConfig={{ preset: 'full' }}
  placeholder="Start typing..." 
/>
```

### Migrating to Simplified Toolbars

**Before (showing all buttons):**
```tsx
<WYSIWYGEditor placeholder="Start typing..." />
```

**After (minimal toolbar):**
```tsx
<WYSIWYGEditor 
  toolbarConfig={{ preset: 'minimal' }}
  placeholder="Start typing..." 
/>
```

### Migrating Custom Toolbar Logic

If you previously had custom logic to show/hide buttons, you can now use the configuration:

**Before (hypothetical custom logic):**
```tsx
<WYSIWYGEditor 
  showImageButton={false}
  showTableButton={false}
  placeholder="Start typing..." 
/>
```

**After:**
```tsx
<WYSIWYGEditor 
  toolbarConfig={{
    preset: 'full',
    exclude: {
      buttons: ['image', 'table']
    }
  }}
  placeholder="Start typing..." 
/>
```

### Breaking Changes

**None** - The toolbar configuration feature is fully backward compatible. Existing code will continue to work without changes.

## Troubleshooting

### Common Issues

#### 1. No Buttons Showing

**Problem**: Toolbar appears empty or with no buttons.

**Causes & Solutions**:

```tsx
// ❌ Empty configuration results in no buttons
<WYSIWYGEditor toolbarConfig={{}} />

// ✅ Use a preset or include specific buttons
<WYSIWYGEditor toolbarConfig={{ preset: 'minimal' }} />

// ❌ Excluding everything
<WYSIWYGEditor 
  toolbarConfig={{
    preset: 'full',
    exclude: { categories: ['formatting', 'structure', 'lists', 'alignment', 'media', 'links', 'advanced'] }
  }} 
/>

// ✅ Don't exclude everything
<WYSIWYGEditor 
  toolbarConfig={{
    preset: 'full',
    exclude: { categories: ['media'] }
  }} 
/>
```

#### 2. Invalid Button Names

**Problem**: Console warnings about invalid button names.

**Solution**: Check button names against the [available buttons list](#individual-buttons).

```tsx
// ❌ Invalid button name
<WYSIWYGEditor 
  toolbarConfig={{
    include: { buttons: ['bold', 'italic', 'invalid-button'] }
  }} 
/>

// ✅ Valid button names only
<WYSIWYGEditor 
  toolbarConfig={{
    include: { buttons: ['bold', 'italic', 'underline'] }
  }} 
/>
```

#### 3. Unexpected Button Order

**Problem**: Buttons don't appear in the expected order.

**Solution**: Use the `order` property for explicit ordering:

```tsx
// ❌ Default category-based ordering
<WYSIWYGEditor 
  toolbarConfig={{
    include: { buttons: ['bulletList', 'bold', 'h1', 'italic'] }
  }} 
/>

// ✅ Explicit ordering
<WYSIWYGEditor 
  toolbarConfig={{
    include: { buttons: ['bulletList', 'bold', 'h1', 'italic'] },
    order: ['bold', 'italic', 'h1', 'bulletList']
  }} 
/>
```

#### 4. Configuration Not Taking Effect

**Problem**: Changes to `toolbarConfig` don't appear to work.

**Causes & Solutions**:

```tsx
// ❌ Object reference doesn't change
const [config] = useState({ preset: 'minimal' });
// Later: config.preset = 'full'; // This won't trigger re-render

// ✅ Create new object reference
const [config, setConfig] = useState({ preset: 'minimal' });
// Later: setConfig({ preset: 'full' });

// ❌ Mutating nested objects
const [config, setConfig] = useState({
  include: { buttons: ['bold', 'italic'] }
});
// Later: config.include.buttons.push('underline'); // Won't trigger re-render

// ✅ Create new nested objects
setConfig({
  include: { buttons: ['bold', 'italic', 'underline'] }
});
```

### Debugging Tips

#### 1. Check Console Warnings

The toolbar configuration system provides helpful warnings:

```javascript
// Enable console warnings in development
console.warn('Invalid button "invalid-button" ignored');
console.warn('Invalid category "invalid-category" ignored');
```

#### 2. Inspect Resolved Configuration

Use the resolver directly to debug configurations:

```tsx
import { ToolbarConfigResolver } from "@prmargas/react-wysiwyg-editor";

const config = {
  include: { buttons: ['bold', 'italic', 'invalid-button'] }
};

const resolved = ToolbarConfigResolver.resolve(config);
console.log('Enabled buttons:', Array.from(resolved.enabledButtons));
console.log('Groups:', resolved.groups);
```

#### 3. Validate Configuration

Create a helper function to validate configurations:

```tsx
function validateConfig(config: ToolbarConfig) {
  const resolved = ToolbarConfigResolver.resolve(config);
  
  if (resolved.enabledButtons.size === 0) {
    console.warn('Configuration results in no buttons');
  }
  
  if (resolved.groups.length === 0) {
    console.warn('Configuration results in no groups');
  }
  
  return resolved;
}

// Use in development
const config = { preset: 'minimal' };
const resolved = validateConfig(config);
```

### Performance Issues

#### 1. Frequent Configuration Changes

**Problem**: Performance issues when configuration changes frequently.

**Solution**: The system includes automatic caching, but you can optimize further:

```tsx
// ❌ Creating new config object on every render
function Editor() {
  const config = { preset: 'minimal' }; // New object every render
  return <WYSIWYGEditor toolbarConfig={config} />;
}

// ✅ Stable config reference
const MINIMAL_CONFIG = { preset: 'minimal' };

function Editor() {
  return <WYSIWYGEditor toolbarConfig={MINIMAL_CONFIG} />;
}

// ✅ Memoized dynamic config
function Editor({ userLevel }: { userLevel: string }) {
  const config = useMemo(() => ({
    preset: userLevel === 'beginner' ? 'minimal' : 'full'
  }), [userLevel]);
  
  return <WYSIWYGEditor toolbarConfig={config} />;
}
```

#### 2. Complex Configurations

**Problem**: Large, complex configurations causing performance issues.

**Solution**: Simplify configurations and use caching:

```tsx
// ❌ Overly complex configuration
const complexConfig = {
  include: {
    categories: ['formatting', 'structure'],
    buttons: ['image', 'link'],
    groups: [
      { name: 'group1', buttons: ['bold', 'italic'] },
      { name: 'group2', buttons: ['h1', 'h2'] },
      // ... many more groups
    ]
  },
  exclude: {
    buttons: ['subscript', 'superscript']
  },
  order: [/* complex ordering */]
};

// ✅ Simplified configuration
const simpleConfig = {
  include: {
    categories: ['formatting', 'structure'],
    buttons: ['image', 'link']
  }
};
```

## Performance Considerations

### Automatic Caching

The toolbar configuration system includes automatic caching:

- **Configuration Resolution**: Resolved configurations are cached to prevent reprocessing
- **Cache Size**: Limited to 100 entries with LRU eviction
- **Cache Keys**: Generated from configuration content for accurate cache hits

### Memory Management

```tsx
import { ToolbarConfigResolver } from "@prmargas/react-wysiwyg-editor";

// Clear cache if needed (rarely necessary)
ToolbarConfigResolver.clearCache();

// Check cache statistics
const stats = ToolbarConfigResolver.getCacheStats();
console.log(`Cache: ${stats.size}/${stats.maxSize} entries`);
```

### Best Practices

1. **Use Stable References**: Avoid creating new configuration objects on every render
2. **Prefer Simple Configurations**: Use presets and categories over complex custom configurations
3. **Memoize Dynamic Configurations**: Use `useMemo` for configurations that depend on props or state
4. **Avoid Frequent Changes**: Minimize configuration changes during user interaction

### Performance Monitoring

```tsx
function PerformanceMonitoredEditor({ config }: { config: ToolbarConfig }) {
  const resolvedConfig = useMemo(() => {
    const start = performance.now();
    const result = ToolbarConfigResolver.resolve(config);
    const end = performance.now();
    
    if (end - start > 10) {
      console.warn(`Slow toolbar config resolution: ${end - start}ms`);
    }
    
    return result;
  }, [config]);

  return <WYSIWYGEditor toolbarConfig={config} />;
}
```

---

## Summary

The toolbar configuration system provides powerful customization capabilities while maintaining backward compatibility and performance. Use presets for quick setup, categories for logical grouping, and individual buttons for precise control. The system handles validation, caching, and error recovery automatically, making it robust for production use.

For additional examples and interactive demos, see the [examples file](toolbar-config-examples.tsx) and the demo application.