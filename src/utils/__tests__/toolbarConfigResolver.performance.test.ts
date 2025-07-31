import { ToolbarConfigResolver } from '../toolbarConfigResolver';
import { ToolbarConfig } from '../../types';

describe('ToolbarConfigResolver Performance Tests', () => {
  beforeEach(() => {
    // Clear cache before each test
    ToolbarConfigResolver.clearCache();
  });

  describe('Configuration Caching', () => {
    it('should cache resolved configurations', () => {
      const config: ToolbarConfig = {
        preset: 'minimal'
      };

      // First resolution
      const result1 = ToolbarConfigResolver.resolve(config);
      const stats1 = ToolbarConfigResolver.getCacheStats();
      
      // Second resolution with same config
      const result2 = ToolbarConfigResolver.resolve(config);
      const stats2 = ToolbarConfigResolver.getCacheStats();

      // Should return equivalent results (cached, but cloned for safety)
      expect(result1).toStrictEqual(result2);
      expect(result1).not.toBe(result2); // Different objects to prevent mutation issues
      expect(stats1.size).toBe(1);
      expect(stats2.size).toBe(1);
    });

    it('should generate different cache keys for different configurations', () => {
      const config1: ToolbarConfig = { preset: 'minimal' };
      const config2: ToolbarConfig = { preset: 'standard' };

      ToolbarConfigResolver.resolve(config1);
      ToolbarConfigResolver.resolve(config2);

      const stats = ToolbarConfigResolver.getCacheStats();
      expect(stats.size).toBe(2);
    });

    it('should handle cache size limit', () => {
      // Create many different configurations to test cache limit
      for (let i = 0; i < 105; i++) {
        const config: ToolbarConfig = {
          include: {
            buttons: [`button-${i}` as any] // Using any to bypass type checking for test
          }
        };
        ToolbarConfigResolver.resolve(config);
      }

      const stats = ToolbarConfigResolver.getCacheStats();
      expect(stats.size).toBeLessThanOrEqual(stats.maxSize);
    });

    it('should clear cache correctly', () => {
      const config: ToolbarConfig = { preset: 'minimal' };
      ToolbarConfigResolver.resolve(config);
      
      let stats = ToolbarConfigResolver.getCacheStats();
      expect(stats.size).toBe(1);

      ToolbarConfigResolver.clearCache();
      
      stats = ToolbarConfigResolver.getCacheStats();
      expect(stats.size).toBe(0);
    });
  });

  describe('Performance Optimizations', () => {
    it('should process includes efficiently with Set operations', () => {
      const config: ToolbarConfig = {
        include: {
          categories: ['formatting', 'structure', 'lists'],
          buttons: ['bold', 'italic', 'underline', 'h1', 'h2'] // Some duplicates with categories
        }
      };

      const startTime = performance.now();
      const result = ToolbarConfigResolver.resolve(config);
      const endTime = performance.now();

      // Should complete quickly (less than 10ms for this simple config)
      expect(endTime - startTime).toBeLessThan(10);
      
      // Should have correct buttons without duplicates
      expect(result.enabledButtons.has('bold')).toBe(true);
      expect(result.enabledButtons.has('italic')).toBe(true);
      expect(result.enabledButtons.has('h1')).toBe(true);
      expect(result.enabledButtons.has('bulletList')).toBe(true);
    });

    it('should process excludes efficiently with Set operations', () => {
      const config: ToolbarConfig = {
        preset: 'full',
        exclude: {
          categories: ['advanced'],
          buttons: ['bold', 'italic']
        }
      };

      const startTime = performance.now();
      const result = ToolbarConfigResolver.resolve(config);
      const endTime = performance.now();

      // Should complete quickly
      expect(endTime - startTime).toBeLessThan(10);
      
      // Should exclude specified buttons
      expect(result.enabledButtons.has('bold')).toBe(false);
      expect(result.enabledButtons.has('italic')).toBe(false);
      expect(result.enabledButtons.has('fontColor')).toBe(false); // From advanced category
      
      // Should include non-excluded buttons
      expect(result.enabledButtons.has('underline')).toBe(true);
      expect(result.enabledButtons.has('h1')).toBe(true);
    });

    it('should validate buttons efficiently with pre-computed Set', () => {
      const config: ToolbarConfig = {
        include: {
          buttons: [
            'bold', 'italic', 'underline', 'strikethrough',
            'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
            'bulletList', 'numberedList', 'indent', 'outdent',
            'alignLeft', 'alignCenter', 'alignRight', 'alignJustify',
            'image', 'file', 'table', 'link', 'unlink',
            'invalidButton1', 'invalidButton2' // Invalid buttons
          ] as any
        }
      };

      const startTime = performance.now();
      const result = ToolbarConfigResolver.resolve(config);
      const endTime = performance.now();

      // Should complete quickly even with many buttons
      expect(endTime - startTime).toBeLessThan(15);
      
      // Should include valid buttons
      expect(result.enabledButtons.has('bold')).toBe(true);
      expect(result.enabledButtons.has('h1')).toBe(true);
      expect(result.enabledButtons.has('bulletList')).toBe(true);
      
      // Should exclude invalid buttons
      expect(result.enabledButtons.has('invalidButton1' as any)).toBe(false);
      expect(result.enabledButtons.has('invalidButton2' as any)).toBe(false);
    });

    it('should handle complex configurations efficiently', () => {
      const config: ToolbarConfig = {
        include: {
          categories: ['formatting', 'structure', 'lists', 'alignment'],
          buttons: ['image', 'file', 'table'],
          groups: [
            { name: 'custom1', buttons: ['link', 'unlink'] },
            { name: 'custom2', buttons: ['undo', 'redo'] }
          ]
        },
        exclude: {
          categories: ['advanced'],
          buttons: ['strikethrough', 'subscript']
        },
        order: [
          { name: 'basic', buttons: ['bold', 'italic', 'underline'] },
          { name: 'headings', buttons: ['h1', 'h2', 'h3'] },
          'image',
          'table'
        ]
      };

      const startTime = performance.now();
      const result = ToolbarConfigResolver.resolve(config);
      const endTime = performance.now();

      // Should complete quickly even with complex config
      expect(endTime - startTime).toBeLessThan(20);
      
      // Should have correct structure
      expect(result.groups.length).toBeGreaterThan(0);
      expect(result.enabledButtons.size).toBeGreaterThan(0);
      
      // Should respect includes and excludes
      expect(result.enabledButtons.has('bold')).toBe(true);
      expect(result.enabledButtons.has('strikethrough')).toBe(false);
      expect(result.enabledButtons.has('fontColor')).toBe(false); // From advanced category
    });
  });

  describe('Memory Management', () => {
    it('should not leak memory with repeated resolutions', () => {
      const config: ToolbarConfig = { preset: 'standard' };
      
      // Resolve the same configuration many times
      for (let i = 0; i < 1000; i++) {
        ToolbarConfigResolver.resolve(config);
      }

      // Should only have one cached entry
      const stats = ToolbarConfigResolver.getCacheStats();
      expect(stats.size).toBe(1);
    });

    it('should create deep clones to prevent mutation issues', () => {
      const config: ToolbarConfig = { preset: 'minimal' };
      
      const result1 = ToolbarConfigResolver.resolve(config);
      const result2 = ToolbarConfigResolver.resolve(config);

      // Should be equivalent but different objects
      expect(result1).toStrictEqual(result2);
      expect(result1).not.toBe(result2);

      // Mutating one result should not affect the other
      result1.groups[0].buttons.push('newButton' as any);
      
      const result3 = ToolbarConfigResolver.resolve(config);
      expect(result3.groups[0].buttons).not.toContain('newButton');
      expect(result2.groups[0].buttons).not.toContain('newButton');
    });
  });
});