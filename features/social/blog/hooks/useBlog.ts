import { useEffect } from 'react';
import { useBlogStore } from '../stores/blogStore';

export const useBlog = () => {
  const {
    posts,
    selectedPost,
    isLoading,
    error,
    isModalVisible,
    fetchPosts,
    setSelectedPost,
    setModalVisible,
    clearError,
  } = useBlogStore();

  useEffect(() => {
    // Fetch posts when the hook is first used
    if (posts.length === 0 && !isLoading) {
      fetchPosts();
    }
  }, []);

  const handlePostPress = (post: any) => {
    setSelectedPost(post);
    setModalVisible(true);
  };

  const handleModalClose = () => {
    setModalVisible(false);
    setSelectedPost(null);
  };

  return {
    posts,
    selectedPost,
    isLoading,
    error,
    isModalVisible,
    handlePostPress,
    handleModalClose,
    clearError,
    refetch: fetchPosts,
  };
}; 