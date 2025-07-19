import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Svg, { G, Path, Circle } from 'react-native-svg';
import { NutritionData } from '../types';

interface NutritionChartProps {
  data: NutritionData[];
  size?: number;
}

const COLORS = ['#059669', '#60a5fa', '#fbbf24', '#f87171'];
const { width } = Dimensions.get('window');
const CHART_SIZE = Math.min(width * 0.5, 140);
const STROKE_WIDTH = 18;

function describeArc(cx: number, cy: number, r: number, startAngle: number, endAngle: number) {
  const start = polarToCartesian(cx, cy, r, endAngle);
  const end = polarToCartesian(cx, cy, r, startAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';
  const d = [
    'M', start.x, start.y,
    'A', r, r, 0, largeArcFlag, 0, end.x, end.y
  ].join(' ');
  return d;
}

function polarToCartesian(cx: number, cy: number, r: number, angle: number) {
  const rad = (angle - 90) * Math.PI / 180.0;
  return {
    x: cx + r * Math.cos(rad),
    y: cy + r * Math.sin(rad)
  };
}

export const NutritionChart: React.FC<NutritionChartProps> = ({ data, size = CHART_SIZE }) => {
  const radius = (size - STROKE_WIDTH) / 2;
  const center = size / 2;
  const total = data.reduce((sum, item) => sum + item.value, 0);

  let startAngle = 0;
  const arcs = data.map((item, i) => {
    const value = item.value;
    const angle = (value / total) * 360;
    const endAngle = startAngle + angle;
    const path = describeArc(center, center, radius, startAngle, endAngle);
    const arc = (
      <Path
        key={i}
        d={path}
        stroke={COLORS[i % COLORS.length]}
        strokeWidth={STROKE_WIDTH}
        fill="none"
        strokeLinecap="round"
      />
    );
    startAngle = endAngle;
    return arc;
  });

  return (
    <View style={styles.container}>
      <Svg width={size} height={size}>
        <G>
          {arcs}
          {/* Donut hole */}
          <Circle cx={center} cy={center} r={radius - STROKE_WIDTH / 2} fill="#fff" />
        </G>
      </Svg>
      <View style={styles.legendRow}>
        {data.map((item, i) => (
          <View key={i} style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: COLORS[i % COLORS.length] }]} />
            <Text style={styles.legendLabel}>{item.name}</Text>
            <Text style={styles.legendValue}>{item.value}%</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  legendRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginTop: 8,
    gap: 8,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 6,
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 4,
  },
  legendLabel: {
    fontSize: 12,
    color: '#64748b',
    marginRight: 2,
  },
  legendValue: {
    fontSize: 12,
    color: '#222',
    fontWeight: 'bold',
    marginLeft: 2,
  },
}); 