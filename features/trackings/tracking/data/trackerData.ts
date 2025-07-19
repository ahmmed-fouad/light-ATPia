import { Stat, Badge, MetricOption, ProgressDataPoint } from '../types/index';

export const demoStats: Stat[] = [
  { label: "Weight", value: 72, unit: "kg", icon: "trendingUp" },
  { label: "BMI", value: 23.1, unit: "", icon: "flame-orange" },
  { label: "Calories", value: 1850, unit: "kcal", icon: "flame-red" },
  { label: "Steps", value: 8200, unit: "", icon: "footprints" },
  { label: "Water", value: 2.3, unit: "L", icon: "droplet" },
];

export const demoBadges: Badge[] = [
  { label: "5kg Lost", icon: "trophy-yellow" },
  { label: "30 Days Logged", icon: "trophy-green" },
  { label: "Hydration Hero", icon: "droplet" },
];

export const progressData: ProgressDataPoint[] = [
  { date: "2024-06-01", weight: 75, calories: 2100, steps: 6000, water: 1.5 },
  { date: "2024-06-05", weight: 74, calories: 2000, steps: 7000, water: 1.8 },
  { date: "2024-06-10", weight: 73.5, calories: 1950, steps: 8000, water: 2.0 },
  { date: "2024-06-15", weight: 73, calories: 1900, steps: 8500, water: 2.1 },
  { date: "2024-06-20", weight: 72.5, calories: 1850, steps: 9000, water: 2.2 },
  { date: "2024-06-25", weight: 72, calories: 1850, steps: 8200, water: 2.3 },
];

export const gallery = [
  "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400",
  "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400",
  "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400",
];

export const motivationalQuotes = [
  "Progress, not perfection!",
  "Every step counts on your journey.",
  "Small changes make a big difference.",
  "You are stronger than you think!",
];

export const metricOptions: MetricOption[] = [
  { key: "weight", label: "Weight", color: "#34d399" },
  { key: "calories", label: "Calories", color: "#f87171" },
  { key: "steps", label: "Steps", color: "#60a5fa" },
  { key: "water", label: "Water", color: "#38bdf8" },
]; 