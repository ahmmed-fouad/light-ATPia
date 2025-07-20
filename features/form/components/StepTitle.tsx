import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface StepTitleProps {
  title: string;
  highlight?: string;
  subtitle?: string;
  step: number;
  total: number;
}

const StepTitle: React.FC<StepTitleProps> = ({ title, highlight, subtitle, step, total }) => {
  const parts = highlight && title.includes(highlight)
    ? title.split(new RegExp(`(${highlight})`, 'i'))
    : [title];
  
  const before = parts[0] || '';
  const highlighted = parts[1] || '';
  const after = parts[2] || '';

  return (
    <View style={styles.container}>
      <Text style={styles.progress}>{step} / {total}</Text>
      
      <Text style={styles.title}>
        {before}
        {highlighted && <Text style={styles.highlight}>{highlighted}</Text>}
        {after}
      </Text>

      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: 24,
  },
  progress: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    // fontFamily: 'gotham-bold',
    fontWeight: '600',
    color: '#111827',
    textAlign: 'center',
    marginBottom: 8,
  },
  highlight: {
    color: '#22C55E',
  },
  subtitle: {
    fontSize: 15,
    color: '#6B7280',
    textAlign: 'center',
    fontWeight: '400',
    marginTop: 2,
    width: 220,
  },
});

export default StepTitle; 