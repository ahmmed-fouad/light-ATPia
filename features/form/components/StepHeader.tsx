import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ChevronLeft } from 'lucide-react-native';

interface StepHeaderProps {
  onBack: () => void;
  onSkip: () => void;
}

const StepHeader: React.FC<StepHeaderProps> = ({ onBack, onSkip }) => (
  <View style={styles.container}>
    <TouchableOpacity onPress={onBack} style={styles.iconBtn}>
      <ChevronLeft size={28} color="#222" />
    </TouchableOpacity>
    <View style={styles.spacer} />
    <TouchableOpacity onPress={onSkip} style={styles.skipBtn}>
      <Text style={styles.skipText}>Skip</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 32,
    marginBottom: 24,
    paddingHorizontal: 20,
  },
  iconBtn: {
    width: 44,
    height: 44,
    borderRadius: 42,
    backgroundColor: "#f7f7f7",
    padding: 35,
    alignItems: "center",
    justifyContent: "center",
  },
  spacer: {
    flex: 1,
  },
  skipBtn: {
    backgroundColor: "#f7f7f7",
    borderRadius: 30,
    paddingHorizontal: 38,
    paddingVertical: 25,
  },
  skipText: {
    color: "#6B7280",
    fontWeight: "500",
    fontSize: 16,
  },
});

export default StepHeader; 