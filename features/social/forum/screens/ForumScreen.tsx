import React from 'react';
import { View, StyleSheet, Platform, TouchableOpacity, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useForum } from '../hooks/useForum';
import { Header } from '../components/Header';
import { Sidebar } from '../components/Sidebar';
import { PostList } from '../components/PostList';
import { PostModal } from './PostModal';
import { NewPostModal } from './NewPostModal';
import { forumUsers } from '../data/forumData';

export const ForumScreen: React.FC = () => {
  const {
    counters,
    tags,
    selectedTag,
    filteredPosts,
    isLoading,
    isPostModalVisible,
    isNewPostModalVisible,
    selectedPost,
    setSelectedTag,
    openPostModal,
    closePostModal,
    openNewPostModal,
    closeNewPostModal,
    addPost,
  } = useForum();

  // Use the first user as the current user for new posts (replace with auth in real app)
  const currentUser = forumUsers[0];

  return (
    <LinearGradient colors={["#f5f7fa", "#e0f7fa", "#d1fae5"]} style={{ flex: 1 }}>
      <View style={styles.container}>
        <Header counters={counters} />
        <Sidebar tags={tags} selectedTag={selectedTag} onSelect={setSelectedTag} />
        <TouchableOpacity style={styles.newPostButton} onPress={openNewPostModal} activeOpacity={0.85}>
          <Text style={styles.newPostButtonText}>+ New Post</Text>
        </TouchableOpacity>
        <View style={styles.listContainer}>
          <PostList posts={filteredPosts} onPostPress={openPostModal} />
        </View>
        <PostModal post={selectedPost} visible={isPostModalVisible} onClose={closePostModal} />
        <NewPostModal visible={isNewPostModalVisible} onClose={closeNewPostModal} onSubmit={addPost} user={currentUser} />
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  newPostButton: {
    backgroundColor: '#059669',
    borderRadius: 14,
    paddingVertical: 12,
    alignItems: 'center',
    marginHorizontal: 16,
    marginBottom: 10,
    shadowColor: '#059669',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: Platform.OS === 'ios' ? 0.15 : 0.20,
    shadowRadius: 4,
    elevation: 3,
  },
  newPostButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif',
    letterSpacing: 0.5,
  },
  listContainer: {
    flex: 1,
  },
}); 