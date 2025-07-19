import { useEffect } from 'react';
import { useForumStore } from '../stores/forumStore';
import { ForumPost } from '../types';

export const useForum = () => {
  const {
    posts,
    tags,
    counters,
    selectedTag,
    isPostModalVisible,
    isNewPostModalVisible,
    selectedPost,
    isLoading,
    error,
    fetchPosts,
    setSelectedTag,
    setPostModalVisible,
    setNewPostModalVisible,
    setSelectedPost,
    addPost,
    clearError,
  } = useForumStore();

  useEffect(() => {
    if (posts.length === 0 && !isLoading) {
      fetchPosts();
    }
  }, []);

  const filteredPosts = selectedTag === 'All'
    ? posts
    : posts.filter(post => post.tags.includes(selectedTag));

  const openPostModal = (post: ForumPost) => {
    setSelectedPost(post);
    setPostModalVisible(true);
  };

  const closePostModal = () => {
    setPostModalVisible(false);
    setSelectedPost(null);
  };

  const openNewPostModal = () => setNewPostModalVisible(true);
  const closeNewPostModal = () => setNewPostModalVisible(false);

  return {
    posts,
    tags,
    counters,
    selectedTag,
    isPostModalVisible,
    isNewPostModalVisible,
    selectedPost,
    isLoading,
    error,
    filteredPosts,
    setSelectedTag,
    openPostModal,
    closePostModal,
    openNewPostModal,
    closeNewPostModal,
    addPost,
    clearError,
    refetch: fetchPosts,
  };
}; 