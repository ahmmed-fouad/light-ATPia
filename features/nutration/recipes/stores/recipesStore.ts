import { create } from 'zustand';
import { Recipe, RecipesState } from '../types';
import { RecipesService } from '../services/recipesService';

interface RecipesStore extends RecipesState {
  fetchRecipes: () => Promise<void>;
  searchRecipes: (query: string) => Promise<void>;
  filterByCategory: (category: string) => Promise<void>;
  filterByArea: (area: string) => Promise<void>;
  setSelectedRecipe: (recipe: Recipe | null) => void;
  setSearchQuery: (query: string) => void;
  setFilterCategory: (category: string | null) => void;
  setFilterArea: (area: string | null) => void;
  clearFilters: () => void;
}

export const useRecipesStore = create<RecipesStore>((set, get) => ({
  recipes: [],
  selectedRecipe: null,
  isLoading: false,
  error: null,
  searchQuery: '',
  filterCategory: null,
  filterArea: null,

  fetchRecipes: async () => {
    set({ isLoading: true, error: null });
    try {
      const recipes = await RecipesService.getRecipes();
      set({ recipes, isLoading: false });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to fetch recipes', 
        isLoading: false 
      });
    }
  },

  searchRecipes: async (query: string) => {
    set({ isLoading: true, error: null });
    try {
      const recipes = await RecipesService.searchRecipes(query);
      set({ recipes, isLoading: false });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to search recipes', 
        isLoading: false 
      });
    }
  },

  filterByCategory: async (category: string) => {
    set({ isLoading: true, error: null });
    try {
      const recipes = await RecipesService.getRecipesByCategory(category);
      set({ recipes, isLoading: false });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to filter recipes', 
        isLoading: false 
      });
    }
  },

  filterByArea: async (area: string) => {
    set({ isLoading: true, error: null });
    try {
      const recipes = await RecipesService.getRecipesByArea(area);
      set({ recipes, isLoading: false });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to filter recipes', 
        isLoading: false 
      });
    }
  },

  setSelectedRecipe: (recipe: Recipe | null) => {
    set({ selectedRecipe: recipe });
  },

  setSearchQuery: (query: string) => {
    set({ searchQuery: query });
  },

  setFilterCategory: (category: string | null) => {
    set({ filterCategory: category });
  },

  setFilterArea: (area: string | null) => {
    set({ filterArea: area });
  },

  clearFilters: () => {
    set({ 
      searchQuery: '', 
      filterCategory: null, 
      filterArea: null 
    });
  },
})); 