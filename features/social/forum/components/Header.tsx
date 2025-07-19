import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { ForumCounter } from '../types';

interface HeaderProps {
  counters: ForumCounter[];
}

export const Header: React.FC<HeaderProps> = ({ counters }) => {
  const [animated, setAnimated] = useState(counters.map(() => 0));

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimated(prev =>
        prev.map((v, i) =>
          v < counters[i].value
            ? Math.min(v + Math.ceil(counters[i].value / 40), counters[i].value)
            : v
        )
      );
    }, 40);
    return () => clearInterval(interval);
  }, [counters]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Forum</Text>
      <View style={styles.countersRow}>
        {counters.map((counter, i) => (
          <View key={counter.label} style={styles.counterCard}>
            <Text style={styles.counterValue}>{animated[i]}</Text>
            <Text style={styles.counterLabel}>{counter.label}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 12,
    backgroundColor: 'transparent',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#059669',
    marginBottom: 8,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif',
    letterSpacing: 0.5,
    textAlign: 'center',
  },
  countersRow: {
    flexDirection: 'row',
    gap: 18,
  },
  counterCard: {
    backgroundColor: 'rgba(255,255,255,0.96)',
    borderRadius: 14,
    paddingVertical: 10,
    paddingHorizontal: 18,
    alignItems: 'center',
    shadowColor: '#a7f3d0',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: Platform.OS === 'ios' ? 0.10 : 0.13,
    shadowRadius: 6,
    elevation: 2,
  },
  counterValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#059669',
    marginBottom: 2,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif',
  },
  counterLabel: {
    fontSize: 13,
    color: '#64748b',
    fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif',
  },
}); 