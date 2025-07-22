import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const { width } = Dimensions.get('window');
const CHART_WIDTH = width + 48; // 24px padding on each side
const CHART_HEIGHT = 250;
const GRID_COUNT = 6;

interface BreakfastChartProps {
  chartCurves: {
    kcal: number[];
    carbs: number[];
    fat: number[];
    protein: number[];
    date: string;
  };
}

const BreakfastChart: React.FC<BreakfastChartProps> = ({ chartCurves }) => {
  // Create chart data for the week (7 days) - all starting from same point
  const chartData = {
    labels: chartCurves.kcal.map((_, i) => `Day ${i + 1}`),
    datasets: [
      {
        data: chartCurves.kcal,
        color: () => '#9cd030',
        strokeWidth: 3,
      },
      {
        data: chartCurves.carbs,
        color: () => '#ff395d',
        strokeWidth: 2,
      },
      {
        data: chartCurves.fat,
        color: () => '#ff8c39',
        strokeWidth: 2,
      },
      {
        data: chartCurves.protein,
        color: () => '#8539fe',
        strokeWidth: 2,
      },
    ],
  };

  const chartConfig = {
    backgroundGradientFromOpacity: 0,
    backgroundGradientToOpacity: 0,
    decimalPlaces: 0,
    
    color: (opacity = 1) => `rgba(156, 208, 48, ${opacity})`,

    labelColor: (opacity = 1) => `rgba(107, 114, 128, ${opacity})`,

    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: "0", // Hide dots
    },
    propsForBackgroundLines: {
      strokeDasharray: "", // Solid lines
      stroke: "#dbefb5",
      strokeWidth: 1,
    },
  };

  const step = CHART_WIDTH / GRID_COUNT;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>This Week's Progress</Text>
        <Text style={styles.subtitle}>Track your daily nutrition</Text>
        <Text style={styles.total}>582 kcal</Text>
        <View style={{flexDirection: "row", alignItems: "center", gap: 4}}>
          <Text style={styles.totalText}>March 28</Text>
          <Text style={styles.totalText2}>-</Text>
          <Text style={styles.totalText}>3</Text>
          <Text style={styles.totalText2}>foods -</Text>
          <Text style={styles.totalText}>49</Text>
          <Text style={styles.totalText2}>kcal remaining</Text>
        </View>
      </View>
      
      <View style={styles.chartContainer}>
        {/* Grid lines */}
        {Array.from({ length: GRID_COUNT + 1 }).map((_, i) => (
          <View key={i} style={[styles.gridLine, { left: i * step }]}>
            <View style={styles.gridBar} />
          </View>
        ))}
        
        {/* Chart */}
        <LineChart
          data={chartData}
          width={CHART_WIDTH}
          height={CHART_HEIGHT}
          chartConfig={chartConfig}
          bezier
          style={styles.chart}
          withDots={false}
          withInnerLines={false}
          withOuterLines={false}
          withVerticalLabels={false}
          withHorizontalLabels={false}
        />
        
        <View style={styles.legend}>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: '#9cd030' }]} />
            <Text style={styles.legendText}>Calory</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: '#ff395d' }]} />
            <Text style={styles.legendText}>Carbs</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: '#ff8c39' }]} />
            <Text style={styles.legendText}>Fat</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: '#8539fe' }]} />
            <Text style={styles.legendText}>Protein</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ebf6d6",
    borderRadius: 24,
    padding: 24,
    marginHorizontal: 24,
    marginBottom: 12,
    overflow: "hidden",
  },
  header: {
    alignItems: "center",
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#173430",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: "#6b7280",
    fontWeight: "400",
  },
  chartContainer: {
    alignItems: "center",
    position: "relative",
  },
  chart: {
    borderRadius: 16,
    overflow: "hidden",
  },
  gridLine: {
    position: "absolute",
    top: 0,
    bottom: 0,
    width: 1,
    alignItems: "center",
    zIndex: 1,
  },
  gridBar: {
    flex: 1,
    width: 1,
    backgroundColor: "#dbefb4",
    marginTop: 16,
    marginBottom: 90,
    zIndex: -200,
  },
  legend: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 6,
  },
  legendText: {
    fontSize: 12,
    color: "#6b7280",
    fontWeight: "500",
  },
  total: {
    fontSize: 20,
    fontWeight: "600",
    color: "#173430",
    backgroundColor: "#fff",
    marginTop: 22,
    marginBottom: 12,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 26,
  },
  totalText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#173430",
  },
  totalText2: {
    fontSize: 16,
    fontWeight: "600",
    color: "#6b7280",
  },
});

export default BreakfastChart; 