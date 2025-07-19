export interface MealPlan {
  id: string;
  name: string;
  description: string;
  duration: '1-day' | '3-day' | '7-day' | '14-day' | '30-day';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category: 'weight-loss' | 'muscle-gain' | 'maintenance' | 'vegetarian' | 'vegan' | 'keto' | 'paleo';
  targetCalories: number;
  targetMacros: {
    protein: number;
    carbs: number;
    fat: number;
  };
  meals: Meal[];
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
  aiGenerated: boolean;
  userRating?: number;
  completionRate?: number;
}

export interface Meal {
  id: string;
  name: string;
  type: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  time: string; // HH:MM format
  calories: number;
  macros: {
    protein: number;
    carbs: number;
    fat: number;
  };
  ingredients: Ingredient[];
  instructions: string[];
  prepTime: number; // in minutes
  cookTime: number; // in minutes
  servings: number;
  difficulty: 'easy' | 'medium' | 'hard';
  tags: string[];
  imageUrl?: string;
  nutritionFacts: NutritionFacts;
  allergens: string[];
  isCustom: boolean;
  userRating?: number;
}

export interface Ingredient {
  id: string;
  name: string;
  amount: number;
  unit: string;
  calories: number;
  macros: {
    protein: number;
    carbs: number;
    fat: number;
  };
  category: string;
  isOrganic?: boolean;
  isSeasonal?: boolean;
}

export interface NutritionFacts {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  sugar: number;
  sodium: number;
  vitamins: VitaminInfo[];
  minerals: MineralInfo[];
}

export interface VitaminInfo {
  name: string;
  amount: number;
  unit: string;
  dailyValue: number;
}

export interface MineralInfo {
  name: string;
  amount: number;
  unit: string;
  dailyValue: number;
}

export interface MealPlanState {
  // Current active meal plan
  activeMealPlan: MealPlan | null;
  
  // User's meal plans
  mealPlans: MealPlan[];
  
  // Generated meal plans
  suggestedMealPlans: MealPlan[];
  
  // UI State
  selectedDate: Date;
  selectedMealType: 'breakfast' | 'lunch' | 'dinner' | 'snack' | null;
  showMealPlanGenerator: boolean;
  showRecipeModal: boolean;
  selectedRecipe: Meal | null;
  
  // Filtering and Search
  searchQuery: string;
  selectedCategory: string | null;
  selectedDifficulty: string | null;
  selectedDuration: string | null;
  
  // Loading States
  isLoading: boolean;
  isGenerating: boolean;
  
  // Progress Tracking
  mealPlanProgress: MealPlanProgress;
  weeklyStats: WeeklyStats;
  
  // AI Preferences
  aiPreferences: AIPreferences;
}

export interface MealPlanProgress {
  totalMeals: number;
  completedMeals: number;
  skippedMeals: number;
  adherenceRate: number;
  currentStreak: number;
  longestStreak: number;
  averageRating: number;
  caloriesConsumed: number;
  targetCalories: number;
  macroProgress: {
    protein: number;
    carbs: number;
    fat: number;
  };
}

export interface WeeklyStats {
  totalCalories: number;
  averageCalories: number;
  totalProtein: number;
  totalCarbs: number;
  totalFat: number;
  mealVariety: number;
  adherenceRate: number;
  weightChange?: number;
  energyLevel: number;
  satisfaction: number;
}

export interface AIPreferences {
  dietaryRestrictions: string[];
  allergies: string[];
  preferredCuisines: string[];
  cookingSkill: 'beginner' | 'intermediate' | 'advanced';
  availableTime: 'quick' | 'moderate' | 'extensive';
  budget: 'budget-friendly' | 'moderate' | 'premium';
  mealPrepPreference: 'daily' | 'weekly' | 'flexible';
  familySize: number;
  goals: string[];
}

export interface MealPlanFilters {
  category: string | null;
  difficulty: string | null;
  duration: string | null;
  maxCalories: number | null;
  minRating: number | null;
  includeIngredients: string[];
  excludeIngredients: string[];
  maxPrepTime: number | null;
  maxCookTime: number | null;
}

export interface MealPlanSort {
  field: 'name' | 'rating' | 'calories' | 'duration' | 'createdAt';
  order: 'asc' | 'desc';
}

export interface ChartData {
  name: string;
  value: number;
  color: string;
  percentage?: number;
}

export interface MealPlanInsight {
  id: string;
  type: 'nutrition' | 'progress' | 'suggestion' | 'achievement';
  title: string;
  message: string;
  icon: string;
  color: string;
  priority: 'low' | 'medium' | 'high';
  actionable: boolean;
  actionLabel?: string;
  actionHandler?: () => void;
}

export interface MealPlanRecommendation {
  id: string;
  title: string;
  description: string;
  reason: string;
  confidence: number;
  mealPlan: MealPlan;
  benefits: string[];
  estimatedResults: {
    weightChange?: number;
    energyImprovement?: number;
    adherenceRate?: number;
  };
} 