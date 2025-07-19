import { create } from 'zustand';
import { BlogStore, BlogPost } from '../types';
import { BlogService } from '../services/blogService';

export const useBlogStore = create<BlogStore>((set, get) => ({
  posts: [],
  selectedPost: null,
  isLoading: false,
  error: null,
  isModalVisible: false,

  fetchPosts: async () => {
    set({ isLoading: true, error: null });
    
    try {
      // Use mock data for now, can switch to real API later
      const posts = await BlogService.fetchMockBlogPosts();
      set({ posts, isLoading: false });
    } catch (error) {
      console.error('Error fetching blog posts:', error);
      set({ 
        error: error instanceof Error ? error.message : 'Failed to fetch blog posts', 
        isLoading: false 
      });
    }
  },

  setSelectedPost: (post: BlogPost | null) => {
    set({ selectedPost: post });
  },

  setModalVisible: (visible: boolean) => {
    set({ isModalVisible: visible });
  },

  clearError: () => {
    set({ error: null });
  },
})); 