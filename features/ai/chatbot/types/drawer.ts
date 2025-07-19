import { ChatHistoryItem } from './chat';

export interface DrawerState {
  isOpen: boolean;
  searchQuery: string;
  selectedSection: 'chats' | 'library' | 'explore' | null;
  isHistoryExpanded: boolean;
}

export interface DrawerActions {
  toggle: () => void;
  open: () => void;
  close: () => void;
  setSearchQuery: (query: string) => void;
  setSelectedSection: (section: 'chats' | 'library' | 'explore' | null) => void;
  toggleHistoryExpanded: () => void;
  clearSearch: () => void;
}

export type DrawerStore = DrawerState & DrawerActions;

export interface DrawerHeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onClose: () => void;
}

export interface DrawerBodyProps {
  chatHistory: ChatHistoryItem[];
  selectedSection: 'chats' | 'library' | 'explore' | null;
  isHistoryExpanded: boolean;
  onNewChat: () => void;
  onSelectChat: (chatId: string) => void;
  onSelectSection: (section: 'chats' | 'library' | 'explore') => void;
  onToggleHistory: () => void;
  onDeleteChat?: (chatId: string) => void;
  onDeleteAllChats?: () => void;
}

export interface DrawerFooterProps {
  userName: string;
  userAvatar?: string;
  onProfilePress: () => void;
  onSettingsPress: () => void;
} 