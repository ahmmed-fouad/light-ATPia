import { Goal, AIInsight, ChartData } from '../types';

export class AnalyticsService {
  // Data processing utilities
  static getFilteredData<T extends { date: string }>(
    data: T[],
    period: 'week' | 'month' | 'quarter' | 'year'
  ): T[] {
    const now = new Date();
    const periods = {
      week: 7,
      month: 30,
      quarter: 90,
      year: 365,
    };
    
    const daysBack = periods[period];
    const cutoffDate = new Date(now.getTime() - daysBack * 24 * 60 * 60 * 1000);
    
    return data.filter(item => new Date(item.date) >= cutoffDate);
  }

  // Chart data generation
  static generateProgressChartData(data: any[]): ChartData {
    return {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      datasets: [
        {
          data: [70, 69.8, 69.7, 69.6, 69.5, 69.4, 69.3],
          color: '#8B5CF6',
          strokeWidth: 3,
        },
      ],
    };
  }

  static generateNutritionChartData(data: any[]): ChartData {
    return {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      datasets: [
        {
          data: [2100, 2200, 2000, 2300, 2100, 2150, 2250],
          color: '#F59E0B',
          strokeWidth: 3,
        },
      ],
    };
  }

  static generateHealthChartData(data: any[]): ChartData {
    return {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      datasets: [
        {
          data: [8, 7.5, 8.5, 7, 8, 9, 7.5],
          color: '#3B82F6',
          strokeWidth: 3,
        },
      ],
    };
  }

  // Statistics calculations
  static calculateProgressStats(data: any[]): {
    totalLoss: number;
    weeklyAverage: number;
    trend: 'increasing' | 'decreasing' | 'stable';
  } {
    return { totalLoss: 2.5, weeklyAverage: 0.6, trend: 'decreasing' };
  }

  static calculateNutritionStats(data: any[]): {
    avgCalories: number;
    avgProtein: number;
    avgCarbs: number;
    avgFats: number;
    consistency: number;
  } {
    return { avgCalories: 2150, avgProtein: 150, avgCarbs: 200, avgFats: 70, consistency: 85 };
  }

  // AI Insights generation
  static generateInsights(
    progressData: any[],
    nutritionData: any[],
    healthData: any[],
    goals: Goal[]
  ): AIInsight[] {
    const insights: AIInsight[] = [];
    
    // Progress insights
    const progressStats = this.calculateProgressStats(progressData);
    if (progressStats.totalLoss > 0) {
      insights.push({
        id: `insight-${Date.now()}-1`,
        type: 'achievement',
        title: 'Weight Loss Success!',
        message: `You've lost ${progressStats.totalLoss.toFixed(1)}kg. Keep up the great work!`,
        confidence: 95,
        category: 'progress',
        actionable: false,
      });
    }
    
    // Nutrition insights
    const nutritionStats = this.calculateNutritionStats(nutritionData);
    if (nutritionStats.consistency < 70) {
      insights.push({
        id: `insight-${Date.now()}-2`,
        type: 'recommendation',
        title: 'Improve Consistency',
        message: 'Your daily calorie intake varies significantly. Try to maintain more consistent eating patterns.',
        confidence: 85,
        category: 'nutrition',
        actionable: true,
        actionText: 'View Meal Plans',
      });
    }
    
    // Goal insights
    const nearDeadlineGoals = goals.filter(goal => {
      const deadline = new Date(goal.deadline);
      const now = new Date();
      const daysLeft = (deadline.getTime() - now.getTime()) / (24 * 60 * 60 * 1000);
      return daysLeft <= 7 && goal.progress < 90;
    });
    
    nearDeadlineGoals.forEach(goal => {
      insights.push({
        id: `insight-${Date.now()}-3`,
        type: 'warning',
        title: 'Goal Deadline Approaching',
        message: `${goal.title} deadline is coming up. You're ${goal.progress}% complete.`,
        confidence: 90,
        category: 'progress',
        actionable: true,
        actionText: 'Update Progress',
      });
    });
    
    return insights;
  }

  // Utility functions
  static formatDate(date: string): string {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  }

  static formatNumber(value: number, decimals: number = 1): string {
    return value.toFixed(decimals);
  }

  static getProgressColor(progress: number): string {
    if (progress >= 80) return '#10B981';
    if (progress >= 60) return '#F59E0B';
    return '#EF4444';
  }

  static getInsightColor(type: AIInsight['type']): string {
    switch (type) {
      case 'achievement': return '#10B981';
      case 'recommendation': return '#3B82F6';
      case 'warning': return '#F59E0B';
      case 'pattern': return '#8B5CF6';
      default: return '#6B7280';
    }
  }
} 