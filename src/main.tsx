import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import { WYSIWYGEditor } from './components/WYSIWYGEditor'
import './styles/editor.css'

function App() {
  const [content1, setContent1] = useState('<p>Welcome to the WYSIWYG editor! This is a <strong>basic example</strong> with default settings.</p>');
  const [content2, setContent2] = useState('');
  const [content3, setContent3] = useState('<h1>Advanced Example</h1><p>This editor has custom initial content with <em>italic text</em>, <u>underlined text</u>, and a <a href="https://example.com" target="_blank" rel="noopener noreferrer">hyperlink</a>.</p><ul><li>Bullet point 1</li><li>Bullet point 2</li></ul>');
  const [savedContent, setSavedContent] = useState('');

  const handleBasicChange = (content: string) => {
    setContent1(content);
  };

  const handleMinimalChange = (content: string) => {
    setContent2(content);
  };

  const handleAdvancedChange = (content: string) => {
    setContent3(content);
  };

  const saveContent = () => {
    setSavedContent(content1);
    alert('Content saved! Check the "Saved Content" section below.');
  };

  const loadContent = () => {
    if (savedContent) {
      setContent1(savedContent);
      alert('Content loaded from saved state!');
    } else {
      alert('No saved content available.');
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1000px', margin: '0 auto', fontFamily: 'Arial, sans-serif' }}>
      <header style={{ marginBottom: '40px', textAlign: 'center' }}>
        <h1 style={{ color: '#333', marginBottom: '10px' }}>WYSIWYG Editor Demo</h1>
        <p style={{ color: '#666', fontSize: '16px' }}>
          A lightweight, accessible WYSIWYG editor built with React and native browser APIs
        </p>
      </header>

      {/* Basic Example */}
      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ color: '#333', marginBottom: '15px' }}>Basic Example</h2>
        <p style={{ color: '#666', marginBottom: '15px' }}>
          Standard editor with all features enabled. Try formatting text, creating lists, and adding links.
        </p>
        <div style={{ border: '1px solid #ddd', borderRadius: '8px', overflow: 'hidden' }}>
          <WYSIWYGEditor
            initialContent={content1}
            placeholder="Start typing your content here..."
            onChange={handleBasicChange}
            onFocus={() => { }}
            onBlur={() => { }}
          />
        </div>
        <div style={{ marginTop: '10px', display: 'flex', gap: '10px' }}>
          <button
            onClick={saveContent}
            style={{
              padding: '8px 16px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Save Content
          </button>
          <button
            onClick={loadContent}
            style={{
              padding: '8px 16px',
              backgroundColor: '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Load Content
          </button>
        </div>
      </section>

      {/* Minimal Example */}
      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ color: '#333', marginBottom: '15px' }}>Minimal Example</h2>
        <p style={{ color: '#666', marginBottom: '15px' }}>
          Clean editor with custom placeholder text, perfect for simple text input.
        </p>
        <div style={{ border: '1px solid #ddd', borderRadius: '8px', overflow: 'hidden' }}>
          <WYSIWYGEditor
            initialContent={content2}
            placeholder="Write your thoughts here..."
            onChange={handleMinimalChange}
          />
        </div>
      </section>

      {/* Advanced Example */}
      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ color: '#333', marginBottom: '15px' }}>Advanced Example</h2>
        <p style={{ color: '#666', marginBottom: '15px' }}>
          Pre-populated editor with rich content including headings, formatting, lists, and links.
        </p>
        <div style={{ border: '1px solid #ddd', borderRadius: '8px', overflow: 'hidden' }}>
          <WYSIWYGEditor
            initialContent={content3}
            placeholder="Advanced editor content..."
            onChange={handleAdvancedChange}
            onFocus={() => { }}
            onBlur={() => { }}
          />
        </div>
      </section>

      {/* Content Display */}
      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ color: '#333', marginBottom: '15px' }}>Live Content Output</h2>
        <p style={{ color: '#666', marginBottom: '15px' }}>
          See the HTML output from the basic editor in real-time:
        </p>
        <div style={{
          backgroundColor: '#f8f9fa',
          border: '1px solid #e9ecef',
          borderRadius: '4px',
          padding: '15px',
          fontFamily: 'monospace',
          fontSize: '14px',
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-all'
        }}>
          {content1 || '<em>No content yet...</em>'}
        </div>
      </section>

      {/* Saved Content Display */}
      {savedContent && (
        <section style={{ marginBottom: '40px' }}>
          <h2 style={{ color: '#333', marginBottom: '15px' }}>Saved Content</h2>
          <div style={{
            backgroundColor: '#e8f5e8',
            border: '1px solid #c3e6c3',
            borderRadius: '4px',
            padding: '15px'
          }}>
            <div dangerouslySetInnerHTML={{ __html: savedContent }} />
          </div>
        </section>
      )}

      {/* Feature Showcase */}
      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ color: '#333', marginBottom: '15px' }}>Feature Showcase</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
          <div style={{ padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
            <h3 style={{ color: '#333', marginBottom: '10px' }}>Text Formatting</h3>
            <ul style={{ color: '#666', paddingLeft: '20px' }}>
              <li>Bold, Italic, Underline</li>
              <li>Headings (H1, H2, H3)</li>
              <li>Clear formatting</li>
            </ul>
          </div>
          <div style={{ padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
            <h3 style={{ color: '#333', marginBottom: '10px' }}>Lists & Structure</h3>
            <ul style={{ color: '#666', paddingLeft: '20px' }}>
              <li>Bullet lists</li>
              <li>Numbered lists</li>
              <li>Text alignment</li>
            </ul>
          </div>
          <div style={{ padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
            <h3 style={{ color: '#333', marginBottom: '10px' }}>Advanced Features</h3>
            <ul style={{ color: '#666', paddingLeft: '20px' }}>
              <li>Hyperlink insertion</li>
              <li>Undo/Redo support</li>
              <li>Content sanitization</li>
            </ul>
          </div>
        </div>
      </section>

      <footer style={{ textAlign: 'center', color: '#666', fontSize: '14px', marginTop: '40px' }}>
        <p>Built with React and native browser APIs • No external dependencies</p>
      </footer>
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)