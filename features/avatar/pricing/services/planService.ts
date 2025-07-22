import { PlanType } from '../types/planTypes';

export const plans: PlanType[] = [
  {
    id: 'beginner',
    name: 'Beginner Plan',
    price: 39,
    period: 'month',
    description: 'For beginner',
    label: 'For beginner',
    icon: '📝',
    iconColor: '#1e9e6a',
    bgColor: '#fff4ef',
    textColor: '#1e293b',
  },
  {
    id: 'pro',
    name: 'Pro Plan',
    price: 199,
    period: 'year',
    description: 'For beginner',
    label: 'For beginner',
    icon: '🏅',
    iconColor: '#a3e635',
    bgColor: '#f8fafc',
    textColor: '#1e293b',
  },
]; 