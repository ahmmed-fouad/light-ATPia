import React from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { ChevronRight } from 'lucide-react-native';
import Svg, { Circle, G } from 'react-native-svg';
import AppText from './AppText';

interface StepFooterButtonProps {
  progress: number; // 0 to 1
  onPress: () => void;
  label?: string;
}

const SIZE = 104;
const STROKE = 3;
const RADIUS = (SIZE - STROKE) / 2;
const CIRCUM = 2 * Math.PI * RADIUS;

const StepFooterButton: React.FC<StepFooterButtonProps> = ({
  progress,
  onPress,
  label,
}) => (
  <View style={styles.container}>
    <Svg width={SIZE} height={SIZE} style={StyleSheet.absoluteFill}>
      <G rotation={-90} origin={`${SIZE / 2},${SIZE / 2}`}>
        <Circle
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={RADIUS}
          stroke="#22C55E"
          strokeOpacity={0.15}
          strokeWidth={STROKE}
          fill="none"
        />
        <Circle
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={RADIUS}
          stroke="#22C55E"
          strokeWidth={STROKE}
          fill="none"
          strokeDasharray={CIRCUM}
          strokeDashoffset={CIRCUM * (1 - progress)}
          strokeLinecap="round"
        />
      </G>
    </Svg>
    <TouchableOpacity style={styles.btn} onPress={onPress} activeOpacity={0.85}>
      {label ? (
        <AppText style={styles.label}>{label}</AppText>
      ) : (
        <ChevronRight size={28} color="#fff" />
      )}
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: SIZE,
    height: SIZE,
    marginVertical: 0,
  },
  btn: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: '#13332B',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    left: 14,
    top: 14,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  label: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 20,
    letterSpacing: 0.2,
  },
});

export default StepFooterButton; 