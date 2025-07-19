import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useGrocery } from '../hooks/useGrocery';

interface GroceryHeaderProps {
  onAddPress?: () => void;
  onFilterPress?: () => void;
  onSortPress?: () => void;
}

export const GroceryHeader: React.FC<GroceryHeaderProps> = ({
  onAddPress,
  onFilterPress,
  onSortPress
}) => {
  const { stats } = useGrocery();

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <View style={styles.titleSection}>
          <Text style={styles.title}>Grocery List</Text>
          <Text style={styles.subtitle}>
            {stats.remainingItems} of {stats.totalItems} items remaining
          </Text>
        </View>
        
        <View style={styles.actions}>
          <TouchableOpacity 
            style={styles.actionButton} 
            onPress={onFilterPress}
          >
            <Ionicons name="filter" size={20} color="#6B7280" />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.actionButton} 
            onPress={onSortPress}
          >
            <Ionicons name="swap-vertical" size={20} color="#6B7280" />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.actionButton, styles.addButton]} 
            onPress={onAddPress}
          >
            <Ionicons name="add" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>
      
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View 
            style={[
              styles.progressFill, 
              { width: `${stats.totalItems > 0 ? (stats.boughtItems / stats.totalItems) * 100 : 0}%` }
            ]} 
          />
        </View>
        <Text style={styles.progressText}>
          {stats.boughtItems} of {stats.totalItems} completed
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  titleSection: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 2,
  },
  subtitle: {
    fontSize: 14,
    color: '#6B7280',
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  actionButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
  },
  addButton: {
    backgroundColor: '#10B981',
  },
  progressContainer: {
    marginTop: 8,
  },
  progressBar: {
    height: 6,
    backgroundColor: '#E5E7EB',
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 4,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#10B981',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
  },
}); 