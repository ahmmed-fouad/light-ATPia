import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import Svg, { Polygon, Ellipse } from 'react-native-svg';

interface WaterTrackerProps {
  consumed: number;
  goal: number;
  onAdd?: () => void;
}

const CUP_COUNT = 7;

const WaterTracker: React.FC<WaterTrackerProps> = ({ consumed, goal, onAdd }) => {
  const percent = Math.min(consumed / goal, 1);
  const cupsFilled = Math.round(percent * CUP_COUNT);

  return (
    <View style={styles.container}>
      <View style={styles.cupsRow}>
        {[...Array(CUP_COUNT)].map((_, i) => {
          const isFilled = i < cupsFilled;
          const isNext = i === cupsFilled;
          const cupFill = isFilled ? '#fff' : '#74d4b8';
          return (
            <View key={i} style={styles.cupWrap}>
              <Svg width={40} height={50}>
                <Polygon
                  points="6,6 34,6 30,46 10,46"
                  fill={cupFill}
                />
                <Ellipse
                  cx={20}
                  cy={46}
                  rx={10}
                  ry={3}
                  fill={cupFill}
                />
              </Svg>
              {isNext && (
                <TouchableOpacity style={styles.plusOverlay} onPress={onAdd}>
                  <Feather name="plus" size={18} color="#fff" />
                </TouchableOpacity>
              )}
            </View>
          );
        })}
      </View>
      <View style={styles.progressRow}>
        <Text style={styles.amount}>{consumed} / {goal}ml</Text>
        <Text style={styles.percent}>{Math.round(percent * 100)}%</Text>
      </View>
      <View style={styles.progressBarBg}>
        <View style={[styles.progressBar, { width: `${percent * 100}%` }]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#18b888',
    borderRadius: 30,
    padding: 16,
    paddingVertical: 30,
    marginVertical: 10,
    marginHorizontal: 17,
  },
  cupsRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 8,
    gap: 8,
    justifyContent: 'center',
  },
  cupWrap: {
    width: 40,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  plusOverlay: {
    position: 'absolute',
    top: 18,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
  progressRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  amount: {
    fontSize: 15,
    color: '#fff',
    fontWeight: '600',
  },
  percent: {
    fontSize: 15,
    color: '#fff',
    fontWeight: '600',
  },
  progressBarBg: {
    width: '100%',
    height: 8,
    backgroundColor: '#74d4b8',
    borderRadius: 4,
    marginTop: 2,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#fff',
    borderRadius: 4,
  },
});

export default WaterTracker;
// If react-native-svg is not installed, run: pnpm add react-native-svg @types/react-native-svg 