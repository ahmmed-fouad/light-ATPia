export type Meal = {
  id: string;
  name: string;
  kcal: number;
  image: string; // image URI or local asset
  isActive: boolean;
};

export type MealsSection = {
  title: string;
  data: Meal[];
}; 