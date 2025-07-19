import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { LineChart } from 'react-native-wagmi-charts';
import type { ChartPoint } from '../types/personalProgramTypes';

const CARD_BG = "#ebf6d6";
const LINE_COLOR = "#9cd02e";
const BADGE_BG = "#173430";
const CHART_WIDTH = Dimensions.get('window').width - 95;
const CHART_HEIGHT = 200;
const GRID_COUNT = 5;
const GRID_LINE_OFFSET = 2; // or whatever looks best

const BADGE_WIDTH = 54; // or your badge width
const BADGE_HEIGHT = 32; // or your badge height

interface ProgramChartProps {
  data: ChartPoint[];
  color?: string;
  totalChange?: number;
  durationWeeks?: number;
  weeklyChange?: number;
  startWeight?: number;
  endWeight?: number;
  startDate?: string;
  endDate?: string;
}

const ProgramChart: React.FC<ProgramChartProps> = ({
  data,
  color = LINE_COLOR,
  totalChange = 12,
  durationWeeks = 16,
  weeklyChange = 0.75,
  startWeight = 60,
  endWeight = 72,
  startDate = 'Today',
  endDate = '18 July 2022',
}) => {
  // Use only start and end points for a straight line
  const chartData = [
    { timestamp: 0, value: startWeight },
    { timestamp: 1, value: endWeight },
  ];
  // Grid lines positions (0%, 33%, 66%, 100%)
  const gridPercents = [0, 1 / GRID_COUNT, 2 / GRID_COUNT, 1];
  const weekLabels = [
    '0',
    `${durationWeeks / 2}`,
    `${durationWeeks}`
  ];
  // Calculate badge positions
  const getBadgePos = (index: 0 | 1) => {
    const x = index === 0 ? 0 : CHART_WIDTH;
    const y = CHART_HEIGHT - ((chartData[index].value - startWeight) / (endWeight - startWeight)) * CHART_HEIGHT;
    if (index === 0) {
      // Start badge: move up and a bit right
      return { left: x + 8, top: y - BADGE_HEIGHT - 8 };
    } else {
      // End badge: move left and up, keep inside card
      return { left: x - BADGE_WIDTH - 8, top: y - BADGE_HEIGHT - 8 };
    }
  };

  const step = CHART_WIDTH / GRID_COUNT;
  return (
    <View style={styles.wrap}>
      {/* +12 kg badge */}
      <View style={styles.topBadge}>
        <Text style={styles.topBadgeText}>+{totalChange} kg</Text>
      </View>
      {/* Weeks and per week */}
      <View style={styles.rowCenter}>
        <Text style={styles.perWeek}>{durationWeeks}</Text>
        <Text style={styles.duration}>weeks</Text>
        <Text style={styles.dot}>&</Text>
        <Text style={styles.perWeek}>+{weeklyChange}kg</Text>
        <Text style={styles.duration}>/ week</Text>
      </View>
      {/* Chart area */}
      <View style={styles.chartArea}>
        {/* Grid lines and week labels */}
        {Array.from({ length: GRID_COUNT + 1 }).map((_, i) => (
          <View key={i} style={[styles.gridLine, { left: i * step }]}>
            <View style={styles.gridBar} />
          </View>
        ))}
        {/* Chart line */}
        <LineChart.Provider data={chartData}>
          <LineChart
            width={CHART_WIDTH}
            height={CHART_HEIGHT}
            style={styles.chart}
          >
            <LineChart.Path color={color} width={3}>
              <LineChart.Gradient color="rgba(142, 218, 1, 0.25)"/>
            </LineChart.Path>
            <LineChart.Dot at={0} color="red" size={14}/>
            <LineChart.Dot at={chartData.length - 1} color="#13332B" size={14} />
          </LineChart>
        </LineChart.Provider>
        {/* Start badge */}
        <View style={[styles.badge, styles.startBadge]}>
          <Text style={styles.badgeText}>{startWeight}kg</Text>
        </View>
        {/* End badge */}
        <View style={[styles.badge, styles.endBadge]}>
          <Text style={styles.badgeText}>{endWeight} kg</Text>
        </View>
        {/* Dates */}
        <Text style={[styles.date, { left: 0, bottom: -28 }]}>{startDate}</Text>
        <Text style={[styles.date, { right: 0, bottom: -28 }]}>{endDate}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    backgroundColor: CARD_BG,
    borderRadius: 28,
    padding: 0,
    alignItems: "center",
    marginBottom: 18,
    marginHorizontal: 10,
    overflow: "visible",
  },
  topBadge: {
    alignSelf: "center",
    backgroundColor: "#fff",
    borderRadius: 38,
    paddingHorizontal: 30,
    paddingVertical: 12,
    marginTop: 38,
    marginBottom: 8,
    shadowColor: "#A3E635",
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  topBadgeText: {
    color: "#173430",
    fontWeight: "600",
    fontSize: 25,
  },
  rowCenter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
    marginTop: 8,
    // fontSize: 28,
  },
  duration: {
    color: "#173430",
    fontWeight: "700",
    fontSize: 18,
  },
  dot: {
    color: "#B6E388",
    width: 10,
    fontSize: 18,
    marginHorizontal: 8,
    fontWeight: "700",
  },
  perWeek: {
    color: "#18b888",
    fontWeight: "700",
    fontSize: 18,
    marginRight: 4,
  },
  chartArea: {
    width: CHART_WIDTH,
    height: CHART_HEIGHT + 72,
    marginTop: 0,
    marginBottom: 0,
    position: "relative",
    backgroundColor: CARD_BG,
    borderRadius: 28,
    overflow: "visible",
  },
  chart: {
    position: "absolute",
    left: 0,
    top: 16,
    borderRadius: 20,
    overflow: "hidden",
  },
  gridLine: {
    position: "absolute",
    top: -10,
    bottom: 36,
    width: 1,
    alignItems: "center",
    zIndex: 2,
  },
  gridBar: {
    flex: 1,
    width: 1,
    // backgroundColor: "red",
    backgroundColor: "#dbefb4",
    marginTop: 24,
    marginBottom: 24,
  },
  gridLabel: {
    color: "#6b7280",
    fontSize: 13,
    fontWeight: "700",
    marginBottom: 2,
    position: "absolute",
    top: -22,
    left: -12,
  },
  badge: {
    position: 'absolute',
    backgroundColor: BADGE_BG,
    borderRadius: 16,
    paddingHorizontal: 10,
    paddingVertical: 4,
    zIndex: 10,
    minWidth: 54,
    alignItems: 'center',
  },
  startBadge: {
    left: -14, // adjust as needed
    bottom: 85, // adjust as needed
  },
  endBadge: {
    right: -14, // adjust as needed
    top: -2, // adjust as needed
  },
  badgeText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 15,
  },
  date: {
    position: "absolute",
    color: "#6b7280",
    fontSize: 13,
    fontWeight: "400",
    zIndex: 10,
    top: 220,
    paddingHorizontal: 10,
  },
});

export default ProgramChart; 