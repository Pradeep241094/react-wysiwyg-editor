import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { WYSIWYGEditor } from '../WYSIWYGEditor';
import { WYSIWYGEditorProps } from '../../types';

// Mock the command system
vi.mock('../../utils/commandSystem', () => ({
  commandExecutor: {
    executeCommand: vi.fn(),
    getActiveFormats: vi.fn(),
    canUndo: vi.fn(),
    canRedo: vi.fn(),
    getCurrentBlockFormat: vi.fn()
  }
}));

// Mock the selection utils
vi.mock('../../utils/selectionUtils', () => ({
  getCurrentSelection: vi.fn(),
  isSelectionInEditor: vi.fn(),
  focusEditorWithSelection: vi.fn()
}));

import { commandExecutor } from '../../utils/commandSystem';

const mockCommandExecutor = commandExecutor as any;

describe('WYSIWYGEditor Component', () => {
  const defaultProps: WYSIWYGEditorProps = {
    placeholder: 'Start typing...'
  };

  beforeEach(() => {
    vi.clearAllMocks();
    mockCommandExecutor.executeCommand.mockReturnValue({ success: true, command: 'BOLD' });
    mockCommandExecutor.getActiveFormats.mockReturnValue(new Set());
    mockCommandExecutor.canUndo.mockReturnValue(false);
    mockCommandExecutor.canRedo.mockReturnValue(false);
    mockCommandExecutor.getCurrentBlockFormat.mockReturnValue('');
  });

  describe('Basic Text Formatting', () => {
    it('should render toolbar and editable area', () => {
      render(<WYSIWYGEditor {...defaultProps} />);
      
      expect(screen.getByTitle('Bold')).toBeInTheDocument();
      expect(screen.getByTitle('Italic')).toBeInTheDocument();
      expect(screen.getByTitle('Underline')).toBeInTheDocument();
      expect(screen.getByRole('textbox')).toBeInTheDocument();
    });

    it('should execute bold command when bold button is clicked', async () => {
      render(<WYSIWYGEditor {...defaultProps} />);
      
      const boldButton = screen.getByTitle('Bold');
      fireEvent.click(boldButton);
      
      expect(mockCommandExecutor.executeCommand).toHaveBeenCalledWith('BOLD', undefined, expect.any(HTMLElement));
    });

    it('should execute italic command when italic button is clicked', async () => {
      render(<WYSIWYGEditor {...defaultProps} />);
      
      const italicButton = screen.getByTitle('Italic');
      fireEvent.click(italicButton);
      
      expect(mockCommandExecutor.executeCommand).toHaveBeenCalledWith('ITALIC', undefined, expect.any(HTMLElement));
    });

    it('should execute underline command when underline button is clicked', async () => {
      render(<WYSIWYGEditor {...defaultProps} />);
      
      const underlineButton = screen.getByTitle('Underline');
      fireEvent.click(underlineButton);
      
      expect(mockCommandExecutor.executeCommand).toHaveBeenCalledWith('UNDERLINE', undefined, expect.any(HTMLElement));
    });

    it('should update content after successful command execution', async () => {
      const mockOnChange = vi.fn();
      render(<WYSIWYGEditor {...defaultProps} onChange={mockOnChange} />);
      
      const boldButton = screen.getByTitle('Bold');
      fireEvent.click(boldButton);
      
      // Wait for the setTimeout to execute
      await waitFor(() => {
        expect(mockOnChange).toHaveBeenCalled();
      });
    });

    it('should not update content when command execution fails', async () => {
      mockCommandExecutor.executeCommand.mockReturnValue({ 
        success: false, 
        command: 'BOLD', 
        error: 'Command failed' 
      });
      
      const mockOnChange = vi.fn();
      render(<WYSIWYGEditor {...defaultProps} onChange={mockOnChange} />);
      
      const boldButton = screen.getByTitle('Bold');
      fireEvent.click(boldButton);
      
      // Wait a bit to ensure setTimeout would have executed if it was going to
      await new Promise(resolve => setTimeout(resolve, 10));
      
      expect(mockOnChange).not.toHaveBeenCalled();
    });
  });

  describe('Format State Detection', () => {
    it('should highlight active formatting buttons', async () => {
      mockCommandExecutor.getActiveFormats.mockReturnValue(new Set(['BOLD', 'ITALIC']));
      
      render(<WYSIWYGEditor {...defaultProps} />);
      
      // Focus the editor to trigger format state updates
      const editorArea = screen.getByRole('textbox');
      fireEvent.focus(editorArea);
      
      await waitFor(() => {
        const boldButton = screen.getByTitle('Bold');
        const italicButton = screen.getByTitle('Italic');
        const underlineButton = screen.getByTitle('Underline');
        
        expect(boldButton).toHaveClass('active');
        expect(italicButton).toHaveClass('active');
        expect(underlineButton).not.toHaveClass('active');
      });
    });

    it('should update format states when editor gains focus', async () => {
      render(<WYSIWYGEditor {...defaultProps} />);
      
      const editorArea = screen.getByRole('textbox');
      fireEvent.focus(editorArea);
      
      await waitFor(() => {
        expect(mockCommandExecutor.getActiveFormats).toHaveBeenCalled();
      });
    });

    it('should update format states after content changes', async () => {
      render(<WYSIWYGEditor {...defaultProps} />);
      
      const editorArea = screen.getByRole('textbox');
      
      // First focus the editor to enable format state tracking
      fireEvent.focus(editorArea);
      
      // Clear previous calls
      mockCommandExecutor.getActiveFormats.mockClear();
      
      // Simulate content change
      fireEvent.input(editorArea, { target: { innerHTML: '<strong>Bold text</strong>' } });
      
      // Wait for the setTimeout to execute
      await waitFor(() => {
        expect(mockCommandExecutor.getActiveFormats).toHaveBeenCalled();
      }, { timeout: 100 });
    });
  });

  describe('Toggle Behavior', () => {
    it('should toggle formatting when button is clicked multiple times', async () => {
      render(<WYSIWYGEditor {...defaultProps} />);
      
      const boldButton = screen.getByTitle('Bold');
      
      // First click
      fireEvent.click(boldButton);
      expect(mockCommandExecutor.executeCommand).toHaveBeenCalledWith('BOLD', undefined, expect.any(HTMLElement));
      
      // Second click
      fireEvent.click(boldButton);
      expect(mockCommandExecutor.executeCommand).toHaveBeenCalledTimes(2);
      expect(mockCommandExecutor.executeCommand).toHaveBeenLastCalledWith('BOLD', undefined, expect.any(HTMLElement));
    });

    it('should maintain independent state for different formatting options', async () => {
      render(<WYSIWYGEditor {...defaultProps} />);
      
      const boldButton = screen.getByTitle('Bold');
      const italicButton = screen.getByTitle('Italic');
      
      fireEvent.click(boldButton);
      fireEvent.click(italicButton);
      
      expect(mockCommandExecutor.executeCommand).toHaveBeenCalledWith('BOLD', undefined, expect.any(HTMLElement));
      expect(mockCommandExecutor.executeCommand).toHaveBeenCalledWith('ITALIC', undefined, expect.any(HTMLElement));
    });
  });

  describe('Undo/Redo State Management', () => {
    it('should enable undo button when undo is available', async () => {
      mockCommandExecutor.canUndo.mockReturnValue(true);
      
      render(<WYSIWYGEditor {...defaultProps} />);
      
      // Focus the editor to trigger state updates
      const editorArea = screen.getByRole('textbox');
      fireEvent.focus(editorArea);
      
      await waitFor(() => {
        const undoButton = screen.getByTitle('Undo');
        expect(undoButton).not.toBeDisabled();
      });
    });

    it('should disable undo button when undo is not available', () => {
      mockCommandExecutor.canUndo.mockReturnValue(false);
      
      render(<WYSIWYGEditor {...defaultProps} />);
      
      const undoButton = screen.getByTitle('Undo');
      expect(undoButton).toBeDisabled();
    });

    it('should enable redo button when redo is available', async () => {
      mockCommandExecutor.canRedo.mockReturnValue(true);
      
      render(<WYSIWYGEditor {...defaultProps} />);
      
      // Focus the editor to trigger state updates
      const editorArea = screen.getByRole('textbox');
      fireEvent.focus(editorArea);
      
      await waitFor(() => {
        const redoButton = screen.getByTitle('Redo');
        expect(redoButton).not.toBeDisabled();
      });
    });

    it('should disable redo button when redo is not available', () => {
      mockCommandExecutor.canRedo.mockReturnValue(false);
      
      render(<WYSIWYGEditor {...defaultProps} />);
      
      const redoButton = screen.getByTitle('Redo');
      expect(redoButton).toBeDisabled();
    });
  });

  describe('Undo/Redo Command Execution', () => {
    it('should execute undo command when undo button is clicked', async () => {
      mockCommandExecutor.canUndo.mockReturnValue(true);
      mockCommandExecutor.executeCommand.mockReturnValue({ success: true, command: 'UNDO' });
      
      render(<WYSIWYGEditor {...defaultProps} />);
      
      // Focus the editor to trigger state updates and enable the button
      const editorArea = screen.getByRole('textbox');
      fireEvent.focus(editorArea);
      
      await waitFor(() => {
        const undoButton = screen.getByTitle('Undo');
        expect(undoButton).not.toBeDisabled();
      });
      
      const undoButton = screen.getByTitle('Undo');
      fireEvent.click(undoButton);
      
      expect(mockCommandExecutor.executeCommand).toHaveBeenCalledWith('UNDO', undefined, expect.any(HTMLElement));
    });

    it('should execute redo command when redo button is clicked', async () => {
      mockCommandExecutor.canRedo.mockReturnValue(true);
      mockCommandExecutor.executeCommand.mockReturnValue({ success: true, command: 'REDO' });
      
      render(<WYSIWYGEditor {...defaultProps} />);
      
      // Focus the editor to trigger state updates and enable the button
      const editorArea = screen.getByRole('textbox');
      fireEvent.focus(editorArea);
      
      await waitFor(() => {
        const redoButton = screen.getByTitle('Redo');
        expect(redoButton).not.toBeDisabled();
      });
      
      const redoButton = screen.getByTitle('Redo');
      fireEvent.click(redoButton);
      
      expect(mockCommandExecutor.executeCommand).toHaveBeenCalledWith('REDO', undefined, expect.any(HTMLElement));
    });

    it('should update content after successful undo command execution', async () => {
      const mockOnChange = vi.fn();
      mockCommandExecutor.canUndo.mockReturnValue(true);
      mockCommandExecutor.executeCommand.mockReturnValue({ success: true, command: 'UNDO' });
      
      render(<WYSIWYGEditor {...defaultProps} onChange={mockOnChange} />);
      
      // Focus the editor to trigger state updates and enable the button
      const editorArea = screen.getByRole('textbox');
      fireEvent.focus(editorArea);
      
      await waitFor(() => {
        const undoButton = screen.getByTitle('Undo');
        expect(undoButton).not.toBeDisabled();
      });
      
      const undoButton = screen.getByTitle('Undo');
      fireEvent.click(undoButton);
      
      // Wait for the setTimeout to execute
      await waitFor(() => {
        expect(mockOnChange).toHaveBeenCalled();
      });
    });

    it('should update content after successful redo command execution', async () => {
      const mockOnChange = vi.fn();
      mockCommandExecutor.canRedo.mockReturnValue(true);
      mockCommandExecutor.executeCommand.mockReturnValue({ success: true, command: 'REDO' });
      
      render(<WYSIWYGEditor {...defaultProps} onChange={mockOnChange} />);
      
      // Focus the editor to trigger state updates and enable the button
      const editorArea = screen.getByRole('textbox');
      fireEvent.focus(editorArea);
      
      await waitFor(() => {
        const redoButton = screen.getByTitle('Redo');
        expect(redoButton).not.toBeDisabled();
      });
      
      const redoButton = screen.getByTitle('Redo');
      fireEvent.click(redoButton);
      
      // Wait for the setTimeout to execute
      await waitFor(() => {
        expect(mockOnChange).toHaveBeenCalled();
      });
    });

    it('should not update content when undo command execution fails', async () => {
      const mockOnChange = vi.fn();
      mockCommandExecutor.canUndo.mockReturnValue(true);
      mockCommandExecutor.executeCommand.mockReturnValue({ 
        success: false, 
        error: 'Undo command failed', 
        command: 'UNDO' 
      });
      
      render(<WYSIWYGEditor {...defaultProps} onChange={mockOnChange} />);
      
      const undoButton = screen.getByTitle('Undo');
      fireEvent.click(undoButton);
      
      // Wait a bit to ensure setTimeout would have executed if it was going to
      await new Promise(resolve => setTimeout(resolve, 10));
      
      expect(mockOnChange).not.toHaveBeenCalled();
    });

    it('should not update content when redo command execution fails', async () => {
      const mockOnChange = vi.fn();
      mockCommandExecutor.canRedo.mockReturnValue(true);
      mockCommandExecutor.executeCommand.mockReturnValue({ 
        success: false, 
        error: 'Redo command failed', 
        command: 'REDO' 
      });
      
      render(<WYSIWYGEditor {...defaultProps} onChange={mockOnChange} />);
      
      const redoButton = screen.getByTitle('Redo');
      fireEvent.click(redoButton);
      
      // Wait a bit to ensure setTimeout would have executed if it was going to
      await new Promise(resolve => setTimeout(resolve, 10));
      
      expect(mockOnChange).not.toHaveBeenCalled();
    });

    it('should update undo/redo button states after command execution', async () => {
      // Initially both are available
      mockCommandExecutor.canUndo.mockReturnValue(true);
      mockCommandExecutor.canRedo.mockReturnValue(true);
      mockCommandExecutor.executeCommand.mockReturnValue({ success: true, command: 'UNDO' });
      
      render(<WYSIWYGEditor {...defaultProps} />);
      
      const undoButton = screen.getByTitle('Undo');
      const redoButton = screen.getByTitle('Redo');
      
      // Focus the editor to trigger initial state updates
      const editorArea = screen.getByRole('textbox');
      fireEvent.focus(editorArea);
      
      await waitFor(() => {
        expect(undoButton).not.toBeDisabled();
        expect(redoButton).not.toBeDisabled();
      });
      
      // After undo, simulate that undo is no longer available but redo is
      mockCommandExecutor.canUndo.mockReturnValue(false);
      mockCommandExecutor.canRedo.mockReturnValue(true);
      
      fireEvent.click(undoButton);
      
      // Wait for state updates after command execution
      await waitFor(() => {
        expect(mockCommandExecutor.canUndo).toHaveBeenCalled();
        expect(mockCommandExecutor.canRedo).toHaveBeenCalled();
      });
    });

    it('should handle multiple undo/redo operations in sequence', async () => {
      mockCommandExecutor.canUndo.mockReturnValue(true);
      mockCommandExecutor.canRedo.mockReturnValue(true);
      mockCommandExecutor.executeCommand.mockReturnValue({ success: true });
      
      render(<WYSIWYGEditor {...defaultProps} />);
      
      // Focus the editor to trigger state updates and enable the buttons
      const editorArea = screen.getByRole('textbox');
      fireEvent.focus(editorArea);
      
      await waitFor(() => {
        const undoButton = screen.getByTitle('Undo');
        const redoButton = screen.getByTitle('Redo');
        expect(undoButton).not.toBeDisabled();
        expect(redoButton).not.toBeDisabled();
      });
      
      const undoButton = screen.getByTitle('Undo');
      const redoButton = screen.getByTitle('Redo');
      
      // Perform multiple operations
      fireEvent.click(undoButton);
      expect(mockCommandExecutor.executeCommand).toHaveBeenCalledWith('UNDO', undefined, expect.any(HTMLElement));
      
      fireEvent.click(redoButton);
      expect(mockCommandExecutor.executeCommand).toHaveBeenCalledWith('REDO', undefined, expect.any(HTMLElement));
      
      fireEvent.click(undoButton);
      expect(mockCommandExecutor.executeCommand).toHaveBeenCalledWith('UNDO', undefined, expect.any(HTMLElement));
      
      expect(mockCommandExecutor.executeCommand).toHaveBeenCalledTimes(3);
    });

    it('should not execute undo command when button is disabled', async () => {
      mockCommandExecutor.canUndo.mockReturnValue(false);
      mockCommandExecutor.executeCommand.mockReturnValue({ success: true, command: 'UNDO' });
      
      render(<WYSIWYGEditor {...defaultProps} />);
      
      const undoButton = screen.getByTitle('Undo');
      expect(undoButton).toBeDisabled();
      
      fireEvent.click(undoButton);
      
      // Command should not be executed for disabled button
      expect(mockCommandExecutor.executeCommand).not.toHaveBeenCalled();
    });

    it('should not execute redo command when button is disabled', async () => {
      mockCommandExecutor.canRedo.mockReturnValue(false);
      mockCommandExecutor.executeCommand.mockReturnValue({ success: true, command: 'REDO' });
      
      render(<WYSIWYGEditor {...defaultProps} />);
      
      const redoButton = screen.getByTitle('Redo');
      expect(redoButton).toBeDisabled();
      
      fireEvent.click(redoButton);
      
      // Command should not be executed for disabled button
      expect(mockCommandExecutor.executeCommand).not.toHaveBeenCalled();
    });
  });

  describe('Heading Formatting Integration', () => {
    it('should execute H1 command when H1 button is clicked', async () => {
      mockCommandExecutor.executeCommand.mockReturnValue({ success: true, command: 'FORMAT_H1', value: 'H1' });
      
      render(<WYSIWYGEditor {...defaultProps} />);
      
      const h1Button = screen.getByTitle('Heading 1');
      fireEvent.click(h1Button);
      
      expect(mockCommandExecutor.executeCommand).toHaveBeenCalledWith('FORMAT_H1', 'H1', expect.any(HTMLElement));
    });

    it('should execute H2 command when H2 button is clicked', async () => {
      mockCommandExecutor.executeCommand.mockReturnValue({ success: true, command: 'FORMAT_H2', value: 'H2' });
      
      render(<WYSIWYGEditor {...defaultProps} />);
      
      const h2Button = screen.getByTitle('Heading 2');
      fireEvent.click(h2Button);
      
      expect(mockCommandExecutor.executeCommand).toHaveBeenCalledWith('FORMAT_H2', 'H2', expect.any(HTMLElement));
    });

    it('should execute H3 command when H3 button is clicked', async () => {
      mockCommandExecutor.executeCommand.mockReturnValue({ success: true, command: 'FORMAT_H3', value: 'H3' });
      
      render(<WYSIWYGEditor {...defaultProps} />);
      
      const h3Button = screen.getByTitle('Heading 3');
      fireEvent.click(h3Button);
      
      expect(mockCommandExecutor.executeCommand).toHaveBeenCalledWith('FORMAT_H3', 'H3', expect.any(HTMLElement));
    });

    it('should highlight H1 button when H1 format is active', async () => {
      mockCommandExecutor.getActiveFormats.mockReturnValue(new Set(['FORMAT_H1']));
      
      render(<WYSIWYGEditor {...defaultProps} />);
      
      // Focus the editor to trigger format state updates
      const editorArea = screen.getByRole('textbox');
      fireEvent.focus(editorArea);
      
      await waitFor(() => {
        const h1Button = screen.getByTitle('Heading 1');
        expect(h1Button).toHaveClass('active');
      });
    });

    it('should highlight H2 button when H2 format is active', async () => {
      mockCommandExecutor.getActiveFormats.mockReturnValue(new Set(['FORMAT_H2']));
      
      render(<WYSIWYGEditor {...defaultProps} />);
      
      // Focus the editor to trigger format state updates
      const editorArea = screen.getByRole('textbox');
      fireEvent.focus(editorArea);
      
      await waitFor(() => {
        const h2Button = screen.getByTitle('Heading 2');
        expect(h2Button).toHaveClass('active');
      });
    });

    it('should highlight H3 button when H3 format is active', async () => {
      mockCommandExecutor.getActiveFormats.mockReturnValue(new Set(['FORMAT_H3']));
      
      render(<WYSIWYGEditor {...defaultProps} />);
      
      // Focus the editor to trigger format state updates
      const editorArea = screen.getByRole('textbox');
      fireEvent.focus(editorArea);
      
      await waitFor(() => {
        const h3Button = screen.getByTitle('Heading 3');
        expect(h3Button).toHaveClass('active');
      });
    });

    it('should only highlight the currently active heading button', async () => {
      mockCommandExecutor.getActiveFormats.mockReturnValue(new Set(['FORMAT_H2']));
      
      render(<WYSIWYGEditor {...defaultProps} />);
      
      // Focus the editor to trigger format state updates
      const editorArea = screen.getByRole('textbox');
      fireEvent.focus(editorArea);
      
      await waitFor(() => {
        const h1Button = screen.getByTitle('Heading 1');
        const h2Button = screen.getByTitle('Heading 2');
        const h3Button = screen.getByTitle('Heading 3');
        
        expect(h1Button).not.toHaveClass('active');
        expect(h2Button).toHaveClass('active');
        expect(h3Button).not.toHaveClass('active');
      });
    });

    it('should update content after successful heading command execution', async () => {
      const mockOnChange = vi.fn();
      mockCommandExecutor.executeCommand.mockReturnValue({ success: true, command: 'FORMAT_H1', value: 'H1' });
      
      render(<WYSIWYGEditor {...defaultProps} onChange={mockOnChange} />);
      
      const h1Button = screen.getByTitle('Heading 1');
      fireEvent.click(h1Button);
      
      // Wait for the setTimeout to execute
      await waitFor(() => {
        expect(mockOnChange).toHaveBeenCalled();
      });
    });

    it('should not update content when heading command execution fails', async () => {
      const mockOnChange = vi.fn();
      mockCommandExecutor.executeCommand.mockReturnValue({ success: false, error: 'Command failed', command: 'FORMAT_H1' });
      
      render(<WYSIWYGEditor {...defaultProps} onChange={mockOnChange} />);
      
      const h1Button = screen.getByTitle('Heading 1');
      fireEvent.click(h1Button);
      
      // Wait a bit to ensure setTimeout would have executed if it was going to
      await new Promise(resolve => setTimeout(resolve, 10));
      
      expect(mockOnChange).not.toHaveBeenCalled();
    });
  });

  describe('Text Alignment Integration', () => {
    it('should execute left align command when left align button is clicked', async () => {
      mockCommandExecutor.executeCommand.mockReturnValue({ success: true, command: 'JUSTIFY_LEFT' });
      
      render(<WYSIWYGEditor {...defaultProps} />);
      
      const leftAlignButton = screen.getByTitle('Align Left');
      fireEvent.click(leftAlignButton);
      
      expect(mockCommandExecutor.executeCommand).toHaveBeenCalledWith('JUSTIFY_LEFT', undefined, expect.any(HTMLElement));
    });

    it('should execute center align command when center align button is clicked', async () => {
      mockCommandExecutor.executeCommand.mockReturnValue({ success: true, command: 'JUSTIFY_CENTER' });
      
      render(<WYSIWYGEditor {...defaultProps} />);
      
      const centerAlignButton = screen.getByTitle('Align Center');
      fireEvent.click(centerAlignButton);
      
      expect(mockCommandExecutor.executeCommand).toHaveBeenCalledWith('JUSTIFY_CENTER', undefined, expect.any(HTMLElement));
    });

    it('should execute right align command when right align button is clicked', async () => {
      mockCommandExecutor.executeCommand.mockReturnValue({ success: true, command: 'JUSTIFY_RIGHT' });
      
      render(<WYSIWYGEditor {...defaultProps} />);
      
      const rightAlignButton = screen.getByTitle('Align Right');
      fireEvent.click(rightAlignButton);
      
      expect(mockCommandExecutor.executeCommand).toHaveBeenCalledWith('JUSTIFY_RIGHT', undefined, expect.any(HTMLElement));
    });

    it('should highlight left align button when left alignment is active', async () => {
      mockCommandExecutor.getActiveFormats.mockReturnValue(new Set(['JUSTIFY_LEFT']));
      
      render(<WYSIWYGEditor {...defaultProps} />);
      
      // Focus the editor to trigger format state updates
      const editorArea = screen.getByRole('textbox');
      fireEvent.focus(editorArea);
      
      await waitFor(() => {
        const leftAlignButton = screen.getByTitle('Align Left');
        const centerAlignButton = screen.getByTitle('Align Center');
        const rightAlignButton = screen.getByTitle('Align Right');
        
        expect(leftAlignButton).toHaveClass('active');
        expect(centerAlignButton).not.toHaveClass('active');
        expect(rightAlignButton).not.toHaveClass('active');
      });
    });

    it('should highlight center align button when center alignment is active', async () => {
      mockCommandExecutor.getActiveFormats.mockReturnValue(new Set(['JUSTIFY_CENTER']));
      
      render(<WYSIWYGEditor {...defaultProps} />);
      
      // Focus the editor to trigger format state updates
      const editorArea = screen.getByRole('textbox');
      fireEvent.focus(editorArea);
      
      await waitFor(() => {
        const leftAlignButton = screen.getByTitle('Align Left');
        const centerAlignButton = screen.getByTitle('Align Center');
        const rightAlignButton = screen.getByTitle('Align Right');
        
        expect(leftAlignButton).not.toHaveClass('active');
        expect(centerAlignButton).toHaveClass('active');
        expect(rightAlignButton).not.toHaveClass('active');
      });
    });

    it('should highlight right align button when right alignment is active', async () => {
      mockCommandExecutor.getActiveFormats.mockReturnValue(new Set(['JUSTIFY_RIGHT']));
      
      render(<WYSIWYGEditor {...defaultProps} />);
      
      // Focus the editor to trigger format state updates
      const editorArea = screen.getByRole('textbox');
      fireEvent.focus(editorArea);
      
      await waitFor(() => {
        const leftAlignButton = screen.getByTitle('Align Left');
        const centerAlignButton = screen.getByTitle('Align Center');
        const rightAlignButton = screen.getByTitle('Align Right');
        
        expect(leftAlignButton).not.toHaveClass('active');
        expect(centerAlignButton).not.toHaveClass('active');
        expect(rightAlignButton).toHaveClass('active');
      });
    });

    it('should not highlight any alignment buttons when no alignment is active', async () => {
      mockCommandExecutor.getActiveFormats.mockReturnValue(new Set(['BOLD'])); // Only bold is active
      
      render(<WYSIWYGEditor {...defaultProps} />);
      
      // Focus the editor to trigger format state updates
      const editorArea = screen.getByRole('textbox');
      fireEvent.focus(editorArea);
      
      await waitFor(() => {
        const leftAlignButton = screen.getByTitle('Align Left');
        const centerAlignButton = screen.getByTitle('Align Center');
        const rightAlignButton = screen.getByTitle('Align Right');
        
        expect(leftAlignButton).not.toHaveClass('active');
        expect(centerAlignButton).not.toHaveClass('active');
        expect(rightAlignButton).not.toHaveClass('active');
      });
    });

    it('should update content after successful alignment command execution', async () => {
      const mockOnChange = vi.fn();
      mockCommandExecutor.executeCommand.mockReturnValue({ success: true, command: 'JUSTIFY_CENTER' });
      
      render(<WYSIWYGEditor {...defaultProps} onChange={mockOnChange} />);
      
      const centerAlignButton = screen.getByTitle('Align Center');
      fireEvent.click(centerAlignButton);
      
      // Wait for the setTimeout to execute
      await waitFor(() => {
        expect(mockOnChange).toHaveBeenCalled();
      });
    });

    it('should not update content when alignment command execution fails', async () => {
      const mockOnChange = vi.fn();
      mockCommandExecutor.executeCommand.mockReturnValue({ 
        success: false, 
        error: 'Alignment command failed', 
        command: 'JUSTIFY_CENTER' 
      });
      
      render(<WYSIWYGEditor {...defaultProps} onChange={mockOnChange} />);
      
      const centerAlignButton = screen.getByTitle('Align Center');
      fireEvent.click(centerAlignButton);
      
      // Wait a bit to ensure setTimeout would have executed if it was going to
      await new Promise(resolve => setTimeout(resolve, 10));
      
      expect(mockOnChange).not.toHaveBeenCalled();
    });

    it('should allow switching between different alignment states', async () => {
      render(<WYSIWYGEditor {...defaultProps} />);
      
      const leftAlignButton = screen.getByTitle('Align Left');
      const centerAlignButton = screen.getByTitle('Align Center');
      const rightAlignButton = screen.getByTitle('Align Right');
      
      // Click left align
      fireEvent.click(leftAlignButton);
      expect(mockCommandExecutor.executeCommand).toHaveBeenCalledWith('JUSTIFY_LEFT', undefined, expect.any(HTMLElement));
      
      // Click center align
      fireEvent.click(centerAlignButton);
      expect(mockCommandExecutor.executeCommand).toHaveBeenCalledWith('JUSTIFY_CENTER', undefined, expect.any(HTMLElement));
      
      // Click right align
      fireEvent.click(rightAlignButton);
      expect(mockCommandExecutor.executeCommand).toHaveBeenCalledWith('JUSTIFY_RIGHT', undefined, expect.any(HTMLElement));
      
      expect(mockCommandExecutor.executeCommand).toHaveBeenCalledTimes(3);
    });

    it('should work with alignment commands when no text is selected', async () => {
      mockCommandExecutor.executeCommand.mockReturnValue({ success: true, command: 'JUSTIFY_CENTER' });
      
      render(<WYSIWYGEditor {...defaultProps} />);
      
      const centerAlignButton = screen.getByTitle('Align Center');
      fireEvent.click(centerAlignButton);
      
      expect(mockCommandExecutor.executeCommand).toHaveBeenCalledWith('JUSTIFY_CENTER', undefined, expect.any(HTMLElement));
    });
  });

  describe('Clear Formatting Integration', () => {
    it('should render clear formatting button', () => {
      render(<WYSIWYGEditor {...defaultProps} />);
      
      expect(screen.getByTitle('Clear Formatting')).toBeInTheDocument();
    });

    it('should execute remove format command when clear formatting button is clicked', async () => {
      mockCommandExecutor.executeCommand.mockReturnValue({ success: true, command: 'REMOVE_FORMAT' });
      
      render(<WYSIWYGEditor {...defaultProps} />);
      
      const clearFormattingButton = screen.getByTitle('Clear Formatting');
      fireEvent.click(clearFormattingButton);
      
      expect(mockCommandExecutor.executeCommand).toHaveBeenCalledWith('REMOVE_FORMAT', undefined, expect.any(HTMLElement));
    });

    it('should update content after successful clear formatting command execution', async () => {
      const mockOnChange = vi.fn();
      mockCommandExecutor.executeCommand.mockReturnValue({ success: true, command: 'REMOVE_FORMAT' });
      
      render(<WYSIWYGEditor {...defaultProps} onChange={mockOnChange} />);
      
      const clearFormattingButton = screen.getByTitle('Clear Formatting');
      fireEvent.click(clearFormattingButton);
      
      // Wait for the setTimeout to execute
      await waitFor(() => {
        expect(mockOnChange).toHaveBeenCalled();
      });
    });

    it('should not update content when clear formatting command execution fails', async () => {
      const mockOnChange = vi.fn();
      mockCommandExecutor.executeCommand.mockReturnValue({ 
        success: false, 
        error: 'Clear formatting command failed', 
        command: 'REMOVE_FORMAT' 
      });
      
      render(<WYSIWYGEditor {...defaultProps} onChange={mockOnChange} />);
      
      const clearFormattingButton = screen.getByTitle('Clear Formatting');
      fireEvent.click(clearFormattingButton);
      
      // Wait a bit to ensure setTimeout would have executed if it was going to
      await new Promise(resolve => setTimeout(resolve, 10));
      
      expect(mockOnChange).not.toHaveBeenCalled();
    });

    it('should work with selected text', async () => {
      mockCommandExecutor.executeCommand.mockReturnValue({ success: true, command: 'REMOVE_FORMAT' });
      
      render(<WYSIWYGEditor {...defaultProps} />);
      
      const editorArea = screen.getByRole('textbox');
      const clearFormattingButton = screen.getByTitle('Clear Formatting');
      
      // Simulate text selection by focusing the editor first
      fireEvent.focus(editorArea);
      
      // Click clear formatting button
      fireEvent.click(clearFormattingButton);
      
      expect(mockCommandExecutor.executeCommand).toHaveBeenCalledWith('REMOVE_FORMAT', undefined, expect.any(HTMLElement));
    });

    it('should work without selected text for subsequent input', async () => {
      mockCommandExecutor.executeCommand.mockReturnValue({ success: true, command: 'REMOVE_FORMAT' });
      
      render(<WYSIWYGEditor {...defaultProps} />);
      
      const editorArea = screen.getByRole('textbox');
      const clearFormattingButton = screen.getByTitle('Clear Formatting');
      
      // Focus the editor (cursor position without selection)
      fireEvent.focus(editorArea);
      
      // Click clear formatting button
      fireEvent.click(clearFormattingButton);
      
      expect(mockCommandExecutor.executeCommand).toHaveBeenCalledWith('REMOVE_FORMAT', undefined, expect.any(HTMLElement));
    });

    it('should clear all active formatting states after execution', async () => {
      // Initially have multiple formats active
      mockCommandExecutor.getActiveFormats.mockReturnValueOnce(new Set(['BOLD', 'ITALIC', 'UNDERLINE']));
      mockCommandExecutor.executeCommand.mockReturnValue({ success: true, command: 'REMOVE_FORMAT' });
      
      // After clear formatting, no formats should be active
      mockCommandExecutor.getActiveFormats.mockReturnValueOnce(new Set());
      
      render(<WYSIWYGEditor {...defaultProps} />);
      
      const editorArea = screen.getByRole('textbox');
      fireEvent.focus(editorArea);
      
      // Initially, formatting buttons should be active
      await waitFor(() => {
        const boldButton = screen.getByTitle('Bold');
        const italicButton = screen.getByTitle('Italic');
        const underlineButton = screen.getByTitle('Underline');
        
        expect(boldButton).toHaveClass('active');
        expect(italicButton).toHaveClass('active');
        expect(underlineButton).toHaveClass('active');
      });
      
      // Click clear formatting
      const clearFormattingButton = screen.getByTitle('Clear Formatting');
      fireEvent.click(clearFormattingButton);
      
      // After clear formatting, buttons should not be active
      await waitFor(() => {
        const boldButton = screen.getByTitle('Bold');
        const italicButton = screen.getByTitle('Italic');
        const underlineButton = screen.getByTitle('Underline');
        
        expect(boldButton).not.toHaveClass('active');
        expect(italicButton).not.toHaveClass('active');
        expect(underlineButton).not.toHaveClass('active');
      });
    });

    it('should handle clear formatting with mixed content types', async () => {
      // Test with various formatting types active
      mockCommandExecutor.getActiveFormats.mockReturnValueOnce(new Set([
        'BOLD', 'ITALIC', 'FORMAT_H2', 'JUSTIFY_CENTER', 'INSERT_UNORDERED_LIST'
      ]));
      mockCommandExecutor.executeCommand.mockReturnValue({ success: true, command: 'REMOVE_FORMAT' });
      
      render(<WYSIWYGEditor {...defaultProps} />);
      
      const clearFormattingButton = screen.getByTitle('Clear Formatting');
      fireEvent.click(clearFormattingButton);
      
      expect(mockCommandExecutor.executeCommand).toHaveBeenCalledWith('REMOVE_FORMAT', undefined, expect.any(HTMLElement));
    });

    it('should update format states after clear formatting execution', async () => {
      const mockOnChange = vi.fn();
      mockCommandExecutor.executeCommand.mockReturnValue({ success: true, command: 'REMOVE_FORMAT' });
      
      render(<WYSIWYGEditor {...defaultProps} onChange={mockOnChange} />);
      
      // Focus the editor first to enable format state tracking
      const editorArea = screen.getByRole('textbox');
      fireEvent.focus(editorArea);
      
      // Clear the mock to track calls after the button click
      mockCommandExecutor.getActiveFormats.mockClear();
      
      const clearFormattingButton = screen.getByTitle('Clear Formatting');
      fireEvent.click(clearFormattingButton);
      
      // Wait for the setTimeout to execute and format states to update
      await waitFor(() => {
        expect(mockCommandExecutor.getActiveFormats).toHaveBeenCalled();
      });
    });

    it('should preserve text content while removing formatting', async () => {
      const mockOnChange = vi.fn();
      mockCommandExecutor.executeCommand.mockReturnValue({ success: true, command: 'REMOVE_FORMAT' });
      
      // Set initial content with formatting
      render(<WYSIWYGEditor {...defaultProps} initialContent="<strong>Bold text</strong>" onChange={mockOnChange} />);
      
      const clearFormattingButton = screen.getByTitle('Clear Formatting');
      fireEvent.click(clearFormattingButton);
      
      // Verify command was executed
      expect(mockCommandExecutor.executeCommand).toHaveBeenCalledWith('REMOVE_FORMAT', undefined, expect.any(HTMLElement));
      
      // Wait for content update
      await waitFor(() => {
        expect(mockOnChange).toHaveBeenCalled();
      });
    });

    it('should work in combination with other formatting commands', async () => {
      mockCommandExecutor.executeCommand.mockReturnValue({ success: true });
      
      render(<WYSIWYGEditor {...defaultProps} />);
      
      const boldButton = screen.getByTitle('Bold');
      const italicButton = screen.getByTitle('Italic');
      const clearFormattingButton = screen.getByTitle('Clear Formatting');
      
      // Apply some formatting
      fireEvent.click(boldButton);
      fireEvent.click(italicButton);
      
      // Clear formatting
      fireEvent.click(clearFormattingButton);
      
      expect(mockCommandExecutor.executeCommand).toHaveBeenCalledWith('BOLD', undefined, expect.any(HTMLElement));
      expect(mockCommandExecutor.executeCommand).toHaveBeenCalledWith('ITALIC', undefined, expect.any(HTMLElement));
      expect(mockCommandExecutor.executeCommand).toHaveBeenCalledWith('REMOVE_FORMAT', undefined, expect.any(HTMLElement));
      expect(mockCommandExecutor.executeCommand).toHaveBeenCalledTimes(3);
    });

    it('should handle clear formatting command errors gracefully', async () => {
      const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
      mockCommandExecutor.executeCommand.mockReturnValue({ 
        success: false, 
        error: 'Clear formatting failed', 
        command: 'REMOVE_FORMAT' 
      });
      
      render(<WYSIWYGEditor {...defaultProps} />);
      
      const clearFormattingButton = screen.getByTitle('Clear Formatting');
      fireEvent.click(clearFormattingButton);
      
      expect(mockCommandExecutor.executeCommand).toHaveBeenCalledWith('REMOVE_FORMAT', undefined, expect.any(HTMLElement));
      
      // Should log the error
      await waitFor(() => {
        expect(consoleSpy).toHaveBeenCalledWith('Command execution failed:', 'Clear formatting failed');
      });
      
      consoleSpy.mockRestore();
    });
  });

  describe('Props Integration', () => {
    it('should call onChange prop when content changes', async () => {
      const mockOnChange = vi.fn();
      render(<WYSIWYGEditor {...defaultProps} onChange={mockOnChange} />);
      
      const editorArea = screen.getByRole('textbox');
      fireEvent.input(editorArea, { target: { innerHTML: 'New content' } });
      
      expect(mockOnChange).toHaveBeenCalledWith('New content');
    });

    it('should call onFocus prop when editor gains focus', () => {
      const mockOnFocus = vi.fn();
      render(<WYSIWYGEditor {...defaultProps} onFocus={mockOnFocus} />);
      
      const editorArea = screen.getByRole('textbox');
      fireEvent.focus(editorArea);
      
      expect(mockOnFocus).toHaveBeenCalled();
    });

    it('should call onBlur prop when editor loses focus', () => {
      const mockOnBlur = vi.fn();
      render(<WYSIWYGEditor {...defaultProps} onBlur={mockOnBlur} />);
      
      const editorArea = screen.getByRole('textbox');
      fireEvent.focus(editorArea);
      fireEvent.blur(editorArea);
      
      expect(mockOnBlur).toHaveBeenCalled();
    });

    it('should set initial content from props', () => {
      const initialContent = '<strong>Initial bold text</strong>';
      render(<WYSIWYGEditor {...defaultProps} initialContent={initialContent} />);
      
      const editorArea = screen.getByRole('textbox');
      expect(editorArea).toHaveProperty('innerHTML', initialContent);
    });

    it('should use custom placeholder from props', () => {
      const customPlaceholder = 'Enter your text here...';
      render(<WYSIWYGEditor {...defaultProps} placeholder={customPlaceholder} />);
      
      expect(screen.getByText(customPlaceholder)).toBeInTheDocument();
    });
  });
});