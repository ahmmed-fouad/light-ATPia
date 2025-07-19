import { Dimensions } from 'react-native';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export const AI_CONSTANTS = {
  // Screen dimensions
  SCREEN_WIDTH: screenWidth,
  SCREEN_HEIGHT: screenHeight,
  DRAWER_WIDTH: screenWidth * 0.85,
  
  // Animation durations
  ANIMATION_DURATION: {
    FAST: 200,
    NORMAL: 300,
    SLOW: 500,
  },
  
  // Message limits
  MESSAGE_LIMITS: {
    MAX_LENGTH: 4000,
    MAX_MESSAGES_PER_CHAT: 1000,
  },
  
  // Storage keys
  STORAGE_KEYS: {
    CHATS: 'ai_chats',
    SETTINGS: 'ai_settings',
    USER_PREFERENCES: 'ai_user_preferences',
    DRAWER_STATE: 'ai_drawer_state',
  },
  
  // UI Constants
  UI: {
    BORDER_RADIUS: {
      SMALL: 8,
      MEDIUM: 12,
      LARGE: 16,
      ROUND: 20,
    },
    SPACING: {
      XS: 4,
      SM: 8,
      MD: 12,
      LG: 16,
      XL: 20,
      XXL: 24,
    },
    COLORS: {
      PRIMARY: '#3B82F6',
      SECONDARY: '#6B7280',
      SUCCESS: '#10B981',
      WARNING: '#F59E0B',
      ERROR: '#EF4444',
      BACKGROUND: '#FFFFFF',
      SURFACE: '#F9FAFB',
      BORDER: '#E5E7EB',
      TEXT: {
        PRIMARY: '#111827',
        SECONDARY: '#374151',
        TERTIARY: '#6B7280',
        DISABLED: '#9CA3AF',
      },
    },
  },
  
  // Chat configuration
  CHAT: {
    TYPING_INDICATOR_DELAY: 1000,
    MESSAGE_DEBOUNCE: 300,
    AUTO_SCROLL_DELAY: 100,
  },
  
  // Emoji categories
  EMOJI_CATEGORIES: [
    'smileys',
    'people',
    'animals',
    'food',
    'activities',
    'travel',
    'objects',
    'symbols',
    'flags',
  ],
  
  // GPT Models
  GPT_MODELS: [
    {
      id: 'gpt-4',
      name: 'GPT-4',
      description: 'Most capable model for complex tasks',
      category: 'Advanced',
      isPopular: true,
    },
    {
      id: 'gpt-3.5-turbo',
      name: 'GPT-3.5 Turbo',
      description: 'Fast and efficient for most tasks',
      category: 'Standard',
      isPopular: false,
    },
    {
      id: 'claude',
      name: 'Claude',
      description: 'Anthropic\'s AI assistant',
      category: 'Alternative',
      isPopular: false,
    },
  ],
}; 