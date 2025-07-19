import { create } from 'zustand';
import type { HomeData } from '../types/homeTypes';

interface HomeStoreState {
  homeData: HomeData | null;
  setHomeData: (data: HomeData) => void;
}

export const useHomeStore = create<HomeStoreState>((set) => ({
  homeData: null,
  setHomeData: (data) => set({ homeData: data }),
})); 