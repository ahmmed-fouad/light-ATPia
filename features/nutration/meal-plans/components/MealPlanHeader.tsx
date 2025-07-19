// import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MealPlan } from '../types';

interface MealPlanHeaderProps {
  onGeneratePress: () => void;
  isGenerating: boolean;
  activeMealPlan: MealPlan | null;
}

export const MealPlanHeader: React.FC<MealPlanHeaderProps> = ({
  onGeneratePress,
  isGenerating,
  activeMealPlan
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.titleSection}>
          <Text style={styles.title}>Meal Plans</Text>
          <Text style={styles.subtitle}>
            {activeMealPlan 
              ? `Active: ${activeMealPlan.name}` 
              : 'AI-powered personalized nutrition'
            }
          </Text>
        </View>
        
        <TouchableOpacity
          style={[styles.generateButton, isGenerating && styles.generateButtonDisabled]}
          onPress={onGeneratePress}
          disabled={isGenerating}
        >
          {isGenerating ? (
            <Ionicons name="hourglass-outline" size={20} color="white" />
          ) : (
            <Ionicons name="sparkles" size={20} color="white" />
          )}
          <Text style={styles.generateButtonText}>
            {isGenerating ? 'Generating...' : 'Generate'}
          </Text>
        </TouchableOpacity>
      </View>

      {activeMealPlan && (
        <View style={styles.activePlanInfo}>
          <View style={styles.infoRow}>
            <View style={styles.infoItem}>
              <Ionicons name="flame-outline" size={16} color="#F59E0B" />
              <Text style={styles.infoText}>
                {activeMealPlan.targetCalories} cal
              </Text>
            </View>
            <View style={styles.infoItem}>
              <Ionicons name="time-outline" size={16} color="#6B7280" />
              <Text style={styles.infoText}>
                {activeMealPlan.duration}
              </Text>
            </View>
            <View style={styles.infoItem}>
              <Ionicons name="trophy-outline" size={16} color="#10B981" />
              <Text style={styles.infoText}>
                {activeMealPlan.difficulty}
              </Text>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  titleSection: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
  generateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#10B981',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    minWidth: 100,
    justifyContent: 'center',
  },
  generateButtonDisabled: {
    backgroundColor: '#9CA3AF',
  },
  generateButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 6,
  },
  activePlanInfo: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoText: {
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 4,
    textTransform: 'capitalize',
  },
}); 