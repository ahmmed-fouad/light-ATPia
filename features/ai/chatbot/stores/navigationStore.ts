import { create } from 'zustand';
import { NavigationStore } from '../types/navigation';

export const useNavigationStore = create<NavigationStore>((set, get) => ({
  currentRoute: null,
  previousRoute: null,

  setCurrentRoute: (route) => {
    set((state) => ({
      previousRoute: state.currentRoute,
      currentRoute: route,
    }));
  },

  navigateToChat: (chatId: string) => {
    set((state) => ({
      previousRoute: state.currentRoute,
      currentRoute: 'ai/chat/[chatId]' as const,
    }));
  },

  navigateToLibrary: () => {
    set((state) => ({
      previousRoute: state.currentRoute,
      currentRoute: 'ai/library' as const,
    }));
  },

  navigateToExplore: () => {
    set((state) => ({
      previousRoute: state.currentRoute,
      currentRoute: 'ai/explore' as const,
    }));
  },

  goBack: () => {
    set((state) => ({
      currentRoute: state.previousRoute,
      previousRoute: state.currentRoute,
    }));
  },
})); 