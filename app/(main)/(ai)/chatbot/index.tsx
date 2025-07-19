import { useRouter } from 'expo-router';
import { Dimensions, StyleSheet, View } from 'react-native';
import { ChatScreen } from '../../../../features/ai/chatbot/screens/chat-screen';
import { ChatService } from '../../../../features/ai/chatbot/services/chatService';
import { useChatStore } from '../../../../features/ai/chatbot/stores/chatStore';

const { width } = Dimensions.get('window');

export default function AIScreen() {
  const router = useRouter();
  const { currentChatId, addChat } = useChatStore();

  const handleNewChat = () => {
    // Create new chat logic here
    const newChat = ChatService.createNewChat();
    addChat(newChat);
    router.push(`/(main)/(ai)/chatbot/(chat)/${newChat.id}` as any);
  };

  const handleSelectChat = (chatId: string) => {
    router.push(`/(main)/(ai)/chatbot/(chat)/${chatId}` as any);
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

  const handleProfilePress = () => {
    // Navigate to profile
  };

  const handleSettingsPress = () => {
    // Navigate to settings
  };

  return (
    <View style={styles.container}>
      <ChatScreen
        chatId={currentChatId || undefined}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
}); 