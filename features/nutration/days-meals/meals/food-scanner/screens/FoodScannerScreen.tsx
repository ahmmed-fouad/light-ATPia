import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import MaskedView from '@react-native-masked-view/masked-view';
import { BlurView } from 'expo-blur';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { Animated, Dimensions, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const { width, height } = Dimensions.get('window');
const FRAME_SIZE = width * 0.8;
const FRAME_HEIGHT = FRAME_SIZE + 100;
const FRAME_BORDER = 4;
// const CARD_HEIGHT = 120;
const FRAME_RADIUS = 24;

const FoodScannerScreen: React.FC = () => {
  const router = useRouter();
  const [permission, requestPermission] = useCameraPermissions();
  const [torch, setTorch] = useState(false);
  const [objectFound, setObjectFound] = useState(false); // Simulate detection
  const scanAnim = useRef(new Animated.Value(0)).current;
  const [topBarHeight, setTopBarHeight] = useState(0);
  const [bottomCardHeight, setBottomCardHeight] = useState(0);
  const [scanDirection, setScanDirection] = useState<'down' | 'up'>('down');
  const shadowUpOpacity = useRef(new Animated.Value(0)).current;
  const shadowDownOpacity = useRef(new Animated.Value(1)).current;
  const prevScanValue = useRef(0);

  useEffect(() => {
    if (!permission) requestPermission();
    Animated.loop(
      Animated.sequence([
        Animated.timing(scanAnim, {
          toValue: 1.25,
          duration: 2500,
          useNativeDriver: true,
        }),
        Animated.timing(scanAnim, {
          toValue: 0,
          duration: 2500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  useEffect(() => {
    const id = scanAnim.addListener(({ value }) => {
      if (value > prevScanValue.current && scanDirection !== 'down') {
        setScanDirection('down');
        Animated.timing(shadowDownOpacity, { toValue: 0, duration: 350, useNativeDriver: true }).start();
        Animated.timing(shadowUpOpacity, { toValue: 1, duration: 350, useNativeDriver: true }).start();
      } else if (value < prevScanValue.current && scanDirection !== 'up') {
        setScanDirection('up');
        Animated.timing(shadowDownOpacity, { toValue: 1, duration: 350, useNativeDriver: true }).start();
        Animated.timing(shadowUpOpacity, { toValue: 0, duration: 350, useNativeDriver: true }).start();
      }
      prevScanValue.current = value;
    });
    return () => scanAnim.removeListener(id);
  }, [scanDirection]);

  if (!permission || !permission.granted) {
    return (
      <View style={styles.center}>
        <Text>No access to camera</Text>
        <TouchableOpacity onPress={requestPermission}>
          <Text style={{ color: '#18b888', marginTop: 12 }}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const scanLineTranslate = scanAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, FRAME_SIZE - 4],
  });

  const availableHeight = height - topBarHeight - bottomCardHeight;
  const scanAreaY = topBarHeight + (availableHeight - FRAME_HEIGHT) / 4.1 + FRAME_BORDER + (FRAME_RADIUS - FRAME_BORDER);

  return (
    <View style={styles.root}>
      <CameraView
        style={StyleSheet.absoluteFill}
        facing="back"
        ratio={Platform.OS === "ios" ? "16:9" : undefined}
        enableTorch={torch}
      />
      {/* Masked Blur Overlay with SVG mask */}
      <MaskedView
        style={StyleSheet.absoluteFill}
        maskElement={
          <Svg width={width} height={height}>
            <Path
              fill="white"
              fillRule="evenodd"
              d={`
                M0,0
                H${width}
                V${height}
                H0
                V0
                Z
                M${(width - FRAME_SIZE) / 2 + FRAME_BORDER},${scanAreaY}
                a${FRAME_RADIUS - FRAME_BORDER},${FRAME_RADIUS - FRAME_BORDER} 0 0 1 ${FRAME_RADIUS - FRAME_BORDER},-${FRAME_RADIUS - FRAME_BORDER}
                h${FRAME_SIZE - 2 * FRAME_BORDER - 2 * (FRAME_RADIUS - FRAME_BORDER)}
                a${FRAME_RADIUS - FRAME_BORDER},${FRAME_RADIUS - FRAME_BORDER} 0 0 1 ${FRAME_RADIUS - FRAME_BORDER},${FRAME_RADIUS - FRAME_BORDER}
                v${FRAME_HEIGHT - 2 * FRAME_BORDER - 2 * (FRAME_RADIUS - FRAME_BORDER)}
                a${FRAME_RADIUS - FRAME_BORDER},${FRAME_RADIUS - FRAME_BORDER} 0 0 1 -${FRAME_RADIUS - FRAME_BORDER},${FRAME_RADIUS - FRAME_BORDER}
                h-${FRAME_SIZE - 2 * FRAME_BORDER - 2 * (FRAME_RADIUS - FRAME_BORDER)}
                a${FRAME_RADIUS - FRAME_BORDER},${FRAME_RADIUS - FRAME_BORDER} 0 0 1 -${FRAME_RADIUS - FRAME_BORDER},-${FRAME_RADIUS - FRAME_BORDER}
                z
              `}
            />
          </Svg>
        }
      >
        <>
          <BlurView
            style={StyleSheet.absoluteFill}
            intensity={50}
            tint="light"
            pointerEvents="none"
          />
          <View
            pointerEvents="none"
            style={{
              ...StyleSheet.absoluteFillObject,
              backgroundColor: "#90a0a0",
              opacity: 0.55,
            }}
          />
        </>
      </MaskedView>
      {/* Overlay UI */}
      <View style={styles.overlay} pointerEvents="box-none">
        {/* Top Bar */}
        <View style={styles.topBar} onLayout={e => setTopBarHeight(e.nativeEvent.layout.height)}>
          <TouchableOpacity
            style={styles.iconBtn}
            onPress={() => router.back()}
          >
            <Feather name="chevron-left" size={28} color="#173430" />
          </TouchableOpacity>
          <Text style={styles.title}>Scan meal</Text>
          <TouchableOpacity
            style={[
              {
                backgroundColor: torch ? "#ff8c39" : "#fff",
                padding: 15,
                borderRadius: 44,
              },
            ]}
            onPress={() => setTorch(t => !t)}
          >
            <MaterialCommunityIcons
              name={torch ? "flash" : "flash-off"}
              size={28}
              color={torch ? "#fff" : "#ff8c39"}
            />
          </TouchableOpacity>
        </View>
        {/* Scan Frame */}
        <View style={styles.centerArea}>
          <View style={styles.frameContainer}>
            <View style={styles.frame}>
              {/* Corner Borders */}
              <View style={[styles.corner, styles.topLeft]} />
              <View style={[styles.corner, styles.topRight]} />
              <View style={[styles.corner, styles.bottomLeft]} />
              <View style={[styles.corner, styles.bottomRight]} />
              {/* Scan Line with Shadow */}
              <Animated.View
                style={[
                  styles.scanLine,
                  { transform: [{ translateY: scanLineTranslate }] },
                  objectFound && { backgroundColor: "rgba(163, 230, 53, 0.3)" },
                ]}
              >
                <Animated.View style={[styles.scanShadowDown, { opacity: shadowDownOpacity }]}>
                  <LinearGradient
                    colors={['rgba(162,230,53,0.45)', 'rgba(162,230,53,0)']}
                    style={StyleSheet.absoluteFill}
                    pointerEvents="none"
                  />
                </Animated.View>
                <Animated.View style={[styles.scanShadowUp, { opacity: shadowUpOpacity }]}>
                  <LinearGradient
                    colors={['rgba(162,230,53,0)', 'rgba(162,230,53,0.45)']}
                    style={StyleSheet.absoluteFill}
                    pointerEvents="none"
                  />
                </Animated.View>
              </Animated.View>
            </View>
          </View>
        </View>
        {/* Bottom Card */}
        <View style={styles.bottomCard} onLayout={e => setBottomCardHeight(e.nativeEvent.layout.height)}>
          {objectFound ? (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={{ fontSize: 32, marginRight: 12 }}>🍗</Text>
              <View style={{ flex: 1 }}>
                <Text style={styles.foodName}>Chicken thigh</Text>
                <Text style={styles.serving}>1 serving</Text>
                <View style={styles.macrosRow}>
                  <Text style={[styles.macro, { color: "#22c55e" }]}>
                    152 kcal
                  </Text>
                  <Text style={[styles.macro, { color: "#f472b6" }]}>0 g</Text>
                  <Text style={[styles.macro, { color: "#fbbf24" }]}>8 g</Text>
                  <Text style={[styles.macro, { color: "#8b5cf6" }]}>13 g</Text>
                </View>
              </View>
              <Feather name="plus" size={28} color="#18b888" />
            </View>
          ) : (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Feather
                name="alert-triangle"
                size={32}
                color="#fbbf24"
                style={{ marginRight: 12 }}
              />
              <View>
                <Text style={styles.notFoundTitle}>Object not found</Text>
                <Text style={styles.notFoundDesc}>
                  place your food inside the frame
                </Text>
              </View>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#000",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "space-between",
  },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 26,
    paddingHorizontal: 24,
    // marginBottom: 2,
  },
  iconBtn: {
    padding: 15,
    borderRadius: 44,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#173430",
  },
  centerArea: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  frameContainer: {
    alignItems: "center",
    justifyContent: "center",
    height: FRAME_SIZE + 8,
  },
  frame: {
    width: FRAME_SIZE,
    height: FRAME_SIZE + 100,
    borderRadius: 24,
    // borderWidth: FRAME_BORDER, // Remove full border
    // borderColor: '#fff',
    // overflow: 'hidden',
    backgroundColor: "rgba(255, 255, 255, 0)",
  },
  scanLine: {
    position: "absolute",
    left: -10,
    right: 0,
    top: 0,
    bottom: 0,
    height: 8,
    width: FRAME_SIZE + 20,
    backgroundColor: "#d8edac",
  },
  corner: {
    position: "absolute",
    width: 66,
    height: 75,
    zIndex: 2,
  },
  topLeft: {
    top: 0,
    left: 0,
    borderTopWidth: 4,
    borderLeftWidth: 4,
    borderColor: "#fff",
    borderTopLeftRadius: 24,
  },
  topRight: {
    top: 0,
    right: 0,
    borderTopWidth: 4,
    borderRightWidth: 4,
    borderColor: "#fff",
    borderTopRightRadius: 24,
  },
  bottomLeft: {
    bottom: 0,
    left: 0,
    borderBottomWidth: 4,
    borderLeftWidth: 4,
    borderColor: "#fff",
    borderBottomLeftRadius: 24,
  },
  bottomRight: {
    bottom: 0,
    right: 0,
    borderBottomWidth: 4,
    borderRightWidth: 4,
    borderColor: "#fff",
    borderBottomRightRadius: 24,
  },
  bottomCard: {
    backgroundColor: "#fff",
    borderRadius: 24,
    marginHorizontal: 18,
    marginBottom: 14,
    padding: 22,
    // minHeight: CARD_HEIGHT,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  notFoundTitle: {
    color: "#173430",
    fontWeight: "700",
    fontSize: 18,
    marginBottom: 2,
  },
  notFoundDesc: {
    color: "#64748b",
    fontSize: 15,
    fontWeight: "400",
  },
  foodName: {
    color: "#173430",
    fontWeight: "700",
    fontSize: 18,
    marginBottom: 2,
  },
  serving: {
    color: "#64748b",
    fontSize: 15,
    fontWeight: "400",
    marginBottom: 6,
  },
  macrosRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  macro: {
    fontWeight: "700",
    fontSize: 15,
    marginRight: 8,
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#000",
  },

  maskHole: {
    position: "absolute",
    backgroundColor: "transparent",
    // The rest is set inline
  },
  scanShadowDown: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 8,
    height: 64,
  },
  scanShadowUp: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 8,
    height: 64,
  },
});

export default FoodScannerScreen; 