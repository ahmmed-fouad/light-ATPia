import React, { useEffect, useRef } from 'react';
import { View, Text, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface AnimatedProgressProps {
  progress: number; // 0-100
  size?: 'small' | 'medium' | 'large';
  showPercentage?: boolean;
  color?: string;
  backgroundColor?: string;
  label?: string;
  animated?: boolean;
}

export const AnimatedProgress: React.FC<AnimatedProgressProps> = ({
  progress,
  size = 'medium',
  showPercentage = true,
  color = '#8B5CF6',
  backgroundColor = '#374151',
  label,
  animated = true,
}) => {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const progressPercentage = Math.min(Math.max(progress, 0), 100);

  const getSizeConfig = () => {
    switch (size) {
      case 'small':
        return { height: 4, fontSize: 12 };
      case 'large':
        return { height: 8, fontSize: 16 };
      default:
        return { height: 6, fontSize: 14 };
    }
  };

  const sizeConfig = getSizeConfig();

  useEffect(() => {
    if (animated) {
      Animated.timing(animatedValue, {
        toValue: progressPercentage,
        duration: 1000,
        useNativeDriver: false,
      }).start();
    } else {
      animatedValue.setValue(progressPercentage);
    }
  }, [progressPercentage, animated]);

  const getProgressColor = () => {
    if (progressPercentage >= 80) return '#10B981';
    if (progressPercentage >= 60) return '#F59E0B';
    return '#EF4444';
  };

  const progressColor = color === '#8B5CF6' ? getProgressColor() : color;

  return (
    <View className="mb-4">
      {(label || showPercentage) && (
        <View className="flex-row items-center justify-between mb-2">
          {label && (
            <Text className="text-gray-300 text-sm">{label}</Text>
          )}
          {showPercentage && (
            <Text className="text-gray-400 text-xs font-medium">
              {Math.round(progressPercentage)}%
            </Text>
          )}
        </View>
      )}

      <View 
        className="rounded-full overflow-hidden"
        style={{ 
          height: sizeConfig.height,
          backgroundColor,
        }}
      >
        <Animated.View
          style={{
            width: animatedValue.interpolate({
              inputRange: [0, 100],
              outputRange: ['0%', '100%'],
            }),
            height: '100%',
          }}
        >
          <LinearGradient
            colors={[progressColor, progressColor + '80']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            className="h-full rounded-full"
          />
        </Animated.View>
      </View>
    </View>
  );
}; 