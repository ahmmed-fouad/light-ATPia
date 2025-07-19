import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { DrawerStore } from '../types/drawer';

export const useDrawerStore = create<DrawerStore>()(
  persist(
    (set, get) => ({
      isOpen: false,
      searchQuery: '',
      selectedSection: null,
      isHistoryExpanded: true,

      toggle: () => {
        set((state) => {
          console.log('Toggling drawer. Was open:', state.isOpen);
          return { isOpen: !state.isOpen };
        });
      },

      open: () => {
        console.log('Opening drawer');
        set({ isOpen: true });
      },

      close: () => {
        console.log('Closing drawer');
        set({ isOpen: false });
      },

      setSearchQuery: (query: string) => {
        set({ searchQuery: query });
      },

      setSelectedSection: (section: 'chats' | 'library' | 'explore' | null) => {
        set({ selectedSection: section });
      },

      toggleHistoryExpanded: () => {
        set((state) => ({ isHistoryExpanded: !state.isHistoryExpanded }));
      },

      clearSearch: () => {
        set({ searchQuery: '' });
      },
    }),
    {
      name: 'drawer-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        selectedSection: state.selectedSection,
        isHistoryExpanded: state.isHistoryExpanded,
      }),
    }
  )
); 