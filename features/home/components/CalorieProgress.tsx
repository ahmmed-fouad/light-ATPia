import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Path, Defs, LinearGradient, Stop } from 'react-native-svg';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface CalorieProgressProps {
  calories: number;
  total: number;
}

const CARD_WIDTH = 390;
const CARD_HEIGHT = 260;
const ARC_WIDTH = 22;
const ARC_RADIUS = 130;
const ARC_CX = CARD_WIDTH / 2;
const ARC_CY = 180;

// Figma colors
const BG_COLOR = "#ebf6d6";
const ARC_GRADIENT_FROM = "#9ed031"; // yellow-green
const ARC_GRADIENT_TO = "#9ed031";   // green
const ARC_BG = "#d4eba3";
const TEXT_DARK = '#183A1D';
const TEXT_GRAY = '#6b7280';

function describeArc(cx: number, cy: number, r: number, startAngle: number, endAngle: number) {
  const start = polarToCartesian(cx, cy, r, endAngle);
  const end = polarToCartesian(cx, cy, r, startAngle);
  const arcSweep = endAngle - startAngle <= 180 ? '0' : '1';
  return [
    'M', start.x, start.y,
    'A', r, r, 0, arcSweep, 0, end.x, end.y
  ].join(' ');
}

function polarToCartesian(cx: number, cy: number, r: number, angle: number) {
  const a = (angle - 195) * Math.PI / 180.0;
  return {
    x: cx + (r * Math.cos(a) ),
    y: cy + (r * Math.sin(a) ),
  };
}

const CalorieProgress: React.FC<CalorieProgressProps> = ({ calories, total }) => {
  const percent = Math.min(calories / total, 1);
  // this is the angle percentage progress
  const endAngle = 210 * percent;

  return (
    <View style={styles.card}>
      <View style={styles.arcWrap}>
        <Svg width={CARD_WIDTH} height={CARD_HEIGHT}>
          <Defs>
            <LinearGradient id="arcGradient" x1="0" y1="0" x2="1" y2="0">
              <Stop offset="0%" stopColor={ARC_GRADIENT_FROM} />
              <Stop offset="100%" stopColor={ARC_GRADIENT_TO} />
            </LinearGradient>
          </Defs>
          {/* Background half-arc */}
          <Path
            d={describeArc(ARC_CX, ARC_CY, ARC_RADIUS, 0, 210)}
            stroke={ARC_BG}
            strokeWidth={ARC_WIDTH}
            fill="none"
            strokeLinecap="round"
          />
          {/* Progress half-arc */}
          <Path
            d={describeArc(ARC_CX, ARC_CY, ARC_RADIUS, 0, endAngle)}
            stroke="url(#arcGradient)"
            strokeWidth={ARC_WIDTH}
            fill="none"
            strokeLinecap="round"
          />
        </Svg>
        <View style={styles.iconWrap}>
          <MaterialCommunityIcons
            name="fire"
            size={42}
            color={ARC_GRADIENT_TO}
          />
        </View>
      </View>
      <View style={styles.centerContent}>
        <Text style={styles.label}>Calories</Text>
        <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
          <Text style={styles.calories}>{calories}</Text>
          <Text style={{ fontSize: 16, color: TEXT_GRAY, fontWeight: "500" }}>kcal</Text>
        </View>
        <Text style={styles.total}>of {total} kcal</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    backgroundColor: BG_COLOR,
    borderRadius: 28,
    alignSelf: "center",
    alignItems: "center",
    marginVertical: 10,
    // paddingTop: 12,
    paddingBottom: 18,
    shadowColor: "#22C55E",
    shadowOpacity: 0.04,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  arcWrap: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  iconWrap: {
    position: "absolute",
    left: CARD_WIDTH / 2 - 20,
    top: ARC_CY - ARC_RADIUS + 16,
    backgroundColor: "#ebf6d6",
  },
  centerContent: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: -135,
  },
  label: {
    fontSize: 18,
    color: TEXT_DARK,
    fontWeight: "600",
    marginBottom: 2,
  },
  calories: {
    fontSize: 44,
    fontWeight: "700",
    color: TEXT_DARK,
    marginBottom: 2,
  },
  total: {
    fontSize: 16,
    color: TEXT_GRAY,
    fontWeight: "500",
  },
});

export default CalorieProgress; 