// Pricing data for React Native Pricing feature

export type Plan = {
  name: 'Free' | 'Pro' | 'Family';
  price: number;
  features: string[];
  highlight: boolean;
};

export const plans: Plan[] = [
  {
    name: 'Free',
    price: 0,
    features: [
      '10 recipes/month',
      'Basic nutrition info',
      'Community forum',
      'Email support',
    ],
    highlight: false,
  },
  {
    name: 'Pro',
    price: 9,
    features: [
      'Unlimited recipes',
      'AI Chatbot',
      'Advanced nutrition analysis',
      'Priority support',
    ],
    highlight: true,
  },
  {
    name: 'Family',
    price: 15,
    features: [
      'Unlimited recipes',
      'AI Chatbot',
      'Family accounts (up to 5)',
      'Priority support',
    ],
    highlight: false,
  },
];

export type ChartData = {
  feature: string;
  Free: number;
  Pro: number;
  Family: number;
};

export const chartData: ChartData[] = [
  { feature: 'Recipes', Free: 10, Pro: 100, Family: 100 },
  { feature: 'AI Chatbot', Free: 0, Pro: 1, Family: 1 },
  { feature: 'Nutrition Analysis', Free: 0, Pro: 1, Family: 1 },
  { feature: 'Family Accounts', Free: 0, Pro: 0, Family: 1 },
  { feature: 'Support', Free: 1, Pro: 2, Family: 2 },
];

export type PlanFAQ = {
  q: string;
  a: string;
};

export const planFaqs: PlanFAQ[] = [
  {
    q: 'Can I use NutriMind for free?',
    a: 'Yes! The Free plan gives you access to basic features and 10 recipes per month.',
  },
  {
    q: 'What is included in the Pro plan?',
    a: 'Pro unlocks unlimited recipes, AI chatbot, advanced nutrition analysis, and priority support.',
  },
  {
    q: 'How does the Family plan work?',
    a: 'Family plan allows up to 5 accounts under one subscription, perfect for households.',
  },
];

export const PLAN_COLORS = {
  Free: '#a1a1aa',
  Pro: '#34d399',
  Family: '#60a5fa',
}; 