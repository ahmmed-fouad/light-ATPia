import { Feather } from '@expo/vector-icons';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { FoodItem } from '../types/breakfastTypes';

interface FoodItemCardProps {
  item: FoodItem;
  onRemove?: (itemId: string) => void;
}

const FoodItemCard: React.FC<FoodItemCardProps> = ({ item, onRemove }) => {
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'protein':
        return '#3b82f6';
      case 'carbs':
        return '#10b981';
      case 'fat':
        return '#f59e0b';
      case 'vegetables':
        return '#8b5cf6';
      default:
        return '#6b7280';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'protein':
        return 'droplet';
      case 'carbs':
        return 'leaf';
      case 'fat':
        return 'zap';
      case 'vegetables':
        return 'carrot';
      default:
        return 'circle';
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.leftSection}>
        <Image source={{ uri: item.image }} style={styles.image} />
        <View style={styles.info}>
          <Text style={styles.name}>{item.name}</Text>
          <View style={styles.macros}>
            <View style={styles.macroItem}>
              <Feather name="zap" size={12} color="#f59e0b" />
              <Text style={styles.macroText}>{item.kcal} kcal</Text>
            </View>
            <View style={styles.macroItem}>
              <Feather name="droplet" size={12} color="#3b82f6" />
              <Text style={styles.macroText}>{item.protein}g</Text>
            </View>
            <View style={styles.macroItem}>
              <Feather name="leaf" size={12} color="#10b981" />
              <Text style={styles.macroText}>{item.carbs}g</Text>
            </View>
            <View style={styles.macroItem}>
              <Feather name="zap" size={12} color="#f59e0b" />
              <Text style={styles.macroText}>{item.fat}g</Text>
            </View>
          </View>
        </View>
      </View>
      
      <View style={styles.rightSection}>
        <View style={[styles.categoryBadge, { backgroundColor: getCategoryColor(item.category) }]}>
          <Feather name={getCategoryIcon(item.category) as any} size={12} color="#fff" />
        </View>
        {onRemove && (
          <TouchableOpacity 
            style={styles.removeButton} 
            onPress={() => onRemove(item.id)}
            activeOpacity={0.7}
          >
            <Feather name="x" size={16} color="#ef4444" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 24,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  leftSection: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
    backgroundColor: '#f3f4f6',
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#173430',
    marginBottom: 4,
  },
  macros: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  macroItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  macroText: {
    fontSize: 12,
    color: '#6b7280',
    fontWeight: '500',
  },
  rightSection: {
    alignItems: 'center',
    gap: 8,
  },
  categoryBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  removeButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#fef2f2',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default FoodItemCard; 