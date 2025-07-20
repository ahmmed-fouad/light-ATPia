export type FormStep = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export interface UserFormData {
  name: string;
  goal: 'lose-weight' | 'gain-weight' | 'stay-healthy';
  gender: 'male' | 'female';
  birthDate: string; // ISO string
  height: number;
  heightUnit: 'cm' | 'ft';
  weight: number;
  weightUnit: 'kg' | 'lb';
  targetWeight: number;
  progress: 'hard' | 'medium' | 'easy';
}

export interface FormStepConfig {
  step: FormStep;
  title: string;
  subtitle?: string;
  key: keyof UserFormData;
} 