import React from 'react';
import { WYSIWYGEditor } from './src/components/WYSIWYGEditor';
import { Toolbar } from './src/components/Toolbar';
import { ToolbarConfigResolver } from './src/utils/toolbarConfigResolver';
import { ToolbarConfig } from './src/types';

// ============================================================================
// 🛠️ TOOLBAR CONFIGURATION EXAMPLES
// ============================================================================

// Example 1: Minimal Toolbar (Only Basic Formatting)
const MinimalEditor = () => {
  const toolbarConfig: ToolbarConfig = {
    preset: 'minimal' // Only bold, italic, underline
  };

  return (
    <WYSIWYGEditor 
      toolbarConfig={toolbarConfig}
      placeholder="Minimal editor with basic formatting only..."
    />
  );
};

// Example 2: Hide Specific Buttons
const NoMediaEditor = () => {
  const toolbarConfig: ToolbarConfig = {
    preset: 'full',
    exclude: {
      buttons: ['image', 'file', 'table'] // Hide these specific buttons
    }
  };

  return (
    <WYSIWYGEditor 
      toolbarConfig={toolbarConfig}
      placeholder="Full editor without media buttons..."
    />
  );
};

// Example 3: Show Only Specific Categories
const FormattingOnlyEditor = () => {
  const toolbarConfig: ToolbarConfig = {
    include: {
      categories: ['formatting', 'structure'] // Only formatting and headings
    }
  };

  return (
    <WYSIWYGEditor 
      toolbarConfig={toolbarConfig}
      placeholder="Editor with only formatting and heading buttons..."
    />
  );
};

// Example 4: Custom Button Selection
const CustomEditor = () => {
  const toolbarConfig: ToolbarConfig = {
    include: {
      buttons: [
        'bold', 'italic', 'underline',    // Basic formatting
        'h1', 'h2', 'h3',                // Headings
        'bulletList', 'numberedList',    // Lists
        'link', 'unlink',                // Links
        'undo', 'redo'                   // History
      ]
    }
  };

  return (
    <WYSIWYGEditor 
      toolbarConfig={toolbarConfig}
      placeholder="Editor with custom button selection..."
    />
  );
};

// Example 5: Blog Editor Configuration
const BlogEditor = () => {
  const toolbarConfig: ToolbarConfig = {
    include: {
      categories: ['formatting', 'structure', 'lists', 'links'],
      buttons: ['image', 'undo', 'redo'] // Add specific buttons
    },
    exclude: {
      buttons: ['subscript', 'superscript'] // Remove these from formatting
    }
  };

  return (
    <WYSIWYGEditor 
      toolbarConfig={toolbarConfig}
      placeholder="Perfect for blog post writing..."
    />
  );
};

// Example 6: Comment Editor (Very Simple)
const CommentEditor = () => {
  const toolbarConfig: ToolbarConfig = {
    include: {
      buttons: ['bold', 'italic', 'link'] // Only these 3 buttons
    }
  };

  return (
    <WYSIWYGEditor 
      toolbarConfig={toolbarConfig}
      placeholder="Simple editor for user comments..."
    />
  );
};

// Example 7: Using with Basic Toolbar Component
const BasicToolbarExample = () => {
  const config: ToolbarConfig = {
    include: {
      buttons: ['bold', 'italic', 'h1', 'h2']
    }
  };

  // Resolve the configuration
  const resolvedConfig = ToolbarConfigResolver.resolve(config);

  const handleCommand = (command: string, value?: string) => {
    console.log('Command:', command, value);
    // Handle the command...
  };

  return (
    <div>
      <Toolbar
        onCommand={handleCommand}
        activeFormats={new Set()}
        canUndo={false}
        canRedo={false}
        toolbarConfig={resolvedConfig} // Pass resolved config
      />
      {/* Your editable area here */}
    </div>
  );
};

// Example 8: Dynamic Configuration
const DynamicConfigEditor = () => {
  const [editorType, setEditorType] = React.useState<'minimal' | 'blog' | 'full'>('minimal');

  const configs = {
    minimal: { preset: 'minimal' as const },
    blog: {
      include: {
        categories: ['formatting' as const, 'structure' as const, 'lists' as const],
        buttons: ['image' as const, 'link' as const]
      }
    },
    full: { preset: 'full' as const }
  };

  return (
    <div>
      <div style={{ marginBottom: '10px' }}>
        <button onClick={() => setEditorType('minimal')}>Minimal</button>
        <button onClick={() => setEditorType('blog')}>Blog</button>
        <button onClick={() => setEditorType('full')}>Full</button>
      </div>
      
      <WYSIWYGEditor 
        toolbarConfig={configs[editorType]}
        placeholder={`${editorType} editor configuration...`}
      />
    </div>
  );
};

// ============================================================================
// 🎯 AVAILABLE CONFIGURATION OPTIONS
// ============================================================================

/*
PRESETS:
- 'minimal': bold, italic, underline
- 'standard': common editing features
- 'full': all available buttons

CATEGORIES:
- 'formatting': bold, italic, underline, strikethrough, subscript, superscript
- 'structure': h1, h2, h3, h4, h5, h6
- 'lists': bulletList, numberedList, indent, outdent
- 'alignment': alignLeft, alignCenter, alignRight, alignJustify
- 'media': image, file, table
- 'links': link, unlink
- 'advanced': fontColor, backgroundColor, fontSize, fontFamily, etc.

INDIVIDUAL BUTTONS:
'bold', 'italic', 'underline', 'strikethrough',
'subscript', 'superscript', 'removeFormat',
'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
'bulletList', 'numberedList', 'indent', 'outdent',
'alignLeft', 'alignCenter', 'alignRight', 'alignJustify',
'image', 'file', 'table',
'link', 'unlink',
'fontColor', 'backgroundColor', 'fontSize', 'fontFamily',
'specialChar', 'horizontalRule',
'findReplace', 'sourceCode', 'fullscreen', 'print',
'undo', 'redo'

CONFIGURATION PATTERNS:

1. Use Presets:
   { preset: 'minimal' | 'standard' | 'full' }

2. Include Specific Items:
   { include: { buttons: ['bold', 'italic'] } }
   { include: { categories: ['formatting'] } }

3. Exclude Specific Items:
   { preset: 'full', exclude: { buttons: ['image'] } }
   { preset: 'full', exclude: { categories: ['media'] } }

4. Combine Include/Exclude:
   {
     include: { categories: ['formatting', 'structure'] },
     exclude: { buttons: ['subscript', 'superscript'] }
   }

5. Custom Groups:
   {
     include: {
       groups: [
         { name: 'basic', buttons: ['bold', 'italic'] },
         { name: 'headings', buttons: ['h1', 'h2'] }
       ]
     }
   }
*/

export {
  MinimalEditor,
  NoMediaEditor,
  FormattingOnlyEditor,
  CustomEditor,
  BlogEditor,
  CommentEditor,
  BasicToolbarExample,
  DynamicConfigEditor
};