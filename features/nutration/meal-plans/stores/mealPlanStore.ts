import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { 
  MealPlan, 
  Meal, 
  MealPlanState, 
  AIPreferences,
  MealPlanFilters,
  MealPlanSort,
  MealPlanProgress,
  WeeklyStats,
} from '../types';
import { MealPlanService } from '../services/mealPlanService';

interface MealPlanStore extends MealPlanState {
  // Actions
  setActiveMealPlan: (mealPlan: MealPlan | null) => void;
  addMealPlan: (mealPlan: MealPlan) => void;
  updateMealPlan: (id: string, updates: Partial<MealPlan>) => void;
  deleteMealPlan: (id: string) => void;
  generateMealPlan: (preferences: AIPreferences) => Promise<void>;
  
  // UI Actions
  setSelectedDate: (date: Date) => void;
  setSelectedMealType: (type: 'breakfast' | 'lunch' | 'dinner' | 'snack' | null) => void;
  setShowMealPlanGenerator: (show: boolean) => void;
  setShowRecipeModal: (show: boolean) => void;
  setSelectedRecipe: (recipe: Meal | null) => void;
  
  // Filter and Search Actions
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (category: string | null) => void;
  setSelectedDifficulty: (difficulty: string | null) => void;
  setSelectedDuration: (duration: string | null) => void;
  setFilters: (filters: Partial<MealPlanFilters>) => void;
  setSort: (sort: MealPlanSort) => void;
  
  // Progress Actions
  updateMealPlanProgress: (progress: Partial<MealPlanProgress>) => void;
  updateWeeklyStats: (stats: Partial<WeeklyStats>) => void;
  
  // AI Preferences Actions
  updateAIPreferences: (preferences: Partial<AIPreferences>) => void;
  
  // Loading Actions
  setLoading: (loading: boolean) => void;
  setGenerating: (generating: boolean) => void;
  
  // Utility Actions
  resetFilters: () => void;
  clearSearch: () => void;
}

const initialState: MealPlanState = {
  // Current active meal plan
  activeMealPlan: null,
  
  // User's meal plans
  mealPlans: MealPlanService.DEMO_MEAL_PLANS,
  
  // Generated meal plans
  suggestedMealPlans: [],
  
  // UI State
  selectedDate: new Date(),
  selectedMealType: null,
  showMealPlanGenerator: false,
  showRecipeModal: false,
  selectedRecipe: null,
  
  // Filtering and Search
  searchQuery: '',
  selectedCategory: null,
  selectedDifficulty: null,
  selectedDuration: null,
  
  // Loading States
  isLoading: false,
  isGenerating: false,
  
  // Progress Tracking
  mealPlanProgress: {
    totalMeals: 0,
    completedMeals: 0,
    skippedMeals: 0,
    adherenceRate: 0,
    currentStreak: 0,
    longestStreak: 0,
    averageRating: 0,
    caloriesConsumed: 0,
    targetCalories: 0,
    macroProgress: {
      protein: 0,
      carbs: 0,
      fat: 0
    }
  },
  weeklyStats: {
    totalCalories: 0,
    averageCalories: 0,
    totalProtein: 0,
    totalCarbs: 0,
    totalFat: 0,
    mealVariety: 0,
    adherenceRate: 0,
    energyLevel: 0,
    satisfaction: 0
  },
  
  // AI Preferences
  aiPreferences: {
    dietaryRestrictions: [],
    allergies: [],
    preferredCuisines: ['mediterranean', 'asian', 'italian'],
    cookingSkill: 'beginner',
    availableTime: 'moderate',
    budget: 'moderate',
    mealPrepPreference: 'weekly',
    familySize: 1,
    goals: ['weight-loss', 'healthy-eating']
  }
};

export const useMealPlanStore = create<MealPlanStore>()(
  devtools(
    (set, get) => ({
      ...initialState,

      // Actions
      setActiveMealPlan: (mealPlan: MealPlan | null) => {
        set({ activeMealPlan: mealPlan });
      },

      addMealPlan: (mealPlan: MealPlan) => {
        set((state) => ({
          mealPlans: [mealPlan, ...state.mealPlans]
        }));
      },

      updateMealPlan: (id: string, updates: Partial<MealPlan>) => {
        set((state) => ({
          mealPlans: state.mealPlans.map(plan =>
            plan.id === id ? { ...plan, ...updates, updatedAt: new Date() } : plan
          ),
          activeMealPlan: state.activeMealPlan?.id === id 
            ? { ...state.activeMealPlan, ...updates, updatedAt: new Date() }
            : state.activeMealPlan
        }));
      },

      deleteMealPlan: (id: string) => {
        set((state) => ({
          mealPlans: state.mealPlans.filter(plan => plan.id !== id),
          activeMealPlan: state.activeMealPlan?.id === id ? null : state.activeMealPlan
        }));
      },

      generateMealPlan: async (preferences: AIPreferences) => {
        set({ isGenerating: true });
        
        try {
          const generatedMealPlan = await MealPlanService.generateMealPlan(preferences);
          
          set((state) => ({
            suggestedMealPlans: [generatedMealPlan, ...state.suggestedMealPlans],
            isGenerating: false
          }));
        } catch (error) {
          console.error('Failed to generate meal plan:', error);
          set({ isGenerating: false });
        }
      },

      // UI Actions
      setSelectedDate: (date: Date) => {
        set({ selectedDate: date });
      },

      setSelectedMealType: (type: 'breakfast' | 'lunch' | 'dinner' | 'snack' | null) => {
        set({ selectedMealType: type });
      },

      setShowMealPlanGenerator: (show: boolean) => {
        set({ showMealPlanGenerator: show });
      },

      setShowRecipeModal: (show: boolean) => {
        set({ showRecipeModal: show });
      },

      setSelectedRecipe: (recipe: Meal | null) => {
        set({ selectedRecipe: recipe });
      },

      // Filter and Search Actions
      setSearchQuery: (query: string) => {
        set({ searchQuery: query });
      },

      setSelectedCategory: (category: string | null) => {
        set({ selectedCategory: category });
      },

      setSelectedDifficulty: (difficulty: string | null) => {
        set({ selectedDifficulty: difficulty });
      },

      setSelectedDuration: (duration: string | null) => {
        set({ selectedDuration: duration });
      },

      setFilters: (filters: Partial<MealPlanFilters>) => {
        set((state) => ({
          // Update filters logic here if needed
        }));
      },

      setSort: (sort: MealPlanSort) => {
        set((state) => ({
          // Update sort logic here if needed
        }));
      },

      // Progress Actions
      updateMealPlanProgress: (progress: Partial<MealPlanProgress>) => {
        set((state) => ({
          mealPlanProgress: { ...state.mealPlanProgress, ...progress }
        }));
      },

      updateWeeklyStats: (stats: Partial<WeeklyStats>) => {
        set((state) => ({
          weeklyStats: { ...state.weeklyStats, ...stats }
        }));
      },

      // AI Preferences Actions
      updateAIPreferences: (preferences: Partial<AIPreferences>) => {
        set((state) => ({
          aiPreferences: { ...state.aiPreferences, ...preferences }
        }));
      },

      // Loading Actions
      setLoading: (loading: boolean) => {
        set({ isLoading: loading });
      },

      setGenerating: (generating: boolean) => {
        set({ isGenerating: generating });
      },

      // Utility Actions
      resetFilters: () => {
        set({
          searchQuery: '',
          selectedCategory: null,
          selectedDifficulty: null,
          selectedDuration: null
        });
      },

      clearSearch: () => {
        set({ searchQuery: '' });
      }
    }),
    {
      name: 'meal-plan-store',
      enabled: __DEV__
    }
  )
);

// Selector hooks - only basic selectors to prevent infinite loops
export const useMealPlans = () => useMealPlanStore((state) => state.mealPlans);
export const useActiveMealPlan = () => useMealPlanStore((state) => state.activeMealPlan);
export const useSuggestedMealPlans = () => useMealPlanStore((state) => state.suggestedMealPlans);
export const useMealPlanProgress = () => useMealPlanStore((state) => state.mealPlanProgress);
export const useWeeklyStats = () => useMealPlanStore((state) => state.weeklyStats);
export const useAIPreferences = () => useMealPlanStore((state) => state.aiPreferences); 