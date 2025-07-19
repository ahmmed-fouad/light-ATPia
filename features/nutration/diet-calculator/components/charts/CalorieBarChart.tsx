import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { LinearGradient } from 'expo-linear-gradient';
import { ChartData } from '../../types';

interface CalorieBarChartProps {
  data: ChartData[];
  title: string;
  subtitle?: string;
  height?: number;
}

const { width: screenWidth } = Dimensions.get('window');

export const CalorieBarChart: React.FC<CalorieBarChartProps> = ({
  data,
  title,
  subtitle,
  height = 150
}) => {
  if (!data || data.length === 0) {
    return (
      <View className="bg-slate-800/50 rounded-2xl p-4 border border-slate-700/50">
        <LinearGradient
          colors={['rgba(139, 92, 246, 0.1)', 'rgba(34, 197, 94, 0.1)']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          className="absolute inset-0 rounded-2xl"
        />
        <Text className="text-white text-lg font-semibold mb-2">{title}</Text>
        <Text className="text-gray-400 text-sm">No data available</Text>
      </View>
    );
  }

  const chartData = {
    labels: data.map(item => item.name),
    datasets: [
      {
        data: data.map(item => item.value)
      }
    ]
  };

  const chartConfig = {
    backgroundGradientFrom: 'transparent',
    backgroundGradientTo: 'transparent',
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.7,
    useShadowColorFromDataset: false,
    decimalPlaces: 0,
    style: {
      borderRadius: 16
    }
  };

  return (
    <View className="bg-slate-800/50 rounded-2xl p-4 border border-slate-700/50">
      <LinearGradient
        colors={['rgba(139, 92, 246, 0.1)', 'rgba(34, 197, 94, 0.1)']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="absolute inset-0 rounded-2xl"
      />
      
      <View className="mb-4">
        <Text className="text-white text-lg font-semibold mb-1">{title}</Text>
        {subtitle && (
          <Text className="text-gray-400 text-sm">{subtitle}</Text>
        )}
      </View>

      <BarChart
        data={chartData}
        width={screenWidth - 48}
        height={height}
        chartConfig={chartConfig}
        yAxisLabel=""
        yAxisSuffix=""
        fromZero
        showBarTops
        showValuesOnTopOfBars
        withVerticalLabels={false}
        withHorizontalLabels={true}
        style={{
          marginVertical: 8,
          borderRadius: 16
        }}
      />

      {/* Custom Value Display */}
      <View className="mt-4 items-center">
        {data.map((item, index) => (
          <View key={index} className="flex-row items-center mb-2">
            <View 
              className="w-3 h-3 rounded-full mr-2"
              style={{ backgroundColor: item.color }}
            />
            <Text className="text-white font-semibold text-lg">
              {item.value.toLocaleString()} kcal
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}; 