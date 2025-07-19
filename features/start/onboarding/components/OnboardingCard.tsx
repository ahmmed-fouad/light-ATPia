import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface OnboardingCardProps {
  Illustration: React.ReactNode;
  title: string;
  subtitle: string;
}

const OnboardingCard: React.FC<OnboardingCardProps> = ({ Illustration, title, subtitle }) => (
  <View style={styles.card}>
    <View style={styles.illustration}>{Illustration}</View>
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.subtitle}>{subtitle}</Text>
  </View>
);

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    marginHorizontal: 24,
    marginTop: 24,
    marginBottom: 0,
    backgroundColor: 'transparent',
  },
  illustration: {
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#13332B',
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: '#4B6358',
    textAlign: 'center',
    marginBottom: 0,
  },
});

export default OnboardingCard; 