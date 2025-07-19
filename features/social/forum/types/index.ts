export interface ForumUser {
  id: number;
  name: string;
  avatar?: string;
}

export interface ForumPost {
  id: number;
  title: string;
  content: string;
  tags: string[];
  author: ForumUser;
  createdAt: string;
  comments: number;
  likes: number;
}

export interface ForumCounter {
  label: string;
  value: number;
  icon?: string;
}

export interface ForumState {
  posts: ForumPost[];
  tags: string[];
  counters: ForumCounter[];
  selectedTag: string;
  isPostModalVisible: boolean;
  isNewPostModalVisible: boolean;
  selectedPost: ForumPost | null;
  isLoading: boolean;
  error: string | null;
}

export interface ForumStore extends ForumState {
  fetchPosts: () => Promise<void>;
  setSelectedTag: (tag: string) => void;
  setPostModalVisible: (visible: boolean) => void;
  setNewPostModalVisible: (visible: boolean) => void;
  setSelectedPost: (post: ForumPost | null) => void;
  addPost: (post: ForumPost) => void;
  clearError: () => void;
} 