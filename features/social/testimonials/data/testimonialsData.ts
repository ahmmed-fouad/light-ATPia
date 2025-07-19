import { Testimonial, Counter, SatisfactionData, ModalField } from '../types';

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Alice',
    quote: 'The AI meal planner changed my life!',
    goal: 'Lose weight',
    rating: 5,
    date: '2024-01-10',
  },
  {
    id: 2,
    name: 'Bob',
    quote: 'Tracking my progress is so easy now.',
    goal: 'Build muscle',
    rating: 4,
    date: '2024-01-08',
  },
  {
    id: 3,
    name: 'Jane',
    quote: 'Love the healthy recipes and grocery list!',
    goal: 'Eat healthier',
    rating: 5,
    date: '2024-01-05',
  },
];

export const counters: Counter[] = [
  { label: 'Testimonials', value: 120 },
  { label: 'Users', value: 350 },
  { label: 'Goals Achieved', value: 87 },
];

export const satisfactionData: SatisfactionData[] = [
  { name: '5 Stars', value: 80 },
  { name: '4 Stars', value: 30 },
  { name: '3 Stars', value: 8 },
  { name: '2 Stars', value: 2 },
  { name: '1 Star', value: 0 },
];

export const modalFields: ModalField[] = [
  { key: 'name', label: 'Your Name', placeholder: 'Enter your name', type: 'text' },
  { key: 'quote', label: 'Your Story', placeholder: 'Share your experience...', type: 'text' },
  { key: 'goal', label: 'Your Goal', placeholder: 'e.g. Lose weight', type: 'text' },
  { key: 'rating', label: 'Rating (1-5)', placeholder: '5', type: 'number' },
];

export const starColors = ['#fbbf24', '#f59e42', '#fbbf24', '#fbbf24', '#fbbf24']; 