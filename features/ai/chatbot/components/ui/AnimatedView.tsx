// import React from 'react';
import { useEffect } from 'react';
import { ViewProps } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming
} from 'react-native-reanimated';

interface AnimatedViewProps extends ViewProps {
  children: React.ReactNode;
  animationType?: 'fade' | 'slide' | 'scale' | 'bounce';
  duration?: number;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  isVisible?: boolean;
}

export const AnimatedView: React.FC<AnimatedViewProps> = ({
  children,
  animationType = 'fade',
  duration = 300,
  delay = 0,
  direction = 'up',
  isVisible = true,
  style,
  ...props
}) => {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(50);
  const translateX = useSharedValue(0);
  const scale = useSharedValue(0.8);

  useEffect(() => {
    if (isVisible) {
      opacity.value = withTiming(1, { duration });
      
      if (animationType === 'slide') {
        translateY.value = withSpring(0, { damping: 15, stiffness: 100 });
      } else if (animationType === 'scale') {
        scale.value = withSpring(1, { damping: 15, stiffness: 100 });
      } else if (animationType === 'bounce') {
        scale.value = withSpring(1, { damping: 8, stiffness: 100 });
      }
    } else {
      opacity.value = withTiming(0, { duration });
      translateY.value = withTiming(50, { duration });
      scale.value = withTiming(0.8, { duration });
    }
  }, [isVisible, animationType, duration, delay]);

  const animatedStyle = useAnimatedStyle(() => {
    const baseStyle = {
      opacity: opacity.value,
      transform: [
        { translateY: translateY.value },
        { translateX: translateX.value },
        { scale: scale.value },
      ],
    };

    return baseStyle;
  });

  return (
    <Animated.View style={[animatedStyle, style]} {...props}>
      {children}
    </Animated.View>
  );
}; 