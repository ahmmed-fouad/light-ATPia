import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MealPlan, Meal } from '../types';

interface MealCalendarProps {
  mealPlan: MealPlan;
  todayMeals: Meal[];
  onMealPress: (meal: Meal) => void;
}

export const MealCalendar: React.FC<MealCalendarProps> = ({
  mealPlan,
  todayMeals,
  onMealPress
}) => {
  const getMealTypeIcon = (type: string) => {
    const icons: Record<string, string> = {
      'breakfast': 'sunny-outline',
      'lunch': 'restaurant-outline',
      'dinner': 'moon-outline',
      'snack': 'cafe-outline'
    };
    return icons[type] || 'restaurant-outline';
  };

  const getMealTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      'breakfast': '#F59E0B',
      'lunch': '#10B981',
      'dinner': '#8B5CF6',
      'snack': '#06B6D4'
    };
    return colors[type] || '#6B7280';
  };

  const formatTime = (time: string) => {
    return time; // Already in HH:MM format
  };

  const renderMealCard = (meal: Meal) => {
    const typeColor = getMealTypeColor(meal.type);
    
    return (
      <TouchableOpacity
        key={meal.id}
        style={styles.mealCard}
        onPress={() => onMealPress(meal)}
        activeOpacity={0.7}
      >
        <View style={styles.mealHeader}>
          <View style={[styles.mealIcon, { backgroundColor: typeColor + '20' }]}>
            <Ionicons 
              name={getMealTypeIcon(meal.type) as any} 
              size={16} 
              color={typeColor} 
            />
          </View>
          <View style={styles.mealInfo}>
            <Text style={styles.mealName} numberOfLines={1}>
              {meal.name}
            </Text>
            <Text style={styles.mealTime}>
              {formatTime(meal.time)}
            </Text>
          </View>
          <View style={styles.mealStats}>
            <Text style={styles.calories}>{meal.calories} cal</Text>
            <Text style={styles.macros}>
              P: {meal.macros.protein}g C: {meal.macros.carbs}g F: {meal.macros.fat}g
            </Text>
          </View>
        </View>
        
        <View style={styles.mealTags}>
          {meal.tags.slice(0, 3).map((tag, index) => (
            <View key={index} style={[styles.tag, { backgroundColor: typeColor + '20' }]}>
              <Text style={[styles.tagText, { color: typeColor }]}>
                {tag}
              </Text>
            </View>
          ))}
        </View>
      </TouchableOpacity>
    );
  };

  const renderDaySection = (day: string, meals: Meal[]) => {
    return (
      <View key={day} style={styles.daySection}>
        <Text style={styles.dayTitle}>{day}</Text>
        {meals.map(renderMealCard)}
      </View>
    );
  };

  // Group meals by day (simplified for demo)
  const groupedMeals = {
    'Today': todayMeals,
    'Tomorrow': mealPlan.meals.slice(0, 2), // Demo data
    'Wednesday': mealPlan.meals.slice(2, 4), // Demo data
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Meal Calendar</Text>
        <TouchableOpacity style={styles.viewAllButton}>
          <Text style={styles.viewAllText}>View All</Text>
          <Ionicons name="arrow-forward" size={16} color="#10B981" />
        </TouchableOpacity>
      </View>
      
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.calendarContainer}
      >
        {Object.entries(groupedMeals).map(([day, meals]) => 
          renderDaySection(day, meals)
        )}
      </ScrollView>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewAllText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#10B981',
    marginRight: 4,
  },
  calendarContainer: {
    paddingRight: 16,
  },
  daySection: {
    marginRight: 16,
    minWidth: 280,
  },
  dayTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 12,
  },
  mealCard: {
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    borderLeftWidth: 3,
    borderLeftColor: '#E5E7EB',
  },
  mealHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  mealIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  mealInfo: {
    flex: 1,
  },
  mealName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 2,
  },
  mealTime: {
    fontSize: 12,
    color: '#6B7280',
  },
  mealStats: {
    alignItems: 'flex-end',
  },
  calories: {
    fontSize: 12,
    fontWeight: '600',
    color: '#F59E0B',
    marginBottom: 2,
  },
  macros: {
    fontSize: 10,
    color: '#6B7280',
  },
  mealTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginRight: 4,
    marginBottom: 2,
  },
  tagText: {
    fontSize: 10,
    fontWeight: '500',
  },
}); 