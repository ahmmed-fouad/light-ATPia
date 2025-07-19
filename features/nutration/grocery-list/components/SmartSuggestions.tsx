import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useGrocery } from '../hooks/useGrocery';

interface SmartSuggestionsProps {
  onSuggestionPress?: (suggestion: any) => void;
}

export const SmartSuggestions: React.FC<SmartSuggestionsProps> = ({ onSuggestionPress }) => {
  const { smartSuggestions, addSmartSuggestion, categories } = useGrocery();

  const handleSuggestionPress = (suggestion: any) => {
    addSmartSuggestion(suggestion);
    onSuggestionPress?.(suggestion);
  };

  const getCategoryIcon = (categoryName: string) => {
    const category = categories.find(cat => cat.name === categoryName);
    return category?.icon || '🛒';
  };

  const getCategoryColor = (categoryName: string) => {
    const category = categories.find(cat => cat.name === categoryName);
    return category?.color || '#A3A3A3';
  };

  if (smartSuggestions.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyTitle}>No suggestions available</Text>
        <Text style={styles.emptySubtitle}>
          Add more items to get personalized suggestions
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Ionicons name="bulb-outline" size={20} color="#F59E0B" />
          <Text style={styles.title}>Smart Suggestions</Text>
        </View>
        <Text style={styles.subtitle}>Based on your shopping history</Text>
      </View>

      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.suggestionsContainer}
      >
        {smartSuggestions.map((suggestion, index) => (
          <TouchableOpacity
            key={suggestion.id}
            style={styles.suggestionCard}
            onPress={() => handleSuggestionPress(suggestion)}
          >
            <View style={styles.suggestionHeader}>
              <View style={[
                styles.categoryBadge, 
                { backgroundColor: getCategoryColor(suggestion.category) }
              ]}>
                <Text style={styles.categoryIcon}>
                  {getCategoryIcon(suggestion.category)}
                </Text>
              </View>
              <TouchableOpacity style={styles.addButton}>
                <Ionicons name="add" size={16} color="#10B981" />
              </TouchableOpacity>
            </View>
            
            <Text style={styles.suggestionName}>{suggestion.name}</Text>
            <Text style={styles.suggestionCategory}>{suggestion.category}</Text>
            
            <View style={styles.frequencyIndicator}>
              <View style={[
                styles.frequencyBar,
                { width: `${suggestion.frequency * 100}%` }
              ]} />
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  header: {
    marginBottom: 16,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginLeft: 8,
  },
  subtitle: {
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 28,
  },
  suggestionsContainer: {
    paddingHorizontal: 4,
  },
  suggestionCard: {
    width: 120,
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    padding: 12,
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  suggestionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryIcon: {
    fontSize: 12,
  },
  addButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  suggestionName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 2,
  },
  suggestionCategory: {
    fontSize: 11,
    color: '#6B7280',
    marginBottom: 8,
  },
  frequencyIndicator: {
    height: 2,
    backgroundColor: '#E5E7EB',
    borderRadius: 1,
    overflow: 'hidden',
  },
  frequencyBar: {
    height: '100%',
    backgroundColor: '#10B981',
    borderRadius: 1,
  },
  emptyContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 24,
    marginHorizontal: 16,
    marginVertical: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  emptyTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
    marginBottom: 4,
  },
  emptySubtitle: {
    fontSize: 12,
    color: '#9CA3AF',
    textAlign: 'center',
  },
}); 