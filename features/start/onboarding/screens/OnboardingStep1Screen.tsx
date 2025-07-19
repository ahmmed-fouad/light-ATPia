import React from 'react';
import { View, StyleSheet } from 'react-native';
import OnboardingHeader from '../components/OnboardingHeader';
import OnboardingCard from '../components/OnboardingCard';
import StepFooterButton from '../../../../components/StepFooterButton';
import LottieView from 'lottie-react-native';

const EatIllustration = () => (
  <LottieView
    source={require('../../../../assets/lottie/eat.json')}
    autoPlay
    loop
    style={{ width: 220, height: 220 }}
  />
);

const OnboardingStep1Screen = ({ onNext, onSkip }: { onNext: () => void, onSkip: () => void }) => (
  <View style={styles.container}>
    <OnboardingHeader onSkip={onSkip} />
    <OnboardingCard
      Illustration={<EatIllustration />}
      title="Know What You Eat"
      subtitle="Gain insights in your nutritional habits with detailed statistics"
    />
    <View style={styles.footer}>
      <StepFooterButton progress={1 / 3} onPress={onNext} />
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
  },
  footer: {
    alignItems: 'center',
    marginBottom: 32,
  },
});

export default OnboardingStep1Screen; 