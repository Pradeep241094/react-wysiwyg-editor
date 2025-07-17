import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { CommandExecutor, COMMANDS, commandExecutor } from '../commandSystem';

// Mock document.execCommand and related APIs
const mockExecCommand = vi.fn();
const mockQueryCommandState = vi.fn();
const mockQueryCommandEnabled = vi.fn();
const mockQueryCommandValue = vi.fn();
const mockGetSelection = vi.fn();

// Setup DOM mocks
Object.defineProperty(document, 'execCommand', {
  value: mockExecCommand,
  writable: true
});

Object.defineProperty(document, 'queryCommandState', {
  value: mockQueryCommandState,
  writable: true
});

Object.defineProperty(document, 'queryCommandEnabled', {
  value: mockQueryCommandEnabled,
  writable: true
});

Object.defineProperty(document, 'queryCommandValue', {
  value: mockQueryCommandValue,
  writable: true
});

Object.defineProperty(window, 'getSelection', {
  value: mockGetSelection,
  writable: true
});

describe('CommandExecutor', () => {
  let executor: CommandExecutor;

  beforeEach(() => {
    executor = CommandExecutor.getInstance();
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  describe('Singleton Pattern', () => {
    it('should return the same instance', () => {
      const instance1 = CommandExecutor.getInstance();
      const instance2 = CommandExecutor.getInstance();
      expect(instance1).toBe(instance2);
    });

    it('should return the same instance as the exported commandExecutor', () => {
      const instance = CommandExecutor.getInstance();
      expect(instance).toBe(commandExecutor);
    });
  });

  describe('Command Configuration', () => {
    it('should have all required commands defined', () => {
      const expectedCommands = [
        'BOLD', 'ITALIC', 'UNDERLINE',
        'FORMAT_H1', 'FORMAT_H2', 'FORMAT_H3',
        'INSERT_UNORDERED_LIST', 'INSERT_ORDERED_LIST',
        'JUSTIFY_LEFT', 'JUSTIFY_CENTER', 'JUSTIFY_RIGHT',
        'CREATE_LINK', 'EDIT_LINK', 'UNLINK',
        'UNDO', 'REDO', 'REMOVE_FORMAT'
      ];

      expectedCommands.forEach(cmd => {
        expect(COMMANDS[cmd]).toBeDefined();
        expect(COMMANDS[cmd].command).toBeTruthy();
        expect(COMMANDS[cmd].description).toBeTruthy();
      });
    });

    it('should have correct command properties for basic formatting', () => {
      expect(COMMANDS.BOLD).toEqual({
        type: 'execCommand',
        command: 'bold',
        description: 'Toggle bold formatting'
      });

      expect(COMMANDS.ITALIC).toEqual({
        type: 'execCommand',
        command: 'italic',
        description: 'Toggle italic formatting'
      });
    });

    it('should have correct command properties for headings', () => {
      expect(COMMANDS.FORMAT_H1).toEqual({
        type: 'execCommand',
        command: 'formatBlock',
        value: 'H1',
        description: 'Format as heading 1'
      });
    });

    it('should mark CREATE_LINK as requiring selection', () => {
      expect(COMMANDS.CREATE_LINK.requiresSelection).toBe(true);
    });
  });

  describe('executeCommand', () => {
    it('should execute a basic command successfully', () => {
      mockExecCommand.mockReturnValue(true);

      const result = executor.executeCommand('BOLD');

      expect(mockExecCommand).toHaveBeenCalledWith('bold', false, '');
      expect(result).toEqual({
        success: true,
        command: 'BOLD',
        value: ''
      });
    });

    it('should execute a command with value successfully', () => {
      mockExecCommand.mockReturnValue(true);

      const result = executor.executeCommand('FORMAT_H1');

      expect(mockExecCommand).toHaveBeenCalledWith('formatBlock', false, 'H1');
      expect(result).toEqual({
        success: true,
        command: 'FORMAT_H1',
        value: 'H1'
      });
    });

    it('should execute a command with custom value', () => {
      mockGetSelection.mockReturnValue({
        isCollapsed: false
      });
      mockExecCommand.mockReturnValue(true);

      const result = executor.executeCommand('CREATE_LINK', 'https://example.com');

      expect(mockExecCommand).toHaveBeenCalledWith('createLink', false, 'https://example.com');
      expect(result).toEqual({
        success: true,
        command: 'CREATE_LINK',
        value: 'https://example.com'
      });
    });

    it('should return error for unknown command', () => {
      const result = executor.executeCommand('UNKNOWN_COMMAND');

      expect(result).toEqual({
        success: false,
        error: 'Unknown command: UNKNOWN_COMMAND',
        command: 'UNKNOWN_COMMAND'
      });
      expect(mockExecCommand).not.toHaveBeenCalled();
    });

    it('should return error when command requires selection but none exists', () => {
      mockGetSelection.mockReturnValue({
        isCollapsed: true
      });

      const result = executor.executeCommand('CREATE_LINK', 'https://example.com');

      expect(result).toEqual({
        success: false,
        error: 'Text selection required to create a link',
        command: 'CREATE_LINK'
      });
      expect(mockExecCommand).not.toHaveBeenCalled();
    });

    it('should execute command when selection exists for commands requiring selection', () => {
      mockGetSelection.mockReturnValue({
        isCollapsed: false
      });
      mockExecCommand.mockReturnValue(true);

      const result = executor.executeCommand('CREATE_LINK', 'https://example.com');

      expect(mockExecCommand).toHaveBeenCalledWith('createLink', false, 'https://example.com');
      expect(result.success).toBe(true);
    });

    it('should return error when document.execCommand returns false', () => {
      mockExecCommand.mockReturnValue(false);

      const result = executor.executeCommand('BOLD');

      expect(result).toEqual({
        success: false,
        error: 'Command execution failed: bold',
        command: 'BOLD',
        value: ''
      });
    });

    it('should handle exceptions during command execution', () => {
      mockExecCommand.mockImplementation(() => {
        throw new Error('Command failed');
      });

      const result = executor.executeCommand('BOLD');

      expect(result).toEqual({
        success: false,
        error: 'Command execution error: Command failed',
        command: 'BOLD',
        value: ''
      });
    });

    it('should focus editor element before executing command', () => {
      const mockElement = {
        focus: vi.fn()
      } as unknown as HTMLElement;

      Object.defineProperty(document, 'activeElement', {
        value: null,
        writable: true
      });

      mockExecCommand.mockReturnValue(true);

      executor.executeCommand('BOLD', undefined, mockElement);

      expect(mockElement.focus).toHaveBeenCalled();
    });

    it('should not focus editor element if already focused', () => {
      const mockElement = {
        focus: vi.fn()
      } as unknown as HTMLElement;

      Object.defineProperty(document, 'activeElement', {
        value: mockElement,
        writable: true
      });

      mockExecCommand.mockReturnValue(true);

      executor.executeCommand('BOLD', undefined, mockElement);

      expect(mockElement.focus).not.toHaveBeenCalled();
    });
  });

  describe('getActiveFormats', () => {
    it('should return active formatting states', () => {
      mockQueryCommandState.mockImplementation((command) => {
        return command === 'bold' || command === 'italic';
      });

      const activeFormats = executor.getActiveFormats();

      expect(activeFormats.has('BOLD')).toBe(true);
      expect(activeFormats.has('ITALIC')).toBe(true);
      expect(activeFormats.has('UNDERLINE')).toBe(false);
    });

    it('should handle errors when checking command states', () => {
      mockQueryCommandState.mockImplementation(() => {
        throw new Error('Query failed');
      });

      const activeFormats = executor.getActiveFormats();

      expect(activeFormats.size).toBe(0);
    });

    it('should check all formatting and alignment states', () => {
      mockQueryCommandState.mockReturnValue(false);

      executor.getActiveFormats();

      const expectedCalls = [
        'bold', 'italic', 'underline',
        'justifyLeft', 'justifyCenter', 'justifyRight',
        'insertUnorderedList', 'insertOrderedList'
      ];

      expectedCalls.forEach(command => {
        expect(mockQueryCommandState).toHaveBeenCalledWith(command);
      });
    });
  });

  describe('canUndo', () => {
    it('should return true when undo is enabled', () => {
      mockQueryCommandEnabled.mockReturnValue(true);

      const result = executor.canUndo();

      expect(mockQueryCommandEnabled).toHaveBeenCalledWith('undo');
      expect(result).toBe(true);
    });

    it('should return false when undo is disabled', () => {
      mockQueryCommandEnabled.mockReturnValue(false);

      const result = executor.canUndo();

      expect(result).toBe(false);
    });

    it('should return false when query throws error', () => {
      mockQueryCommandEnabled.mockImplementation(() => {
        throw new Error('Query failed');
      });

      const result = executor.canUndo();

      expect(result).toBe(false);
    });
  });

  describe('canRedo', () => {
    it('should return true when redo is enabled', () => {
      mockQueryCommandEnabled.mockReturnValue(true);

      const result = executor.canRedo();

      expect(mockQueryCommandEnabled).toHaveBeenCalledWith('redo');
      expect(result).toBe(true);
    });

    it('should return false when redo is disabled', () => {
      mockQueryCommandEnabled.mockReturnValue(false);

      const result = executor.canRedo();

      expect(result).toBe(false);
    });

    it('should return false when query throws error', () => {
      mockQueryCommandEnabled.mockImplementation(() => {
        throw new Error('Query failed');
      });

      const result = executor.canRedo();

      expect(result).toBe(false);
    });
  });

  describe('Undo/Redo Commands', () => {
    it('should execute undo command successfully', () => {
      mockExecCommand.mockReturnValue(true);

      const result = executor.executeCommand('UNDO');

      expect(mockExecCommand).toHaveBeenCalledWith('undo', false, '');
      expect(result).toEqual({
        success: true,
        command: 'UNDO',
        value: ''
      });
    });

    it('should execute redo command successfully', () => {
      mockExecCommand.mockReturnValue(true);

      const result = executor.executeCommand('REDO');

      expect(mockExecCommand).toHaveBeenCalledWith('redo', false, '');
      expect(result).toEqual({
        success: true,
        command: 'REDO',
        value: ''
      });
    });

    it('should handle undo command failure', () => {
      mockExecCommand.mockReturnValue(false);

      const result = executor.executeCommand('UNDO');

      expect(result.success).toBe(false);
      expect(result.error).toContain('Command execution failed: undo');
      expect(result.command).toBe('UNDO');
    });

    it('should handle redo command failure', () => {
      mockExecCommand.mockReturnValue(false);

      const result = executor.executeCommand('REDO');

      expect(result.success).toBe(false);
      expect(result.error).toContain('Command execution failed: redo');
      expect(result.command).toBe('REDO');
    });

    it('should handle undo command exception', () => {
      mockExecCommand.mockImplementation((command) => {
        if (command === 'undo') {
          throw new Error('Undo failed');
        }
        return true;
      });

      const result = executor.executeCommand('UNDO');

      expect(result.success).toBe(false);
      expect(result.error).toContain('Command execution error: Undo failed');
      expect(result.command).toBe('UNDO');
    });

    it('should handle redo command exception', () => {
      mockExecCommand.mockImplementation((command) => {
        if (command === 'redo') {
          throw new Error('Redo failed');
        }
        return true;
      });

      const result = executor.executeCommand('REDO');

      expect(result.success).toBe(false);
      expect(result.error).toContain('Command execution error: Redo failed');
      expect(result.command).toBe('REDO');
    });

    it('should focus editor element before executing undo command', () => {
      const mockElement = {
        focus: vi.fn()
      } as unknown as HTMLElement;

      Object.defineProperty(document, 'activeElement', {
        value: null,
        writable: true
      });

      mockExecCommand.mockReturnValue(true);

      executor.executeCommand('UNDO', undefined, mockElement);

      expect(mockElement.focus).toHaveBeenCalled();
      expect(mockExecCommand).toHaveBeenCalledWith('undo', false, '');
    });

    it('should focus editor element before executing redo command', () => {
      const mockElement = {
        focus: vi.fn()
      } as unknown as HTMLElement;

      Object.defineProperty(document, 'activeElement', {
        value: null,
        writable: true
      });

      mockExecCommand.mockReturnValue(true);

      executor.executeCommand('REDO', undefined, mockElement);

      expect(mockElement.focus).toHaveBeenCalled();
      expect(mockExecCommand).toHaveBeenCalledWith('redo', false, '');
    });

    it('should have correct command configuration for undo', () => {
      expect(COMMANDS.UNDO).toEqual({
        type: 'execCommand',
        command: 'undo',
        description: 'Undo last action'
      });
    });

    it('should have correct command configuration for redo', () => {
      expect(COMMANDS.REDO).toEqual({
        type: 'execCommand',
        command: 'redo',
        description: 'Redo last undone action'
      });
    });

    it('should not require selection for undo/redo commands', () => {
      expect(COMMANDS.UNDO.requiresSelection).toBeUndefined();
      expect(COMMANDS.REDO.requiresSelection).toBeUndefined();
    });
  });

  describe('getCurrentBlockFormat', () => {
    it('should return current block format in uppercase', () => {
      mockQueryCommandValue.mockReturnValue('h1');

      const result = executor.getCurrentBlockFormat();

      expect(mockQueryCommandValue).toHaveBeenCalledWith('formatBlock');
      expect(result).toBe('H1');
    });

    it('should return empty string when query throws error', () => {
      mockQueryCommandValue.mockImplementation(() => {
        throw new Error('Query failed');
      });

      const result = executor.getCurrentBlockFormat();

      expect(result).toBe('');
    });

    it('should handle empty format value', () => {
      mockQueryCommandValue.mockReturnValue('');

      const result = executor.getCurrentBlockFormat();

      expect(result).toBe('');
    });
  });

  describe('Heading formatting', () => {
    it('should execute H1 formatting command successfully', () => {
      mockExecCommand.mockReturnValue(true);

      const result = executor.executeCommand('FORMAT_H1');

      expect(mockExecCommand).toHaveBeenCalledWith('formatBlock', false, 'H1');
      expect(result.success).toBe(true);
      expect(result.command).toBe('FORMAT_H1');
      expect(result.value).toBe('H1');
    });

    it('should execute H2 formatting command successfully', () => {
      mockExecCommand.mockReturnValue(true);

      const result = executor.executeCommand('FORMAT_H2');

      expect(mockExecCommand).toHaveBeenCalledWith('formatBlock', false, 'H2');
      expect(result.success).toBe(true);
      expect(result.command).toBe('FORMAT_H2');
      expect(result.value).toBe('H2');
    });

    it('should execute H3 formatting command successfully', () => {
      mockExecCommand.mockReturnValue(true);

      const result = executor.executeCommand('FORMAT_H3');

      expect(mockExecCommand).toHaveBeenCalledWith('formatBlock', false, 'H3');
      expect(result.success).toBe(true);
      expect(result.command).toBe('FORMAT_H3');
      expect(result.value).toBe('H3');
    });

    it('should handle heading format command failure', () => {
      mockExecCommand.mockReturnValue(false);

      const result = executor.executeCommand('FORMAT_H1');

      expect(result.success).toBe(false);
      expect(result.error).toContain('Command execution failed');
    });

    it('should detect H1 format in active formats', () => {
      mockQueryCommandState.mockReturnValue(false);
      mockQueryCommandValue.mockReturnValue('h1');

      const activeFormats = executor.getActiveFormats();

      expect(mockQueryCommandValue).toHaveBeenCalledWith('formatBlock');
      expect(activeFormats.has('FORMAT_H1')).toBe(true);
      expect(activeFormats.has('FORMAT_H2')).toBe(false);
      expect(activeFormats.has('FORMAT_H3')).toBe(false);
    });

    it('should detect H2 format in active formats', () => {
      mockQueryCommandState.mockReturnValue(false);
      mockQueryCommandValue.mockReturnValue('h2');

      const activeFormats = executor.getActiveFormats();

      expect(activeFormats.has('FORMAT_H1')).toBe(false);
      expect(activeFormats.has('FORMAT_H2')).toBe(true);
      expect(activeFormats.has('FORMAT_H3')).toBe(false);
    });

    it('should detect H3 format in active formats', () => {
      mockQueryCommandState.mockReturnValue(false);
      mockQueryCommandValue.mockReturnValue('h3');

      const activeFormats = executor.getActiveFormats();

      expect(activeFormats.has('FORMAT_H1')).toBe(false);
      expect(activeFormats.has('FORMAT_H2')).toBe(false);
      expect(activeFormats.has('FORMAT_H3')).toBe(true);
    });

    it('should not detect heading formats when no heading is active', () => {
      mockQueryCommandState.mockReturnValue(false);
      mockQueryCommandValue.mockReturnValue('div');

      const activeFormats = executor.getActiveFormats();

      expect(activeFormats.has('FORMAT_H1')).toBe(false);
      expect(activeFormats.has('FORMAT_H2')).toBe(false);
      expect(activeFormats.has('FORMAT_H3')).toBe(false);
    });

    it('should handle case-insensitive heading format detection', () => {
      mockQueryCommandState.mockReturnValue(false);
      mockQueryCommandValue.mockReturnValue('H2');

      const activeFormats = executor.getActiveFormats();

      expect(activeFormats.has('FORMAT_H2')).toBe(true);
    });
  });

  describe('List Commands', () => {
    it('should execute unordered list command successfully', () => {
      mockExecCommand.mockReturnValue(true);

      const result = executor.executeCommand('INSERT_UNORDERED_LIST');

      expect(mockExecCommand).toHaveBeenCalledWith('insertUnorderedList', false, '');
      expect(result).toEqual({
        success: true,
        command: 'INSERT_UNORDERED_LIST',
        value: ''
      });
    });

    it('should execute ordered list command successfully', () => {
      mockExecCommand.mockReturnValue(true);

      const result = executor.executeCommand('INSERT_ORDERED_LIST');

      expect(mockExecCommand).toHaveBeenCalledWith('insertOrderedList', false, '');
      expect(result).toEqual({
        success: true,
        command: 'INSERT_ORDERED_LIST',
        value: ''
      });
    });

    it('should handle list command failure', () => {
      mockExecCommand.mockReturnValue(false);

      const result = executor.executeCommand('INSERT_UNORDERED_LIST');

      expect(result.success).toBe(false);
      expect(result.error).toContain('Command execution failed');
    });

    it('should detect active unordered list state', () => {
      mockQueryCommandState.mockImplementation((command) => {
        return command === 'insertUnorderedList';
      });

      const activeFormats = executor.getActiveFormats();

      expect(mockQueryCommandState).toHaveBeenCalledWith('insertUnorderedList');
      expect(activeFormats.has('INSERT_UNORDERED_LIST')).toBe(true);
      expect(activeFormats.has('INSERT_ORDERED_LIST')).toBe(false);
    });

    it('should detect active ordered list state', () => {
      mockQueryCommandState.mockImplementation((command) => {
        return command === 'insertOrderedList';
      });

      const activeFormats = executor.getActiveFormats();

      expect(mockQueryCommandState).toHaveBeenCalledWith('insertOrderedList');
      expect(activeFormats.has('INSERT_ORDERED_LIST')).toBe(true);
      expect(activeFormats.has('INSERT_UNORDERED_LIST')).toBe(false);
    });

    it('should not detect list states when no list is active', () => {
      mockQueryCommandState.mockReturnValue(false);

      const activeFormats = executor.getActiveFormats();

      expect(activeFormats.has('INSERT_UNORDERED_LIST')).toBe(false);
      expect(activeFormats.has('INSERT_ORDERED_LIST')).toBe(false);
    });

    it('should handle both list types being active simultaneously', () => {
      mockQueryCommandState.mockImplementation((command) => {
        return command === 'insertUnorderedList' || command === 'insertOrderedList';
      });

      const activeFormats = executor.getActiveFormats();

      expect(activeFormats.has('INSERT_UNORDERED_LIST')).toBe(true);
      expect(activeFormats.has('INSERT_ORDERED_LIST')).toBe(true);
    });

    it('should have correct command configuration for lists', () => {
      expect(COMMANDS.INSERT_UNORDERED_LIST).toEqual({
        type: 'execCommand',
        command: 'insertUnorderedList',
        description: 'Create bullet list'
      });

      expect(COMMANDS.INSERT_ORDERED_LIST).toEqual({
        type: 'execCommand',
        command: 'insertOrderedList',
        description: 'Create numbered list'
      });
    });

    it('should not require selection for list commands', () => {
      expect(COMMANDS.INSERT_UNORDERED_LIST.requiresSelection).toBeUndefined();
      expect(COMMANDS.INSERT_ORDERED_LIST.requiresSelection).toBeUndefined();
    });
  });

  describe('Text Alignment Commands', () => {
    it('should execute left align command successfully', () => {
      mockExecCommand.mockReturnValue(true);

      const result = executor.executeCommand('JUSTIFY_LEFT');

      expect(mockExecCommand).toHaveBeenCalledWith('justifyLeft', false, '');
      expect(result).toEqual({
        success: true,
        command: 'JUSTIFY_LEFT',
        value: ''
      });
    });

    it('should execute center align command successfully', () => {
      mockExecCommand.mockReturnValue(true);

      const result = executor.executeCommand('JUSTIFY_CENTER');

      expect(mockExecCommand).toHaveBeenCalledWith('justifyCenter', false, '');
      expect(result).toEqual({
        success: true,
        command: 'JUSTIFY_CENTER',
        value: ''
      });
    });

    it('should execute right align command successfully', () => {
      mockExecCommand.mockReturnValue(true);

      const result = executor.executeCommand('JUSTIFY_RIGHT');

      expect(mockExecCommand).toHaveBeenCalledWith('justifyRight', false, '');
      expect(result).toEqual({
        success: true,
        command: 'JUSTIFY_RIGHT',
        value: ''
      });
    });

    it('should handle alignment command failure', () => {
      mockExecCommand.mockReturnValue(false);

      const result = executor.executeCommand('JUSTIFY_CENTER');

      expect(result.success).toBe(false);
      expect(result.error).toContain('Command execution failed: justifyCenter');
    });

    it('should detect active left alignment state', () => {
      mockQueryCommandState.mockImplementation((command) => {
        return command === 'justifyLeft';
      });

      const activeFormats = executor.getActiveFormats();

      expect(mockQueryCommandState).toHaveBeenCalledWith('justifyLeft');
      expect(activeFormats.has('JUSTIFY_LEFT')).toBe(true);
      expect(activeFormats.has('JUSTIFY_CENTER')).toBe(false);
      expect(activeFormats.has('JUSTIFY_RIGHT')).toBe(false);
    });

    it('should detect active center alignment state', () => {
      mockQueryCommandState.mockImplementation((command) => {
        return command === 'justifyCenter';
      });

      const activeFormats = executor.getActiveFormats();

      expect(mockQueryCommandState).toHaveBeenCalledWith('justifyCenter');
      expect(activeFormats.has('JUSTIFY_CENTER')).toBe(true);
      expect(activeFormats.has('JUSTIFY_LEFT')).toBe(false);
      expect(activeFormats.has('JUSTIFY_RIGHT')).toBe(false);
    });

    it('should detect active right alignment state', () => {
      mockQueryCommandState.mockImplementation((command) => {
        return command === 'justifyRight';
      });

      const activeFormats = executor.getActiveFormats();

      expect(mockQueryCommandState).toHaveBeenCalledWith('justifyRight');
      expect(activeFormats.has('JUSTIFY_RIGHT')).toBe(true);
      expect(activeFormats.has('JUSTIFY_LEFT')).toBe(false);
      expect(activeFormats.has('JUSTIFY_CENTER')).toBe(false);
    });

    it('should not detect alignment states when no alignment is active', () => {
      mockQueryCommandState.mockReturnValue(false);

      const activeFormats = executor.getActiveFormats();

      expect(activeFormats.has('JUSTIFY_LEFT')).toBe(false);
      expect(activeFormats.has('JUSTIFY_CENTER')).toBe(false);
      expect(activeFormats.has('JUSTIFY_RIGHT')).toBe(false);
    });

    it('should have correct command configuration for alignment', () => {
      expect(COMMANDS.JUSTIFY_LEFT).toEqual({
        type: 'execCommand',
        command: 'justifyLeft',
        description: 'Align text left'
      });

      expect(COMMANDS.JUSTIFY_CENTER).toEqual({
        type: 'execCommand',
        command: 'justifyCenter',
        description: 'Center align text'
      });

      expect(COMMANDS.JUSTIFY_RIGHT).toEqual({
        type: 'execCommand',
        command: 'justifyRight',
        description: 'Align text right'
      });
    });

    it('should not require selection for alignment commands', () => {
      expect(COMMANDS.JUSTIFY_LEFT.requiresSelection).toBeUndefined();
      expect(COMMANDS.JUSTIFY_CENTER.requiresSelection).toBeUndefined();
      expect(COMMANDS.JUSTIFY_RIGHT.requiresSelection).toBeUndefined();
    });

    it('should apply alignment to current paragraph when no text is selected', () => {
      mockGetSelection.mockReturnValue({
        isCollapsed: true
      });
      mockExecCommand.mockReturnValue(true);

      const result = executor.executeCommand('JUSTIFY_CENTER');

      expect(mockExecCommand).toHaveBeenCalledWith('justifyCenter', false, '');
      expect(result.success).toBe(true);
    });

    it('should apply alignment to selected text when text is selected', () => {
      mockGetSelection.mockReturnValue({
        isCollapsed: false
      });
      mockExecCommand.mockReturnValue(true);

      const result = executor.executeCommand('JUSTIFY_RIGHT');

      expect(mockExecCommand).toHaveBeenCalledWith('justifyRight', false, '');
      expect(result.success).toBe(true);
    });

    it('should handle multiple alignment states being checked', () => {
      mockQueryCommandState.mockImplementation((command) => {
        // Simulate only center alignment being active
        return command === 'justifyCenter';
      });

      const activeFormats = executor.getActiveFormats();

      expect(mockQueryCommandState).toHaveBeenCalledWith('justifyLeft');
      expect(mockQueryCommandState).toHaveBeenCalledWith('justifyCenter');
      expect(mockQueryCommandState).toHaveBeenCalledWith('justifyRight');

      expect(activeFormats.has('JUSTIFY_CENTER')).toBe(true);
      expect(activeFormats.has('JUSTIFY_LEFT')).toBe(false);
      expect(activeFormats.has('JUSTIFY_RIGHT')).toBe(false);
    });
  });

  describe('Selection handling', () => {
    it('should detect empty selection when selection is null', () => {
      mockGetSelection.mockReturnValue(null);

      const result = executor.executeCommand('CREATE_LINK', 'https://example.com');

      expect(result.success).toBe(false);
      expect(result.error).toContain('Text selection required');
    });

    it('should detect empty selection when selection is collapsed', () => {
      mockGetSelection.mockReturnValue({
        isCollapsed: true
      });

      const result = executor.executeCommand('CREATE_LINK', 'https://example.com');

      expect(result.success).toBe(false);
      expect(result.error).toContain('Text selection required');
    });

    it('should detect valid selection when selection is not collapsed', () => {
      mockGetSelection.mockReturnValue({
        isCollapsed: false
      });
      mockExecCommand.mockReturnValue(true);

      const result = executor.executeCommand('CREATE_LINK', 'https://example.com');

      expect(result.success).toBe(true);
    });
  });

  describe('Clear Formatting Commands', () => {
    it('should execute remove format command successfully', () => {
      mockExecCommand.mockReturnValue(true);

      const result = executor.executeCommand('REMOVE_FORMAT');

      expect(mockExecCommand).toHaveBeenCalledWith('removeFormat', false, '');
      expect(result).toEqual({
        success: true,
        command: 'REMOVE_FORMAT',
        value: ''
      });
    });

    it('should handle remove format command failure', () => {
      mockExecCommand.mockReturnValue(false);

      const result = executor.executeCommand('REMOVE_FORMAT');

      expect(result.success).toBe(false);
      expect(result.error).toContain('Command execution failed: removeFormat');
      expect(result.command).toBe('REMOVE_FORMAT');
    });

    it('should handle remove format command exception', () => {
      mockExecCommand.mockImplementation((command) => {
        if (command === 'removeFormat') {
          throw new Error('Remove format failed');
        }
        return true;
      });

      const result = executor.executeCommand('REMOVE_FORMAT');

      expect(result.success).toBe(false);
      expect(result.error).toContain('Command execution error: Remove format failed');
      expect(result.command).toBe('REMOVE_FORMAT');
    });

    it('should focus editor element before executing remove format command', () => {
      const mockElement = {
        focus: vi.fn()
      } as unknown as HTMLElement;

      Object.defineProperty(document, 'activeElement', {
        value: null,
        writable: true
      });

      mockExecCommand.mockReturnValue(true);

      executor.executeCommand('REMOVE_FORMAT', undefined, mockElement);

      expect(mockElement.focus).toHaveBeenCalled();
      expect(mockExecCommand).toHaveBeenCalledWith('removeFormat', false, '');
    });

    it('should work with selected text', () => {
      mockGetSelection.mockReturnValue({
        isCollapsed: false
      });
      mockExecCommand.mockReturnValue(true);

      const result = executor.executeCommand('REMOVE_FORMAT');

      expect(mockExecCommand).toHaveBeenCalledWith('removeFormat', false, '');
      expect(result.success).toBe(true);
    });

    it('should work without selected text for subsequent input', () => {
      mockGetSelection.mockReturnValue({
        isCollapsed: true
      });
      mockExecCommand.mockReturnValue(true);

      const result = executor.executeCommand('REMOVE_FORMAT');

      expect(mockExecCommand).toHaveBeenCalledWith('removeFormat', false, '');
      expect(result.success).toBe(true);
    });

    it('should have correct command configuration', () => {
      expect(COMMANDS.REMOVE_FORMAT).toEqual({
        type: 'execCommand',
        command: 'removeFormat',
        description: 'Clear all formatting'
      });
    });

    it('should not require selection for remove format command', () => {
      expect(COMMANDS.REMOVE_FORMAT.requiresSelection).toBeUndefined();
    });

    it('should preserve text content while removing formatting', () => {
      // This test verifies that the command is called correctly
      // The actual text preservation is handled by the browser's removeFormat implementation
      mockExecCommand.mockReturnValue(true);

      const result = executor.executeCommand('REMOVE_FORMAT');

      expect(mockExecCommand).toHaveBeenCalledWith('removeFormat', false, '');
      expect(result.success).toBe(true);
      expect(result.command).toBe('REMOVE_FORMAT');
    });
  });

  describe('Hyperlink Commands', () => {
    // Mock prompt function
    const mockPrompt = vi.fn();

    beforeEach(() => {
      Object.defineProperty(window, 'prompt', {
        value: mockPrompt,
        writable: true
      });

      // Mock URL constructor
      globalThis.URL = vi.fn().mockImplementation((url) => {
        if (url.includes('invalid')) {
          throw new Error('Invalid URL');
        }
        return { href: url };
      }) as any;

      mockPrompt.mockReturnValue('https://example.com');
    });

    describe('CREATE_LINK', () => {
      it('should create a link with selected text and provided URL', () => {
        mockGetSelection.mockReturnValue({
          isCollapsed: false,
          rangeCount: 1,
          getRangeAt: () => ({
            startContainer: { nodeType: Node.TEXT_NODE, parentElement: document.createElement('div') },
            commonAncestorContainer: document.createElement('div')
          })
        });
        mockExecCommand.mockReturnValue(true);

        const result = executor.executeCommand('CREATE_LINK', 'https://example.com');

        expect(mockExecCommand).toHaveBeenCalledWith('createLink', false, 'https://example.com');
        expect(result.success).toBe(true);
        expect(result.command).toBe('CREATE_LINK');
        expect(result.value).toBe('https://example.com');
      });

      it('should prompt for URL when none provided', () => {
        mockGetSelection.mockReturnValue({
          isCollapsed: false,
          rangeCount: 1,
          getRangeAt: () => ({
            startContainer: { nodeType: Node.TEXT_NODE, parentElement: document.createElement('div') },
            commonAncestorContainer: document.createElement('div')
          })
        });
        mockPrompt.mockReturnValue('https://test.com');
        mockExecCommand.mockReturnValue(true);

        const result = executor.executeCommand('CREATE_LINK');

        expect(mockPrompt).toHaveBeenCalledWith('Enter the URL for the link:');
        expect(mockExecCommand).toHaveBeenCalledWith('createLink', false, 'https://test.com');
        expect(result.success).toBe(true);
      });

      it('should fail when no text is selected', () => {
        mockGetSelection.mockReturnValue({
          isCollapsed: true
        });

        const result = executor.executeCommand('CREATE_LINK');

        expect(result.success).toBe(false);
        expect(result.error).toContain('Text selection required');
      });

      it('should fail when user cancels URL prompt', () => {
        mockGetSelection.mockReturnValue({
          isCollapsed: false,
          rangeCount: 1,
          getRangeAt: () => ({
            startContainer: { nodeType: Node.TEXT_NODE, parentElement: document.createElement('div') },
            commonAncestorContainer: document.createElement('div')
          })
        });
        mockPrompt.mockReturnValue(null);

        const result = executor.executeCommand('CREATE_LINK');

        expect(result.success).toBe(false);
        expect(result.error).toContain('URL is required');
      });

      it('should normalize URLs without protocol', () => {
        mockGetSelection.mockReturnValue({
          isCollapsed: false,
          rangeCount: 1,
          getRangeAt: () => ({
            startContainer: { nodeType: Node.TEXT_NODE, parentElement: document.createElement('div') },
            commonAncestorContainer: document.createElement('div')
          })
        });
        mockExecCommand.mockReturnValue(true);

        const result = executor.executeCommand('CREATE_LINK', 'example.com');

        expect(mockExecCommand).toHaveBeenCalledWith('createLink', false, 'http://example.com');
        expect(result.success).toBe(true);
      });

      it('should handle email addresses', () => {
        mockGetSelection.mockReturnValue({
          isCollapsed: false,
          rangeCount: 1,
          getRangeAt: () => ({
            startContainer: { nodeType: Node.TEXT_NODE, parentElement: document.createElement('div') },
            commonAncestorContainer: document.createElement('div')
          })
        });
        mockExecCommand.mockReturnValue(true);

        const result = executor.executeCommand('CREATE_LINK', 'test@example.com');

        expect(mockExecCommand).toHaveBeenCalledWith('createLink', false, 'mailto:test@example.com');
        expect(result.success).toBe(true);
      });

      it('should handle URL validation and createLink failures', () => {
        mockGetSelection.mockReturnValue({
          isCollapsed: false,
          rangeCount: 1,
          getRangeAt: () => ({
            startContainer: { nodeType: Node.TEXT_NODE, parentElement: document.createElement('div') },
            commonAncestorContainer: document.createElement('div')
          })
        });

        // Mock execCommand to fail
        mockExecCommand.mockReturnValue(false);

        const result = executor.executeCommand('CREATE_LINK', 'some-url');

        expect(result.success).toBe(false);
        expect(result.error).toContain('Failed to create link');
      });

      it('should handle createLink command failure', () => {
        mockGetSelection.mockReturnValue({
          isCollapsed: false,
          rangeCount: 1,
          getRangeAt: () => ({
            startContainer: { nodeType: Node.TEXT_NODE, parentElement: document.createElement('div') },
            commonAncestorContainer: document.createElement('div')
          })
        });
        mockExecCommand.mockReturnValue(false);

        const result = executor.executeCommand('CREATE_LINK', 'https://example.com');

        expect(result.success).toBe(false);
        expect(result.error).toContain('Failed to create link');
      });
    });

    describe('EDIT_LINK', () => {
      let mockLinkElement: HTMLAnchorElement;

      beforeEach(() => {
        mockLinkElement = document.createElement('a');
        mockLinkElement.href = 'https://old-url.com';
        mockLinkElement.textContent = 'Link Text';

        // Mock DOM methods
        mockLinkElement.setAttribute = vi.fn();
        mockLinkElement.getAttribute = vi.fn().mockReturnValue('https://old-url.com');
        mockLinkElement.closest = vi.fn().mockReturnValue(mockLinkElement);
      });

      it('should edit existing link with new URL', () => {
        mockGetSelection.mockReturnValue({
          rangeCount: 1,
          getRangeAt: () => ({
            commonAncestorContainer: mockLinkElement,
            cloneContents: () => {
              const fragment = document.createDocumentFragment();
              fragment.appendChild(mockLinkElement.cloneNode(true));
              return fragment;
            },
            intersectsNode: () => true
          })
        });

        const result = executor.executeCommand('EDIT_LINK', 'https://new-url.com');

        expect(mockLinkElement.setAttribute).toHaveBeenCalledWith('href', 'https://new-url.com');
        expect(result.success).toBe(true);
        expect(result.command).toBe('EDIT_LINK');
        expect(result.value).toBe('https://new-url.com');
      });

      it('should prompt for new URL when none provided', () => {
        mockGetSelection.mockReturnValue({
          rangeCount: 1,
          getRangeAt: () => ({
            commonAncestorContainer: mockLinkElement,
            cloneContents: () => {
              const fragment = document.createDocumentFragment();
              fragment.appendChild(mockLinkElement.cloneNode(true));
              return fragment;
            },
            intersectsNode: () => true
          })
        });
        mockPrompt.mockReturnValue('https://prompted-url.com');

        const result = executor.executeCommand('EDIT_LINK');

        expect(mockPrompt).toHaveBeenCalledWith('Enter the new URL for the link:', 'https://old-url.com');
        expect(result.success).toBe(true);
      });

      it('should fail when no link is found', () => {
        mockGetSelection.mockReturnValue({
          rangeCount: 1,
          getRangeAt: () => ({
            commonAncestorContainer: document.createElement('div'),
            cloneContents: () => document.createDocumentFragment(),
            intersectsNode: () => false
          })
        });

        const result = executor.executeCommand('EDIT_LINK');

        expect(result.success).toBe(false);
        expect(result.error).toContain('No link found');
      });

      it('should handle empty URL by attempting to remove link', () => {
        // Mock the link element to be found by findLinkInSelection
        mockLinkElement.closest = vi.fn().mockReturnValue(mockLinkElement);

        mockGetSelection.mockReturnValue({
          rangeCount: 1,
          getRangeAt: () => ({
            commonAncestorContainer: { nodeType: Node.TEXT_NODE, parentElement: mockLinkElement },
            cloneContents: () => {
              const fragment = document.createDocumentFragment();
              const clonedLink = mockLinkElement.cloneNode(true);
              fragment.appendChild(clonedLink);
              return fragment;
            },
            intersectsNode: () => true
          })
        });

        const result = executor.executeCommand('EDIT_LINK', '');

        // The command should execute successfully, even if DOM manipulation is mocked
        expect(result.success).toBe(true);
        expect(result.command).toBe('EDIT_LINK');
      });

      it('should handle user cancelling edit prompt', () => {
        mockGetSelection.mockReturnValue({
          rangeCount: 1,
          getRangeAt: () => ({
            commonAncestorContainer: mockLinkElement,
            cloneContents: () => {
              const fragment = document.createDocumentFragment();
              fragment.appendChild(mockLinkElement.cloneNode(true));
              return fragment;
            },
            intersectsNode: () => true
          })
        });
        mockPrompt.mockReturnValue(null);

        const result = executor.executeCommand('EDIT_LINK');

        expect(result.success).toBe(false);
        expect(result.error).toContain('Link editing cancelled');
      });
    });

    describe('UNLINK', () => {
      it('should execute unlink command successfully', () => {
        mockExecCommand.mockReturnValue(true);

        const result = executor.executeCommand('UNLINK');

        expect(mockExecCommand).toHaveBeenCalledWith('unlink', false, '');
        expect(result.success).toBe(true);
        expect(result.command).toBe('UNLINK');
      });

      it('should handle unlink command failure', () => {
        mockExecCommand.mockReturnValue(false);

        const result = executor.executeCommand('UNLINK');

        expect(result.success).toBe(false);
        expect(result.error).toContain('Command execution failed');
      });
    });

    describe('Link State Detection', () => {
      it('should detect when cursor is in a link', () => {
        const mockLinkElement = document.createElement('a');
        mockGetSelection.mockReturnValue({
          rangeCount: 1,
          getRangeAt: () => ({
            commonAncestorContainer: mockLinkElement,
            cloneContents: () => {
              const fragment = document.createDocumentFragment();
              fragment.appendChild(mockLinkElement.cloneNode(true));
              return fragment;
            },
            intersectsNode: () => true
          })
        });
        mockQueryCommandState.mockReturnValue(false);

        const activeFormats = executor.getActiveFormats();

        expect(activeFormats.has('CREATE_LINK')).toBe(true);
        expect(activeFormats.has('EDIT_LINK')).toBe(true);
      });

      it('should not detect link state when not in a link', () => {
        mockGetSelection.mockReturnValue({
          rangeCount: 1,
          getRangeAt: () => ({
            commonAncestorContainer: document.createElement('div'),
            cloneContents: () => document.createDocumentFragment(),
            intersectsNode: () => false
          })
        });
        mockQueryCommandState.mockReturnValue(false);

        const activeFormats = executor.getActiveFormats();

        expect(activeFormats.has('CREATE_LINK')).toBe(false);
        expect(activeFormats.has('EDIT_LINK')).toBe(false);
      });
    });

    describe('Command Configuration', () => {
      it('should have correct configuration for CREATE_LINK', () => {
        expect(COMMANDS.CREATE_LINK).toEqual({
          type: 'custom',
          command: 'createLink',
          requiresSelection: true,
          description: 'Create hyperlink'
        });
      });

      it('should have correct configuration for EDIT_LINK', () => {
        expect(COMMANDS.EDIT_LINK).toEqual({
          type: 'custom',
          command: 'editLink',
          description: 'Edit existing hyperlink'
        });
      });

      it('should have correct configuration for UNLINK', () => {
        expect(COMMANDS.UNLINK).toEqual({
          type: 'execCommand',
          command: 'unlink',
          description: 'Remove hyperlink'
        });
      });
    });
  });
});