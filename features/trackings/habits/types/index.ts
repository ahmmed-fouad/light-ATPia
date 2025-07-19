export type Habit = {
  id: string;
  name: string;
  color: string;
};

export type HabitProgress = {
  date: string;
  [habitId: string]: boolean | string;
};

export type Streak = {
  habitId: string;
  count: number;
};

export type MotivationalQuote = string;

export type CalendarDay = {
  date: string;
  completed: boolean;
};

export type HabitsState = {
  habits: Habit[];
  checked: boolean[];
  quoteIdx: number;
  note: string;
  streak: number;
  view: 'week' | 'month';
  setChecked: (checked: boolean[]) => void;
  setQuoteIdx: (idx: number) => void;
  setNote: (note: string) => void;
  setStreak: (streak: number) => void;
  setView: (view: 'week' | 'month') => void;
}; 