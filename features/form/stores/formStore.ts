import { create } from 'zustand';
import { UserFormData, FormStep } from '../types/formTypes';

interface FormStoreState {
  step: FormStep;
  data: Partial<UserFormData>;
  setStep: (step: FormStep) => void;
  nextStep: () => void;
  prevStep: () => void;
  setData: (data: Partial<UserFormData>) => void;
  reset: () => void;
}

export type { FormStoreState };

export const useFormStore = create<FormStoreState>((set, get) => ({
  step: 1,
  data: {},
  setStep: (step) => set({ step }),
  nextStep: () => set((state) => ({ step: (state.step < 9 ? (state.step + 1) as FormStep : state.step) })),
  prevStep: () => set((state) => ({ step: (state.step > 1 ? (state.step - 1) as FormStep : state.step) })),
  setData: (data) => set((state) => ({ data: { ...state.data, ...data } })),
  reset: () => set({ step: 1, data: {} }),
})); 