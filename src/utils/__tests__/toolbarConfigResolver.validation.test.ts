import { ToolbarConfigResolver } from '../toolbarConfigResolver';
import { ToolbarConfig, ToolbarButtonType, ToolbarCategory } from '../../types';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';

describe('ToolbarConfigResolver - Error Handling and Validation', () => {
  let consoleSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    ToolbarConfigResolver.clearCache();
  });

  afterEach(() => {
    consoleSpy.mockRestore();
  });

  describe('Configuration Structure Validation', () => {
    it('should handle non-object configurations', () => {
      const configs = [
        { config: 'invalid string config', expectedType: 'string' },
        { config: 123, expectedType: 'number' },
        { config: true, expectedType: 'boolean' },
        { config: [], expectedType: 'array' },
        { config: () => {}, expectedType: 'function' }
      ];

      configs.forEach(({ config, expectedType }) => {
        consoleSpy.mockClear();
        const resolved = ToolbarConfigResolver.resolve(config as any);
        expect(resolved.enabledButtons.size).toBe(38); // Falls back to full
        
        // Should warn about invalid structure and attempt sanitization
        expect(consoleSpy).toHaveBeenCalledWith(
          'Toolbar configuration must be an object, received:', 
          expectedType
        );
        expect(consoleSpy).toHaveBeenCalledWith(
          'Invalid toolbar configuration structure detected, attempting to sanitize...'
        );
        
        // Some configurations may be sanitizable (like arrays), others may not
        // Both should result in a valid configuration
        expect(resolved.groups.length).toBeGreaterThan(0);
        expect(resolved.enabledButtons.size).toBeGreaterThan(0);
      });
    });

    it('should handle null and undefined configurations gracefully', () => {
      const nullResolved = ToolbarConfigResolver.resolve(null as any);
      const undefinedResolved = ToolbarConfigResolver.resolve(undefined);

      expect(nullResolved.enabledButtons.size).toBe(38);
      expect(undefinedResolved.enabledButtons.size).toBe(38);
      expect(consoleSpy).not.toHaveBeenCalled();
    });

    it('should validate preset property type', () => {
      const configs = [
        { preset: 123 },
        { preset: true },
        { preset: [] },
        { preset: {} }
      ];

      configs.forEach(config => {
        const resolved = ToolbarConfigResolver.resolve(config as any);
        expect(resolved.enabledButtons.size).toBe(38); // Falls back to full
        expect(consoleSpy).toHaveBeenCalledWith(
          'Toolbar configuration preset must be a string, received:', 
          typeof config.preset
        );
      });
    });

    it('should validate include property structure', () => {
      const configs = [
        { include: 'invalid' },
        { include: 123 },
        { include: null },
        { include: [] }
      ];

      configs.forEach(config => {
        const resolved = ToolbarConfigResolver.resolve(config as any);
        expect(consoleSpy).toHaveBeenCalledWith(
          'Toolbar configuration include must be an object, received:', 
          typeof config.include
        );
      });
    });

    it('should validate include.categories array', () => {
      const configs = [
        { include: { categories: 'invalid' } },
        { include: { categories: 123 } },
        { include: { categories: {} } }
      ];

      configs.forEach(config => {
        const resolved = ToolbarConfigResolver.resolve(config as any);
        expect(consoleSpy).toHaveBeenCalledWith(
          'Toolbar configuration include.categories must be an array, received:', 
          typeof config.include.categories
        );
      });
    });

    it('should validate include.buttons array', () => {
      const configs = [
        { include: { buttons: 'invalid' } },
        { include: { buttons: 123 } },
        { include: { buttons: {} } }
      ];

      configs.forEach(config => {
        const resolved = ToolbarConfigResolver.resolve(config as any);
        expect(consoleSpy).toHaveBeenCalledWith(
          'Toolbar configuration include.buttons must be an array, received:', 
          typeof config.include.buttons
        );
      });
    });

    it('should validate include.groups array and structure', () => {
      const configs = [
        { include: { groups: 'invalid' } },
        { include: { groups: [123] } },
        { include: { groups: [{ name: 123, buttons: [] }] } },
        { include: { groups: [{ name: 'valid', buttons: 'invalid' }] } }
      ];

      configs.forEach((config, index) => {
        const resolved = ToolbarConfigResolver.resolve(config as any);
        
        if (index === 0) {
          expect(consoleSpy).toHaveBeenCalledWith(
            'Toolbar configuration include.groups must be an array, received:', 
            typeof config.include.groups
          );
        } else if (index === 1) {
          expect(consoleSpy).toHaveBeenCalledWith(
            'Toolbar configuration include.groups[0] must be an object, received:', 
            typeof config.include.groups[0]
          );
        } else if (index === 2) {
          expect(consoleSpy).toHaveBeenCalledWith(
            'Toolbar configuration include.groups[0].name must be a string, received:', 
            typeof config.include.groups[0].name
          );
        } else if (index === 3) {
          expect(consoleSpy).toHaveBeenCalledWith(
            'Toolbar configuration include.groups[0].buttons must be an array, received:', 
            typeof config.include.groups[0].buttons
          );
        }
      });
    });

    it('should validate exclude property structure', () => {
      const configs = [
        { exclude: 'invalid' },
        { exclude: 123 },
        { exclude: null },
        { exclude: [] }
      ];

      configs.forEach(config => {
        const resolved = ToolbarConfigResolver.resolve(config as any);
        expect(consoleSpy).toHaveBeenCalledWith(
          'Toolbar configuration exclude must be an object, received:', 
          typeof config.exclude
        );
      });
    });

    it('should validate order property structure', () => {
      const configs = [
        { order: 'invalid' },
        { order: 123 },
        { order: {} },
        { order: [{ name: 123, buttons: [] }] },
        { order: [{ name: 'valid', buttons: 'invalid' }] }
      ];

      configs.forEach((config, index) => {
        const resolved = ToolbarConfigResolver.resolve(config as any);
        
        if (index < 3) {
          expect(consoleSpy).toHaveBeenCalledWith(
            'Toolbar configuration order must be an array, received:', 
            typeof config.order
          );
        } else if (index === 3) {
          expect(consoleSpy).toHaveBeenCalledWith(
            'Toolbar configuration order[0].name must be a string, received:', 
            typeof config.order[0].name
          );
        } else if (index === 4) {
          expect(consoleSpy).toHaveBeenCalledWith(
            'Toolbar configuration order[0].buttons must be an array, received:', 
            typeof config.order[0].buttons
          );
        }
      });
    });
  });

  describe('Configuration Sanitization', () => {
    it('should sanitize malformed configuration and continue processing', () => {
      const malformedConfig = {
        preset: 'minimal',
        include: {
          categories: ['formatting', 123, 'structure'], // Mixed types
          buttons: ['bold', null, 'italic', undefined], // Mixed types
          groups: [
            { name: 'valid', buttons: ['bold', 'italic'] },
            { name: 123, buttons: ['h1'] }, // Invalid name
            { buttons: ['h2'] }, // Missing name
            { name: 'empty', buttons: [] } // Empty buttons
          ]
        },
        exclude: {
          categories: [null, 'alignment'],
          buttons: [undefined, 'strikethrough']
        },
        order: [
          'bold',
          { name: 'headers', buttons: ['h1', null, 'h2'] },
          123, // Invalid item
          { name: 'invalid' } // Missing buttons
        ]
      };

      const resolved = ToolbarConfigResolver.resolve(malformedConfig as any);
      
      // Should still work with sanitized configuration
      expect(resolved.enabledButtons.has('bold')).toBe(true);
      expect(resolved.enabledButtons.has('italic')).toBe(true);
      expect(resolved.enabledButtons.size).toBeGreaterThan(0);
      
      expect(consoleSpy).toHaveBeenCalledWith(
        'Invalid toolbar configuration structure detected, attempting to sanitize...'
      );
    });

    it('should fall back to default when sanitization fails completely', () => {
      const unsanitizableConfig = {
        include: 'completely invalid',
        exclude: 123,
        order: 'also invalid'
      };

      const resolved = ToolbarConfigResolver.resolve(unsanitizableConfig as any);
      
      expect(resolved.enabledButtons.size).toBe(38); // Full fallback
      
      // Should warn about structure validation failures and then sanitization
      expect(consoleSpy).toHaveBeenCalledWith(
        'Invalid toolbar configuration structure detected, attempting to sanitize...'
      );
    });
  });

  describe('Preset Validation', () => {
    it('should handle invalid preset types', () => {
      const configs = [
        { preset: 123 },
        { preset: null },
        { preset: undefined },
        { preset: [] },
        { preset: {} }
      ];

      configs.forEach(config => {
        consoleSpy.mockClear();
        const resolved = ToolbarConfigResolver.resolve(config as any);
        expect(resolved.enabledButtons.size).toBe(38); // Falls back to full
        
        if (config.preset !== null && config.preset !== undefined) {
          // Structure validation happens first
          expect(consoleSpy).toHaveBeenCalledWith(
            'Toolbar configuration preset must be a string, received:', 
            typeof config.preset
          );
          expect(consoleSpy).toHaveBeenCalledWith(
            'Invalid toolbar configuration structure detected, attempting to sanitize...'
          );
        }
      });
    });

    it('should handle empty preset string', () => {
      const config = { preset: '' };
      const resolved = ToolbarConfigResolver.resolve(config);
      
      expect(resolved.enabledButtons.size).toBe(38);
      expect(consoleSpy).toHaveBeenCalledWith(
        'Empty preset name provided, falling back to full preset'
      );
    });

    it('should handle whitespace-only preset', () => {
      const config = { preset: '   ' };
      const resolved = ToolbarConfigResolver.resolve(config);
      
      expect(resolved.enabledButtons.size).toBe(38);
      expect(consoleSpy).toHaveBeenCalledWith(
        'Empty preset name provided, falling back to full preset'
      );
    });

    it('should provide helpful error message for invalid presets', () => {
      const config = { preset: 'nonexistent' };
      const resolved = ToolbarConfigResolver.resolve(config);
      
      expect(resolved.enabledButtons.size).toBe(38);
      expect(consoleSpy).toHaveBeenCalledWith(
        'Invalid preset "nonexistent". Available presets: minimal, standard, full. Falling back to full preset'
      );
    });

    it('should handle case-insensitive presets', () => {
      const configs = [
        { preset: 'MINIMAL' },
        { preset: 'Standard' },
        { preset: 'FULL' }
      ];

      configs.forEach(config => {
        const resolved = ToolbarConfigResolver.resolve(config);
        expect(resolved.enabledButtons.size).toBeGreaterThan(0);
        expect(consoleSpy).not.toHaveBeenCalled();
      });
    });
  });

  describe('Include Configuration Validation', () => {
    it('should handle non-array categories with helpful message', () => {
      const config = { include: { categories: 'formatting' } };
      const resolved = ToolbarConfigResolver.resolve(config as any);
      
      // Structure validation happens first
      expect(consoleSpy).toHaveBeenCalledWith(
        'Toolbar configuration include.categories must be an array, received:', 
        'string'
      );
      expect(consoleSpy).toHaveBeenCalledWith(
        'Invalid toolbar configuration structure detected, attempting to sanitize...'
      );
    });

    it('should handle non-string category items', () => {
      const config = { include: { categories: ['formatting', 123, null, 'structure'] } };
      const resolved = ToolbarConfigResolver.resolve(config as any);
      
      expect(consoleSpy).toHaveBeenCalledWith(
        'Category must be a string, received number, ignoring this category'
      );
      expect(consoleSpy).toHaveBeenCalledWith(
        'Category must be a string, received object, ignoring this category'
      );
      
      // Should still process valid categories
      expect(resolved.enabledButtons.has('bold')).toBe(true); // from formatting
      expect(resolved.enabledButtons.has('h1')).toBe(true); // from structure
    });

    it('should provide helpful error for invalid categories', () => {
      const config = { include: { categories: ['invalid', 'nonexistent'] } };
      const resolved = ToolbarConfigResolver.resolve(config as any);
      
      expect(consoleSpy).toHaveBeenCalledWith(
        'Invalid category "invalid". Available categories: formatting, structure, lists, alignment, media, links, advanced. Category ignored'
      );
      expect(consoleSpy).toHaveBeenCalledWith(
        'Invalid category "nonexistent". Available categories: formatting, structure, lists, alignment, media, links, advanced. Category ignored'
      );
    });

    it('should handle non-string button items', () => {
      const config = { include: { buttons: ['bold', 123, null, 'italic'] } };
      const resolved = ToolbarConfigResolver.resolve(config as any);
      
      expect(consoleSpy).toHaveBeenCalledWith(
        'Button must be a string, received number, ignoring this button'
      );
      expect(consoleSpy).toHaveBeenCalledWith(
        'Button must be a string, received object, ignoring this button'
      );
      
      // Should still process valid buttons
      expect(resolved.enabledButtons.has('bold')).toBe(true);
      expect(resolved.enabledButtons.has('italic')).toBe(true);
      expect(resolved.enabledButtons.size).toBe(2);
    });

    it('should provide helpful error for invalid buttons', () => {
      const config = { include: { buttons: ['invalid', 'nonexistent'] } };
      const resolved = ToolbarConfigResolver.resolve(config as any);
      
      // Should mention available buttons (truncated for test)
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('Invalid button "invalid". Available buttons:')
      );
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('Invalid button "nonexistent". Available buttons:')
      );
    });

    it('should handle malformed groups gracefully', () => {
      const config = {
        include: {
          groups: [
            'not an object',
            { name: 123, buttons: ['bold'] },
            { buttons: ['italic'] }, // missing name
            { name: 'empty' }, // missing buttons
            { name: 'valid', buttons: ['bold', 123, 'italic'] }
          ]
        }
      };
      
      const resolved = ToolbarConfigResolver.resolve(config as any);
      
      // Structure validation happens first
      expect(consoleSpy).toHaveBeenCalledWith(
        'Toolbar configuration include.groups[0] must be an object, received:', 
        'string'
      );
      expect(consoleSpy).toHaveBeenCalledWith(
        'Invalid toolbar configuration structure detected, attempting to sanitize...'
      );
      
      // Should still process valid buttons from valid group after sanitization
      expect(resolved.enabledButtons.has('bold')).toBe(true);
      expect(resolved.enabledButtons.has('italic')).toBe(true);
    });
  });

  describe('Exclude Configuration Validation', () => {
    it('should handle non-object exclude configuration', () => {
      const config = { preset: 'full', exclude: 'invalid' };
      const resolved = ToolbarConfigResolver.resolve(config as any);
      
      // Structure validation happens first
      expect(consoleSpy).toHaveBeenCalledWith(
        'Toolbar configuration exclude must be an object, received:', 
        'string'
      );
      expect(consoleSpy).toHaveBeenCalledWith(
        'Invalid toolbar configuration structure detected, attempting to sanitize...'
      );
      expect(resolved.enabledButtons.size).toBe(38); // No exclusions applied after sanitization
    });

    it('should handle non-array exclude categories', () => {
      const config = { preset: 'full', exclude: { categories: 'formatting' } };
      const resolved = ToolbarConfigResolver.resolve(config as any);
      
      // Structure validation happens first
      expect(consoleSpy).toHaveBeenCalledWith(
        'Toolbar configuration exclude.categories must be an array, received:', 
        'string'
      );
      expect(consoleSpy).toHaveBeenCalledWith(
        'Invalid toolbar configuration structure detected, attempting to sanitize...'
      );
      expect(resolved.enabledButtons.size).toBe(38); // No exclusions applied after sanitization
    });

    it('should handle non-string exclude category items', () => {
      const config = { preset: 'full', exclude: { categories: ['formatting', 123, 'alignment'] } };
      const resolved = ToolbarConfigResolver.resolve(config as any);
      
      expect(consoleSpy).toHaveBeenCalledWith(
        'Exclude category must be a string, received number, ignoring this category'
      );
      
      // Should still exclude valid categories
      expect(resolved.enabledButtons.has('bold')).toBe(false); // formatting excluded
      expect(resolved.enabledButtons.has('alignLeft')).toBe(false); // alignment excluded
      expect(resolved.enabledButtons.has('h1')).toBe(true); // structure not excluded
    });

    it('should provide helpful error for invalid exclude categories', () => {
      const config = { preset: 'full', exclude: { categories: ['invalid'] } };
      const resolved = ToolbarConfigResolver.resolve(config as any);
      
      expect(consoleSpy).toHaveBeenCalledWith(
        'Invalid exclude category "invalid". Available categories: formatting, structure, lists, alignment, media, links, advanced. Category ignored'
      );
    });
  });

  describe('Order Configuration Validation', () => {
    it('should handle non-array order configuration', () => {
      const config = { include: { buttons: ['bold', 'italic'] }, order: 'invalid' };
      const resolved = ToolbarConfigResolver.resolve(config as any);
      
      // Structure validation happens first
      expect(consoleSpy).toHaveBeenCalledWith(
        'Toolbar configuration order must be an array, received:', 
        'string'
      );
      expect(consoleSpy).toHaveBeenCalledWith(
        'Invalid toolbar configuration structure detected, attempting to sanitize...'
      );
      
      // Should fall back to default grouping after sanitization
      expect(resolved.groups.length).toBeGreaterThan(0);
    });

    it('should handle invalid order items', () => {
      const config = {
        include: { buttons: ['bold', 'italic', 'h1'] },
        order: [
          'bold',
          123,
          null,
          { name: 'headers', buttons: ['h1'] },
          { name: 123, buttons: ['italic'] },
          { name: 'invalid' } // missing buttons
        ]
      };
      
      const resolved = ToolbarConfigResolver.resolve(config as any);
      
      // Structure validation happens first
      expect(consoleSpy).toHaveBeenCalledWith(
        'Toolbar configuration order[1] must be a string or object, received:', 
        'number'
      );
      expect(consoleSpy).toHaveBeenCalledWith(
        'Invalid toolbar configuration structure detected, attempting to sanitize...'
      );
      
      // Should still process valid items after sanitization
      expect(resolved.groups.some(g => g.buttons.includes('bold'))).toBe(true);
      expect(resolved.groups.some(g => g.name === 'headers' && g.buttons.includes('h1'))).toBe(true);
    });

    it('should handle invalid buttons in order groups', () => {
      const config = {
        include: { buttons: ['bold', 'italic'] },
        order: [
          { name: 'mixed', buttons: ['bold', 123, null, 'invalid', 'italic'] }
        ]
      };
      
      const resolved = ToolbarConfigResolver.resolve(config as any);
      
      expect(consoleSpy).toHaveBeenCalledWith(
        'Button in order group "mixed" must be a string, received number, ignoring this button'
      );
      expect(consoleSpy).toHaveBeenCalledWith(
        'Button in order group "mixed" must be a string, received object, ignoring this button'
      );
      expect(consoleSpy).toHaveBeenCalledWith(
        'Invalid button "invalid" in order group "mixed" ignored'
      );
      
      // Should still process valid buttons
      const mixedGroup = resolved.groups.find(g => g.name === 'mixed');
      expect(mixedGroup?.buttons).toEqual(['bold', 'italic']);
    });
  });

  describe('Cache Key Generation with Malformed Data', () => {
    it('should generate safe cache keys for malformed configurations', () => {
      const malformedConfigs = [
        { preset: 123 },
        { include: { categories: [null, undefined, 'formatting'] } },
        { exclude: { buttons: [123, 'bold'] } },
        { order: [null, 'bold', { name: 123, buttons: ['italic'] }] }
      ];

      malformedConfigs.forEach(config => {
        // Should not throw an error
        expect(() => {
          const resolved = ToolbarConfigResolver.resolve(config as any);
          expect(resolved).toBeDefined();
        }).not.toThrow();
      });
    });

    it('should handle circular references in configuration', () => {
      const circularConfig: any = { preset: 'minimal' };
      circularConfig.self = circularConfig;

      const resolved = ToolbarConfigResolver.resolve(circularConfig);
      
      expect(resolved.enabledButtons.size).toBeGreaterThan(0);
      // The circular reference is handled by our safe cache key generation
      // which filters out invalid properties, so no error is expected
      expect(resolved.enabledButtons.has('bold')).toBe(true);
      expect(resolved.enabledButtons.has('italic')).toBe(true);
      expect(resolved.enabledButtons.has('underline')).toBe(true);
    });
  });

  describe('System Stability', () => {
    it('should never throw errors for any malformed input', () => {
      const malformedInputs = [
        null,
        undefined,
        'string',
        123,
        [],
        () => {},
        Symbol('test'),
        { circular: null },
        { preset: { nested: 'object' } },
        { include: { categories: { not: 'array' } } },
        { exclude: { buttons: 'not array' } },
        { order: { not: 'array' } }
      ];

      malformedInputs.forEach((input, index) => {
        expect(() => {
          const resolved = ToolbarConfigResolver.resolve(input as any);
          expect(resolved).toBeDefined();
          expect(resolved.groups).toBeDefined();
          expect(resolved.enabledButtons).toBeDefined();
          expect(resolved.enabledButtons.size).toBeGreaterThan(0);
        }).not.toThrow();
      });
    });

    it('should always return a valid configuration', () => {
      const inputs = [
        undefined,
        null,
        {},
        { preset: 'invalid' },
        { include: {} },
        { exclude: {} },
        { order: [] },
        { include: { categories: [], buttons: [], groups: [] } }
      ];

      inputs.forEach(input => {
        const resolved = ToolbarConfigResolver.resolve(input as any);
        
        expect(resolved).toBeDefined();
        expect(resolved.groups).toBeDefined();
        expect(Array.isArray(resolved.groups)).toBe(true);
        expect(resolved.groups.length).toBeGreaterThan(0);
        expect(resolved.enabledButtons).toBeDefined();
        expect(resolved.enabledButtons instanceof Set).toBe(true);
        expect(resolved.enabledButtons.size).toBeGreaterThan(0);
        
        // Each group should have valid structure
        resolved.groups.forEach(group => {
          expect(typeof group.name).toBe('string');
          expect(Array.isArray(group.buttons)).toBe(true);
          expect(group.buttons.length).toBeGreaterThan(0);
          group.buttons.forEach(button => {
            expect(typeof button).toBe('string');
            expect(resolved.enabledButtons.has(button)).toBe(true);
          });
        });
      });
    });
  });
});