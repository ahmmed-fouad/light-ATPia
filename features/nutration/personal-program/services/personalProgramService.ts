import { PersonalProgram } from '../types/personalProgramTypes';

const mockProgram: PersonalProgram = {
  summary: {
    startWeight: 60,
    endWeight: 72,
    durationWeeks: 16,
    weeklyChange: 0.75,
    totalChange: 12,
    startDate: 'Today',
    endDate: '18 July 2022',
  },
  chartData: [
    { x: '0', y: 60 },
    { x: '4', y: 62 },
    { x: '8', y: 65 },
    { x: '12', y: 68 },
    { x: '16', y: 72 },
  ],
  recommendations: [
    { label: 'Daily Calories', value: 2925, percent: 100, color: '#18b888' },
    { label: 'Carbs', value: '50%', percent: 50, color: '#F43F5E' },
    { label: 'Fat', value: '30%', percent: 30, color: '#F59E42' },
    { label: 'Protein', value: '20%', percent: 20, color: '#6366F1' },
    { label: 'Daily water intake', value: '2000ml', percent: 100, color: '#22C55E' },
  ],
  activities: [
    { label: 'Track your food', icon: 'salad' },
    { label: 'Balance your intake', icon: 'balance' },
    { label: 'Stay hydrated', icon: 'drink' },
    { label: 'Update your weight', icon: 'chart' },
  ],
};

export function getPersonalProgram() {
  return mockProgram;
} 