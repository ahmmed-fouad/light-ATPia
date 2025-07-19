import { create } from 'zustand';
import type { HabitsState } from '../types/index';
import { demoHabits } from '../data/habitsData';

export const useHabitsStore = create<HabitsState>((set) => ({
  habits: demoHabits,
  checked: [true, true, false, true, true],
  quoteIdx: 0,
  note: '',
  streak: 9,
  view: 'week',
  setChecked: (checked) => set({ checked }),
  setQuoteIdx: (quoteIdx) => set({ quoteIdx }),
  setNote: (note) => set({ note }),
  setStreak: (streak) => set({ streak }),
  setView: (view) => set({ view }),
})); 