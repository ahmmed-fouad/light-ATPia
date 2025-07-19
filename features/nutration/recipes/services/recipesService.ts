import { Recipe, RecipesResponse } from '../types';

const BASE_URL = 'https://www.themealdb.com/api/json/v1/1/';

export class RecipesService {
  static async getRecipes(): Promise<Recipe[]> {
    try {
      const response = await fetch(`${BASE_URL}search.php?f=c`);
      const data: RecipesResponse = await response.json();
      return data.meals || [];
    } catch (error) {
      console.error('Error fetching recipes:', error);
      throw new Error('Failed to fetch recipes');
    }
  }

  static async getRecipeById(id: string): Promise<Recipe | null> {
    try {
      const response = await fetch(`${BASE_URL}lookup.php?i=${id}`);
      const data: RecipesResponse = await response.json();
      return data.meals?.[0] || null;
    } catch (error) {
      console.error('Error fetching recipe:', error);
      throw new Error('Failed to fetch recipe');
    }
  }

  static async searchRecipes(query: string): Promise<Recipe[]> {
    try {
      const response = await fetch(`${BASE_URL}search.php?s=${encodeURIComponent(query)}`);
      const data: RecipesResponse = await response.json();
      return data.meals || [];
    } catch (error) {
      console.error('Error searching recipes:', error);
      throw new Error('Failed to search recipes');
    }
  }

  static async getRecipesByCategory(category: string): Promise<Recipe[]> {
    try {
      const response = await fetch(`${BASE_URL}filter.php?c=${encodeURIComponent(category)}`);
      const data: RecipesResponse = await response.json();
      return data.meals || [];
    } catch (error) {
      console.error('Error fetching recipes by category:', error);
      throw new Error('Failed to fetch recipes by category');
    }
  }

  static async getRecipesByArea(area: string): Promise<Recipe[]> {
    try {
      const response = await fetch(`${BASE_URL}filter.php?a=${encodeURIComponent(area)}`);
      const data: RecipesResponse = await response.json();
      return data.meals || [];
    } catch (error) {
      console.error('Error fetching recipes by area:', error);
      throw new Error('Failed to fetch recipes by area');
    }
  }
} 