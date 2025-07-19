// import React from 'react';
import { StyleSheet } from 'react-native';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { useDrawer } from '../../hooks/useDrawer';

interface DrawerGestureHandlerProps {
  children: React.ReactNode;
}

export const DrawerGestureHandler: React.FC<DrawerGestureHandlerProps> = ({
  children,
}) => {
  const { isOpen, toggle, DRAWER_WIDTH } = useDrawer();
  const translateX = useSharedValue(isOpen ? 0 : -DRAWER_WIDTH);

  const panGesture = Gesture.Pan()
    .onUpdate((event) => {
      if (isOpen) {
        // When drawer is open, allow closing by swiping left
        if (event.translationX < 0) {
          translateX.value = Math.max(-DRAWER_WIDTH, event.translationX);
        }
      } else {
        // When drawer is closed, allow opening by swiping right
        if (event.translationX > 0) {
          translateX.value = Math.min(0, event.translationX - DRAWER_WIDTH);
        }
      }
    })
    .onEnd((event) => {
      if (isOpen) {
        // If drawer is open and swiped left more than 50px, close it
        if (event.translationX < -50) {
          translateX.value = withSpring(-DRAWER_WIDTH, {
            damping: 15,
            stiffness: 100,
          });
          runOnJS(toggle)();
        } else {
          // Snap back to open position
          translateX.value = withSpring(0, {
            damping: 15,
            stiffness: 100,
          });
        }
      } else {
        // If drawer is closed and swiped right more than 50px, open it
        if (event.translationX > 50) {
          translateX.value = withSpring(0, {
            damping: 15,
            stiffness: 100,
          });
          runOnJS(toggle)();
        } else {
          // Snap back to closed position
          translateX.value = withSpring(-DRAWER_WIDTH, {
            damping: 15,
            stiffness: 100,
          });
        }
      }
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <GestureHandlerRootView style={styles.container}>
      <GestureDetector gesture={panGesture}>
        <Animated.View style={[styles.gestureArea, animatedStyle]}>
          {children}
        </Animated.View>
      </GestureDetector>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gestureArea: {
    flex: 1,
  },
}); 