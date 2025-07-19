// import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ChartData } from '../types';

interface ProgressChartProps {
  progress: any;
  weeklyStats: any;
  chartData: ChartData[];
  macroProgress: any;
}

const { width } = Dimensions.get('window');

export const ProgressChart: React.FC<ProgressChartProps> = ({
  progress,
  weeklyStats,
  chartData,
  macroProgress
}) => {
  const renderProgressBar = (value: number, maxValue: number, color: string, label: string) => {
    const percentage = Math.min((value / maxValue) * 100, 100);
    
    return (
      <View style={styles.progressItem}>
        <View style={styles.progressHeader}>
          <Text style={styles.progressLabel}>{label}</Text>
          <Text style={styles.progressValue}>
            {value}/{maxValue}
          </Text>
        </View>
        <View style={styles.progressBarContainer}>
          <View style={[styles.progressBar, { backgroundColor: color + '20' }]}>
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

  const renderMacroProgress = () => {
    if (!macroProgress) return null;

    return (
      <View style={styles.macroSection}>
        <Text style={styles.sectionTitle}>Macro Progress</Text>
        <View style={styles.macroGrid}>
          <View style={styles.macroItem}>
            <View style={[styles.macroIcon, { backgroundColor: '#EF4444' + '20' }]}>
              <Ionicons name="fitness-outline" size={16} color="#EF4444" />
            </View>
            <Text style={styles.macroLabel}>Protein</Text>
            <Text style={[styles.macroValue, { color: '#EF4444' }]}>
              {macroProgress.protein}%
            </Text>
          </View>
          
          <View style={styles.macroItem}>
            <View style={[styles.macroIcon, { backgroundColor: '#3B82F6' + '20' }]}>
              <Ionicons name="leaf-outline" size={16} color="#3B82F6" />
            </View>
            <Text style={styles.macroLabel}>Carbs</Text>
            <Text style={[styles.macroValue, { color: '#3B82F6' }]}>
              {macroProgress.carbs}%
            </Text>
          </View>
          
          <View style={styles.macroItem}>
            <View style={[styles.macroIcon, { backgroundColor: '#F59E0B' + '20' }]}>
              <Ionicons name="water-outline" size={16} color="#F59E0B" />
            </View>
            <Text style={styles.macroLabel}>Fat</Text>
            <Text style={[styles.macroValue, { color: '#F59E0B' }]}>
              {macroProgress.fat}%
            </Text>
          </View>
        </View>
      </View>
    );
  };

  const renderChartData = () => {
    if (!chartData || chartData.length === 0) return null;

    return (
      <View style={styles.chartSection}>
        <Text style={styles.sectionTitle}>Meal Plan Categories</Text>
        <View style={styles.chartContainer}>
          {chartData.map((item, index) => (
            <View key={item.name} style={styles.chartItem}>
              <View style={styles.chartBar}>
                <View 
                  style={[
                    styles.chartBarFill, 
                    { 
                      backgroundColor: item.color,
                      height: `${item.percentage}%` as any
                    }
                  ]} 
                />
              </View>
              <Text style={styles.chartLabel} numberOfLines={1}>
                {item.name}
              </Text>
              <Text style={styles.chartValue}>
                {item.value}
              </Text>
            </View>
          ))}
        </View>
      </View>
    );
  };

  const renderWeeklyStats = () => {
    return (
      <View style={styles.statsSection}>
        <Text style={styles.sectionTitle}>Weekly Overview</Text>
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <Ionicons name="flame-outline" size={20} color="#F59E0B" />
            <Text style={styles.statValue}>
              {weeklyStats.averageCalories || 0}
            </Text>
            <Text style={styles.statLabel}>Avg Calories</Text>
          </View>
          
          <View style={styles.statCard}>
            <Ionicons name="checkmark-circle-outline" size={20} color="#10B981" />
            <Text style={styles.statValue}>
              {weeklyStats.adherenceRate || 0}%
            </Text>
            <Text style={styles.statLabel}>Adherence</Text>
          </View>
          
          <View style={styles.statCard}>
            <Ionicons name="restaurant-outline" size={20} color="#8B5CF6" />
            <Text style={styles.statValue}>
              {weeklyStats.mealVariety || 0}
            </Text>
            <Text style={styles.statLabel}>Meal Variety</Text>
          </View>
          
          <View style={styles.statCard}>
            <Ionicons name="trending-up-outline" size={20} color="#3B82F6" />
            <Text style={styles.statValue}>
              {progress.currentStreak || 0}
            </Text>
            <Text style={styles.statLabel}>Day Streak</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Progress Overview */}
      <View style={styles.progressSection}>
        <Text style={styles.sectionTitle}>Progress Overview</Text>
        {renderProgressBar(
          progress.completedMeals || 0,
          progress.totalMeals || 1,
          '#10B981',
          'Meals Completed'
        )}
        {renderProgressBar(
          progress.caloriesConsumed || 0,
          progress.targetCalories || 1,
          '#F59E0B',
          'Calories Consumed'
        )}
        {renderProgressBar(
          progress.adherenceRate || 0,
          100,
          '#3B82F6',
          'Adherence Rate'
        )}
      </View>

      {/* Macro Progress */}
      {renderMacroProgress()}

      {/* Weekly Stats */}
      {renderWeeklyStats()}

      {/* Chart Data */}
      {renderChartData()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  progressSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 16,
  },
  progressItem: {
    marginBottom: 16,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  progressLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
  },
  progressValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
  },
  progressBarContainer: {
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    borderRadius: 4,
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  macroSection: {
    marginBottom: 24,
  },
  macroGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  macroItem: {
    alignItems: 'center',
    flex: 1,
  },
  macroIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  macroLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 4,
  },
  macroValue: {
    fontSize: 16,
    fontWeight: '600',
  },
  statsSection: {
    marginBottom: 24,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statCard: {
    width: (width - 64) / 2 - 8,
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginTop: 4,
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
  },
  chartSection: {
    marginBottom: 16,
  },
  chartContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 120,
  },
  chartItem: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  chartBar: {
    width: 20,
    height: 80,
    backgroundColor: '#F3F4F6',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 8,
  },
  chartBarFill: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    borderRadius: 10,
  },
  chartLabel: {
    fontSize: 10,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 2,
  },
  chartValue: {
    fontSize: 12,
    fontWeight: '600',
    color: '#111827',
  },
}); 