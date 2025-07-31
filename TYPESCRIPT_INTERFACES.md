# TypeScript Interface Documentation

This document provides comprehensive documentation for all TypeScript interfaces and types used in the WYSIWYG Editor, with a focus on the toolbar configuration system.

## Table of Contents

- [Main Component Interfaces](#main-component-interfaces)
- [Toolbar Configuration Types](#toolbar-configuration-types)
- [Utility Types](#utility-types)
- [Command System Types](#command-system-types)
- [Selection and State Types](#selection-and-state-types)
- [Sanitization Types](#sanitization-types)
- [Usage Examples](#usage-examples)

## Main Component Interfaces

### WYSIWYGEditorProps

The main props interface for the WYSIWYG Editor component.

```typescript
interface WYSIWYGEditorProps {
  /** Initial HTML content for the editor */
  initialContent?: string;
  
  /** Placeholder text when editor is empty */
  placeholder?: string;
  
  /** Callback fired when content changes */
  onChange?: (content: string) => void;
  
  /** Callback fired when editor gains focus */
  onFocus?: () => void;
  
  /** Callback fired when editor loses focus */
  onBlur?: () => void;
  
  /** Configuration for toolbar buttons and layout */
  toolbarConfig?: ToolbarConfig;
  
  /** Show configuration dropdown in toolbar */
  showConfigDropdown?: boolean;
  
  /** Available configuration options for dropdown */
  configOptions?: Record<string, { 
    name: string; 
    description?: string; 
    config?: ToolbarConfig 
  }>;
  
  /** Currently selected configuration key */
  selectedConfigKey?: string;
  
  /** Callback when configuration changes */
  onConfigChange?: (configKey: string) => void;
  
  /** Height of the editor (e.g., '400px', 400, 'auto') */
  height?: string | number;
}
```

**Usage Example:**
```typescript
const editorProps: WYSIWYGEditorProps = {
  initialContent: '<p>Hello world</p>',
  placeholder: 'Start typing...',
  onChange: (content) => console.log(content),
  toolbarConfig: { preset: 'standard' },
  height: '300px'
};

<WYSIWYGEditor {...editorProps} />
```

### ToolbarProps

Props interface for the basic Toolbar component.

```typescript
interface ToolbarProps {
  /** Callback for toolbar command execution */
  onCommand: (command: string, value?: string) => void;
  
  /** Set of currently active formatting options */
  activeFormats: Set<string>;
  
  /** Whether undo is available */
  canUndo: boolean;
  
  /** Whether redo is available */
  canRedo: boolean;
  
  /** Resolved toolbar configuration */
  toolbarConfig?: ResolvedToolbarConfig;
  
  /** Show configuration dropdown */
  showConfigDropdown?: boolean;
  
  /** Available configuration options */
  configOptions?: Record<string, { 
    name: string; 
    description?: string; 
    config?: ToolbarConfig 
  }>;
  
  /** Currently selected configuration key */
  selectedConfigKey?: string;
  
  /** Callback when configuration changes */
  onConfigChange?: (configKey: string) => void;
}
```

### EditableAreaProps

Props interface for the EditableArea component.

```typescript
interface EditableAreaProps {
  /** Current HTML content */
  content: string;
  
  /** Placeholder text */
  placeholder: string;
  
  /** Content change callback */
  onContentChange: (content: string) => void;
  
  /** Focus event callback */
  onFocus: () => void;
  
  /** Blur event callback */
  onBlur: () => void;
  
  /** Reference to the editor DOM element */
  editorRef: React.RefObject<HTMLDivElement>;
  
  /** Selection change callback */
  onSelectionChange?: (selectionState: SelectionState) => void;
  
  /** Link click callback */
  onLinkClick?: (event: MouseEvent, linkElement: HTMLAnchorElement) => void;
  
  /** Height of the editable area */
  height?: string | number;
}
```

## Toolbar Configuration Types

### ToolbarConfig

The main configuration interface for customizing toolbar buttons.

```typescript
interface ToolbarConfig {
  /** Quick preset configuration */
  preset?: 'minimal' | 'standard' | 'full';
  
  /** Items to include in the toolbar */
  include?: {
    /** Categories of buttons to include */
    categories?: ToolbarCategory[];
    
    /** Individual buttons to include */
    buttons?: ToolbarButtonType[];
    
    /** Custom groups of buttons */
    groups?: ToolbarGroup[];
  };
  
  /** Items to exclude from the toolbar */
  exclude?: {
    /** Categories of buttons to exclude */
    categories?: ToolbarCategory[];
    
    /** Individual buttons to exclude */
    buttons?: ToolbarButtonType[];
  };
  
  /** Custom ordering of buttons/groups */
  order?: (ToolbarButtonType | ToolbarGroup)[];
}
```

**Configuration Examples:**

```typescript
// Preset-based configuration
const presetConfig: ToolbarConfig = {
  preset: 'minimal'
};

// Category-based configuration
const categoryConfig: ToolbarConfig = {
  include: {
    categories: ['formatting', 'structure', 'lists']
  }
};

// Button-specific configuration
const buttonConfig: ToolbarConfig = {
  include: {
    buttons: ['bold', 'italic', 'h1', 'h2', 'bulletList']
  }
};

// Mixed configuration with exclusions
const mixedConfig: ToolbarConfig = {
  include: {
    categories: ['formatting', 'structure']
  },
  exclude: {
    buttons: ['subscript', 'superscript']
  }
};

// Custom groups with ordering
const groupedConfig: ToolbarConfig = {
  include: {
    groups: [
      { name: 'basic', buttons: ['bold', 'italic', 'underline'] },
      { name: 'headings', buttons: ['h1', 'h2', 'h3'] }
    ]
  }
};
```

### ToolbarCategory

Enum-like type for toolbar button categories.

```typescript
type ToolbarCategory = 
  | 'formatting'    // Text styling: bold, italic, underline, etc.
  | 'structure'     // Document structure: h1-h6
  | 'lists'         // Lists and indentation: bulletList, numberedList, etc.
  | 'alignment'     // Text alignment: alignLeft, alignCenter, etc.
  | 'media'         // Media insertion: image, file, table
  | 'links'         // Link management: link, unlink
  | 'advanced';     // Advanced features: colors, fonts, utilities
```

**Category Mappings:**
```typescript
const CATEGORY_MAPPINGS: Record<ToolbarCategory, ToolbarButtonType[]> = {
  formatting: ['bold', 'italic', 'underline', 'strikethrough', 'subscript', 'superscript'],
  structure: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
  lists: ['bulletList', 'numberedList', 'indent', 'outdent'],
  alignment: ['alignLeft', 'alignCenter', 'alignRight', 'alignJustify'],
  media: ['image', 'file', 'table'],
  links: ['link', 'unlink'],
  advanced: [
    'fontColor', 'backgroundColor', 'fontSize', 'fontFamily',
    'specialChar', 'horizontalRule', 'findReplace', 'sourceCode',
    'fullscreen', 'print', 'undo', 'redo', 'removeFormat'
  ]
};
```

### ToolbarButtonType

Union type of all available toolbar buttons.

```typescript
type ToolbarButtonType = 
  // Text Formatting
  | 'bold' | 'italic' | 'underline' | 'strikethrough'
  | 'subscript' | 'superscript' | 'removeFormat'
  
  // Document Structure  
  | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  
  // Lists and Indentation
  | 'bulletList' | 'numberedList' | 'indent' | 'outdent'
  
  // Text Alignment
  | 'alignLeft' | 'alignCenter' | 'alignRight' | 'alignJustify'
  
  // Media and Content
  | 'image' | 'file' | 'table'
  
  // Links
  | 'link' | 'unlink'
  
  // Advanced Formatting
  | 'fontColor' | 'backgroundColor' | 'fontSize' | 'fontFamily'
  | 'specialChar' | 'horizontalRule'
  
  // Utilities
  | 'findReplace' | 'sourceCode' | 'fullscreen' | 'print'
  | 'undo' | 'redo';
```

**Button Descriptions:**
```typescript
const BUTTON_DESCRIPTIONS: Record<ToolbarButtonType, string> = {
  // Text Formatting
  bold: 'Bold text',
  italic: 'Italic text',
  underline: 'Underlined text',
  strikethrough: 'Strikethrough text',
  subscript: 'Subscript text',
  superscript: 'Superscript text',
  removeFormat: 'Remove all formatting',
  
  // Document Structure
  h1: 'Heading 1',
  h2: 'Heading 2',
  h3: 'Heading 3',
  h4: 'Heading 4',
  h5: 'Heading 5',
  h6: 'Heading 6',
  
  // Lists and Indentation
  bulletList: 'Bullet point list',
  numberedList: 'Numbered list',
  indent: 'Increase indentation',
  outdent: 'Decrease indentation',
  
  // Text Alignment
  alignLeft: 'Align text left',
  alignCenter: 'Center text',
  alignRight: 'Align text right',
  alignJustify: 'Justify text',
  
  // Media and Content
  image: 'Insert image',
  file: 'Upload file',
  table: 'Insert table',
  
  // Links
  link: 'Create link',
  unlink: 'Remove link',
  
  // Advanced Formatting
  fontColor: 'Text color',
  backgroundColor: 'Background color',
  fontSize: 'Font size',
  fontFamily: 'Font family',
  specialChar: 'Special characters',
  horizontalRule: 'Horizontal line',
  
  // Utilities
  findReplace: 'Find and replace',
  sourceCode: 'View source code',
  fullscreen: 'Fullscreen mode',
  print: 'Print document',
  undo: 'Undo action',
  redo: 'Redo action'
};
```

### ToolbarGroup

Interface for custom button groups with visual separators.

```typescript
interface ToolbarGroup {
  /** Unique name for the group */
  name: string;
  
  /** Array of buttons in this group */
  buttons: ToolbarButtonType[];
}
```

**Usage Examples:**
```typescript
// Basic group
const basicGroup: ToolbarGroup = {
  name: 'basic-formatting',
  buttons: ['bold', 'italic', 'underline']
};

// Multiple groups
const groups: ToolbarGroup[] = [
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
    buttons: ['bulletList', 'numberedList']
  }
];

// Using groups in configuration
const groupConfig: ToolbarConfig = {
  include: { groups }
};
```

### ResolvedToolbarConfig

The processed configuration returned by the ToolbarConfigResolver.

```typescript
interface ResolvedToolbarConfig {
  /** Array of toolbar groups with their buttons */
  groups: ToolbarGroup[];
  
  /** Set of all enabled buttons for O(1) lookup */
  enabledButtons: Set<ToolbarButtonType>;
}
```

**Usage Example:**
```typescript
import { ToolbarConfigResolver } from "@prmargas/react-wysiwyg-editor";

const config: ToolbarConfig = {
  include: {
    categories: ['formatting', 'structure']
  }
};

const resolved: ResolvedToolbarConfig = ToolbarConfigResolver.resolve(config);

// Check if a button is enabled
const isBoldEnabled = resolved.enabledButtons.has('bold'); // true

// Iterate through groups
resolved.groups.forEach(group => {
  console.log(`Group: ${group.name}`);
  console.log(`Buttons: ${group.buttons.join(', ')}`);
});
```

## Utility Types

### ToolbarButton

Interface for individual toolbar button configuration.

```typescript
interface ToolbarButton {
  /** Command to execute when button is clicked */
  command: string;
  
  /** Optional value to pass with the command */
  value?: string;
  
  /** Icon identifier for the button */
  icon: string;
  
  /** Tooltip title for the button */
  title: string;
}
```

## Command System Types

### EditorCommand

Interface for editor command configuration.

```typescript
interface EditorCommand {
  /** Type of command execution */
  type: 'execCommand' | 'custom';
  
  /** Command name */
  command: string;
  
  /** Optional command value */
  value?: string;
  
  /** Whether command requires text selection */
  requiresSelection?: boolean;
}
```

### COMMANDS

Predefined command constants for common operations.

```typescript
const COMMANDS = {
  BOLD: { type: 'execCommand' as const, command: 'bold' },
  ITALIC: { type: 'execCommand' as const, command: 'italic' },
  UNDERLINE: { type: 'execCommand' as const, command: 'underline' },
  CREATE_LINK: { type: 'execCommand' as const, command: 'createLink', requiresSelection: true },
  FORMAT_H1: { type: 'execCommand' as const, command: 'formatBlock', value: 'H1' },
  FORMAT_H2: { type: 'execCommand' as const, command: 'formatBlock', value: 'H2' },
  FORMAT_H3: { type: 'execCommand' as const, command: 'formatBlock', value: 'H3' },
  INSERT_UNORDERED_LIST: { type: 'execCommand' as const, command: 'insertUnorderedList' },
  INSERT_ORDERED_LIST: { type: 'execCommand' as const, command: 'insertOrderedList' },
  JUSTIFY_LEFT: { type: 'execCommand' as const, command: 'justifyLeft' },
  JUSTIFY_CENTER: { type: 'execCommand' as const, command: 'justifyCenter' },
  JUSTIFY_RIGHT: { type: 'execCommand' as const, command: 'justifyRight' },
  UNDO: { type: 'execCommand' as const, command: 'undo' },
  REDO: { type: 'execCommand' as const, command: 'redo' },
  REMOVE_FORMAT: { type: 'execCommand' as const, command: 'removeFormat' }
};
```

## Selection and State Types

### SelectionState

Interface for managing editor selection state.

```typescript
interface SelectionState {
  /** Current selection range */
  range: Range | null;
  
  /** Whether selection is collapsed (cursor position) */
  isCollapsed: boolean;
  
  /** Set of currently active formatting options */
  activeFormats: Set<string>;
  
  /** Current block-level format (e.g., 'H1', 'P') */
  currentBlockFormat: string;
}
```

**Usage Example:**
```typescript
const handleSelectionChange = (selectionState: SelectionState) => {
  console.log('Selection collapsed:', selectionState.isCollapsed);
  console.log('Active formats:', Array.from(selectionState.activeFormats));
  console.log('Block format:', selectionState.currentBlockFormat);
  
  // Update UI based on selection
  if (selectionState.activeFormats.has('bold')) {
    // Highlight bold button
  }
};
```

## Sanitization Types

### SanitizationConfig

Configuration for HTML content sanitization.

```typescript
interface SanitizationConfig {
  /** Array of allowed HTML tags */
  allowedTags: string[];
  
  /** Map of tag names to allowed attributes */
  allowedAttributes: Record<string, string[]>;
}
```

### DEFAULT_SANITIZATION_CONFIG

Default sanitization configuration.

```typescript
const DEFAULT_SANITIZATION_CONFIG: SanitizationConfig = {
  allowedTags: [
    'p', 'br', 'strong', 'em', 'u', 
    'h1', 'h2', 'h3', 'ul', 'ol', 'li', 'a'
  ],
  allowedAttributes: {
    'a': ['href', 'title'],
    '*': ['style'] // Limited style attributes only
  }
};
```

## Usage Examples

### Complete TypeScript Setup

```typescript
import React, { useState, useMemo } from 'react';
import {
  WYSIWYGEditor,
  WYSIWYGEditorProps,
  ToolbarConfig,
  ToolbarCategory,
  ToolbarButtonType,
  ToolbarGroup,
  ResolvedToolbarConfig,
  ToolbarConfigResolver
} from '@prmargas/react-wysiwyg-editor';

// Define configuration with full typing
const createEditorConfig = (
  userLevel: 'beginner' | 'intermediate' | 'advanced'
): ToolbarConfig => {
  const configs: Record<string, ToolbarConfig> = {
    beginner: {
      preset: 'minimal'
    },
    intermediate: {
      include: {
        categories: ['formatting', 'structure', 'lists'] as ToolbarCategory[],
        buttons: ['link', 'image'] as ToolbarButtonType[]
      }
    },
    advanced: {
      preset: 'full',
      exclude: {
        buttons: ['print', 'fullscreen'] as ToolbarButtonType[]
      }
    }
  };
  
  return configs[userLevel];
};

// Custom groups with full typing
const createCustomGroups = (): ToolbarGroup[] => [
  {
    name: 'basic-formatting',
    buttons: ['bold', 'italic', 'underline'] as ToolbarButtonType[]
  },
  {
    name: 'structure',
    buttons: ['h1', 'h2', 'h3'] as ToolbarButtonType[]
  },
  {
    name: 'content',
    buttons: ['bulletList', 'numberedList', 'link', 'image'] as ToolbarButtonType[]
  }
];

// Main component with full typing
interface EditorComponentProps {
  initialContent?: string;
  onContentChange: (content: string) => void;
  userLevel: 'beginner' | 'intermediate' | 'advanced';
  height?: string | number;
}

const EditorComponent: React.FC<EditorComponentProps> = ({
  initialContent = '',
  onContentChange,
  userLevel,
  height = '300px'
}) => {
  const [content, setContent] = useState<string>(initialContent);
  
  // Memoized configuration
  const toolbarConfig: ToolbarConfig = useMemo(() => 
    createEditorConfig(userLevel), 
    [userLevel]
  );
  
  // Resolve configuration for debugging
  const resolvedConfig: ResolvedToolbarConfig = useMemo(() => 
    ToolbarConfigResolver.resolve(toolbarConfig), 
    [toolbarConfig]
  );
  
  // Event handlers with proper typing
  const handleChange = (newContent: string): void => {
    setContent(newContent);
    onContentChange(newContent);
  };
  
  const handleFocus = (): void => {
    console.log('Editor focused');
  };
  
  const handleBlur = (): void => {
    console.log('Editor blurred');
  };
  
  // Props with full typing
  const editorProps: WYSIWYGEditorProps = {
    initialContent: content,
    placeholder: 'Start typing...',
    onChange: handleChange,
    onFocus: handleFocus,
    onBlur: handleBlur,
    toolbarConfig,
    height
  };
  
  // Debug information
  console.log('Enabled buttons:', Array.from(resolvedConfig.enabledButtons));
  console.log('Button groups:', resolvedConfig.groups);
  
  return <WYSIWYGEditor {...editorProps} />;
};

export default EditorComponent;
```

### Advanced Configuration with Validation

```typescript
import { ToolbarConfig, ToolbarButtonType, ToolbarCategory } from '@prmargas/react-wysiwyg-editor';

// Type-safe configuration builder
class ToolbarConfigBuilder {
  private config: ToolbarConfig = {};
  
  preset(preset: 'minimal' | 'standard' | 'full'): this {
    this.config.preset = preset;
    return this;
  }
  
  includeCategories(...categories: ToolbarCategory[]): this {
    if (!this.config.include) this.config.include = {};
    this.config.include.categories = categories;
    return this;
  }
  
  includeButtons(...buttons: ToolbarButtonType[]): this {
    if (!this.config.include) this.config.include = {};
    this.config.include.buttons = buttons;
    return this;
  }
  
  excludeButtons(...buttons: ToolbarButtonType[]): this {
    if (!this.config.exclude) this.config.exclude = {};
    this.config.exclude.buttons = buttons;
    return this;
  }
  
  build(): ToolbarConfig {
    return { ...this.config };
  }
}

// Usage
const config = new ToolbarConfigBuilder()
  .preset('standard')
  .includeButtons('image', 'table')
  .excludeButtons('subscript', 'superscript')
  .build();
```

This comprehensive interface documentation provides complete type information for all aspects of the WYSIWYG Editor, with particular focus on the toolbar configuration system. Use these types to ensure type safety and better development experience in your TypeScript projects.