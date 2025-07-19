import { Chat } from './chat';

export type AINavigationParamList = {
  'ai/index': undefined;
  'ai/chat/[chatId]': { chatId: string };
  'ai/library': undefined;
  'ai/explore': undefined;
};

export interface NavigationState {
  currentRoute: keyof AINavigationParamList | null;
  previousRoute: keyof AINavigationParamList | null;
}

export interface NavigationActions {
  setCurrentRoute: (route: keyof AINavigationParamList) => void;
  navigateToChat: (chatId: string) => void;
  navigateToLibrary: () => void;
  navigateToExplore: () => void;
  goBack: () => void;
}

export type NavigationStore = NavigationState & NavigationActions;

export interface ChatNavigationProps {
  chat: Chat;
  onChatUpdate: (chatId: string, messages: Chat['messages']) => void;
} 