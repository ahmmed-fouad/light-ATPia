import AsyncStorage from '@react-native-async-storage/async-storage';
import { Chat } from '../types/chat';

export class StorageService {
  private static readonly CHATS_KEY = 'ai_chats';
  private static readonly SETTINGS_KEY = 'ai_settings';
  private static readonly USER_PREFERENCES_KEY = 'ai_user_preferences';

  static async saveChats(chats: Chat[]): Promise<void> {
    try {
      await AsyncStorage.setItem(this.CHATS_KEY, JSON.stringify(chats));
    } catch (error) {
      console.error('Failed to save chats:', error);
      throw error;
    }
  }

  static async loadChats(): Promise<Chat[]> {
    try {
      const data = await AsyncStorage.getItem(this.CHATS_KEY);
      if (data) {
        const chats = JSON.parse(data);
        // Convert string dates back to Date objects
        return chats.map((chat: any) => ({
          ...chat,
          timestamp: new Date(chat.timestamp),
          lastModified: new Date(chat.lastModified),
          messages: chat.messages.map((msg: any) => ({
            ...msg,
            timestamp: new Date(msg.timestamp),
          })),
        }));
      }
      return [];
    } catch (error) {
      console.error('Failed to load chats:', error);
      return [];
    }
  }

  static async saveSettings(settings: any): Promise<void> {
    try {
      await AsyncStorage.setItem(this.SETTINGS_KEY, JSON.stringify(settings));
    } catch (error) {
      console.error('Failed to save settings:', error);
      throw error;
    }
  }

  static async loadSettings(): Promise<any> {
    try {
      const data = await AsyncStorage.getItem(this.SETTINGS_KEY);
      return data ? JSON.parse(data) : {};
    } catch (error) {
      console.error('Failed to load settings:', error);
      return {};
    }
  }

  static async saveUserPreferences(preferences: any): Promise<void> {
    try {
      await AsyncStorage.setItem(this.USER_PREFERENCES_KEY, JSON.stringify(preferences));
    } catch (error) {
      console.error('Failed to save user preferences:', error);
      throw error;
    }
  }

  static async loadUserPreferences(): Promise<any> {
    try {
      const data = await AsyncStorage.getItem(this.USER_PREFERENCES_KEY);
      return data ? JSON.parse(data) : {};
    } catch (error) {
      console.error('Failed to load user preferences:', error);
      return {};
    }
  }

  static async clearAllData(): Promise<void> {
    try {
      await AsyncStorage.multiRemove([
        this.CHATS_KEY,
        this.SETTINGS_KEY,
        this.USER_PREFERENCES_KEY,
      ]);
    } catch (error) {
      console.error('Failed to clear data:', error);
      throw error;
    }
  }

  static async getStorageSize(): Promise<number> {
    try {
      const keys = await AsyncStorage.getAllKeys();
      let totalSize = 0;
      
      for (const key of keys) {
        const value = await AsyncStorage.getItem(key);
        if (value) {
          totalSize += new Blob([value]).size;
        }
      }
      
      return totalSize;
    } catch (error) {
      console.error('Failed to get storage size:', error);
      return 0;
    }
  }
} 