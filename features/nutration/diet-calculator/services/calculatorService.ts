import { 
  CalculatorForm, 
  CalculatorResults, 
  ActivityLevel, 
  Goal, 
  DietaryPreference,
  MealPlanItem,
  SuccessTip,
  ChartData 
} from '../types';

export class CalculatorService {
  // Activity levels with descriptions
  static readonly ACTIVITY_LEVELS: ActivityLevel[] = [
    {
      label: 'Sedentary',
      value: 1.2,
      description: 'Little or no exercise, desk job'
    },
    {
      label: 'Lightly Active',
      value: 1.375,
      description: 'Light exercise 1-3 days/week'
    },
    {
      label: 'Moderately Active',
      value: 1.55,
      description: 'Moderate exercise 3-5 days/week'
    },
    {
      label: 'Very Active',
      value: 1.725,
      description: 'Hard exercise 6-7 days/week'
    },
    {
      label: 'Extra Active',
      value: 1.9,
      description: 'Very hard exercise, physical job'
    }
  ];

  // Goals with descriptions
  static readonly GOALS: Goal[] = [
    {
      label: 'Lose Weight',
      value: -500,
      description: 'Create a calorie deficit'
    },
    {
      label: 'Maintain Weight',
      value: 0,
      description: 'Maintain current weight'
    },
    {
      label: 'Gain Weight',
      value: 500,
      description: 'Create a calorie surplus'
    }
  ];

  // Dietary preferences with macro ratios
  static readonly DIETARY_PREFERENCES: DietaryPreference[] = [
    {
      label: 'None',
      value: 'none',
      description: 'Standard balanced diet',
      macroRatios: { protein: 0.3, carbs: 0.4, fat: 0.3 }
    },
    {
      label: 'Vegan',
      value: 'vegan',
      description: 'Plant-based diet',
      macroRatios: { protein: 0.25, carbs: 0.45, fat: 0.3 }
    },
    {
      label: 'Vegetarian',
      value: 'vegetarian',
      description: 'No meat, includes dairy/eggs',
      macroRatios: { protein: 0.28, carbs: 0.42, fat: 0.3 }
    },
    {
      label: 'Keto',
      value: 'keto',
      description: 'High fat, low carb',
      macroRatios: { protein: 0.2, carbs: 0.1, fat: 0.7 }
    },
    {
      label: 'Paleo',
      value: 'paleo',
      description: 'Whole foods, no processed',
      macroRatios: { protein: 0.35, carbs: 0.25, fat: 0.4 }
    },
    {
      label: 'Low-Carb',
      value: 'low_carb',
      description: 'Reduced carbohydrate intake',
      macroRatios: { protein: 0.35, carbs: 0.2, fat: 0.45 }
    },
    {
      label: 'High-Protein',
      value: 'high_protein',
      description: 'Increased protein intake',
      macroRatios: { protein: 0.4, carbs: 0.3, fat: 0.3 }
    }
  ];

  // Sample meal plan
  static readonly SAMPLE_MEAL_PLAN: MealPlanItem[] = [
    {
      meal: 'Breakfast',
      description: 'Oats with berries & nuts',
      icon: '🥣',
      calories: 350,
      protein: 12,
      carbs: 45,
      fat: 15
    },
    {
      meal: 'Lunch',
      description: 'Grilled chicken salad',
      icon: '🥗',
      calories: 450,
      protein: 35,
      carbs: 25,
      fat: 20
    },
    {
      meal: 'Snack',
      description: 'Greek yogurt & fruit',
      icon: '🍎',
      calories: 200,
      protein: 15,
      carbs: 20,
      fat: 8
    },
    {
      meal: 'Dinner',
      description: 'Salmon, quinoa, veggies',
      icon: '🍣',
      calories: 550,
      protein: 40,
      carbs: 35,
      fat: 25
    }
  ];

  // Success tips
  static readonly SUCCESS_TIPS: SuccessTip[] = [
    {
      id: 'fiber',
      title: 'Fiber Intake',
      description: 'Aim for at least 25g fiber daily for digestive health',
      icon: '🌾',
      category: 'nutrition'
    },
    {
      id: 'hydration',
      title: 'Stay Hydrated',
      description: 'Drink water throughout the day, especially during exercise',
      icon: '💧',
      category: 'hydration'
    },
    {
      id: 'protein',
      title: 'Protein Timing',
      description: 'Include a protein source in every meal for muscle support',
      icon: '🥩',
      category: 'nutrition'
    },
    {
      id: 'sugar',
      title: 'Limit Added Sugars',
      description: 'Reduce processed foods and added sugars in your diet',
      icon: '🍯',
      category: 'nutrition'
    },
    {
      id: 'sleep',
      title: 'Quality Sleep',
      description: 'Aim for 7-9 hours of sleep for optimal recovery',
      icon: '😴',
      category: 'lifestyle'
    },
    {
      id: 'exercise',
      title: 'Regular Exercise',
      description: 'Combine cardio and strength training for best results',
      icon: '💪',
      category: 'exercise'
    }
  ];

  // Chart colors
  static readonly CHART_COLORS = {
    protein: '#34D399',
    carbs: '#60A5FA',
    fat: '#FBBF24',
    calories: '#8B5CF6',
    water: '#06B6D4'
  };

  /**
   * Calculate Basal Metabolic Rate using Mifflin-St Jeor Equation
   */
  static calculateBMR(form: CalculatorForm): number {
    const { age, gender, height, weight } = form;
    
    if (gender === 'male') {
      return 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
      return 10 * weight + 6.25 * height - 5 * age - 161;
    }
  }

  /**
   * Calculate Total Daily Energy Expenditure
   */
  static calculateTDEE(bmr: number, activityLevel: number): number {
    return bmr * activityLevel;
  }

  /**
   * Calculate daily calorie needs
   */
  static calculateCalories(tdee: number, goal: number): number {
    return Math.round(tdee + goal);
  }

  /**
   * Calculate macronutrients based on dietary preference
   */
  static calculateMacros(calories: number, dietaryPref: string): {
    protein: number;
    carbs: number;
    fat: number;
    percentages: { protein: number; carbs: number; fat: number };
  } {
    const preference = this.DIETARY_PREFERENCES.find(p => p.value === dietaryPref) || this.DIETARY_PREFERENCES[0];
    const { protein: pRatio, carbs: cRatio, fat: fRatio } = preference.macroRatios;

    const protein = Math.round((calories * pRatio) / 4); // 4 calories per gram
    const carbs = Math.round((calories * cRatio) / 4); // 4 calories per gram
    const fat = Math.round((calories * fRatio) / 9); // 9 calories per gram

    return {
      protein,
      carbs,
      fat,
      percentages: {
        protein: pRatio * 100,
        carbs: cRatio * 100,
        fat: fRatio * 100
      }
    };
  }

  /**
   * Calculate water intake (35ml per kg of body weight)
   */
  static calculateWaterIntake(weight: number): number {
    return Math.round(weight * 35 / 100) / 10; // Convert to liters
  }

  /**
   * Calculate complete nutrition plan
   */
  static calculateNutritionPlan(form: CalculatorForm): CalculatorResults {
    const bmr = this.calculateBMR(form);
    const tdee = this.calculateTDEE(bmr, form.activity);
    const calories = this.calculateCalories(tdee, form.goal);
    const macros = this.calculateMacros(calories, form.dietaryPref);
    const water = this.calculateWaterIntake(form.weight);

    return {
      calories,
      protein: macros.protein,
      carbs: macros.carbs,
      fat: macros.fat,
      water,
      bmr,
      tdee,
      macroPercentages: macros.percentages
    };
  }

  /**
   * Generate chart data for macros
   */
  static generateMacroChartData(results: CalculatorResults): ChartData[] {
    return [
      {
        name: 'Protein',
        value: results.protein,
        color: this.CHART_COLORS.protein,
        percentage: results.macroPercentages.protein
      },
      {
        name: 'Carbs',
        value: results.carbs,
        color: this.CHART_COLORS.carbs,
        percentage: results.macroPercentages.carbs
      },
      {
        name: 'Fat',
        value: results.fat,
        color: this.CHART_COLORS.fat,
        percentage: results.macroPercentages.fat
      }
    ];
  }

  /**
   * Generate chart data for calories
   */
  static generateCalorieChartData(results: CalculatorResults): ChartData[] {
    return [
      {
        name: 'Daily Calories',
        value: results.calories,
        color: this.CHART_COLORS.calories,
        percentage: 100
      }
    ];
  }

  /**
   * Format calories for display
   */
  static formatCalories(calories: number): string {
    return `${calories.toLocaleString()} kcal`;
  }

  /**
   * Format macros for display
   */
  static formatMacro(value: number, unit: string = 'g'): string {
    return `${value}${unit}`;
  }

  /**
   * Format water intake for display
   */
  static formatWater(water: number): string {
    return `${water} L/day`;
  }

  /**
   * Get activity level by value
   */
  static getActivityLevel(value: number): ActivityLevel | undefined {
    return this.ACTIVITY_LEVELS.find(level => level.value === value);
  }

  /**
   * Get goal by value
   */
  static getGoal(value: number): Goal | undefined {
    return this.GOALS.find(goal => goal.value === value);
  }

  /**
   * Get dietary preference by value
   */
  static getDietaryPreference(value: string): DietaryPreference | undefined {
    return this.DIETARY_PREFERENCES.find(pref => pref.value === value);
  }
} 