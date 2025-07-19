import { create } from 'zustand';
import { ChatMessage, User } from '../types';

interface ChatStoreState {
  messages: ChatMessage[];
  isLoading: boolean;
  user: User;
  sendMessage: (msg: Omit<ChatMessage, 'id' | 'timestamp'>) => void;
  receiveMessage: (msg: ChatMessage) => void;
  clearChat: () => void;
}

export const useChatStore = create<ChatStoreState>((set, get) => ({
  messages: [],
  isLoading: false,
  user: {
    id: 'user-1',
    name: 'You',
    avatarUrl: undefined,
    isAI: false,
  },
  sendMessage: (msg) => {
    const newMsg: ChatMessage = {
      ...msg,
      id: `msg-${Date.now()}`,
      timestamp: Date.now(),
      user: get().user,
    };
    set((state) => ({ messages: [...state.messages, newMsg] }));
  },
  receiveMessage: (msg) => {
    set((state) => ({ messages: [...state.messages, msg] }));
  },
  clearChat: () => set({ messages: [] }),
})); 