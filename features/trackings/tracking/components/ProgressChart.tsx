
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import type { MetricOption, ProgressDataPoint } from '../types/index';

const { width: screenWidth } = Dimensions.get('window');

type ProgressChartProps = {
  progressData: ProgressDataPoint[];
  metric: string;
  setMetric: (m: string) => void;
  metricOptions: MetricOption[];
  chartWidth?: number;
};

export default function ProgressChart({ 
  progressData, 
  metric, 
  setMetric, 
  metricOptions,
  chartWidth
}: ProgressChartProps) {
  const currentMetric = metricOptions.find((m) => m.key === metric);
  const width = chartWidth || screenWidth - 32;

  // Fallback for empty data
  const safeData = progressData.length > 0 ? progressData : [{ date: '', weight: 0, calories: 0, steps: 0, water: 0 }];

  // Transform data for the chart
  const chartData = {
    labels: safeData.slice(-6).map(data => new Date(data.date).getDate().toString()),
    datasets: [
      {
        data: safeData.slice(-6).map(data => {
          const value = data[metric as keyof ProgressDataPoint];
          return typeof value === 'number' && isFinite(value) ? value : 0;
        }),
        color: () => currentMetric?.color || '#34d399',
        strokeWidth: 3,
      },
    ],
  };

  const chartConfig = {
    backgroundColor: '#ffffff',
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    decimalPlaces: 1,
    color: (opacity = 1) => `rgba(52, 211, 153, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(107, 114, 128, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: '6',
      strokeWidth: '2',
      stroke: currentMetric?.color || '#34d399',
    },
  };

  return (
    <View style={{ backgroundColor: '#fff', borderRadius: 16, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 8, elevation: 2, padding: 12 }}>
      <View style={{ marginBottom: 12 }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#2563eb', marginBottom: 8 }}>
          Progress Over Time
        </Text>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingVertical: 4 }}
        >
          {metricOptions.map((opt) => (
            <TouchableOpacity
              key={opt.key}
              onPress={() => setMetric(opt.key)}
              style={{
                paddingHorizontal: 16,
                paddingVertical: 8,
                borderRadius: 16,
                borderWidth: 1,
                borderColor: metric === opt.key ? '#2563eb' : '#e5e7eb',
                backgroundColor: metric === opt.key ? '#2563eb' : '#f1f5f9',
                marginRight: 8,
              }}
            >
              <Text style={{ color: metric === opt.key ? '#fff' : '#64748b', fontWeight: 'bold' }}>{opt.label}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      <LineChart
        data={chartData}
        width={width}
        height={220}
        chartConfig={chartConfig}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
      <View style={{ marginTop: 8 }}>
        <Text style={{ textAlign: 'center', color: '#64748b' }}>
          Current: {safeData[safeData.length - 1]?.[metric as keyof ProgressDataPoint]} {metric === 'weight' ? 'kg' : metric === 'water' ? 'L' : metric === 'calories' ? 'kcal' : ''}
        </Text>
      </View>
    </View>
  );
} 