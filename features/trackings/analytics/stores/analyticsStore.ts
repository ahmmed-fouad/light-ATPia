import { create } from 'zustand';
import { AnalyticsState } from '../types';
import { user, counters, progressRings, chartData, goals, activityFeed, recommendations } from '../data/analyticsData';

export const useAnalyticsStore = create<AnalyticsState>(() => ({
  user,
  counters,
  progressRings,
  chartData,
  goals,
  activityFeed,
  recommendations,
})); 