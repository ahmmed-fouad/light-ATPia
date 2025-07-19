import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import CircularRuler from '../components/CircularRuler';
import StepHeader from "../components/StepHeader";
import { useFormNavigation } from "../hooks/useFormNavigation";
import StepFooterButton from "@/components/StepFooterButton";
import { useFormStore } from "../stores/formStore";

const TOTAL_STEPS = 8;
const TrackerStep7Screen = () => {
  // State for current weight, target weight and unit
  const [unit, setUnit] = React.useState<'kg' | 'lb'>('kg');
  const [targetWeight, setTargetWeight] = React.useState(72);
  const { step, nextStep, prevStep } = useFormNavigation();
  
  // Get current weight from form store
  const currentWeight = useFormStore((state) => state.data.weight) || 60;

  return (
    <View style={styles.container}>
      {/* Header */}
      <StepHeader onBack={prevStep} onSkip={nextStep} />
      {/* Step indicator */}
      <Text style={styles.stepIndicator}>7 / 8</Text>
      {/* Title */}
      <Text style={styles.title}>
        Your <Text style={styles.titleHighlight}>target weight</Text>
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
      {/* Dual weight display cards */}
      <View style={styles.weightCardsContainer}>
        {/* Current weight card */}
        <View style={styles.weightCard}>
          <Text style={styles.weightCardLabel}>Current</Text>
          <Text style={styles.weightCardValue}>{currentWeight}</Text>
        </View>
        {/* Arrow between cards */}
        <View style={styles.arrowContainer}>
          <Text style={styles.arrowText}>→</Text>
        </View>
        {/* Target weight card with green triangle */}
        <View style={styles.targetWeightCard}>
          <View style={styles.triangleDown} />
          <Text style={styles.weightCardLabel}>Target</Text>
          <Text style={styles.weightCardValue}>{targetWeight}</Text>
        </View>
      </View>
      {/* Circular ruler */}
      <View style={styles.rulerWrap}>
        <CircularRuler 
          value={targetWeight} 
          onValueChange={setTargetWeight} 
          unit={unit}
          rangeStart={currentWeight}
          rangeEnd={targetWeight}
        />
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
  weightCardsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 32,
    paddingHorizontal: 24,
  },
  weightCard: {
    backgroundColor: "#f3f4f6",
    borderRadius: 20,
    paddingHorizontal: 24,
    paddingVertical: 20,
    minWidth: 120,
    height: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  targetWeightCard: {
    backgroundColor: "#ebf6d6",
    borderRadius: 20,
    paddingHorizontal: 24,
    paddingVertical: 20,
    minWidth: 120,
    height: 100,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  weightCardLabel: {
    fontSize: 14,
    color: "#6b7280",
    fontWeight: "500",
    marginBottom: 4,
  },
  weightCardValue: {
    fontSize: 32,
    fontWeight: "700",
    color: "#1A2C23",
  },
  arrowContainer: {
    marginHorizontal: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  arrowText: {
    fontSize: 24,
    color: "#222",
    fontWeight: "600",
  },
  triangleDown: {
    width: 0,
    height: 0,
    borderLeftWidth: 8,
    borderRightWidth: 8,
    borderTopWidth: 10,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderTopColor: "#22C55E",
    position: "absolute",
    top: -8,
    alignSelf: "center",
  },
  rulerWrap: {
    width: "100%",
    height: 280,
    alignItems: "center",
    justifyContent: "flex-end",
    marginBottom: 24,
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

export default TrackerStep7Screen; 