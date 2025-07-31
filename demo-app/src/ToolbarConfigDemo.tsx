import React, { useState } from 'react';
import { WYSIWYGEditor } from '../../src/lib/index';
import { ToolbarConfig } from '../../src/types';

const ToolbarConfigDemo: React.FC = () => {
  const [selectedConfig, setSelectedConfig] = useState<string>('default');
  const [content, setContent] = useState('<p>Try different toolbar configurations!</p>');

  // Different toolbar configurations
  const configurations: Record<string, { name: string; config?: ToolbarConfig }> = {
    default: {
      name: 'Default (All Buttons)',
      config: undefined // No config = full toolbar
    },
    minimal: {
      name: 'Minimal (Basic Formatting Only)',
      config: {
        preset: 'minimal'
      }
    },
    standard: {
      name: 'Standard (Common Features)',
      config: {
        preset: 'standard'
      }
    },
    blogEditor: {
      name: 'Blog Editor',
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
    commentEditor: {
      name: 'Comment Editor (Very Simple)',
      config: {
        include: {
          buttons: ['bold', 'italic', 'link']
        }
      }
    },
    noMedia: {
      name: 'No Media Buttons',
      config: {
        preset: 'full',
        exclude: {
          categories: ['media']
        }
      }
    },
    customGroups: {
      name: 'Custom Groups',
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
              name: 'actions',
              buttons: ['undo', 'redo', 'removeFormat']
            }
          ]
        }
      }
    },
    formattingOnly: {
      name: 'Formatting Category Only',
      config: {
        include: {
          categories: ['formatting']
        }
      }
    }
  };

  const handleConfigChange = (configKey: string) => {
    setSelectedConfig(configKey);
  };

  const handleContentChange = (newContent: string) => {
    setContent(newContent);
  };

  const currentConfig = configurations[selectedConfig];

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>🛠️ Toolbar Configuration Demo</h1>
      <p>This demo shows how to hide/show specific toolbar elements using different configurations.</p>
      
      <div style={{ marginBottom: '20px' }}>
        <h3>Select Configuration:</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
          {Object.entries(configurations).map(([key, config]) => (
            <button
              key={key}
              onClick={() => handleConfigChange(key)}
              style={{
                padding: '8px 16px',
                border: '1px solid #ccc',
                borderRadius: '4px',
                background: selectedConfig === key ? '#007cba' : 'white',
                color: selectedConfig === key ? 'white' : 'black',
                cursor: 'pointer'
              }}
            >
              {config.name}
            </button>
          ))}
        </div>
      </div>

      <div style={{ marginBottom: '20px', padding: '15px', background: '#f5f5f5', borderRadius: '4px' }}>
        <h4>Current Configuration: {currentConfig.name}</h4>
        <pre style={{ background: 'white', padding: '10px', borderRadius: '4px', overflow: 'auto' }}>
          {currentConfig.config ? JSON.stringify(currentConfig.config, null, 2) : 'undefined (default full toolbar)'}
        </pre>
      </div>

      <div style={{ border: '1px solid #ddd', borderRadius: '4px' }}>
        <WYSIWYGEditor
          initialContent={content}
          onChange={handleContentChange}
          toolbarConfig={currentConfig.config}
          placeholder="Start typing to test the toolbar configuration..."
        />
      </div>

      <div style={{ marginTop: '20px', padding: '15px', background: '#e8f5e9', borderRadius: '4px' }}>
        <h4>💡 What You're Seeing:</h4>
        <ul>
          <li><strong>Default:</strong> All available toolbar buttons (no configuration)</li>
          <li><strong>Minimal:</strong> Only Bold, Italic, Underline buttons</li>
          <li><strong>Standard:</strong> Common editing features</li>
          <li><strong>Blog Editor:</strong> Perfect for blog posts (formatting, headings, lists, links, images)</li>
          <li><strong>Comment Editor:</strong> Very simple (just bold, italic, link)</li>
          <li><strong>No Media:</strong> Full toolbar minus image/file/table buttons</li>
          <li><strong>Custom Groups:</strong> Buttons organized into custom groups</li>
          <li><strong>Formatting Only:</strong> Just the formatting category buttons</li>
        </ul>
      </div>

      <div style={{ marginTop: '20px', padding: '15px', background: '#fff3cd', borderRadius: '4px' }}>
        <h4>🎯 Key Configuration Options:</h4>
        <ul>
          <li><code>preset</code>: 'minimal', 'standard', or 'full'</li>
          <li><code>include.categories</code>: Include entire categories of buttons</li>
          <li><code>include.buttons</code>: Include specific buttons by name</li>
          <li><code>include.groups</code>: Define custom button groups</li>
          <li><code>exclude.categories</code>: Exclude entire categories</li>
          <li><code>exclude.buttons</code>: Exclude specific buttons</li>
        </ul>
      </div>
    </div>
  );
};

export default ToolbarConfigDemo;