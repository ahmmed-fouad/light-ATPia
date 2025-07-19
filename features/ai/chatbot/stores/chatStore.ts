import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { Chat, ChatStore, Message } from '../types/chat';

const generateId = () => Math.random().toString(36).substr(2, 9);

export const useChatStore = create<ChatStore>()(
  persist(
    (set, get) => ({
      chats: [],
      currentChatId: null,
      isLoading: false,
      error: null,

      addChat: (chat: Chat) => {
        set((state) => ({
          chats: [chat, ...state.chats],
          currentChatId: chat.id,
        }));
      },

      updateChat: (id: string, messages: Message[], title?: string) => {
        set((state) => ({
          chats: state.chats.map((chat) =>
            chat.id === id
              ? {
                  ...chat,
                  messages,
                  title: title || chat.title,
                  lastModified: new Date(),
                }
              : chat
          ),
        }));
      },

      updateChatWithTitle: (id: string, messages: Message[], title: string) => {
        set((state) => ({
          chats: state.chats.map((chat) =>
            chat.id === id
              ? {
                  ...chat,
                  messages,
                  title,
                  lastModified: new Date(),
                }
              : chat
          ),
        }));
      },

      deleteChat: (id: string) => {
        set((state) => ({
          chats: state.chats.filter((chat) => chat.id !== id),
          currentChatId: state.currentChatId === id ? null : state.currentChatId,
        }));
      },

      setCurrentChat: (id: string) => {
        set({ currentChatId: id });
      },

      clearCurrentChat: () => {
        set({ currentChatId: null });
      },

      loadChats: async () => {
        set({ isLoading: true, error: null });
        try {
          // Chat data is automatically loaded by persist middleware
          set({ isLoading: false });
        } catch (error) {
          set({ 
            isLoading: false, 
            error: error instanceof Error ? error.message : 'Failed to load chats' 
          });
        }
      },

      saveChats: async () => {
        set({ isLoading: true, error: null });
        try {
          // Chat data is automatically saved by persist middleware
          set({ isLoading: false });
        } catch (error) {
          set({ 
            isLoading: false, 
            error: error instanceof Error ? error.message : 'Failed to save chats' 
          });
        }
      },

      clearError: () => {
        set({ error: null });
      },
    }),
    {
      name: 'chat-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        chats: state.chats,
        currentChatId: state.currentChatId,
      }),
    }
  )
); 