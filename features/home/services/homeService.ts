import type { HomeData } from '../types/homeTypes';

export async function getHomeData(): Promise<HomeData> {
  // Mock data based on Figma
  return {
    user: {
      name: 'Jane Doe',
      avatarUrl: 'https://randomuser.me/api/portraits/women/44.jpg',
    },
    date: 'March 28 2022',
    greeting: 'Good Morning ☀️',
    summary: 'You’ve gained',
    weightChange: '+2kg',
    weightChangeColor: '#22C55E',
    macros: [
      { label: 'Total carbs', value: 134, unit: 'g', percent: 28, color: '#F472B6' },
      { label: 'Total fat', value: 94, unit: 'g', percent: 81, color: '#FBBF24' },
    ],
    calorieProgress: {
      calories: 1739,
      total: 2925,
    },
    meals: [
      {
        id: 'breakfast',
        type: 'breakfast',
        label: 'Breakfast',
        foods: 3,
        calories: 582,
        totalCalories: 631,
        image: 'https://img.icons8.com/color/96/000000/salad.png',
      },
      {
        id: 'lunch',
        type: 'lunch',
        label: 'Lunch',
        foods: 3,
        calories: 1157,
        totalCalories: 1262,
        image: 'https://img.icons8.com/color/96/000000/rice-bowl.png',
      },
      {
        id: 'dinner',
        type: 'dinner',
        label: 'Dinner',
        foods: 0,
        calories: 0,
        totalCalories: 946,
        image: 'https://img.icons8.com/color/96/000000/vegetarian-food.png',
      },
    ],
    water: {
      consumed: 570,
      goal: 2000,
    },
    activity: {
      activities: [
        { id: '1', label: 'Running', calories: 300 },
        { id: '2', label: 'Cycling', calories: 245 },
      ],
      totalBurnt: 545,
    },
  };
} 