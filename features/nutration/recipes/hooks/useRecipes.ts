import { useEffect, useState } from 'react';
import { useRecipesStore } from '../stores/recipesStore';
import { Recipe, NutritionData } from '../types';

export const useRecipes = () => {
  const store = useRecipesStore();
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    store.fetchRecipes();
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim()) {
      store.searchRecipes(query);
    } else {
      store.fetchRecipes();
    }
  };

  const handleFilterByCategory = (category: string) => {
    store.filterByCategory(category);
  };

  const handleFilterByArea = (area: string) => {
    store.filterByArea(area);
  };

  const handleSelectRecipe = (recipe: Recipe) => {
    store.setSelectedRecipe(recipe);
  };

  const handleCloseModal = () => {
    store.setSelectedRecipe(null);
  };

  const getNutritionData = (recipe: Recipe): NutritionData[] => {
    // Generate dummy nutrition data similar to web app
    const colors = ['#34d399', '#60a5fa', '#fbbf24', '#f87171'];
    return [
      { name: 'Protein', value: Math.floor(Math.random() * 20) + 10, color: colors[0] },
      { name: 'Carbs', value: Math.floor(Math.random() * 40) + 30, color: colors[1] },
      { name: 'Fat', value: Math.floor(Math.random() * 15) + 5, color: colors[2] },
      { name: 'Fiber', value: Math.floor(Math.random() * 10) + 2, color: colors[3] },
    ];
  };

  const getIngredients = (recipe: Recipe) => {
    const ingredients: { ingredient: string; measure: string }[] = [];
    
    for (let i = 1; i <= 20; i++) {
      const ingredient = recipe[`strIngredient${i}` as keyof Recipe] as string;
      const measure = recipe[`strMeasure${i}` as keyof Recipe] as string;
      
      if (ingredient && ingredient.trim()) {
        ingredients.push({
          ingredient: ingredient.trim(),
          measure: measure ? measure.trim() : ''
        });
      }
    }
    
    return ingredients;
  };

  const getTags = (recipe: Recipe) => {
    if (!recipe.strTags) return [];
    return recipe.strTags.split(',').map(tag => tag.trim()).filter(tag => tag);
  };

  return {
    recipes: store.recipes,
    selectedRecipe: store.selectedRecipe,
    isLoading: store.isLoading,
    error: store.error,
    searchQuery,
    handleSearch,
    handleFilterByCategory,
    handleFilterByArea,
    handleSelectRecipe,
    handleCloseModal,
    getNutritionData,
    getIngredients,
    getTags,
  };
}; 