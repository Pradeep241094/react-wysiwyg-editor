import React, { useState, useCallback } from 'react';
import { WYSIWYGEditor } from '../../src/lib/index';
import { ToolbarConfig, ToolbarCategory, ToolbarButtonType } from '../../src/types';

const InteractiveConfigBuilder: React.FC = () => {
  const [configMode, setConfigMode] = useState<'preset' | 'categories' | 'buttons' | 'advanced'>('preset');
  const [selectedPreset, setSelectedPreset] = useState<'minimal' | 'standard' | 'full'>('minimal');
  const [selectedCategories, setSelectedCategories] = useState<Set<ToolbarCategory>>(new Set());
  const [selectedButtons, setSelectedButtons] = useState<Set<ToolbarButtonType>>(new Set());
  const [excludedCategories, setExcludedCategories] = useState<Set<ToolbarCategory>>(new Set());
  const [excludedButtons, setExcludedButtons] = useState<Set<ToolbarButtonType>>(new Set());
  const [content, setContent] = useState('<p>Use the configuration builder below to customize the toolbar above!</p>');

  // Available categories and their buttons
  const categories: Record<ToolbarCategory, { name: string; buttons: ToolbarButtonType[] }> = {
    formatting: {
      name: 'Text Formatting',
      buttons: ['bold', 'italic', 'underline', 'strikethrough', 'subscript', 'superscript']
    },
    structure: {
      name: 'Headings',
      buttons: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']
    },
    lists: {
      name: 'Lists & Indentation',
      buttons: ['bulletList', 'numberedList', 'indent', 'outdent']
    },
    alignment: {
      name: 'Text Alignment',
      buttons: ['alignLeft', 'alignCenter', 'alignRight', 'alignJustify']
    },
    media: {
      name: 'Media & Tables',
      buttons: ['image', 'file', 'table']
    },
    links: {
      name: 'Links',
      buttons: ['link', 'unlink']
    },
    advanced: {
      name: 'Advanced Features',
      buttons: ['fontColor', 'backgroundColor', 'fontSize', 'fontFamily', 'specialChar', 'horizontalRule', 'findReplace', 'sourceCode', 'fullscreen', 'print']
    }
  };

  // All available buttons with friendly names
  const buttonNames: Record<ToolbarButtonType, string> = {
    bold: 'Bold', italic: 'Italic', underline: 'Underline', strikethrough: 'Strikethrough',
    subscript: 'Subscript', superscript: 'Superscript', removeFormat: 'Remove Format',
    h1: 'Heading 1', h2: 'Heading 2', h3: 'Heading 3', h4: 'Heading 4', h5: 'Heading 5', h6: 'Heading 6',
    bulletList: 'Bullet List', numberedList: 'Numbered List', indent: 'Indent', outdent: 'Outdent',
    alignLeft: 'Align Left', alignCenter: 'Align Center', alignRight: 'Align Right', alignJustify: 'Justify',
    image: 'Image', file: 'File Upload', table: 'Table',
    link: 'Link', unlink: 'Unlink',
    fontColor: 'Font Color', backgroundColor: 'Background Color', fontSize: 'Font Size', fontFamily: 'Font Family',
    specialChar: 'Special Characters', horizontalRule: 'Horizontal Rule',
    findReplace: 'Find & Replace', sourceCode: 'Source Code', fullscreen: 'Fullscreen', print: 'Print',
    undo: 'Undo', redo: 'Redo'
  };

  // Generate the current toolbar configuration
  const generateConfig = useCallback((): ToolbarConfig | undefined => {
    switch (configMode) {
      case 'preset':
        return { preset: selectedPreset };
      
      case 'categories':
        if (selectedCategories.size === 0) return undefined;
        return {
          include: {
            categories: Array.from(selectedCategories)
          }
        };
      
      case 'buttons':
        if (selectedButtons.size === 0) return undefined;
        return {
          include: {
            buttons: Array.from(selectedButtons)
          }
        };
      
      case 'advanced':
        const config: ToolbarConfig = {};
        
        if (selectedCategories.size > 0 || selectedButtons.size > 0) {
          config.include = {};
          if (selectedCategories.size > 0) {
            config.include.categories = Array.from(selectedCategories);
          }
          if (selectedButtons.size > 0) {
            config.include.buttons = Array.from(selectedButtons);
          }
        }
        
        if (excludedCategories.size > 0 || excludedButtons.size > 0) {
          config.exclude = {};
          if (excludedCategories.size > 0) {
            config.exclude.categories = Array.from(excludedCategories);
          }
          if (excludedButtons.size > 0) {
            config.exclude.buttons = Array.from(excludedButtons);
          }
        }
        
        return Object.keys(config).length > 0 ? config : undefined;
      
      default:
        return undefined;
    }
  }, [configMode, selectedPreset, selectedCategories, selectedButtons, excludedCategories, excludedButtons]);

  const currentConfig = generateConfig();

  const handleCategoryToggle = (category: ToolbarCategory, isInclude: boolean = true) => {
    const targetSet = isInclude ? selectedCategories : excludedCategories;
    const setterFn = isInclude ? setSelectedCategories : setExcludedCategories;
    
    const newSet = new Set(targetSet);
    if (newSet.has(category)) {
      newSet.delete(category);
    } else {
      newSet.add(category);
    }
    setterFn(newSet);
  };

  const handleButtonToggle = (button: ToolbarButtonType, isInclude: boolean = true) => {
    const targetSet = isInclude ? selectedButtons : excludedButtons;
    const setterFn = isInclude ? setSelectedButtons : setExcludedButtons;
    
    const newSet = new Set(targetSet);
    if (newSet.has(button)) {
      newSet.delete(button);
    } else {
      newSet.add(button);
    }
    setterFn(newSet);
  };

  const resetConfig = () => {
    setSelectedCategories(new Set());
    setSelectedButtons(new Set());
    setExcludedCategories(new Set());
    setExcludedButtons(new Set());
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>🎛️ Interactive Toolbar Configuration Builder</h1>
      <p>Build your own toolbar configuration and see the results in real-time!</p>

      {/* Live Editor Preview */}
      <div style={{ marginBottom: '30px' }}>
        <h2>📝 Live Preview</h2>
        <div style={{
          border: '2px solid #e9ecef',
          borderRadius: '12px',
          overflow: 'hidden',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
        }}>
          <WYSIWYGEditor
            key={JSON.stringify(currentConfig)} // Force re-render when config changes
            initialContent={content}
            onChange={setContent}
            toolbarConfig={currentConfig}
            placeholder="Your toolbar configuration is applied here! Try typing and using the available buttons..."
            height="300px"
          />
        </div>
        
        {/* Configuration Display */}
        <div style={{
          marginTop: '15px',
          padding: '15px',
          backgroundColor: '#f8f9fa',
          borderRadius: '8px',
          border: '1px solid #e9ecef'
        }}>
          <h4 style={{ margin: '0 0 10px 0', color: '#333' }}>Generated Configuration:</h4>
          <pre style={{
            backgroundColor: 'white',
            padding: '12px',
            borderRadius: '4px',
            overflow: 'auto',
            fontSize: '12px',
            margin: 0,
            border: '1px solid #ddd',
            lineHeight: '1.4'
          }}>
            {currentConfig ? JSON.stringify(currentConfig, null, 2) : 'undefined // Uses default full toolbar'}
          </pre>
        </div>
      </div>

      {/* Configuration Builder */}
      <div style={{ marginBottom: '30px' }}>
        <h2>🛠️ Configuration Builder</h2>
        
        {/* Mode Selection */}
        <div style={{ marginBottom: '20px' }}>
          <h3>Choose Configuration Mode:</h3>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            {[
              { key: 'preset', label: '🎯 Presets', desc: 'Use predefined configurations' },
              { key: 'categories', label: '📂 Categories', desc: 'Select entire categories' },
              { key: 'buttons', label: '🔘 Individual Buttons', desc: 'Pick specific buttons' },
              { key: 'advanced', label: '⚙️ Advanced', desc: 'Include & exclude rules' }
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
                  minWidth: '150px'
                }}
              >
                <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>{label}</div>
                <div style={{ fontSize: '12px', opacity: 0.8 }}>{desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Preset Mode */}
        {configMode === 'preset' && (
          <div style={{ padding: '20px', backgroundColor: '#fff3cd', borderRadius: '8px', marginBottom: '20px' }}>
            <h4>🎯 Select Preset Configuration:</h4>
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

        {/* Categories Mode */}
        {configMode === 'categories' && (
          <div style={{ padding: '20px', backgroundColor: '#e3f2fd', borderRadius: '8px', marginBottom: '20px' }}>
            <h4>📂 Select Categories to Include:</h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
              {Object.entries(categories).map(([key, { name, buttons }]) => (
                <label key={key} style={{ display: 'flex', alignItems: 'flex-start', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={selectedCategories.has(key as ToolbarCategory)}
                    onChange={() => handleCategoryToggle(key as ToolbarCategory)}
                    style={{ marginRight: '8px', marginTop: '2px' }}
                  />
                  <div>
                    <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>{name}</div>
                    <div style={{ fontSize: '11px', color: '#666', lineHeight: '1.3' }}>
                      {buttons.map(btn => buttonNames[btn]).join(', ')}
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Individual Buttons Mode */}
        {configMode === 'buttons' && (
          <div style={{ padding: '20px', backgroundColor: '#e8f5e9', borderRadius: '8px', marginBottom: '20px' }}>
            <h4>🔘 Select Individual Buttons:</h4>
            {Object.entries(categories).map(([categoryKey, { name, buttons }]) => (
              <div key={categoryKey} style={{ marginBottom: '20px' }}>
                <h5 style={{ margin: '0 0 10px 0', color: '#333' }}>{name}:</h5>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {buttons.map(button => (
                    <label key={button} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                      <input
                        type="checkbox"
                        checked={selectedButtons.has(button)}
                        onChange={() => handleButtonToggle(button)}
                        style={{ marginRight: '6px' }}
                      />
                      <span style={{ fontSize: '13px' }}>{buttonNames[button]}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
            
            {/* Additional buttons not in categories */}
            <div>
              <h5 style={{ margin: '0 0 10px 0', color: '#333' }}>Other:</h5>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {(['undo', 'redo', 'removeFormat'] as ToolbarButtonType[]).map(button => (
                  <label key={button} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={selectedButtons.has(button)}
                      onChange={() => handleButtonToggle(button)}
                      style={{ marginRight: '6px' }}
                    />
                    <span style={{ fontSize: '13px' }}>{buttonNames[button]}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Advanced Mode */}
        {configMode === 'advanced' && (
          <div style={{ padding: '20px', backgroundColor: '#f8d7da', borderRadius: '8px', marginBottom: '20px' }}>
            <h4>⚙️ Advanced Configuration (Include & Exclude):</h4>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              {/* Include Section */}
              <div>
                <h5 style={{ color: '#28a745', margin: '0 0 15px 0' }}>✅ Include Categories:</h5>
                {Object.entries(categories).map(([key, { name }]) => (
                  <label key={key} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', marginBottom: '8px' }}>
                    <input
                      type="checkbox"
                      checked={selectedCategories.has(key as ToolbarCategory)}
                      onChange={() => handleCategoryToggle(key as ToolbarCategory, true)}
                      style={{ marginRight: '8px' }}
                    />
                    <span style={{ fontSize: '13px' }}>{name}</span>
                  </label>
                ))}
                
                <h5 style={{ color: '#28a745', margin: '15px 0 10px 0' }}>✅ Include Specific Buttons:</h5>
                <div style={{ maxHeight: '150px', overflowY: 'auto', border: '1px solid #ddd', padding: '10px', borderRadius: '4px', backgroundColor: 'white' }}>
                  {Object.entries(buttonNames).map(([button, name]) => (
                    <label key={button} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', marginBottom: '4px' }}>
                      <input
                        type="checkbox"
                        checked={selectedButtons.has(button as ToolbarButtonType)}
                        onChange={() => handleButtonToggle(button as ToolbarButtonType, true)}
                        style={{ marginRight: '6px' }}
                      />
                      <span style={{ fontSize: '12px' }}>{name}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Exclude Section */}
              <div>
                <h5 style={{ color: '#dc3545', margin: '0 0 15px 0' }}>❌ Exclude Categories:</h5>
                {Object.entries(categories).map(([key, { name }]) => (
                  <label key={key} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', marginBottom: '8px' }}>
                    <input
                      type="checkbox"
                      checked={excludedCategories.has(key as ToolbarCategory)}
                      onChange={() => handleCategoryToggle(key as ToolbarCategory, false)}
                      style={{ marginRight: '8px' }}
                    />
                    <span style={{ fontSize: '13px' }}>{name}</span>
                  </label>
                ))}
                
                <h5 style={{ color: '#dc3545', margin: '15px 0 10px 0' }}>❌ Exclude Specific Buttons:</h5>
                <div style={{ maxHeight: '150px', overflowY: 'auto', border: '1px solid #ddd', padding: '10px', borderRadius: '4px', backgroundColor: 'white' }}>
                  {Object.entries(buttonNames).map(([button, name]) => (
                    <label key={button} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', marginBottom: '4px' }}>
                      <input
                        type="checkbox"
                        checked={excludedButtons.has(button as ToolbarButtonType)}
                        onChange={() => handleButtonToggle(button as ToolbarButtonType, false)}
                        style={{ marginRight: '6px' }}
                      />
                      <span style={{ fontSize: '12px' }}>{name}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Reset Button */}
        <div style={{ textAlign: 'center' }}>
          <button
            onClick={resetConfig}
            style={{
              padding: '10px 20px',
              backgroundColor: '#6c757d',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '14px'
            }}
          >
            🔄 Reset Configuration
          </button>
        </div>
      </div>

      {/* Usage Instructions */}
      <div style={{ padding: '20px', backgroundColor: '#e8f5e9', borderRadius: '8px' }}>
        <h3>💡 How to Use This Configuration:</h3>
        <div style={{ fontSize: '14px', lineHeight: '1.6' }}>
          <p><strong>1. Copy the generated configuration</strong> from the code block above</p>
          <p><strong>2. Pass it to your WYSIWYGEditor component:</strong></p>
          <pre style={{
            backgroundColor: 'white',
            padding: '12px',
            borderRadius: '4px',
            fontSize: '12px',
            border: '1px solid #ddd',
            margin: '10px 0'
          }}>
{`const toolbarConfig = ${currentConfig ? JSON.stringify(currentConfig, null, 2) : 'undefined'};

<WYSIWYGEditor 
  toolbarConfig={toolbarConfig}
  // ... other props
/>`}
          </pre>
          <p><strong>3. The toolbar will automatically update</strong> to show only the configured buttons!</p>
        </div>
      </div>
    </div>
  );
};

export default InteractiveConfigBuilder;