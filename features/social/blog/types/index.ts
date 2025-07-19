export interface BlogPost {
  id: number;
  title: string;
  description: string;
  cover_image?: string;
  url: string;
  published_at: string;
  user?: {
    name?: string;
    username?: string;
  };
  translatedTitle?: string;
  translatedDescription?: string;
}

export interface ChartDataPoint {
  topic: string;
  articles: number;
}

export interface BlogState {
  posts: BlogPost[];
  selectedPost: BlogPost | null;
  isLoading: boolean;
  error: string | null;
  isModalVisible: boolean;
}

export interface BlogStore extends BlogState {
  fetchPosts: () => Promise<void>;
  setSelectedPost: (post: BlogPost | null) => void;
  setModalVisible: (visible: boolean) => void;
  clearError: () => void;
}

export interface BlogCardProps {
  post: BlogPost;
  onPress: (post: BlogPost) => void;
}

export interface BlogGridProps {
  posts: BlogPost[];
  onPostPress: (post: BlogPost) => void;
  isLoading: boolean;
}

export interface PopularTopicsChartProps {
  data: ChartDataPoint[];
}

export interface BlogPostModalProps {
  post: BlogPost | null;
  visible: boolean;
  onClose: () => void;
  chartData: ChartDataPoint[];
} 