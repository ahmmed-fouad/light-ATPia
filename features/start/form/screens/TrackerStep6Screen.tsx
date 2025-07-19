import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import CircularRuler from '../components/CircularRuler';
import StepHeader from "../components/StepHeader";
import { useFormNavigation } from "../hooks/useFormNavigation";
import StepFooterButton from "@/components/StepFooterButton";

const TOTAL_STEPS = 8;
const TrackerStep6Screen = () => {
  // Placeholder state for selected weight and unit
  const [unit, setUnit] = React.useState<'kg' | 'lb'>('kg');
  const [weight, setWeight] = React.useState(60);
  const { step, nextStep, prevStep } = useFormNavigation();

  return (
    <View style={styles.container}>
      {/* Header */}
      <StepHeader onBack={prevStep} onSkip={nextStep} />
      {/* Step indicator */}
      <Text style={styles.stepIndicator}>6 / 8</Text>
      {/* Title */}
      <Text style={styles.title}>
        Your <Text style={styles.titleHighlight}>current weight</Text>
      </Text>
      <Text style={styles.subtitle}>
        We will use this data to give you{"\n"}a better diet type for you
      </Text>
      {/* Unit toggle */}
      <View style={styles.unitToggle}>
        <TouchableOpacity
          style={[
            styles.unitButton,
            unit === "kg" && styles.unitButtonSelected,
          ]}
          onPress={() => setUnit("kg")}
        >
          <Text
            style={[
              styles.unitButtonText,
              unit === "kg" && styles.unitButtonTextSelected,
            ]}
          >
            kg
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.unitButton,
            unit === "lb" && styles.unitButtonSelected,
          ]}
          onPress={() => setUnit("lb")}
        >
          <Text
            style={[
              styles.unitButtonText,
              unit === "lb" && styles.unitButtonTextSelected,
            ]}
          >
            lb
          </Text>
        </TouchableOpacity>
      </View>
      {/* Selected value card */}
      <View style={styles.selectedCardWrap}>
        <View style={styles.arrowDown} />
        <View style={styles.selectedCard}>
          <Text style={styles.selectedCardText}>{weight}</Text>
        </View>
      </View>
      {/* Circular ruler */}
      <View style={styles.rulerWrap}>
        <CircularRuler value={weight} onValueChange={setWeight} unit={unit} />
      </View>
      {/* Confirm button */}
      <View style={styles.footerBtnWrap}>
        <StepFooterButton progress={step / TOTAL_STEPS} onPress={nextStep} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  centerArea: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  // header: {
  //   width: "100%",
  //   flexDirection: "row",
  //   justifyContent: "space-between",
  //   alignItems: "center",
  //   paddingHorizontal: 24,
  //   marginBottom: 12,
  // },
  // backBtn: {
  //   width: 48,
  //   height: 48,
  //   borderRadius: 24,
  //   backgroundColor: "#f3f4f6",
  //   alignItems: "center",
  //   justifyContent: "center",
  // },
  // backArrow: {
  //   fontSize: 28,
  //   color: "#222",
  // },
  // skipBtn: {
  //   minWidth: 80,
  //   height: 48,
  //   borderRadius: 18,
  //   backgroundColor: "#f3f4f6",
  //   alignItems: "center",
  //   justifyContent: "center",
  //   paddingHorizontal: 16,
  // },
  // skipText: {
  //   fontSize: 16,
  //   color: "#222",
  //   fontWeight: "500",
  // },
  stepIndicator: {
    marginTop: 8,
    fontSize: 14,
    color: "#6b7280",
    fontWeight: "500",
    textAlign: "center",
  },
  title: {
    marginTop: 16,
    fontSize: 24,
    fontWeight: "600",
    color: "#222",
    textAlign: "center",
  },
  titleHighlight: {
    color: "#22C55E",
    fontWeight: "700",
  },
  subtitle: {
    marginTop: 8,
    fontSize: 15,
    color: "#6b7280",
    textAlign: "center",
    marginBottom: 24,
  },
  unitToggle: {
    flexDirection: "row",
    backgroundColor: "#f3f4f6",
    borderRadius: 18,
    padding: 4,
    marginBottom: 32,
  },
  unitButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 18,
  },
  unitButtonSelected: {
    backgroundColor: "#22C55E",
    borderRadius: 18,
    width: 60,
  },
  unitButtonText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#6b7280",
  },
  unitButtonTextSelected: {
    color: "#fff",
    fontWeight: "600",
  },
  selectedCardWrap: {
    alignItems: "center",
    marginBottom: 8,
  },
  arrowDown: {
    width: 0,
    height: 0,
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderTopWidth: 12,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderTopColor: "#22C55E",
    marginTop: -4,
    marginBottom: 8,
  },
  selectedCard: {
    backgroundColor: "#ebf6d6",
    borderRadius: 20,
    paddingHorizontal: 32,
    paddingVertical: 24,
    minWidth: 140,
    height: 110,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 4,
  },
  selectedCardText: {
    fontSize: 40,
    fontWeight: "700",
    color: "#1A2C23",
  },
  rulerWrap: {
    width: "100%",
    height: 280,
    alignItems: "center",
    justifyContent: "flex-end",
    marginBottom: 24,
  },
  rulerPlaceholder: {
    width: 320,
    height: 160,
    borderRadius: 160,
    backgroundColor: "#f3f4f6",
    opacity: 0.5,
  },
  footerBtnWrap: {
    position: "absolute",
    bottom: 36,
    left: 0,
    right: 0,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default TrackerStep6Screen; 