// import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { LinearGradient } from 'expo-linear-gradient';
import { MacroChartData } from '../../types';

const { width } = Dimensions.get('window');

interface MacroPieChartProps {
  data: MacroChartData[];
  title: string;
  subtitle?: string;
}

export const MacroPieChart: React.FC<MacroPieChartProps> = ({ data, title, subtitle }) => {
  const chartData = data.map(item => ({
    name: item.name,
    population: item.value,
    color: item.color,
    legendFontColor: '#FFFFFF',
    legendFontSize: 12,
  }));

  const chartConfig = {
    backgroundGradientFrom: '#1E293B',
    backgroundGradientTo: '#334155',
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(52, 211, 153, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForLabels: {
      fontSize: 12,
      fontWeight: 'bold',
    },
  };

  return (
    <View className="bg-slate-800 rounded-3xl p-4 mb-4">
      <LinearGradient
        colors={['rgba(52, 211, 153, 0.1)', 'rgba(96, 165, 250, 0.1)']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="absolute inset-0 rounded-3xl"
      />
      
      <View className="mb-4">
        <Text className="text-white text-lg font-bold mb-1">{title}</Text>
        {subtitle && (
          <Text className="text-gray-300 text-sm">{subtitle}</Text>
        )}
      </View>

      <PieChart
        data={chartData}
        width={width - 48}
        height={220}
        chartConfig={chartConfig}
        accessor="population"
        backgroundColor="transparent"
        paddingLeft="15"
        absolute
      />

      {/* Legend */}
      <View className="flex-row flex-wrap justify-center mt-4">
        {data.map((item, index) => (
          <View key={index} className="flex-row items-center mr-4 mb-2">
            <View 
              className="w-3 h-3 rounded-full mr-2"
              style={{ backgroundColor: item.color }}
            />
            <Text className="text-gray-300 text-xs">
              {item.name} ({item.percentage}%)
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}; 