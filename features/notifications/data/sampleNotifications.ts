import { Notification } from '../types';

export const sampleNotifications: Notification[] = [
  {
    id: 1,
    type: 'success',
    title: 'Goal Achieved!',
    description: 'You reached your daily step goal. Great job!',
    unread: true,
    date: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
  },
  {
    id: 2,
    type: 'message',
    title: 'New Message',
    description: 'You have a new message from your coach.',
    unread: true,
    date: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
  },
  {
    id: 3,
    type: 'activity',
    title: 'Workout Complete',
    description: 'You completed a 30-minute run.',
    unread: false,
    date: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
  },
  {
    id: 4,
    type: 'hydration',
    title: 'Hydration Reminder',
    description: 'Don’t forget to drink water!',
    unread: true,
    date: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
  },
  {
    id: 5,
    type: 'achievement',
    title: 'Milestone Unlocked',
    description: 'You unlocked the “Consistency” badge.',
    unread: false,
    date: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
  },
]; 