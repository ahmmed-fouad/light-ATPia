import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { BreakfastProgress } from '../types/breakfastTypes';

interface DescriptionCardProps {
  progress: BreakfastProgress;
}

const DescriptionCard: React.FC<DescriptionCardProps> = ({ progress }) => {
  const renderMacroItem = (
    label: string,
    current: number,
    target: number,
    unit: string,
    color: string,
    color2: string,
    percentage: number
  ) => {
    return (
      <View style={styles.macroItem}>
        <View style={styles.macroHeader}>
          <Text style={styles.macroValue}>{Number(current).toFixed(1)}</Text>
          <Text style={styles.macroUnit}>{unit}</Text>
        </View>
        <View style={styles.macroLabelContainer}>
          <Text style={styles.macroLabel}>{label}</Text>
          <Text style={styles.macroLabel}>{percentage}%</Text>
        </View>
        <View style={styles.macroFooter}>
          <View
            style={[
              styles.progressBar,
              {
                backgroundColor: color2,
              },
            ]}
          >
            <View
              style={[
                styles.progressFill,
                {
                  backgroundColor: color,
                  width: `${Math.min(percentage, 100)}%`,
                },
              ]}
            />
          </View>
        </View>
      </View>
    );
  };

  const caloriesPercentage = Math.min((progress.currentKcal / progress.targetKcal) * 100, 100);
  const carbsPercentage = Math.min((progress.currentCarbs / progress.targetCarbs) * 100, 100);
  const proteinPercentage = Math.min((progress.currentProtein / progress.targetProtein) * 100, 100);
  const fatPercentage = Math.min((progress.currentFat / progress.targetFat) * 100, 100);

  return (
    <View style={styles.container}>
      <View style={styles.grid}>
        {renderMacroItem(
          "Calory gained",
          progress.currentKcal,
          progress.targetKcal,
          " kcal",
          "#18b888",
          "#e3f1d0",
          Math.round(caloriesPercentage)
        )}
        {renderMacroItem(
          "Carbs",
          progress.currentCarbs,
          progress.targetCarbs,
          "g",
          "#ef4444",
          "#f9d1d9",
          Math.round(carbsPercentage)
        )}
        {renderMacroItem(
          "Fat",
          progress.currentFat,
          progress.targetFat,
          "g",
          "#f59e0b",
          "#f9e2d2",
          Math.round(fatPercentage)
        )}
        {renderMacroItem(
          "Protein",
          progress.currentProtein,
          progress.targetProtein,
          "g",
          "#8b5cf6",
          "#e0d1fa",
          Math.round(proteinPercentage)
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f7f7f7",
    borderRadius: 20,
    padding: 30,
    marginHorizontal: 24,
    marginBottom: 30,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
  },
  macroItem: {
    width: "47%",
    borderRadius: 12,
  },
  macroHeader: {
    marginBottom: 5,
    flexDirection: "row",
    alignItems: "flex-end",
  },
  macroValue: {
    fontSize: 24,
    marginLeft: 8,
    marginRight: 4,

    fontWeight: "700",
    color: "#173430",
  },
  macroUnit: {
    fontSize: 16,
    color: "#6b7280",
    fontWeight: "500",
  },
  macroLabelContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    fontWeight: "500",
    marginLeft: 4,
    marginBottom: 16,
  },
  macroLabel: {
    fontSize: 16,
    color: "#6b7280",
    fontWeight: "800",
    marginLeft: 4,
    // marginBottom: 12,
  },
  macroFooter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  progressBar: {
    flex: 1,
    height: 3,
    backgroundColor: "#e5e7eb",
    borderRadius: 2,
    marginLeft: 8,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 2,
  },
});

export default DescriptionCard; 