import { useCallback, useMemo } from 'react';
import { 
  useMealPlanStore,
  useMealPlans,
  useActiveMealPlan,
  useSuggestedMealPlans,
  useMealPlanProgress,
  useWeeklyStats,
  useAIPreferences
} from '../stores/mealPlanStore';
import { MealPlanService } from '../services/mealPlanService';
import { 
  MealPlan, 
  Meal, 
  AIPreferences, 
  MealPlanFilters,
  MealPlanSort,
  ChartData
} from '../types';

export const useMealPlan = () => {
  // Basic state selectors - these are safe
  const mealPlans = useMealPlans();
  const activeMealPlan = useActiveMealPlan();
  const suggestedMealPlans = useSuggestedMealPlans();
  const progress = useMealPlanProgress();
  const weeklyStats = useWeeklyStats();
  const aiPreferences = useAIPreferences();

  // UI State
  const selectedDate = useMealPlanStore((state) => state.selectedDate);
  const selectedMealType = useMealPlanStore((state) => state.selectedMealType);
  const showMealPlanGenerator = useMealPlanStore((state) => state.showMealPlanGenerator);
  const showRecipeModal = useMealPlanStore((state) => state.showRecipeModal);
  const selectedRecipe = useMealPlanStore((state) => state.selectedRecipe);

  // Filter and Search State
  const searchQuery = useMealPlanStore((state) => state.searchQuery);
  const selectedCategory = useMealPlanStore((state) => state.selectedCategory);
  const selectedDifficulty = useMealPlanStore((state) => state.selectedDifficulty);
  const selectedDuration = useMealPlanStore((state) => state.selectedDuration);

  // Loading States
  const isLoading = useMealPlanStore((state) => state.isLoading);
  const isGenerating = useMealPlanStore((state) => state.isGenerating);

  // Computed values using useMemo to prevent infinite loops
  const filteredMealPlans = useMemo(() => {
    let filtered = mealPlans;

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(plan =>
        plan.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        plan.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply category filter
    if (selectedCategory) {
      filtered = filtered.filter(plan => plan.category === selectedCategory);
    }

    // Apply difficulty filter
    if (selectedDifficulty) {
      filtered = filtered.filter(plan => plan.difficulty === selectedDifficulty);
    }

    // Apply duration filter
    if (selectedDuration) {
      filtered = filtered.filter(plan => plan.duration === selectedDuration);
    }

    return filtered;
  }, [mealPlans, searchQuery, selectedCategory, selectedDifficulty, selectedDuration]);

  const chartData = useMemo(() => {
    return MealPlanService.generateChartData(mealPlans);
  }, [mealPlans]);

  const mealPlanStats = useMemo(() => {
    if (!activeMealPlan) return null;
    return MealPlanService.calculateMealPlanStats(activeMealPlan);
  }, [activeMealPlan]);

  const todayMeals = useMemo(() => {
    if (!activeMealPlan) return [];
    return activeMealPlan.meals.filter(meal => {
      // Filter meals for today (simplified logic)
      return true; // For demo, show all meals
    });
  }, [activeMealPlan]);

  const progressPercentage = useMemo(() => {
    if (progress.totalMeals === 0) return 0;
    return Math.round((progress.completedMeals / progress.totalMeals) * 100);
  }, [progress]);

  const macroProgress = useMemo(() => {
    const { targetCalories, targetMacros } = activeMealPlan || {};
    if (!targetCalories || !targetMacros) return null;

    return {
      protein: Math.round((progress.macroProgress.protein / targetMacros.protein) * 100),
      carbs: Math.round((progress.macroProgress.carbs / targetMacros.carbs) * 100),
      fat: Math.round((progress.macroProgress.fat / targetMacros.fat) * 100)
    };
  }, [activeMealPlan, progress]);

  const insights = useMemo(() => {
    return MealPlanService.generateInsights(mealPlans, progress);
  }, [mealPlans, progress]);

  // Actions with memoization
  const setActiveMealPlan = useCallback((mealPlan: MealPlan | null) => {
    useMealPlanStore.getState().setActiveMealPlan(mealPlan);
  }, []);

  const addMealPlan = useCallback((mealPlan: MealPlan) => {
    useMealPlanStore.getState().addMealPlan(mealPlan);
  }, []);

  const updateMealPlan = useCallback((id: string, updates: Partial<MealPlan>) => {
    useMealPlanStore.getState().updateMealPlan(id, updates);
  }, []);

  const deleteMealPlan = useCallback((id: string) => {
    useMealPlanStore.getState().deleteMealPlan(id);
  }, []);

  const generateMealPlan = useCallback(async (preferences: AIPreferences) => {
    await useMealPlanStore.getState().generateMealPlan(preferences);
  }, []);

  // UI Actions
  const setSelectedDate = useCallback((date: Date) => {
    useMealPlanStore.getState().setSelectedDate(date);
  }, []);

  const setSelectedMealType = useCallback((type: 'breakfast' | 'lunch' | 'dinner' | 'snack' | null) => {
    useMealPlanStore.getState().setSelectedMealType(type);
  }, []);

  const setShowMealPlanGenerator = useCallback((show: boolean) => {
    useMealPlanStore.getState().setShowMealPlanGenerator(show);
  }, []);

  const setShowRecipeModal = useCallback((show: boolean) => {
    useMealPlanStore.getState().setShowRecipeModal(show);
  }, []);

  const setSelectedRecipe = useCallback((recipe: Meal | null) => {
    useMealPlanStore.getState().setSelectedRecipe(recipe);
  }, []);

  // Filter and Search Actions
  const setSearchQuery = useCallback((query: string) => {
    useMealPlanStore.getState().setSearchQuery(query);
  }, []);

  const setSelectedCategory = useCallback((category: string | null) => {
    useMealPlanStore.getState().setSelectedCategory(category);
  }, []);

  const setSelectedDifficulty = useCallback((difficulty: string | null) => {
    useMealPlanStore.getState().setSelectedDifficulty(difficulty);
  }, []);

  const setSelectedDuration = useCallback((duration: string | null) => {
    useMealPlanStore.getState().setSelectedDuration(duration);
  }, []);

  const resetFilters = useCallback(() => {
    useMealPlanStore.getState().resetFilters();
  }, []);

  const clearSearch = useCallback(() => {
    useMealPlanStore.getState().clearSearch();
  }, []);

  // Progress Actions
  const updateMealPlanProgress = useCallback((progress: any) => {
    useMealPlanStore.getState().updateMealPlanProgress(progress);
  }, []);

  const updateWeeklyStats = useCallback((stats: any) => {
    useMealPlanStore.getState().updateWeeklyStats(stats);
  }, []);

  // AI Preferences Actions
  const updateAIPreferences = useCallback((preferences: Partial<AIPreferences>) => {
    useMealPlanStore.getState().updateAIPreferences(preferences);
  }, []);

  // Loading Actions
  const setLoading = useCallback((loading: boolean) => {
    useMealPlanStore.getState().setLoading(loading);
  }, []);

  const setGenerating = useCallback((generating: boolean) => {
    useMealPlanStore.getState().setGenerating(generating);
  }, []);

  return {
    // State
    mealPlans,
    activeMealPlan,
    suggestedMealPlans,
    progress,
    weeklyStats,
    aiPreferences,
    insights,
    selectedDate,
    selectedMealType,
    showMealPlanGenerator,
    showRecipeModal,
    selectedRecipe,
    searchQuery,
    selectedCategory,
    selectedDifficulty,
    selectedDuration,
    isLoading,
    isGenerating,

    // Computed Values
    filteredMealPlans,
    chartData,
    mealPlanStats,
    todayMeals,
    progressPercentage,
    macroProgress,

    // Actions
    setActiveMealPlan,
    addMealPlan,
    updateMealPlan,
    deleteMealPlan,
    generateMealPlan,
    setSelectedDate,
    setSelectedMealType,
    setShowMealPlanGenerator,
    setShowRecipeModal,
    setSelectedRecipe,
    setSearchQuery,
    setSelectedCategory,
    setSelectedDifficulty,
    setSelectedDuration,
    resetFilters,
    clearSearch,
    updateMealPlanProgress,
    updateWeeklyStats,
    updateAIPreferences,
    setLoading,
    setGenerating
  };
}; 