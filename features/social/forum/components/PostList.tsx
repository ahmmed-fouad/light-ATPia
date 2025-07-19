import React from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import { ForumPost } from '../types';
import { PostCard } from './PostCard';

interface PostListProps {
  posts: ForumPost[];
  onPostPress: (post: ForumPost) => void;
}

export const PostList: React.FC<PostListProps> = ({ posts, onPostPress }) => (
  <FlatList
    data={posts}
    keyExtractor={item => item.id.toString()}
    renderItem={({ item }) => <PostCard post={item} onPress={onPostPress} />}
    contentContainerStyle={styles.contentContainer}
    showsVerticalScrollIndicator={false}
  />
);

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
}); 