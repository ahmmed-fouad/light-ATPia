import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CalculatorForm, CalculatorResults, FormValidation, CalculatorState } from '../types';
import { CalculatorService } from '../services/calculatorService';

interface CalculatorStore extends CalculatorState {
  // Actions
  updateForm: (updates: Partial<CalculatorForm>) => void;
  resetForm: () => void;
  calculateResults: () => void;
  setShowResults: (show: boolean) => void;
  setLoading: (loading: boolean) => void;
  validateForm: () => FormValidation;
  clearResults: () => void;
}

const initialForm: CalculatorForm = {
  age: 28,
  gender: 'female',
  height: 168,
  weight: 62,
  activity: 1.375,
  goal: 0,
  dietaryPref: 'none',
  bodyFat: undefined,
  waist: undefined,
  hip: undefined,
  meals: 3,
  allergies: ''
};

const initialValidation: FormValidation = {
  isValid: false,
  errors: {}
};

export const useCalculatorStore = create<CalculatorStore>()(
  persist(
    (set, get) => ({
      // Initial state
      form: initialForm,
      results: null,
      isLoading: false,
      showResults: false,
      formValidation: initialValidation,

      // Actions
      updateForm: (updates: Partial<CalculatorForm>) => {
        set((state) => ({
          form: { ...state.form, ...updates }
        }));
      },

      resetForm: () => {
        set({
          form: initialForm,
          results: null,
          showResults: false,
          formValidation: initialValidation
        });
      },

      calculateResults: () => {
        const { form } = get();
        const validation = get().validateForm();

        if (!validation.isValid) {
          set({ formValidation: validation });
          return;
        }

        set({ isLoading: true });

        try {
          const results = CalculatorService.calculateNutritionPlan(form);
          set({
            results,
            showResults: true,
            isLoading: false,
            formValidation: { isValid: true, errors: {} }
          });
        } catch (error) {
          console.error('Calculation error:', error);
          set({
            isLoading: false,
            formValidation: {
              isValid: false,
              errors: { calculation: 'Failed to calculate results. Please check your inputs.' }
            }
          });
        }
      },

      setShowResults: (show: boolean) => {
        set({ showResults: show });
      },

      setLoading: (loading: boolean) => {
        set({ isLoading: loading });
      },

      validateForm: (): FormValidation => {
        const { form } = get();
        const errors: Record<string, string> = {};

        // Required fields validation
        if (!form.age || form.age < 10 || form.age > 100) {
          errors.age = 'Age must be between 10 and 100';
        }

        if (!form.height || form.height < 100 || form.height > 250) {
          errors.height = 'Height must be between 100 and 250 cm';
        }

        if (!form.weight || form.weight < 30 || form.weight > 250) {
          errors.weight = 'Weight must be between 30 and 250 kg';
        }

        // Optional fields validation
        if (form.bodyFat !== undefined && (form.bodyFat < 5 || form.bodyFat > 60)) {
          errors.bodyFat = 'Body fat must be between 5% and 60%';
        }

        if (form.waist !== undefined && (form.waist < 40 || form.waist > 200)) {
          errors.waist = 'Waist must be between 40 and 200 cm';
        }

        if (form.hip !== undefined && (form.hip < 40 || form.hip > 200)) {
          errors.hip = 'Hip must be between 40 and 200 cm';
        }

        if (form.meals < 1 || form.meals > 8) {
          errors.meals = 'Meals per day must be between 1 and 8';
        }

        // Activity level validation
        const validActivityLevels = CalculatorService.ACTIVITY_LEVELS.map(level => level.value);
        if (!validActivityLevels.includes(form.activity)) {
          errors.activity = 'Please select a valid activity level';
        }

        // Goal validation
        const validGoals = CalculatorService.GOALS.map(goal => goal.value);
        if (!validGoals.includes(form.goal)) {
          errors.goal = 'Please select a valid goal';
        }

        // Dietary preference validation
        const validDietaryPrefs = CalculatorService.DIETARY_PREFERENCES.map(pref => pref.value);
        if (!validDietaryPrefs.includes(form.dietaryPref)) {
          errors.dietaryPref = 'Please select a valid dietary preference';
        }

        const isValid = Object.keys(errors).length === 0;

        return {
          isValid,
          errors
        };
      },

      clearResults: () => {
        set({
          results: null,
          showResults: false
        });
      }
    }),
    {
      name: 'calculator-storage',
      partialize: (state) => ({
        form: state.form,
        results: state.results
      })
    }
  )
); 