import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { Toolbar } from '../Toolbar';
import { ToolbarProps, ResolvedToolbarConfig } from '../../types';

describe('Toolbar Component', () => {
  const defaultProps: ToolbarProps = {
    onCommand: vi.fn(),
    activeFormats: new Set(),
    canUndo: false,
    canRedo: false
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Basic Text Formatting', () => {
    it('should render bold, italic, and underline buttons', () => {
      render(<Toolbar {...defaultProps} />);
      
      expect(screen.getByTitle('Bold')).toBeInTheDocument();
      expect(screen.getByTitle('Italic')).toBeInTheDocument();
      expect(screen.getByTitle('Underline')).toBeInTheDocument();
    });

    it('should call onCommand with correct parameters when bold button is clicked', () => {
      const mockOnCommand = vi.fn();
      render(<Toolbar {...defaultProps} onCommand={mockOnCommand} />);
      
      const boldButton = screen.getByTitle('Bold');
      fireEvent.click(boldButton);
      
      expect(mockOnCommand).toHaveBeenCalledWith('bold', undefined);
    });

    it('should call onCommand with correct parameters when italic button is clicked', () => {
      const mockOnCommand = vi.fn();
      render(<Toolbar {...defaultProps} onCommand={mockOnCommand} />);
      
      const italicButton = screen.getByTitle('Italic');
      fireEvent.click(italicButton);
      
      expect(mockOnCommand).toHaveBeenCalledWith('italic', undefined);
    });

    it('should call onCommand with correct parameters when underline button is clicked', () => {
      const mockOnCommand = vi.fn();
      render(<Toolbar {...defaultProps} onCommand={mockOnCommand} />);
      
      const underlineButton = screen.getByTitle('Underline');
      fireEvent.click(underlineButton);
      
      expect(mockOnCommand).toHaveBeenCalledWith('underline', undefined);
    });
  });

  describe('Active Format States', () => {
    it('should highlight bold button when bold format is active', () => {
      const activeFormats = new Set(['BOLD']);
      render(<Toolbar {...defaultProps} activeFormats={activeFormats} />);
      
      const boldButton = screen.getByTitle('Bold');
      expect(boldButton).toHaveClass('active');
    });

    it('should highlight italic button when italic format is active', () => {
      const activeFormats = new Set(['ITALIC']);
      render(<Toolbar {...defaultProps} activeFormats={activeFormats} />);
      
      const italicButton = screen.getByTitle('Italic');
      expect(italicButton).toHaveClass('active');
    });

    it('should highlight underline button when underline format is active', () => {
      const activeFormats = new Set(['UNDERLINE']);
      render(<Toolbar {...defaultProps} activeFormats={activeFormats} />);
      
      const underlineButton = screen.getByTitle('Underline');
      expect(underlineButton).toHaveClass('active');
    });

    it('should highlight multiple buttons when multiple formats are active', () => {
      const activeFormats = new Set(['BOLD', 'ITALIC']);
      render(<Toolbar {...defaultProps} activeFormats={activeFormats} />);
      
      const boldButton = screen.getByTitle('Bold');
      const italicButton = screen.getByTitle('Italic');
      const underlineButton = screen.getByTitle('Underline');
      
      expect(boldButton).toHaveClass('active');
      expect(italicButton).toHaveClass('active');
      expect(underlineButton).not.toHaveClass('active');
    });

    it('should not highlight buttons when no formats are active', () => {
      render(<Toolbar {...defaultProps} />);
      
      const boldButton = screen.getByTitle('Bold');
      const italicButton = screen.getByTitle('Italic');
      const underlineButton = screen.getByTitle('Underline');
      
      expect(boldButton).not.toHaveClass('active');
      expect(italicButton).not.toHaveClass('active');
      expect(underlineButton).not.toHaveClass('active');
    });
  });

  describe('Heading Formatting', () => {
    it('should render heading buttons (H1, H2, H3)', () => {
      render(<Toolbar {...defaultProps} />);
      
      expect(screen.getByTitle('Heading 1')).toBeInTheDocument();
      expect(screen.getByTitle('Heading 2')).toBeInTheDocument();
      expect(screen.getByTitle('Heading 3')).toBeInTheDocument();
    });

    it('should call onCommand with correct parameters when H1 button is clicked', () => {
      const mockOnCommand = vi.fn();
      render(<Toolbar {...defaultProps} onCommand={mockOnCommand} />);
      
      const h1Button = screen.getByTitle('Heading 1');
      fireEvent.click(h1Button);
      
      expect(mockOnCommand).toHaveBeenCalledWith('formatBlock', 'H1');
    });

    it('should call onCommand with correct parameters when H2 button is clicked', () => {
      const mockOnCommand = vi.fn();
      render(<Toolbar {...defaultProps} onCommand={mockOnCommand} />);
      
      const h2Button = screen.getByTitle('Heading 2');
      fireEvent.click(h2Button);
      
      expect(mockOnCommand).toHaveBeenCalledWith('formatBlock', 'H2');
    });

    it('should call onCommand with correct parameters when H3 button is clicked', () => {
      const mockOnCommand = vi.fn();
      render(<Toolbar {...defaultProps} onCommand={mockOnCommand} />);
      
      const h3Button = screen.getByTitle('Heading 3');
      fireEvent.click(h3Button);
      
      expect(mockOnCommand).toHaveBeenCalledWith('formatBlock', 'H3');
    });

    it('should highlight H1 button when H1 format is active', () => {
      const activeFormats = new Set(['FORMAT_H1']);
      render(<Toolbar {...defaultProps} activeFormats={activeFormats} />);
      
      const h1Button = screen.getByTitle('Heading 1');
      expect(h1Button).toHaveClass('active');
    });

    it('should highlight H2 button when H2 format is active', () => {
      const activeFormats = new Set(['FORMAT_H2']);
      render(<Toolbar {...defaultProps} activeFormats={activeFormats} />);
      
      const h2Button = screen.getByTitle('Heading 2');
      expect(h2Button).toHaveClass('active');
    });

    it('should highlight H3 button when H3 format is active', () => {
      const activeFormats = new Set(['FORMAT_H3']);
      render(<Toolbar {...defaultProps} activeFormats={activeFormats} />);
      
      const h3Button = screen.getByTitle('Heading 3');
      expect(h3Button).toHaveClass('active');
    });

    it('should only highlight the active heading button', () => {
      const activeFormats = new Set(['FORMAT_H2']);
      render(<Toolbar {...defaultProps} activeFormats={activeFormats} />);
      
      const h1Button = screen.getByTitle('Heading 1');
      const h2Button = screen.getByTitle('Heading 2');
      const h3Button = screen.getByTitle('Heading 3');
      
      expect(h1Button).not.toHaveClass('active');
      expect(h2Button).toHaveClass('active');
      expect(h3Button).not.toHaveClass('active');
    });

    it('should not highlight heading buttons when no heading format is active', () => {
      render(<Toolbar {...defaultProps} />);
      
      const h1Button = screen.getByTitle('Heading 1');
      const h2Button = screen.getByTitle('Heading 2');
      const h3Button = screen.getByTitle('Heading 3');
      
      expect(h1Button).not.toHaveClass('active');
      expect(h2Button).not.toHaveClass('active');
      expect(h3Button).not.toHaveClass('active');
    });
  });

  describe('Text Alignment', () => {
    it('should render alignment buttons (left, center, right)', () => {
      render(<Toolbar {...defaultProps} />);
      
      expect(screen.getByTitle('Align Left')).toBeInTheDocument();
      expect(screen.getByTitle('Align Center')).toBeInTheDocument();
      expect(screen.getByTitle('Align Right')).toBeInTheDocument();
    });

    it('should call onCommand with correct parameters when left align button is clicked', () => {
      const mockOnCommand = vi.fn();
      render(<Toolbar {...defaultProps} onCommand={mockOnCommand} />);
      
      const leftAlignButton = screen.getByTitle('Align Left');
      fireEvent.click(leftAlignButton);
      
      expect(mockOnCommand).toHaveBeenCalledWith('justifyLeft', undefined);
    });

    it('should call onCommand with correct parameters when center align button is clicked', () => {
      const mockOnCommand = vi.fn();
      render(<Toolbar {...defaultProps} onCommand={mockOnCommand} />);
      
      const centerAlignButton = screen.getByTitle('Align Center');
      fireEvent.click(centerAlignButton);
      
      expect(mockOnCommand).toHaveBeenCalledWith('justifyCenter', undefined);
    });

    it('should call onCommand with correct parameters when right align button is clicked', () => {
      const mockOnCommand = vi.fn();
      render(<Toolbar {...defaultProps} onCommand={mockOnCommand} />);
      
      const rightAlignButton = screen.getByTitle('Align Right');
      fireEvent.click(rightAlignButton);
      
      expect(mockOnCommand).toHaveBeenCalledWith('justifyRight', undefined);
    });

    it('should highlight left align button when left alignment is active', () => {
      const activeFormats = new Set(['JUSTIFY_LEFT']);
      render(<Toolbar {...defaultProps} activeFormats={activeFormats} />);
      
      const leftAlignButton = screen.getByTitle('Align Left');
      const centerAlignButton = screen.getByTitle('Align Center');
      const rightAlignButton = screen.getByTitle('Align Right');
      
      expect(leftAlignButton).toHaveClass('active');
      expect(centerAlignButton).not.toHaveClass('active');
      expect(rightAlignButton).not.toHaveClass('active');
    });

    it('should highlight center align button when center alignment is active', () => {
      const activeFormats = new Set(['JUSTIFY_CENTER']);
      render(<Toolbar {...defaultProps} activeFormats={activeFormats} />);
      
      const leftAlignButton = screen.getByTitle('Align Left');
      const centerAlignButton = screen.getByTitle('Align Center');
      const rightAlignButton = screen.getByTitle('Align Right');
      
      expect(leftAlignButton).not.toHaveClass('active');
      expect(centerAlignButton).toHaveClass('active');
      expect(rightAlignButton).not.toHaveClass('active');
    });

    it('should highlight right align button when right alignment is active', () => {
      const activeFormats = new Set(['JUSTIFY_RIGHT']);
      render(<Toolbar {...defaultProps} activeFormats={activeFormats} />);
      
      const leftAlignButton = screen.getByTitle('Align Left');
      const centerAlignButton = screen.getByTitle('Align Center');
      const rightAlignButton = screen.getByTitle('Align Right');
      
      expect(leftAlignButton).not.toHaveClass('active');
      expect(centerAlignButton).not.toHaveClass('active');
      expect(rightAlignButton).toHaveClass('active');
    });

    it('should not highlight any alignment buttons when no alignment is active', () => {
      render(<Toolbar {...defaultProps} />);
      
      const leftAlignButton = screen.getByTitle('Align Left');
      const centerAlignButton = screen.getByTitle('Align Center');
      const rightAlignButton = screen.getByTitle('Align Right');
      
      expect(leftAlignButton).not.toHaveClass('active');
      expect(centerAlignButton).not.toHaveClass('active');
      expect(rightAlignButton).not.toHaveClass('active');
    });

    it('should only highlight the active alignment button', () => {
      const activeFormats = new Set(['JUSTIFY_CENTER', 'BOLD']); // Center alignment + bold formatting
      render(<Toolbar {...defaultProps} activeFormats={activeFormats} />);
      
      const leftAlignButton = screen.getByTitle('Align Left');
      const centerAlignButton = screen.getByTitle('Align Center');
      const rightAlignButton = screen.getByTitle('Align Right');
      const boldButton = screen.getByTitle('Bold');
      
      expect(leftAlignButton).not.toHaveClass('active');
      expect(centerAlignButton).toHaveClass('active');
      expect(rightAlignButton).not.toHaveClass('active');
      expect(boldButton).toHaveClass('active'); // Bold should also be active
    });

    it('should handle multiple alignment states correctly', () => {
      // Test that only one alignment can be active at a time (as per typical behavior)
      const activeFormats = new Set(['JUSTIFY_LEFT', 'JUSTIFY_CENTER']); // Both alignments active (edge case)
      render(<Toolbar {...defaultProps} activeFormats={activeFormats} />);
      
      const leftAlignButton = screen.getByTitle('Align Left');
      const centerAlignButton = screen.getByTitle('Align Center');
      const rightAlignButton = screen.getByTitle('Align Right');
      
      expect(leftAlignButton).toHaveClass('active');
      expect(centerAlignButton).toHaveClass('active');
      expect(rightAlignButton).not.toHaveClass('active');
    });

    it('should work with alignment buttons alongside other formatting', () => {
      const activeFormats = new Set(['JUSTIFY_RIGHT', 'BOLD', 'ITALIC', 'FORMAT_H2']);
      render(<Toolbar {...defaultProps} activeFormats={activeFormats} />);
      
      const rightAlignButton = screen.getByTitle('Align Right');
      const boldButton = screen.getByTitle('Bold');
      const italicButton = screen.getByTitle('Italic');
      const h2Button = screen.getByTitle('Heading 2');
      
      expect(rightAlignButton).toHaveClass('active');
      expect(boldButton).toHaveClass('active');
      expect(italicButton).toHaveClass('active');
      expect(h2Button).toHaveClass('active');
    });
  });

  describe('List Formatting', () => {
    it('should render list buttons (bullet and numbered)', () => {
      render(<Toolbar {...defaultProps} />);
      
      expect(screen.getByTitle('Bullet List')).toBeInTheDocument();
      expect(screen.getByTitle('Numbered List')).toBeInTheDocument();
    });

    it('should call onCommand with correct parameters when bullet list button is clicked', () => {
      const mockOnCommand = vi.fn();
      render(<Toolbar {...defaultProps} onCommand={mockOnCommand} />);
      
      const bulletListButton = screen.getByTitle('Bullet List');
      fireEvent.click(bulletListButton);
      
      expect(mockOnCommand).toHaveBeenCalledWith('insertUnorderedList', undefined);
    });

    it('should call onCommand with correct parameters when numbered list button is clicked', () => {
      const mockOnCommand = vi.fn();
      render(<Toolbar {...defaultProps} onCommand={mockOnCommand} />);
      
      const numberedListButton = screen.getByTitle('Numbered List');
      fireEvent.click(numberedListButton);
      
      expect(mockOnCommand).toHaveBeenCalledWith('insertOrderedList', undefined);
    });

    it('should highlight bullet list button when unordered list is active', () => {
      const activeFormats = new Set(['INSERT_UNORDERED_LIST']);
      render(<Toolbar {...defaultProps} activeFormats={activeFormats} />);
      
      const bulletListButton = screen.getByTitle('Bullet List');
      const numberedListButton = screen.getByTitle('Numbered List');
      
      expect(bulletListButton).toHaveClass('active');
      expect(numberedListButton).not.toHaveClass('active');
    });

    it('should highlight numbered list button when ordered list is active', () => {
      const activeFormats = new Set(['INSERT_ORDERED_LIST']);
      render(<Toolbar {...defaultProps} activeFormats={activeFormats} />);
      
      const bulletListButton = screen.getByTitle('Bullet List');
      const numberedListButton = screen.getByTitle('Numbered List');
      
      expect(bulletListButton).not.toHaveClass('active');
      expect(numberedListButton).toHaveClass('active');
    });

    it('should not highlight list buttons when no list format is active', () => {
      render(<Toolbar {...defaultProps} />);
      
      const bulletListButton = screen.getByTitle('Bullet List');
      const numberedListButton = screen.getByTitle('Numbered List');
      
      expect(bulletListButton).not.toHaveClass('active');
      expect(numberedListButton).not.toHaveClass('active');
    });
  });

  describe('Link Management', () => {
    it('should render link management buttons', () => {
      render(<Toolbar {...defaultProps} />);
      
      expect(screen.getByTitle('Insert Link')).toBeInTheDocument();
      expect(screen.getByTitle('Edit Link')).toBeInTheDocument();
      expect(screen.getByTitle('Remove Link')).toBeInTheDocument();
    });

    it('should call onCommand with correct parameters when insert link button is clicked', () => {
      const mockOnCommand = vi.fn();
      render(<Toolbar {...defaultProps} onCommand={mockOnCommand} />);
      
      const insertLinkButton = screen.getByTitle('Insert Link');
      fireEvent.click(insertLinkButton);
      
      expect(mockOnCommand).toHaveBeenCalledWith('createLink', undefined);
    });

    it('should call onCommand with correct parameters when edit link button is clicked', () => {
      const mockOnCommand = vi.fn();
      render(<Toolbar {...defaultProps} onCommand={mockOnCommand} />);
      
      const editLinkButton = screen.getByTitle('Edit Link');
      fireEvent.click(editLinkButton);
      
      expect(mockOnCommand).toHaveBeenCalledWith('editLink', undefined);
    });

    it('should call onCommand with correct parameters when remove link button is clicked', () => {
      const mockOnCommand = vi.fn();
      render(<Toolbar {...defaultProps} onCommand={mockOnCommand} />);
      
      const removeLinkButton = screen.getByTitle('Remove Link');
      fireEvent.click(removeLinkButton);
      
      expect(mockOnCommand).toHaveBeenCalledWith('unlink', undefined);
    });

    it('should highlight link buttons when link format is active', () => {
      const activeFormats = new Set(['CREATE_LINK', 'EDIT_LINK']);
      render(<Toolbar {...defaultProps} activeFormats={activeFormats} />);
      
      const insertLinkButton = screen.getByTitle('Insert Link');
      const editLinkButton = screen.getByTitle('Edit Link');
      const removeLinkButton = screen.getByTitle('Remove Link');
      
      expect(insertLinkButton).toHaveClass('active');
      expect(editLinkButton).toHaveClass('active');
      expect(removeLinkButton).not.toHaveClass('active');
    });

    it('should highlight unlink button when unlink format is active', () => {
      const activeFormats = new Set(['UNLINK']);
      render(<Toolbar {...defaultProps} activeFormats={activeFormats} />);
      
      const removeLinkButton = screen.getByTitle('Remove Link');
      expect(removeLinkButton).toHaveClass('active');
    });

    it('should not highlight link buttons when no link format is active', () => {
      render(<Toolbar {...defaultProps} />);
      
      const insertLinkButton = screen.getByTitle('Insert Link');
      const editLinkButton = screen.getByTitle('Edit Link');
      const removeLinkButton = screen.getByTitle('Remove Link');
      
      expect(insertLinkButton).not.toHaveClass('active');
      expect(editLinkButton).not.toHaveClass('active');
      expect(removeLinkButton).not.toHaveClass('active');
    });
  });

  describe('Clear Formatting', () => {
    it('should render clear formatting button', () => {
      render(<Toolbar {...defaultProps} />);
      
      expect(screen.getByTitle('Clear Formatting')).toBeInTheDocument();
    });

    it('should call onCommand with correct parameters when clear formatting button is clicked', () => {
      const mockOnCommand = vi.fn();
      render(<Toolbar {...defaultProps} onCommand={mockOnCommand} />);
      
      const clearFormattingButton = screen.getByTitle('Clear Formatting');
      fireEvent.click(clearFormattingButton);
      
      expect(mockOnCommand).toHaveBeenCalledWith('removeFormat', undefined);
    });

    it('should not highlight clear formatting button (it should never be active)', () => {
      const activeFormats = new Set(['BOLD', 'ITALIC', 'UNDERLINE']);
      render(<Toolbar {...defaultProps} activeFormats={activeFormats} />);
      
      const clearFormattingButton = screen.getByTitle('Clear Formatting');
      expect(clearFormattingButton).not.toHaveClass('active');
    });
  });

  describe('Undo/Redo Button States', () => {
    it('should disable undo button when canUndo is false', () => {
      render(<Toolbar {...defaultProps} canUndo={false} />);
      
      const undoButton = screen.getByTitle('Undo');
      expect(undoButton).toBeDisabled();
    });

    it('should enable undo button when canUndo is true', () => {
      render(<Toolbar {...defaultProps} canUndo={true} />);
      
      const undoButton = screen.getByTitle('Undo');
      expect(undoButton).not.toBeDisabled();
    });

    it('should disable redo button when canRedo is false', () => {
      render(<Toolbar {...defaultProps} canRedo={false} />);
      
      const redoButton = screen.getByTitle('Redo');
      expect(redoButton).toBeDisabled();
    });

    it('should enable redo button when canRedo is true', () => {
      render(<Toolbar {...defaultProps} canRedo={true} />);
      
      const redoButton = screen.getByTitle('Redo');
      expect(redoButton).not.toBeDisabled();
    });

    it('should call onCommand with undo when undo button is clicked', () => {
      const mockOnCommand = vi.fn();
      render(<Toolbar {...defaultProps} onCommand={mockOnCommand} canUndo={true} />);
      
      const undoButton = screen.getByTitle('Undo');
      fireEvent.click(undoButton);
      
      expect(mockOnCommand).toHaveBeenCalledWith('undo', undefined);
    });

    it('should call onCommand with redo when redo button is clicked', () => {
      const mockOnCommand = vi.fn();
      render(<Toolbar {...defaultProps} onCommand={mockOnCommand} canRedo={true} />);
      
      const redoButton = screen.getByTitle('Redo');
      fireEvent.click(redoButton);
      
      expect(mockOnCommand).toHaveBeenCalledWith('redo', undefined);
    });

    it('should not call onCommand when disabled undo button is clicked', () => {
      const mockOnCommand = vi.fn();
      render(<Toolbar {...defaultProps} onCommand={mockOnCommand} canUndo={false} />);
      
      const undoButton = screen.getByTitle('Undo');
      fireEvent.click(undoButton);
      
      // Disabled buttons should not trigger click events
      expect(mockOnCommand).not.toHaveBeenCalled();
    });

    it('should not call onCommand when disabled redo button is clicked', () => {
      const mockOnCommand = vi.fn();
      render(<Toolbar {...defaultProps} onCommand={mockOnCommand} canRedo={false} />);
      
      const redoButton = screen.getByTitle('Redo');
      fireEvent.click(redoButton);
      
      // Disabled buttons should not trigger click events
      expect(mockOnCommand).not.toHaveBeenCalled();
    });

    it('should render undo and redo buttons', () => {
      render(<Toolbar {...defaultProps} />);
      
      expect(screen.getByTitle('Undo')).toBeInTheDocument();
      expect(screen.getByTitle('Redo')).toBeInTheDocument();
    });

    it('should handle both undo and redo being enabled simultaneously', () => {
      const mockOnCommand = vi.fn();
      render(<Toolbar {...defaultProps} onCommand={mockOnCommand} canUndo={true} canRedo={true} />);
      
      const undoButton = screen.getByTitle('Undo');
      const redoButton = screen.getByTitle('Redo');
      
      expect(undoButton).not.toBeDisabled();
      expect(redoButton).not.toBeDisabled();
      
      fireEvent.click(undoButton);
      expect(mockOnCommand).toHaveBeenCalledWith('undo', undefined);
      
      fireEvent.click(redoButton);
      expect(mockOnCommand).toHaveBeenCalledWith('redo', undefined);
      
      expect(mockOnCommand).toHaveBeenCalledTimes(2);
    });

    it('should handle both undo and redo being disabled simultaneously', () => {
      render(<Toolbar {...defaultProps} canUndo={false} canRedo={false} />);
      
      const undoButton = screen.getByTitle('Undo');
      const redoButton = screen.getByTitle('Redo');
      
      expect(undoButton).toBeDisabled();
      expect(redoButton).toBeDisabled();
    });
  });

  describe('Accessibility Features', () => {
    it('should have proper ARIA attributes on toolbar container', () => {
      render(<Toolbar {...defaultProps} />);
      
      const toolbar = screen.getByRole('toolbar');
      expect(toolbar).toHaveAttribute('aria-label', 'Text formatting toolbar');
    });

    it('should have proper ARIA attributes on buttons', () => {
      const activeFormats = new Set(['BOLD']);
      render(<Toolbar {...defaultProps} activeFormats={activeFormats} />);
      
      const boldButton = screen.getByTitle('Bold');
      const italicButton = screen.getByTitle('Italic');
      
      expect(boldButton).toHaveAttribute('aria-pressed', 'true');
      expect(boldButton).toHaveAttribute('aria-label', 'Bold, keyboard shortcut Ctrl+B, currently active');
      expect(italicButton).toHaveAttribute('aria-pressed', 'false');
      expect(italicButton).toHaveAttribute('aria-label', 'Italic, keyboard shortcut Ctrl+I');
    });

    it('should have proper ARIA attributes on disabled buttons', () => {
      render(<Toolbar {...defaultProps} canUndo={false} canRedo={false} />);
      
      const undoButton = screen.getByTitle('Undo');
      const redoButton = screen.getByTitle('Redo');
      
      expect(undoButton).toHaveAttribute('aria-label', 'Undo, keyboard shortcut Ctrl+Z, disabled');
      expect(redoButton).toHaveAttribute('aria-label', 'Redo, keyboard shortcut Ctrl+Y, disabled');
      expect(undoButton).toHaveAttribute('tabIndex', '-1');
      expect(redoButton).toHaveAttribute('tabIndex', '-1');
    });

    it('should have proper tabIndex for enabled buttons', () => {
      render(<Toolbar {...defaultProps} canUndo={true} canRedo={true} />);
      
      const boldButton = screen.getByTitle('Bold');
      const undoButton = screen.getByTitle('Undo');
      
      expect(boldButton).toHaveAttribute('tabIndex', '0');
      expect(undoButton).toHaveAttribute('tabIndex', '0');
    });

    it('should have aria-hidden on button icons', () => {
      render(<Toolbar {...defaultProps} />);
      
      const boldButton = screen.getByTitle('Bold');
      const iconSpan = boldButton.querySelector('span');
      
      expect(iconSpan).toHaveAttribute('aria-hidden', 'true');
    });

    it('should have unique IDs for all buttons', () => {
      render(<Toolbar {...defaultProps} />);
      
      const buttons = screen.getAllByRole('button');
      const ids = buttons.map(button => button.id);
      const uniqueIds = new Set(ids);
      
      expect(ids.length).toBe(uniqueIds.size); // All IDs should be unique
      expect(ids.every(id => id.startsWith('toolbar-'))).toBe(true); // All IDs should start with 'toolbar-'
    });
  });

  describe('Keyboard Interactions', () => {
    it('should trigger command when Enter key is pressed on button', () => {
      const mockOnCommand = vi.fn();
      render(<Toolbar {...defaultProps} onCommand={mockOnCommand} />);
      
      const boldButton = screen.getByTitle('Bold');
      boldButton.focus();
      fireEvent.keyDown(boldButton, { key: 'Enter' });
      
      expect(mockOnCommand).toHaveBeenCalledWith('bold', undefined);
    });

    it('should trigger command when Space key is pressed on button', () => {
      const mockOnCommand = vi.fn();
      render(<Toolbar {...defaultProps} onCommand={mockOnCommand} />);
      
      const italicButton = screen.getByTitle('Italic');
      italicButton.focus();
      fireEvent.keyDown(italicButton, { key: ' ' });
      
      expect(mockOnCommand).toHaveBeenCalledWith('italic', undefined);
    });

    it('should not trigger command when other keys are pressed on button', () => {
      const mockOnCommand = vi.fn();
      render(<Toolbar {...defaultProps} onCommand={mockOnCommand} />);
      
      const boldButton = screen.getByTitle('Bold');
      boldButton.focus();
      fireEvent.keyDown(boldButton, { key: 'Tab' });
      fireEvent.keyDown(boldButton, { key: 'Escape' });
      fireEvent.keyDown(boldButton, { key: 'a' });
      
      expect(mockOnCommand).not.toHaveBeenCalled();
    });

    it('should handle keyboard events properly and call commands', () => {
      const mockOnCommand = vi.fn();
      render(<Toolbar {...defaultProps} onCommand={mockOnCommand} />);
      
      const boldButton = screen.getByTitle('Bold');
      boldButton.focus();
      
      // Test Enter key triggers command
      fireEvent.keyDown(boldButton, { key: 'Enter' });
      expect(mockOnCommand).toHaveBeenCalledWith('bold', undefined);
      
      // Test Space key triggers command
      mockOnCommand.mockClear();
      fireEvent.keyDown(boldButton, { key: ' ' });
      expect(mockOnCommand).toHaveBeenCalledWith('bold', undefined);
      
      // Test that both keyboard events work
      expect(mockOnCommand).toHaveBeenCalledTimes(1);
    });
  });

  describe('Mouse Interactions', () => {
    it('should prevent default on mouseDown to avoid focus loss', () => {
      const mockOnCommand = vi.fn();
      render(<Toolbar {...defaultProps} onCommand={mockOnCommand} />);
      
      const boldButton = screen.getByTitle('Bold');
      
      const mouseDownEvent = new MouseEvent('mousedown', { bubbles: true });
      const preventDefaultSpy = vi.spyOn(mouseDownEvent, 'preventDefault');
      
      fireEvent(boldButton, mouseDownEvent);
      
      expect(preventDefaultSpy).toHaveBeenCalled();
    });

    it('should still trigger click events normally', () => {
      const mockOnCommand = vi.fn();
      render(<Toolbar {...defaultProps} onCommand={mockOnCommand} />);
      
      const boldButton = screen.getByTitle('Bold');
      fireEvent.click(boldButton);
      
      expect(mockOnCommand).toHaveBeenCalledWith('bold', undefined);
    });
  });

  describe('Complex Formatting States', () => {
    it('should handle complex combinations of active formats', () => {
      const activeFormats = new Set([
        'BOLD', 'ITALIC', 'FORMAT_H2', 'JUSTIFY_CENTER', 
        'INSERT_UNORDERED_LIST', 'CREATE_LINK'
      ]);
      render(<Toolbar {...defaultProps} activeFormats={activeFormats} />);
      
      expect(screen.getByTitle('Bold')).toHaveClass('active');
      expect(screen.getByTitle('Italic')).toHaveClass('active');
      expect(screen.getByTitle('Underline')).not.toHaveClass('active');
      expect(screen.getByTitle('Heading 2')).toHaveClass('active');
      expect(screen.getByTitle('Heading 1')).not.toHaveClass('active');
      expect(screen.getByTitle('Align Center')).toHaveClass('active');
      expect(screen.getByTitle('Align Left')).not.toHaveClass('active');
      expect(screen.getByTitle('Bullet List')).toHaveClass('active');
      expect(screen.getByTitle('Numbered List')).not.toHaveClass('active');
      expect(screen.getByTitle('Insert Link')).toHaveClass('active');
    });

    it('should handle all buttons being inactive', () => {
      render(<Toolbar {...defaultProps} />);
      
      const buttons = screen.getAllByRole('button');
      const activeButtons = buttons.filter(button => button.classList.contains('active'));
      
      expect(activeButtons).toHaveLength(0);
    });

    it('should handle mixed enabled/disabled states', () => {
      const activeFormats = new Set(['BOLD', 'ITALIC']);
      render(<Toolbar {...defaultProps} activeFormats={activeFormats} canUndo={true} canRedo={false} />);
      
      expect(screen.getByTitle('Bold')).toHaveClass('active');
      expect(screen.getByTitle('Italic')).toHaveClass('active');
      expect(screen.getByTitle('Undo')).not.toBeDisabled();
      expect(screen.getByTitle('Redo')).toBeDisabled();
    });
  });

  describe('Toolbar Configuration', () => {
    it('should render only configured buttons when toolbarConfig is provided', () => {
      const toolbarConfig = {
        groups: [
          { name: 'basic', buttons: ['bold', 'italic'] as const }
        ],
        enabledButtons: new Set(['bold', 'italic'] as const)
      };
      
      render(<Toolbar {...defaultProps} toolbarConfig={toolbarConfig} />);
      
      // Should have configured buttons
      expect(screen.getByTitle('Bold')).toBeInTheDocument();
      expect(screen.getByTitle('Italic')).toBeInTheDocument();
      
      // Should not have other buttons
      expect(screen.queryByTitle('Underline')).not.toBeInTheDocument();
      expect(screen.queryByTitle('Heading 1')).not.toBeInTheDocument();
      expect(screen.queryByTitle('Insert Link')).not.toBeInTheDocument();
    });

    it('should render all default buttons when no toolbarConfig is provided', () => {
      render(<Toolbar {...defaultProps} />);
      
      // Should have default buttons
      expect(screen.getByTitle('Bold')).toBeInTheDocument();
      expect(screen.getByTitle('Italic')).toBeInTheDocument();
      expect(screen.getByTitle('Underline')).toBeInTheDocument();
      expect(screen.getByTitle('Heading 1')).toBeInTheDocument();
      expect(screen.getByTitle('Insert Link')).toBeInTheDocument();
    });

    it('should handle empty configuration gracefully', () => {
      const toolbarConfig = {
        groups: [],
        enabledButtons: new Set()
      };
      
      render(<Toolbar {...defaultProps} toolbarConfig={toolbarConfig} />);
      
      // Should not render any buttons
      expect(screen.queryByTitle('Bold')).not.toBeInTheDocument();
      expect(screen.queryByTitle('Italic')).not.toBeInTheDocument();
    });

    it('should respect enabledButtons set in configuration', () => {
      const toolbarConfig = {
        groups: [
          { name: 'formatting', buttons: ['bold', 'italic', 'underline'] as const }
        ],
        enabledButtons: new Set(['bold', 'italic'] as const) // Only bold and italic enabled
      };
      
      render(<Toolbar {...defaultProps} toolbarConfig={toolbarConfig} />);
      
      // Should have enabled buttons
      expect(screen.getByTitle('Bold')).toBeInTheDocument();
      expect(screen.getByTitle('Italic')).toBeInTheDocument();
      
      // Should not have disabled button (underline is in group but not in enabledButtons)
      expect(screen.queryByTitle('Underline')).not.toBeInTheDocument();
    });

    it('should handle multiple groups in configuration', () => {
      const toolbarConfig = {
        groups: [
          { name: 'formatting', buttons: ['bold', 'italic'] as const },
          { name: 'structure', buttons: ['h1', 'h2'] as const }
        ],
        enabledButtons: new Set(['bold', 'italic', 'h1', 'h2'] as const)
      };
      
      render(<Toolbar {...defaultProps} toolbarConfig={toolbarConfig} />);
      
      // Should have buttons from both groups
      expect(screen.getByTitle('Bold')).toBeInTheDocument();
      expect(screen.getByTitle('Italic')).toBeInTheDocument();
      expect(screen.getByTitle('Heading 1')).toBeInTheDocument();
      expect(screen.getByTitle('Heading 2')).toBeInTheDocument();
      
      // Should not have other buttons
      expect(screen.queryByTitle('Underline')).not.toBeInTheDocument();
      expect(screen.queryByTitle('Heading 3')).not.toBeInTheDocument();
    });
  });
});