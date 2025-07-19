import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';
import { FeatureCardData } from '../types';
import { FeatureChart } from './FeatureChart';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width - 40;

export const FeatureCard: React.FC<{ data: FeatureCardData; featured?: boolean }> = ({ data, featured }) => {
  // Split description into bullet points
  const points = data.description.split('\n').filter(Boolean);
  return (
    <View style={[styles.card, { width: CARD_WIDTH, borderColor: featured ? data.color : '#e5e7eb', borderWidth: featured ? 2 : 1, shadowColor: featured ? data.color : '#a7f3d0' }]}> 
      {data.image && (
        <Image source={typeof data.image === 'string' ? { uri: data.image } : data.image} style={styles.image} resizeMode="cover" />
      )}
      <Text style={[styles.title, featured && { color: data.color }]}>{data.title}</Text>
      <View style={styles.pointsList}>
        {points.map((point, idx) => (
          <View key={idx} style={styles.pointRow}>
            <View style={[styles.dot, { backgroundColor: data.color }]} />
            <Text style={styles.pointText}>{point.trim()}</Text>
          </View>
        ))}
      </View>
      {data.stat && (
        <View style={styles.statRow}>
          <Text style={styles.statLabel}>{data.stat.label}:</Text>
          <Text style={styles.statValue}>{data.stat.value}{data.stat.unit || ''}</Text>
        </View>
      )}
      {data.actionLabel && (
        <TouchableOpacity style={[styles.actionBtn, { backgroundColor: data.color }]} onPress={data.onPress}>
          <Text style={styles.actionBtnText}>{data.actionLabel}</Text>
        </TouchableOpacity>
      )}
      
      {/* Chart for each feature */}
      {data.chartData && (
        <FeatureChart 
          data={data.chartData} 
          color={data.color} 
          title={data.chartTitle || "Weekly Activity"} 
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 22,
    padding: 20,
    marginVertical: 16,
    alignItems: 'center',
    backgroundColor: '#fff',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.13,
    shadowRadius: 16,
    elevation: 4,
    alignSelf: 'center',
  },
  image: {
    width: '100%',
    height: 170,
    borderRadius: 18,
    marginBottom: 16,
    backgroundColor: '#e5e7eb',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 10,
    textAlign: 'center',
  },
  pointsList: {
    width: '100%',
    marginBottom: 10,
  },
  pointRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 6,
    width: '100%',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginTop: 6,
    marginRight: 10,
  },
  pointText: {
    fontSize: 15,
    color: '#334155',
    flex: 1,
    lineHeight: 22,
  },
  statRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  statLabel: {
    fontSize: 14,
    color: '#334155',
    marginRight: 4,
  },
  statValue: {
    fontSize: 16,
    color: '#059669',
    fontWeight: 'bold',
  },
  actionBtn: {
    borderRadius: 14,
    paddingVertical: 10,
    paddingHorizontal: 28,
    marginTop: 10,
  },
  actionBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
}); 