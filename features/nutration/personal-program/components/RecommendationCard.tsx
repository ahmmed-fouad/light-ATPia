import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Recommendation } from '../types/personalProgramTypes';

interface RecommendationCardProps {
  recommendations: Recommendation[];
}

const RecommendationCard: React.FC<RecommendationCardProps> = ({ recommendations }) => (
  <View style={styles.card}>
    {recommendations.map((rec, i) => (
      <View key={rec.label} style={styles.row}>
        <View style={styles.labelWrap}>
          <Text style={styles.value}>{rec.value}</Text>
          <Text style={styles.label}>{rec.label}</Text>
        </View>
        {rec.percent !== undefined && (
          <View style={styles.barBg}>
            <View style={[styles.bar, { width: `${rec.percent}%`, backgroundColor: rec.color || '#18b888' }]} />
          </View>
        )}
      </View>
    ))}
  </View>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#F7F7F7',
    borderRadius: 30,
    padding: 20,
    marginVertical: 12,
  },
  row: {
    marginBottom: 14,
  },
  labelWrap: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 4,
  },
  value: {
    fontSize: 20,
    fontWeight: '700',
    color: '#12281D',
    marginRight: 8,
  },
  label: {
    fontSize: 15,
    color: '#6b7280',
    fontWeight: '400',
  },
  barBg: {
    width: '100%',
    height: 6,
    backgroundColor: '#E5F4E5',
    borderRadius: 3,
    marginTop: 2,
    marginBottom: 2,
  },
  bar: {
    height: 6,
    borderRadius: 3,
  },
});

export default RecommendationCard; 