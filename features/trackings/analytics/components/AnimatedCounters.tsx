import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { useAnalyticsStore } from '../stores/analyticsStore';

// Custom hook for animated counter
function useAnimatedNumber(toValue: number, duration = 900) {
  const animated = React.useRef(new Animated.Value(0)).current;
  const [displayValue, setDisplayValue] = React.useState(0);

  useEffect(() => {
    const id = animated.addListener(({ value }) => setDisplayValue(Math.round(value)));
    Animated.timing(animated, {
      toValue,
      duration,
      useNativeDriver: false,
    }).start();
    return () => animated.removeListener(id);
  }, [toValue]);

  return displayValue;
}

const AnimatedCounters = () => {
  const counters = useAnalyticsStore(s => s.counters);
  return (
    <View style={styles.card}>
      <View style={styles.row}>
        {counters.map((c, i) => {
          const animatedValue = useAnimatedNumber(c.value);
          return (
            <View key={i} style={styles.counterBox}>
              <View style={styles.iconBox}>{c.icon()}</View>
              <Animated.Text style={styles.value}>{animatedValue}</Animated.Text>
              <Text style={styles.label}>{c.label}</Text>
            </View>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  counterBox: {
    alignItems: 'center',
    flex: 1,
  },
  iconBox: {
    marginBottom: 4,
  },
  value: {
    fontSize: 22,
    fontWeight: '700',
    color: '#334155',
    marginBottom: 2,
  },
  label: {
    fontSize: 13,
    color: '#64748b',
    fontWeight: '600',
  },
});

export default AnimatedCounters; 