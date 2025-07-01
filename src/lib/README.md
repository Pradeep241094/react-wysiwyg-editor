# React WYSIWYG Editor

[![npm version](https://badge.fury.io/js/@your-username/react-wysiwyg-editor.svg)](https://www.npmjs.com/package/@your-username/react-wysiwyg-editor)

A modern, feature-rich WYSIWYG editor for React with dual-mode editing, advanced image handling, and full TypeScript support.

## 🚀 Quick Start

### Installation

```bash
npm install @your-username/react-wysiwyg-editor
# or
yarn add @your-username/react-wysiwyg-editor
```

### Basic Usage

```tsx
import React, { useState } from 'react';
import { WYSIWYGEditor } from '@your-username/react-wysiwyg-editor';
import '@your-username/react-wysiwyg-editor/styles';

function MyApp() {
  const [content, setContent] = useState('# Welcome!\n\nStart editing...');

  const handleContentChange = (html: string, markdown: string) => {
    console.log('HTML:', html);
    console.log('Markdown:', markdown);
    setContent(markdown);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <WYSIWYGEditor
        initialContent={content}
        onChange={handleContentChange}
        mode="wysiwyg"
        height="600px"
      />
    </div>
  );
}

export default MyApp;
```

## 📦 Components

### WYSIWYGEditor

Main editor component with rich text editing capabilities.

**Props:**
- `initialContent?: string` - Initial markdown content
- `onChange?: (html: string, markdown: string) => void` - Content change callback
- `mode?: 'wysiwyg' | 'markdown'` - Editor mode (default: 'wysiwyg')
- `height?: string` - Editor height (default: '400px')

### Toolbar

Formatting toolbar component (automatically included in WYSIWYGEditor).

### ImageUploadModal

Advanced image upload modal with cropping capabilities (automatically included).

### SplitView

Layout component for split-view markdown editing (automatically included).

## 🎨 Features

- ✅ **Rich Text Editing**: Bold, italic, underline, strikethrough
- ✅ **Block Elements**: Headings, paragraphs, quotes, code blocks
- ✅ **Lists**: Ordered and unordered lists
- ✅ **Images**: Advanced upload with cropping and sizing
- ✅ **Dual Mode**: WYSIWYG and Markdown editing
- ✅ **TypeScript**: Full type support
- ✅ **Responsive**: Mobile-friendly design

## 🛠️ Advanced Usage

### Custom Styling

The editor comes with built-in Tailwind CSS styling. Make sure to include the styles:

```tsx
import '@your-username/react-wysiwyg-editor/styles';
```

### TypeScript Support

```tsx
import { WYSIWYGEditor, EditorProps, EditorMode } from '@your-username/react-wysiwyg-editor';

interface MyComponentProps {
  initialContent: string;
}

const MyEditor: React.FC<MyComponentProps> = ({ initialContent }) => {
  const [mode, setMode] = useState<EditorMode>('wysiwyg');
  
  return (
    <WYSIWYGEditor
      initialContent={initialContent}
      mode={mode}
      onChange={(html, markdown) => {
        // Handle content changes
      }}
    />
  );
};
```

## 📱 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🤝 Contributing

Issues and pull requests are welcome! Visit our [GitHub repository](https://github.com/your-username/react-wysiwyg-editor).

## 📄 License

MIT © [Your Name](https://github.com/your-username) 