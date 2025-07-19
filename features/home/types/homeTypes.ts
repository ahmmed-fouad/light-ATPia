// User profile
export interface UserProfile {
  name: string;
  avatarUrl: string;
}

// Macro summary
export interface Macro {
  label: string;
  value: number;
  unit: string;
  percent: number;
  color: string;
}

// Calorie progress
export interface CalorieProgress {
  calories: number;
  total: number;
}

// Meal
export interface Meal {
  id: string;
  type: 'breakfast' | 'lunch' | 'dinner';
  label: string;
  foods: number;
  calories: number;
  totalCalories: number;
  image: string;
}

// Water
export interface WaterData {
  consumed: number; // ml
  goal: number; // ml
}

// Activity
export interface Activity {
  id: string;
  label: string;
  calories: number;
}

export interface ActivitySummary {
  activities: Activity[];
  totalBurnt: number;
}

// Home data
export interface HomeData {
  user: UserProfile;
  date: string;
  greeting: string;
  summary: string;
  weightChange: string;
  weightChangeColor: string;
  macros: Macro[];
  calorieProgress: CalorieProgress;
  meals: Meal[];
  water: WaterData;
  activity: ActivitySummary;
} 