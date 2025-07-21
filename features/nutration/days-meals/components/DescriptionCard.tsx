import { Feather } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { BreakfastProgress } from '../types/breakfastTypes';

interface DescriptionCardProps {
  progress: BreakfastProgress;
}

const DescriptionCard: React.FC<DescriptionCardProps> = ({ progress }) => {
  const renderMacroItem = (
    icon: string,
    color: string,
    label: string,
    current: number,
    target: number,
    unit: string
  ) => {
    const percentage = Math.min((current / target) * 100, 100);
    
    return (
      <View style={styles.macroItem}>
        <View style={[styles.iconContainer, { backgroundColor: color }]}>
          <Feather name={icon as any} size={16} color="#fff" />
        </View>
        <View style={styles.macroInfo}>
          <Text style={styles.macroLabel}>{label}</Text>
          <Text style={styles.macroValue}>
            {current}{unit} / {target}{unit}
          </Text>
          <View style={styles.progressBar}>
            <View 
              style={[
                styles.progressFill, 
                { 
                  backgroundColor: color, 
                  width: `${percentage}%` 
                }
              ]} 
            />
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Today's Summary</Text>
        <Text style={styles.subtitle}>Your nutrition breakdown</Text>
      </View>
      
      <View style={styles.content}>
        {renderMacroItem(
          'zap',
          '#18b888',
          'Calories',
          progress.currentKcal,
          progress.targetKcal,
          ' kcal'
        )}
        {renderMacroItem(
          'leaf',
          '#10b981',
          'Carbohydrates',
          progress.currentCarbs,
          progress.targetCarbs,
          'g'
        )}
        {renderMacroItem(
          'droplet',
          '#3b82f6',
          'Protein',
          progress.currentProtein,
          progress.targetProtein,
          'g'
        )}
        {renderMacroItem(
          'zap',
          '#f59e0b',
          'Fat',
          progress.currentFat,
          progress.targetFat,
          'g'
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    marginHorizontal: 24,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#173430',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '500',
  },
  content: {
    gap: 16,
  },
  macroItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  macroInfo: {
    flex: 1,
  },
  macroLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#173430',
    marginBottom: 2,
  },
  macroValue: {
    fontSize: 12,
    color: '#6b7280',
    fontWeight: '500',
    marginBottom: 4,
  },
  progressBar: {
    height: 4,
    backgroundColor: '#f3f4f6',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 2,
  },
});

export default DescriptionCard; 