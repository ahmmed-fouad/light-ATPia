import { create } from 'zustand';
import { ForumStore, ForumPost } from '../types';
import { ForumService } from '../services/forumService';

export const useForumStore = create<ForumStore>((set, get) => ({
  posts: [],
  tags: [],
  counters: [],
  selectedTag: 'All',
  isPostModalVisible: false,
  isNewPostModalVisible: false,
  selectedPost: null,
  isLoading: false,
  error: null,

  fetchPosts: async () => {
    set({ isLoading: true, error: null });
    try {
      const [posts, tags, counters] = await Promise.all([
        ForumService.fetchPosts(),
        ForumService.fetchTags(),
        ForumService.fetchCounters(),
      ]);
      set({ posts, tags, counters, isLoading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to fetch forum data',
        isLoading: false,
      });
    }
  },

  setSelectedTag: (tag: string) => set({ selectedTag: tag }),
  setPostModalVisible: (visible: boolean) => set({ isPostModalVisible: visible }),
  setNewPostModalVisible: (visible: boolean) => set({ isNewPostModalVisible: visible }),
  setSelectedPost: (post: ForumPost | null) => set({ selectedPost: post }),
  addPost: (post: ForumPost) => set({ posts: [post, ...get().posts] }),
  clearError: () => set({ error: null }),
})); 