import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MealPlan } from '../types';

interface MealPlanCardProps {
  mealPlan: MealPlan;
  isActive: boolean;
  onPress: () => void;
  onDelete: () => void;
}

export const MealPlanCard: React.FC<MealPlanCardProps> = ({
  mealPlan,
  isActive,
  onPress,
  onDelete
}) => {
  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'weight-loss': '#EF4444',
      'muscle-gain': '#3B82F6',
      'maintenance': '#10B981',
      'vegetarian': '#8B5CF6',
      'vegan': '#06B6D4',
      'keto': '#F59E0B',
      'paleo': '#84CC16'
    };
    return colors[category] || '#6B7280';
  };

  const getDifficultyColor = (difficulty: string) => {
    const colors: Record<string, string> = {
      'beginner': '#10B981',
      'intermediate': '#F59E0B',
      'advanced': '#EF4444'
    };
    return colors[difficulty] || '#6B7280';
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  };

  return (
    <TouchableOpacity
      style={[styles.container, isActive && styles.activeContainer]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.header}>
        <View style={styles.titleSection}>
          <Text style={styles.title} numberOfLines={1}>
            {mealPlan.name}
          </Text>
          <Text style={styles.description} numberOfLines={2}>
            {mealPlan.description}
          </Text>
        </View>
        
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={onDelete}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons name="trash-outline" size={18} color="#EF4444" />
        </TouchableOpacity>
      </View>

      <View style={styles.tags}>
        <View style={[styles.tag, { backgroundColor: getCategoryColor(mealPlan.category) + '20' }]}>
          <Text style={[styles.tagText, { color: getCategoryColor(mealPlan.category) }]}>
            {mealPlan.category.replace('-', ' ')}
          </Text>
        </View>
        <View style={[styles.tag, { backgroundColor: getDifficultyColor(mealPlan.difficulty) + '20' }]}>
          <Text style={[styles.tagText, { color: getDifficultyColor(mealPlan.difficulty) }]}>
            {mealPlan.difficulty}
          </Text>
        </View>
        {mealPlan.aiGenerated && (
          <View style={[styles.tag, { backgroundColor: '#8B5CF6' + '20' }]}>
            <Ionicons name="sparkles" size={12} color="#8B5CF6" />
            <Text style={[styles.tagText, { color: '#8B5CF6', marginLeft: 4 }]}>
              AI
            </Text>
          </View>
        )}
      </View>

      <View style={styles.stats}>
        <View style={styles.stat}>
          <Ionicons name="flame-outline" size={16} color="#F59E0B" />
          <Text style={styles.statText}>
            {mealPlan.targetCalories} cal
          </Text>
        </View>
        <View style={styles.stat}>
          <Ionicons name="time-outline" size={16} color="#6B7280" />
          <Text style={styles.statText}>
            {mealPlan.duration}
          </Text>
        </View>
        <View style={styles.stat}>
          <Ionicons name="restaurant-outline" size={16} color="#10B981" />
          <Text style={styles.statText}>
            {mealPlan.meals.length} meals
          </Text>
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.date}>
          Created {formatDate(mealPlan.createdAt)}
        </Text>
        
        {mealPlan.userRating && (
          <View style={styles.rating}>
            <Ionicons name="star" size={14} color="#F59E0B" />
            <Text style={styles.ratingText}>
              {mealPlan.userRating.toFixed(1)}
            </Text>
          </View>
        )}
        
        {mealPlan.completionRate && (
          <View style={styles.completion}>
            <Ionicons name="checkmark-circle-outline" size={14} color="#10B981" />
            <Text style={styles.completionText}>
              {mealPlan.completionRate}% complete
            </Text>
          </View>
        )}
      </View>

      {isActive && (
        <View style={styles.activeIndicator}>
          <Ionicons name="checkmark-circle" size={16} color="#10B981" />
          <Text style={styles.activeText}>Active</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  activeContainer: {
    borderWidth: 2,
    borderColor: '#10B981',
    backgroundColor: '#F0FDF4',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  titleSection: {
    flex: 1,
    marginRight: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 18,
  },
  deleteButton: {
    padding: 4,
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginRight: 6,
    marginBottom: 4,
  },
  tagText: {
    fontSize: 12,
    fontWeight: '500',
    textTransform: 'capitalize',
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  stat: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statText: {
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 4,
    textTransform: 'capitalize',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  date: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 2,
  },
  completion: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  completionText: {
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 2,
  },
  activeIndicator: {
    position: 'absolute',
    top: 12,
    right: 12,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#10B981',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  activeText: {
    fontSize: 10,
    color: 'white',
    fontWeight: '600',
    marginLeft: 2,
  },
}); 