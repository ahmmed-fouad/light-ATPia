// import React from 'react';
import { StyleSheet, View } from 'react-native';
import Animated from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDrawer } from '../../hooks/useDrawer';
import { ChatService } from '../../services/chatService';
import { useDrawerAnimation } from '../../utils/animations';
import { AI_CONSTANTS } from '../../utils/constants';
import { DrawerBody } from './DrawerBody';
import { DrawerFooter } from './DrawerFooter';
import { DrawerHeader } from './DrawerHeader';

interface ChatDrawerProps {
  onNewChat: () => void;
  onSelectChat: (chatId: string) => void;
  onSelectSection: (section: 'chats' | 'library' | 'explore') => void;
  onProfilePress: () => void;
  onSettingsPress: () => void;
  onDeleteChat?: (chatId: string) => void;
  onDeleteAllChats?: () => void;
}

export const ChatDrawer: React.FC<ChatDrawerProps> = ({
  onNewChat,
  onSelectChat,
  onSelectSection,
  onProfilePress,
  onSettingsPress,
  onDeleteChat,
  onDeleteAllChats,
}) => {
  const {
    isOpen,
    searchQuery,
    selectedSection,
    isHistoryExpanded,
    toggle,
    setSearchQuery,
    setSelectedSection,
    toggleHistoryExpanded,
    clearSearch,
    filteredChats,
    DRAWER_WIDTH,
  } = useDrawer();

  // Animation setup using react-native-reanimated
  const { drawerStyle, overlayStyle } = useDrawerAnimation(isOpen, DRAWER_WIDTH);

  const handleClose = () => {
    toggle();
  };

  const handleNewChat = () => {
    onNewChat();
    handleClose();
  };

  const handleSelectChat = (chatId: string) => {
    onSelectChat(chatId);
    handleClose();
  };

  const handleSelectSection = (section: 'chats' | 'library' | 'explore') => {
    setSelectedSection(section);
    onSelectSection(section);
    handleClose();
  };

  const chatHistory = filteredChats.map(ChatService.getChatHistoryItem);

  return (
    <View style={styles.container} pointerEvents={isOpen ? 'auto' : 'none'}>
      {/* Overlay */}
      <Animated.View
        style={[styles.overlay, overlayStyle]}
        onTouchEnd={handleClose}
        pointerEvents={isOpen ? 'auto' : 'none'}
      />

      {/* Drawer */}
      <Animated.View
        style={[styles.drawer, drawerStyle]}
        pointerEvents={isOpen ? 'auto' : 'none'}
      >
        <SafeAreaView style={styles.drawerContent}>
          <DrawerHeader
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onClose={handleClose}
          />

          <DrawerBody
            chatHistory={chatHistory}
            selectedSection={selectedSection}
            isHistoryExpanded={isHistoryExpanded}
            onNewChat={handleNewChat}
            onSelectChat={handleSelectChat}
            onSelectSection={handleSelectSection}
            onToggleHistory={toggleHistoryExpanded}
            onDeleteChat={onDeleteChat}
            onDeleteAllChats={onDeleteAllChats}
          />

          <DrawerFooter
            userName="John Doe"
            userAvatar={undefined}
            onProfilePress={onProfilePress}
            onSettingsPress={onSettingsPress}
          />
        </SafeAreaView>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#000000',
  },
  drawer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: AI_CONSTANTS.DRAWER_WIDTH,
    height: '100%',
    backgroundColor: '#FFFFFF',
    shadowColor: '#000000',
    shadowOffset: {
      width: 2,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 8,
  },
  drawerContent: {
    flex: 1,
  },
}); 