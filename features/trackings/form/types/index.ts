export type UserFormFields = {
  name: string;
  age: string;
  gender: '' | 'male' | 'female';
  pregnant: boolean;
  pregnancyMonth: string;
  length: string;
  weight: string;
  waterPerDay: string;
  mealsPerDay: string;
  favoriteMeal: string;
  favoriteMealOther: string;
  commonMeals: string;
  commonMealsOther: string;
  favoriteFruit: string;
  favoriteFruitOther: string;
  favoriteVegetables: string;
  favoriteVegetablesOther: string;
  favoriteSport: string;
  favoriteSportOther: string;
  exerciseHoursPerDay: string;
};

export type User = {
  id: string;
  email: string;
}; 