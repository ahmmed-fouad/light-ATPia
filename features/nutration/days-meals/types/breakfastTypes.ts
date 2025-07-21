export type FoodItem = {
  id: string;
  name: string;
  kcal: number;
  protein: number;
  carbs: number;
  fat: number;
  image: string;
  category: 'protein' | 'carbs' | 'fat' | 'vegetables';
};

export type BreakfastProgress = {
  targetKcal: number;
  currentKcal: number;
  targetProtein: number;
  currentProtein: number;
  targetCarbs: number;
  currentCarbs: number;
  targetFat: number;
  currentFat: number;
};

export type BreakfastData = {
  progress: BreakfastProgress;
  foodItems: FoodItem[];
}; 