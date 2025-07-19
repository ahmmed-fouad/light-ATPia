import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useAnalyticsStore } from '../stores/analyticsStore';

const GoalsCard = () => {
  const goals = useAnalyticsStore(s => s.goals);
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Your Goals</Text>
      {goals.map((g, i) => (
        <View key={i} style={styles.goalRow}>
          <View style={styles.iconBox}>{g.icon()}</View>
          <Text style={styles.label}>{g.label}:</Text>
          <Text style={styles.value}>{g.value}</Text>
          <Text style={styles.progress}>{g.progress}/{g.target}</Text>
        </View>
      ))}
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
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#334155',
    marginBottom: 8,
  },
  goalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
    gap: 6,
  },
  iconBox: {
    marginRight: 4,
  },
  label: {
    fontSize: 14,
    color: '#64748b',
    fontWeight: '600',
    minWidth: 60,
  },
  value: {
    fontSize: 14,
    color: '#334155',
    fontWeight: '700',
    marginLeft: 2,
  },
  progress: {
    fontSize: 12,
    color: '#94a3b8',
    marginLeft: 'auto',
  },
});

export default GoalsCard; 