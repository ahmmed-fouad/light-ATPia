import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
// import React from 'react';
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

export const ExploreScreen: React.FC = () => {
  const router = useRouter();

  const gptModels = [
    {
      id: '1',
      name: 'GPT-4',
      description: 'Most capable model for complex tasks',
      icon: '⚡',
      category: 'Advanced',
      isPopular: true,
    },
    {
      id: '2',
      name: 'GPT-3.5 Turbo',
      description: 'Fast and efficient for most tasks',
      icon: '🚀',
      category: 'Standard',
      isPopular: false,
    },
    {
      id: '3',
      name: 'Claude',
      description: 'Anthropic\'s AI assistant',
      icon: '🤖',
      category: 'Alternative',
      isPopular: false,
    },
    {
      id: '4',
      name: 'Code Assistant',
      description: 'Specialized in programming help',
      icon: '💻',
      category: 'Specialized',
      isPopular: true,
    },
    {
      id: '5',
      name: 'Creative Writer',
      description: 'Perfect for storytelling and content',
      icon: '✍️',
      category: 'Creative',
      isPopular: false,
    },
    {
      id: '6',
      name: 'Data Analyst',
      description: 'Excel at data analysis and insights',
      icon: '📊',
      category: 'Analytics',
      isPopular: false,
    },
  ];

  const renderGPTModel = ({ item }: { item: any }) => (
    <TouchableOpacity style={styles.modelCard}>
      <View style={styles.modelHeader}>
        <Text style={styles.modelIcon}>{item.icon}</Text>
        {item.isPopular && (
          <View style={styles.popularBadge}>
            <Text style={styles.popularText}>Popular</Text>
          </View>
        )}
      </View>
      
      <View style={styles.modelContent}>
        <Text style={styles.modelName}>{item.name}</Text>
        <Text style={styles.modelDescription}>{item.description}</Text>
        <View style={styles.modelCategory}>
          <Text style={styles.categoryText}>{item.category}</Text>
        </View>
      </View>
      
      <TouchableOpacity style={styles.selectButton}>
        <Ionicons name="arrow-forward" size={20} color="#3B82F6" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#374151" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Explore GPTs</Text>
        <View style={styles.headerSpacer} />
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#9CA3AF" style={styles.searchIcon} />
        <Text style={styles.searchPlaceholder}>Search GPTs...</Text>
      </View>

      {/* Content */}
      <FlatList
        data={gptModels}
        renderItem={renderGPTModel}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        numColumns={2}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  backButton: {
    padding: 8,
    borderRadius: 8,
  },
  headerTitle: {
    flex: 1,
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
    textAlign: 'center',
  },
  headerSpacer: {
    width: 40,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  searchIcon: {
    marginRight: 12,
  },
  searchPlaceholder: {
    flex: 1,
    fontSize: 16,
    color: '#9CA3AF',
  },
  content: {
    padding: 16,
  },
  modelCard: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    borderRadius: 16,
    padding: 16,
    margin: 4,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    minHeight: 160,
  },
  modelHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  modelIcon: {
    fontSize: 32,
  },
  popularBadge: {
    backgroundColor: '#EF4444',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  popularText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  modelContent: {
    flex: 1,
  },
  modelName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 4,
  },
  modelDescription: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
    lineHeight: 18,
  },
  modelCategory: {
    alignSelf: 'flex-start',
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#3B82F6',
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  selectButton: {
    alignSelf: 'flex-end',
    marginTop: 8,
  },
}); 