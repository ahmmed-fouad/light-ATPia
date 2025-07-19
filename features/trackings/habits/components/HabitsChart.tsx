// import React from 'react';
import { View, Text, TouchableOpacity, Dimensions, Platform } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { useHabitsStore } from '../stores/habitsStore';
import { demoProgress } from '../data/habitsData';

const { width: screenWidth } = Dimensions.get('window');
const chartWidth = screenWidth - 32;

export default function HabitsChart() {
  const { view, setView } = useHabitsStore();

  // For demo, show total habits completed per day
  const chartData = {
    labels: demoProgress.map((d) => d.date.slice(5)),
    datasets: [
      {
        data: demoProgress.map((d) =>
          Object.values(d).filter((v) => v === true).length
        ),
        color: () => '#059669',
        strokeWidth: 3,
      },
    ],
  };

  const chartConfig = {
    backgroundColor: '#fff',
    backgroundGradientFrom: '#fff',
    backgroundGradientTo: '#fff',
    decimalPlaces: 0,
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
    <View style={{ backgroundColor: 'rgba(255,255,255,0.97)', borderRadius: 18, padding: 12, shadowColor: '#a7f3d0', shadowOffset: { width: 0, height: 2 }, shadowOpacity: Platform.OS === 'ios' ? 0.10 : 0.13, shadowRadius: 8, elevation: 3 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10, justifyContent: 'space-between' }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#059669' }}>Habits Progress</Text>
        <View style={{ flexDirection: 'row', gap: 8 }}>
          <TouchableOpacity
            onPress={() => setView('week')}
            style={{
              backgroundColor: view === 'week' ? '#059669' : '#e0f2fe',
              borderRadius: 12,
              paddingHorizontal: 12,
              paddingVertical: 4,
              marginRight: 6,
            }}
          >
            <Text style={{ color: view === 'week' ? '#fff' : '#059669', fontWeight: 'bold' }}>Week</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setView('month')}
            style={{
              backgroundColor: view === 'month' ? '#059669' : '#e0f2fe',
              borderRadius: 12,
              paddingHorizontal: 12,
              paddingVertical: 4,
            }}
          >
            <Text style={{ color: view === 'month' ? '#fff' : '#059669', fontWeight: 'bold' }}>Month</Text>
          </TouchableOpacity>
        </View>
      </View>
      <LineChart
        data={chartData}
        width={chartWidth}
        height={180}
        chartConfig={chartConfig}
        bezier
        style={{ borderRadius: 16 }}
      />
    </View>
  );
} 