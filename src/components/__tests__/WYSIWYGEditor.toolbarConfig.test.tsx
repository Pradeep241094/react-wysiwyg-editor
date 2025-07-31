import { render, screen } from '@testing-library/react';
import { vi, describe, it, expect } from 'vitest';
import { WYSIWYGEditor } from '../WYSIWYGEditor';
import { ToolbarConfig } from '../../types';

// Mock the command system
vi.mock('../../utils/commandSystem', () => ({
  commandExecutor: {
    executeCommand: vi.fn(() => ({ success: true })),
    getActiveFormats: vi.fn(() => new Set()),
    canUndo: vi.fn(() => false),
    canRedo: vi.fn(() => false)
  }
}));

describe('WYSIWYGEditor Toolbar Configuration', () => {
  describe('Default Configuration', () => {
    it('should render all toolbar buttons when no toolbarConfig is provided', () => {
      render(<WYSIWYGEditor />);

      // Check for some key buttons that should be present in the default configuration
      expect(screen.getByRole('button', { name: /bold/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /italic/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /underline/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /heading 1/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /bullet list/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /insert link/i })).toBeInTheDocument();
    });
  });

  describe('Preset Configurations', () => {
    it('should render only minimal buttons with minimal preset', () => {
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
    });

    it('should render standard buttons with standard preset', () => {
      const toolbarConfig: ToolbarConfig = { preset: 'standard' };
      render(<WYSIWYGEditor toolbarConfig={toolbarConfig} />);

      // Should have standard buttons
      expect(screen.getByRole('button', { name: /bold/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /italic/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /underline/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /heading 1/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /bullet list/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /insert link/i })).toBeInTheDocument();

      // Should not have advanced buttons like font color
      expect(screen.queryByRole('button', { name: /text color/i })).not.toBeInTheDocument();
      expect(screen.queryByRole('button', { name: /background color/i })).not.toBeInTheDocument();
    });
  });

  describe('Category-based Configuration', () => {
    it('should render only formatting buttons when formatting category is included', () => {
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
    });

    it('should render multiple categories when specified', () => {
      const toolbarConfig: ToolbarConfig = {
        include: {
          categories: ['formatting', 'lists']
        }
      };
      render(<WYSIWYGEditor toolbarConfig={toolbarConfig} />);

      // Should have formatting buttons
      expect(screen.getByRole('button', { name: /bold/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /italic/i })).toBeInTheDocument();

      // Should have list buttons
      expect(screen.getByRole('button', { name: /bullet list/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /numbered list/i })).toBeInTheDocument();

      // Should not have structure buttons
      expect(screen.queryByRole('button', { name: /heading 1/i })).not.toBeInTheDocument();
    });
  });

  describe('Individual Button Configuration', () => {
    it('should render only specified individual buttons', () => {
      const toolbarConfig: ToolbarConfig = {
        include: {
          buttons: ['bold', 'italic', 'h1', 'link']
        }
      };
      render(<WYSIWYGEditor toolbarConfig={toolbarConfig} />);

      // Should have specified buttons
      expect(screen.getByRole('button', { name: /bold/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /italic/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /heading 1/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /insert link/i })).toBeInTheDocument();

      // Should not have other buttons
      expect(screen.queryByRole('button', { name: /underline/i })).not.toBeInTheDocument();
      expect(screen.queryByRole('button', { name: /bullet list/i })).not.toBeInTheDocument();
    });
  });

  describe('Exclude Configuration', () => {
    it('should exclude specified buttons from full preset', () => {
      const toolbarConfig: ToolbarConfig = {
        preset: 'full',
        exclude: {
          buttons: ['bold', 'italic']
        }
      };
      render(<WYSIWYGEditor toolbarConfig={toolbarConfig} />);

      // Should not have excluded buttons
      expect(screen.queryByRole('button', { name: /bold/i })).not.toBeInTheDocument();
      expect(screen.queryByRole('button', { name: /italic/i })).not.toBeInTheDocument();

      // Should have other buttons
      expect(screen.getByRole('button', { name: /underline/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /heading 1/i })).toBeInTheDocument();
    });

    it('should exclude entire categories', () => {
      const toolbarConfig: ToolbarConfig = {
        preset: 'full',
        exclude: {
          categories: ['formatting']
        }
      };
      render(<WYSIWYGEditor toolbarConfig={toolbarConfig} />);

      // Should not have formatting buttons
      expect(screen.queryByRole('button', { name: /bold/i })).not.toBeInTheDocument();
      expect(screen.queryByRole('button', { name: /italic/i })).not.toBeInTheDocument();
      expect(screen.queryByRole('button', { name: /underline/i })).not.toBeInTheDocument();

      // Should have other category buttons
      expect(screen.getByRole('button', { name: /heading 1/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /bullet list/i })).toBeInTheDocument();
    });
  });

  describe('Backward Compatibility', () => {
    it('should maintain all existing functionality when no toolbarConfig is provided', () => {
      const onChange = vi.fn();
      const onFocus = vi.fn();
      const onBlur = vi.fn();

      render(
        <WYSIWYGEditor
          initialContent="<p>Test content</p>"
          placeholder="Test placeholder"
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
        />
      );

      // Should render the editor with all props working
      expect(screen.getByRole('textbox')).toBeInTheDocument();
      expect(screen.getByRole('toolbar')).toBeInTheDocument();

      // Should have default toolbar buttons
      expect(screen.getByRole('button', { name: /bold/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /italic/i })).toBeInTheDocument();
    });
  });
});