import React from 'react';
import { View, Text, Dimensions, StyleSheet, Platform } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { ChartData } from '../../types';

const { width } = Dimensions.get('window');

interface NutritionChartProps {
  data: ChartData;
  title: string;
  subtitle?: string;
}

export const NutritionChart: React.FC<NutritionChartProps> = ({ data, title, subtitle }) => {
  const chartConfig = {
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(245, 158, 11, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(71, 85, 105, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: '4',
      strokeWidth: '2',
    },
  };

  const legendData = [
    { label: 'Calories', color: '#F59E0B' },
    { label: 'Protein', color: '#10B981' },
    { label: 'Carbs', color: '#EF4444' },
    { label: 'Fats', color: '#8B5CF6' },
  ];

  return (
    <View style={styles.container}>
      <LineChart
        data={{
          labels: data.labels,
          datasets: data.datasets.map((dataset, index) => ({
            data: dataset.data,
            color: (opacity = 1) => dataset.color || `rgba(245, 158, 11, ${opacity})`,
            strokeWidth: dataset.strokeWidth || 2,
          })),
        }}
        width={width - 64}
        height={200}
        chartConfig={chartConfig}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
        withDots={true}
        withShadow={false}
        withInnerLines={false}
        withOuterLines={false}
        withVerticalLines={false}
        withHorizontalLines={true}
        withVerticalLabels={true}
        withHorizontalLabels={true}
        fromZero={false}
        yAxisLabel=""
        yAxisSuffix=""
        yLabelsOffset={10}
        xLabelsOffset={-10}
      />

      {/* Legend */}
      <View style={styles.legend}>
        {legendData.map((item, index) => (
          <View key={index} style={styles.legendItem}>
            <View 
              style={[styles.legendDot, { backgroundColor: item.color }]}
            />
            <Text style={styles.legendText}>{item.label}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(255,255,255,0.97)',
    borderRadius: 16,
    padding: 12,
    shadowColor: '#a7f3d0',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: Platform.OS === 'ios' ? 0.10 : 0.13,
    shadowRadius: 8,
    elevation: 3,
  },
  legend: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 12,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
    marginBottom: 8,
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 6,
  },
  legendText: {
    fontSize: 12,
    color: '#64748b',
  },
}); 