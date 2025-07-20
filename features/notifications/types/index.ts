export type NotificationTypeKey =
  | 'success'
  | 'message'
  | 'activity'
  | 'hydration'
  | 'achievement';

export interface NotificationType {
  type: NotificationTypeKey;
  label: string;
  icon: string;
}

export interface Notification {
  id: number;
  type: NotificationTypeKey;
  title: string;
  description: string;
  unread: boolean;
  date: string; // ISO string
} 