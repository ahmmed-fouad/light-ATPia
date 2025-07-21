import { BreakfastData, BreakfastProgress, FoodItem } from '../types/breakfastTypes';

const mockProgress: BreakfastProgress = {
  targetKcal: 800,
  currentKcal: 450,
  targetProtein: 30,
  currentProtein: 18,
  targetCarbs: 80,
  currentCarbs: 45,
  targetFat: 25,
  currentFat: 15,
};

const mockFoodItems: FoodItem[] = [
  {
    id: '1',
    name: 'Oatmeal with Berries',
    kcal: 250,
    protein: 8,
    carbs: 45,
    fat: 4,
    image: 'https://img.icons8.com/emoji/48/000000/oatmeal-emoji.png',
    category: 'carbs',
  },
  {
    id: '2',
    name: 'Greek Yogurt',
    kcal: 120,
    protein: 15,
    carbs: 8,
    fat: 2,
    image: 'https://img.icons8.com/emoji/48/000000/yogurt-emoji.png',
    category: 'protein',
  },
  {
    id: '3',
    name: 'Almonds',
    kcal: 80,
    protein: 3,
    carbs: 3,
    fat: 7,
    image: 'https://img.icons8.com/emoji/48/000000/almonds-emoji.png',
    category: 'fat',
  },
];

export const getBreakfastData = (): BreakfastData => {
  return {
    progress: mockProgress,
    foodItems: mockFoodItems,
  };
};

export const addFoodItem = (item: FoodItem) => {
  // Add food item logic
  console.log('Adding food item:', item);
};

export const removeFoodItem = (itemId: string) => {
  // Remove food item logic
  console.log('Removing food item:', itemId);
}; 