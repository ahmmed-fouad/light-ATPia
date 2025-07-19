import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { LinearGradient } from 'expo-linear-gradient';
import { ChartData } from '../../types';

interface MacroPieChartProps {
  data: ChartData[];
  title: string;
  subtitle?: string;
  height?: number;
}

const { width: screenWidth } = Dimensions.get('window');

export const MacroPieChart: React.FC<MacroPieChartProps> = ({
  data,
  title,
  subtitle,
  height = 200
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

  const chartData = data.map((item, index) => ({
    name: item.name,
    population: item.value,
    color: item.color,
    legendFontColor: '#FFFFFF',
    legendFontSize: 12
  }));

  const chartConfig = {
    backgroundGradientFrom: 'transparent',
    backgroundGradientTo: 'transparent',
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.5,
    useShadowColorFromDataset: false,
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

      <PieChart
        data={chartData}
        width={screenWidth - 48} // Account for padding
        height={height}
        chartConfig={chartConfig}
        accessor="population"
        backgroundColor="transparent"
        paddingLeft="0"
        absolute
        hasLegend={true}
        center={[screenWidth / 2 - 24, height / 2]}
      />

      {/* Custom Legend */}
      <View className="mt-4 flex-row flex-wrap justify-center">
        {data.map((item, index) => (
          <View key={index} className="flex-row items-center mr-4 mb-2">
            <View 
              className="w-3 h-3 rounded-full mr-2"
              style={{ backgroundColor: item.color }}
            />
            <Text className="text-gray-300 text-xs">
              {item.name}: {item.value}g ({item.percentage.toFixed(0)}%)
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}; 