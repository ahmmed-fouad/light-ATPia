import { create } from 'zustand';
import { SettingsState, UserProfile, Preferences } from '../types';
import { usageData, connectedAccounts, recentLogins, legalLinks } from '../data/settingsData';

const initialProfile: UserProfile = {
  name: 'Jane Doe',
  email: 'jane@email.com',
  age: 28,
  gender: 'Female',
  height: 168,
  weight: 62,
  photo: '',
};

const initialPreferences: Preferences = {
  theme: 'auto',
  language: 'en',
  notifications: { email: true, push: false, inApp: true },
};

export const useSettingsStore = create<SettingsState & {
  setProfile: (profile: Partial<UserProfile>) => void;
  setPreferences: (prefs: Partial<Preferences>) => void;
  setTwoFA: (enabled: boolean) => void;
  setFeedback: (feedback: string) => void;
  setPhoto: (photo: string) => void;
}>(set => ({
  profile: initialProfile,
  preferences: initialPreferences,
  usageData,
  connectedAccounts,
  recentLogins,
  twoFA: false,
  feedback: '',
  legalLinks,
  setProfile: (profile) => set(state => ({ profile: { ...state.profile, ...profile } })),
  setPreferences: (prefs) => set(state => ({ preferences: { ...state.preferences, ...prefs } })),
  setTwoFA: (enabled) => set(() => ({ twoFA: enabled })),
  setFeedback: (feedback) => set(() => ({ feedback })),
  setPhoto: (photo) => set(state => ({ profile: { ...state.profile, photo } })),
})); 