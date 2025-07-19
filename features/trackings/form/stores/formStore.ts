import { create } from 'zustand';
import type { UserFormFields } from '../types/index';

export const useFormStore = create<{ userForm: UserFormFields; setUserForm: (form: UserFormFields) => void }>((set) => ({
  userForm: {
    name: '',
    age: '',
    gender: '',
    pregnant: false,
    pregnancyMonth: '',
    length: '',
    weight: '',
    waterPerDay: '',
    mealsPerDay: '',
    favoriteMeal: '',
    favoriteMealOther: '',
    commonMeals: '',
    commonMealsOther: '',
    favoriteFruit: '',
    favoriteFruitOther: '',
    favoriteVegetables: '',
    favoriteVegetablesOther: '',
    favoriteSport: '',
    favoriteSportOther: '',
    exerciseHoursPerDay: '',
  },
  setUserForm: (userForm) => set({ userForm }),
})); 