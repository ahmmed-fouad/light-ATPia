import React from 'react';
import { View, Text, StyleSheet, useWindowDimensions } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { useSettingsStore } from '../stores/settingsStore';
import { COLORS } from '../data/settingsData';

const UsageChart = () => {
  const usageData = useSettingsStore(s => s.usageData);
  const { width } = useWindowDimensions();
  const chartWidth = Math.min(width - 48, 380);

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Usage Chart</Text>
      <BarChart
        data={{
          labels: usageData.map(d => d.label),
          datasets: [{ data: usageData.map(d => d.value),
            //  colors: (opacity = 1) => COLORS 
            }],
        }}
        width={chartWidth}
        height={180}
        yAxisLabel=""
        yAxisSuffix=""
        fromZero
        showBarTops={false}
        withInnerLines={false}
        withHorizontalLabels={true}
        chartConfig={chartConfig}
        style={styles.chart}
        withCustomBarColorFromData={false}
        flatColor={true}
      />
      <View style={styles.legendRow}>
        {usageData.map((d, i) => (
          <View key={d.label} style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: COLORS[i % COLORS.length] }]} />
            <Text style={styles.legendLabel}>{d.label}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const chartConfig = {
  backgroundGradientFrom: "#fff",
  backgroundGradientTo: "#fff",
  color: (opacity = 1) => `rgba(99, 102, 241, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(51, 65, 85, ${opacity})`,
  fillShadowGradient: "#9cd02e",
  fillShadowGradientOpacity: 1,
  decimalPlaces: 0,
  barPercentage: 0.6,
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#334155',
    marginBottom: 8,
  },
  chart: {
    borderRadius: 12,
    marginBottom: 10,
  },
  legendRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 16,
    marginTop: 6,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
    marginBottom: 4,
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 5,
  },
  legendLabel: {
    fontSize: 13,
    color: '#334155',
    fontWeight: '600',
  },
});

export default UsageChart; 