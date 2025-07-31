import {
  ToolbarConfig,
  ResolvedToolbarConfig,
  ToolbarCategory,
  ToolbarButtonType,
  ToolbarGroup
} from '../types';

/**
 * Cache for resolved toolbar configurations to prevent unnecessary reprocessing
 */
const configCache = new Map<string, ResolvedToolbarConfig>();

/**
 * Maximum cache size to prevent memory leaks
 */
const MAX_CACHE_SIZE = 100;

/**
 * Utility class for processing and resolving toolbar configurations
 */
export class ToolbarConfigResolver {
  /**
   * Validates if a configuration object has the correct structure
   * @param config - The configuration to validate
   * @returns True if the configuration is valid, false otherwise
   */
  private static validateConfigStructure(config: any): config is ToolbarConfig {
    if (config === null || config === undefined) {
      return true; // null/undefined are valid (will use defaults)
    }

    if (typeof config !== 'object' || Array.isArray(config)) {
      console.warn('Toolbar configuration must be an object, received:', Array.isArray(config) ? 'array' : typeof config);
      return false;
    }

    // Check preset property
    if (config.preset !== undefined) {
      if (typeof config.preset !== 'string') {
        console.warn('Toolbar configuration preset must be a string, received:', typeof config.preset);
        return false;
      }
    }

    // Check include property
    if (config.include !== undefined) {
      if (typeof config.include !== 'object' || config.include === null) {
        console.warn('Toolbar configuration include must be an object, received:', typeof config.include);
        return false;
      }

      const { categories, buttons, groups } = config.include;

      if (categories !== undefined && !Array.isArray(categories)) {
        console.warn('Toolbar configuration include.categories must be an array, received:', typeof categories);
        return false;
      }

      if (buttons !== undefined && !Array.isArray(buttons)) {
        console.warn('Toolbar configuration include.buttons must be an array, received:', typeof buttons);
        return false;
      }

      if (groups !== undefined) {
        if (!Array.isArray(groups)) {
          console.warn('Toolbar configuration include.groups must be an array, received:', typeof groups);
          return false;
        }

        for (let i = 0; i < groups.length; i++) {
          const group = groups[i];
          if (typeof group !== 'object' || group === null) {
            console.warn(`Toolbar configuration include.groups[${i}] must be an object, received:`, typeof group);
            return false;
          }

          if (typeof group.name !== 'string') {
            console.warn(`Toolbar configuration include.groups[${i}].name must be a string, received:`, typeof group.name);
            return false;
          }

          if (!Array.isArray(group.buttons)) {
            console.warn(`Toolbar configuration include.groups[${i}].buttons must be an array, received:`, typeof group.buttons);
            return false;
          }
        }
      }
    }

    // Check exclude property
    if (config.exclude !== undefined) {
      if (typeof config.exclude !== 'object' || config.exclude === null) {
        console.warn('Toolbar configuration exclude must be an object, received:', typeof config.exclude);
        return false;
      }

      const { categories, buttons } = config.exclude;

      if (categories !== undefined && !Array.isArray(categories)) {
        console.warn('Toolbar configuration exclude.categories must be an array, received:', typeof categories);
        return false;
      }

      if (buttons !== undefined && !Array.isArray(buttons)) {
        console.warn('Toolbar configuration exclude.buttons must be an array, received:', typeof buttons);
        return false;
      }
    }

    // Check order property
    if (config.order !== undefined) {
      if (!Array.isArray(config.order)) {
        console.warn('Toolbar configuration order must be an array, received:', typeof config.order);
        return false;
      }

      for (let i = 0; i < config.order.length; i++) {
        const item = config.order[i];
        if (typeof item !== 'string' && (typeof item !== 'object' || item === null)) {
          console.warn(`Toolbar configuration order[${i}] must be a string or object, received:`, typeof item);
          return false;
        }

        if (typeof item === 'object') {
          if (typeof item.name !== 'string') {
            console.warn(`Toolbar configuration order[${i}].name must be a string, received:`, typeof item.name);
            return false;
          }

          if (!Array.isArray(item.buttons)) {
            console.warn(`Toolbar configuration order[${i}].buttons must be an array, received:`, typeof item.buttons);
            return false;
          }
        }
      }
    }

    return true;
  }

  /**
   * Sanitizes a configuration object by removing invalid properties
   * @param config - The configuration to sanitize
   * @returns A sanitized configuration object
   */
  private static sanitizeConfig(config: any): ToolbarConfig | undefined {
    if (!config || typeof config !== 'object') {
      return undefined;
    }

    const sanitized: ToolbarConfig = {};

    // Sanitize preset
    if (typeof config.preset === 'string') {
      sanitized.preset = config.preset as any;
    }

    // Sanitize include
    if (config.include && typeof config.include === 'object') {
      sanitized.include = {};

      if (Array.isArray(config.include.categories)) {
        sanitized.include.categories = config.include.categories.filter((cat: any) => 
          typeof cat === 'string'
        );
      }

      if (Array.isArray(config.include.buttons)) {
        sanitized.include.buttons = config.include.buttons.filter((btn: any) => 
          typeof btn === 'string'
        );
      }

      if (Array.isArray(config.include.groups)) {
        sanitized.include.groups = config.include.groups
          .filter((group: any) => 
            group && 
            typeof group === 'object' && 
            typeof group.name === 'string' && 
            Array.isArray(group.buttons)
          )
          .map((group: any) => ({
            name: group.name,
            buttons: group.buttons.filter((btn: any) => typeof btn === 'string')
          }))
          .filter((group: any) => group.buttons.length > 0);
      }
    }

    // Sanitize exclude
    if (config.exclude && typeof config.exclude === 'object') {
      sanitized.exclude = {};

      if (Array.isArray(config.exclude.categories)) {
        sanitized.exclude.categories = config.exclude.categories.filter((cat: any) => 
          typeof cat === 'string'
        );
      }

      if (Array.isArray(config.exclude.buttons)) {
        sanitized.exclude.buttons = config.exclude.buttons.filter((btn: any) => 
          typeof btn === 'string'
        );
      }
    }

    // Sanitize order
    if (Array.isArray(config.order)) {
      sanitized.order = config.order
        .filter((item: any) => {
          if (typeof item === 'string') {
            return true;
          }
          if (item && typeof item === 'object' && typeof item.name === 'string' && Array.isArray(item.buttons)) {
            return true;
          }
          return false;
        })
        .map((item: any) => {
          if (typeof item === 'string') {
            return item;
          }
          return {
            name: item.name,
            buttons: item.buttons.filter((btn: any) => typeof btn === 'string')
          };
        });
    }

    return sanitized;
  }
  /**
   * Static mapping of toolbar categories to their respective button arrays
   */
  private static readonly CATEGORY_MAPPINGS: Record<ToolbarCategory, ToolbarButtonType[]> = {
    formatting: ['bold', 'italic', 'underline', 'strikethrough', 'subscript', 'superscript'],
    structure: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
    lists: ['bulletList', 'numberedList', 'indent', 'outdent'],
    alignment: ['alignLeft', 'alignCenter', 'alignRight', 'alignJustify'],
    media: ['image', 'file', 'table'],
    links: ['link', 'unlink'],
    advanced: [
      'fontColor', 'backgroundColor', 'fontSize', 'fontFamily', 
      'specialChar', 'horizontalRule', 'findReplace', 'sourceCode', 
      'fullscreen', 'print', 'undo', 'redo', 'removeFormat'
    ]
  };

  /**
   * Static preset configurations for common toolbar setups
   */
  private static readonly PRESETS: Record<string, ToolbarButtonType[]> = {
    minimal: ['bold', 'italic', 'underline'],
    standard: [
      'bold', 'italic', 'underline', 'h1', 'h2', 'h3', 
      'bulletList', 'numberedList', 'link', 'image'
    ],
    full: [
      // All available buttons
      'bold', 'italic', 'underline', 'strikethrough',
      'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      'bulletList', 'numberedList', 'indent', 'outdent',
      'alignLeft', 'alignCenter', 'alignRight', 'alignJustify',
      'image', 'file', 'table',
      'link', 'unlink',
      'fontColor', 'backgroundColor', 'fontSize', 'fontFamily',
      'subscript', 'superscript', 'specialChar', 'horizontalRule',
      'findReplace', 'sourceCode', 'fullscreen', 'print',
      'undo', 'redo', 'removeFormat'
    ]
  };

  /**
   * Pre-computed set of all valid buttons for O(1) validation
   */
  private static readonly VALID_BUTTONS = new Set<ToolbarButtonType>(
    Object.values(this.CATEGORY_MAPPINGS).flat()
  );

  /**
   * Main method to resolve a toolbar configuration into a processed configuration
   * @param config - The toolbar configuration to process
   * @returns Resolved toolbar configuration with groups and enabled buttons
   */
  static resolve(config?: ToolbarConfig): ResolvedToolbarConfig {
    let processedConfig = config;

    // Step 0: Validate and sanitize configuration
    try {
      if (config !== undefined && config !== null) {
        // Validate configuration structure
        if (!this.validateConfigStructure(config)) {
          console.warn('Invalid toolbar configuration structure detected, attempting to sanitize...');
          processedConfig = this.sanitizeConfig(config);
          
          if (!processedConfig) {
            console.warn('Configuration could not be sanitized, falling back to default configuration');
            return this.createFallbackConfig();
          }
        }
      }
    } catch (error) {
      console.warn('Error validating toolbar configuration, falling back to default:', error);
      return this.createFallbackConfig();
    }

    // Generate cache key for the configuration
    const cacheKey = this.generateCacheKey(processedConfig);
    
    // Check if we have a cached result
    const cachedResult = configCache.get(cacheKey);
    if (cachedResult) {
      // Return a deep clone to prevent mutations affecting cached data
      return this.cloneResolvedConfig(cachedResult);
    }

    try {
      // Start with empty button set
      let buttons: ToolbarButtonType[] = [];

      // Step 1: Apply preset if specified
      if (processedConfig?.preset !== undefined) {
        buttons = this.applyPreset(processedConfig.preset);
      }

      // Step 2: Process includes (add to buttons)
      if (processedConfig?.include) {
        const includedButtons = this.processIncludes(processedConfig.include);
        // Merge with existing buttons, avoiding duplicates using Set for O(1) lookups
        const buttonSet = new Set([...buttons, ...includedButtons]);
        buttons = Array.from(buttonSet);
      }

      // Step 3: Process excludes (remove from buttons)
      if (processedConfig?.exclude) {
        buttons = this.processExcludes(buttons, processedConfig.exclude);
      }

      // If no configuration provided or no buttons after processing, use full preset
      if (!processedConfig || buttons.length === 0) {
        buttons = [...this.PRESETS.full]; // Create a copy to avoid mutations
      }

      // Step 4: Apply custom ordering if specified, or use groups from include
      const groups = this.applyOrder(buttons, processedConfig?.order, processedConfig?.include?.groups);

      const result: ResolvedToolbarConfig = {
        groups,
        enabledButtons: new Set(buttons)
      };

      // Cache the result
      this.cacheResult(cacheKey, result);

      return result;
    } catch (error) {
      console.warn('Error processing toolbar configuration, falling back to default:', error);
      return this.createFallbackConfig();
    }
  }

  /**
   * Creates a fallback configuration when the main configuration fails
   * @returns A safe fallback configuration
   */
  private static createFallbackConfig(): ResolvedToolbarConfig {
    return {
      groups: [{ name: 'default', buttons: [...this.PRESETS.full] }],
      enabledButtons: new Set(this.PRESETS.full)
    };
  }

  /**
   * Apply a preset configuration
   * @param preset - The preset name to apply
   * @returns Array of toolbar buttons for the preset
   */
  private static applyPreset(preset: string): ToolbarButtonType[] {
    // Validate preset is a string
    if (typeof preset !== 'string') {
      console.warn(`Preset must be a string, received ${typeof preset}, falling back to full preset`);
      return [...this.PRESETS.full];
    }

    // Trim whitespace and convert to lowercase for case-insensitive matching
    const normalizedPreset = preset.trim().toLowerCase();
    
    if (normalizedPreset === '') {
      console.warn('Empty preset name provided, falling back to full preset');
      return [...this.PRESETS.full];
    }

    const presetButtons = this.PRESETS[normalizedPreset];
    if (!presetButtons) {
      const availablePresets = Object.keys(this.PRESETS).join(', ');
      console.warn(`Invalid preset "${preset}". Available presets: ${availablePresets}. Falling back to full preset`);
      return [...this.PRESETS.full];
    }
    return [...presetButtons];
  }

  /**
   * Process include configurations to determine which buttons to include
   * @param include - The include configuration object
   * @returns Array of toolbar buttons to include
   */
  private static processIncludes(include: ToolbarConfig['include']): ToolbarButtonType[] {
    if (!include || typeof include !== 'object') {
      console.warn('Include configuration must be an object, ignoring include settings');
      return [];
    }

    // Use Set for automatic deduplication and O(1) lookups
    const buttonSet = new Set<ToolbarButtonType>();

    // Add buttons from categories
    if (include.categories) {
      if (!Array.isArray(include.categories)) {
        console.warn('Include categories must be an array, ignoring categories');
      } else {
        for (const category of include.categories) {
          if (typeof category !== 'string') {
            console.warn(`Category must be a string, received ${typeof category}, ignoring this category`);
            continue;
          }

          const normalizedCategory = category.trim() as ToolbarCategory;
          const categoryButtons = this.CATEGORY_MAPPINGS[normalizedCategory];
          if (categoryButtons) {
            // Add all category buttons to set (automatic deduplication)
            categoryButtons.forEach(button => buttonSet.add(button));
          } else {
            const availableCategories = Object.keys(this.CATEGORY_MAPPINGS).join(', ');
            console.warn(`Invalid category "${category}". Available categories: ${availableCategories}. Category ignored`);
          }
        }
      }
    }

    // Add individual buttons
    if (include.buttons) {
      if (!Array.isArray(include.buttons)) {
        console.warn('Include buttons must be an array, ignoring buttons');
      } else {
        for (const button of include.buttons) {
          if (typeof button !== 'string') {
            console.warn(`Button must be a string, received ${typeof button}, ignoring this button`);
            continue;
          }

          const normalizedButton = button.trim() as ToolbarButtonType;
          if (this.isValidButton(normalizedButton)) {
            buttonSet.add(normalizedButton);
          } else {
            const availableButtons = Array.from(this.VALID_BUTTONS).sort().join(', ');
            console.warn(`Invalid button "${button}". Available buttons: ${availableButtons}. Button ignored`);
          }
        }
      }
    }

    // Add buttons from groups
    if (include.groups) {
      if (!Array.isArray(include.groups)) {
        console.warn('Include groups must be an array, ignoring groups');
      } else {
        for (let i = 0; i < include.groups.length; i++) {
          const group = include.groups[i];
          
          if (!group || typeof group !== 'object') {
            console.warn(`Group at index ${i} must be an object, ignoring this group`);
            continue;
          }

          if (typeof group.name !== 'string') {
            console.warn(`Group at index ${i} must have a string name, ignoring this group`);
            continue;
          }

          if (!Array.isArray(group.buttons)) {
            console.warn(`Group "${group.name}" must have a buttons array, ignoring this group`);
            continue;
          }

          for (const button of group.buttons) {
            if (typeof button !== 'string') {
              console.warn(`Button in group "${group.name}" must be a string, received ${typeof button}, ignoring this button`);
              continue;
            }

            const normalizedButton = button.trim() as ToolbarButtonType;
            if (this.isValidButton(normalizedButton)) {
              buttonSet.add(normalizedButton);
            } else {
              console.warn(`Invalid button "${button}" in group "${group.name}" ignored`);
            }
          }
        }
      }
    }

    // Convert Set back to Array
    return Array.from(buttonSet);
  }

  /**
   * Generate a cache key for the given configuration
   * @param config - The toolbar configuration
   * @returns A string key for caching
   */
  private static generateCacheKey(config?: ToolbarConfig): string {
    if (!config) {
      return 'default';
    }
    
    try {
      // Safely extract and normalize configuration properties
      const safeConfig = {
        preset: typeof config.preset === 'string' ? config.preset : undefined,
        include: config.include && typeof config.include === 'object' ? {
          categories: Array.isArray(config.include.categories) 
            ? config.include.categories.filter(c => typeof c === 'string').sort()
            : undefined,
          buttons: Array.isArray(config.include.buttons)
            ? config.include.buttons.filter(b => typeof b === 'string').sort()
            : undefined,
          groups: Array.isArray(config.include.groups)
            ? config.include.groups
                .filter(g => g && typeof g === 'object' && typeof g.name === 'string' && Array.isArray(g.buttons))
                .map(g => ({
                  name: g.name,
                  buttons: g.buttons.filter(b => typeof b === 'string').sort()
                }))
                .sort((a, b) => a.name.localeCompare(b.name))
            : undefined
        } : undefined,
        exclude: config.exclude && typeof config.exclude === 'object' ? {
          categories: Array.isArray(config.exclude.categories)
            ? config.exclude.categories.filter(c => typeof c === 'string').sort()
            : undefined,
          buttons: Array.isArray(config.exclude.buttons)
            ? config.exclude.buttons.filter(b => typeof b === 'string').sort()
            : undefined
        } : undefined,
        order: Array.isArray(config.order) 
          ? config.order.map(item => {
              if (typeof item === 'string') {
                return item;
              }
              if (item && typeof item === 'object' && typeof item.name === 'string' && Array.isArray(item.buttons)) {
                return {
                  name: item.name,
                  buttons: item.buttons.filter(b => typeof b === 'string').sort()
                };
              }
              return 'invalid-order-item';
            })
          : undefined
      };

      // Create a deterministic string representation of the safe config
      return JSON.stringify(safeConfig);
    } catch (error) {
      // If cache key generation fails, use a fallback key based on timestamp
      // This ensures malformed configs don't break the system but won't be cached
      console.warn('Failed to generate cache key for toolbar configuration:', error);
      return `malformed-${Date.now()}-${Math.random()}`;
    }
  }

  /**
   * Create a deep clone of a resolved toolbar configuration
   * @param config - The configuration to clone
   * @returns A deep clone of the configuration
   */
  private static cloneResolvedConfig(config: ResolvedToolbarConfig): ResolvedToolbarConfig {
    return {
      groups: config.groups.map(group => ({
        name: group.name,
        buttons: [...group.buttons]
      })),
      enabledButtons: new Set(config.enabledButtons)
    };
  }

  /**
   * Cache a resolved configuration result
   * @param key - The cache key
   * @param result - The resolved configuration to cache
   */
  private static cacheResult(key: string, result: ResolvedToolbarConfig): void {
    // Implement LRU cache behavior - remove oldest entries if cache is full
    if (configCache.size >= MAX_CACHE_SIZE) {
      const firstKey = configCache.keys().next().value;
      if (firstKey) {
        configCache.delete(firstKey);
      }
    }
    
    // Cache a deep clone to prevent mutations affecting cached data
    configCache.set(key, this.cloneResolvedConfig(result));
  }

  /**
   * Clear the configuration cache (useful for testing or memory management)
   */
  static clearCache(): void {
    configCache.clear();
  }

  /**
   * Get cache statistics for debugging
   */
  static getCacheStats(): { size: number; maxSize: number } {
    return {
      size: configCache.size,
      maxSize: MAX_CACHE_SIZE
    };
  }

  /**
   * Process exclude configurations to remove buttons from the current set
   * @param buttons - Current array of buttons
   * @param exclude - The exclude configuration object
   * @returns Array of toolbar buttons with exclusions applied
   */
  private static processExcludes(
    buttons: ToolbarButtonType[], 
    exclude: ToolbarConfig['exclude']
  ): ToolbarButtonType[] {
    if (!exclude || typeof exclude !== 'object') {
      console.warn('Exclude configuration must be an object, ignoring exclude settings');
      return buttons;
    }

    // Use Set for O(1) lookups when filtering
    const buttonsToExclude = new Set<ToolbarButtonType>();

    // Collect buttons from categories to exclude
    if (exclude.categories) {
      if (!Array.isArray(exclude.categories)) {
        console.warn('Exclude categories must be an array, ignoring categories');
      } else {
        for (const category of exclude.categories) {
          if (typeof category !== 'string') {
            console.warn(`Exclude category must be a string, received ${typeof category}, ignoring this category`);
            continue;
          }

          const normalizedCategory = category.trim() as ToolbarCategory;
          const categoryButtons = this.CATEGORY_MAPPINGS[normalizedCategory];
          if (categoryButtons) {
            categoryButtons.forEach(button => buttonsToExclude.add(button));
          } else {
            const availableCategories = Object.keys(this.CATEGORY_MAPPINGS).join(', ');
            console.warn(`Invalid exclude category "${category}". Available categories: ${availableCategories}. Category ignored`);
          }
        }
      }
    }

    // Add individual buttons to exclude
    if (exclude.buttons) {
      if (!Array.isArray(exclude.buttons)) {
        console.warn('Exclude buttons must be an array, ignoring buttons');
      } else {
        for (const button of exclude.buttons) {
          if (typeof button !== 'string') {
            console.warn(`Exclude button must be a string, received ${typeof button}, ignoring this button`);
            continue;
          }

          const normalizedButton = button.trim() as ToolbarButtonType;
          if (this.isValidButton(normalizedButton)) {
            buttonsToExclude.add(normalizedButton);
          } else {
            const availableButtons = Array.from(this.VALID_BUTTONS).sort().join(', ');
            console.warn(`Invalid exclude button "${button}". Available buttons: ${availableButtons}. Button ignored`);
          }
        }
      }
    }

    // Filter buttons using Set for O(1) lookups instead of O(n) array includes
    return buttons.filter(button => !buttonsToExclude.has(button));
  }

  /**
   * Apply custom ordering to buttons, organizing them into groups
   * @param buttons - Array of buttons to organize
   * @param order - Optional custom ordering configuration
   * @param includeGroups - Optional groups from include configuration
   * @returns Array of toolbar groups with proper ordering
   */
  private static applyOrder(
    buttons: ToolbarButtonType[], 
    order?: (ToolbarButtonType | ToolbarGroup)[],
    includeGroups?: ToolbarGroup[]
  ): ToolbarGroup[] {
    // If we have explicit order, use it
    if (order && order.length > 0) {
      return this.processCustomOrder(buttons, order);
    }
    
    // If we have groups from include configuration, use them
    if (includeGroups && includeGroups.length > 0) {
      return this.processIncludeGroups(buttons, includeGroups);
    }
    
    // Default grouping by category
    return this.createDefaultGroups(buttons);
  }

  /**
   * Process custom order configuration
   * @param buttons - Array of buttons to organize
   * @param order - Custom ordering configuration
   * @returns Array of toolbar groups with proper ordering
   */
  private static processCustomOrder(
    buttons: ToolbarButtonType[], 
    order: (ToolbarButtonType | ToolbarGroup)[]
  ): ToolbarGroup[] {
    if (!Array.isArray(order)) {
      console.warn('Order configuration must be an array, falling back to default grouping');
      return this.createDefaultGroups(buttons);
    }

    const groups: ToolbarGroup[] = [];
    const usedButtons = new Set<ToolbarButtonType>();
    const buttonSet = new Set(buttons); // O(1) lookups for button existence

    // Process custom order
    for (let i = 0; i < order.length; i++) {
      const item = order[i];
      
      if (typeof item === 'string') {
        // Individual button
        const normalizedButton = item.trim() as ToolbarButtonType;
        
        if (buttonSet.has(normalizedButton) && this.isValidButton(normalizedButton)) {
          groups.push({ name: `group-${groups.length}`, buttons: [normalizedButton] });
          usedButtons.add(normalizedButton);
        } else if (!this.isValidButton(normalizedButton)) {
          console.warn(`Invalid button "${item}" in order configuration ignored`);
        }
        // If button is valid but not in buttonSet, it's silently ignored (not included in configuration)
      } else if (item && typeof item === 'object') {
        // Validate group object structure
        if (!('name' in item) || typeof item.name !== 'string') {
          console.warn(`Order item at index ${i} must have a string name property, ignoring this item`);
          continue;
        }

        if (!('buttons' in item) || !Array.isArray(item.buttons)) {
          console.warn(`Order item "${item.name}" at index ${i} must have a buttons array, ignoring this item`);
          continue;
        }

        // Group object - use filter with Set for O(1) lookups
        const validButtons: ToolbarButtonType[] = [];
        
        for (const button of item.buttons) {
          if (typeof button !== 'string') {
            console.warn(`Button in order group "${item.name}" must be a string, received ${typeof button}, ignoring this button`);
            continue;
          }

          const normalizedButton = button.trim() as ToolbarButtonType;
          
          if (!this.isValidButton(normalizedButton)) {
            console.warn(`Invalid button "${button}" in order group "${item.name}" ignored`);
            continue;
          }
          
          if (buttonSet.has(normalizedButton)) {
            validButtons.push(normalizedButton);
          }
          // If button is valid but not in buttonSet, it's silently ignored (not included in configuration)
        }

        if (validButtons.length > 0) {
          groups.push({ name: item.name, buttons: validButtons });
          // Add all valid buttons to used set
          validButtons.forEach(button => usedButtons.add(button));
        }
      } else {
        console.warn(`Order item at index ${i} must be a string or object, received ${typeof item}, ignoring this item`);
      }
    }

    // Add any remaining buttons that weren't included in the custom order
    const remainingButtons = buttons.filter(button => !usedButtons.has(button));
    if (remainingButtons.length > 0) {
      groups.push({ name: 'remaining', buttons: remainingButtons });
    }

    return groups;
  }

  /**
   * Process groups from include configuration
   * @param buttons - Array of buttons to organize
   * @param includeGroups - Groups from include configuration
   * @returns Array of toolbar groups with proper ordering
   */
  private static processIncludeGroups(
    buttons: ToolbarButtonType[], 
    includeGroups: ToolbarGroup[]
  ): ToolbarGroup[] {
    if (!Array.isArray(includeGroups)) {
      console.warn('Include groups must be an array, falling back to default grouping');
      return this.createDefaultGroups(buttons);
    }

    const groups: ToolbarGroup[] = [];
    const usedButtons = new Set<ToolbarButtonType>();
    const buttonSet = new Set(buttons); // O(1) lookups for button existence

    // Process each group from include configuration
    for (let i = 0; i < includeGroups.length; i++) {
      const group = includeGroups[i];
      
      if (!group || typeof group !== 'object') {
        console.warn(`Include group at index ${i} must be an object, ignoring this group`);
        continue;
      }

      if (!('name' in group) || typeof group.name !== 'string') {
        console.warn(`Include group at index ${i} must have a string name property, ignoring this group`);
        continue;
      }

      if (!('buttons' in group) || !Array.isArray(group.buttons)) {
        console.warn(`Include group "${group.name}" at index ${i} must have a buttons array, ignoring this group`);
        continue;
      }

      // Filter buttons to only include those that are valid and enabled
      const validButtons: ToolbarButtonType[] = [];
      
      for (const button of group.buttons) {
        if (typeof button !== 'string') {
          console.warn(`Button in include group "${group.name}" must be a string, received ${typeof button}, ignoring this button`);
          continue;
        }

        const normalizedButton = button.trim() as ToolbarButtonType;
        
        if (!this.isValidButton(normalizedButton)) {
          console.warn(`Invalid button "${button}" in include group "${group.name}" ignored`);
          continue;
        }
        
        if (buttonSet.has(normalizedButton)) {
          validButtons.push(normalizedButton);
        }
        // If button is valid but not in buttonSet, it's silently ignored (not included in configuration)
      }

      if (validButtons.length > 0) {
        groups.push({ name: group.name, buttons: validButtons });
        // Add all valid buttons to used set
        validButtons.forEach(button => usedButtons.add(button));
      }
    }

    // Add any remaining buttons that weren't included in the groups
    const remainingButtons = buttons.filter(button => !usedButtons.has(button));
    if (remainingButtons.length > 0) {
      groups.push({ name: 'remaining', buttons: remainingButtons });
    }

    return groups;
  }

  /**
   * Create default groups organized by category
   * @param buttons - Array of buttons to organize
   * @returns Array of toolbar groups organized by category
   */
  private static createDefaultGroups(buttons: ToolbarButtonType[]): ToolbarGroup[] {
    const groups: ToolbarGroup[] = [];
    const buttonSet = new Set(buttons); // O(1) lookups

    // Group buttons by category using Set for efficient lookups
    for (const [category, categoryButtons] of Object.entries(this.CATEGORY_MAPPINGS)) {
      const matchingButtons = categoryButtons.filter(button => buttonSet.has(button));
      if (matchingButtons.length > 0) {
        groups.push({ name: category, buttons: matchingButtons });
      }
    }

    return groups;
  }

  /**
   * Validate if a button type is valid
   * @param button - The button type to validate
   * @returns True if the button is valid
   */
  private static isValidButton(button: string): button is ToolbarButtonType {
    // Use pre-computed set for O(1) validation instead of O(n) search
    return this.VALID_BUTTONS.has(button as ToolbarButtonType);
  }
}