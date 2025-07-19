export interface CalculatorForm {
  age: number;
  gender: 'male' | 'female';
  height: number; // cm
  weight: number; // kg
  activity: number;
  goal: number;
  dietaryPref: string;
  bodyFat?: number;
  waist?: number;
  hip?: number;
  meals: number;
  allergies: string;
}

export interface CalculatorResults {
  calories: number;
  protein: number; // grams
  carbs: number; // grams
  fat: number; // grams
  water: number; // liters
  bmr: number;
  tdee: number;
  macroPercentages: {
    protein: number;
    carbs: number;
    fat: number;
  };
}

export interface ActivityLevel {
  label: string;
  value: number;
  description: string;
}

export interface Goal {
  label: string;
  value: number;
  description: string;
}

export interface DietaryPreference {
  label: string;
  value: string;
  description: string;
  macroRatios: {
    protein: number;
    carbs: number;
    fat: number;
  };
}

export interface MealPlanItem {
  meal: string;
  description: string;
  icon: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export interface SuccessTip {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'nutrition' | 'lifestyle' | 'hydration' | 'exercise';
}

export interface ChartData {
  name: string;
  value: number;
  color: string;
  percentage: number;
}

export interface FormValidation {
  isValid: boolean;
  errors: Record<string, string>;
}

export interface CalculatorState {
  form: CalculatorForm;
  results: CalculatorResults | null;
  isLoading: boolean;
  showResults: boolean;
  formValidation: FormValidation;
} 