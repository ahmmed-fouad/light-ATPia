import React from 'react';
import { View, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface GradientBackgroundProps {
  children: React.ReactNode;
  colors?: string[];
  start?: { x: number; y: number };
  end?: { x: number; y: number };
  style?: ViewStyle;
  className?: string;
}

export const GradientBackground: React.FC<GradientBackgroundProps> = ({
  children,
  colors = ['#1E293B', '#334155'],
  start = { x: 0, y: 0 },
  end = { x: 1, y: 1 },
  style,
  className = '',
}) => {
  return (
    <LinearGradient
      colors={colors}
      start={start}
      end={end}
      style={[{ flex: 1 }, style]}
      className={className}
    >
      {children}
    </LinearGradient>
  );
};

// Predefined gradient themes
export const gradientThemes = {
  purple: {
    colors: ['#1E1B4B', '#312E81', '#4338CA'],
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
  },
  blue: {
    colors: ['#0F172A', '#1E293B', '#334155'],
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
  },
  green: {
    colors: ['#064E3B', '#065F46', '#047857'],
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
  },
  sunset: {
    colors: ['#7C2D12', '#B45309', '#F59E0B'],
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
  },
  ocean: {
    colors: ['#0C4A6E', '#075985', '#0891B2'],
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
  },
}; 