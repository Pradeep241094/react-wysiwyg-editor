# WYSIWYG Editor

![React](https://img.shields.io/badge/React-18.2.0-61dafb.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.2.2-3178c6.svg)

A powerful, modern **What You See Is What You Get** editor built with React, TypeScript, and React Router. Features dual-mode editing (WYSIWYG + Markdown), advanced image handling, and a streamlined user interface with full-page preview functionality.

## Features

- 🚀 **Lightweight**: Pure React implementation with no heavy dependencies
- 🎨 **Rich Formatting**: Bold, italic, underline, headings, lists, and more
- 🔗 **Smart Link Management**: Insert, edit, and manage links with preview popup
- 📷 **Media Support**: Insert and crop images, upload files
- 🎯 **Accessibility**: Full keyboard navigation and screen reader support
- 📱 **Responsive**: Works seamlessly on desktop and mobile devices
- 🛡️ **Secure**: Built-in content sanitization to prevent XSS attacks
- ⚡ **TypeScript**: Full type safety and excellent developer experience
- 🎨 **Customizable**: Flexible styling and comprehensive toolbar configuration
- ⚙️ **Configurable Toolbar**: Choose from presets or create custom button layouts

## Installation

```bash
npm i @prmargas/react-wysiwyg-editor
```

## 🚀 Quick Start

```tsx
import React, { useState } from "react";
import { WYSIWYGEditor } from "@prmargas/react-wysiwyg-editor";
import "@prmargas/react-wysiwyg-editor/styles";

function App() {
  const [content, setContent] = useState("<p>Start typing...</p>");

  return (
    <div>
      <h1>My Editor</h1>
      <WYSIWYGEditor
        initialContent={content}
        placeholder="Enter your text here..."
        onChange={setContent}
      />
    </div>
  );
}

export default App;
```

## 🎯 Advanced Usage

### 🔧 Toolbar Configuration

Customize which toolbar buttons are displayed using the `toolbarConfig` prop:

```tsx
// Minimal toolbar with only basic formatting
<WYSIWYGEditor 
  toolbarConfig={{ preset: 'minimal' }}
  placeholder="Simple editor..."
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

// Category-based configuration
<WYSIWYGEditor 
  toolbarConfig={{
    include: {
      categories: ['formatting', 'structure', 'lists']
    }
  }}
  placeholder="Category-based toolbar..."
/>
```

**Available Presets:**
- `minimal` - Basic formatting (bold, italic, underline)
- `standard` - Common editing features
- `full` - All available buttons (default)

**Available Categories:**
- `formatting` - Text styling (bold, italic, etc.)
- `structure` - Headings (h1-h6)
- `lists` - Lists and indentation
- `alignment` - Text alignment
- `media` - Images, files, tables
- `links` - Link management
- `advanced` - Colors, fonts, utilities

For complete documentation, see [TOOLBAR_CONFIGURATION.md](TOOLBAR_CONFIGURATION.md).

### 🔄 Custom Toolbar Component

```tsx
import { WYSIWYGEditor, AdvancedToolbar } from "@prmargas/react-wysiwyg-editor";

function EditorWithAdvancedToolbar() {
  const [content, setContent] = useState("");

  return (
    <WYSIWYGEditor
      initialContent={content}
      onChange={setContent}
      toolbar={AdvancedToolbar} // Use the advanced toolbar with more features
    />
  );
}
```

### Event Handlers

```tsx
function EditorWithEvents() {
  const [content, setContent] = useState("");

  const handleFocus = () => {
    console.log("Editor focused");
  };

  const handleBlur = () => {
    console.log("Editor blurred");
  };

  const handleChange = (newContent: string) => {
    console.log("Content changed:", newContent);
    setContent(newContent);
  };

  return (
    <WYSIWYGEditor
      initialContent={content}
      onChange={handleChange}
      onFocus={handleFocus}
      onBlur={handleBlur}
      placeholder="Type something..."
    />
  );
}
```

## API Reference

### WYSIWYGEditor Props

| Prop             | Type                        | Default             | Description                            |
| ---------------- | --------------------------- | ------------------- | -------------------------------------- |
| `initialContent` | `string`                    | `''`                | Initial HTML content for the editor    |
| `placeholder`    | `string`                    | `'Start typing...'` | Placeholder text when editor is empty  |
| `onChange`       | `(content: string) => void` | -                   | Callback fired when content changes    |
| `onFocus`        | `() => void`                | -                   | Callback fired when editor gains focus |
| `onBlur`         | `() => void`                | -                   | Callback fired when editor loses focus |
| `toolbarConfig`  | `ToolbarConfig`             | -                   | Configuration for toolbar buttons      |
| `height`         | `string \| number`          | -                   | Height of the editor                   |

### Available Components

- **WYSIWYGEditor**: Main editor component with configurable toolbar
- **Toolbar**: Basic toolbar with essential formatting options
- **AdvancedToolbar**: Extended toolbar with additional features
- **EditableArea**: The contentEditable area (used internally)

### Toolbar Configuration Types

```tsx
import { ToolbarConfig, ToolbarCategory, ToolbarButtonType } from "@prmargas/react-wysiwyg-editor";

// Configuration interface
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
```

### Utility Functions

```tsx
import {
  CommandExecutor,
  contentSanitizer,
  getCurrentSelection,
  restoreSelection,
  ToolbarConfigResolver,
} from "@prmargas/react-wysiwyg-editor";

// Execute formatting commands programmatically
const executor = CommandExecutor.getInstance();
executor.executeCommand("BOLD");

// Sanitize HTML content
const cleanHtml = contentSanitizer.sanitizeHtml(
  '<script>alert("xss")</script><p>Safe content</p>'
);

// Work with selections
const selection = getCurrentSelection();
// ... modify content ...
restoreSelection(selection);

// Resolve toolbar configurations
const config = { preset: 'minimal' };
const resolved = ToolbarConfigResolver.resolve(config);
console.log('Enabled buttons:', Array.from(resolved.enabledButtons));
```

## Styling

The editor comes with default styles that you can import:

```tsx
import "@prmargas/react-wysiwyg-editor/styles";
```

### Custom Styling

You can override the default styles by targeting the CSS classes:

```css
.wysiwyg-editor {
  border: 2px solid #your-color;
  border-radius: 8px;
}

.toolbar {
  background: #your-background;
}

.editable-area {
  min-height: 200px;
  font-family: "Your Font", sans-serif;
}
```

## Link Management

The editor features an intuitive link management system:

### Link Preview Popup

When you click on any link in the editor, a popup appears with:

- **Go to link**: Click the URL to visit the link in a new tab
- **Change**: Edit the link URL with the current value pre-filled
- **Remove**: Remove the link while preserving the text

### Creating Links

1. Select text in the editor
2. Click the link button in the toolbar (or use `Ctrl/Cmd + K`)
3. Enter the URL in the modal
4. The link is created with `target="_blank"` for security

### Editing Links

1. Click on any link in the editor
2. Click "Change" in the popup that appears
3. Modify the URL in the modal (current URL is pre-filled)
4. Click "Update Link" to save changes

## Keyboard Shortcuts

| Shortcut       | Action      |
| -------------- | ----------- |
| `Ctrl/Cmd + B` | Bold        |
| `Ctrl/Cmd + I` | Italic      |
| `Ctrl/Cmd + U` | Underline   |
| `Ctrl/Cmd + Z` | Undo        |
| `Ctrl/Cmd + Y` | Redo        |
| `Ctrl/Cmd + K` | Insert Link |

## Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Security

The editor includes built-in content sanitization to prevent XSS attacks:

- Removes dangerous HTML tags (`<script>`, `<iframe>`, etc.)
- Sanitizes URLs to prevent `javascript:` and `data:` protocols
- Filters CSS properties to prevent malicious styles
- Cleans pasted content from external sources

## Documentation

### Comprehensive Guides

- **[Toolbar Configuration Guide](TOOLBAR_CONFIGURATION.md)** - Complete guide to customizing toolbar buttons
- **[Toolbar Examples](TOOLBAR_EXAMPLES.md)** - Practical examples for common use cases
- **[TypeScript Interfaces](TYPESCRIPT_INTERFACES.md)** - Complete TypeScript interface documentation
- **[Migration Guide](MIGRATION_GUIDE.md)** - Upgrading to the new toolbar configuration system
- **[Troubleshooting Guide](TROUBLESHOOTING.md)** - Solutions to common issues

### Quick Links

- [Available toolbar buttons and categories](TOOLBAR_CONFIGURATION.md#categories)
- [Preset configurations](TOOLBAR_CONFIGURATION.md#presets)
- [Custom button grouping](TOOLBAR_CONFIGURATION.md#custom-groups)
- [Performance optimization](TOOLBAR_CONFIGURATION.md#performance-considerations)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build library
npm run build

# Run tests
npm test

# Build demo
npm run build:demo
```

## License

MIT License - see the [LICENSE](LICENSE) file for details.

## Changelog

### 0.0.3

- Basic rich text editing functionality
- Advanced toolbar with color picker
- Image and file upload support
- Content sanitization
- TypeScript support
- Accessibility features
- Bug Fixes

🙏 Acknowledgments

- **React Team** for the excellent framework
- **React Image Crop** for the utility-first styling system
- **DOMPurify** for content sanitization

**Built with ❤️ using React, TypeScript, and modern web technologies.**
