import React, { useState } from 'react';
import { WYSIWYGEditor } from '../../src/lib/index';
import { ToolbarConfig } from '../../src/types';
import '../../src/lib/styles.css';

// Embedded Configuration Builder Component
const EmbeddedConfigBuilder: React.FC = () => {
  const [configMode, setConfigMode] = useState<'preset' | 'categories' | 'buttons'>('preset');
  const [selectedPreset, setSelectedPreset] = useState<'minimal' | 'standard' | 'full'>('minimal');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedButtons, setSelectedButtons] = useState<string[]>([]);
  const [builderContent, setBuilderContent] = useState('<p>Use the configuration builder to customize this toolbar!</p>');

  const categories = {
    formatting: { name: 'Text Formatting', buttons: ['bold', 'italic', 'underline', 'strikethrough'] },
    structure: { name: 'Headings', buttons: ['h1', 'h2', 'h3'] },
    lists: { name: 'Lists', buttons: ['bulletList', 'numberedList'] },
    links: { name: 'Links', buttons: ['link', 'unlink'] },
    media: { name: 'Media', buttons: ['image', 'table'] }
  };

  const generateBuilderConfig = (): ToolbarConfig | undefined => {
    switch (configMode) {
      case 'preset':
        return { preset: selectedPreset };
      case 'categories':
        return selectedCategories.length > 0 ? { include: { categories: selectedCategories as any } } : undefined;
      case 'buttons':
        return selectedButtons.length > 0 ? { include: { buttons: selectedButtons as any } } : undefined;
      default:
        return undefined;
    }
  };

  const currentBuilderConfig = generateBuilderConfig();

  return (
    <div>
      <h2 style={{ color: '#333', marginBottom: '20px', textAlign: 'center' }}>🎛️ Interactive Configuration Builder</h2>
      
      {/* Live Preview */}
      <div style={{ marginBottom: '30px' }}>
        <h3 style={{ color: '#333', marginBottom: '15px' }}>📝 Live Preview</h3>
        <div style={{
          border: '2px solid #e9ecef',
          borderRadius: '8px',
          overflow: 'hidden'
        }}>
          <WYSIWYGEditor
            key={JSON.stringify(currentBuilderConfig)}
            initialContent={builderContent}
            onChange={setBuilderContent}
            toolbarConfig={currentBuilderConfig}
            placeholder="Your custom configuration is applied here!"
            height="250px"
          />
        </div>
        
        <div style={{
          marginTop: '15px',
          padding: '15px',
          backgroundColor: 'white',
          borderRadius: '8px',
          border: '1px solid #ddd'
        }}>
          <h4 style={{ margin: '0 0 10px 0', color: '#333' }}>Generated Configuration:</h4>
          <pre style={{
            backgroundColor: '#f8f9fa',
            padding: '12px',
            borderRadius: '4px',
            fontSize: '12px',
            margin: 0,
            overflow: 'auto'
          }}>
            {currentBuilderConfig ? JSON.stringify(currentBuilderConfig, null, 2) : 'undefined // Uses default full toolbar'}
          </pre>
        </div>
      </div>

      {/* Configuration Mode Selection */}
      <div style={{ marginBottom: '25px' }}>
        <h3 style={{ color: '#333', marginBottom: '15px' }}>🛠️ Configuration Mode</h3>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          {[
            { key: 'preset', label: '🎯 Presets', desc: 'Use predefined configurations' },
            { key: 'categories', label: '📂 Categories', desc: 'Select entire categories' },
            { key: 'buttons', label: '🔘 Individual Buttons', desc: 'Pick specific buttons' }
          ].map(({ key, label, desc }) => (
            <button
              key={key}
              onClick={() => setConfigMode(key as any)}
              style={{
                padding: '12px 16px',
                border: '2px solid',
                borderColor: configMode === key ? '#007bff' : '#ddd',
                borderRadius: '8px',
                background: configMode === key ? '#e3f2fd' : 'white',
                color: configMode === key ? '#007bff' : '#333',
                cursor: 'pointer',
                textAlign: 'center',
                minWidth: '140px'
              }}
            >
              <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>{label}</div>
              <div style={{ fontSize: '11px', opacity: 0.8 }}>{desc}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Configuration Options */}
      {configMode === 'preset' && (
        <div style={{ padding: '20px', backgroundColor: '#fff3cd', borderRadius: '8px' }}>
          <h4>🎯 Select Preset:</h4>
          <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
            {[
              { key: 'minimal', label: 'Minimal', desc: 'Bold, Italic, Underline only' },
              { key: 'standard', label: 'Standard', desc: 'Common editing features' },
              { key: 'full', label: 'Full', desc: 'All available buttons' }
            ].map(({ key, label, desc }) => (
              <label key={key} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                <input
                  type="radio"
                  name="preset"
                  value={key}
                  checked={selectedPreset === key}
                  onChange={(e) => setSelectedPreset(e.target.value as any)}
                  style={{ marginRight: '8px' }}
                />
                <div>
                  <div style={{ fontWeight: 'bold' }}>{label}</div>
                  <div style={{ fontSize: '12px', color: '#666' }}>{desc}</div>
                </div>
              </label>
            ))}
          </div>
        </div>
      )}

      {configMode === 'categories' && (
        <div style={{ padding: '20px', backgroundColor: '#e3f2fd', borderRadius: '8px' }}>
          <h4>📂 Select Categories:</h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
            {Object.entries(categories).map(([key, { name, buttons }]) => (
              <label key={key} style={{ display: 'flex', alignItems: 'flex-start', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(key)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedCategories([...selectedCategories, key]);
                    } else {
                      setSelectedCategories(selectedCategories.filter(c => c !== key));
                    }
                  }}
                  style={{ marginRight: '8px', marginTop: '2px' }}
                />
                <div>
                  <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>{name}</div>
                  <div style={{ fontSize: '11px', color: '#666' }}>
                    {buttons.join(', ')}
                  </div>
                </div>
              </label>
            ))}
          </div>
        </div>
      )}

      {configMode === 'buttons' && (
        <div style={{ padding: '20px', backgroundColor: '#e8f5e9', borderRadius: '8px' }}>
          <h4>🔘 Select Individual Buttons:</h4>
          {Object.entries(categories).map(([categoryKey, { name, buttons }]) => (
            <div key={categoryKey} style={{ marginBottom: '15px' }}>
              <h5 style={{ margin: '0 0 8px 0', color: '#333' }}>{name}:</h5>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {buttons.map(button => (
                  <label key={button} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={selectedButtons.includes(button)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedButtons([...selectedButtons, button]);
                        } else {
                          setSelectedButtons(selectedButtons.filter(b => b !== button));
                        }
                      }}
                      style={{ marginRight: '6px' }}
                    />
                    <span style={{ fontSize: '13px' }}>{button}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Usage Instructions */}
      <div style={{ marginTop: '25px', padding: '20px', backgroundColor: '#e8f5e9', borderRadius: '8px' }}>
        <h4 style={{ margin: '0 0 10px 0', color: '#333' }}>💡 How to Use This Configuration:</h4>
        <p style={{ margin: '0 0 10px 0', fontSize: '14px' }}>
          Copy the generated configuration above and use it in your WYSIWYGEditor component:
        </p>
        <pre style={{
          backgroundColor: 'white',
          padding: '12px',
          borderRadius: '4px',
          fontSize: '12px',
          border: '1px solid #ddd',
          margin: 0,
          overflow: 'auto'
        }}>
{`const toolbarConfig = ${currentBuilderConfig ? JSON.stringify(currentBuilderConfig, null, 2) : 'undefined'};

<WYSIWYGEditor 
  toolbarConfig={toolbarConfig}
  // ... other props
/>`}
        </pre>
      </div>
    </div>
  );
};

function App() {
  const [content, setContent] = useState('<h1>Welcome to the WYSIWYG Editor!</h1><p>This is a comprehensive demo showcasing all features. Try different <strong>toolbar configurations</strong> below to see how the editor adapts to different use cases.</p><p>Features include:</p><ul><li><strong>Rich text formatting</strong> - Bold, italic, underline, headings</li><li><em>Lists and structure</em> - Bullet points, numbered lists, alignment</li><li><u>Media insertion</u> - Images, files, tables</li><li>🔗 <a href="https://example.com" target="_blank" rel="noopener noreferrer">Hyperlinks</a> and link management</li></ul><p>Select different toolbar configurations to see how the available tools change!</p>');
  const [savedContent, setSavedContent] = useState('');
  const [selectedConfig, setSelectedConfig] = useState<string>('default');
  const [showConfigBuilder, setShowConfigBuilder] = useState(false);

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
    },
    customGroups: {
      name: 'Custom Groups',
      description: 'Buttons organized into custom groups with separators',
      config: {
        include: {
          groups: [
            {
              name: 'text-formatting',
              buttons: ['bold', 'italic', 'underline']
            },
            {
              name: 'headings',
              buttons: ['h1', 'h2', 'h3']
            },
            {
              name: 'lists',
              buttons: ['bulletList', 'numberedList']
            },
            {
              name: 'actions',
              buttons: ['undo', 'redo', 'removeFormat']
            }
          ]
        }
      }
    },
    newsletter: {
      name: 'Newsletter Editor',
      description: 'Perfect for email newsletters - formatting, headings, links, no complex features',
      config: {
        include: {
          categories: ['formatting', 'structure', 'alignment'],
          buttons: ['link', 'image', 'undo', 'redo']
        },
        exclude: {
          buttons: ['subscript', 'superscript', 'h4', 'h5', 'h6']
        }
      }
    },
    documentation: {
      name: 'Documentation',
      description: 'Great for docs - all headings, lists, links, code, but no media',
      config: {
        include: {
          categories: ['formatting', 'structure', 'lists', 'links'],
          buttons: ['sourceCode', 'undo', 'redo']
        },
        exclude: {
          categories: ['media', 'advanced']
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
            {selectedConfig === 'customGroups' && (
              <p>Custom organization: Buttons grouped into Text Formatting, Headings, Lists, and Actions with visual separators.</p>
            )}
            {selectedConfig === 'newsletter' && (
              <p>Email-focused: Text formatting, headings (H1-H3), alignment, links, images - perfect for newsletter creation.</p>
            )}
            {selectedConfig === 'documentation' && (
              <p>Documentation tools: All formatting and structure, lists, links, source code view - no media or advanced styling.</p>
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

      {/* Interactive Configuration Builder */}
      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ color: '#333', marginBottom: '15px' }}>🎛️ Interactive Configuration Builder</h2>
        <p style={{ color: '#666', marginBottom: '20px' }}>
          Want to create your own custom toolbar configuration? Use our interactive builder to experiment with different settings and see the results in real-time!
        </p>
        <div style={{
          padding: '20px',
          backgroundColor: '#e8f5e9',
          borderRadius: '12px',
          border: '2px solid #4caf50',
          textAlign: 'center'
        }}>
          <h3 style={{ color: '#333', marginBottom: '10px' }}>🚀 Try the Configuration Builder</h3>
          <p style={{ color: '#666', marginBottom: '15px', fontSize: '14px' }}>
            Build your perfect toolbar configuration with our visual interface. Mix and match presets, categories, and individual buttons to create exactly what you need.
          </p>
          <button
            onClick={() => setShowConfigBuilder(!showConfigBuilder)}
            style={{
              padding: '12px 24px',
              backgroundColor: showConfigBuilder ? '#dc3545' : '#4caf50',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: 'bold',
              boxShadow: `0 2px 8px rgba(${showConfigBuilder ? '220, 53, 69' : '76, 175, 80'}, 0.3)`
            }}
          >
            {showConfigBuilder ? '❌ Close Configuration Builder' : '🎛️ Open Configuration Builder'}
          </button>
          <div style={{ marginTop: '10px', fontSize: '12px', color: '#666' }}>
            Opens in a new tab with the interactive builder
          </div>
        </div>
      </section>

      {/* Embedded Configuration Builder */}
      {showConfigBuilder && (
        <section style={{ marginBottom: '40px' }}>
          <div style={{
            padding: '30px',
            backgroundColor: '#f8f9fa',
            borderRadius: '12px',
            border: '2px solid #4caf50',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
          }}>
            <EmbeddedConfigBuilder />
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

      {/* Additional Demo Links */}
      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ color: '#333', marginBottom: '15px' }}>🔗 More Demos & Examples</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
          <div style={{ padding: '20px', backgroundColor: '#e3f2fd', borderRadius: '8px', border: '1px solid #90caf9' }}>
            <h4 style={{ margin: '0 0 10px 0', color: '#333' }}>📚 Configuration Guide</h4>
            <p style={{ color: '#666', fontSize: '14px', marginBottom: '15px' }}>
              Comprehensive guide with code examples for all configuration patterns
            </p>
            <a 
              href="../demo-toolbar-configuration.html" 
              target="_blank"
              style={{
                display: 'inline-block',
                padding: '8px 16px',
                backgroundColor: '#2196f3',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '4px',
                fontSize: '14px'
              }}
            >
              View Guide
            </a>
          </div>
          
          <div style={{ padding: '20px', backgroundColor: '#fff3cd', borderRadius: '8px', border: '1px solid #ffeaa7' }}>
            <h4 style={{ margin: '0 0 10px 0', color: '#333' }}>🎨 Configuration Showcase</h4>
            <p style={{ color: '#666', fontSize: '14px', marginBottom: '15px' }}>
              Visual showcase of all toolbar configuration examples in action
            </p>
            <a 
              href="../test-toolbar-configurations-showcase.html" 
              target="_blank"
              style={{
                display: 'inline-block',
                padding: '8px 16px',
                backgroundColor: '#ffc107',
                color: '#333',
                textDecoration: 'none',
                borderRadius: '4px',
                fontSize: '14px'
              }}
            >
              View Showcase
            </a>
          </div>
          
          <div style={{ padding: '20px', backgroundColor: '#e8f5e9', borderRadius: '8px', border: '1px solid #a5d6a7' }}>
            <h4 style={{ margin: '0 0 10px 0', color: '#333' }}>🎛️ Interactive Builder</h4>
            <p style={{ color: '#666', fontSize: '14px', marginBottom: '15px' }}>
              Build your own toolbar configuration with our visual interface
            </p>
            <button
              onClick={() => setShowConfigBuilder(true)}
              style={{
                display: 'inline-block',
                padding: '8px 16px',
                backgroundColor: '#4caf50',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                fontSize: '14px',
                cursor: 'pointer'
              }}
            >
              Open Builder
            </button>
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
  );
}

export default App;