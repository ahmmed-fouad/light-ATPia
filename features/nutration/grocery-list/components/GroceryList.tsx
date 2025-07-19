import React, { useState } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  StyleSheet, 
  TouchableOpacity,
  TextInput,
  ScrollView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useGrocery } from '../hooks/useGrocery';
import { GroceryListItem } from './GroceryListItem';
import { GroceryItem } from '../types';

interface GroceryListProps {
  onItemEdit?: (item: GroceryItem) => void;
  onItemToggle?: (id: number) => void;
  onItemDelete?: (id: number) => void;
}

export const GroceryList: React.FC<GroceryListProps> = ({
  onItemEdit,
  onItemToggle,
  onItemDelete
}) => {
  const { 
    filteredItems, 
    searchQuery, 
    setSearchQuery,
    filterCategory,
    setFilterCategory,
    categories,
    clearCompleted
  } = useGrocery();

  const [showCompleted, setShowCompleted] = useState(true);

  const toggleShowCompleted = () => {
    setShowCompleted(!showCompleted);
  };

  const handleClearCompleted = () => {
    clearCompleted();
  };

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Ionicons name="basket-outline" size={64} color="#D1D5DB" />
      <Text style={styles.emptyTitle}>Your grocery list is empty</Text>
      <Text style={styles.emptySubtitle}>
        Add items to get started with your shopping
      </Text>
    </View>
  );

  const renderItem = ({ item }: { item: GroceryItem }) => (
    <GroceryListItem
      item={item}
      onToggle={onItemToggle}
      onDelete={onItemDelete}
      onEdit={onItemEdit}
    />
  );

  const renderHeader = () => (
    <View style={styles.header}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#9CA3AF" />
        <TextInput
          style={styles.searchInput}
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search items..."
          placeholderTextColor="#9CA3AF"
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <Ionicons name="close-circle" size={20} color="#9CA3AF" />
          </TouchableOpacity>
        )}
      </View>

      {/* Category Filters */}
      <View style={styles.categoryFilters}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryScroll}
        >
          <TouchableOpacity
            style={[
              styles.categoryFilter,
              !filterCategory && styles.categoryFilterActive
            ]}
            onPress={() => setFilterCategory(null)}
          >
            <Text style={[
              styles.categoryFilterText,
              !filterCategory && styles.categoryFilterTextActive
            ]}>
              All
            </Text>
          </TouchableOpacity>
          
          {categories.map((category) => (
            <TouchableOpacity
              key={category.name}
              style={[
                styles.categoryFilter,
                filterCategory === category.name && styles.categoryFilterActive
              ]}
              onPress={() => setFilterCategory(category.name)}
            >
              <Text style={styles.categoryIcon}>{category.icon}</Text>
              <Text style={[
                styles.categoryFilterText,
                filterCategory === category.name && styles.categoryFilterTextActive
              ]}>
                {category.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* List Controls */}
      <View style={styles.controls}>
        <TouchableOpacity 
          style={styles.controlButton}
          onPress={toggleShowCompleted}
        >
          <Ionicons 
            name={showCompleted ? "eye" : "eye-off"} 
            size={18} 
            color="#6B7280" 
          />
          <Text style={styles.controlText}>
            {showCompleted ? 'Hide' : 'Show'} completed
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.controlButton}
          onPress={handleClearCompleted}
        >
          <Ionicons name="trash-outline" size={18} color="#EF4444" />
          <Text style={[styles.controlText, styles.clearText]}>
            Clear completed
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderSectionHeader = ({ section }: { section: any }) => (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{section.title}</Text>
      <Text style={styles.sectionCount}>{section.data.length} items</Text>
    </View>
  );

  // Group items by completion status
  const completedItems = filteredItems.filter(item => item.bought);
  const pendingItems = filteredItems.filter(item => !item.bought);

  const sections = [];
  
  if (pendingItems.length > 0) {
    sections.push({
      title: 'To Buy',
      data: pendingItems
    });
  }
  
  if (completedItems.length > 0 && showCompleted) {
    sections.push({
      title: 'Completed',
      data: completedItems
    });
  }

  return (
    <View style={styles.container}>
      {renderHeader()}
      {filteredItems.length === 0 ? (
        renderEmptyState()
      ) : (
        <View>
          {sections.map((section) => (
            <View key={section.title}>
              {renderSectionHeader({ section })}
              {section.data.map((item) => (
                <View key={item.id}>
                  {renderItem({ item })}
                </View>
              ))}
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 12,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: '#111827',
  },
  categoryFilters: {
    marginBottom: 12,
  },
  categoryScroll: {
    paddingHorizontal: 4,
  },
  categoryFilter: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#F3F4F6',
    marginRight: 8,
  },
  categoryFilterActive: {
    backgroundColor: '#10B981',
  },
  categoryIcon: {
    fontSize: 14,
    marginRight: 4,
  },
  categoryFilterText: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
  },
  categoryFilterTextActive: {
    color: 'white',
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  controlButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
  },
  controlText: {
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 4,
  },
  clearText: {
    color: '#EF4444',
  },
  listContent: {
    paddingBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#F9FAFB',
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
  },
  sectionCount: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#6B7280',
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#9CA3AF',
    textAlign: 'center',
    lineHeight: 20,
  },
}); 