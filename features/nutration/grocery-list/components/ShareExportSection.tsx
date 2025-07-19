import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  Alert,
  Share
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useGrocery } from '../hooks/useGrocery';
import { GroceryService } from '../services/groceryService';

interface ShareExportSectionProps {
  onShare?: (content: string) => void;
  onExport?: (format: string) => void;
}

export const ShareExportSection: React.FC<ShareExportSectionProps> = ({
  onShare,
  onExport
}) => {
  const { items, notes, stats, shareExportOptions, setShareExportOptions } = useGrocery();
  const [showOptions, setShowOptions] = useState(false);

  const handleShare = async () => {
    try {
      const exportText = GroceryService.exportToText(items, notes);
      
      const result = await Share.share({
        message: exportText,
        title: 'My Grocery List'
      });

      if (result.action === Share.sharedAction) {
        onShare?.(exportText);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to share the grocery list');
    }
  };

  const handleExport = (format: 'text' | 'pdf' | 'csv') => {
    setShareExportOptions({ format });
    
    let content = '';
    switch (format) {
      case 'text':
        content = GroceryService.exportToText(items, notes);
        break;
      case 'csv':
        content = generateCSV();
        break;
      case 'pdf':
        content = 'PDF export would be implemented here';
        break;
    }

    Alert.alert(
      'Export Successful',
      `Your grocery list has been exported as ${format.toUpperCase()}`,
      [
        { text: 'OK' },
        { 
          text: 'Share', 
          onPress: () => Share.share({ message: content, title: 'Grocery List Export' })
        }
      ]
    );

    onExport?.(format);
  };

  const generateCSV = () => {
    const headers = 'Name,Quantity,Category,Bought\n';
    const rows = items.map(item => 
      `"${item.name}","${item.qty}","${item.category}","${item.bought ? 'Yes' : 'No'}"`
    ).join('\n');
    return headers + rows;
  };

  const renderExportOptions = () => (
    <View style={styles.optionsContainer}>
      <Text style={styles.optionsTitle}>Export Format</Text>
      
      <View style={styles.formatOptions}>
        {[
          { key: 'text', label: 'Text', icon: 'document-text' },
          { key: 'csv', label: 'CSV', icon: 'grid' },
          { key: 'pdf', label: 'PDF', icon: 'document' }
        ].map((format) => (
          <TouchableOpacity
            key={format.key}
            style={[
              styles.formatOption,
              shareExportOptions.format === format.key && styles.formatOptionActive
            ]}
            onPress={() => handleExport(format.key as any)}
          >
            <Ionicons 
              name={format.icon as any} 
              size={16} 
              color={shareExportOptions.format === format.key ? 'white' : '#6B7280'} 
            />
            <Text style={[
              styles.formatLabel,
              shareExportOptions.format === format.key && styles.formatLabelActive
            ]}>
              {format.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.checkboxOptions}>
        <TouchableOpacity
          style={styles.checkboxRow}
          onPress={() => setShareExportOptions({ 
            includeNotes: !shareExportOptions.includeNotes 
          })}
        >
          <View style={[
            styles.checkbox,
            shareExportOptions.includeNotes && styles.checkboxChecked
          ]}>
            {shareExportOptions.includeNotes && (
              <Ionicons name="checkmark" size={12} color="white" />
            )}
          </View>
          <Text style={styles.checkboxLabel}>Include notes</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.checkboxRow}
          onPress={() => setShareExportOptions({ 
            includeStats: !shareExportOptions.includeStats 
          })}
        >
          <View style={[
            styles.checkbox,
            shareExportOptions.includeStats && styles.checkboxChecked
          ]}>
            {shareExportOptions.includeStats && (
              <Ionicons name="checkmark" size={12} color="white" />
            )}
          </View>
          <Text style={styles.checkboxLabel}>Include statistics</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Ionicons name="share-outline" size={20} color="#6B7280" />
          <Text style={styles.title}>Share & Export</Text>
        </View>
        
        <TouchableOpacity 
          style={styles.toggleButton}
          onPress={() => setShowOptions(!showOptions)}
        >
          <Ionicons 
            name={showOptions ? "chevron-up" : "chevron-down"} 
            size={20} 
            color="#6B7280" 
          />
        </TouchableOpacity>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.actionButton} onPress={handleShare}>
          <Ionicons name="share-social" size={18} color="#10B981" />
          <Text style={styles.actionText}>Share List</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.actionButton} 
          onPress={() => handleExport(shareExportOptions.format)}
        >
          <Ionicons name="download" size={18} color="#3B82F6" />
          <Text style={styles.actionText}>Export</Text>
        </TouchableOpacity>
      </View>

      {showOptions && renderExportOptions()}

      <View style={styles.stats}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{stats.totalItems}</Text>
          <Text style={styles.statLabel}>Total Items</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{stats.boughtItems}</Text>
          <Text style={styles.statLabel}>Completed</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>${stats.totalEstimatedCost.toFixed(2)}</Text>
          <Text style={styles.statLabel}>Est. Cost</Text>
        </View>
      </View>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginLeft: 8,
  },
  toggleButton: {
    padding: 4,
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    gap: 6,
  },
  actionText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
  },
  optionsContainer: {
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    paddingTop: 16,
    marginBottom: 16,
  },
  optionsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 12,
  },
  formatOptions: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  formatOption: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    backgroundColor: '#F3F4F6',
    gap: 4,
  },
  formatOptionActive: {
    backgroundColor: '#10B981',
  },
  formatLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: '#6B7280',
  },
  formatLabelActive: {
    color: 'white',
  },
  checkboxOptions: {
    gap: 8,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  checkbox: {
    width: 16,
    height: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#10B981',
    borderColor: '#10B981',
  },
  checkboxLabel: {
    fontSize: 12,
    color: '#374151',
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
  },
  statLabel: {
    fontSize: 11,
    color: '#6B7280',
    marginTop: 2,
  },
}); 