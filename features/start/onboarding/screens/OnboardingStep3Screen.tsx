import React from 'react';
import { View, StyleSheet } from 'react-native';
import OnboardingHeader from '../components/OnboardingHeader';
import OnboardingCard from '../components/OnboardingCard';
import StepFooterButton from '../../../../components/StepFooterButton';
import LottieView from 'lottie-react-native';

const TrophyIllustration = () => (
  <LottieView
    source={require('../../../../assets/lottie/trophy.json')}
    autoPlay
    loop
    style={{ width: 220, height: 220 }}
  />
);

const OnboardingStep3Screen = ({ onStart, onLogin }) => (
  <View style={styles.container}>
    <OnboardingHeader onLogin={onLogin} showLogin />
    <OnboardingCard
      Illustration={<TrophyIllustration />}
      title="Live Healty & Great"
      subtitle="Let’s start this journey and live healty together!"
    />
    <View style={styles.footer}>
      <StepFooterButton progress={1} onPress={onStart} label="Start" />
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

export default OnboardingStep3Screen; 