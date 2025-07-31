# Migration Guide: Toolbar Configuration

This guide helps you migrate to the new toolbar configuration system introduced in version 0.0.3. The new system is **fully backward compatible**, so existing code will continue to work without changes.

## Table of Contents

- [What's New](#whats-new)
- [Backward Compatibility](#backward-compatibility)
- [Migration Scenarios](#migration-scenarios)
- [Breaking Changes](#breaking-changes)
- [Step-by-Step Migration](#step-by-step-migration)
- [Common Migration Patterns](#common-migration-patterns)
- [Troubleshooting](#troubleshooting)

## What's New

### New Features in v0.0.3

1. **Toolbar Configuration**: Control which buttons are displayed
2. **Presets**: Quick access to common toolbar layouts (`minimal`, `standard`, `full`)
3. **Categories**: Group buttons by functionality for easy configuration
4. **Custom Groups**: Organize buttons with visual separators
5. **Button Ordering**: Control the exact order of toolbar buttons
6. **Include/Exclude Logic**: Fine-grained control over button visibility

### New Props

```tsx
interface WYSIWYGEditorProps {
  // ... existing props
  toolbarConfig?: ToolbarConfig; // NEW: Configure toolbar buttons
  height?: string | number; // NEW: Set editor height
}
```

### New Types

```tsx
// New configuration interface
interface ToolbarConfig {
  preset?: "minimal" | "standard" | "full";
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
```

## Backward Compatibility

### ✅ No Breaking Changes

The toolbar configuration system is **100% backward compatible**:

```tsx
// This code from v0.0.2 works exactly the same in v0.0.3+
<WYSIWYGEditor
  initialContent="<p>Hello world</p>"
  placeholder="Start typing..."
  onChange={handleChange}
/>
```

### Default Behavior

- **Without `toolbarConfig`**: All buttons are shown (same as before)
- **With `toolbarConfig`**: Only specified buttons are shown
- **All existing props**: Continue to work as before
- **All existing components**: No changes required

## Migration Scenarios

### Scenario 1: No Changes Needed

If you're happy with the current full toolbar, no migration is needed.

```tsx
// Before (v0.0.2)
<WYSIWYGEditor placeholder="Start typing..." />

// After (v0.0.3+) - No changes needed
<WYSIWYGEditor placeholder="Start typing..." />
```

### Scenario 2: Simplify the Toolbar

If you want a simpler toolbar, add the `toolbarConfig` prop.

```tsx
// Before (v0.0.2) - All buttons shown
<WYSIWYGEditor placeholder="Start typing..." />

// After (v0.0.3+) - Only basic formatting
<WYSIWYGEditor
  toolbarConfig={{ preset: 'minimal' }}
  placeholder="Start typing..."
/>
```

### Scenario 3: Custom Button Selection

If you need specific buttons only.

```tsx
// Before (v0.0.2) - All buttons shown
<WYSIWYGEditor placeholder="Comment here..." />

// After (v0.0.3+) - Only comment-relevant buttons
<WYSIWYGEditor
  toolbarConfig={{
    include: {
      buttons: ['bold', 'italic', 'link']
    }
  }}
  placeholder="Comment here..."
/>
```

### Scenario 4: Remove Unwanted Features

If you want most features but need to remove some.

```tsx
// Before (v0.0.2) - All buttons shown
<WYSIWYGEditor placeholder="Write your post..." />

// After (v0.0.3+) - All buttons except media
<WYSIWYGEditor
  toolbarConfig={{
    preset: 'full',
    exclude: {
      categories: ['media']
    }
  }}
  placeholder="Write your post..."
/>
```

## Breaking Changes

### ❌ None

There are **no breaking changes** in this release. All existing code continues to work.

### Future Considerations

While there are no breaking changes now, consider these for future-proofing:

1. **Explicit Configuration**: Consider explicitly setting `toolbarConfig` even if you want all buttons
2. **Type Safety**: Import and use the new TypeScript types for better development experience
3. **Performance**: The new system includes caching optimizations

## Step-by-Step Migration

### Step 1: Update Package

```bash
npm update @prmargas/react-wysiwyg-editor
```

### Step 2: Test Existing Code

Your existing code should work without changes. Test to confirm:

```tsx
// This should work exactly as before
<WYSIWYGEditor
  initialContent={content}
  onChange={setContent}
  placeholder="Start typing..."
/>
```

### Step 3: Add Toolbar Configuration (Optional)

Only if you want to customize the toolbar:

```tsx
// Add toolbar configuration
<WYSIWYGEditor
  initialContent={content}
  onChange={setContent}
  toolbarConfig={{ preset: "standard" }} // NEW
  placeholder="Start typing..."
/>
```

### Step 4: Import New Types (Optional)

For better TypeScript support:

```tsx
import {
  WYSIWYGEditor,
  ToolbarConfig, // NEW
  ToolbarCategory, // NEW
  ToolbarButtonType, // NEW
} from "@prmargas/react-wysiwyg-editor";

const config: ToolbarConfig = {
  preset: "standard",
};

<WYSIWYGEditor
  toolbarConfig={config}
  // ... other props
/>;
```

### Step 5: Optimize for Your Use Case

Choose the configuration that best fits your needs:

```tsx
// For blog posts
const blogConfig: ToolbarConfig = {
  include: {
    categories: ["formatting", "structure", "lists", "media", "links"],
  },
};

// For comments
const commentConfig: ToolbarConfig = {
  include: {
    buttons: ["bold", "italic", "link"],
  },
};

// For documentation
const docsConfig: ToolbarConfig = {
  include: {
    categories: ["formatting", "structure", "lists"],
    buttons: ["link", "image", "table"],
  },
};
```

## Common Migration Patterns

### Pattern 1: Progressive Enhancement

Start with your existing setup and gradually add configuration:

```tsx
// Week 1: No changes
<WYSIWYGEditor placeholder="Start typing..." />

// Week 2: Add preset
<WYSIWYGEditor
  toolbarConfig={{ preset: 'standard' }}
  placeholder="Start typing..."
/>

// Week 3: Fine-tune configuration
<WYSIWYGEditor
  toolbarConfig={{
    preset: 'standard',
    exclude: { buttons: ['subscript', 'superscript'] }
  }}
  placeholder="Start typing..."
/>
```

### Pattern 2: Context-Based Migration

Different configurations for different parts of your app:

```tsx
// Before: Same editor everywhere
function BlogEditor() {
  return <WYSIWYGEditor placeholder="Write your post..." />;
}

function CommentEditor() {
  return <WYSIWYGEditor placeholder="Add a comment..." />;
}

// After: Context-appropriate configurations
function BlogEditor() {
  return (
    <WYSIWYGEditor
      toolbarConfig={{
        include: {
          categories: ["formatting", "structure", "lists", "media", "links"],
        },
      }}
      placeholder="Write your post..."
    />
  );
}

function CommentEditor() {
  return (
    <WYSIWYGEditor
      toolbarConfig={{
        include: {
          buttons: ["bold", "italic", "link"],
        },
      }}
      placeholder="Add a comment..."
    />
  );
}
```

### Pattern 3: User Preference Migration

Allow users to choose their preferred toolbar:

```tsx
// Before: Fixed toolbar
function Editor() {
  return <WYSIWYGEditor placeholder="Start typing..." />;
}

// After: User-configurable toolbar
function Editor() {
  const [toolbarLevel, setToolbarLevel] = useState("standard");

  const configs = {
    minimal: { preset: "minimal" },
    standard: { preset: "standard" },
    full: { preset: "full" },
  };

  return (
    <div>
      <select onChange={(e) => setToolbarLevel(e.target.value)}>
        <option value="minimal">Simple</option>
        <option value="standard">Standard</option>
        <option value="full">Advanced</option>
      </select>

      <WYSIWYGEditor
        toolbarConfig={configs[toolbarLevel]}
        placeholder="Start typing..."
      />
    </div>
  );
}
```

### Pattern 4: Feature Flag Migration

Gradually roll out toolbar customization:

```tsx
// Before: Fixed toolbar
function Editor() {
  return <WYSIWYGEditor placeholder="Start typing..." />;
}

// After: Feature flag controlled
function Editor() {
  const { isToolbarConfigEnabled } = useFeatureFlags();

  const toolbarConfig = isToolbarConfigEnabled
    ? { preset: "standard" }
    : undefined; // Falls back to full toolbar

  return (
    <WYSIWYGEditor
      toolbarConfig={toolbarConfig}
      placeholder="Start typing..."
    />
  );
}
```

## Troubleshooting

### Issue 1: Toolbar Appears Empty

**Problem**: After adding `toolbarConfig`, no buttons appear.

**Solution**: Ensure you're including buttons or using a preset:

```tsx
// ❌ Empty configuration
<WYSIWYGEditor toolbarConfig={{}} />

// ✅ Use a preset
<WYSIWYGEditor toolbarConfig={{ preset: 'minimal' }} />

// ✅ Or include specific buttons
<WYSIWYGEditor
  toolbarConfig={{
    include: { buttons: ['bold', 'italic'] }
  }}
/>
```

### Issue 2: TypeScript Errors

**Problem**: TypeScript errors with new types.

**Solution**: Import the new types:

```tsx
// ❌ Type error
const config = { preset: "minimal" };

// ✅ Proper typing
import { ToolbarConfig } from "@prmargas/react-wysiwyg-editor";

const config: ToolbarConfig = { preset: "minimal" };
```

### Issue 3: Configuration Not Taking Effect

**Problem**: Changes to `toolbarConfig` don't appear.

**Solution**: Ensure object reference changes:

```tsx
// ❌ Mutating existing object
const [config, setConfig] = useState({ preset: "minimal" });
// Later: config.preset = 'full'; // Won't trigger re-render

// ✅ Create new object
setConfig({ preset: "full" });
```

### Issue 4: Performance Issues

**Problem**: Slow rendering with complex configurations.

**Solution**: Memoize configurations:

```tsx
// ❌ New object every render
function Editor({ userLevel }) {
  const config = { preset: userLevel === "beginner" ? "minimal" : "full" };
  return <WYSIWYGEditor toolbarConfig={config} />;
}

// ✅ Memoized configuration
function Editor({ userLevel }) {
  const config = useMemo(
    () => ({
      preset: userLevel === "beginner" ? "minimal" : "full",
    }),
    [userLevel]
  );

  return <WYSIWYGEditor toolbarConfig={config} />;
}
```

### Issue 5: Console Warnings

**Problem**: Warnings about invalid buttons or categories.

**Solution**: Check button names against the documentation:

```tsx
// ❌ Invalid button name
<WYSIWYGEditor
  toolbarConfig={{
    include: { buttons: ['bold', 'italic', 'invalid-button'] }
  }}
/>

// ✅ Valid button names
<WYSIWYGEditor
  toolbarConfig={{
    include: { buttons: ['bold', 'italic', 'underline'] }
  }}
/>
```

## Migration Checklist

### Pre-Migration

- [ ] Update to latest version
- [ ] Test existing functionality
- [ ] Review current toolbar usage
- [ ] Identify customization needs

### During Migration

- [ ] Add `toolbarConfig` prop where needed
- [ ] Import new TypeScript types
- [ ] Test each configuration change
- [ ] Update documentation/comments

### Post-Migration

- [ ] Test all editor instances
- [ ] Verify performance is acceptable
- [ ] Update user documentation
- [ ] Consider user feedback

### Optional Enhancements

- [ ] Add user preference controls
- [ ] Implement context-aware configurations
- [ ] Add feature flags for gradual rollout
- [ ] Optimize configurations for mobile

---

## Summary

The toolbar configuration system is designed to be:

- **Backward Compatible**: No breaking changes
- **Progressive**: Adopt features gradually
- **Flexible**: Support various use cases
- **Performant**: Built-in caching and optimization

You can migrate at your own pace, starting with simple presets and moving to more complex configurations as needed. The system is designed to grow with your application's needs while maintaining excellent performance and user experience.

For more examples and detailed documentation, see:

- [TOOLBAR_CONFIGURATION.md](TOOLBAR_CONFIGURATION.md) - Complete configuration guide
- [TOOLBAR_EXAMPLES.md](TOOLBAR_EXAMPLES.md) - Practical examples
- [README.md](README.md) - Updated API documentation
