import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Keyboard,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ScrollAwareFlatList } from '../../../../components';
import { ChatInput, ChatMessage } from '../components/chat';
import { useDrawer } from '../hooks/useDrawer';
import { ChatService, streamChat } from '../services';
import { useChatStore } from '../stores/chatStore';

interface ChatScreenProps {
  chatId?: string;
}

export const ChatScreen: React.FC<ChatScreenProps> = ({ chatId }) => {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const flatListRef = useRef<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [aiResponse, setAiResponse] = useState<string>("");
  const [hasError, setHasError] = useState<boolean>(false);
  const [cleanupFunction, setCleanupFunction] = useState<(() => void) | null>(null);

  const {
    chats,
    currentChatId,
    addChat,
    updateChat,
    updateChatWithTitle,
    setCurrentChat,
    clearCurrentChat,
  } = useChatStore();

  const { toggle, close } = useDrawer();
  
  // Close the drawer whenever chatId changes
  useEffect(() => {
    close();
  }, [chatId, close]);

  // Cleanup effect for streaming connections
  useEffect(() => {
    return () => {
      if (cleanupFunction) {
        cleanupFunction();
      }
    };
  }, [cleanupFunction]);

  const currentChat = chats.find(chat => chat.id === (chatId || currentChatId));

  // Ensure at least one chat exists
  useEffect(() => {
    if (chats.length === 0) {
      const newChat = ChatService.createNewChat();
      addChat(newChat);
    }
  }, [chats, addChat]);

  // Keyboard event listeners for dynamic adjustment
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', (e) => {
      // Use keyboard height with a small reduction for better positioning
      const reducedHeight = Math.max(0, e.endCoordinates.height - 80);
      setKeyboardHeight(reducedHeight);
      
      // Scroll to bottom when keyboard appears
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    });

    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardHeight(0);
    });

    return () => {
      keyboardDidShowListener?.remove();
      keyboardDidHideListener?.remove();
    };
  }, []);

  useEffect(() => {
    if (chatId && chatId !== currentChatId) {
      setCurrentChat(chatId);
    }
  }, [chatId, currentChatId]);

  const handleNewChat = () => {
    const newChat = ChatService.createNewChat();
    addChat(newChat);
    router.push(`/(main)/(ai)/chatbot/(chat)/${newChat.id}` as any);
  };

  const handleSelectChat = (selectedChatId: string) => {
    setCurrentChat(selectedChatId);
    router.push(`/(main)/(ai)/chatbot/(chat)/${selectedChatId}` as any);
  };

  const handleSelectSection = (section: 'chats' | 'library' | 'explore') => {
    switch (section) {
      case 'library':
        router.push('/(main)/(ai)/chatbot/library' as any);
        break;
      case 'explore':
        router.push('/(main)/(ai)/chatbot/explore' as any);
        break;
    }
  };

  const handleSendMessage = async (messageText: string) => {
    if (!currentChat) return;

    // Clean up any existing connection
    if (cleanupFunction) {
      cleanupFunction();
      setCleanupFunction(null);
    }

    setIsLoading(true);
    setAiResponse("");
    setHasError(false);

    try {
      // Add user message
      const updatedChat = ChatService.addMessage(currentChat, messageText, true);
      updateChat(currentChat.id, updatedChat.messages);

      // Update chat title if it's the first message
      if (updatedChat.messages.length === 1) {
        const titledChat = ChatService.updateChatTitle(updatedChat, messageText);
        updateChatWithTitle(currentChat.id, titledChat.messages, titledChat.title);
      }

      let responseText = "";

      // Use real streaming API
      const cleanup = await streamChat(messageText, (chunk: string) => {
        responseText += chunk;
        
        // Update the chat with streaming content
        const chatWithStreamingAi = ChatService.addMessage(updatedChat, responseText, false);
        updateChat(currentChat.id, chatWithStreamingAi.messages);
      });

      setCleanupFunction(() => cleanup);

      // Final update with complete response
      if (responseText.trim()) {
        const finalChat = ChatService.addMessage(updatedChat, responseText.trim(), false);
        updateChat(currentChat.id, finalChat.messages);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setHasError(true);
      // Add error message to chat
      const errorChat = ChatService.addMessage(currentChat, "Sorry, I encountered an error. Please try again.", false);
      updateChat(currentChat.id, errorChat.messages);
    } finally {
      setIsLoading(false);
    }
  };

  const handleProfilePress = () => {
    // Navigate to settings or profile screen
    console.log('Profile pressed');
  };

  const handleSettingsPress = () => {
    // Navigate to settings screen
    console.log('Settings pressed');
  };

  const renderMessage = ({ item, index }: { item: any; index: number }) => (
    <ChatMessage
      message={item}
      isLastMessage={index === (currentChat?.messages.length || 0) - 1}
    />
  );

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Ionicons name="chatbubble-outline" size={64} color="#D1D5DB" />
      <Text style={styles.emptyStateTitle}>How can I help you today?</Text>
      <Text style={styles.emptyStateSubtitle}>
        I'm here to assist with any questions or tasks you might have.
      </Text>
    </View>
  );

  const handleFoodScanner = () => {
    router.push('/(main)/(ai)/food-scanner/food-scanner' as any);
  };

  return (
    <View 
     style={styles.container}
     >

      {/* Messages */}
      <ScrollAwareFlatList
        ref={flatListRef}
        data={currentChat?.messages || []}
        renderItem={renderMessage}
        keyExtractor={(item: any) => item.id}
        style={styles.messagesList}
        contentContainerStyle={styles.messagesContainer}
        ListEmptyComponent={renderEmptyState}
        showsVerticalScrollIndicator={false}
        onContentSizeChange={() =>
          flatListRef.current?.scrollToEnd({ animated: true })
        }
        onLayout={() => flatListRef.current?.scrollToEnd({ animated: true })}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="interactive"
      />

      {/* Loading Indicator */}
      {isLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="small" color="#3B82F6" />
          <Text style={styles.loadingText}>AI is thinking...</Text>
        </View>
      )}

      {/* Input Area with KeyboardAvoidingView */}
      <View style={{ paddingBottom: keyboardHeight }}>
        <ChatInput onSendMessage={handleSendMessage} disabled={isLoading} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  messagesList: {
    flex: 1,
  },
  messagesContainer: {
    paddingVertical: 16,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingVertical: 64,
  },
  emptyStateTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#374151',
    marginTop: 16,
    marginBottom: 8,
    textAlign: 'center',
  },
  emptyStateSubtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 24,
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    backgroundColor: '#F9FAFB',
  },
  loadingText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#6B7280',
  },
}); 