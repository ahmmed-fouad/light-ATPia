import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface Macro {
  label: string;
  value: number;
  unit: string;
  percent: number;
  color: string;
}

interface MacroSummaryProps {
  macros: Macro[];
}

const MacroSummary: React.FC<MacroSummaryProps> = ({ macros }) => {
  return (
    <View style={styles.container}>
      {macros.map((macro) => (
        <View key={macro.label} style={styles.card}>
          <View style={styles.row}>
            <Text style={styles.value}>{macro.value}</Text>
            <Text style={styles.unit}>{macro.unit}</Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
            <Text style={styles.label}>{macro.label}</Text>
            <Text style={[styles.percent, { color: macro.color }]}>{macro.percent}%</Text>
          </View>
          <View style={styles.progressBarBg}>
            <View style={[styles.progressBar, { width: `${macro.percent}%`, backgroundColor: macro.color }]} />
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 16,
    marginBottom: 12,
    marginTop: 8,
    gap: 2,
  },
  card: {
    flex: 1,
    backgroundColor: "#f7f7f7",
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 30,
    alignItems: "flex-start",
  },
  row: {
    flexDirection: "row",
    alignItems: "flex-end",
  },
  value: {
    fontSize: 22,
    fontWeight: "700",
    color: "#173430",
    marginRight: 4,
  },
  unit: {
    fontSize: 16,
    color: "#778f8b",
    fontWeight: "500",
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#173430",
    marginTop: 2,
    marginBottom: 6,
  },
  progressBarBg: {
    width: "100%",
    height: 3,
    backgroundColor: "#E5E7EB",
    borderRadius: 3,
    marginBottom: 2,
  },
  progressBar: {
    height: 3,
    borderRadius: 3,
  },
  percent: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 2,
  },
});

export default MacroSummary; 