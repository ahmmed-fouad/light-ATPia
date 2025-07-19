import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { PopularTopicsChartProps } from '../types';

export const PopularTopicsChart: React.FC<PopularTopicsChartProps> = ({ data }) => {
  const maxValue = Math.max(...data.map(item => item.articles));

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Popular Nutrition Topics</Text>
      
      <View style={styles.chartContainer}>
        {data.map((item, index) => {
          const percentage = (item.articles / maxValue) * 100;
          
          return (
            <View key={index} style={styles.barContainer}>
              <View style={styles.barInfo}>
                <Text style={styles.topicText}>{item.topic}</Text>
                <Text style={styles.articlesText}>{item.articles} articles</Text>
              </View>
              
              <View style={styles.barWrapper}>
                <View 
                  style={[
                    styles.bar, 
                    { width: `${percentage}%` }
                  ]} 
                />
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(255,255,255,0.96)',
    borderRadius: 18,
    padding: 20,
    marginHorizontal: 16,
    marginBottom: 16,
    shadowColor: '#a7f3d0',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: Platform.OS === 'ios' ? 0.10 : 0.13,
    shadowRadius: 10,
    elevation: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#059669',
    marginBottom: 20,
    textAlign: 'center',
    fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif',
  },
  chartContainer: {
    gap: 16,
  },
  barContainer: {
    gap: 8,
  },
  barInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  topicText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif',
  },
  articlesText: {
    fontSize: 12,
    color: '#64748b',
    fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif',
  },
  barWrapper: {
    height: 12,
    backgroundColor: '#f3f4f6',
    borderRadius: 6,
    overflow: 'hidden',
  },
  bar: {
    height: '100%',
    backgroundColor: '#059669',
    borderRadius: 6,
  },
}); 