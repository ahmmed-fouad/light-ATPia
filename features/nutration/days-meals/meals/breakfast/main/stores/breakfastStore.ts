import { create } from 'zustand';
import { BreakfastData, FoodItem } from '../types/breakfastTypes';
import { getBreakfastData, addFoodItem as addItem, removeFoodItem as removeItem } from '../services/breakfastService';

interface BreakfastStore {
  data: BreakfastData;
  addFoodItem: (item: FoodItem) => void;
  removeFoodItem: (itemId: string) => void;
  updateProgress: () => void;
}

export const useBreakfastStore = create<BreakfastStore>((set, get) => ({
  data: getBreakfastData(),
  
  addFoodItem: (item: FoodItem) => {
    set((state) => {
      const newFoodItems = [...state.data.foodItems, item];
      const newProgress = {
        ...state.data.progress,
        currentKcal: state.data.progress.currentKcal + item.kcal,
        currentProtein: state.data.progress.currentProtein + item.protein,
        currentCarbs: state.data.progress.currentCarbs + item.carbs,
        currentFat: state.data.progress.currentFat + item.fat,
      };
      
      return {
        data: {
          ...state.data,
          foodItems: newFoodItems,
          progress: newProgress,
        },
      };
    });
    addItem(item);
  },
  
  removeFoodItem: (itemId: string) => {
    set((state) => {
      const itemToRemove = state.data.foodItems.find(item => item.id === itemId);
      if (!itemToRemove) return state;
      
      const newFoodItems = state.data.foodItems.filter(item => item.id !== itemId);
      const newProgress = {
        ...state.data.progress,
        currentKcal: state.data.progress.currentKcal - itemToRemove.kcal,
        currentProtein: state.data.progress.currentProtein - itemToRemove.protein,
        currentCarbs: state.data.progress.currentCarbs - itemToRemove.carbs,
        currentFat: state.data.progress.currentFat - itemToRemove.fat,
      };
      
      return {
        data: {
          ...state.data,
          foodItems: newFoodItems,
          progress: newProgress,
        },
      };
    });
    removeItem(itemId);
  },
  
  updateProgress: () => {
    // Update progress based on current food items
    set((state) => {
      const totalKcal = state.data.foodItems.reduce((sum, item) => sum + item.kcal, 0);
      const totalProtein = state.data.foodItems.reduce((sum, item) => sum + item.protein, 0);
      const totalCarbs = state.data.foodItems.reduce((sum, item) => sum + item.carbs, 0);
      const totalFat = state.data.foodItems.reduce((sum, item) => sum + item.fat, 0);
      
      return {
        data: {
          ...state.data,
          progress: {
            ...state.data.progress,
            currentKcal: totalKcal,
            currentProtein: totalProtein,
            currentCarbs: totalCarbs,
            currentFat: totalFat,
          },
        },
      };
    });
  },
})); 