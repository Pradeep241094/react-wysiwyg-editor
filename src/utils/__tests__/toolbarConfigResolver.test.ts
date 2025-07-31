import { ToolbarConfigResolver } from '../toolbarConfigResolver';
import { ToolbarConfig, ToolbarButtonType, ToolbarCategory } from '../../types';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';

describe('ToolbarConfigResolver', () => {
  let consoleSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleSpy.mockRestore();
  });

  // Test preset application for minimal, standard, and full presets
  describe('preset application', () => {
    it('should apply minimal preset correctly', () => {
      const config: ToolbarConfig = { preset: 'minimal' };
      const resolved = ToolbarConfigResolver.resolve(config);
      
      expect(resolved.enabledButtons).toEqual(new Set(['bold', 'italic', 'underline']));
      expect(resolved.groups).toHaveLength(1);
      expect(resolved.groups[0].buttons).toEqual(['bold', 'italic', 'underline']);
    });

    it('should apply standard preset correctly', () => {
      const config: ToolbarConfig = { preset: 'standard' };
      const resolved = ToolbarConfigResolver.resolve(config);
      
      const expectedButtons = [
        'bold', 'italic', 'underline', 'h1', 'h2', 'h3', 
        'bulletList', 'numberedList', 'link', 'image'
      ];
      expect(resolved.enabledButtons).toEqual(new Set(expectedButtons));
      
      // Should be grouped by categories
      expect(resolved.groups.length).toBeGreaterThan(1);
      const formattingGroup = resolved.groups.find(g => g.name === 'formatting');
      const structureGroup = resolved.groups.find(g => g.name === 'structure');
      expect(formattingGroup).toBeDefined();
      expect(structureGroup).toBeDefined();
    });

    it('should apply full preset correctly', () => {
      const config: ToolbarConfig = { preset: 'full' };
      const resolved = ToolbarConfigResolver.resolve(config);
      
      // Should include all available buttons (38 total)
      expect(resolved.enabledButtons.size).toBe(38);
      
      // Verify buttons from each category are included
      expect(resolved.enabledButtons.has('bold')).toBe(true); // formatting
      expect(resolved.enabledButtons.has('h1')).toBe(true); // structure
      expect(resolved.enabledButtons.has('bulletList')).toBe(true); // lists
      expect(resolved.enabledButtons.has('alignLeft')).toBe(true); // alignment
      expect(resolved.enabledButtons.has('image')).toBe(true); // media
      expect(resolved.enabledButtons.has('link')).toBe(true); // links
      expect(resolved.enabledButtons.has('fontColor')).toBe(true); // advanced
      
      // Should be grouped by categories
      expect(resolved.groups.length).toBe(7); // All 7 categories
    });

    it('should fall back to full preset for invalid preset', () => {
      const config: ToolbarConfig = { preset: 'invalid' as any };
      const resolved = ToolbarConfigResolver.resolve(config);
      
      expect(consoleSpy).toHaveBeenCalledWith('Invalid preset "invalid". Available presets: minimal, standard, full. Falling back to full preset');
      expect(resolved.enabledButtons.size).toBe(38); // Full preset
    });

    it('should handle null preset gracefully', () => {
      const config: ToolbarConfig = { preset: null as any };
      const resolved = ToolbarConfigResolver.resolve(config);
      
      // null preset is falsy, so no preset is applied and it falls back to full configuration
      expect(resolved.enabledButtons.size).toBe(38);
    });

    it('should handle undefined preset gracefully', () => {
      const config: ToolbarConfig = { preset: undefined };
      const resolved = ToolbarConfigResolver.resolve(config);
      
      // Should fall back to full configuration when no buttons after processing
      expect(resolved.enabledButtons.size).toBe(38);
    });
  });

  // Test include functionality with categories and individual buttons
  describe('include functionality', () => {
    it('should include buttons from single category', () => {
      const config: ToolbarConfig = {
        include: {
          categories: ['formatting']
        }
      };
      const resolved = ToolbarConfigResolver.resolve(config);
      
      expect(resolved.enabledButtons.has('bold')).toBe(true);
      expect(resolved.enabledButtons.has('italic')).toBe(true);
      expect(resolved.enabledButtons.has('underline')).toBe(true);
      expect(resolved.enabledButtons.has('strikethrough')).toBe(true);
      expect(resolved.enabledButtons.has('subscript')).toBe(true);
      expect(resolved.enabledButtons.has('superscript')).toBe(true);
      expect(resolved.enabledButtons.has('h1')).toBe(false); // Not in formatting category
    });

    it('should include buttons from multiple categories', () => {
      const config: ToolbarConfig = {
        include: {
          categories: ['formatting', 'structure', 'lists']
        }
      };
      const resolved = ToolbarConfigResolver.resolve(config);
      
      // Formatting buttons
      expect(resolved.enabledButtons.has('bold')).toBe(true);
      expect(resolved.enabledButtons.has('italic')).toBe(true);
      
      // Structure buttons
      expect(resolved.enabledButtons.has('h1')).toBe(true);
      expect(resolved.enabledButtons.has('h2')).toBe(true);
      expect(resolved.enabledButtons.has('h6')).toBe(true);
      
      // List buttons
      expect(resolved.enabledButtons.has('bulletList')).toBe(true);
      expect(resolved.enabledButtons.has('numberedList')).toBe(true);
      expect(resolved.enabledButtons.has('indent')).toBe(true);
      expect(resolved.enabledButtons.has('outdent')).toBe(true);
      
      // Should not include buttons from other categories
      expect(resolved.enabledButtons.has('alignLeft')).toBe(false); // alignment
      expect(resolved.enabledButtons.has('image')).toBe(false); // media
    });

    it('should include all categories', () => {
      const config: ToolbarConfig = {
        include: {
          categories: ['formatting', 'structure', 'lists', 'alignment', 'media', 'links', 'advanced']
        }
      };
      const resolved = ToolbarConfigResolver.resolve(config);
      
      expect(resolved.enabledButtons.size).toBe(38); // All buttons
    });

    it('should include individual buttons', () => {
      const config: ToolbarConfig = {
        include: {
          buttons: ['bold', 'italic', 'bulletList']
        }
      };
      const resolved = ToolbarConfigResolver.resolve(config);
      
      expect(resolved.enabledButtons).toEqual(new Set(['bold', 'italic', 'bulletList']));
      expect(resolved.enabledButtons.size).toBe(3);
    });

    it('should include buttons from groups', () => {
      const config: ToolbarConfig = {
        include: {
          groups: [
            { name: 'basic', buttons: ['bold', 'italic'] },
            { name: 'headers', buttons: ['h1', 'h2'] }
          ]
        }
      };
      const resolved = ToolbarConfigResolver.resolve(config);
      
      expect(resolved.enabledButtons).toEqual(new Set(['bold', 'italic', 'h1', 'h2']));
    });

    it('should combine categories, buttons, and groups without duplication', () => {
      const config: ToolbarConfig = {
        include: {
          categories: ['formatting'],
          buttons: ['bold', 'bulletList'], // bold is duplicate from formatting
          groups: [{ name: 'headers', buttons: ['h1', 'bold'] }] // bold is duplicate
        }
      };
      const resolved = ToolbarConfigResolver.resolve(config);
      
      // Should include all formatting buttons plus bulletList and h1
      expect(resolved.enabledButtons.has('bold')).toBe(true);
      expect(resolved.enabledButtons.has('italic')).toBe(true);
      expect(resolved.enabledButtons.has('underline')).toBe(true);
      expect(resolved.enabledButtons.has('bulletList')).toBe(true);
      expect(resolved.enabledButtons.has('h1')).toBe(true);
      
      // Should not have duplicates
      const boldCount = Array.from(resolved.enabledButtons).filter(b => b === 'bold').length;
      expect(boldCount).toBe(1);
    });

    it('should handle empty include configuration', () => {
      const config: ToolbarConfig = {
        include: {}
      };
      const resolved = ToolbarConfigResolver.resolve(config);
      
      // Should fall back to full configuration
      expect(resolved.enabledButtons.size).toBe(38);
    });

    it('should handle invalid categories gracefully', () => {
      const config: ToolbarConfig = {
        include: {
          categories: ['invalid' as ToolbarCategory, 'nonexistent' as ToolbarCategory, 'formatting']
        }
      };
      const resolved = ToolbarConfigResolver.resolve(config);
      
      expect(consoleSpy).toHaveBeenCalledWith('Invalid category "invalid". Available categories: formatting, structure, lists, alignment, media, links, advanced. Category ignored');
      expect(consoleSpy).toHaveBeenCalledWith('Invalid category "nonexistent". Available categories: formatting, structure, lists, alignment, media, links, advanced. Category ignored');
      expect(resolved.enabledButtons.has('bold')).toBe(true); // Valid category still works
    });

    it('should handle invalid buttons gracefully', () => {
      const config: ToolbarConfig = {
        include: {
          buttons: ['invalid' as ToolbarButtonType, 'nonexistent' as ToolbarButtonType, 'bold']
        }
      };
      const resolved = ToolbarConfigResolver.resolve(config);
      
      expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('Invalid button "invalid". Available buttons:'));
      expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('Invalid button "nonexistent". Available buttons:'));
      expect(resolved.enabledButtons.has('bold')).toBe(true); // Valid button still works
      expect(resolved.enabledButtons.size).toBe(1);
    });

    it('should handle invalid buttons in groups gracefully', () => {
      const config: ToolbarConfig = {
        include: {
          groups: [
            { name: 'mixed', buttons: ['bold', 'invalid' as ToolbarButtonType, 'italic'] }
          ]
        }
      };
      const resolved = ToolbarConfigResolver.resolve(config);
      
      expect(consoleSpy).toHaveBeenCalledWith('Invalid button "invalid" in include group "mixed" ignored');
      expect(resolved.enabledButtons).toEqual(new Set(['bold', 'italic']));
    });

    it('should handle empty categories array', () => {
      const config: ToolbarConfig = {
        include: {
          categories: []
        }
      };
      const resolved = ToolbarConfigResolver.resolve(config);
      
      // Should fall back to full configuration
      expect(resolved.enabledButtons.size).toBe(38);
    });

    it('should handle empty buttons array', () => {
      const config: ToolbarConfig = {
        include: {
          buttons: []
        }
      };
      const resolved = ToolbarConfigResolver.resolve(config);
      
      // Should fall back to full configuration
      expect(resolved.enabledButtons.size).toBe(38);
    });

    it('should handle empty groups array', () => {
      const config: ToolbarConfig = {
        include: {
          groups: []
        }
      };
      const resolved = ToolbarConfigResolver.resolve(config);
      
      // Should fall back to full configuration
      expect(resolved.enabledButtons.size).toBe(38);
    });
  });

  // Test exclude functionality with categories and individual buttons
  describe('exclude functionality', () => {
    it('should exclude buttons from single category', () => {
      const config: ToolbarConfig = {
        preset: 'full',
        exclude: {
          categories: ['formatting']
        }
      };
      const resolved = ToolbarConfigResolver.resolve(config);
      
      // All formatting buttons should be excluded
      expect(resolved.enabledButtons.has('bold')).toBe(false);
      expect(resolved.enabledButtons.has('italic')).toBe(false);
      expect(resolved.enabledButtons.has('underline')).toBe(false);
      expect(resolved.enabledButtons.has('strikethrough')).toBe(false);
      expect(resolved.enabledButtons.has('subscript')).toBe(false);
      expect(resolved.enabledButtons.has('superscript')).toBe(false);
      
      // Other category buttons should remain
      expect(resolved.enabledButtons.has('h1')).toBe(true); // structure
      expect(resolved.enabledButtons.has('bulletList')).toBe(true); // lists
      expect(resolved.enabledButtons.has('alignLeft')).toBe(true); // alignment
      
      expect(resolved.enabledButtons.size).toBe(32); // 38 - 6 formatting buttons
    });

    it('should exclude buttons from multiple categories', () => {
      const config: ToolbarConfig = {
        preset: 'full',
        exclude: {
          categories: ['formatting', 'alignment', 'media']
        }
      };
      const resolved = ToolbarConfigResolver.resolve(config);
      
      // Formatting buttons excluded
      expect(resolved.enabledButtons.has('bold')).toBe(false);
      expect(resolved.enabledButtons.has('italic')).toBe(false);
      
      // Alignment buttons excluded
      expect(resolved.enabledButtons.has('alignLeft')).toBe(false);
      expect(resolved.enabledButtons.has('alignCenter')).toBe(false);
      expect(resolved.enabledButtons.has('alignRight')).toBe(false);
      expect(resolved.enabledButtons.has('alignJustify')).toBe(false);
      
      // Media buttons excluded
      expect(resolved.enabledButtons.has('image')).toBe(false);
      expect(resolved.enabledButtons.has('file')).toBe(false);
      expect(resolved.enabledButtons.has('table')).toBe(false);
      
      // Other buttons should remain
      expect(resolved.enabledButtons.has('h1')).toBe(true); // structure
      expect(resolved.enabledButtons.has('bulletList')).toBe(true); // lists
      expect(resolved.enabledButtons.has('link')).toBe(true); // links
      
      expect(resolved.enabledButtons.size).toBe(25); // 38 - 6 formatting - 4 alignment - 3 media
    });

    it('should exclude individual buttons', () => {
      const config: ToolbarConfig = {
        include: {
          categories: ['formatting']
        },
        exclude: {
          buttons: ['bold', 'italic']
        }
      };
      const resolved = ToolbarConfigResolver.resolve(config);
      
      expect(resolved.enabledButtons.has('bold')).toBe(false);
      expect(resolved.enabledButtons.has('italic')).toBe(false);
      expect(resolved.enabledButtons.has('underline')).toBe(true);
      expect(resolved.enabledButtons.has('strikethrough')).toBe(true);
      expect(resolved.enabledButtons.size).toBe(4); // 6 formatting - 2 excluded
    });

    it('should exclude buttons from both categories and individual buttons', () => {
      const config: ToolbarConfig = {
        preset: 'full',
        exclude: {
          categories: ['formatting'],
          buttons: ['h1', 'bulletList', 'image']
        }
      };
      const resolved = ToolbarConfigResolver.resolve(config);
      
      // All formatting buttons excluded
      expect(resolved.enabledButtons.has('bold')).toBe(false);
      expect(resolved.enabledButtons.has('italic')).toBe(false);
      
      // Individual buttons excluded
      expect(resolved.enabledButtons.has('h1')).toBe(false);
      expect(resolved.enabledButtons.has('bulletList')).toBe(false);
      expect(resolved.enabledButtons.has('image')).toBe(false);
      
      // Other buttons should remain
      expect(resolved.enabledButtons.has('h2')).toBe(true);
      expect(resolved.enabledButtons.has('numberedList')).toBe(true);
      expect(resolved.enabledButtons.has('file')).toBe(true);
      
      expect(resolved.enabledButtons.size).toBe(29); // 38 - 6 formatting - 3 individual
    });

    it('should handle exclude taking precedence over include', () => {
      const config: ToolbarConfig = {
        include: {
          categories: ['formatting', 'structure']
        },
        exclude: {
          buttons: ['bold', 'italic', 'h1']
        }
      };
      const resolved = ToolbarConfigResolver.resolve(config);
      
      expect(resolved.enabledButtons.has('bold')).toBe(false);
      expect(resolved.enabledButtons.has('italic')).toBe(false);
      expect(resolved.enabledButtons.has('h1')).toBe(false);
      expect(resolved.enabledButtons.has('underline')).toBe(true);
      expect(resolved.enabledButtons.has('h2')).toBe(true);
    });

    it('should handle exclude taking precedence over preset', () => {
      const config: ToolbarConfig = {
        preset: 'minimal',
        exclude: {
          buttons: ['bold']
        }
      };
      const resolved = ToolbarConfigResolver.resolve(config);
      
      expect(resolved.enabledButtons.has('bold')).toBe(false);
      expect(resolved.enabledButtons.has('italic')).toBe(true);
      expect(resolved.enabledButtons.has('underline')).toBe(true);
      expect(resolved.enabledButtons.size).toBe(2);
    });

    it('should handle exclude category taking precedence over include category', () => {
      const config: ToolbarConfig = {
        include: {
          categories: ['formatting', 'structure']
        },
        exclude: {
          categories: ['formatting']
        }
      };
      const resolved = ToolbarConfigResolver.resolve(config);
      
      // All formatting buttons should be excluded
      expect(resolved.enabledButtons.has('bold')).toBe(false);
      expect(resolved.enabledButtons.has('italic')).toBe(false);
      
      // Structure buttons should remain
      expect(resolved.enabledButtons.has('h1')).toBe(true);
      expect(resolved.enabledButtons.has('h2')).toBe(true);
      expect(resolved.enabledButtons.size).toBe(6); // Only structure buttons
    });

    it('should handle invalid exclude categories gracefully', () => {
      const config: ToolbarConfig = {
        preset: 'full',
        exclude: {
          categories: ['invalid' as ToolbarCategory, 'nonexistent' as ToolbarCategory]
        }
      };
      const resolved = ToolbarConfigResolver.resolve(config);
      
      expect(consoleSpy).toHaveBeenCalledWith('Invalid exclude category "invalid". Available categories: formatting, structure, lists, alignment, media, links, advanced. Category ignored');
      expect(consoleSpy).toHaveBeenCalledWith('Invalid exclude category "nonexistent". Available categories: formatting, structure, lists, alignment, media, links, advanced. Category ignored');
      // Should still have all buttons since invalid categories were ignored
      expect(resolved.enabledButtons.size).toBe(38);
    });

    it('should handle invalid exclude buttons gracefully', () => {
      const config: ToolbarConfig = {
        preset: 'full',
        exclude: {
          buttons: ['invalid' as ToolbarButtonType, 'nonexistent' as ToolbarButtonType]
        }
      };
      const resolved = ToolbarConfigResolver.resolve(config);
      
      expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('Invalid exclude button "invalid". Available buttons:'));
      expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('Invalid exclude button "nonexistent". Available buttons:'));
      // Should still have all buttons since invalid buttons were ignored
      expect(resolved.enabledButtons.size).toBe(38);
    });

    it('should handle empty exclude configuration', () => {
      const config: ToolbarConfig = {
        preset: 'minimal',
        exclude: {}
      };
      const resolved = ToolbarConfigResolver.resolve(config);
      
      // Should have all minimal preset buttons
      expect(resolved.enabledButtons.size).toBe(3);
      expect(resolved.enabledButtons.has('bold')).toBe(true);
    });

    it('should handle excluding all buttons from a category', () => {
      const config: ToolbarConfig = {
        include: {
          categories: ['formatting']
        },
        exclude: {
          categories: ['formatting']
        }
      };
      const resolved = ToolbarConfigResolver.resolve(config);
      
      // Should fall back to full configuration since no buttons remain
      expect(resolved.enabledButtons.size).toBe(38);
    });
  });

  // Test order processing with custom button arrangements
  describe('order processing', () => {
    it('should maintain custom order for individual buttons', () => {
      const config: ToolbarConfig = {
        include: {
          buttons: ['bold', 'italic', 'underline']
        },
        order: ['underline', 'bold', 'italic']
      };
      const resolved = ToolbarConfigResolver.resolve(config);
      
      expect(resolved.groups).toHaveLength(3);
      expect(resolved.groups[0].buttons).toEqual(['underline']);
      expect(resolved.groups[1].buttons).toEqual(['bold']);
      expect(resolved.groups[2].buttons).toEqual(['italic']);
    });

    it('should handle custom groups in order', () => {
      const config: ToolbarConfig = {
        include: {
          buttons: ['bold', 'italic', 'h1', 'h2']
        },
        order: [
          { name: 'formatting', buttons: ['bold', 'italic'] },
          { name: 'headers', buttons: ['h1', 'h2'] }
        ]
      };
      const resolved = ToolbarConfigResolver.resolve(config);
      
      expect(resolved.groups).toHaveLength(2);
      expect(resolved.groups[0].name).toBe('formatting');
      expect(resolved.groups[0].buttons).toEqual(['bold', 'italic']);
      expect(resolved.groups[1].name).toBe('headers');
      expect(resolved.groups[1].buttons).toEqual(['h1', 'h2']);
    });

    it('should handle mixed individual buttons and groups in order', () => {
      const config: ToolbarConfig = {
        include: {
          buttons: ['bold', 'italic', 'h1', 'h2', 'bulletList']
        },
        order: [
          'bold',
          { name: 'headers', buttons: ['h1', 'h2'] },
          'italic',
          'bulletList'
        ]
      };
      const resolved = ToolbarConfigResolver.resolve(config);
      
      expect(resolved.groups).toHaveLength(4);
      expect(resolved.groups[0].buttons).toEqual(['bold']);
      expect(resolved.groups[1].name).toBe('headers');
      expect(resolved.groups[1].buttons).toEqual(['h1', 'h2']);
      expect(resolved.groups[2].buttons).toEqual(['italic']);
      expect(resolved.groups[3].buttons).toEqual(['bulletList']);
    });

    it('should add remaining buttons when custom order is incomplete', () => {
      const config: ToolbarConfig = {
        include: {
          buttons: ['bold', 'italic', 'underline', 'h1', 'h2']
        },
        order: ['bold', { name: 'headers', buttons: ['h1'] }]
      };
      const resolved = ToolbarConfigResolver.resolve(config);
      
      // Should have ordered buttons plus remaining buttons
      expect(resolved.groups.length).toBe(3);
      expect(resolved.groups[0].buttons).toEqual(['bold']);
      expect(resolved.groups[1].name).toBe('headers');
      expect(resolved.groups[1].buttons).toEqual(['h1']);
      
      const remainingGroup = resolved.groups[2];
      expect(remainingGroup.name).toBe('remaining');
      expect(remainingGroup.buttons).toContain('italic');
      expect(remainingGroup.buttons).toContain('underline');
      expect(remainingGroup.buttons).toContain('h2');
    });

    it('should ignore invalid buttons in order', () => {
      const config: ToolbarConfig = {
        include: {
          buttons: ['bold', 'italic']
        },
        order: ['bold', 'invalid' as ToolbarButtonType, 'italic']
      };
      const resolved = ToolbarConfigResolver.resolve(config);
      
      expect(consoleSpy).toHaveBeenCalledWith('Invalid button "invalid" in order configuration ignored');
      expect(resolved.groups).toHaveLength(2);
      expect(resolved.groups[0].buttons).toEqual(['bold']);
      expect(resolved.groups[1].buttons).toEqual(['italic']);
    });

    it('should ignore buttons in order that are not included', () => {
      const config: ToolbarConfig = {
        include: {
          buttons: ['bold', 'italic']
        },
        order: ['bold', 'h1', 'italic'] // h1 not included
      };
      const resolved = ToolbarConfigResolver.resolve(config);
      
      expect(resolved.groups).toHaveLength(2);
      expect(resolved.groups[0].buttons).toEqual(['bold']);
      expect(resolved.groups[1].buttons).toEqual(['italic']);
    });

    it('should handle invalid buttons in custom groups', () => {
      const config: ToolbarConfig = {
        include: {
          buttons: ['bold', 'italic']
        },
        order: [
          { name: 'mixed', buttons: ['bold', 'invalid' as ToolbarButtonType, 'italic'] }
        ]
      };
      const resolved = ToolbarConfigResolver.resolve(config);
      
      expect(consoleSpy).toHaveBeenCalledWith('Invalid button "invalid" in order group "mixed" ignored');
      expect(resolved.groups).toHaveLength(1);
      expect(resolved.groups[0].name).toBe('mixed');
      expect(resolved.groups[0].buttons).toEqual(['bold', 'italic']);
    });

    it('should handle groups with no valid buttons', () => {
      const config: ToolbarConfig = {
        include: {
          buttons: ['bold', 'italic']
        },
        order: [
          { name: 'empty', buttons: ['h1', 'h2'] }, // Not included
          { name: 'valid', buttons: ['bold', 'italic'] }
        ]
      };
      const resolved = ToolbarConfigResolver.resolve(config);
      
      expect(resolved.groups).toHaveLength(1);
      expect(resolved.groups[0].name).toBe('valid');
      expect(resolved.groups[0].buttons).toEqual(['bold', 'italic']);
    });

    it('should create default groups when no order specified', () => {
      const config: ToolbarConfig = {
        include: {
          categories: ['formatting', 'structure']
        }
      };
      const resolved = ToolbarConfigResolver.resolve(config);
      
      // Should group by category
      const formattingGroup = resolved.groups.find(g => g.name === 'formatting');
      const structureGroup = resolved.groups.find(g => g.name === 'structure');
      
      expect(formattingGroup).toBeDefined();
      expect(structureGroup).toBeDefined();
      expect(formattingGroup!.buttons).toContain('bold');
      expect(formattingGroup!.buttons).toContain('italic');
      expect(structureGroup!.buttons).toContain('h1');
      expect(structureGroup!.buttons).toContain('h2');
    });

    it('should handle empty order array', () => {
      const config: ToolbarConfig = {
        include: {
          buttons: ['bold', 'italic', 'h1']
        },
        order: []
      };
      const resolved = ToolbarConfigResolver.resolve(config);
      
      // Should create default groups
      expect(resolved.groups.length).toBeGreaterThan(0);
      const formattingGroup = resolved.groups.find(g => g.name === 'formatting');
      const structureGroup = resolved.groups.find(g => g.name === 'structure');
      expect(formattingGroup).toBeDefined();
      expect(structureGroup).toBeDefined();
    });

    it('should handle complex ordering with all button types', () => {
      const config: ToolbarConfig = {
        include: {
          categories: ['formatting', 'structure']
        },
        order: [
          { name: 'primary', buttons: ['bold', 'italic'] },
          'h1',
          { name: 'secondary', buttons: ['underline', 'h2'] },
          'strikethrough'
        ]
      };
      const resolved = ToolbarConfigResolver.resolve(config);
      
      expect(resolved.groups).toHaveLength(5); // 4 ordered + 1 remaining
      expect(resolved.groups[0].name).toBe('primary');
      expect(resolved.groups[0].buttons).toEqual(['bold', 'italic']);
      expect(resolved.groups[1].buttons).toEqual(['h1']);
      expect(resolved.groups[2].name).toBe('secondary');
      expect(resolved.groups[2].buttons).toEqual(['underline', 'h2']);
      expect(resolved.groups[3].buttons).toEqual(['strikethrough']);
      
      const remainingGroup = resolved.groups[4];
      expect(remainingGroup.name).toBe('remaining');
      expect(remainingGroup.buttons.length).toBeGreaterThan(0);
    });
  });

  // Test invalid configuration handling and fallback behavior
  describe('invalid configuration handling and fallback behavior', () => {
    it('should handle empty configuration', () => {
      const resolved = ToolbarConfigResolver.resolve();
      
      // Should fall back to full configuration
      expect(resolved.enabledButtons.size).toBe(38);
      expect(resolved.groups.length).toBe(7); // All categories
    });

    it('should handle undefined configuration', () => {
      const resolved = ToolbarConfigResolver.resolve(undefined);
      
      // Should fall back to full configuration
      expect(resolved.enabledButtons.size).toBe(38);
      expect(resolved.groups.length).toBe(7);
    });

    it('should handle null configuration', () => {
      const resolved = ToolbarConfigResolver.resolve(null as any);
      
      // Should fall back to full configuration
      expect(resolved.enabledButtons.size).toBe(38);
      expect(resolved.groups.length).toBe(7);
    });

    it('should handle configuration that results in no buttons', () => {
      const config: ToolbarConfig = {
        include: {
          buttons: []
        }
      };
      const resolved = ToolbarConfigResolver.resolve(config);
      
      // Should fall back to full configuration
      expect(resolved.enabledButtons.size).toBe(38);
    });

    it('should handle configuration with only invalid buttons', () => {
      const config: ToolbarConfig = {
        include: {
          buttons: ['invalid1' as ToolbarButtonType, 'invalid2' as ToolbarButtonType]
        }
      };
      const resolved = ToolbarConfigResolver.resolve(config);
      
      expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('Invalid button "invalid1". Available buttons:'));
      expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('Invalid button "invalid2". Available buttons:'));
      // Should fall back to full configuration
      expect(resolved.enabledButtons.size).toBe(38);
    });

    it('should handle configuration with only invalid categories', () => {
      const config: ToolbarConfig = {
        include: {
          categories: ['invalid1' as ToolbarCategory, 'invalid2' as ToolbarCategory]
        }
      };
      const resolved = ToolbarConfigResolver.resolve(config);
      
      expect(consoleSpy).toHaveBeenCalledWith('Invalid category "invalid1". Available categories: formatting, structure, lists, alignment, media, links, advanced. Category ignored');
      expect(consoleSpy).toHaveBeenCalledWith('Invalid category "invalid2". Available categories: formatting, structure, lists, alignment, media, links, advanced. Category ignored');
      // Should fall back to full configuration
      expect(resolved.enabledButtons.size).toBe(38);
    });

    it('should handle malformed configuration gracefully', () => {
      // Simulate an error during processing
      const config: ToolbarConfig = {
        include: {
          groups: [null as any, undefined as any]
        }
      };
      
      const resolved = ToolbarConfigResolver.resolve(config);
      
      // Should still return a valid configuration (fallback to full)
      expect(resolved.enabledButtons).toBeDefined();
      expect(resolved.groups).toBeDefined();
      expect(resolved.enabledButtons.size).toBe(38);
    });

    it('should handle preset combined with custom configuration', () => {
      const config: ToolbarConfig = {
        preset: 'minimal',
        include: {
          buttons: ['h1']
        },
        exclude: {
          buttons: ['bold']
        }
      };
      const resolved = ToolbarConfigResolver.resolve(config);
      
      expect(resolved.enabledButtons.has('bold')).toBe(false); // Excluded
      expect(resolved.enabledButtons.has('italic')).toBe(true); // From preset
      expect(resolved.enabledButtons.has('underline')).toBe(true); // From preset
      expect(resolved.enabledButtons.has('h1')).toBe(true); // Added via include
      expect(resolved.enabledButtons.size).toBe(3); // 3 from minimal - 1 excluded + 1 included
    });

    it('should handle configuration with malformed groups', () => {
      const config: ToolbarConfig = {
        include: {
          groups: [
            { name: 'valid', buttons: ['bold', 'italic'] },
            { name: '', buttons: ['h1'] }, // Empty name
            { buttons: ['h2'] } as any, // Missing name
            { name: 'no-buttons' } as any // Missing buttons
          ]
        }
      };
      
      const resolved = ToolbarConfigResolver.resolve(config);
      
      // Should include valid buttons and ignore malformed groups
      expect(resolved.enabledButtons.has('bold')).toBe(true);
      expect(resolved.enabledButtons.has('italic')).toBe(true);
      expect(resolved.enabledButtons.has('h1')).toBe(true);
      // h2 is not included because the group with h2 is malformed (missing name)
      expect(resolved.enabledButtons.has('h2')).toBe(false);
    });

    it('should handle configuration that excludes all included buttons', () => {
      const config: ToolbarConfig = {
        include: {
          buttons: ['bold', 'italic']
        },
        exclude: {
          buttons: ['bold', 'italic']
        }
      };
      const resolved = ToolbarConfigResolver.resolve(config);
      
      // Should fall back to full configuration since no buttons remain
      expect(resolved.enabledButtons.size).toBe(38);
    });

    it('should handle configuration with circular references in order', () => {
      const config: ToolbarConfig = {
        include: {
          buttons: ['bold', 'italic', 'underline']
        },
        order: [
          { name: 'group1', buttons: ['bold', 'italic'] },
          'bold', // Duplicate reference
          { name: 'group2', buttons: ['italic', 'underline'] } // Duplicate italic
        ]
      };
      const resolved = ToolbarConfigResolver.resolve(config);
      
      // Should handle duplicates gracefully
      expect(resolved.enabledButtons.size).toBe(3);
      expect(resolved.enabledButtons.has('bold')).toBe(true);
      expect(resolved.enabledButtons.has('italic')).toBe(true);
      expect(resolved.enabledButtons.has('underline')).toBe(true);
    });

    it('should handle runtime errors gracefully with fallback', () => {
      // Mock console.warn to capture error handling
      const consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
      
      // Create a configuration that might cause processing errors
      const config: ToolbarConfig = {
        preset: 'minimal',
        include: {
          categories: ['formatting'],
          buttons: ['bold', 'italic'],
          groups: [{ name: 'test', buttons: ['bold'] }]
        },
        exclude: {
          categories: ['formatting'],
          buttons: ['bold']
        },
        order: [
          { name: 'complex', buttons: ['bold', 'italic'] },
          'underline'
        ]
      };
      
      const resolved = ToolbarConfigResolver.resolve(config);
      
      // Should return a valid configuration even with complex/conflicting rules
      expect(resolved.enabledButtons).toBeDefined();
      expect(resolved.groups).toBeDefined();
      expect(resolved.groups.length).toBeGreaterThan(0);
      
      consoleWarnSpy.mockRestore();
    });
  });

  // Test edge cases like empty configurations and conflicting rules
  describe('edge cases and conflicting rules', () => {
    it('should handle empty configurations at all levels', () => {
      const config: ToolbarConfig = {
        include: {
          categories: [],
          buttons: [],
          groups: []
        },
        exclude: {
          categories: [],
          buttons: []
        },
        order: []
      };
      const resolved = ToolbarConfigResolver.resolve(config);
      
      // Should fall back to full configuration
      expect(resolved.enabledButtons.size).toBe(38);
    });

    it('should handle conflicting include and exclude rules', () => {
      const config: ToolbarConfig = {
        include: {
          categories: ['formatting'],
          buttons: ['h1', 'bulletList']
        },
        exclude: {
          categories: ['formatting'], // Conflicts with include
          buttons: ['h1'] // Conflicts with include
        }
      };
      const resolved = ToolbarConfigResolver.resolve(config);
      
      // Exclude should take precedence
      expect(resolved.enabledButtons.has('bold')).toBe(false); // Excluded via category
      expect(resolved.enabledButtons.has('h1')).toBe(false); // Excluded via button
      expect(resolved.enabledButtons.has('bulletList')).toBe(true); // Not excluded
      expect(resolved.enabledButtons.size).toBe(1);
    });

    it('should handle preset with conflicting include/exclude', () => {
      const config: ToolbarConfig = {
        preset: 'standard',
        include: {
          buttons: ['fontColor'] // Not in standard preset
        },
        exclude: {
          buttons: ['bold', 'italic'] // In standard preset
        }
      };
      const resolved = ToolbarConfigResolver.resolve(config);
      
      // Should start with standard, add fontColor, then exclude bold/italic
      expect(resolved.enabledButtons.has('bold')).toBe(false);
      expect(resolved.enabledButtons.has('italic')).toBe(false);
      expect(resolved.enabledButtons.has('fontColor')).toBe(true);
      expect(resolved.enabledButtons.has('underline')).toBe(true); // From standard
    });

    it('should handle order with buttons not in enabled set', () => {
      const config: ToolbarConfig = {
        include: {
          buttons: ['bold', 'italic']
        },
        order: [
          'bold',
          'h1', // Not included
          { name: 'mixed', buttons: ['italic', 'underline'] } // underline not included
        ]
      };
      const resolved = ToolbarConfigResolver.resolve(config);
      
      expect(resolved.groups).toHaveLength(2);
      expect(resolved.groups[0].buttons).toEqual(['bold']);
      expect(resolved.groups[1].name).toBe('mixed');
      expect(resolved.groups[1].buttons).toEqual(['italic']); // Only included button
    });

    it('should handle deeply nested invalid configurations', () => {
      const config: ToolbarConfig = {
        include: {
          groups: [
            {
              name: 'valid',
              buttons: ['bold', 'invalid1' as ToolbarButtonType]
            },
            {
              name: 'invalid-group',
              buttons: ['invalid2' as ToolbarButtonType, 'invalid3' as ToolbarButtonType]
            },
            {
              name: 'mixed',
              buttons: ['italic', 'invalid4' as ToolbarButtonType, 'underline']
            }
          ]
        }
      };
      const resolved = ToolbarConfigResolver.resolve(config);
      
      expect(consoleSpy).toHaveBeenCalledWith('Invalid button "invalid1" in group "valid" ignored');
      expect(consoleSpy).toHaveBeenCalledWith('Invalid button "invalid2" in group "invalid-group" ignored');
      expect(consoleSpy).toHaveBeenCalledWith('Invalid button "invalid3" in group "invalid-group" ignored');
      expect(consoleSpy).toHaveBeenCalledWith('Invalid button "invalid4" in group "mixed" ignored');
      
      expect(resolved.enabledButtons.has('bold')).toBe(true);
      expect(resolved.enabledButtons.has('italic')).toBe(true);
      expect(resolved.enabledButtons.has('underline')).toBe(true);
      expect(resolved.enabledButtons.size).toBe(3);
    });

    it('should handle maximum complexity configuration', () => {
      const config: ToolbarConfig = {
        preset: 'full',
        include: {
          categories: ['formatting', 'structure'],
          buttons: ['bulletList', 'image'],
          groups: [
            { name: 'custom1', buttons: ['link', 'unlink'] },
            { name: 'custom2', buttons: ['alignLeft', 'alignRight'] }
          ]
        },
        exclude: {
          categories: ['advanced'],
          buttons: ['bold', 'h1', 'bulletList']
        },
        order: [
          { name: 'primary', buttons: ['italic', 'underline'] },
          'h2',
          { name: 'secondary', buttons: ['image', 'link'] }
        ]
      };
      const resolved = ToolbarConfigResolver.resolve(config);
      
      // Should process all rules correctly
      expect(resolved.enabledButtons.has('bold')).toBe(false); // Excluded
      expect(resolved.enabledButtons.has('h1')).toBe(false); // Excluded
      expect(resolved.enabledButtons.has('bulletList')).toBe(false); // Excluded
      expect(resolved.enabledButtons.has('fontColor')).toBe(false); // Advanced category excluded
      expect(resolved.enabledButtons.has('italic')).toBe(true); // From formatting
      expect(resolved.enabledButtons.has('image')).toBe(true); // From include buttons
      expect(resolved.enabledButtons.has('link')).toBe(true); // From include groups
      
      // Should have custom ordering
      expect(resolved.groups.length).toBeGreaterThan(3);
      expect(resolved.groups[0].name).toBe('primary');
      expect(resolved.groups[1].buttons).toEqual(['h2']);
      expect(resolved.groups[2].name).toBe('secondary');
    });

    it('should validate button types correctly in all contexts', () => {
      const config: ToolbarConfig = {
        include: {
          buttons: ['bold', 'invalid-button' as ToolbarButtonType, 'italic']
        },
        exclude: {
          buttons: ['invalid-exclude' as ToolbarButtonType]
        },
        order: [
          'invalid-order' as ToolbarButtonType,
          { name: 'test', buttons: ['bold', 'invalid-group' as ToolbarButtonType] }
        ]
      };
      
      const resolved = ToolbarConfigResolver.resolve(config);
      
      expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('Invalid button "invalid-button". Available buttons:'));
      expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('Invalid exclude button "invalid-exclude". Available buttons:'));
      expect(consoleSpy).toHaveBeenCalledWith('Invalid button "invalid-order" in order configuration ignored');
      expect(consoleSpy).toHaveBeenCalledWith('Invalid button "invalid-group" in order group "test" ignored');
      
      expect(resolved.enabledButtons.has('bold')).toBe(true);
      expect(resolved.enabledButtons.has('italic')).toBe(true);
      expect(resolved.enabledButtons.has('invalid-button' as ToolbarButtonType)).toBe(false);
    });
  });
});