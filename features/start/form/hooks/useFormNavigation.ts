import { useFormStore } from '../stores/formStore';
import type { FormStoreState } from '../stores/formStore';

export const useFormNavigation = () => {
  const step = useFormStore((s: FormStoreState) => s.step);
  const nextStep = useFormStore((s: FormStoreState) => s.nextStep);
  const prevStep = useFormStore((s: FormStoreState) => s.prevStep);
  const setStep = useFormStore((s: FormStoreState) => s.setStep);
  return { step, nextStep, prevStep, setStep };
}; 