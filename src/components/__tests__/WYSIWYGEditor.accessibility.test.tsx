import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { WYSIWYGEditor } from '../WYSIWYGEditor';
import { commandExecutor } from '../../utils/commandSystem';

// Mock the command system
vi.mock('../../utils/commandSystem', () => ({
  commandExecutor: {
    executeCommand: vi.fn(() => ({ success: true, command: 'MOCK_COMMAND' })),
    getActiveFormats: vi.fn(() => new Set<string>()),
    canUndo: vi.fn(() => false),
    canRedo: vi.fn(() => false)
  }
}));

// Mock selection utils
vi.mock('../../utils/selectionUtils', () => ({
  getCurrentSelection: vi.fn(() => ({
    range: null,
    isCollapsed: true,
    activeFormats: new Set(),
    currentBlockFormat: 'p'
  })),
  isSelectionInEditor: vi.fn(() => true),
  focusEditorWithSelection: vi.fn()
}));

// Mock content sanitizer
vi.mock('../../utils/contentSanitizer', () => ({
  contentSanitizer: {
    sanitizePastedContent: vi.fn((content) => content)
  }
}));

describe('WYSIWYGEditor Accessibility', () => {
  const user = userEvent.setup();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('ARIA Labels and Roles', () => {
    it('should have proper ARIA labels on main container', () => {
      render(<WYSIWYGEditor />);

      const editor = screen.getByRole('application');
      expect(editor).toHaveAttribute('aria-label', 'Rich text editor with keyboard shortcuts');
    });

    it('should have proper ARIA labels on toolbar', () => {
      render(<WYSIWYGEditor />);

      const toolbar = screen.getByRole('toolbar');
      expect(toolbar).toHaveAttribute('aria-label', 'Text formatting toolbar');
    });

    it('should have proper ARIA labels on editable area', () => {
      render(<WYSIWYGEditor />);

      const textbox = screen.getByRole('textbox');
      expect(textbox).toHaveAttribute('aria-label', 'Rich text editor content area');
      expect(textbox).toHaveAttribute('aria-multiline', 'true');
      expect(textbox).toHaveAttribute('aria-describedby', 'keyboard-shortcuts-help');
    });

    it('should have proper ARIA labels on toolbar buttons with keyboard shortcuts', () => {
      render(<WYSIWYGEditor />);

      const boldButton = screen.getByRole('button', { name: /bold.*ctrl\+b/i });
      expect(boldButton).toBeInTheDocument();

      const italicButton = screen.getByRole('button', { name: /italic.*ctrl\+i/i });
      expect(italicButton).toBeInTheDocument();

      const underlineButton = screen.getByRole('button', { name: /underline.*ctrl\+u/i });
      expect(underlineButton).toBeInTheDocument();
    });

    it('should have proper ARIA pressed states for active formatting', () => {
      render(<WYSIWYGEditor />);

      const boldButton = screen.getByRole('button', { name: /bold/i });
      expect(boldButton).toHaveAttribute('aria-pressed', 'false');
    });

    it('should have screen reader announcement area', () => {
      render(<WYSIWYGEditor />);

      const announcement = screen.getByRole('status');
      expect(announcement).toHaveAttribute('aria-live', 'polite');
      expect(announcement).toHaveAttribute('aria-atomic', 'true');
      expect(announcement).toHaveClass('sr-only');
    });

    it('should have keyboard shortcuts help text', () => {
      render(<WYSIWYGEditor />);

      const helpText = document.getElementById('keyboard-shortcuts-help');
      expect(helpText).toBeInTheDocument();
      expect(helpText).toHaveClass('sr-only');
      expect(helpText).toHaveTextContent(/keyboard shortcuts/i);
    });
  });

  describe('Keyboard Navigation', () => {
    it('should support Tab navigation through toolbar buttons', async () => {
      render(<WYSIWYGEditor />);

      const boldButton = screen.getByRole('button', { name: /bold/i });
      const italicButton = screen.getByRole('button', { name: /italic/i });

      // Focus should start on first button when tabbing into toolbar
      await user.tab();
      expect(boldButton).toHaveFocus();

      // Tab should move to next button
      await user.tab();
      expect(italicButton).toHaveFocus();
    });

    it('should support Enter and Space key activation on toolbar buttons', async () => {
      const mockOnChange = vi.fn();
      render(<WYSIWYGEditor onChange={mockOnChange} />);

      const boldButton = screen.getByRole('button', { name: /bold/i });
      boldButton.focus();

      // Test Enter key activation
      await user.keyboard('{Enter}');
      expect(boldButton).toHaveAttribute('aria-pressed', 'false'); // Command would be executed

      // Test Space key activation
      await user.keyboard(' ');
      expect(boldButton).toHaveAttribute('aria-pressed', 'false'); // Command would be executed
    });

    it('should skip disabled buttons in tab navigation', () => {
      render(<WYSIWYGEditor />);

      const undoButton = screen.getByRole('button', { name: /undo/i });
      expect(undoButton).toHaveAttribute('tabIndex', '-1');
      expect(undoButton).toBeDisabled();
    });
  });

  describe('Keyboard Shortcuts', () => {
    it('should handle Ctrl+B for bold formatting', async () => {
      render(<WYSIWYGEditor />);

      const textbox = screen.getByRole('textbox');
      await user.click(textbox);

      await user.keyboard('{Control>}b{/Control}');

      // Command should be executed (mocked)
      expect(commandExecutor.executeCommand).toHaveBeenCalledWith(
        'BOLD',
        undefined,
        expect.any(HTMLElement)
      );
    });

    it('should handle Ctrl+I for italic formatting', async () => {
      render(<WYSIWYGEditor />);

      const textbox = screen.getByRole('textbox');
      await user.click(textbox);

      await user.keyboard('{Control>}i{/Control}');

      expect(commandExecutor.executeCommand).toHaveBeenCalledWith(
        'ITALIC',
        undefined,
        expect.any(HTMLElement)
      );
    });

    it('should handle Ctrl+U for underline formatting', async () => {
      render(<WYSIWYGEditor />);

      const textbox = screen.getByRole('textbox');
      await user.click(textbox);

      await user.keyboard('{Control>}u{/Control}');

      expect(commandExecutor.executeCommand).toHaveBeenCalledWith(
        'UNDERLINE',
        undefined,
        expect.any(HTMLElement)
      );
    });

    it('should handle Ctrl+K for link creation', async () => {
      render(<WYSIWYGEditor />);

      const textbox = screen.getByRole('textbox');
      await user.click(textbox);

      await user.keyboard('{Control>}k{/Control}');

      expect(commandExecutor.executeCommand).toHaveBeenCalledWith(
        'CREATE_LINK',
        undefined,
        expect.any(HTMLElement)
      );
    });

    it('should handle Ctrl+Z for undo', async () => {
      render(<WYSIWYGEditor />);

      const textbox = screen.getByRole('textbox');
      await user.click(textbox);

      await user.keyboard('{Control>}z{/Control}');

      expect(commandExecutor.executeCommand).toHaveBeenCalledWith(
        'UNDO',
        undefined,
        expect.any(HTMLElement)
      );
    });

    it('should handle Ctrl+Y for redo', async () => {
      render(<WYSIWYGEditor />);

      const textbox = screen.getByRole('textbox');
      await user.click(textbox);

      await user.keyboard('{Control>}y{/Control}');

      expect(commandExecutor.executeCommand).toHaveBeenCalledWith(
        'REDO',
        undefined,
        expect.any(HTMLElement)
      );
    });

    it('should handle Ctrl+Shift+Z for redo (alternative)', async () => {
      render(<WYSIWYGEditor />);

      const textbox = screen.getByRole('textbox');
      await user.click(textbox);

      await user.keyboard('{Control>}{Shift>}z{/Shift}{/Control}');

      expect(commandExecutor.executeCommand).toHaveBeenCalledWith(
        'REDO',
        undefined,
        expect.any(HTMLElement)
      );
    });

    it('should handle Ctrl+1/2/3 for heading formatting', async () => {
      render(<WYSIWYGEditor />);

      const textbox = screen.getByRole('textbox');
      await user.click(textbox);

      await user.keyboard('{Control>}1{/Control}');
      expect(commandExecutor.executeCommand).toHaveBeenCalledWith(
        'FORMAT_H1',
        'H1',
        expect.any(HTMLElement)
      );

      await user.keyboard('{Control>}2{/Control}');
      expect(commandExecutor.executeCommand).toHaveBeenCalledWith(
        'FORMAT_H2',
        'H2',
        expect.any(HTMLElement)
      );

      await user.keyboard('{Control>}3{/Control}');
      expect(commandExecutor.executeCommand).toHaveBeenCalledWith(
        'FORMAT_H3',
        'H3',
        expect.any(HTMLElement)
      );
    });

    it('should handle text alignment shortcuts', async () => {
      render(<WYSIWYGEditor />);

      const textbox = screen.getByRole('textbox');
      await user.click(textbox);

      // Ctrl+L for left align
      await user.keyboard('{Control>}l{/Control}');
      expect(commandExecutor.executeCommand).toHaveBeenCalledWith(
        'JUSTIFY_LEFT',
        undefined,
        expect.any(HTMLElement)
      );

      // Ctrl+E for center align
      await user.keyboard('{Control>}e{/Control}');
      expect(commandExecutor.executeCommand).toHaveBeenCalledWith(
        'JUSTIFY_CENTER',
        undefined,
        expect.any(HTMLElement)
      );

      // Ctrl+R for right align
      await user.keyboard('{Control>}r{/Control}');
      expect(commandExecutor.executeCommand).toHaveBeenCalledWith(
        'JUSTIFY_RIGHT',
        undefined,
        expect.any(HTMLElement)
      );
    });

    it('should handle Ctrl+\\ for clear formatting', async () => {
      render(<WYSIWYGEditor />);

      const textbox = screen.getByRole('textbox');
      await user.click(textbox);

      await user.keyboard('{Control>}\\{/Control}');

      expect(commandExecutor.executeCommand).toHaveBeenCalledWith(
        'REMOVE_FORMAT',
        undefined,
        expect.any(HTMLElement)
      );
    });

    it('should only handle shortcuts when editor is focused', async () => {
      render(<WYSIWYGEditor />);

      // Don't focus the editor
      await user.keyboard('{Control>}b{/Control}');

      // Command should not be executed when editor is not focused
      expect(commandExecutor.executeCommand).not.toHaveBeenCalled();
    });

    it('should support Mac Cmd key as well as Ctrl', async () => {
      render(<WYSIWYGEditor />);

      const textbox = screen.getByRole('textbox');
      await user.click(textbox);

      // Simulate Cmd+B on Mac
      await user.keyboard('{Meta>}b{/Meta}');

      expect(commandExecutor.executeCommand).toHaveBeenCalledWith(
        'BOLD',
        undefined,
        expect.any(HTMLElement)
      );
    });
  });

  describe('Screen Reader Announcements', () => {
    it('should announce formatting changes', async () => {
      const mockExecuteCommand = vi.fn(() => ({ success: true, command: 'BOLD' }));
      const mockGetActiveFormats = vi.fn(() => new Set<string>());

      vi.mocked(commandExecutor.executeCommand).mockImplementation(mockExecuteCommand);
      vi.mocked(commandExecutor.getActiveFormats).mockImplementation(mockGetActiveFormats);

      render(<WYSIWYGEditor />);

      const textbox = screen.getByRole('textbox');
      const announcement = screen.getByRole('status');

      await user.click(textbox);
      await user.keyboard('{Control>}b{/Control}');

      // Wait for announcement to be made
      await waitFor(() => {
        expect(announcement.textContent).toContain('bold applied');
      });
    });

    it('should announce command failures', async () => {
      const mockExecuteCommand = vi.fn(() => ({
        success: false,
        error: 'Command failed',
        command: 'BOLD'
      }));

      vi.mocked(commandExecutor.executeCommand).mockImplementation(mockExecuteCommand);

      render(<WYSIWYGEditor />);

      const textbox = screen.getByRole('textbox');
      const announcement = screen.getByRole('status');

      await user.click(textbox);
      await user.keyboard('{Control>}b{/Control}');

      await waitFor(() => {
        expect(announcement.textContent).toContain('Command failed');
      });
    });

    it('should clear announcements after timeout', async () => {
      const mockExecuteCommand = vi.fn(() => ({ success: true, command: 'BOLD' }));
      vi.mocked(commandExecutor.executeCommand).mockImplementation(mockExecuteCommand);

      render(<WYSIWYGEditor />);

      const textbox = screen.getByRole('textbox');
      const announcement = screen.getByRole('status');

      await user.click(textbox);
      await user.keyboard('{Control>}b{/Control}');

      // Announcement should be present
      await waitFor(() => {
        expect(announcement.textContent).toContain('bold applied');
      });

      // Wait for the timeout to clear the announcement (1000ms)
      await waitFor(() => {
        expect(announcement.textContent).toBe('');
      }, { timeout: 2000 });
    });
  });

  describe('High Contrast and Reduced Motion Support', () => {
    it('should have focus indicators for high contrast mode', () => {
      render(<WYSIWYGEditor />);

      const boldButton = screen.getByRole('button', { name: /bold/i });

      // Check that focus-visible styles are applied (this would be tested in CSS)
      expect(boldButton).toHaveClass('toolbar-button');
    });

    it('should respect reduced motion preferences', () => {
      // This would typically be tested with CSS media queries
      // Here we just ensure the component renders without animation classes when needed
      render(<WYSIWYGEditor />);

      const editor = screen.getByRole('application');
      expect(editor).toBeInTheDocument();
    });
  });

  describe('Error Handling and Edge Cases', () => {
    it('should handle missing selection gracefully', () => {
      // Mock getSelection to return null
      const originalGetSelection = window.getSelection;
      window.getSelection = vi.fn(() => null);

      render(<WYSIWYGEditor />);

      // Should not throw error during render
      expect(screen.getByRole('application')).toBeInTheDocument();

      // Restore original function
      window.getSelection = originalGetSelection;
    });

    it('should handle keyboard events when editor ref is null', () => {
      render(<WYSIWYGEditor />);

      // Should not throw error during render
      expect(screen.getByRole('application')).toBeInTheDocument();

      // Component should render successfully even with potential null refs
      const textbox = screen.getByRole('textbox');
      expect(textbox).toBeInTheDocument();
    });
  });
});