import { useCallback } from 'react';
import { useCalculatorStore } from '../stores/calculatorStore';
import { CalculatorService } from '../services/calculatorService';
import { CalculatorForm, ChartData } from '../types';

export const useCalculator = () => {
  const {
    form,
    results,
    isLoading,
    showResults,
    formValidation,
    updateForm,
    resetForm,
    calculateResults,
    setShowResults,
    setLoading,
    validateForm,
    clearResults
  } = useCalculatorStore();

  // Form handling
  const handleFormChange = useCallback((field: keyof CalculatorForm, value: any) => {
    updateForm({ [field]: value });
  }, [updateForm]);

  const handleCalculate = useCallback(() => {
    calculateResults();
  }, [calculateResults]);

  const handleReset = useCallback(() => {
    resetForm();
  }, [resetForm]);

  // Validation
  const validateField = useCallback((field: keyof CalculatorForm) => {
    const validation = validateForm();
    return validation.errors[field] || '';
  }, [validateForm]);

  const isFormValid = useCallback(() => {
    const validation = validateForm();
    return validation.isValid;
  }, [validateForm]);

  // Chart data generation
  const getMacroChartData = useCallback((): ChartData[] => {
    if (!results) return [];
    return CalculatorService.generateMacroChartData(results);
  }, [results]);

  const getCalorieChartData = useCallback((): ChartData[] => {
    if (!results) return [];
    return CalculatorService.generateCalorieChartData(results);
  }, [results]);

  // Utility functions
  const formatCalories = useCallback((calories: number) => {
    return CalculatorService.formatCalories(calories);
  }, []);

  const formatMacro = useCallback((value: number, unit: string = 'g') => {
    return CalculatorService.formatMacro(value, unit);
  }, []);

  const formatWater = useCallback((water: number) => {
    return CalculatorService.formatWater(water);
  }, []);

  // Activity levels and goals
  const activityLevels = CalculatorService.ACTIVITY_LEVELS;
  const goals = CalculatorService.GOALS;
  const dietaryPreferences = CalculatorService.DIETARY_PREFERENCES;
  const sampleMealPlan = CalculatorService.SAMPLE_MEAL_PLAN;
  const successTips = CalculatorService.SUCCESS_TIPS;

  // Get current selections
  const getCurrentActivityLevel = useCallback(() => {
    return CalculatorService.getActivityLevel(form.activity);
  }, [form.activity]);

  const getCurrentGoal = useCallback(() => {
    return CalculatorService.getGoal(form.goal);
  }, [form.goal]);

  const getCurrentDietaryPreference = useCallback(() => {
    return CalculatorService.getDietaryPreference(form.dietaryPref);
  }, [form.dietaryPref]);

  // BMI calculation (if height and weight are available)
  const calculateBMI = useCallback(() => {
    if (!form.height || !form.weight) return null;
    const heightInMeters = form.height / 100;
    const bmi = form.weight / (heightInMeters * heightInMeters);
    return Math.round(bmi * 10) / 10;
  }, [form.height, form.weight]);

  // BMI category
  const getBMICategory = useCallback((bmi: number) => {
    if (bmi < 18.5) return { category: 'Underweight', color: '#F59E0B' };
    if (bmi < 25) return { category: 'Normal', color: '#10B981' };
    if (bmi < 30) return { category: 'Overweight', color: '#F59E0B' };
    return { category: 'Obese', color: '#EF4444' };
  }, []);

  // Progress indicators
  const getCalorieProgress = useCallback(() => {
    if (!results) return 0;
    // Calculate progress based on typical calorie ranges
    const minCalories = 1200;
    const maxCalories = 3000;
    const progress = Math.min(Math.max((results.calories - minCalories) / (maxCalories - minCalories), 0), 1);
    return progress;
  }, [results]);

  const getMacroProgress = useCallback((macro: 'protein' | 'carbs' | 'fat') => {
    if (!results) return 0;
    const current = results[macro];
    const total = results.protein + results.carbs + results.fat;
    return total > 0 ? current / total : 0;
  }, [results]);

  return {
    // State
    form,
    results,
    isLoading,
    showResults,
    formValidation,
    
    // Actions
    handleFormChange,
    handleCalculate,
    handleReset,
    setShowResults,
    setLoading,
    clearResults,
    
    // Validation
    validateField,
    isFormValid,
    
    // Chart data
    getMacroChartData,
    getCalorieChartData,
    
    // Formatting
    formatCalories,
    formatMacro,
    formatWater,
    
    // Data
    activityLevels,
    goals,
    dietaryPreferences,
    sampleMealPlan,
    successTips,
    
    // Current selections
    getCurrentActivityLevel,
    getCurrentGoal,
    getCurrentDietaryPreference,
    
    // Calculations
    calculateBMI,
    getBMICategory,
    getCalorieProgress,
    getMacroProgress
  };
}; 