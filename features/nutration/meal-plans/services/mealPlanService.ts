import { 
  MealPlan, 
  Meal, 
  Ingredient, 
  NutritionFacts, 
  AIPreferences,
  MealPlanFilters,
  MealPlanRecommendation,
  MealPlanInsight,
  ChartData
} from '../types';

export class MealPlanService {
  // Demo data for development
  static readonly DEMO_MEAL_PLANS: MealPlan[] = [
    {
      id: '1',
      name: 'Weight Loss Kickstart',
      description: 'A balanced 7-day meal plan designed for sustainable weight loss with high protein and fiber.',
      duration: '7-day',
      difficulty: 'beginner',
      category: 'weight-loss',
      targetCalories: 1800,
      targetMacros: { protein: 150, carbs: 180, fat: 60 },
      meals: [],
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date('2024-01-15'),
      isActive: true,
      aiGenerated: true,
      userRating: 4.5,
      completionRate: 85
    },
    {
      id: '2',
      name: 'Muscle Building Power',
      description: 'High-protein meal plan optimized for muscle growth and recovery.',
      duration: '14-day',
      difficulty: 'intermediate',
      category: 'muscle-gain',
      targetCalories: 2200,
      targetMacros: { protein: 180, carbs: 220, fat: 70 },
      meals: [],
      createdAt: new Date('2024-01-10'),
      updatedAt: new Date('2024-01-10'),
      isActive: false,
      aiGenerated: true,
      userRating: 4.8,
      completionRate: 92
    },
    {
      id: '3',
      name: 'Vegetarian Wellness',
      description: 'Plant-based meal plan rich in nutrients and protein from vegetarian sources.',
      duration: '7-day',
      difficulty: 'beginner',
      category: 'vegetarian',
      targetCalories: 1900,
      targetMacros: { protein: 120, carbs: 200, fat: 65 },
      meals: [],
      createdAt: new Date('2024-01-12'),
      updatedAt: new Date('2024-01-12'),
      isActive: false,
      aiGenerated: true,
      userRating: 4.2,
      completionRate: 78
    }
  ];

  static readonly DEMO_MEALS: Meal[] = [
    {
      id: '1',
      name: 'Protein Power Bowl',
      type: 'breakfast',
      time: '08:00',
      calories: 420,
      macros: { protein: 35, carbs: 45, fat: 15 },
      ingredients: [
        {
          id: '1',
          name: 'Greek Yogurt',
          amount: 200,
          unit: 'g',
          calories: 120,
          macros: { protein: 20, carbs: 8, fat: 0 },
          category: 'dairy'
        },
        {
          id: '2',
          name: 'Oats',
          amount: 50,
          unit: 'g',
          calories: 180,
          macros: { protein: 6, carbs: 30, fat: 3 },
          category: 'grains'
        },
        {
          id: '3',
          name: 'Berries',
          amount: 100,
          unit: 'g',
          calories: 60,
          macros: { protein: 1, carbs: 12, fat: 0 },
          category: 'fruits'
        },
        {
          id: '4',
          name: 'Almonds',
          amount: 30,
          unit: 'g',
          calories: 180,
          macros: { protein: 8, carbs: 6, fat: 16 },
          category: 'nuts'
        }
      ],
      instructions: [
        'Mix Greek yogurt with oats in a bowl',
        'Top with fresh berries and chopped almonds',
        'Drizzle with honey if desired',
        'Serve immediately'
      ],
      prepTime: 5,
      cookTime: 0,
      servings: 1,
      difficulty: 'easy',
      tags: ['high-protein', 'quick', 'vegetarian'],
      nutritionFacts: {
        calories: 420,
        protein: 35,
        carbs: 45,
        fat: 15,
        fiber: 8,
        sugar: 20,
        sodium: 50,
        vitamins: [
          { name: 'Vitamin C', amount: 15, unit: 'mg', dailyValue: 20 },
          { name: 'Vitamin E', amount: 8, unit: 'mg', dailyValue: 15 }
        ],
        minerals: [
          { name: 'Calcium', amount: 200, unit: 'mg', dailyValue: 20 },
          { name: 'Iron', amount: 2, unit: 'mg', dailyValue: 10 }
        ]
      },
      allergens: ['dairy', 'nuts'],
      isCustom: false,
      userRating: 4.5
    },
    {
      id: '2',
      name: 'Grilled Chicken Salad',
      type: 'lunch',
      time: '12:30',
      calories: 380,
      macros: { protein: 45, carbs: 25, fat: 12 },
      ingredients: [
        {
          id: '5',
          name: 'Chicken Breast',
          amount: 150,
          unit: 'g',
          calories: 250,
          macros: { protein: 45, carbs: 0, fat: 5 },
          category: 'protein'
        },
        {
          id: '6',
          name: 'Mixed Greens',
          amount: 100,
          unit: 'g',
          calories: 20,
          macros: { protein: 2, carbs: 4, fat: 0 },
          category: 'vegetables'
        },
        {
          id: '7',
          name: 'Cherry Tomatoes',
          amount: 50,
          unit: 'g',
          calories: 15,
          macros: { protein: 1, carbs: 3, fat: 0 },
          category: 'vegetables'
        },
        {
          id: '8',
          name: 'Olive Oil',
          amount: 10,
          unit: 'ml',
          calories: 90,
          macros: { protein: 0, carbs: 0, fat: 10 },
          category: 'oils'
        }
      ],
      instructions: [
        'Season chicken breast with herbs and spices',
        'Grill chicken for 6-8 minutes per side',
        'Chop mixed greens and tomatoes',
        'Slice grilled chicken and arrange on salad',
        'Drizzle with olive oil and lemon juice'
      ],
      prepTime: 10,
      cookTime: 15,
      servings: 1,
      difficulty: 'medium',
      tags: ['high-protein', 'low-carb', 'gluten-free'],
      nutritionFacts: {
        calories: 380,
        protein: 45,
        carbs: 25,
        fat: 12,
        fiber: 6,
        sugar: 8,
        sodium: 300,
        vitamins: [
          { name: 'Vitamin A', amount: 800, unit: 'mcg', dailyValue: 100 },
          { name: 'Vitamin C', amount: 25, unit: 'mg', dailyValue: 30 }
        ],
        minerals: [
          { name: 'Iron', amount: 3, unit: 'mg', dailyValue: 15 },
          { name: 'Zinc', amount: 2, unit: 'mg', dailyValue: 15 }
        ]
      },
      allergens: [],
      isCustom: false,
      userRating: 4.7
    }
  ];

  /**
   * Generate AI-powered meal plan recommendations
   */
  static async generateMealPlan(preferences: AIPreferences): Promise<MealPlan> {
    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const targetCalories = this.calculateTargetCalories(preferences);
    const targetMacros = this.calculateTargetMacros(targetCalories, preferences);
    
    const generatedMealPlan: MealPlan = {
      id: Date.now().toString(),
      name: this.generateMealPlanName(preferences),
      description: this.generateMealPlanDescription(preferences),
      duration: '7-day',
      difficulty: preferences.cookingSkill,
      category: this.determineCategory(preferences),
      targetCalories,
      targetMacros,
      meals: this.generateMeals(preferences, targetCalories, targetMacros),
      createdAt: new Date(),
      updatedAt: new Date(),
      isActive: true,
      aiGenerated: true,
      userRating: undefined,
      completionRate: undefined
    };
    
    return generatedMealPlan;
  }

  /**
   * Calculate target calories based on user preferences
   */
  private static calculateTargetCalories(preferences: AIPreferences): number {
    // Base calculation logic (simplified for demo)
    let baseCalories = 2000; // Default base
    
    // Adjust based on goals
    if (preferences.goals.includes('weight-loss')) {
      baseCalories -= 300;
    } else if (preferences.goals.includes('muscle-gain')) {
      baseCalories += 200;
    }
    
    // Adjust based on family size
    if (preferences.familySize > 1) {
      baseCalories += (preferences.familySize - 1) * 100;
    }
    
    return Math.round(baseCalories);
  }

  /**
   * Calculate target macros based on calories and preferences
   */
  private static calculateTargetMacros(calories: number, preferences: AIPreferences) {
    let proteinRatio = 0.25; // 25% protein
    let carbsRatio = 0.45;   // 45% carbs
    let fatRatio = 0.30;     // 30% fat
    
    // Adjust ratios based on goals
    if (preferences.goals.includes('muscle-gain')) {
      proteinRatio = 0.35;
      carbsRatio = 0.40;
      fatRatio = 0.25;
    } else if (preferences.goals.includes('weight-loss')) {
      proteinRatio = 0.30;
      carbsRatio = 0.35;
      fatRatio = 0.35;
    }
    
    return {
      protein: Math.round((calories * proteinRatio) / 4),
      carbs: Math.round((calories * carbsRatio) / 4),
      fat: Math.round((calories * fatRatio) / 9)
    };
  }

  /**
   * Generate meal plan name based on preferences
   */
  private static generateMealPlanName(preferences: AIPreferences): string {
    const goals = preferences.goals.join(' ');
    const cuisines = preferences.preferredCuisines.join(' ');
    
    if (goals.includes('weight-loss')) {
      return 'Weight Loss Journey';
    } else if (goals.includes('muscle-gain')) {
      return 'Muscle Building Power';
    } else if (cuisines.includes('mediterranean')) {
      return 'Mediterranean Wellness';
    } else {
      return 'Balanced Nutrition Plan';
    }
  }

  /**
   * Generate meal plan description
   */
  private static generateMealPlanDescription(preferences: AIPreferences): string {
    const duration = preferences.mealPrepPreference === 'weekly' ? '7-day' : 'flexible';
    const difficulty = preferences.cookingSkill;
    
    return `A ${duration} meal plan designed for ${difficulty} cooks, focusing on ${preferences.goals.join(', ')}. Features ${preferences.preferredCuisines.join(', ')} cuisine with ${preferences.availableTime} preparation time.`;
  }

  /**
   * Determine meal plan category based on preferences
   */
  private static determineCategory(preferences: AIPreferences): MealPlan['category'] {
    if (preferences.dietaryRestrictions.includes('vegetarian')) {
      return 'vegetarian';
    } else if (preferences.dietaryRestrictions.includes('vegan')) {
      return 'vegan';
    } else if (preferences.goals.includes('weight-loss')) {
      return 'weight-loss';
    } else if (preferences.goals.includes('muscle-gain')) {
      return 'muscle-gain';
    } else {
      return 'maintenance';
    }
  }

  /**
   * Generate meals for the meal plan
   */
  private static generateMeals(preferences: AIPreferences, targetCalories: number, targetMacros: any): Meal[] {
    // Simplified meal generation for demo
    const meals: Meal[] = [];
    const mealsPerDay = 4; // breakfast, lunch, dinner, snack
    const caloriesPerMeal = targetCalories / mealsPerDay;
    
    for (let i = 0; i < mealsPerDay; i++) {
      const mealType = ['breakfast', 'lunch', 'dinner', 'snack'][i] as any;
      const meal = this.DEMO_MEALS.find(m => m.type === mealType) || this.DEMO_MEALS[0];
      
      meals.push({
        ...meal,
        id: `${meal.id}-${i}`,
        calories: Math.round(caloriesPerMeal * (mealType === 'snack' ? 0.6 : 1))
      });
    }
    
    return meals;
  }

  /**
   * Filter meal plans based on criteria
   */
  static filterMealPlans(mealPlans: MealPlan[], filters: MealPlanFilters): MealPlan[] {
    return mealPlans.filter(plan => {
      if (filters.category && plan.category !== filters.category) return false;
      if (filters.difficulty && plan.difficulty !== filters.difficulty) return false;
      if (filters.duration && plan.duration !== filters.duration) return false;
      if (filters.maxCalories && plan.targetCalories > filters.maxCalories) return false;
      if (filters.minRating && (plan.userRating || 0) < filters.minRating) return false;
      
      return true;
    });
  }

  /**
   * Sort meal plans
   */
  static sortMealPlans(mealPlans: MealPlan[], sort: { field: string; order: 'asc' | 'desc' }): MealPlan[] {
    return mealPlans.sort((a, b) => {
      let aValue: any = a[sort.field as keyof MealPlan];
      let bValue: any = b[sort.field as keyof MealPlan];
      
      if (sort.field === 'rating') {
        aValue = a.userRating || 0;
        bValue = b.userRating || 0;
      }
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sort.order === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
      }
      
      if (aValue < bValue) return sort.order === 'asc' ? -1 : 1;
      if (aValue > bValue) return sort.order === 'asc' ? 1 : -1;
      return 0;
    });
  }

  /**
   * Generate chart data for meal plan analytics
   */
  static generateChartData(mealPlans: MealPlan[]): ChartData[] {
    const categoryCounts: Record<string, number> = {};
    
    mealPlans.forEach(plan => {
      categoryCounts[plan.category] = (categoryCounts[plan.category] || 0) + 1;
    });
    
    const colors = ['#10B981', '#3B82F6', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4'];
    
    return Object.entries(categoryCounts).map(([category, count], index) => ({
      name: category,
      value: count,
      color: colors[index % colors.length],
      percentage: Math.round((count / mealPlans.length) * 100)
    }));
  }

  /**
   * Generate AI insights based on user data
   */
  static generateInsights(mealPlans: MealPlan[], progress: any): MealPlanInsight[] {
    const insights: MealPlanInsight[] = [];
    
    // Example insights
    if (progress.adherenceRate < 70) {
      insights.push({
        id: '1',
        type: 'suggestion',
        title: 'Improve Meal Adherence',
        message: 'Your meal adherence rate is below target. Try meal prep on weekends to make weekday meals easier.',
        icon: '📅',
        color: '#F59E0B',
        priority: 'medium',
        actionable: true,
        actionLabel: 'View Meal Prep Guide',
        actionHandler: () => console.log('Open meal prep guide')
      });
    }
    
    if (progress.averageRating > 4.5) {
      insights.push({
        id: '2',
        type: 'achievement',
        title: 'Excellent Meal Satisfaction',
        message: 'You\'re rating meals very highly! Keep up the great work with meal variety.',
        icon: '⭐',
        color: '#10B981',
        priority: 'low',
        actionable: false
      });
    }
    
    return insights;
  }

  /**
   * Validate meal plan data
   */
  static validateMealPlan(mealPlan: Partial<MealPlan>): { isValid: boolean; errors: Record<string, string> } {
    const errors: Record<string, string> = {};
    
    if (!mealPlan.name?.trim()) {
      errors.name = 'Meal plan name is required';
    }
    
    if (!mealPlan.description?.trim()) {
      errors.description = 'Description is required';
    }
    
    if (!mealPlan.targetCalories || mealPlan.targetCalories < 800) {
      errors.targetCalories = 'Target calories must be at least 800';
    }
    
    if (!mealPlan.meals || mealPlan.meals.length === 0) {
      errors.meals = 'At least one meal is required';
    }
    
    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  }

  /**
   * Calculate meal plan statistics
   */
  static calculateMealPlanStats(mealPlan: MealPlan): any {
    const totalCalories = mealPlan.meals.reduce((sum, meal) => sum + meal.calories, 0);
    const totalProtein = mealPlan.meals.reduce((sum, meal) => sum + meal.macros.protein, 0);
    const totalCarbs = mealPlan.meals.reduce((sum, meal) => sum + meal.macros.carbs, 0);
    const totalFat = mealPlan.meals.reduce((sum, meal) => sum + meal.macros.fat, 0);
    
    return {
      totalCalories,
      totalProtein,
      totalCarbs,
      totalFat,
      averageCalories: Math.round(totalCalories / mealPlan.meals.length),
      mealVariety: new Set(mealPlan.meals.map(m => m.type)).size
    };
  }
} 