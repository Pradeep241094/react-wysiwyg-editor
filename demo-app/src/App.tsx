import React, { useState } from 'react';

// Note: In a real demo, you would import from the published package:
// import { WYSIWYGEditor, AdvancedToolbar } from '@your-org/wysiwyg-editor';
// import '@your-org/wysiwyg-editor/styles';

// For this demo, we'll simulate the editor with a mock component
const MockWYSIWYGEditor: React.FC<{
  initialContent?: string;
  onChange?: (content: string) => void;
  placeholder?: string;
  toolbar?: 'basic' | 'advanced';
}> = ({ initialContent = '', onChange, placeholder = 'Start typing...', toolbar = 'basic' }) => {
  const [content, setContent] = useState(initialContent);

  const handleChange = (e: React.FormEvent<HTMLDivElement>) => {
    const newContent = e.currentTarget.innerHTML;
    setContent(newContent);
    onChange?.(newContent);
  };

  return (
    <div className="wysiwyg-editor" style={{ 
      border: '1px solid #e5e7eb', 
      borderRadius: '8px', 
      backgroundColor: 'white',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
    }}>
      <div className={`toolbar ${toolbar === 'advanced' ? 'advanced-toolbar' : ''}`} style={{
        display: 'flex',
        gap: '4px',
        padding: '12px',
        borderBottom: '1px solid #e5e7eb',
        background: 'linear-gradient(to bottom, #ffffff 0%, #f8f9fa 100%)',
        borderTopLeftRadius: '8px',
        borderTopRightRadius: '8px'
      }}>
        <button style={{ padding: '6px 12px', border: '1px solid transparent', borderRadius: '4px', background: 'transparent', cursor: 'pointer' }}>
          <strong>B</strong>
        </button>
        <button style={{ padding: '6px 12px', border: '1px solid transparent', borderRadius: '4px', background: 'transparent', cursor: 'pointer' }}>
          <em>I</em>
        </button>
        <button style={{ padding: '6px 12px', border: '1px solid transparent', borderRadius: '4px', background: 'transparent', cursor: 'pointer' }}>
          <u>U</u>
        </button>
        {toolbar === 'advanced' && (
          <>
            <div style={{ width: '1px', height: '24px', backgroundColor: '#d1d5db', margin: '0 8px' }} />
            <button style={{ padding: '6px 12px', border: '1px solid transparent', borderRadius: '4px', background: 'transparent', cursor: 'pointer' }}>
              🎨
            </button>
            <button style={{ padding: '6px 12px', border: '1px solid transparent', borderRadius: '4px', background: 'transparent', cursor: 'pointer' }}>
              🖼️
            </button>
            <button style={{ padding: '6px 12px', border: '1px solid transparent', borderRadius: '4px', background: 'transparent', cursor: 'pointer' }}>
              🔗
            </button>
          </>
        )}
      </div>
      <div 
        contentEditable
        onInput={handleChange}
        style={{
          minHeight: '200px',
          padding: '16px',
          outline: 'none',
          lineHeight: '1.6',
          fontSize: '16px',
          color: '#1f2937',
          borderBottomLeftRadius: '8px',
          borderBottomRightRadius: '8px'
        }}
        dangerouslySetInnerHTML={{ __html: content || `<p style="color: #9ca3af;">${placeholder}</p>` }}
      />
    </div>
  );
};

function App() {
  const [basicContent, setBasicContent] = useState('<p>Welcome to the <strong>WYSIWYG Editor</strong>!</p><p>This is a demonstration of the library capabilities.</p>');
  const [advancedContent, setAdvancedContent] = useState('<h2>Advanced Editor Demo</h2><p>This editor includes <em>advanced features</em> like:</p><ul><li>Color picker</li><li>Image insertion</li><li>Link management</li><li>Table creation</li></ul>');

  return (
    <div className="demo-container">
      <div className="header">
        <h1>🎨 WYSIWYG Editor Library</h1>
        <p>A lightweight, extensible rich text editor built with React and TypeScript</p>
      </div>

      <div className="demo-section">
        <div className="feature-grid">
          <div className="feature-card">
            <span className="feature-icon">🚀</span>
            <span className="feature-text">Lightweight & Fast</span>
          </div>
          <div className="feature-card">
            <span className="feature-icon">🎯</span>
            <span className="feature-text">Accessibility First</span>
          </div>
          <div className="feature-card">
            <span className="feature-icon">📱</span>
            <span className="feature-text">Mobile Responsive</span>
          </div>
          <div className="feature-card">
            <span className="feature-icon">🛡️</span>
            <span className="feature-text">XSS Protection</span>
          </div>
          <div className="feature-card">
            <span className="feature-icon">⚡</span>
            <span className="feature-text">TypeScript Support</span>
          </div>
          <div className="feature-card">
            <span className="feature-icon">🎨</span>
            <span className="feature-text">Customizable Styling</span>
          </div>
        </div>
      </div>

      <div className="demo-section">
        <h2 className="demo-title">📝 Basic Editor Demo</h2>
        <p className="demo-description">
          Try out the basic WYSIWYG editor with essential formatting tools. Perfect for simple content creation needs.
        </p>
        
        <MockWYSIWYGEditor
          initialContent={basicContent}
          onChange={setBasicContent}
          placeholder="Start typing your content here..."
          toolbar="basic"
        />
        
        <div className="output-section">
          <div className="output-title">HTML Output:</div>
          <div className="output-content">{basicContent}</div>
        </div>
      </div>

      <div className="demo-section">
        <h2 className="demo-title">🔧 Advanced Editor Demo</h2>
        <p className="demo-description">
          Experience the full-featured editor with advanced formatting options, perfect for complex content creation.
        </p>
        
        <MockWYSIWYGEditor
          initialContent={advancedContent}
          onChange={setAdvancedContent}
          placeholder="Create amazing content with advanced features..."
          toolbar="advanced"
        />
        
        <div className="output-section">
          <div className="output-title">HTML Output:</div>
          <div className="output-content">{advancedContent}</div>
        </div>
      </div>

      <div className="demo-section">
        <h2 className="demo-title">📊 Library Statistics</h2>
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-value">124KB</div>
            <div className="stat-label">Bundle Size (ES)</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">21KB</div>
            <div className="stat-label">CSS Size</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">0</div>
            <div className="stat-label">Dependencies</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">TypeScript</div>
            <div className="stat-label">Language</div>
          </div>
        </div>
      </div>

      <div className="demo-section">
        <h2 className="demo-title">💻 Installation & Usage</h2>
        <div className="code-block">
          <div className="code-comment"># Install the package</div>
          <div className="code-line">npm install @your-org/wysiwyg-editor</div>
          <br />
          <div className="code-comment"># Import in your React app</div>
          <div className="code-line">import {'{ WYSIWYGEditor }'} from '@your-org/wysiwyg-editor';</div>
          <div className="code-line">import '@your-org/wysiwyg-editor/styles';</div>
          <br />
          <div className="code-comment"># Use in your component</div>
          <div className="code-line">{'<WYSIWYGEditor onChange={setContent} />'}</div>
        </div>
        
        <div style={{ marginTop: '20px', padding: '20px', backgroundColor: '#f0f9ff', borderRadius: '8px', borderLeft: '4px solid #3b82f6' }}>
          <p style={{ margin: 0, color: '#1e40af', fontWeight: '500' }}>
            💡 <strong>Note:</strong> This demo uses mock components to show the interface. 
            The actual library provides full React components with all the features shown above.
          </p>
        </div>
      </div>

      <div className="demo-section">
        <h2 className="demo-title">🔗 Links & Resources</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '15px' }}>
          <a href="#" style={{ 
            display: 'block', 
            padding: '15px', 
            backgroundColor: '#f8f9fa', 
            borderRadius: '8px', 
            textDecoration: 'none', 
            color: '#1f2937',
            border: '1px solid #e5e7eb',
            transition: 'all 0.2s ease'
          }}>
            📚 Documentation
          </a>
          <a href="#" style={{ 
            display: 'block', 
            padding: '15px', 
            backgroundColor: '#f8f9fa', 
            borderRadius: '8px', 
            textDecoration: 'none', 
            color: '#1f2937',
            border: '1px solid #e5e7eb',
            transition: 'all 0.2s ease'
          }}>
            🐙 GitHub Repository
          </a>
          <a href="#" style={{ 
            display: 'block', 
            padding: '15px', 
            backgroundColor: '#f8f9fa', 
            borderRadius: '8px', 
            textDecoration: 'none', 
            color: '#1f2937',
            border: '1px solid #e5e7eb',
            transition: 'all 0.2s ease'
          }}>
            📦 NPM Package
          </a>
          <a href="#" style={{ 
            display: 'block', 
            padding: '15px', 
            backgroundColor: '#f8f9fa', 
            borderRadius: '8px', 
            textDecoration: 'none', 
            color: '#1f2937',
            border: '1px solid #e5e7eb',
            transition: 'all 0.2s ease'
          }}>
            🎮 Interactive Playground
          </a>
        </div>
      </div>
    </div>
  );
}

export default App;