import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Goal } from '../../types';
import { AnalyticsService } from '../../services/analyticsService';

interface GoalCardProps {
  goal: Goal;
  onPress?: () => void;
}

export const GoalCard: React.FC<GoalCardProps> = ({ goal, onPress }) => {
  const progressColor = AnalyticsService.getProgressColor(goal.progress);
  const progressPercentage = Math.min(goal.progress, 100);
  
  const getGradientColors = () => {
    if (goal.progress >= 80) {
      return ['rgba(16, 185, 129, 0.1)', 'rgba(34, 197, 94, 0.05)'];
    } else if (goal.progress >= 60) {
      return ['rgba(245, 158, 11, 0.1)', 'rgba(251, 191, 36, 0.05)'];
    } else {
      return ['rgba(239, 68, 68, 0.1)', 'rgba(248, 113, 113, 0.05)'];
    }
  };

  const getCategoryIcon = () => {
    switch (goal.category) {
      case 'weight':
        return '⚖️';
      case 'nutrition':
        return '🥗';
      case 'health':
        return '❤️';
      case 'exercise':
        return '💪';
      default:
        return '🎯';
    }
  };

  const CardContent = () => (
    <View style={styles.container}>
      <LinearGradient
        colors={getGradientColors() as [string, string]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      />
      
      <View style={styles.header}>
        <View style={styles.titleSection}>
          <Text style={styles.icon}>{getCategoryIcon()}</Text>
          <View>
            <Text style={styles.title}>{goal.title}</Text>
            <Text style={styles.deadline}>
              Due: {AnalyticsService.formatDate(goal.deadline)}
            </Text>
          </View>
        </View>
        <Text style={styles.progress}>
          {goal.progress}%
        </Text>
      </View>

      <View style={styles.progressSection}>
        <View style={styles.progressHeader}>
          <Text style={styles.progressLabel}>Progress</Text>
          <Text style={styles.progressValue}>
            {goal.current} / {goal.target} {goal.unit}
          </Text>
        </View>
        
        {/* Progress Bar */}
        <View style={styles.progressBar}>
          <LinearGradient
            colors={[progressColor, progressColor + '80']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={[styles.progressFill, { width: `${progressPercentage}%` }]}
          />
        </View>
      </View>

      {/* Status indicator */}
      <View style={styles.statusSection}>
        <View 
          style={[styles.statusDot, { backgroundColor: progressColor }]}
        />
        <Text style={styles.statusText}>
          {goal.progress >= 100 ? 'Completed' : 
           goal.progress >= 80 ? 'Almost there!' :
           goal.progress >= 60 ? 'Good progress' : 'Keep going!'}
        </Text>
      </View>
    </View>
  );

  if (onPress) {
    return (
      <TouchableOpacity 
        style={styles.wrapper}
        onPress={onPress}
        activeOpacity={0.8}
      >
        <CardContent />
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.wrapper}>
      <CardContent />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 16,
  },
  container: {
    backgroundColor: 'rgba(255,255,255,0.97)',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#a7f3d0',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: Platform.OS === 'ios' ? 0.10 : 0.13,
    shadowRadius: 6,
    elevation: 3,
    position: 'relative',
  },
  gradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  titleSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  icon: {
    fontSize: 24,
    marginRight: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 2,
  },
  deadline: {
    fontSize: 12,
    color: '#64748b',
  },
  progress: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#059669',
  },
  progressSection: {
    marginBottom: 12,
  },
  progressHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  progressLabel: {
    fontSize: 14,
    color: '#374151',
  },
  progressValue: {
    fontSize: 12,
    color: '#64748b',
  },
  progressBar: {
    backgroundColor: '#e5e7eb',
    borderRadius: 8,
    height: 8,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 8,
  },
  statusSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  statusText: {
    fontSize: 12,
    color: '#64748b',
  },
}); 