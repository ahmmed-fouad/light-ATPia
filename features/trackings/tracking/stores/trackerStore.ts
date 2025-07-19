import { create } from 'zustand';
import { TrackerState } from '../types/index';

export const useTrackerStore = create<TrackerState>((set) => ({
  metric: 'weight',
  quoteIdx: 0,
  note: '',
  streak: 12,
  setMetric: (metric) => set({ metric }),
  setQuoteIdx: (quoteIdx) => set({ quoteIdx }),
  setNote: (note) => set({ note }),
  setStreak: (streak) => set({ streak }),
})); 