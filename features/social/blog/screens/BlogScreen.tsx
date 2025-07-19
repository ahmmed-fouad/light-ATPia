import React from 'react';
import { View, Text, StyleSheet, Platform, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useBlog } from '../hooks/useBlog';
import { BlogGrid } from '../components/BlogGrid';
import { PopularTopicsChart } from '../components/PopularTopicsChart';
import { BlogPostModal } from './BlogPostModal';
import { chartData } from '../data/chartData';

export const BlogScreen: React.FC = () => {
  const {
    posts,
    selectedPost,
    isLoading,
    error,
    isModalVisible,
    handlePostPress,
    handleModalClose,
    refetch,
  } = useBlog();

  return (
    <LinearGradient
      colors={["#f5f7fa", "#e0f7fa", "#d1fae5"]}
      style={{ flex: 1 }}
    >
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Nutrition Blog</Text>
          <Text style={styles.subtitle}>
            Expert articles and tips for your health journey
          </Text>
        </View>

        {/* Error State */}
        {error && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}

        {/* Scrollable Content: BlogGrid + Chart */}
        <ScrollView style={styles.scrollArea} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <BlogGrid
            posts={posts}
            onPostPress={handlePostPress}
            isLoading={isLoading}
          />
          {/* Chart at the end of scrollable content */}
          {!isLoading && posts.length > 0 && (
            <PopularTopicsChart data={chartData} />
          )}
        </ScrollView>

        {/* Blog Post Modal */}
        <BlogPostModal
          post={selectedPost}
          visible={isModalVisible}
          onClose={handleModalClose}
          chartData={chartData}
        />
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#059669',
    marginBottom: 8,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif',
    letterSpacing: 0.5,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#64748b',
    fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif',
    textAlign: 'center',
    fontWeight: '500',
    letterSpacing: 0.2,
  },
  errorContainer: {
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 16,
  },
  errorText: {
    color: '#ef4444',
    fontSize: 14,
    textAlign: 'center',
    fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif',
  },
  scrollArea: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 32,
  },
}); 