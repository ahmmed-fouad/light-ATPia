import { UsageDatum, ConnectedAccount, RecentLogin, LegalLink } from '../types';

export const usageData: UsageDatum[] = [
  { label: 'Steps', value: 12000 },
  { label: 'Calories', value: 2200 },
  { label: 'Sleep', value: 7 },
  { label: 'Water', value: 2.5 },
];

export const COLORS = ['#6366f1', '#22d3ee', '#f59e42', '#10b981'];

export const recentLogins: RecentLogin[] = [
  { date: '2024-06-01', device: 'iPhone 14', location: 'New York, USA' },
  { date: '2024-05-28', device: 'iPad Pro', location: 'London, UK' },
];

export const profileFields = [
  { key: 'name', label: 'Name', type: 'text' },
  { key: 'email', label: 'Email', type: 'email' },
  { key: 'age', label: 'Age', type: 'number' },
  { key: 'gender', label: 'Gender', type: 'text' },
  { key: 'height', label: 'Height (cm)', type: 'number' },
  { key: 'weight', label: 'Weight (kg)', type: 'number' },
];

export const preferenceOptions = {
  theme: [
    { key: 'auto', label: 'Auto' },
    { key: 'light', label: 'Light' },
    { key: 'dark', label: 'Dark' },
  ],
  language: [
    { key: 'en', label: 'English' },
    { key: 'ar', label: 'Arabic' },
  ],
};

export const notificationTypes = [
  { key: 'email', label: 'Email' },
  { key: 'push', label: 'Push' },
  { key: 'inApp', label: 'In-App' },
];

export const connectedAccounts: ConnectedAccount[] = [
  { provider: 'Google', email: 'jane@gmail.com', avatar: '' },
  { provider: 'Apple', email: 'jane@icloud.com', avatar: '' },
];

export const legalLinks: LegalLink[] = [
  { label: 'Privacy Policy', url: 'https://example.com/privacy' },
  { label: 'Terms of Service', url: 'https://example.com/terms' },
]; 