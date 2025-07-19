import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MealPlanInsight } from '../types';

interface AIInsightsProps {
  insights: MealPlanInsight[];
}

export const AIInsights: React.FC<AIInsightsProps> = ({ insights }) => {
  if (!insights || insights.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.sectionTitle}>AI Insights</Text>
        <View style={styles.emptyState}>
          <Ionicons name="bulb-outline" size={32} color="#D1D5DB" />
          <Text style={styles.emptyText}>No insights yet</Text>
          <Text style={styles.emptySubtext}>
            Complete more meals to get personalized recommendations
          </Text>
        </View>
      </View>
    );
  }

  const getPriorityColor = (priority: string) => {
    const colors: Record<string, string> = {
      'high': '#EF4444',
      'medium': '#F59E0B',
      'low': '#10B981'
    };
    return colors[priority] || '#6B7280';
  };

  const getTypeIcon = (type: string) => {
    const icons: Record<string, string> = {
      'nutrition': 'nutrition-outline',
      'progress': 'trending-up-outline',
      'suggestion': 'bulb-outline',
      'achievement': 'trophy-outline'
    };
    return icons[type] || 'information-circle-outline';
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>AI Insights</Text>
      {insights.map((insight) => (
        <View key={insight.id} style={styles.insightCard}>
          <View style={styles.insightHeader}>
            <View style={styles.insightIcon}>
              <Ionicons 
                name={getTypeIcon(insight.type) as any} 
                size={20} 
                color={insight.color} 
              />
            </View>
            <View style={styles.insightContent}>
              <Text style={styles.insightTitle}>{insight.title}</Text>
              <Text style={styles.insightMessage}>{insight.message}</Text>
            </View>
            <View style={[styles.priorityBadge, { backgroundColor: getPriorityColor(insight.priority) + '20' }]}>
              <Text style={[styles.priorityText, { color: getPriorityColor(insight.priority) }]}>
                {insight.priority}
              </Text>
            </View>
          </View>
          
          {insight.actionable && insight.actionLabel && (
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={insight.actionHandler}
            >
              <Text style={styles.actionText}>{insight.actionLabel}</Text>
              <Ionicons name="arrow-forward" size={16} color="#10B981" />
            </TouchableOpacity>
          )}
        </View>
      ))}
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
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 16,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  emptyText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#6B7280',
    marginTop: 8,
    marginBottom: 4,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#9CA3AF',
    textAlign: 'center',
    lineHeight: 20,
  },
  insightCard: {
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  insightHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  insightIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  insightContent: {
    flex: 1,
    marginRight: 8,
  },
  insightTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  insightMessage: {
    fontSize: 13,
    color: '#6B7280',
    lineHeight: 18,
  },
  priorityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  priorityText: {
    fontSize: 10,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#F0FDF4',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#10B981',
  },
  actionText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#10B981',
    marginRight: 6,
  },
}); 