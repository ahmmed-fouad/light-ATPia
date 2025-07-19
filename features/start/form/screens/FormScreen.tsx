import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import TrackerStep1Screen from './TrackerStep1Screen';
import TrackerStep2Screen from './TrackerStep2Screen';
import TrackerStep3Screen from './TrackerStep3Screen';
import TrackerStep4Screen from './TrackerStep4Screen';
import TrackerStep5Screen from './TrackerStep5Screen';
import TrackerStep6Screen from './TrackerStep6Screen';
import TrackerStep7Screen from './TrackerStep7Screen';
import TrackerStep8Screen from './TrackerStep8Screen';
import TrackerStep9Screen from './TrackerStep9Screen';
import { useFormStore } from '../stores/formStore';
import type { FormStoreState } from '../stores/formStore';

const FormScreen = () => {
  const step = useFormStore((s: FormStoreState) => s.step);

  // In the future, switch on step for all 9 screens
  const renderStep = () => {
    switch (step) {
      case 1:
        return <TrackerStep1Screen />;
      case 2:
        return <TrackerStep2Screen />;
      case 3:
        return <TrackerStep3Screen />;
      case 4:
        return <TrackerStep4Screen />;
      case 5:
        return <TrackerStep5Screen />;
      case 6:
        return <TrackerStep6Screen />;
      case 7:
        return <TrackerStep7Screen />;
      case 8:
        return <TrackerStep8Screen />;
      case 9:
        return <TrackerStep9Screen />;
      default:
        return <TrackerStep1Screen />;
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      {renderStep()}
    </SafeAreaView>
  );
};

export default FormScreen; 