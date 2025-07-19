export interface User {
  name: string;
  avatar: string;
}

export interface Counter {
  label: string;
  value: number;
  icon: () => React.ReactNode; // change to a function
}

export interface ProgressRingDatum {
  label: string;
  value: number;
  goal: number;
  color: string;
}

export interface ChartDatum {
  day: string;
  weight: number;
  calories: number;
}

export interface Goal {
  title: string;
  label: string;
  value: string;
  progress: number;
  target: number;
  icon: () => React.ReactNode;
  category: 'weight' | 'nutrition' | 'health' | 'exercise' | string;
  deadline: string;
  unit: string;
  current: number;
}

export interface ChartData {
  labels: string[];
  datasets: {
    data: number[];
    color: string;
    strokeWidth: number;
  }[];
}

export interface Activity {
  desc: string;
  time: string;
}

export interface Recommendation {
  text: string;
}

export interface AIInsight {
  id: string;
  type: 'recommendation' | 'warning' | 'achievement' | 'pattern';
  title: string;
  message: string;
  confidence: number; // 0-100
  category: string;
  actionable: boolean;
  actionText?: string;
}

export interface AnalyticsState {
  user: User;
  counters: Counter[];
  progressRings: ProgressRingDatum[];
  chartData: ChartDatum[];
  goals: Goal[];
  activityFeed: Activity[];
  recommendations: Recommendation[];
} 