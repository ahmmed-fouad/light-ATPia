import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { chartData, PLAN_COLORS } from '../data/pricingData';

const screenWidth = Dimensions.get('window').width;

// Prepare data for react-native-chart-kit RadarChart
const radarData = {
  labels: chartData.map((d) => d.feature),
  datasets: [
    {
      data: chartData.map((d) => d.Free),
      color: () => PLAN_COLORS.Free,
      strokeWidth: 2,
    },
    {
      data: chartData.map((d) => d.Pro),
      color: () => PLAN_COLORS.Pro,
      strokeWidth: 2,
    },
    {
      data: chartData.map((d) => d.Family),
      color: () => PLAN_COLORS.Family,
      strokeWidth: 2,
    },
  ],
};

const chartConfig = {
  backgroundGradientFrom: '#fff',
  backgroundGradientTo: '#fff',
  color: (opacity = 1) => `rgba(99, 102, 241, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(51, 65, 85, ${opacity})`,
  strokeWidth: 2,
  useShadowColorFromDataset: false,
};

const PlansRadarChart: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Compare Features</Text>
      <BarChart
        data={radarData}
        width={screenWidth - 32}
        height={320}
        chartConfig={chartConfig}
        yAxisLabel=""
        yAxisSuffix=""
      />
      <View style={styles.legendRow}>
        <View style={[styles.legendDot, { backgroundColor: PLAN_COLORS.Free }]} />
        <Text style={styles.legendLabel}>Free</Text>
        <View style={[styles.legendDot, { backgroundColor: PLAN_COLORS.Pro }]} />
        <Text style={styles.legendLabel}>Pro</Text>
        <View style={[styles.legendDot, { backgroundColor: PLAN_COLORS.Family }]} />
        <Text style={styles.legendLabel}>Family</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#6366f1',
    marginBottom: 12,
    textAlign: 'center',
  },
  legendRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  legendDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    marginHorizontal: 6,
  },
  legendLabel: {
    fontSize: 14,
    color: '#334155',
    marginRight: 12,
    marginLeft: 2,
  },
});

export default PlansRadarChart; 