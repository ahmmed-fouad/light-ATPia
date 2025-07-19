// import React from 'react';  
import { useEffect } from 'react';
import {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming
} from 'react-native-reanimated';

export const useFadeAnimation = (isVisible: boolean, duration: number = 300) => {
  const opacity = useSharedValue(0);

useEffect(() => {
    opacity.value = withTiming(isVisible ? 1 : 0, { duration });
  }, [isVisible, duration]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return animatedStyle;
};

export const useSlideAnimation = (
  isVisible: boolean,
  direction: 'up' | 'down' | 'left' | 'right' = 'up',
  distance: number = 50,
  duration: number = 300
) => {
  const translateY = useSharedValue(direction === 'up' ? distance : 0);
  const translateX = useSharedValue(direction === 'left' ? distance : 0);

  useEffect(() => {
    if (direction === 'up' || direction === 'down') {
      translateY.value = withSpring(
        isVisible ? 0 : (direction === 'up' ? distance : -distance),
        { damping: 15, stiffness: 100 }
      );
    } else {
      translateX.value = withSpring(
        isVisible ? 0 : (direction === 'left' ? distance : -distance),
        { damping: 15, stiffness: 100 }
      );
    }
  }, [isVisible, direction, distance]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: translateY.value },
      { translateX: translateX.value },
    ],
  }));

  return animatedStyle;
};

export const useScaleAnimation = (isVisible: boolean, duration: number = 300) => {
  const scale = useSharedValue(0.8);

  useEffect(() => {
    scale.value = withSpring(isVisible ? 1 : 0.8, {
      damping: 15,
      stiffness: 100,
    });
  }, [isVisible]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return animatedStyle;
};

export const useBounceAnimation = (isVisible: boolean) => {
  const scale = useSharedValue(0.3);

  useEffect(() => {
    scale.value = withSpring(isVisible ? 1 : 0.3, {
      damping: 8,
      stiffness: 100,
    });
  }, [isVisible]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return animatedStyle;
};

export const useDrawerAnimation = (isOpen: boolean, drawerWidth: number) => {
  const translateX = useSharedValue(-drawerWidth);
  const overlayOpacity = useSharedValue(0);

  useEffect(() => {
    if (isOpen) {
      translateX.value = withSpring(0, { damping: 15, stiffness: 100 });
      overlayOpacity.value = withTiming(0.5, { duration: 300 });
    } else {
      translateX.value = withSpring(-drawerWidth, { damping: 15, stiffness: 100 });
      overlayOpacity.value = withTiming(0, { duration: 300 });
    }
  }, [isOpen, drawerWidth]);

  const drawerStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const overlayStyle = useAnimatedStyle(() => ({
    opacity: overlayOpacity.value,
  }));

  return { drawerStyle, overlayStyle };
}; 