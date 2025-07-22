export interface UserProfile {
  name: string;
  email: string;
  age: number;
  gender: string;
  height: number;
  weight: number;
  photo: string;
}

export interface Preferences {
  theme: 'auto' | 'light' | 'dark';
  language: string;
  notifications: {
    email: boolean;
    push: boolean;
    inApp: boolean;
  };
}

export interface UsageDatum {
  label: string;
  value: number;
}

export interface ConnectedAccount {
  provider: string;
  email: string;
  avatar: string;
}

export interface RecentLogin {
  date: string;
  device: string;
  location: string;
}

export interface LegalLink {
  label: string;
  url: string;
}

export interface SettingsState {
  profile: UserProfile;
  preferences: Preferences;
  usageData: UsageDatum[];
  connectedAccounts: ConnectedAccount[];
  recentLogins: RecentLogin[];
  twoFA: boolean;
  feedback: string;
  legalLinks: LegalLink[];
} 