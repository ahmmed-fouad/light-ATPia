import { NotificationType } from '../types';

export const notificationTypes: NotificationType[] = [
  {
    type: 'success',
    label: 'Success',
    icon: 'CheckCircle',
  },
  {
    type: 'message',
    label: 'Message',
    icon: 'MessageCircle',
  },
  {
    type: 'activity',
    label: 'Activity',
    icon: 'Flame',
  },
  {
    type: 'hydration',
    label: 'Hydration',
    icon: 'Droplet',
  },
  {
    type: 'achievement',
    label: 'Achievement',
    icon: 'Star',
  },
]; 