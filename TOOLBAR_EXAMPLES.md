# Toolbar Configuration Examples

This document provides practical examples of toolbar configurations for common use cases.

## Table of Contents

- [Basic Examples](#basic-examples)
- [Use Case Examples](#use-case-examples)
- [Advanced Examples](#advanced-examples)
- [Dynamic Configuration](#dynamic-configuration)
- [Custom Groups](#custom-groups)
- [Integration Examples](#integration-examples)

## Basic Examples

### Minimal Editor
Perfect for simple text input with basic formatting.

```tsx
<WYSIWYGEditor 
  toolbarConfig={{ preset: 'minimal' }}
  placeholder="Enter your text..."
/>
```

**Includes**: Bold, Italic, Underline

### Standard Editor
Good balance of features for most content editing needs.

```tsx
<WYSIWYGEditor 
  toolbarConfig={{ preset: 'standard' }}
  placeholder="Start writing..."
/>
```

**Includes**: Bold, Italic, Underline, H1-H3, Lists, Link, Image

### Full Editor
All available features for power users.

```tsx
<WYSIWYGEditor 
  toolbarConfig={{ preset: 'full' }}
  placeholder="Full-featured editor..."
/>
```

**Includes**: All 35+ available buttons

## Use Case Examples

### Blog Post Editor
Comprehensive editing for blog content with media support.

```tsx
const blogConfig = {
  include: {
    categories: ['formatting', 'structure', 'lists', 'media', 'links'],
    buttons: ['undo', 'redo', 'removeFormat']
  }
};

<WYSIWYGEditor 
  toolbarConfig={blogConfig}
  placeholder="Write your blog post..."
/>
```

### Comment Editor
Simple editor for user comments with minimal features.

```tsx
const commentConfig = {
  include: {
    buttons: ['bold', 'italic', 'link']
  }
};

<WYSIWYGEditor 
  toolbarConfig={commentConfig}
  placeholder="Add a comment..."
/>
```

### Email Editor
Rich formatting for email composition.

```tsx
const emailConfig = {
  include: {
    categories: ['formatting', 'lists', 'alignment'],
    buttons: ['link', 'fontColor', 'backgroundColor']
  },
  exclude: {
    buttons: ['subscript', 'superscript']
  }
};

<WYSIWYGEditor 
  toolbarConfig={emailConfig}
  placeholder="Compose your email..."
/>
```

### Documentation Editor
Structured editing for documentation with headings and lists.

```tsx
const docsConfig = {
  include: {
    categories: ['formatting', 'structure', 'lists'],
    buttons: ['link', 'image', 'table', 'horizontalRule']
  }
};

<WYSIWYGEditor 
  toolbarConfig={docsConfig}
  placeholder="Write documentation..."
/>
```

### Note-Taking Editor
Simple editor for personal notes.

```tsx
const notesConfig = {
  include: {
    buttons: [
      'bold', 'italic', 'underline',
      'h1', 'h2', 'h3',
      'bulletList', 'numberedList',
      'undo', 'redo'
    ]
  }
};

<WYSIWYGEditor 
  toolbarConfig={notesConfig}
  placeholder="Take notes..."
/>
```

### Social Media Post Editor
Editor for social media content with basic formatting.

```tsx
const socialConfig = {
  include: {
    buttons: ['bold', 'italic', 'link', 'bulletList']
  }
};

<WYSIWYGEditor 
  toolbarConfig={socialConfig}
  placeholder="What's on your mind?"
/>
```

### Newsletter Editor
Rich editor for newsletter content.

```tsx
const newsletterConfig = {
  include: {
    categories: ['formatting', 'structure', 'alignment', 'media'],
    buttons: ['link', 'fontColor', 'backgroundColor']
  }
};

<WYSIWYGEditor 
  toolbarConfig={newsletterConfig}
  placeholder="Create your newsletter..."
/>
```

### Code Documentation Editor
Editor optimized for technical documentation.

```tsx
const codeDocsConfig = {
  include: {
    categories: ['formatting', 'structure', 'lists'],
    buttons: ['link', 'sourceCode', 'horizontalRule', 'table']
  }
};

<WYSIWYGEditor 
  toolbarConfig={codeDocsConfig}
  placeholder="Document your code..."
/>
```

## Advanced Examples

### Exclude Specific Features
Start with a preset and remove unwanted features.

```tsx
// Full editor without media buttons
const noMediaConfig = {
  preset: 'full',
  exclude: {
    categories: ['media']
  }
};

// Standard editor without advanced formatting
const simpleStandardConfig = {
  preset: 'standard',
  exclude: {
    buttons: ['subscript', 'superscript']
  }
};

<WYSIWYGEditor toolbarConfig={noMediaConfig} />
<WYSIWYGEditor toolbarConfig={simpleStandardConfig} />
```

### Mixed Include/Exclude Configuration
Combine categories and individual buttons with exclusions.

```tsx
const mixedConfig = {
  include: {
    categories: ['formatting', 'structure'],
    buttons: ['bulletList', 'numberedList', 'link', 'image']
  },
  exclude: {
    buttons: ['strikethrough', 'subscript', 'superscript']
  }
};

<WYSIWYGEditor 
  toolbarConfig={mixedConfig}
  placeholder="Mixed configuration..."
/>
```

### Custom Button Order
Control the exact order of toolbar buttons.

```tsx
const customOrderConfig = {
  include: {
    buttons: ['bold', 'italic', 'underline', 'h1', 'h2', 'bulletList', 'link']
  },
  order: [
    'h1', 'h2',                    // Headings first
    'bold', 'italic', 'underline', // Basic formatting
    'bulletList',                  // Lists
    'link'                         // Links last
  ]
};

<WYSIWYGEditor 
  toolbarConfig={customOrderConfig}
  placeholder="Custom ordered toolbar..."
/>
```

## Dynamic Configuration

### User Preference Based
Change configuration based on user settings.

```tsx
function PreferenceBasedEditor() {
  const [userLevel, setUserLevel] = useState<'beginner' | 'intermediate' | 'advanced'>('beginner');
  
  const configs = {
    beginner: { preset: 'minimal' },
    intermediate: { preset: 'standard' },
    advanced: { preset: 'full' }
  };

  return (
    <div>
      <div className="user-level-selector">
        <label>Editor Level: </label>
        <select 
          value={userLevel} 
          onChange={(e) => setUserLevel(e.target.value as any)}
        >
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
        </select>
      </div>
      
      <WYSIWYGEditor 
        toolbarConfig={configs[userLevel]}
        placeholder={`${userLevel} editor...`}
      />
    </div>
  );
}
```

### Context-Aware Configuration
Different configurations for different content types.

```tsx
function ContextAwareEditor({ 
  contentType 
}: { 
  contentType: 'blog' | 'comment' | 'email' | 'docs' 
}) {
  const configs = {
    blog: {
      include: {
        categories: ['formatting', 'structure', 'lists', 'media', 'links'],
        buttons: ['undo', 'redo']
      }
    },
    comment: {
      include: {
        buttons: ['bold', 'italic', 'link']
      }
    },
    email: {
      include: {
        categories: ['formatting', 'lists', 'alignment'],
        buttons: ['link', 'fontColor']
      }
    },
    docs: {
      include: {
        categories: ['formatting', 'structure', 'lists'],
        buttons: ['link', 'image', 'table', 'sourceCode']
      }
    }
  };

  return (
    <WYSIWYGEditor 
      toolbarConfig={configs[contentType]}
      placeholder={`Enter your ${contentType}...`}
    />
  );
}
```

### Feature Toggle Based
Enable/disable features based on feature flags.

```tsx
function FeatureToggleEditor({ 
  features 
}: { 
  features: {
    mediaUpload: boolean;
    advancedFormatting: boolean;
    tableSupport: boolean;
  }
}) {
  const config = useMemo(() => {
    const baseConfig = {
      include: {
        categories: ['formatting', 'structure', 'lists', 'links'] as const,
        buttons: [] as string[]
      }
    };

    if (features.mediaUpload) {
      baseConfig.include.buttons.push('image', 'file');
    }

    if (features.advancedFormatting) {
      baseConfig.include.buttons.push('fontColor', 'backgroundColor', 'fontSize');
    }

    if (features.tableSupport) {
      baseConfig.include.buttons.push('table');
    }

    return baseConfig;
  }, [features]);

  return (
    <WYSIWYGEditor 
      toolbarConfig={config}
      placeholder="Feature-controlled editor..."
    />
  );
}
```

## Custom Groups

### Organized by Function
Group related buttons together with visual separators.

```tsx
const functionalGroupsConfig = {
  include: {
    groups: [
      {
        name: 'text-formatting',
        buttons: ['bold', 'italic', 'underline', 'strikethrough']
      },
      {
        name: 'headings',
        buttons: ['h1', 'h2', 'h3']
      },
      {
        name: 'lists',
        buttons: ['bulletList', 'numberedList', 'indent', 'outdent']
      },
      {
        name: 'media',
        buttons: ['image', 'link', 'table']
      },
      {
        name: 'utilities',
        buttons: ['undo', 'redo', 'removeFormat']
      }
    ]
  }
};

<WYSIWYGEditor 
  toolbarConfig={functionalGroupsConfig}
  placeholder="Functionally grouped toolbar..."
/>
```

### Priority-Based Groups
Organize buttons by usage frequency.

```tsx
const priorityGroupsConfig = {
  include: {
    groups: [
      {
        name: 'most-used',
        buttons: ['bold', 'italic', 'link']
      },
      {
        name: 'structure',
        buttons: ['h1', 'h2', 'bulletList', 'numberedList']
      },
      {
        name: 'advanced',
        buttons: ['image', 'table', 'fontColor', 'alignment']
      }
    ]
  }
};

<WYSIWYGEditor 
  toolbarConfig={priorityGroupsConfig}
  placeholder="Priority-based toolbar..."
/>
```

### Workflow-Based Groups
Organize buttons according to editing workflow.

```tsx
const workflowGroupsConfig = {
  include: {
    groups: [
      {
        name: 'structure-first',
        buttons: ['h1', 'h2', 'h3', 'bulletList', 'numberedList']
      },
      {
        name: 'then-format',
        buttons: ['bold', 'italic', 'underline', 'fontColor']
      },
      {
        name: 'add-content',
        buttons: ['link', 'image', 'table']
      },
      {
        name: 'final-touches',
        buttons: ['alignCenter', 'alignRight', 'removeFormat']
      }
    ]
  }
};

<WYSIWYGEditor 
  toolbarConfig={workflowGroupsConfig}
  placeholder="Workflow-optimized toolbar..."
/>
```

## Integration Examples

### With Form Libraries
Integration with popular form libraries.

```tsx
// React Hook Form
function FormIntegration() {
  const { control } = useForm();

  return (
    <Controller
      name="content"
      control={control}
      render={({ field }) => (
        <WYSIWYGEditor
          initialContent={field.value}
          onChange={field.onChange}
          toolbarConfig={{ preset: 'standard' }}
          placeholder="Enter content..."
        />
      )}
    />
  );
}

// Formik
function FormikIntegration() {
  return (
    <Formik
      initialValues={{ content: '' }}
      onSubmit={(values) => console.log(values)}
    >
      {({ setFieldValue, values }) => (
        <WYSIWYGEditor
          initialContent={values.content}
          onChange={(content) => setFieldValue('content', content)}
          toolbarConfig={{ preset: 'standard' }}
          placeholder="Enter content..."
        />
      )}
    </Formik>
  );
}
```

### With State Management
Integration with Redux or Zustand.

```tsx
// Redux
function ReduxIntegration() {
  const dispatch = useDispatch();
  const content = useSelector((state: RootState) => state.editor.content);
  const toolbarPreset = useSelector((state: RootState) => state.editor.toolbarPreset);

  return (
    <WYSIWYGEditor
      initialContent={content}
      onChange={(newContent) => dispatch(updateContent(newContent))}
      toolbarConfig={{ preset: toolbarPreset }}
      placeholder="Redux-connected editor..."
    />
  );
}

// Zustand
const useEditorStore = create((set) => ({
  content: '',
  toolbarConfig: { preset: 'standard' },
  updateContent: (content: string) => set({ content }),
  updateToolbarConfig: (config: ToolbarConfig) => set({ toolbarConfig: config })
}));

function ZustandIntegration() {
  const { content, toolbarConfig, updateContent } = useEditorStore();

  return (
    <WYSIWYGEditor
      initialContent={content}
      onChange={updateContent}
      toolbarConfig={toolbarConfig}
      placeholder="Zustand-connected editor..."
    />
  );
}
```

### With Custom Toolbar Component
Using the basic Toolbar component with custom configuration.

```tsx
import { Toolbar, ToolbarConfigResolver } from "@prmargas/react-wysiwyg-editor";

function CustomToolbarIntegration() {
  const [content, setContent] = useState('');
  const [activeFormats, setActiveFormats] = useState(new Set<string>());
  
  const toolbarConfig = {
    include: {
      buttons: ['bold', 'italic', 'h1', 'h2', 'bulletList', 'link']
    }
  };

  // Resolve the configuration
  const resolvedConfig = ToolbarConfigResolver.resolve(toolbarConfig);

  const handleCommand = (command: string, value?: string) => {
    // Handle toolbar commands
    console.log('Command:', command, value);
    // Execute command logic here...
  };

  return (
    <div className="custom-editor">
      <Toolbar
        onCommand={handleCommand}
        activeFormats={activeFormats}
        canUndo={false}
        canRedo={false}
        toolbarConfig={resolvedConfig}
      />
      
      <div 
        className="editable-area"
        contentEditable
        dangerouslySetInnerHTML={{ __html: content }}
        onInput={(e) => setContent(e.currentTarget.innerHTML)}
      />
    </div>
  );
}
```

### Multi-Editor Setup
Multiple editors with different configurations on the same page.

```tsx
function MultiEditorSetup() {
  const [titleContent, setTitleContent] = useState('');
  const [bodyContent, setBodyContent] = useState('');
  const [summaryContent, setSummaryContent] = useState('');

  const titleConfig = {
    include: { buttons: ['bold', 'italic'] }
  };

  const bodyConfig = {
    include: {
      categories: ['formatting', 'structure', 'lists', 'media', 'links']
    }
  };

  const summaryConfig = {
    include: { buttons: ['bold', 'italic', 'bulletList'] }
  };

  return (
    <div className="multi-editor">
      <div className="editor-section">
        <label>Title</label>
        <WYSIWYGEditor
          initialContent={titleContent}
          onChange={setTitleContent}
          toolbarConfig={titleConfig}
          placeholder="Enter title..."
          height="60px"
        />
      </div>

      <div className="editor-section">
        <label>Body</label>
        <WYSIWYGEditor
          initialContent={bodyContent}
          onChange={setBodyContent}
          toolbarConfig={bodyConfig}
          placeholder="Write your content..."
          height="300px"
        />
      </div>

      <div className="editor-section">
        <label>Summary</label>
        <WYSIWYGEditor
          initialContent={summaryContent}
          onChange={setSummaryContent}
          toolbarConfig={summaryConfig}
          placeholder="Brief summary..."
          height="100px"
        />
      </div>
    </div>
  );
}
```

---

## Tips for Choosing Configurations

### For Different User Types

**Beginners**: Use `preset: 'minimal'` or simple button selections
```tsx
{ include: { buttons: ['bold', 'italic', 'bulletList'] } }
```

**Intermediate Users**: Use `preset: 'standard'` or category-based configurations
```tsx
{ include: { categories: ['formatting', 'structure', 'lists'] } }
```

**Power Users**: Use `preset: 'full'` or highly customized configurations
```tsx
{
  include: { categories: ['formatting', 'structure', 'lists', 'media', 'links', 'advanced'] },
  exclude: { buttons: ['print', 'fullscreen'] }
}
```

### For Different Content Types

**Short Content** (comments, social posts): Minimal formatting
**Medium Content** (blog posts, articles): Standard + media
**Long Content** (documentation, books): Full feature set
**Structured Content** (technical docs): Emphasis on headings and lists

### Performance Considerations

- Use presets when possible for better caching
- Avoid overly complex configurations with many groups
- Memoize dynamic configurations to prevent unnecessary re-renders
- Consider the number of buttons for mobile responsiveness

---

This examples file provides practical, copy-paste ready configurations for common use cases. Choose the examples that best match your needs and customize them further as required.