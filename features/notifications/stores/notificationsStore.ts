import { create } from 'zustand';
import { Notification } from '../types';
import { sampleNotifications } from '../data/sampleNotifications';

interface NotificationsState {
  notifications: Notification[];
  selected: number[];
  tab: 'all' | 'current' | 'old';
  setTab: (tab: 'all' | 'current' | 'old') => void;
  markAllRead: () => void;
  deleteAll: () => void;
  toggleSelect: (id: number) => void;
  markSelectedRead: () => void;
  deleteSelected: () => void;
  markRead: (id: number) => void;
  markUnread: (id: number) => void;
  deleteNotification: (id: number) => void;
}

export const useNotificationsStore = create<NotificationsState>((set, get) => ({
  notifications: sampleNotifications,
  selected: [],
  tab: 'all',
  setTab: (tab) => set({ tab }),
  markAllRead: () => set(state => ({
    notifications: state.notifications.map(n => ({ ...n, unread: false }))
  })),
  deleteAll: () => set({ notifications: [] }),
  toggleSelect: (id) => set(state => ({
    selected: state.selected.includes(id)
      ? state.selected.filter(i => i !== id)
      : [...state.selected, id]
  })),
  markSelectedRead: () => set(state => ({
    notifications: state.notifications.map(n =>
      state.selected.includes(n.id) ? { ...n, unread: false } : n
    )
  })),
  deleteSelected: () => set(state => ({
    notifications: state.notifications.filter(n => !state.selected.includes(n.id)),
    selected: []
  })),
  markRead: (id) => set(state => ({
    notifications: state.notifications.map(n => n.id === id ? { ...n, unread: false } : n)
  })),
  markUnread: (id) => set(state => ({
    notifications: state.notifications.map(n => n.id === id ? { ...n, unread: true } : n)
  })),
  deleteNotification: (id) => set(state => ({
    notifications: state.notifications.filter(n => n.id !== id)
  })),
})); 