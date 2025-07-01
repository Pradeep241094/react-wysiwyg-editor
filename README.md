# ✨ Modern WYSIWYG Editor

A powerful, modern **What You See Is What You Get** editor built with React, TypeScript, and React Router. Features dual-mode editing (WYSIWYG + Markdown), advanced image handling, and a streamlined user interface with full-page preview functionality.

![Version](https://img.shields.io/badge/version-3.0.0-blue.svg)
![React](https://img.shields.io/badge/React-18.2.0-61dafb.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.2.2-3178c6.svg)
![React Router](https://img.shields.io/badge/React%20Router-6.x-red.svg)
![Tailwind](https://img.shields.io/badge/Tailwind-3.4.1-06b6d4.svg)

## 🚀 Quick Start

```bash
# Clone the repository
git clone <repository-url>
cd WYSIWYGEditor

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

Open [http://localhost:3000](http://localhost:3000) to view the editor in your browser.

## ✨ Key Features

### 🎯 Modern Architecture
- **React Router Navigation**: Clean routing between Editor and Preview pages
- **Full-Screen Experiences**: Dedicated pages for editing and previewing
- **Responsive Layout**: Optimized for all screen sizes
- **Internal Scrolling**: No external page scroll - everything contained within views

### 🔄 Dual Mode Editing
- **WYSIWYG Mode**: Rich visual editing with real-time formatting
- **Markdown Mode**: Raw markdown with live side-by-side preview
- **Seamless Switching**: Toggle between modes without losing content
- **Content Synchronization**: Automatic HTML ↔ Markdown conversion

### 🎨 Rich Text Formatting
- **Typography**: Font family and size selection
- **Text Styling**: Bold, italic, underline, strikethrough
- **Block Elements**: Headings (H1-H6), paragraphs, quotes, code blocks
- **Text Alignment**: Left, center, right, justify
- **Lists**: Ordered and unordered lists
- **Media**: Images with advanced upload and sizing options

### 📸 Advanced Image System
- **Smart Upload**: Drag & drop or file picker with progress
- **Professional Cropping**: Real-time crop preview with adjustable selection
- **Intelligent Sizing**: 4 size presets (Small 300px, Medium 600px, Large 900px, Original)
- **Optimized Processing**: Automatic compression and format optimization
- **Accessibility**: Alt text support for screen readers

### 🖥️ Full-Page Preview
- **Dedicated Preview Page**: Full-screen document preview with professional styling
- **Export Options**: Download as PNG, JPEG, or WebP images
- **Print Support**: Optimized print styles with proper page breaks
- **Navigation**: Easy back-and-forth between editor and preview

### 🎯 Optimized User Experience
- **Compact Toolbar**: Space-efficient single-row layout
- **No External Scroll**: All scrolling happens within components
- **Clean Modals**: Streamlined interfaces without clutter
- **Smooth Navigation**: Fast page transitions with React Router
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile

## 🏗️ Architecture Overview

### 📁 Project Structure

```
src/
├── components/              # Reusable React components
│   ├── Layout.tsx              # Main app layout with navigation
│   ├── WYSIWYGEditor.tsx       # Core editor component
│   ├── Toolbar.tsx             # Compact formatting toolbar
│   ├── Preview.tsx             # Full-page preview component
│   ├── SplitView.tsx           # Editor/preview split layout
│   └── ImageUploadModal.tsx    # Advanced image upload modal
├── pages/                   # Route-specific page components
│   └── Editor.tsx              # Main editor page
├── types/                   # TypeScript definitions
│   └── editor.ts               # Comprehensive type system
├── main.tsx                # Application entry point with routing
└── index.css              # Global Tailwind styles
```

### 🧩 Component Architecture

#### **Layout.tsx** - Navigation & App Shell
- Modern header with gradient branding
- Navigation between Editor and Preview pages  
- Responsive design with proper height management
- Clean routing integration

#### **Editor.tsx** - Main Editor Page
- Container for the WYSIWYG editor component
- Content state management and persistence
- Full-height layout with internal scrolling
- Session storage integration for content preservation

#### **WYSIWYGEditor.tsx** - Core Editor Engine
- Rich text editing with contentEditable
- Dual-mode support (WYSIWYG/Markdown)
- Advanced font system with persistence across new lines
- Command processing and toolbar integration
- Image insertion with size controls
- React Router navigation to preview

#### **Preview.tsx** - Full-Page Preview & Export
- Full-screen document preview with professional styling
- Export functionality (PNG, JPEG, WebP)
- Print support with optimized styles
- Clean action bar with export controls
- URL parameter and sessionStorage content loading

#### **Toolbar.tsx** - Optimized Control Interface
- Compact single-row layout (28×28px buttons)
- Smart grouping with visual separators
- Enhanced clickability and event handling
- Mode-aware controls
- Prominent preview button

#### **ImageUploadModal.tsx** - Professional Image Processor
- Clean 3-step process: Upload → Crop → Configure
- Advanced size control system
- Efficient cropping with React-Image-Crop
- No-scroll modal design
- Progress indicators and user feedback

## 🛠️ Technical Implementation

### **State Management**
```typescript
// Editor state with comprehensive styling
interface EditorStyles {
  block: string;
  fontSize: string;
  fontFamily: string;
  textAlign: string;
  color: string;
  backgroundColor: string;
  isBold: boolean;
  isItalic: boolean;
  isUnderline: boolean;
  isStrikethrough: boolean;
}

// Content persistence
const handleContentChange = (html: string, markdown: string) => {
  sessionStorage.setItem('editor-html', html);
  sessionStorage.setItem('editor-markdown', markdown);
  sessionStorage.setItem('editor-mode', mode);
};
```

### **Routing Architecture**
```typescript
// React Router setup
<BrowserRouter>
  <Routes>
    <Route path="/" element={<Layout />}>
      <Route index element={<Editor />} />
      <Route path="preview" element={<Preview />} />
    </Route>
  </Routes>
</BrowserRouter>

// Navigation integration
const handlePreview = () => {
  sessionStorage.setItem('editor-mode', mode);
  navigate(`/preview?mode=${mode}`);
};
```

### **Advanced Image Handling**
```typescript
// Size presets
const IMAGE_SIZES = {
  small: { width: 300, label: 'Small' },
  medium: { width: 600, label: 'Medium' },
  large: { width: 900, label: 'Large' },
  original: { width: null, label: 'Original' }
};

// Enhanced insertion
const handleImageInsert = (imageData: string, altText: string, size: string) => {
  const sizeConfig = IMAGE_SIZES[size];
  // Advanced size mapping and insertion logic
};
```

### **Height & Scrolling Management**
```typescript
// Layout with proper height constraints
<div className="h-screen bg-gray-50 flex flex-col overflow-hidden">
  <header className="flex-shrink-0">...</header>
  <main className="flex-1 overflow-hidden">
    <Outlet />
  </main>
</div>

// Editor with internal scrolling
<div style={{ height: 'calc(100vh - 8rem)' }}>
  <WYSIWYGEditor height="calc(100vh - 8rem)" />
</div>
```

## 🎨 User Interface Highlights

### **Modern Design System**
- **Clean Navigation**: Professional header with gradient branding
- **Compact Toolbar**: Single-row layout with logical grouping
- **Full-Screen Preview**: Dedicated preview page with export controls
- **Responsive Layout**: Adapts seamlessly to all screen sizes
- **No External Scroll**: All interactions happen within components

### **Enhanced User Experience**
- **Fast Navigation**: Instant switching between editor and preview
- **Content Persistence**: Automatic saving and restoration
- **Professional Export**: High-quality image generation and print support
- **Smooth Interactions**: Polished animations and transitions
- **Accessibility**: Proper ARIA labels and keyboard navigation

## 🔧 Development

### **Prerequisites**
- Node.js 18+ 
- npm or yarn

### **Available Scripts**
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

### **Configuration**
- **Vite**: Modern build tool with fast HMR
- **TypeScript**: Strict type checking enabled
- **Tailwind CSS**: Utility-first styling
- **React Router**: Client-side routing
- **DOMPurify**: XSS protection for content sanitization

## 🚀 Features in Detail

### **Editor Capabilities**
- Rich text editing with contentEditable
- Keyboard shortcuts (Ctrl+B, Ctrl+I, Ctrl+U)
- Paste handling with content sanitization
- Undo/redo functionality
- Real-time toolbar state updates
- Font persistence across new paragraphs

### **Preview & Export**
- Professional document styling
- Multiple image export formats
- Print-optimized CSS
- Full-screen preview experience
- Clean export controls

### **Image Management**
- Drag & drop upload
- Real-time crop preview
- Multiple size presets
- Automatic optimization
- Alt text for accessibility

## 📱 Browser Support

- **Chrome**: 90+
- **Firefox**: 88+
- **Safari**: 14+
- **Edge**: 90+

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **React Team** for the excellent framework
- **Tailwind CSS** for the utility-first styling system
- **React Router** for client-side routing
- **DOMPurify** for content sanitization
- **html2canvas** for image export functionality

---

**Built with ❤️ using React, TypeScript, and modern web technologies.** 