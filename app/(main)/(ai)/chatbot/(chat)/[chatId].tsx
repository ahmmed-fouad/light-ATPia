import { ChatScreen } from '@/features/ai/chatbot/screens/chat-screen';
import { useLocalSearchParams } from 'expo-router';

const ChatRoute = () => {
  const { chatId } = useLocalSearchParams<{ chatId: string }>();
  
  return <ChatScreen chatId={chatId} />;
};

export default ChatRoute; 