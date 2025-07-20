import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import StepHeader from "../components/StepHeader";
import { useFormNavigation } from "../hooks/useFormNavigation";
import StepFooterButton from "../../../components/StepFooterButton";
import { useFormStore } from "../stores/formStore";

const TOTAL_STEPS = 8;

interface ProgressOption {
  id: 'hard' | 'medium' | 'easy';
  title: string;
  difficulty: string;
  difficultyColor: string;
  duration: string;
  weeklyChange: string;
  icon: string;
}

const progressOptions: ProgressOption[] = [
  {
    id: 'hard',
    title: 'Power Up',
    difficulty: 'Hard',
    difficultyColor: '#EF4444',
    duration: '4 weeks',
    weeklyChange: '+3kg / week',
    icon: '🏆',
  },
  {
    id: 'medium',
    title: 'Steady',
    difficulty: 'Medium',
    difficultyColor: '#F97316',
    duration: '8 weeks',
    weeklyChange: '+1.5kg / week',
    icon: '💡',
  },
  {
    id: 'easy',
    title: 'Relaxed',
    difficulty: 'Easy',
    difficultyColor: '#22C55E',
    duration: '16 weeks',
    weeklyChange: '+0.75kg / week',
    icon: '👍',
  },
];

const TrackerStep8Screen = () => {
  const [selectedProgress, setSelectedProgress] = React.useState<'hard' | 'medium' | 'easy'>('easy');
  const { step, nextStep, prevStep } = useFormNavigation();
  const setData = useFormStore((state) => state.setData);

  const handleProgressSelect = (progress: 'hard' | 'medium' | 'easy') => {
    setSelectedProgress(progress);
    setData({ progress });
  };

  const handleNext = () => {
    setData({ progress: selectedProgress });
    nextStep();
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <StepHeader onBack={prevStep} onSkip={nextStep} />
      {/* Step indicator */}
      <Text style={styles.stepIndicator}>8 / 8</Text>
      {/* Title */}
      <Text style={styles.title}>
        Choose the <Text style={styles.titleHighlight}>progress</Text>
      </Text>
      <Text style={styles.subtitle}>
        We will use this data to give you{"\n"}a better diet type for you
      </Text>
      
      {/* Progress Options */}
      <View style={styles.optionsContainer}>
        {progressOptions.map((option) => (
          <TouchableOpacity
            key={option.id}
            style={[
              styles.optionCard,
              selectedProgress === option.id && styles.optionCardSelected,
            ]}
            onPress={() => handleProgressSelect(option.id)}
          >
            <View style={styles.optionContent}>
              <View style={styles.optionTextContainer}>
                <Text style={styles.optionTitle}>{option.title}</Text>
                <Text style={[styles.optionDifficulty, { color: option.difficultyColor }]}>
                  {option.difficulty}
                </Text>
                <Text style={styles.optionDuration}>{option.duration}</Text>
                <Text style={styles.optionWeeklyChange}>{option.weeklyChange}</Text>
              </View>
              <View style={styles.optionIconContainer}>
                <Text style={styles.optionIcon}>{option.icon}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
      
      {/* Confirm button */}
      <View style={styles.footerBtnWrap}>
        <StepFooterButton progress={step / TOTAL_STEPS} onPress={handleNext} />
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
    marginBottom: 32,
  },
  optionsContainer: {
    width: "100%",
    paddingHorizontal: 24,
    gap: 16,
  },
  optionCard: {
    backgroundColor: "#f3f4f6",
    borderRadius: 20,
    padding: 16,
    marginBottom: 8,
  },
  optionCardSelected: {
    backgroundColor: "#ebf6d6",
  },
  optionContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  optionTextContainer: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#222",
    marginBottom: 2,
  },
  optionDifficulty: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 2,
  },
  optionDuration: {
    fontSize: 14,
    color: "#6b7280",
    marginBottom: 1,
  },
  optionWeeklyChange: {
    fontSize: 14,
    color: "#6b7280",
  },
  optionIconContainer: {
    width: 48,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
  },
  optionIcon: {
    fontSize: 24,
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

export default TrackerStep8Screen; 