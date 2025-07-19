import React from 'react';
import { View, StyleSheet } from 'react-native';
import OnboardingHeader from '../components/OnboardingHeader';
import OnboardingCard from '../components/OnboardingCard';
import StepFooterButton from '../../../../components/StepFooterButton';
import LottieView from 'lottie-react-native';

const TrackIllustration = () => (
  <LottieView
    source={require('../../../../assets/lottie/track.json')}
    autoPlay
    loop
    style={{ width: 220, height: 220 }}
  />
);

const OnboardingStep2Screen = ({ onNext, onSkip }: { onNext: () => void, onSkip: () => void }) => (
  <View style={styles.container}>
    <OnboardingHeader onSkip={onSkip} />
    <OnboardingCard
      Illustration={<TrackIllustration />}
      title="Track Your Diet"
      subtitle="We will help you lose weight, stay fit, or build muscle"
    />
    <View style={styles.footer}>
      <StepFooterButton progress={2 / 3} onPress={onNext} />
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

export default OnboardingStep2Screen; 