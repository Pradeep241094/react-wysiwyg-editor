# WYSIWYG Editor Examples

This document provides various examples of how to use the WYSIWYG Editor library in different scenarios.

## Basic Example

```tsx
import React, { useState } from 'react';
import { WYSIWYGEditor } from '@your-org/wysiwyg-editor';
import '@your-org/wysiwyg-editor/styles';

function BasicEditor() {
  const [content, setContent] = useState('<p>Welcome to the editor!</p>');

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <h2>Basic WYSIWYG Editor</h2>
      <WYSIWYGEditor
        initialContent={content}
        placeholder="Start typing your content here..."
        onChange={setContent}
      />
      
      <div style={{ marginTop: '20px' }}>
        <h3>Output:</h3>
        <pre style={{ background: '#f5f5f5', padding: '10px', borderRadius: '4px' }}>
          {content}
        </pre>
      </div>
    </div>
  );
}

export default BasicEditor;
```

## Advanced Editor with All Features

```tsx
import React, { useState } from 'react';
import { WYSIWYGEditor, AdvancedToolbar } from '@your-org/wysiwyg-editor';
import '@your-org/wysiwyg-editor/styles';

function AdvancedEditor() {
  const [content, setContent] = useState(`
    <h1>Advanced Editor Demo</h1>
    <p>This editor includes all advanced features:</p>
    <ul>
      <li>Rich text formatting</li>
      <li>Color picker</li>
      <li>Image insertion</li>
      <li>Table creation</li>
      <li>And much more!</li>
    </ul>
  `);

  const handleFocus = () => {
    console.log('Editor focused');
  };

  const handleBlur = () => {
    console.log('Editor blurred');
  };

  const handleChange = (newContent: string) => {
    console.log('Content changed');
    setContent(newContent);
  };

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '20px' }}>
      <h2>Advanced WYSIWYG Editor</h2>
      <WYSIWYGEditor
        initialContent={content}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder="Create amazing content..."
        // Use the advanced toolbar
        toolbar={AdvancedToolbar}
      />
    </div>
  );
}

export default AdvancedEditor;
```

## Form Integration

```tsx
import React, { useState } from 'react';
import { WYSIWYGEditor } from '@your-org/wysiwyg-editor';
import '@your-org/wysiwyg-editor/styles';

interface FormData {
  title: string;
  content: string;
  author: string;
}

function BlogPostForm() {
  const [formData, setFormData] = useState<FormData>({
    title: '',
    content: '<p>Write your blog post content here...</p>',
    author: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitting blog post:', formData);
    // Here you would typically send the data to your API
  };

  const handleContentChange = (content: string) => {
    setFormData(prev => ({ ...prev, content }));
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <h2>Blog Post Editor</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '20px' }}>
          <label htmlFor="title" style={{ display: 'block', marginBottom: '5px' }}>
            Title:
          </label>
          <input
            id="title"
            type="text"
            value={formData.title}
            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
            style={{ width: '100%', padding: '8px', fontSize: '16px' }}
            required
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label htmlFor="author" style={{ display: 'block', marginBottom: '5px' }}>
            Author:
          </label>
          <input
            id="author"
            type="text"
            value={formData.author}
            onChange={(e) => setFormData(prev => ({ ...prev, author: e.target.value }))}
            style={{ width: '100%', padding: '8px', fontSize: '16px' }}
            required
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>
            Content:
          </label>
          <WYSIWYGEditor
            initialContent={formData.content}
            onChange={handleContentChange}
            placeholder="Write your blog post content..."
          />
        </div>

        <button 
          type="submit"
          style={{ 
            padding: '10px 20px', 
            fontSize: '16px', 
            backgroundColor: '#007bff', 
            color: 'white', 
            border: 'none', 
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Publish Blog Post
        </button>
      </form>
    </div>
  );
}

export default BlogPostForm;
```

## Comment System

```tsx
import React, { useState } from 'react';
import { WYSIWYGEditor } from '@your-org/wysiwyg-editor';
import '@your-org/wysiwyg-editor/styles';

interface Comment {
  id: number;
  author: string;
  content: string;
  timestamp: Date;
}

function CommentSystem() {
  const [comments, setComments] = useState<Comment[]>([
    {
      id: 1,
      author: 'John Doe',
      content: '<p>Great article! Thanks for sharing.</p>',
      timestamp: new Date('2024-01-15T10:30:00')
    }
  ]);
  
  const [newComment, setNewComment] = useState('<p></p>');
  const [authorName, setAuthorName] = useState('');

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!authorName.trim() || newComment.trim() === '<p></p>') {
      alert('Please fill in all fields');
      return;
    }

    const comment: Comment = {
      id: Date.now(),
      author: authorName,
      content: newComment,
      timestamp: new Date()
    };

    setComments(prev => [...prev, comment]);
    setNewComment('<p></p>');
    setAuthorName('');
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <h2>Comments</h2>
      
      {/* Existing Comments */}
      <div style={{ marginBottom: '30px' }}>
        {comments.map(comment => (
          <div 
            key={comment.id} 
            style={{ 
              border: '1px solid #ddd', 
              borderRadius: '8px', 
              padding: '15px', 
              marginBottom: '15px',
              backgroundColor: '#f9f9f9'
            }}
          >
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              marginBottom: '10px',
              fontSize: '14px',
              color: '#666'
            }}>
              <strong>{comment.author}</strong>
              <span>{comment.timestamp.toLocaleDateString()}</span>
            </div>
            <div dangerouslySetInnerHTML={{ __html: comment.content }} />
          </div>
        ))}
      </div>

      {/* Add New Comment */}
      <div style={{ 
        border: '1px solid #ddd', 
        borderRadius: '8px', 
        padding: '20px',
        backgroundColor: 'white'
      }}>
        <h3>Add a Comment</h3>
        <form onSubmit={handleSubmitComment}>
          <div style={{ marginBottom: '15px' }}>
            <label htmlFor="author" style={{ display: 'block', marginBottom: '5px' }}>
              Your Name:
            </label>
            <input
              id="author"
              type="text"
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              style={{ width: '100%', padding: '8px', fontSize: '14px' }}
              required
            />
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>
              Comment:
            </label>
            <WYSIWYGEditor
              initialContent={newComment}
              onChange={setNewComment}
              placeholder="Write your comment..."
            />
          </div>

          <button 
            type="submit"
            style={{ 
              padding: '8px 16px', 
              fontSize: '14px', 
              backgroundColor: '#28a745', 
              color: 'white', 
              border: 'none', 
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Post Comment
          </button>
        </form>
      </div>
    </div>
  );
}

export default CommentSystem;
```

## Custom Styling Example

```tsx
import React, { useState } from 'react';
import { WYSIWYGEditor } from '@your-org/wysiwyg-editor';
import '@your-org/wysiwyg-editor/styles';
import './custom-editor.css'; // Your custom styles

function CustomStyledEditor() {
  const [content, setContent] = useState('<p>This editor has custom styling!</p>');

  return (
    <div className="custom-editor-container">
      <h2>Custom Styled Editor</h2>
      <WYSIWYGEditor
        initialContent={content}
        onChange={setContent}
        placeholder="Type in this beautifully styled editor..."
      />
    </div>
  );
}

export default CustomStyledEditor;
```

And the corresponding CSS file (`custom-editor.css`):

```css
.custom-editor-container {
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Georgia', serif;
}

.custom-editor-container .wysiwyg-editor {
  border: 3px solid #4a90e2;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(74, 144, 226, 0.15);
  overflow: hidden;
}

.custom-editor-container .toolbar {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-bottom: none;
  padding: 15px;
}

.custom-editor-container .toolbar-button {
  background: rgba(255, 255, 255, 0.1);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 6px;
  transition: all 0.3s ease;
}

.custom-editor-container .toolbar-button:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-1px);
}

.custom-editor-container .toolbar-button.active {
  background: rgba(255, 255, 255, 0.3);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.custom-editor-container .editable-area {
  min-height: 300px;
  padding: 25px;
  font-size: 16px;
  line-height: 1.6;
  background: #fafafa;
}

.custom-editor-container .placeholder {
  color: #999;
  font-style: italic;
}
```

## Programmatic Control

```tsx
import React, { useState, useRef } from 'react';
import { WYSIWYGEditor, CommandExecutor } from '@your-org/wysiwyg-editor';
import '@your-org/wysiwyg-editor/styles';

function ProgrammaticEditor() {
  const [content, setContent] = useState('<p>Select some text and use the buttons below!</p>');
  const editorRef = useRef<HTMLDivElement>(null);

  const executeCommand = (command: string, value?: string) => {
    const executor = CommandExecutor.getInstance();
    const result = executor.executeCommand(command, value, editorRef.current || undefined);
    
    if (!result.success) {
      alert(`Command failed: ${result.error}`);
    }
  };

  const insertSampleContent = () => {
    const sampleContent = `
      <h2>Sample Content Inserted</h2>
      <p>This content was inserted programmatically!</p>
      <ul>
        <li>Feature 1</li>
        <li>Feature 2</li>
        <li>Feature 3</li>
      </ul>
    `;
    setContent(prev => prev + sampleContent);
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <h2>Programmatic Editor Control</h2>
      
      <div style={{ marginBottom: '20px' }}>
        <button 
          onClick={() => executeCommand('BOLD')}
          style={{ marginRight: '10px', padding: '5px 10px' }}
        >
          Make Bold
        </button>
        <button 
          onClick={() => executeCommand('ITALIC')}
          style={{ marginRight: '10px', padding: '5px 10px' }}
        >
          Make Italic
        </button>
        <button 
          onClick={() => executeCommand('FORMAT_H1')}
          style={{ marginRight: '10px', padding: '5px 10px' }}
        >
          Make H1
        </button>
        <button 
          onClick={insertSampleContent}
          style={{ marginRight: '10px', padding: '5px 10px' }}
        >
          Insert Sample Content
        </button>
      </div>

      <WYSIWYGEditor
        ref={editorRef}
        initialContent={content}
        onChange={setContent}
        placeholder="Select text and use the buttons above..."
      />
    </div>
  );
}

export default ProgrammaticEditor;
```

## Next.js Integration

```tsx
// pages/editor.tsx or app/editor/page.tsx
import dynamic from 'next/dynamic';
import { useState } from 'react';

// Dynamically import the editor to avoid SSR issues
const WYSIWYGEditor = dynamic(
  () => import('@your-org/wysiwyg-editor').then(mod => mod.WYSIWYGEditor),
  { 
    ssr: false,
    loading: () => <div>Loading editor...</div>
  }
);

// Import styles in _app.tsx or layout.tsx
// import '@your-org/wysiwyg-editor/styles';

export default function EditorPage() {
  const [content, setContent] = useState('<p>Next.js Editor Example</p>');

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <h1>Next.js WYSIWYG Editor</h1>
      <WYSIWYGEditor
        initialContent={content}
        onChange={setContent}
        placeholder="Start writing in Next.js..."
      />
    </div>
  );
}
```

These examples demonstrate various ways to integrate and customize the WYSIWYG Editor in your React applications. Each example can be adapted to fit your specific use case and styling requirements.