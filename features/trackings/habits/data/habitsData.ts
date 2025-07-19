import type { Habit, HabitProgress, MotivationalQuote, CalendarDay } from '../types/index';

export const demoHabits: Habit[] = [
  { id: '1', name: 'Drink Water', color: '#38bdf8' },
  { id: '2', name: 'Exercise', color: '#f87171' },
  { id: '3', name: 'Read', color: '#34d399' },
  { id: '4', name: 'Meditate', color: '#a78bfa' },
  { id: '5', name: 'Sleep Early', color: '#fbbf24' },
];

export const demoProgress: HabitProgress[] = [
  { date: '2024-06-01', '1': true, '2': true, '3': false, '4': true, '5': true },
  { date: '2024-06-02', '1': true, '2': false, '3': true, '4': true, '5': false },
  { date: '2024-06-03', '1': false, '2': true, '3': true, '4': false, '5': true },
  { date: '2024-06-04', '1': true, '2': true, '3': true, '4': true, '5': true },
  { date: '2024-06-05', '1': true, '2': false, '3': false, '4': true, '5': true },
  { date: '2024-06-06', '1': true, '2': true, '3': true, '4': false, '5': false },
  { date: '2024-06-07', '1': true, '2': true, '3': true, '4': true, '5': true },
];

export const motivationalQuotes: MotivationalQuote[] = [
  'Small steps every day!',
  'Consistency is the key to success.',
  'You are building a better you.',
  'Stay positive and keep going!',
  'Habits shape your future.',
  'Progress, not perfection!',
  'Every day is a new opportunity.',
  'You are stronger than you think!'
];

export const calendarDemo: CalendarDay[] = [
  { date: '2024-06-01', completed: true },
  { date: '2024-06-02', completed: false },
  { date: '2024-06-03', completed: true },
  { date: '2024-06-04', completed: true },
  { date: '2024-06-05', completed: false },
  { date: '2024-06-06', completed: true },
  { date: '2024-06-07', completed: true },
]; 