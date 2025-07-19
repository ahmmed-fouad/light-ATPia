import { useMemo } from 'react';
import { useAnalyticsStore } from '../stores/analyticsStore';

export const useAnalytics = () => {
  const {
    user,
    counters,
    progressRings,
    chartData,
    goals,
    activityFeed,
    recommendations,
  } = useAnalyticsStore();

  return {
    // Data
    user,
    counters,
    progressRings,
    chartData,
    goals,
    activityFeed,
    recommendations,
  };
}; 