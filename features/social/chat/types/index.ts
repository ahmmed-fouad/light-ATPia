export type MessageType = 'text' | 'progress' | 'mood' | 'ai-card';

export interface User {
  id: string;
  name: string;
  avatarUrl?: string;
  isAI?: boolean;
}

export interface ChatMessage {
  id: string;
  type: MessageType;
  user: User;
  content: string;
  timestamp: number;
  // For progress/mood/ai-card
  data?: any;
}

export interface ProgressData {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  water: number;
  streak?: number;
}

export interface MoodData {
  mood: 'happy' | 'neutral' | 'sad' | 'energized' | 'tired';
  note?: string;
}

export interface QuickAction {
  id: string;
  label: string;
  icon: string;
  onPress: () => void;
} 