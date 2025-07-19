import { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { router } from "expo-router";
import Svg, { Circle, Defs, LinearGradient, Stop } from "react-native-svg";
import Animated, { useSharedValue, withTiming, useAnimatedProps, runOnJS } from "react-native-reanimated";

const TOTAL_STEPS = 9;
const PROGRESS_DURATION = 4000; // 4 seconds
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const TrackerStep9Screen = () => {
  const radius = 60;
  const strokeWidth = 8;
  const circumference = 2 * Math.PI * radius;
  const progress = useSharedValue(0.75); // Start at 25% progress (0.75 = 75% remaining)
  const [done, setDone] = useState(false);

  useEffect(() => {
    progress.value = withTiming(0, { duration: PROGRESS_DURATION }, (finished) => {
      if (finished) runOnJS(setDone)(true);
    });
  }, []);

  useEffect(() => {
    if (done) {
      router.push("/(main)/home");
    }
  }, [done]);

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: progress.value * circumference,
  }));

  return (
    <View style={styles.container}>
      {/* Background curved lines */}
      <View style={styles.curvedLines} />
      {/* Circular Progress */}
      <View style={styles.progressContainer}>
        <Svg width={200} height={200}>
          <Defs>
            <LinearGradient id="innerGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <Stop offset="0%" stopColor="#22C55E" stopOpacity="0.8" />
              <Stop offset="100%" stopColor="#16A34A" stopOpacity="1" />
            </LinearGradient>
          </Defs>
          {/* Outer progress ring */}
          <Circle
            cx="100"
            cy="100"
            r={radius}
            stroke="#E5F4E5"
            strokeWidth={strokeWidth}
            fill="none"
          />
          {/* Animated progress ring */}
          <AnimatedCircle
            cx="100"
            cy="100"
            r={radius}
            stroke="#22C55E"
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={circumference}
            strokeLinecap="round"
            transform="rotate(-90 100 100)"
            animatedProps={animatedProps}
          />
          {/* Inner circle with gradient */}
          <Circle
            cx="100"
            cy="100"
            r={radius - strokeWidth - 10}
            fill="url(#innerGradient)"
          />
        </Svg>
        {/* Bar chart icon */}
        <View style={styles.iconContainer}>
          <View style={styles.barChart}>
            <View style={[styles.bar, styles.bar1]} />
            <View style={[styles.bar, styles.bar2]} />
            <View style={[styles.bar, styles.bar3]} />
          </View>
        </View>
      </View>
      {/* Title */}
      <Text style={styles.title}>Saving your information</Text>
      {/* Subtitle */}
      <Text style={styles.subtitle}>
        Securing your data and creating{"\n"}your personalized nutrition plan...
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  curvedLines: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 200,
    height: 200,
    backgroundColor: "transparent",
    borderTopLeftRadius: 100,
    borderWidth: 1,
    borderColor: "#f3f4f6",
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  progressContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 40,
  },
  iconContainer: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
  barChart: {
    flexDirection: "row",
    alignItems: "flex-end",
    height: 40,
    gap: 4,
  },
  bar: {
    backgroundColor: "#fff",
    borderRadius: 2,
    width: 6,
  },
  bar1: {
    height: 16,
  },
  bar2: {
    height: 24,
  },
  bar3: {
    height: 32,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#222",
    textAlign: "center",
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 15,
    color: "#6b7280",
    textAlign: "center",
    lineHeight: 22,
  },
});

export default TrackerStep9Screen; 