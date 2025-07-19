import { useCallback } from 'react';
import { Dimensions } from 'react-native';
import { ChatService } from '../services/chatService';
import { useChatStore } from '../stores/chatStore';
import { useDrawerStore } from '../stores/drawerStore';

const { width: screenWidth } = Dimensions.get('window');
const DRAWER_WIDTH = screenWidth * 0.85;

export const useDrawer = () => {
  const {
    isOpen,
    searchQuery,
    selectedSection,
    isHistoryExpanded,
    toggle,
    open,
    close,
    setSearchQuery,
    setSelectedSection,
    toggleHistoryExpanded,
    clearSearch,
  } = useDrawerStore();

  const { chats, addChat, setCurrentChat } = useChatStore();

  const handleNewChat = useCallback(() => {
    const newChat = ChatService.createNewChat();
    addChat(newChat);
    setCurrentChat(newChat.id);
    close();
  }, [addChat, setCurrentChat, close]);

  const handleSelectChat = useCallback((chatId: string) => {
    setCurrentChat(chatId);
    close();
  }, [setCurrentChat, close]);

  const handleSelectSection = useCallback((section: 'chats' | 'library' | 'explore') => {
    setSelectedSection(section);
    close();
  }, [setSelectedSection, close]);

  const handleToggleHistory = useCallback(() => {
    toggleHistoryExpanded();
  }, [toggleHistoryExpanded]);

  const handleSearchChange = useCallback((query: string) => {
    setSearchQuery(query);
  }, [setSearchQuery]);

  const handleClearSearch = useCallback(() => {
    clearSearch();
  }, [clearSearch]);

  const filteredChats = chats.filter(chat =>
    chat.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return {
    isOpen,
    searchQuery,
    selectedSection,
    isHistoryExpanded,
    toggle,
    open,
    close,
    setSearchQuery,
    setSelectedSection,
    toggleHistoryExpanded,
    clearSearch,
    handleNewChat,
    handleSelectChat,
    handleSelectSection,
    handleToggleHistory,
    handleSearchChange,
    handleClearSearch,
    filteredChats,
    DRAWER_WIDTH,
  };
}; 