import { 
  GroceryItem, 
  Category, 
  Template, 
  SmartSuggestion,
  ChartData,
  ListStats,
  AddItemForm
} from '../types';

export class GroceryService {
  // Categories with icons and descriptions
  static readonly CATEGORIES: Category[] = [
    {
      name: 'Produce',
      color: '#34D399',
      icon: '🥬',
      description: 'Fresh fruits and vegetables'
    },
    {
      name: 'Dairy',
      color: '#60A5FA',
      icon: '🥛',
      description: 'Milk, cheese, yogurt, and eggs'
    },
    {
      name: 'Protein',
      color: '#FBBF24',
      icon: '🥩',
      description: 'Meat, fish, poultry, and legumes'
    },
    {
      name: 'Grains',
      color: '#A78BFA',
      icon: '🌾',
      description: 'Bread, rice, pasta, and cereals'
    },
    {
      name: 'Snacks',
      color: '#F87171',
      icon: '🍿',
      description: 'Snacks, chips, and treats'
    },
    {
      name: 'Other',
      color: '#A3A3A3',
      icon: '🛒',
      description: 'Miscellaneous items'
    }
  ];

  // Predefined templates
  static readonly TEMPLATES: Template[] = [
    {
      id: 'weekly-basics',
      name: 'Weekly Basics',
      items: ['Eggs', 'Spinach', 'Brown Rice', 'Greek Yogurt', 'Bananas', 'Chicken Breast'],
      description: 'Essential items for a healthy week',
      category: 'weekly'
    },
    {
      id: 'meal-prep-week',
      name: 'Meal Prep Week',
      items: ['Chicken Breast', 'Quinoa', 'Broccoli', 'Sweet Potatoes', 'Almonds', 'Avocado'],
      description: 'Items for meal preparation',
      category: 'weekly'
    },
    {
      id: 'vegetarian-week',
      name: 'Vegetarian Week',
      items: ['Tofu', 'Lentils', 'Spinach', 'Quinoa', 'Nuts', 'Fruits'],
      description: 'Plant-based essentials',
      category: 'weekly'
    },
    {
      id: 'budget-friendly',
      name: 'Budget Friendly',
      items: ['Rice', 'Beans', 'Potatoes', 'Carrots', 'Eggs', 'Oats'],
      description: 'Affordable grocery options',
      category: 'weekly'
    }
  ];

  // Smart suggestions based on frequency
  static readonly SMART_SUGGESTIONS: SmartSuggestion[] = [
    { id: 'bananas', name: 'Bananas', category: 'Produce', frequency: 0.8 },
    { id: 'eggs', name: 'Eggs', category: 'Dairy', frequency: 0.9 },
    { id: 'milk', name: 'Milk', category: 'Dairy', frequency: 0.7 },
    { id: 'bread', name: 'Bread', category: 'Grains', frequency: 0.6 },
    { id: 'chicken', name: 'Chicken Breast', category: 'Protein', frequency: 0.8 },
    { id: 'spinach', name: 'Spinach', category: 'Produce', frequency: 0.7 },
    { id: 'yogurt', name: 'Greek Yogurt', category: 'Dairy', frequency: 0.6 },
    { id: 'rice', name: 'Brown Rice', category: 'Grains', frequency: 0.5 },
    { id: 'apples', name: 'Apples', category: 'Produce', frequency: 0.6 },
    { id: 'almonds', name: 'Almonds', category: 'Snacks', frequency: 0.4 }
  ];

  // Demo items for initial state
  static readonly DEMO_ITEMS: GroceryItem[] = [
    {
      id: 1,
      name: 'Spinach',
      qty: '2 bags',
      category: 'Produce',
      bought: false,
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date('2024-01-15')
    },
    {
      id: 2,
      name: 'Eggs',
      qty: '1 dozen',
      category: 'Protein',
      bought: true,
      createdAt: new Date('2024-01-14'),
      updatedAt: new Date('2024-01-16')
    },
    {
      id: 3,
      name: 'Greek Yogurt',
      qty: '2 cups',
      category: 'Dairy',
      bought: false,
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date('2024-01-15')
    },
    {
      id: 4,
      name: 'Brown Rice',
      qty: '1kg',
      category: 'Grains',
      bought: false,
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date('2024-01-15')
    },
    {
      id: 5,
      name: 'Almonds',
      qty: '200g',
      category: 'Snacks',
      bought: false,
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date('2024-01-15')
    },
    {
      id: 6,
      name: 'Avocado',
      qty: '3',
      category: 'Produce',
      bought: true,
      createdAt: new Date('2024-01-13'),
      updatedAt: new Date('2024-01-16')
    }
  ];

  /**
   * Create a new grocery item
   */
  static createItem(form: AddItemForm): GroceryItem {
    return {
      id: Date.now(),
      name: form.name.trim(),
      qty: form.qty.trim(),
      category: form.category,
      bought: false,
      createdAt: new Date(),
      updatedAt: new Date()
    };
  }

  /**
   * Update an existing grocery item
   */
  static updateItem(item: GroceryItem, updates: Partial<GroceryItem>): GroceryItem {
    return {
      ...item,
      ...updates,
      updatedAt: new Date()
    };
  }

  /**
   * Toggle the bought status of an item
   */
  static toggleBought(item: GroceryItem): GroceryItem {
    return this.updateItem(item, { bought: !item.bought });
  }

  /**
   * Delete an item from the list
   */
  static deleteItem(items: GroceryItem[], itemId: number): GroceryItem[] {
    return items.filter(item => item.id !== itemId);
  }

  /**
   * Add multiple items from a template
   */
  static addItemsFromTemplate(template: Template): GroceryItem[] {
    return template.items.map((itemName, index) => ({
      id: Date.now() + index,
      name: itemName,
      qty: '1',
      category: this.getCategoryForItem(itemName),
      bought: false,
      createdAt: new Date(),
      updatedAt: new Date()
    }));
  }

  /**
   * Get category for an item based on smart matching
   */
  static getCategoryForItem(itemName: string): string {
    const item = itemName.toLowerCase();
    
    if (['banana', 'apple', 'orange', 'spinach', 'broccoli', 'carrot', 'tomato'].includes(item)) {
      return 'Produce';
    }
    if (['milk', 'cheese', 'yogurt', 'egg', 'eggs', 'butter'].includes(item)) {
      return 'Dairy';
    }
    if (['chicken', 'beef', 'pork', 'fish', 'tofu', 'bean', 'lentil'].includes(item)) {
      return 'Protein';
    }
    if (['rice', 'bread', 'pasta', 'oat', 'quinoa', 'cereal'].includes(item)) {
      return 'Grains';
    }
    if (['chip', 'cracker', 'nut', 'almond', 'popcorn', 'cookie'].includes(item)) {
      return 'Snacks';
    }
    
    return 'Other';
  }

  /**
   * Filter items based on criteria
   */
  static filterItems(
    items: GroceryItem[], 
    filters: { category?: string; bought?: boolean; search?: string }
  ): GroceryItem[] {
    return items.filter(item => {
      if (filters.category && item.category !== filters.category) return false;
      if (filters.bought !== undefined && item.bought !== filters.bought) return false;
      if (filters.search && !item.name.toLowerCase().includes(filters.search.toLowerCase())) return false;
      return true;
    });
  }

  /**
   * Sort items by field and order
   */
  static sortItems(
    items: GroceryItem[], 
    field: keyof GroceryItem, 
    order: 'asc' | 'desc'
  ): GroceryItem[] {
    return [...items].sort((a, b) => {
      const aValue = a[field];
      const bValue = b[field];
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return order === 'asc' 
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }
      
      if (aValue < bValue) return order === 'asc' ? -1 : 1;
      if (aValue > bValue) return order === 'asc' ? 1 : -1;
      return 0;
    });
  }

  /**
   * Generate chart data for categories
   */
  static generateCategoryChartData(items: GroceryItem[]): ChartData[] {
    const categoryCounts: Record<string, number> = {};
    
    items.forEach(item => {
      categoryCounts[item.category] = (categoryCounts[item.category] || 0) + 1;
    });

    const total = items.length;
    
    return Object.entries(categoryCounts).map(([category, count]) => {
      const categoryInfo = this.CATEGORIES.find(cat => cat.name === category);
      return {
        name: category,
        value: count,
        color: categoryInfo?.color || '#A3A3A3',
        percentage: total > 0 ? Math.round((count / total) * 100) : 0
      };
    });
  }

  /**
   * Calculate list statistics
   */
  static calculateStats(items: GroceryItem[]): ListStats {
    const totalItems = items.length;
    const boughtItems = items.filter(item => item.bought).length;
    const remainingItems = totalItems - boughtItems;
    
    const categoriesCount: Record<string, number> = {};
    items.forEach(item => {
      categoriesCount[item.category] = (categoriesCount[item.category] || 0) + 1;
    });

    // Rough cost estimation (this would be more sophisticated in a real app)
    const totalEstimatedCost = items.length * 3.50; // Average $3.50 per item

    return {
      totalItems,
      boughtItems,
      remainingItems,
      categoriesCount,
      totalEstimatedCost
    };
  }

  /**
   * Get smart suggestions based on frequency and recent additions
   */
  static getSmartSuggestions(items: GroceryItem[], limit: number = 6): SmartSuggestion[] {
    // Sort by frequency and filter out items already in the list
    const existingItems = items.map(item => item.name.toLowerCase());
    
    return this.SMART_SUGGESTIONS
      .filter(suggestion => !existingItems.includes(suggestion.name.toLowerCase()))
      .sort((a, b) => b.frequency - a.frequency)
      .slice(0, limit);
  }

  /**
   * Export list to text format
   */
  static exportToText(items: GroceryItem[], notes: string): string {
    const categories = this.CATEGORIES;
    let exportText = 'GROCERY LIST\n\n';
    
    categories.forEach(category => {
      const categoryItems = items.filter(item => item.category === category.name);
      if (categoryItems.length > 0) {
        exportText += `${category.name.toUpperCase()}:\n`;
        categoryItems.forEach(item => {
          const status = item.bought ? '✓' : '□';
          exportText += `  ${status} ${item.name} (${item.qty})\n`;
        });
        exportText += '\n';
      }
    });
    
    if (notes.trim()) {
      exportText += `NOTES:\n${notes}\n`;
    }
    
    return exportText;
  }

  /**
   * Get category by name
   */
  static getCategoryByName(name: string): Category | undefined {
    return this.CATEGORIES.find(cat => cat.name === name);
  }

  /**
   * Get template by ID
   */
  static getTemplateById(id: string): Template | undefined {
    return this.TEMPLATES.find(template => template.id === id);
  }

  /**
   * Format item name for display
   */
  static formatItemName(name: string): string {
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  }

  /**
   * Validate item form
   */
  static validateItemForm(form: AddItemForm): { isValid: boolean; errors: Record<string, string> } {
    const errors: Record<string, string> = {};
    
    if (!form.name.trim()) {
      errors.name = 'Item name is required';
    }
    
    if (!form.qty.trim()) {
      errors.qty = 'Quantity is required';
    }
    
    if (!form.category) {
      errors.category = 'Category is required';
    }
    
    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  }
} 