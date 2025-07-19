import { LinearGradient } from 'expo-linear-gradient';
// import React from 'react';
import { Dimensions, Text, View } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { MicroChartData } from '../../types';

const { width } = Dimensions.get('window');

interface MicroBarChartProps {
  data: MicroChartData[];
  title: string;
  subtitle?: string;
}

export const MicroBarChart: React.FC<MicroBarChartProps> = ({ data, title, subtitle }) => {
  const chartData = {
    labels: data.map(item => item.name),
    datasets: [
      {
        data: data.map(item => item.value),
      },
    ],
  };

  const chartConfig = {
    backgroundGradientFrom: '#1E293B',
    backgroundGradientTo: '#334155',
    decimalPlaces: 1,
    color: (opacity = 1) => `rgba(251, 191, 36, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    barPercentage: 0.7,
    propsForLabels: {
      fontSize: 10,
      fontWeight: 'bold',
    },
  };

  return (
    <View className="bg-slate-800 rounded-3xl p-4 mb-4">
      <LinearGradient
        colors={['rgba(251, 191, 36, 0.1)', 'rgba(96, 165, 250, 0.1)']}
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

      <BarChart
        data={chartData}
        width={width - 48}
        height={220}
        chartConfig={chartConfig}
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
        fromZero
        showBarTops
        showValuesOnTopOfBars
        withInnerLines={false}
        withVerticalLabels={true}
        withHorizontalLabels={true}
        yAxisLabel=""
        yAxisSuffix=""
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
              {item.name} ({item.value}{item.unit})
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}; 