import { User, Counter, ProgressRingDatum, ChartDatum, Goal, Activity, Recommendation } from '../types';
import { Droplet, Footprints, Plus } from 'lucide-react-native';

export const user: User = {
  name: 'Jane Doe',
  avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
};

export const counters: Counter[] = [
  { label: 'steps', value: 12000, icon: () => <Footprints size={18} color="#6366f1"/> },
  { label: 'calories', value: 2200, icon: () => <Plus size={18} color="#fbbf24" /> },
  { label: 'water', value: 2.5, icon: () => <Droplet size={18} color="#60a5fa" /> },
  { label: 'sleep', value: 7, icon: () => <Plus size={18} color="#10b981" /> },
];

export const progressRings: ProgressRingDatum[] = [
  { label: 'Steps', value: 9000, goal: 12000, color: '#6366f1' },
  { label: 'Water', value: 2, goal: 2.5, color: '#60a5fa' },
  { label: 'Calories', value: 1800, goal: 2200, color: '#fbbf24' },
];
export const chartData: ChartDatum[] = [
  { day: 'Mon', weight: 70, calories: 2100 },
  { day: 'Tue', weight: 69.8, calories: 2200 },
  { day: 'Wed', weight: 69.7, calories: 2000 },
  { day: 'Thu', weight: 69.6, calories: 2300 },
  { day: 'Fri', weight: 69.5, calories: 2100 },
  { day: 'Sat', weight: 69.4, calories: 2150 },
  { day: 'Sun', weight: 69.3, calories: 2250 },
];

export const goals: Goal[] = [
  { 
    title: 'Weight Goal', 
    label: 'Weight', 
    value: '69.3kg', 
    progress: 69.3, 
    target: 68, 
    icon: () => <Plus size={16} color="#6366f1" />,
    category: 'weight',
    deadline: '2024-12-31',
    unit: 'kg',
    current: 69.3
  },
  { 
    title: 'Calorie Goal', 
    label: 'Calories', 
    value: '2200', 
    progress: 1800, 
    target: 2200, 
    icon: () => <Plus size={16} color="#fbbf24" />,
    category: 'nutrition',
    deadline: '2024-12-31',
    unit: 'kcal',
    current: 1800
  },
];

export const activityFeed: Activity[] = [
  { desc: 'Logged breakfast', time: '2h ago' },
  { desc: 'Added water', time: '3h ago' },
  { desc: 'Completed workout', time: '5h ago' },
];

export const recommendations: Recommendation[] = [
  { text: 'Try a new high-protein recipe today!' },
  { text: 'You\'re close to your water goal. Drink another glass!' },
  { text: 'Keep your streak going—log your dinner tonight.' },
]; 