import React from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useGrocery } from '../hooks/useGrocery';
import { GroceryItem } from '../types';

interface GroceryListItemProps {
  item: GroceryItem;
  onToggle?: (id: number) => void;
  onDelete?: (id: number) => void;
  onEdit?: (item: GroceryItem) => void;
}

export const GroceryListItem: React.FC<GroceryListItemProps> = ({
  item,
  onToggle,
  onDelete,
  onEdit
}) => {
  const { categories, toggleItemBought, deleteItem } = useGrocery();
  
  const category = categories.find(cat => cat.name === item.category);
  const categoryColor = category?.color || '#A3A3A3';
  const categoryIcon = category?.icon || '🛒';

  const handleToggle = () => {
    toggleItemBought(item.id);
    onToggle?.(item.id);
  };

  const handleDelete = () => {
    deleteItem(item.id);
    onDelete?.(item.id);
  };

  const handleEdit = () => {
    onEdit?.(item);
  };

  return (
    <View style={styles.container}>
      {/* Category Indicator */}
      <View style={[styles.categoryIndicator, { backgroundColor: categoryColor }]}>
        <Text style={styles.categoryIcon}>{categoryIcon}</Text>
      </View>

      {/* Main Content */}
      <View style={styles.content}>
        <View style={styles.itemInfo}>
          <Text style={[
            styles.itemName,
            item.bought && styles.itemNameCompleted
          ]}>
            {item.name}
          </Text>
          <Text style={[
            styles.itemQuantity,
            item.bought && styles.itemQuantityCompleted
          ]}>
            {item.qty}
          </Text>
        </View>

        <View style={styles.categoryInfo}>
          <Text style={styles.categoryName}>{item.category}</Text>
        </View>
      </View>

      {/* Actions */}
      <View style={styles.actions}>
        <TouchableOpacity 
          style={styles.actionButton} 
          onPress={handleEdit}
        >
          <Ionicons name="create-outline" size={18} color="#6B7280" />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.checkbox, item.bought && styles.checkboxChecked]} 
          onPress={handleToggle}
        >
          {item.bought && (
            <Ionicons name="checkmark" size={16} color="white" />
          )}
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.actionButton} 
          onPress={handleDelete}
        >
          <Ionicons name="trash-outline" size={18} color="#EF4444" />
        </TouchableOpacity>
      </View>

      {/* Completion Line */}
      {item.bought && (
        <View style={[styles.completionLine, { backgroundColor: categoryColor }]} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    marginHorizontal: 16,
    marginVertical: 4,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
    position: 'relative',
  },
  categoryIndicator: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  categoryIcon: {
    fontSize: 16,
  },
  content: {
    flex: 1,
  },
  itemInfo: {
    marginBottom: 4,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 2,
  },
  itemNameCompleted: {
    textDecorationLine: 'line-through',
    color: '#9CA3AF',
  },
  itemQuantity: {
    fontSize: 14,
    color: '#6B7280',
  },
  itemQuantityCompleted: {
    color: '#9CA3AF',
  },
  categoryInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryName: {
    fontSize: 12,
    color: '#9CA3AF',
    letterSpacing: 0.5,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  actionButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#D1D5DB',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  checkboxChecked: {
    backgroundColor: '#10B981',
    borderColor: '#10B981',
  },
  completionLine: {
    position: 'absolute',
    left: 60,
    right: 16,
    height: 2,
    top: '50%',
    marginTop: -1,
    borderRadius: 1,
    opacity: 0.6,
  },
}); 