import React, { useRef, useEffect } from "react";
import { View, Text, Animated, StyleSheet, Dimensions } from "react-native";
import { PanGestureHandler, State, GestureHandlerRootView } from "react-native-gesture-handler";

const { width: screenWidth } = Dimensions.get("window");
const RULER_WIDTH = Math.round(screenWidth);
const RULER_HEIGHT = 200;

// Circle configuration
const CIRCLE_RADIUS = Math.round(RULER_WIDTH * 0.95); // Larger radius for better fit
const FULL_CIRCLE = 360;
const VISIBLE_ARC = 100; // Degrees of visible arc
const MIN_VALUE = 10;
const MAX_VALUE = 300;
const STEP = 2;
const MAJOR_TICK_EVERY = 10;

// Calculate total steps correctly
const TOTAL_STEPS = Math.floor((MAX_VALUE - MIN_VALUE) / STEP) + 1;

function degToRad(deg: number) {
  return (deg * Math.PI) / 180;
}

function radToDeg(rad: number) {
  return (rad * 180) / Math.PI;
}

interface CircularRulerProps {
  value: number;
  onValueChange: (val: number) => void;
  unit?: string;
  rangeStart?: number;
  rangeEnd?: number;
}

const CircularRuler: React.FC<CircularRulerProps> = ({ value, onValueChange, unit, rangeStart, rangeEnd }) => {
  const values = Array.from({ length: TOTAL_STEPS }, (_, i) => MIN_VALUE + i * STEP);
  const selectedIndex = values.indexOf(value);
  
  // Animation value for rotation
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const lastRotation = useRef(0);
  
  // Calculate initial rotation based on selected value
  useEffect(() => {
    const initialRotation = -(selectedIndex / (TOTAL_STEPS - 1)) * FULL_CIRCLE;
    rotateAnim.setValue(initialRotation);
    lastRotation.current = initialRotation;
  }, [selectedIndex, value]);

  const onGestureEvent = Animated.event(
    [{ nativeEvent: { translationX: rotateAnim } }],
    { useNativeDriver: true }
  );

  const onHandlerStateChange = (event: any) => {
    if (event.nativeEvent.state === State.END) {
      // Calculate which value is closest to center
      const currentRotation = lastRotation.current + event.nativeEvent.translationX;
      const normalizedRotation = (currentRotation % FULL_CIRCLE + FULL_CIRCLE) % FULL_CIRCLE;
      const progress = 1 - (normalizedRotation / FULL_CIRCLE);
      const index = Math.round(progress * (TOTAL_STEPS - 1));
      const clampedIndex = Math.max(0, Math.min(TOTAL_STEPS - 1, index));
      const newValue = values[clampedIndex];
      
      if (newValue !== value) {
        onValueChange(newValue);
      }
      
      // Animate to snapped position - ensure it snaps to exact tick position
      const targetRotation = -(clampedIndex / (TOTAL_STEPS - 1)) * FULL_CIRCLE;
      lastRotation.current = targetRotation;
      
      Animated.spring(rotateAnim, {
        toValue: targetRotation,
        useNativeDriver: true,
        tension: 100,
        friction: 8,
      }).start();
    }
  };

  // Container dimensions
  const containerWidth = RULER_WIDTH;
  const containerHeight = RULER_HEIGHT;
  
  // True circle center (where the red dot should be) - positioned below the box
  const trueCenterX = containerWidth - 407;
  const trueCenterY = containerHeight - 120; // Position closer to the bottom, below the box
  
  // Container center (default transform origin)
  const containerCenterX = containerWidth / 2;
  const containerCenterY = containerHeight / 2;
  
  // Calculate offset from container center to true center
  const offsetX = trueCenterX - containerCenterX;
  const offsetY = trueCenterY - containerCenterY;

  // Generate ticks and labels for the full circle
  const ticks = values.map((val, i) => {
    // Distribute evenly around the full circle
    const angle = (i / (TOTAL_STEPS - 1)) * FULL_CIRCLE;
    const isMajor = i % MAJOR_TICK_EVERY === 0;
    return { val, angle, isMajor };
  });

  // Green indicator position (top center of visible arc)
  const indicatorAngle = 0; // Top center
  const indicatorRad = degToRad(indicatorAngle);
  const indicatorX = trueCenterX + (CIRCLE_RADIUS - 60) * Math.cos(indicatorRad);
  const indicatorY = trueCenterY + (CIRCLE_RADIUS - 60) * Math.sin(indicatorRad);

  return (
    <GestureHandlerRootView 
      style={styles.container}
    >
      <PanGestureHandler
        onGestureEvent={onGestureEvent}
        onHandlerStateChange={onHandlerStateChange}
      >
        <Animated.View style={[styles.circleContainer, {
          // Position the container so the true center aligns with transform origin
          left: offsetX,
          top: offsetY,
          width: CIRCLE_RADIUS * 2,
          height: CIRCLE_RADIUS * 2,
          transform: [
            { rotate: rotateAnim.interpolate({
              inputRange: [-FULL_CIRCLE, 0],
              outputRange: [`-${FULL_CIRCLE}deg`, '0deg'],
              extrapolate: 'clamp',
            }) }
          ]
        }]}>
          {/* Ticks */}
          {ticks.map((tick, i) => {
            const rad = degToRad(tick.angle);
            const tickRadius = CIRCLE_RADIUS - (tick.isMajor ? 20 : 15);
            const x = CIRCLE_RADIUS + tickRadius * Math.cos(rad);
            const y = CIRCLE_RADIUS + tickRadius * Math.sin(rad);
            
            // Check if this tick is within the range
            const isInRange = rangeStart !== undefined && rangeEnd !== undefined && 
              tick.val >= Math.min(rangeStart, rangeEnd) && 
              tick.val <= Math.max(rangeStart, rangeEnd);
            
            return (
              <View
                key={`tick-${i}`}
                style={[
                  styles.tick,
                  {
                    left: x - (tick.isMajor ? 2 : 1),
                    top: y - (tick.isMajor ? 15 : 7.5),
                    width: tick.isMajor ? 4 : 2,
                    height: tick.isMajor ? 30 : 15,
                    backgroundColor: tick.isMajor 
                      ? (tick.val === value ? '#22C55E' : (isInRange ? '#22C55E' : '#222'))
                      : (isInRange ? '#22C55E' : '#B0B0B0'),
                    opacity: tick.isMajor ? 1 : (isInRange ? 0.8 : 0.6),
                    transform: [
                      { translateX: 0 },
                      { translateY: 0 },
                      { rotate: `${tick.angle + 90}deg` }, // Rotate to be radial
                    ],
                  },
                ]}
              />
            );
          })}
          
          {/* Labels */}
          {ticks.map((tick, i) => {
            if (!tick.isMajor) return null;
            
            const rad = degToRad(tick.angle);
            const labelRadius = CIRCLE_RADIUS - 50;
            const x = CIRCLE_RADIUS + labelRadius * Math.cos(rad);
            const y = CIRCLE_RADIUS + labelRadius * Math.sin(rad);
            
            // Check if this label is within the range
            const isInRange = rangeStart !== undefined && rangeEnd !== undefined && 
              tick.val >= Math.min(rangeStart, rangeEnd) && 
              tick.val <= Math.max(rangeStart, rangeEnd);
            
            return (
              <Text
                key={`label-${i}`}
                style={[
                  styles.label,
                  {
                    left: x - 20,
                    top: y - 10,
                    color: tick.val === value ? '#22C55E' : (isInRange ? '#22C55E' : '#222'),
                    fontWeight: tick.val === value ? '700' : (isInRange ? '600' : '500'),
                    fontSize: tick.val === value ? 20 : (isInRange ? 18 : 16),
                    transform: [
                      { rotate: `${tick.angle}deg` }, // Keep text upright
                    ],
                  },
                ]}
              >
                {tick.val}
              </Text>
            );
          })}
        </Animated.View>
      </PanGestureHandler>
      
      {/* Green indicator (fixed at top center) */}
      <View
        style={[
          styles.indicator,
          {
            left: indicatorX - 156,
            top: indicatorY - 110,
            width: 4,
            height: 50,
            backgroundColor: '#22C55E',
            borderRadius: 6,
            zIndex: 2,
          },
        ]}
      />
      
      {/* Red center dot to show rotation anchor point */}
      <View
        style={[
          styles.centerDot,
          {
            left: trueCenterX - 5,
            top: trueCenterY - 5,
            width: 10,
            height: 10,
            // backgroundColor: '#FF0000',
            borderRadius: 5,
            zIndex: 3,
          },
        ]}
      />
      
      {/* Mask to show only the visible arc */}
      <View style={styles.maskLeft} />
      <View style={styles.maskRight} />
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: RULER_WIDTH,
    height: RULER_HEIGHT , // Adjusted height for new positioning
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',

  },
  circleContainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tick: {
    position: 'absolute',
    backgroundColor: '#B0B0B0',
    borderRadius: 1,
  },
  label: {
    position: 'absolute',
    textAlign: 'center',
    width: 40,
  },
  indicator: {
    position: 'absolute',
  },
  centerDot: {
    position: 'absolute',
  },
  maskLeft: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '25%',
    height: RULER_HEIGHT,
    backgroundColor: '#fff',
    zIndex: 1,
  },
  maskRight: {
    position: 'absolute',
    right: 0,
    top: 0,
    width: '25%',
    height: RULER_HEIGHT,
    backgroundColor: '#fff',
    zIndex: 1,
  },
});

export default CircularRuler; 