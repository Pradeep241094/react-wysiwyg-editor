import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import { WYSIWYGEditor } from './lib/index'
import { ToolbarConfig } from './types'
import './lib/styles.css'

function App() {
  const [content, setContent] = useState('<h1>Welcome to the WYSIWYG Editor!</h1><p>This is a comprehensive demo showcasing all features. Try different <strong>toolbar configurations</strong> below to see how the editor adapts to different use cases.</p><p>Features include:</p><ul><li><strong>Rich text formatting</strong> - Bold, italic, underline, headings</li><li><em>Lists and structure</em> - Bullet points, numbered lists, alignment</li><li><u>Media insertion</u> - Images, files, tables</li><li>🔗 <a href="https://example.com" target="_blank" rel="noopener noreferrer">Hyperlinks</a> and link management</li></ul><p>Select different toolbar configurations to see how the available tools change!</p>');
  const [savedContent, setSavedContent] = useState('');
  const [selectedConfig, setSelectedConfig] = useState<string>('default');

  const handleContentChange = (newContent: string) => {
    setContent(newContent);
  };

  const saveContent = () => {
    setSavedContent(content);
    alert('Content saved! Check the "Saved Content" section below.');
  };

  const loadContent = () => {
    if (savedContent) {
      setContent(savedContent);
      alert('Content loaded from saved state!');
    } else {
      alert('No saved content available.');
    }
  };

  // Toolbar configurations
  const toolbarConfigs: Record<string, { name: string; description: string; config?: ToolbarConfig }> = {
    default: {
      name: 'Full Editor',
      description: 'All available toolbar buttons - perfect for comprehensive content creation',
      config: undefined
    },
    minimal: {
      name: 'Minimal',
      description: 'Only basic formatting (Bold, Italic, Underline) - great for simple text editing',
      config: { preset: 'minimal' }
    },
    standard: {
      name: 'Standard',
      description: 'Common editing features - balanced set of tools for most use cases',
      config: { preset: 'standard' }
    },
    blog: {
      name: 'Blog Editor',
      description: 'Perfect for blog posts - formatting, headings, lists, links, and images',
      config: {
        include: {
          categories: ['formatting', 'structure', 'lists', 'links'],
          buttons: ['image', 'undo', 'redo']
        },
        exclude: {
          buttons: ['subscript', 'superscript']
        }
      }
    },
    comment: {
      name: 'Comment Editor',
      description: 'Very simple - just bold, italic, and links for user comments',
      config: {
        include: {
          buttons: ['bold', 'italic', 'link']
        }
      }
    },
    noMedia: {
      name: 'No Media',
      description: 'Full editor without media buttons - text-focused editing',
      config: {
        preset: 'full',
        exclude: {
          categories: ['media']
        }
      }
    },
    formattingOnly: {
      name: 'Formatting Only',
      description: 'Just text formatting tools - bold, italic, underline, etc.',
      config: {
        include: {
          categories: ['formatting']
        }
      }
    }
  };

  const currentConfig = toolbarConfigs[selectedConfig];

  return (
    <div style={{ padding: '20px', maxWidth: '1000px', margin: '0 auto', fontFamily: 'Arial, sans-serif' }}>
      <header style={{ marginBottom: '40px', textAlign: 'center' }}>
        <h1 style={{ color: '#333', marginBottom: '10px' }}>WYSIWYG Editor Demo</h1>
        <p style={{ color: '#666', fontSize: '16px' }}>
          A lightweight, accessible WYSIWYG editor built with React and native browser APIs
        </p>
      </header>

      {/* Main Interactive Demo */}
      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ color: '#333', marginBottom: '15px' }}>🎨 Interactive Demo</h2>
        <p style={{ color: '#666', marginBottom: '20px' }}>
          Experience the full power of the configurable WYSIWYG editor. Try different toolbar configurations to see how the editor adapts to various use cases - from simple comment boxes to full-featured content editors.
        </p>

        {/* Info about the gear icon */}
        <div style={{ marginBottom: '25px', padding: '15px', backgroundColor: '#e8f5e9', borderRadius: '8px', border: '1px solid #c3e6c3' }}>
          <h3 style={{ color: '#333', marginBottom: '10px', fontSize: '16px' }}>🛠️ Configurable Toolbar</h3>
          <p style={{ color: '#666', margin: 0, fontSize: '14px' }}>
            Look for the <strong>⚙️ gear icon</strong> in the top-right corner of the toolbar below.
            Click it to switch between different toolbar configurations and see how the available tools change instantly!
          </p>
        </div>

        {/* Current Configuration Info */}
        <div style={{
          marginBottom: '20px',
          padding: '20px',
          backgroundColor: '#f8f9fa',
          borderRadius: '8px',
          border: '1px solid #e9ecef'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '15px' }}>
            <div>
              <h4 style={{ color: '#333', margin: '0 0 5px 0', fontSize: '16px' }}>
                Current: {currentConfig.name}
              </h4>
              <p style={{ color: '#666', margin: 0, fontSize: '14px' }}>
                {currentConfig.description}
              </p>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                onClick={saveContent}
                style={{
                  padding: '6px 12px',
                  backgroundColor: '#007bff',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '12px'
                }}
              >
                💾 Save
              </button>
              <button
                onClick={loadContent}
                style={{
                  padding: '6px 12px',
                  backgroundColor: '#28a745',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '12px'
                }}
              >
                📂 Load
              </button>
            </div>
          </div>

          <details style={{ marginTop: '10px' }}>
            <summary style={{ cursor: 'pointer', color: '#007bff', fontSize: '14px' }}>
              View Configuration Code
            </summary>
            <pre style={{
              backgroundColor: 'white',
              padding: '12px',
              borderRadius: '4px',
              overflow: 'auto',
              fontSize: '11px',
              margin: '10px 0 0 0',
              border: '1px solid #ddd',
              lineHeight: '1.4'
            }}>
              {currentConfig.config ? JSON.stringify(currentConfig.config, null, 2) : 'undefined // Uses default full toolbar'}
            </pre>
          </details>
        </div>

        {/* The Editor */}
        <div style={{
          border: '2px solid #e9ecef',
          borderRadius: '12px',
          overflow: 'hidden',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
        }}>
          <WYSIWYGEditor
            key={selectedConfig} // Force re-render when config changes
            initialContent={content}
            placeholder="Start creating amazing content! Use the ⚙️ gear icon in the toolbar to switch between different configurations..."
            onChange={handleContentChange}
            toolbarConfig={currentConfig.config}
            showConfigDropdown={true}
            configOptions={toolbarConfigs}
            selectedConfigKey={selectedConfig}
            onConfigChange={setSelectedConfig}
            onFocus={() => { }}
            onBlur={() => { }}
            height="500px" // Increased height for better editing experience
          />
        </div>

        {/* Feature Highlights for Current Config */}
        <div style={{
          marginTop: '20px',
          padding: '15px',
          backgroundColor: '#e8f5e9',
          borderRadius: '8px',
          border: '1px solid #c3e6c3'
        }}>
          <h4 style={{ color: '#333', marginBottom: '10px', fontSize: '14px' }}>
            ✨ What's Available in "{currentConfig.name}":
          </h4>
          <div style={{ fontSize: '13px', color: '#666' }}>
            {selectedConfig === 'default' && (
              <p>All features: Text formatting, headings, lists, alignment, media insertion, links, colors, fonts, special characters, and more!</p>
            )}
            {selectedConfig === 'minimal' && (
              <p>Basic text formatting: Bold, Italic, Underline - perfect for simple text editing needs.</p>
            )}
            {selectedConfig === 'standard' && (
              <p>Common editing tools: Basic formatting, headings (H1-H3), lists, links, and images - great for most content creation.</p>
            )}
            {selectedConfig === 'blog' && (
              <p>Blog-focused tools: Text formatting, all headings, lists, links, images, undo/redo - ideal for article writing.</p>
            )}
            {selectedConfig === 'comment' && (
              <p>Minimal social features: Just Bold, Italic, and Links - perfect for user comments and simple interactions.</p>
            )}
            {selectedConfig === 'noMedia' && (
              <p>Text-focused editing: All formatting and structure tools except media insertion - great for text-only environments.</p>
            )}
            {selectedConfig === 'formattingOnly' && (
              <p>Pure formatting: Bold, Italic, Underline, Strikethrough, Subscript, Superscript - for text styling only.</p>
            )}
          </div>
        </div>
      </section>

      {/* Live Content Output */}
      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ color: '#333', marginBottom: '15px' }}>📄 Live HTML Output</h2>
        <p style={{ color: '#666', marginBottom: '15px' }}>
          See the clean, semantic HTML generated by the editor in real-time. Notice how the editor produces well-structured, accessible markup:
        </p>
        <div style={{
          backgroundColor: '#f8f9fa',
          border: '1px solid #e9ecef',
          borderRadius: '8px',
          padding: '20px',
          fontFamily: 'Monaco, Consolas, "Courier New", monospace',
          fontSize: '13px',
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-word',
          lineHeight: '1.5',
          maxHeight: '300px',
          overflowY: 'auto'
        }}>
          {content || '<em>Start typing in the editor above to see the HTML output...</em>'}
        </div>
        <div style={{
          marginTop: '10px',
          padding: '10px',
          backgroundColor: '#fff3cd',
          borderRadius: '4px',
          fontSize: '12px',
          color: '#856404'
        }}>
          💡 The editor automatically sanitizes content and ensures proper HTML structure for security and accessibility.
        </div>
      </section>

      {/* Saved Content Display */}
      {savedContent && (
        <section style={{ marginBottom: '40px' }}>
          <h2 style={{ color: '#333', marginBottom: '15px' }}>💾 Saved Content Preview</h2>
          <p style={{ color: '#666', marginBottom: '15px' }}>
            Here's how your saved content renders when displayed on a webpage:
          </p>
          <div style={{
            backgroundColor: '#e8f5e8',
            border: '1px solid #c3e6c3',
            borderRadius: '8px',
            padding: '20px',
            minHeight: '100px'
          }}>
            <div dangerouslySetInnerHTML={{ __html: savedContent }} />
          </div>
          <div style={{
            marginTop: '10px',
            padding: '10px',
            backgroundColor: '#d1ecf1',
            borderRadius: '4px',
            fontSize: '12px',
            color: '#0c5460'
          }}>
            ℹ️ This demonstrates how the editor's HTML output renders in a real application.
          </div>
        </section>
      )}

      {/* Configuration Options Guide */}
      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ color: '#333', marginBottom: '15px' }}>🎯 Configuration Options</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
          <div style={{ padding: '20px', backgroundColor: '#fff3cd', borderRadius: '8px', border: '1px solid #ffeaa7' }}>
            <h3 style={{ color: '#333', marginBottom: '10px' }}>Presets</h3>
            <ul style={{ color: '#666', paddingLeft: '20px', fontSize: '14px' }}>
              <li><code>minimal</code>: Bold, Italic, Underline</li>
              <li><code>standard</code>: Common editing features</li>
              <li><code>full</code>: All available buttons</li>
            </ul>
          </div>
          <div style={{ padding: '20px', backgroundColor: '#e3f2fd', borderRadius: '8px', border: '1px solid #90caf9' }}>
            <h3 style={{ color: '#333', marginBottom: '10px' }}>Categories</h3>
            <ul style={{ color: '#666', paddingLeft: '20px', fontSize: '14px' }}>
              <li><code>formatting</code>: Bold, italic, etc.</li>
              <li><code>structure</code>: Headings (H1-H6)</li>
              <li><code>lists</code>: Bullet/numbered lists</li>
              <li><code>alignment</code>: Text alignment</li>
              <li><code>media</code>: Images, files, tables</li>
              <li><code>links</code>: Link creation/removal</li>
              <li><code>advanced</code>: Colors, fonts, etc.</li>
            </ul>
          </div>
          <div style={{ padding: '20px', backgroundColor: '#e8f5e9', borderRadius: '8px', border: '1px solid #a5d6a7' }}>
            <h3 style={{ color: '#333', marginBottom: '10px' }}>Usage Examples</h3>
            <div style={{ fontSize: '12px', fontFamily: 'monospace', color: '#333' }}>
              <div style={{ marginBottom: '8px' }}>
                <strong>Preset:</strong><br />
                <code>{`{ preset: 'minimal' }`}</code>
              </div>
              <div style={{ marginBottom: '8px' }}>
                <strong>Include specific:</strong><br />
                <code>{`{ include: { buttons: ['bold', 'italic'] } }`}</code>
              </div>
              <div>
                <strong>Exclude items:</strong><br />
                <code>{`{ preset: 'full', exclude: { categories: ['media'] } }`}</code>
              </div>
            </div>
          </div>
        </div>
      </section>

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
            <h3 style={{ color: '#333', marginBottom: '10px' }}>Configurable Toolbar</h3>
            <ul style={{ color: '#666', paddingLeft: '20px' }}>
              <li>Preset configurations</li>
              <li>Custom button selection</li>
              <li>Category-based filtering</li>
            </ul>
          </div>
        </div>
      </section>

      <footer style={{
        textAlign: 'center',
        color: '#666',
        fontSize: '14px',
        marginTop: '60px',
        padding: '20px',
        borderTop: '1px solid #e9ecef'
      }}>
        <p style={{ margin: 0 }}>
          🚀 Built with React and TypeScript • 🛡️ XSS Protection • ♿ Accessibility First • 📱 Mobile Responsive
        </p>
        <p style={{ margin: '5px 0 0 0', fontSize: '12px' }}>
          Configurable toolbar system with preset and custom configurations
        </p>
      </footer>
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)