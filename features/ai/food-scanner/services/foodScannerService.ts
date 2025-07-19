import { FoodItem, MacroChartData, MicroChartData, ScanResult } from '../types';

export class FoodScannerService {
  // Chart data generation
  static generateMacroChartData(food: FoodItem): MacroChartData[] {
    const { protein, carbs, fat } = food.macros;
    const total = protein + carbs + fat;
    
    const colors = ['#34d399', '#60a5fa', '#fbbf24'];
    
    return [
      {
        name: 'Protein',
        value: protein,
        color: colors[0],
        percentage: Math.round((protein / total) * 100),
      },
      {
        name: 'Carbs',
        value: carbs,
        color: colors[1],
        percentage: Math.round((carbs / total) * 100),
      },
      {
        name: 'Fat',
        value: fat,
        color: colors[2],
        percentage: Math.round((fat / total) * 100),
      },
    ];
  }

  static generateMicroChartData(food: FoodItem): MicroChartData[] {
    const colors = ['#fbbf24', '#60a5fa', '#34d399', '#f87171', '#a78bfa'];
    
    return food.micros.map((micro, index) => ({
      name: micro.name,
      value: micro.value,
      color: colors[index % colors.length],
      unit: micro.unit || 'mg',
    }));
  }

  // Nutrition calculations
  static calculateTotalMacros(food: FoodItem): number {
    return food.macros.protein + food.macros.carbs + food.macros.fat;
  }

  static calculateMacroPercentages(food: FoodItem): { protein: number; carbs: number; fat: number } {
    const total = this.calculateTotalMacros(food);
    return {
      protein: Math.round((food.macros.protein / total) * 100),
      carbs: Math.round((food.macros.carbs / total) * 100),
      fat: Math.round((food.macros.fat / total) * 100),
    };
  }

  // Allergen analysis
  static hasAllergens(food: FoodItem): boolean {
    return food.allergens.length > 0;
  }

  static getHighPriorityAllergens(food: FoodItem): string[] {
    const highPriority = ['Peanuts', 'Tree Nuts', 'Milk', 'Eggs', 'Soy', 'Wheat', 'Fish', 'Shellfish'];
    return food.allergens.filter(allergen => 
      highPriority.some(priority => 
        allergen.toLowerCase().includes(priority.toLowerCase())
      )
    );
  }

  // Nutrition scoring
  static calculateNutritionScore(food: FoodItem): number {
    let score = 0;
    
    // Protein score (0-30 points)
    const proteinRatio = food.macros.protein / food.calories * 4;
    score += Math.min(proteinRatio * 100, 30);
    
    // Fiber score (0-20 points)
    const fiberMicro = food.micros.find(m => m.name.toLowerCase().includes('fiber'));
    if (fiberMicro) {
      score += Math.min(fiberMicro.value * 2, 20);
    }
    
    // Low sugar score (0-25 points)
    const sugarMicro = food.micros.find(m => m.name.toLowerCase().includes('sugar'));
    if (!sugarMicro || sugarMicro.value < 10) {
      score += 25;
    } else {
      score += Math.max(25 - sugarMicro.value * 2, 0);
    }
    
    // Vitamin/mineral score (0-25 points)
    const vitaminCount = food.micros.filter(m => 
      m.name.toLowerCase().includes('vitamin') || 
      m.name.toLowerCase().includes('mineral')
    ).length;
    score += Math.min(vitaminCount * 5, 25);
    
    return Math.round(score);
  }

  // Formatting utilities
  static formatCalories(calories: number): string {
    return `${calories} kcal`;
  }

  static formatMacro(macro: number, unit: string = 'g'): string {
    return `${macro}${unit}`;
  }

  static formatServing(serving: string): string {
    return serving;
  }

  static formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  // Confidence scoring
  static calculateConfidence(food: FoodItem, scanMethod: string): number {
    let confidence = 70; // Base confidence
    
    // Higher confidence for barcode scans
    if (scanMethod === 'barcode') {
      confidence += 20;
    }
    
    // Higher confidence for foods with complete data
    if (food.micros.length >= 4) {
      confidence += 5;
    }
    
    if (food.ingredients.length >= 3) {
      confidence += 5;
    }
    
    return Math.min(confidence, 100);
  }

  // Search and filtering
  static searchFoods(foods: FoodItem[], query: string): FoodItem[] {
    const lowercaseQuery = query.toLowerCase();
    return foods.filter(food => 
      food.name.toLowerCase().includes(lowercaseQuery) ||
      food.ingredients.some(ingredient => 
        ingredient.toLowerCase().includes(lowercaseQuery)
      )
    );
  }

  static filterByAllergens(foods: FoodItem[], allergens: string[]): FoodItem[] {
    if (allergens.length === 0) return foods;
    
    return foods.filter(food => 
      !food.allergens.some(allergen => 
        allergens.some(filterAllergen => 
          allergen.toLowerCase().includes(filterAllergen.toLowerCase())
        )
      )
    );
  }

  // Mock API functions (replace with real API calls)
  static async scanImageAPI(imageUri: string): Promise<ScanResult> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock response - replace with actual API call
    return {
      success: true,
      food: {
        id: Date.now().toString(),
        name: 'Scanned Food Item',
        serving: '1 serving',
        calories: 200,
        macros: { protein: 15, carbs: 25, fat: 8 },
        micros: [
          { name: 'Fiber', value: 3, unit: 'g' },
          { name: 'Vitamin C', value: 15, unit: 'mg' },
        ],
        ingredients: ['Unknown ingredients'],
        allergens: [],
        imageUrl: imageUri,
        scannedAt: new Date().toISOString(),
      },
      confidence: 75,
    };
  }

  static async scanBarcodeAPI(barcode: string): Promise<ScanResult> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Mock response - replace with actual API call
    return {
      success: true,
      food: {
        id: Date.now().toString(),
        name: 'Barcode Product',
        serving: '1 unit',
        calories: 150,
        macros: { protein: 10, carbs: 20, fat: 5 },
        micros: [
          { name: 'Sodium', value: 200, unit: 'mg' },
          { name: 'Sugar', value: 8, unit: 'g' },
        ],
        ingredients: ['Product ingredients'],
        allergens: [],
        barcode: barcode,
        scannedAt: new Date().toISOString(),
      },
      confidence: 90,
    };
  }
} 