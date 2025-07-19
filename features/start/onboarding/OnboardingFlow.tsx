// import React from 'react';
import OnboardingStep1Screen from './screens/OnboardingStep1Screen';
import OnboardingStep2Screen from './screens/OnboardingStep2Screen';
import OnboardingStep3Screen from './screens/OnboardingStep3Screen';
import useOnboardingSteps from './hooks/useOnboardingSteps';
import { View } from 'react-native';

const OnboardingFlow = ({ onFinish, onLogin }: { onFinish: () => void, onLogin: () => void }) => {
  const { step, next, steps, reset } = useOnboardingSteps();

  const handleSkip = () => {
    if (onFinish) onFinish();
  };
  const handleLogin = () => {
    if (onLogin) onLogin();
  };
  const handleStart = () => {
    if (onFinish) onFinish();
  };

  return (
    <View style={{ flex: 1 }}>
      {step === 0 && (
        <OnboardingStep1Screen onNext={next} onSkip={handleSkip} />
      )}
      {step === 1 && (
        <OnboardingStep2Screen onNext={next} onSkip={handleSkip} />
      )}
      {step === 2 && (
        <OnboardingStep3Screen onStart={handleStart} onLogin={handleLogin} />
      )}
    </View>
  );
};

export default OnboardingFlow; 