import React, { useState } from 'react';
import { 
  View, 
  Text,
  StyleSheet, 
  SafeAreaView, 
  Modal, 
  StatusBar,
  Alert,
  ScrollView
} from 'react-native';
import { GroceryHeader } from '../components/GroceryHeader';
import { AddItemForm } from '../components/AddItemForm';
import { GroceryList } from '../components/GroceryList';
import { CategoryChart } from '../components/CategoryChart';
import { SmartSuggestions } from '../components/SmartSuggestions';
import { NotesSection } from '../components/NotesSection';
import { ShareExportSection } from '../components/ShareExportSection';
import { useGrocery } from '../hooks/useGrocery';
import { GroceryItem } from '../types';

export const GroceryListScreen: React.FC = () => {
  const { 
    items, 
    stats, 
    resetList,
    clearCompleted 
  } = useGrocery();

  const [showAddForm, setShowAddForm] = useState(false);
  const [editingItem, setEditingItem] = useState<GroceryItem | null>(null);

  const handleAddPress = () => {
    setShowAddForm(true);
  };

  const handleFilterPress = () => {
    // Filter functionality is handled within the GroceryList component
    console.log('Filter pressed');
  };

  const handleSortPress = () => {
    // Sort functionality is handled within the GroceryList component
    console.log('Sort pressed');
  };

  const handleItemEdit = (item: GroceryItem) => {
    setEditingItem(item);
    setShowAddForm(true);
  };

  const handleItemToggle = (id: number) => {
    console.log('Item toggled:', id);
  };

  const handleItemDelete = (id: number) => {
    console.log('Item deleted:', id);
  };

  const handleSuggestionPress = (suggestion: any) => {
    console.log('Suggestion added:', suggestion.name);
  };

  const handleNotesSave = (notes: string) => {
    console.log('Notes saved:', notes);
  };

  const handleShare = (content: string) => {
    console.log('List shared:', content);
  };

  const handleExport = (format: string) => {
    console.log('List exported as:', format);
  };

  const handleClearAll = () => {
    Alert.alert(
      'Clear All Items',
      'Are you sure you want to clear all items from your grocery list?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Clear All', 
          style: 'destructive',
          onPress: () => {
            resetList();
          }
        }
      ]
    );
  };

  const handleClearCompleted = () => {
    Alert.alert(
      'Clear Completed Items',
      'Are you sure you want to remove all completed items?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Clear Completed', 
          style: 'destructive',
          onPress: () => {
            clearCompleted();
          }
        }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F9FAFB" />
      
      {/* Header */}
      <GroceryHeader
        onAddPress={handleAddPress}
        onFilterPress={handleFilterPress}
        onSortPress={handleSortPress}
      />

      {/* Main Content */}
      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        {/* Grocery List */}
        <GroceryList
          onItemEdit={handleItemEdit}
          onItemToggle={handleItemToggle}
          onItemDelete={handleItemDelete}
        />

        {/* Category Chart */}
        <CategoryChart />

        {/* Smart Suggestions */}
        <SmartSuggestions onSuggestionPress={handleSuggestionPress} />

        {/* Notes Section */}
        <NotesSection onSave={handleNotesSave} />

        {/* Share & Export Section */}
        <ShareExportSection 
          onShare={handleShare}
          onExport={handleExport}
        />

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <View style={styles.actionRow}>
            <View style={styles.actionButton} onTouchEnd={handleClearCompleted}>
              <View style={styles.actionIcon}>
                <View style={styles.iconBackground}>
                  <View style={styles.iconInner} />
                </View>
              </View>
              <View style={styles.actionText}>
                <View style={styles.actionTitle}>
                  <Text style={styles.titleText}>
                    Clear Completed
                  </Text>
                </View>
                <View style={styles.actionSubtitle}>
                  <Text style={styles.subtitleText}>
                    Remove checked items
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.actionButton} onTouchEnd={handleClearAll}>
              <View style={styles.actionIcon}>
                <View style={[styles.iconBackground, styles.dangerBackground]}>
                  <View style={[styles.iconInner, styles.dangerInner]} />
                </View>
              </View>
              <View style={styles.actionText}>
                <View style={styles.actionTitle}>
                  <Text style={[styles.titleText, styles.dangerText]}>
                    Clear All
                  </Text>
                </View>
                <View style={styles.actionSubtitle}>
                  <Text style={styles.subtitleText}>
                    Start fresh
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Add Item Modal */}
      <Modal
        visible={showAddForm}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setShowAddForm(false)}
      >
        <AddItemForm onClose={() => setShowAddForm(false)} />
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 20,
  },
  actionButtons: {
    paddingHorizontal: 16,
    marginTop: 8,
  },
  actionRow: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  actionIcon: {
    marginRight: 12,
  },
  iconBackground: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dangerBackground: {
    backgroundColor: '#FEF2F2',
  },
  iconInner: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#6B7280',
  },
  dangerInner: {
    backgroundColor: '#EF4444',
  },
  actionText: {
    flex: 1,
  },
  actionTitle: {
    marginBottom: 2,
  },
  titleText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
  },
  dangerText: {
    color: '#EF4444',
  },
  actionSubtitle: {
    marginBottom: 0,
  },
  subtitleText: {
    fontSize: 12,
    color: '#6B7280',
  },
}); 