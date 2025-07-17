// Import styles for bundling
import './styles.css';

// Main library exports
export { WYSIWYGEditor } from '../components/WYSIWYGEditor';
export { Toolbar } from '../components/Toolbar';
export { AdvancedToolbar } from '../components/AdvancedToolbar';
export { EditableArea } from '../components/EditableArea';

// Utility exports
export { CommandExecutor } from '../utils/commandSystem';
export { ContentSanitizer, contentSanitizer } from '../utils/contentSanitizer';
export { 
  getCurrentSelection, 
  restoreSelection, 
  saveSelection,
  getActiveFormats,
  getCurrentBlockFormat,
  isSelectionInEditor,
  focusEditor,
  focusEditorWithSelection
} from '../utils/selectionUtils';

// Type exports
export type { 
  ToolbarProps, 
  EditableAreaProps, 
  WYSIWYGEditorProps,
  ToolbarButton,
  SelectionState,
  EditorCommand,
  SanitizationConfig
} from '../types';

// Export command constants from utils (more comprehensive)
export { COMMANDS } from '../utils/commandSystem';
export { DEFAULT_SANITIZATION_CONFIG } from '../types';

// Default export for convenience
export { WYSIWYGEditor as default } from '../components/WYSIWYGEditor';