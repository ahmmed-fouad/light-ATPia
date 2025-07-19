import { Meal, MealsSection } from '../types/mealsTypes';

const activeMeals: Meal[] = [
  {
    id: '1',
    name: 'Breakfast',
    kcal: 631,
    image: 'https://img.icons8.com/emoji/48/000000/green-salad-emoji.png',
    isActive: true,
  },
  {
    id: '2',
    name: 'Lunch',
    kcal: 1262,
    image: 'https://img.icons8.com/emoji/48/000000/cooked-rice-emoji.png',
    isActive: true,
  },
  {
    id: '3',
    name: 'Dinner',
    kcal: 946,
    image: 'https://img.icons8.com/emoji/48/000000/stuffed-flatbread-emoji.png',
    isActive: true,
  },
];

const inactiveMeals: Meal[] = [
  {
    id: '4',
    name: 'Morning snack',
    kcal: 53,
    image: 'https://img.icons8.com/emoji/48/000000/grapes-emoji.png',
    isActive: false,
  },
  {
    id: '5',
    name: 'Afternoon snack',
    kcal: 53,
    image: 'https://img.icons8.com/emoji/48/000000/honey-pot-emoji.png',
    isActive: false,
  },
  {
    id: '6',
    name: 'Pre-workout snack',
    kcal: 53,
    image: 'https://img.icons8.com/emoji/48/000000/tomato-emoji.png',
    isActive: false,
  },
  {
    id: '7',
    name: 'Post-workout snack',
    kcal: 53,
    image: 'https://img.icons8.com/emoji/48/000000/avocado-emoji.png',
    isActive: false,
  },
  {
    id: '8',
    name: 'Bedtime snack',
    kcal: 53,
    image: 'https://img.icons8.com/emoji/48/000000/strawberry-emoji.png',
    isActive: false,
  },
];

export function getMealsSections(): MealsSection[] {
  return [
    { title: 'Active', data: activeMeals },
    { title: 'Inactive', data: inactiveMeals },
  ];
} 