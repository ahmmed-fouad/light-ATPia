import { useState } from 'react';
import { OnboardingStep } from '../types/onboardingTypes';

const steps: OnboardingStep[] = [
  {
    title: 'Know What You Eat',
    subtitle: 'Gain insights in your nutritional habits with detailed statistics',
    illustration: 'eat',
  },
  {
    title: 'Track Your Diet',
    subtitle: 'We will help you lose weight, stay fit, or build muscle',
    illustration: 'track',
  },
  {
    title: 'Live Healty & Great',
    subtitle: 'Let’s start this journey and live healty together!',
    illustration: 'trophy',
  },
];

export default function useOnboardingSteps() {
  const [step, setStep] = useState(0);
  const next = () => setStep((s) => Math.min(s + 1, steps.length - 1));
  const prev = () => setStep((s) => Math.max(s - 1, 0));
  const reset = () => setStep(0);
  return { step, setStep, next, prev, reset, steps };
} 