# WYSIWYG Editor Demo Application

This demo application showcases the configurable toolbar functionality of the WYSIWYG Editor library.

## 🚀 Quick Start

```bash
npm install
npm run dev
```

Visit `http://localhost:5173` to see the interactive demo.

## 📁 Demo Files

### Main Demo
- **`index.html`** - Main interactive demo with configuration dropdown
- **`src/App.tsx`** - React application with multiple toolbar configurations

### Configuration Examples
- **Embedded Configuration Builder** - Interactive builder integrated into the main demo
- **`src/InteractiveConfigBuilder.tsx`** - Standalone React component for building configurations
- **`test-config-functionality.html`** - Automated tests for configuration functionality

### Additional Demos
- **`../demo-toolbar-configuration.html`** - Comprehensive configuration guide
- **`../test-toolbar-configurations-showcase.html`** - Visual showcase of all configurations

## 🛠️ Toolbar Configuration Options

### Presets
```typescript
// Minimal: Bold, Italic, Underline only
{ preset: 'minimal' }

// Standard: Common editing features
{ preset: 'standard' }

// Full: All available buttons (default)
{ preset: 'full' }
```

### Category-Based Configuration
```typescript
{
  include: {
    categories: ['formatting', 'structure', 'lists']
  }
}
```

Available categories:
- `formatting` - Bold, italic, underline, strikethrough, sub/superscript
- `structure` - Headings (H1-H6)
- `lists` - Bullet lists, numbered lists, indent/outdent
- `alignment` - Text alignment options
- `media` - Image, file upload, table insertion
- `links` - Link creation and removal
- `advanced` - Colors, fonts, special characters, etc.

### Individual Button Selection
```typescript
{
  include: {
    buttons: ['bold', 'italic', 'h1', 'h2', 'link', 'image']
  }
}
```

### Exclusion Rules
```typescript
{
  preset: 'full',
  exclude: {
    categories: ['media'],
    buttons: ['subscript', 'superscript']
  }
}
```

### Custom Groups
```typescript
{
  include: {
    groups: [
      {
        name: 'text-formatting',
        buttons: ['bold', 'italic', 'underline']
      },
      {
        name: 'headings',
        buttons: ['h1', 'h2', 'h3']
      }
    ]
  }
}
```

## 🎯 Real-World Examples

### Blog Editor
Perfect for blog post writing:
```typescript
{
  include: {
    categories: ['formatting', 'structure', 'lists', 'links'],
    buttons: ['image', 'undo', 'redo']
  },
  exclude: {
    buttons: ['subscript', 'superscript']
  }
}
```

### Comment Editor
Minimal features for user comments:
```typescript
{
  include: {
    buttons: ['bold', 'italic', 'link']
  }
}
```

### Newsletter Editor
Optimized for email newsletters:
```typescript
{
  include: {
    categories: ['formatting', 'structure', 'alignment'],
    buttons: ['link', 'image', 'undo', 'redo']
  },
  exclude: {
    buttons: ['subscript', 'superscript', 'h4', 'h5', 'h6']
  }
}
```

## 🎛️ Interactive Configuration Builder

The interactive configuration builder is embedded directly in the main demo application. Click the "🎛️ Open Configuration Builder" button to access it.

The builder provides a visual interface for:

1. **Preset Selection** - Choose from minimal, standard, or full presets
2. **Category Selection** - Pick entire categories of buttons
3. **Individual Button Selection** - Choose specific buttons

The builder shows real-time preview and generates the configuration code for you to copy.

### How to Access:
1. Run `npm run dev`
2. Open `http://localhost:5173`
3. Click "🎛️ Open Configuration Builder" button
4. Experiment with different configurations and see live results

## 🧪 Testing

Run the configuration functionality tests:
```bash
# Open in browser
open test-config-functionality.html
```

The test suite verifies:
- Preset configurations work correctly
- Category inclusion/exclusion functions properly
- Individual button selection works
- Custom groups are created correctly
- Complex configurations combine rules properly

## 📚 Available Buttons

All button types that can be included/excluded:

**Basic Formatting:**
`bold`, `italic`, `underline`, `strikethrough`

**Text Styling:**
`subscript`, `superscript`, `removeFormat`

**Headings:**
`h1`, `h2`, `h3`, `h4`, `h5`, `h6`

**Lists & Indentation:**
`bulletList`, `numberedList`, `indent`, `outdent`

**Text Alignment:**
`alignLeft`, `alignCenter`, `alignRight`, `alignJustify`

**Media:**
`image`, `file`, `table`

**Links:**
`link`, `unlink`

**Advanced:**
`fontColor`, `backgroundColor`, `fontSize`, `fontFamily`, `specialChar`, `horizontalRule`, `findReplace`, `sourceCode`, `fullscreen`, `print`

**History:**
`undo`, `redo`

## 🔧 Usage in Your Application

```typescript
import { WYSIWYGEditor } from 'wysiwyg-editor-library';

function MyComponent() {
  const toolbarConfig = {
    preset: 'minimal'
  };

  return (
    <WYSIWYGEditor
      toolbarConfig={toolbarConfig}
      onChange={(content) => console.log(content)}
      placeholder="Start typing..."
    />
  );
}
```

## 🎨 Customization

The toolbar configuration system is:
- **Flexible** - Use presets, categories, or individual buttons
- **Backward Compatible** - No configuration = full toolbar
- **Composable** - Combine include/exclude rules
- **Visual** - Custom groups with separators
- **Type Safe** - Full TypeScript support

## 📖 Documentation

For complete documentation, see:
- [Configuration Guide](../demo-toolbar-configuration.html)
- [Visual Showcase](../test-toolbar-configurations-showcase.html)
- [Interactive Builder](config-builder.html)