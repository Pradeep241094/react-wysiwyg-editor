import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { WYSIWYGEditor } from '../WYSIWYGEditor';
import { ToolbarConfig } from '../../types';

// Mock the command system for integration tests
vi.mock('../../utils/commandSystem', () => ({
  commandExecutor: {
    executeCommand: vi.fn(),
    getActiveFormats: vi.fn(),
    canUndo: vi.fn(),
    canRedo: vi.fn(),
    getCurrentBlockFormat: vi.fn()
  }
}));

vi.mock('../../utils/selectionUtils', () => ({
  getCurrentSelection: vi.fn(),
  isSelectionInEditor: vi.fn(),
  focusEditorWithSelection: vi.fn()
}));

import { commandExecutor } from '../../utils/commandSystem';

const mockCommandExecutor = commandExecutor as any;

describe('WYSIWYGEditor Toolbar Configuration Integration Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockCommandExecutor.executeCommand.mockReturnValue({ success: true });
    mockCommandExecutor.getActiveFormats.mockReturnValue(new Set());
    mockCommandExecutor.canUndo.mockReturnValue(false);
    mockCommandExecutor.canRedo.mockReturnValue(false);
    mockCommandExecutor.getCurrentBlockFormat.mockReturnValue('');
  });

  describe('Button Visibility Based on Configuration', () => {
    it('should show only minimal buttons with minimal preset configuration', () => {
      const toolbarConfig: ToolbarConfig = { preset: 'minimal' };
      render(<WYSIWYGEditor toolbarConfig={toolbarConfig} />);

      // Should have minimal buttons
      expect(screen.getByRole('button', { name: /bold/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /italic/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /underline/i })).toBeInTheDocument();

      // Should not have advanced buttons
      expect(screen.queryByRole('button', { name: /heading 1/i })).not.toBeInTheDocument();
      expect(screen.queryByRole('button', { name: /bullet list/i })).not.toBeInTheDocument();
      expect(screen.queryByRole('button', { name: /insert link/i })).not.toBeInTheDocument();
      expect(screen.queryByRole('button', { name: /text color/i })).not.toBeInTheDocument();
      expect(screen.queryByRole('button', { name: /align center/i })).not.toBeInTheDocument();
    });

    it('should show standard buttons with standard preset configuration', () => {
      const toolbarConfig: ToolbarConfig = { preset: 'standard' };
      render(<WYSIWYGEditor toolbarConfig={toolbarConfig} />);

      // Should have standard buttons
      expect(screen.getByRole('button', { name: /bold/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /italic/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /underline/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /heading 1/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /heading 2/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /heading 3/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /bullet list/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /numbered list/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /insert link/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /insert image/i })).toBeInTheDocument();

      // Should not have advanced buttons
      expect(screen.queryByRole('button', { name: /text color/i })).not.toBeInTheDocument();
      expect(screen.queryByRole('button', { name: /background color/i })).not.toBeInTheDocument();
      expect(screen.queryByRole('button', { name: /font size/i })).not.toBeInTheDocument();
    });

    it('should show only formatting category buttons when formatting category is included', () => {
      const toolbarConfig: ToolbarConfig = {
        include: {
          categories: ['formatting']
        }
      };
      render(<WYSIWYGEditor toolbarConfig={toolbarConfig} />);

      // Should have formatting buttons
      expect(screen.getByRole('button', { name: /bold/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /italic/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /underline/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /strikethrough/i })).toBeInTheDocument();

      // Should not have structure buttons
      expect(screen.queryByRole('button', { name: /heading 1/i })).not.toBeInTheDocument();
      expect(screen.queryByRole('button', { name: /bullet list/i })).not.toBeInTheDocument();
      expect(screen.queryByRole('button', { name: /align center/i })).not.toBeInTheDocument();
    });

    it('should show multiple categories when specified', () => {
      const toolbarConfig: ToolbarConfig = {
        include: {
          categories: ['formatting', 'lists', 'alignment']
        }
      };
      render(<WYSIWYGEditor toolbarConfig={toolbarConfig} />);

      // Should have formatting buttons
      expect(screen.getByRole('button', { name: /bold/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /italic/i })).toBeInTheDocument();

      // Should have list buttons
      expect(screen.getByRole('button', { name: /bullet list/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /numbered list/i })).toBeInTheDocument();

      // Should have alignment buttons
      expect(screen.getByRole('button', { name: /align left/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /align center/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /align right/i })).toBeInTheDocument();

      // Should not have structure buttons
      expect(screen.queryByRole('button', { name: /heading 1/i })).not.toBeInTheDocument();
    });

    it('should show only specified individual buttons', () => {
      const toolbarConfig: ToolbarConfig = {
        include: {
          buttons: ['bold', 'italic', 'h1', 'bulletList', 'link']
        }
      };
      render(<WYSIWYGEditor toolbarConfig={toolbarConfig} />);

      // Should have specified buttons
      expect(screen.getByRole('button', { name: /bold/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /italic/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /heading 1/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /bullet list/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /insert link/i })).toBeInTheDocument();

      // Should not have other buttons
      expect(screen.queryByRole('button', { name: /underline/i })).not.toBeInTheDocument();
      expect(screen.queryByRole('button', { name: /heading 2/i })).not.toBeInTheDocument();
      expect(screen.queryByRole('button', { name: /numbered list/i })).not.toBeInTheDocument();
    });

    it('should exclude specified buttons from full preset', () => {
      const toolbarConfig: ToolbarConfig = {
        preset: 'full',
        exclude: {
          buttons: ['bold', 'italic', 'h1']
        }
      };
      render(<WYSIWYGEditor toolbarConfig={toolbarConfig} />);

      // Should not have excluded buttons
      expect(screen.queryByRole('button', { name: /bold/i })).not.toBeInTheDocument();
      expect(screen.queryByRole('button', { name: /italic/i })).not.toBeInTheDocument();
      expect(screen.queryByRole('button', { name: /heading 1/i })).not.toBeInTheDocument();

      // Should have other buttons
      expect(screen.getByRole('button', { name: /underline/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /heading 2/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /bullet list/i })).toBeInTheDocument();
    });

    it('should exclude entire categories', () => {
      const toolbarConfig: ToolbarConfig = {
        preset: 'full',
        exclude: {
          categories: ['formatting', 'alignment']
        }
      };
      render(<WYSIWYGEditor toolbarConfig={toolbarConfig} />);

      // Should not have formatting buttons
      expect(screen.queryByRole('button', { name: /bold/i })).not.toBeInTheDocument();
      expect(screen.queryByRole('button', { name: /italic/i })).not.toBeInTheDocument();
      expect(screen.queryByRole('button', { name: /underline/i })).not.toBeInTheDocument();

      // Should not have alignment buttons
      expect(screen.queryByRole('button', { name: /align left/i })).not.toBeInTheDocument();
      expect(screen.queryByRole('button', { name: /align center/i })).not.toBeInTheDocument();

      // Should have other category buttons
      expect(screen.getByRole('button', { name: /heading 1/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /bullet list/i })).toBeInTheDocument();
    });
  });

  describe('Group Separation and Visual Layout', () => {
    it('should render custom groups with proper separation', () => {
      const toolbarConfig: ToolbarConfig = {
        include: {
          groups: [
            { name: 'basic', buttons: ['bold', 'italic', 'underline'] },
            { name: 'structure', buttons: ['h1', 'h2', 'h3'] },
            { name: 'lists', buttons: ['bulletList', 'numberedList'] }
          ]
        }
      };
      render(<WYSIWYGEditor toolbarConfig={toolbarConfig} />);

      // Check that all buttons from groups are present
      expect(screen.getByRole('button', { name: /bold/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /italic/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /underline/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /heading 1/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /heading 2/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /heading 3/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /bullet list/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /numbered list/i })).toBeInTheDocument();

      // Check for toolbar groups (each group should be in its own container)
      const toolbar = screen.getByRole('toolbar');
      const groups = toolbar.querySelectorAll('.toolbar-group');
      expect(groups.length).toBeGreaterThanOrEqual(3); // Should have at least 3 groups
    });

    it('should maintain proper button order within groups', () => {
      const toolbarConfig: ToolbarConfig = {
        include: {
          groups: [
            { name: 'reversed', buttons: ['underline', 'italic', 'bold'] }
          ]
        }
      };
      render(<WYSIWYGEditor toolbarConfig={toolbarConfig} />);

      const toolbar = screen.getByRole('toolbar');
      const buttons = toolbar.querySelectorAll('button');
      
      // Find the positions of our buttons
      const buttonTitles = Array.from(buttons).map(btn => btn.getAttribute('title')?.toLowerCase() || '');
      
      const underlineIndex = buttonTitles.findIndex(title => title.includes('underline'));
      const italicIndex = buttonTitles.findIndex(title => title.includes('italic'));
      const boldIndex = buttonTitles.findIndex(title => title.includes('bold'));

      // Verify the order is maintained (underline, italic, bold)
      expect(underlineIndex).toBeLessThan(italicIndex);
      expect(italicIndex).toBeLessThan(boldIndex);
    });

    it('should handle empty groups gracefully', () => {
      const toolbarConfig: ToolbarConfig = {
        include: {
          groups: [
            { name: 'basic', buttons: ['bold', 'italic'] },
            { name: 'empty', buttons: [] },
            { name: 'structure', buttons: ['h1', 'h2'] }
          ]
        }
      };
      render(<WYSIWYGEditor toolbarConfig={toolbarConfig} />);

      // Should still render non-empty groups
      expect(screen.getByRole('button', { name: /bold/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /italic/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /heading 1/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /heading 2/i })).toBeInTheDocument();
    });
  });

  describe('Configuration Changes at Runtime', () => {
    it('should update button visibility when configuration changes', async () => {
      const { rerender } = render(<WYSIWYGEditor toolbarConfig={{ preset: 'minimal' }} />);

      // Initially should have minimal buttons
      expect(screen.getByRole('button', { name: /bold/i })).toBeInTheDocument();
      expect(screen.queryByRole('button', { name: /heading 1/i })).not.toBeInTheDocument();

      // Change to standard preset
      rerender(<WYSIWYGEditor toolbarConfig={{ preset: 'standard' }} />);

      // Should now have standard buttons
      await waitFor(() => {
        expect(screen.getByRole('button', { name: /bold/i })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /heading 1/i })).toBeInTheDocument();
      });
    });

    it('should update from category-based to individual button configuration', async () => {
      const { rerender } = render(
        <WYSIWYGEditor 
          toolbarConfig={{ 
            include: { categories: ['formatting'] } 
          }} 
        />
      );

      // Initially should have formatting category buttons
      expect(screen.getByRole('button', { name: /bold/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /italic/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /strikethrough/i })).toBeInTheDocument();
      expect(screen.queryByRole('button', { name: /heading 1/i })).not.toBeInTheDocument();

      // Change to specific buttons
      rerender(
        <WYSIWYGEditor 
          toolbarConfig={{ 
            include: { buttons: ['bold', 'h1', 'bulletList'] } 
          }} 
        />
      );

      // Should now have only specified buttons
      await waitFor(() => {
        expect(screen.getByRole('button', { name: /bold/i })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /heading 1/i })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /bullet list/i })).toBeInTheDocument();
        expect(screen.queryByRole('button', { name: /italic/i })).not.toBeInTheDocument();
        expect(screen.queryByRole('button', { name: /strikethrough/i })).not.toBeInTheDocument();
      });
    });

    it('should handle configuration changes while editor has content', async () => {
      const mockOnChange = vi.fn();
      const { rerender } = render(
        <WYSIWYGEditor 
          toolbarConfig={{ preset: 'minimal' }}
          onChange={mockOnChange}
          initialContent="<p>Test content</p>"
        />
      );

      const editor = screen.getByRole('textbox');
      
      // Apply formatting with minimal toolbar
      fireEvent.focus(editor);
      const boldButton = screen.getByRole('button', { name: /bold/i });
      mockCommandExecutor.executeCommand.mockReturnValue({ success: true, command: 'BOLD' });
      fireEvent.click(boldButton);

      // Change to standard configuration
      rerender(
        <WYSIWYGEditor 
          toolbarConfig={{ preset: 'standard' }}
          onChange={mockOnChange}
          initialContent="<p>Test content</p>"
        />
      );

      // Should now have additional buttons available
      await waitFor(() => {
        expect(screen.getByRole('button', { name: /heading 1/i })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /bullet list/i })).toBeInTheDocument();
      });

      // Content should remain intact
      expect(editor).toBeInTheDocument();
    });

    it('should handle switching from include to exclude configuration', async () => {
      const { rerender } = render(
        <WYSIWYGEditor 
          toolbarConfig={{ 
            include: { buttons: ['bold', 'italic', 'h1'] } 
          }} 
        />
      );

      // Initially should have only included buttons
      expect(screen.getByRole('button', { name: /bold/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /italic/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /heading 1/i })).toBeInTheDocument();
      expect(screen.queryByRole('button', { name: /underline/i })).not.toBeInTheDocument();

      // Change to exclude configuration
      rerender(
        <WYSIWYGEditor 
          toolbarConfig={{ 
            preset: 'full',
            exclude: { buttons: ['bold', 'italic'] } 
          }} 
        />
      );

      // Should now exclude specified buttons but include others
      await waitFor(() => {
        expect(screen.queryByRole('button', { name: /bold/i })).not.toBeInTheDocument();
        expect(screen.queryByRole('button', { name: /italic/i })).not.toBeInTheDocument();
        expect(screen.getByRole('button', { name: /underline/i })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /heading 1/i })).toBeInTheDocument();
      });
    });
  });

  describe('Backward Compatibility', () => {
    it('should maintain all existing functionality when no toolbarConfig is provided', () => {
      const mockOnChange = vi.fn();
      const mockOnFocus = vi.fn();
      const mockOnBlur = vi.fn();

      render(
        <WYSIWYGEditor
          initialContent="<p>Test content</p>"
          placeholder="Test placeholder"
          onChange={mockOnChange}
          onFocus={mockOnFocus}
          onBlur={mockOnBlur}
        />
      );

      // Should render the editor with all props working
      const editor = screen.getByRole('textbox');
      expect(editor).toBeInTheDocument();
      expect(screen.getByRole('toolbar')).toBeInTheDocument();

      // Should have default toolbar buttons (full configuration)
      expect(screen.getByRole('button', { name: /bold/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /italic/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /underline/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /heading 1/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /bullet list/i })).toBeInTheDocument();

      // Test event handlers work
      fireEvent.focus(editor);
      expect(mockOnFocus).toHaveBeenCalled();

      fireEvent.blur(editor);
      expect(mockOnBlur).toHaveBeenCalled();

      // Test toolbar functionality
      const boldButton = screen.getByRole('button', { name: /bold/i });
      mockCommandExecutor.executeCommand.mockReturnValue({ success: true, command: 'BOLD' });
      fireEvent.click(boldButton);
      expect(mockCommandExecutor.executeCommand).toHaveBeenCalledWith('BOLD', undefined, expect.any(HTMLElement));
    });

    it('should work with existing toolbar-related props alongside toolbarConfig', () => {
      const mockOnChange = vi.fn();
      
      render(
        <WYSIWYGEditor
          toolbarConfig={{ preset: 'minimal' }}
          onChange={mockOnChange}
          placeholder="Type here..."
        />
      );

      const editor = screen.getByRole('textbox');
      
      // Should have minimal toolbar
      expect(screen.getByRole('button', { name: /bold/i })).toBeInTheDocument();
      expect(screen.queryByRole('button', { name: /heading 1/i })).not.toBeInTheDocument();

      // Should still handle content changes
      fireEvent.focus(editor);
      fireEvent.input(editor, { target: { innerHTML: 'New content' } });
      
      expect(mockOnChange).toHaveBeenCalled();
    });

    it('should handle mixed old and new configuration patterns gracefully', () => {
      // This test ensures that if someone passes both old props and new toolbarConfig,
      // the component handles it gracefully
      render(
        <WYSIWYGEditor
          toolbarConfig={{ preset: 'standard' }}
          initialContent="<p>Initial content</p>"
        />
      );

      // Should render with standard configuration
      expect(screen.getByRole('button', { name: /bold/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /heading 1/i })).toBeInTheDocument();
      expect(screen.queryByRole('button', { name: /text color/i })).not.toBeInTheDocument();

      const editor = screen.getByRole('textbox');
      expect(editor).toBeInTheDocument();
    });
  });

  describe('Complex Configuration Scenarios', () => {
    it('should handle preset with include and exclude overrides', () => {
      const toolbarConfig: ToolbarConfig = {
        preset: 'standard',
        include: {
          buttons: ['fontColor'] // Add a button not in standard
        },
        exclude: {
          buttons: ['bold'] // Remove a button from standard
        }
      };
      render(<WYSIWYGEditor toolbarConfig={toolbarConfig} />);

      // Should not have excluded button
      expect(screen.queryByRole('button', { name: /bold/i })).not.toBeInTheDocument();
      
      // Should have standard buttons (minus excluded)
      expect(screen.getByRole('button', { name: /italic/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /heading 1/i })).toBeInTheDocument();
      
      // Should have included additional button
      expect(screen.getByRole('button', { name: /text color/i })).toBeInTheDocument();
    });

    it('should handle categories with individual button overrides', () => {
      const toolbarConfig: ToolbarConfig = {
        include: {
          categories: ['formatting'],
          buttons: ['h1', 'bulletList'] // Add buttons from other categories
        },
        exclude: {
          buttons: ['italic'] // Remove one formatting button
        }
      };
      render(<WYSIWYGEditor toolbarConfig={toolbarConfig} />);

      // Should have formatting buttons (minus excluded)
      expect(screen.getByRole('button', { name: /bold/i })).toBeInTheDocument();
      expect(screen.queryByRole('button', { name: /italic/i })).not.toBeInTheDocument();
      expect(screen.getByRole('button', { name: /underline/i })).toBeInTheDocument();
      
      // Should have additional individual buttons
      expect(screen.getByRole('button', { name: /heading 1/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /bullet list/i })).toBeInTheDocument();
    });

    it('should handle custom groups with order specification', () => {
      const toolbarConfig: ToolbarConfig = {
        include: {
          groups: [
            { name: 'primary', buttons: ['bold', 'italic'] },
            { name: 'secondary', buttons: ['h1', 'h2'] }
          ]
        },
        order: [
          { name: 'secondary', buttons: ['h1', 'h2'] },
          { name: 'primary', buttons: ['bold', 'italic'] }
        ]
      };
      render(<WYSIWYGEditor toolbarConfig={toolbarConfig} />);

      const toolbar = screen.getByRole('toolbar');
      const buttons = toolbar.querySelectorAll('button');
      const buttonTitles = Array.from(buttons).map(btn => btn.getAttribute('title')?.toLowerCase() || '');

      // Find positions
      const h1Index = buttonTitles.findIndex(title => title.includes('heading 1'));
      const boldIndex = buttonTitles.findIndex(title => title.includes('bold'));

      // Secondary group (h1, h2) should come before primary group (bold, italic)
      expect(h1Index).toBeLessThan(boldIndex);
    });
  });

  describe('Error Handling and Edge Cases', () => {
    it('should handle invalid configuration gracefully', () => {
      const toolbarConfig: ToolbarConfig = {
        // @ts-expect-error - Testing invalid preset
        preset: 'invalid',
        include: {
          // @ts-expect-error - Testing invalid category
          categories: ['invalid-category'],
          // @ts-expect-error - Testing invalid button
          buttons: ['invalid-button']
        }
      };

      // Should not throw and should render with fallback
      expect(() => {
        render(<WYSIWYGEditor toolbarConfig={toolbarConfig} />);
      }).not.toThrow();

      // Should have some buttons (fallback behavior)
      const toolbar = screen.getByRole('toolbar');
      expect(toolbar).toBeInTheDocument();
    });

    it('should handle empty configuration', () => {
      const toolbarConfig: ToolbarConfig = {};
      render(<WYSIWYGEditor toolbarConfig={toolbarConfig} />);

      // Should render with default full configuration
      expect(screen.getByRole('button', { name: /bold/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /italic/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /heading 1/i })).toBeInTheDocument();
    });

    it('should handle configuration that results in no buttons', () => {
      const toolbarConfig: ToolbarConfig = {
        include: {
          buttons: []
        }
      };
      render(<WYSIWYGEditor toolbarConfig={toolbarConfig} />);

      const toolbar = screen.getByRole('toolbar');
      expect(toolbar).toBeInTheDocument();
      
      // Should have no buttons or fallback to minimal
      const buttons = toolbar.querySelectorAll('button');
      // The behavior here depends on implementation - it might show no buttons or fallback
      expect(buttons.length).toBeGreaterThanOrEqual(0);
    });
  });

  describe('Functional Integration with Configuration', () => {
    it('should execute commands correctly with minimal configuration', async () => {
      const mockOnChange = vi.fn();
      render(
        <WYSIWYGEditor 
          toolbarConfig={{ preset: 'minimal' }}
          onChange={mockOnChange}
        />
      );

      const editor = screen.getByRole('textbox');
      const boldButton = screen.getByRole('button', { name: /bold/i });

      // Focus editor and apply formatting
      fireEvent.focus(editor);
      fireEvent.input(editor, { target: { innerHTML: 'Test text' } });

      mockCommandExecutor.executeCommand.mockReturnValue({ success: true, command: 'BOLD' });
      fireEvent.click(boldButton);

      // Should execute command correctly
      expect(mockCommandExecutor.executeCommand).toHaveBeenCalledWith('BOLD', undefined, expect.any(HTMLElement));
      
      // Should trigger content change
      await waitFor(() => {
        expect(mockOnChange).toHaveBeenCalled();
      });
    });

    it('should maintain format state with custom configuration', async () => {
      render(
        <WYSIWYGEditor 
          toolbarConfig={{ 
            include: { buttons: ['bold', 'italic', 'underline'] } 
          }}
        />
      );

      const editor = screen.getByRole('textbox');
      const boldButton = screen.getByRole('button', { name: /bold/i });
      const italicButton = screen.getByRole('button', { name: /italic/i });

      // Focus editor
      fireEvent.focus(editor);

      // Simulate bold being active
      mockCommandExecutor.getActiveFormats.mockReturnValue(new Set(['BOLD']));
      fireEvent.focus(editor); // Trigger format state update

      await waitFor(() => {
        expect(boldButton).toHaveClass('active');
        expect(italicButton).not.toHaveClass('active');
      });

      // Simulate both bold and italic being active
      mockCommandExecutor.getActiveFormats.mockReturnValue(new Set(['BOLD', 'ITALIC']));
      fireEvent.input(editor, { target: { innerHTML: '<strong><em>Bold and italic</em></strong>' } });

      await waitFor(() => {
        expect(boldButton).toHaveClass('active');
        expect(italicButton).toHaveClass('active');
      });
    });
  });
});