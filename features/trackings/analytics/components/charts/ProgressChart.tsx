import React from 'react';
import { View, Text, Dimensions, StyleSheet, Platform } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { ChartData } from '../../types';

const { width } = Dimensions.get('window');

interface ProgressChartProps {
  data: ChartData;
  title: string;
  subtitle?: string;
}

export const ProgressChart: React.FC<ProgressChartProps> = ({ data, title, subtitle }) => {
  const chartConfig = {
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    decimalPlaces: 1,
    color: (opacity = 1) => `rgba(5, 150, 105, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(71, 85, 105, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: '6',
      strokeWidth: '2',
      stroke: '#059669',
    },
  };

  return (
    <View style={styles.container}>
      <LineChart
        data={{
          labels: data.labels,
          datasets: data.datasets.map((dataset, index) => ({
            data: dataset.data,
            color: (opacity = 1) => dataset.color || `rgba(5, 150, 105, ${opacity})`,
            strokeWidth: dataset.strokeWidth || 3,
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
}); 