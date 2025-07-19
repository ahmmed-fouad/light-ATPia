import { useRouter } from 'expo-router';
import { useChatStore } from '../stores/chatStore';
import { useNavigationStore } from '../stores/navigationStore';

export const useChatNavigation = () => {
  const router = useRouter();
  const { chats, currentChatId, setCurrentChat, clearCurrentChat } = useChatStore();
  const { setCurrentRoute } = useNavigationStore();

  const navigateToChat = (chatId: string) => {
    setCurrentChat(chatId);
    setCurrentRoute('ai/chat/[chatId]' as const);
    router.push(`/ai/chat/${chatId}` as any);
  };

  const navigateToNewChat = () => {
    const newChatId = `chat_${Date.now()}`;
    setCurrentChat(newChatId);
    setCurrentRoute('ai/chat/[chatId]' as const);
    router.push(`/ai/chat/${newChatId}` as any);
  };

  const navigateToLibrary = () => {
    setCurrentRoute('ai/library' as const);
    router.push('/ai/library' as any);
  };

  const navigateToExplore = () => {
    setCurrentRoute('ai/explore' as const);
    router.push('/ai/explore' as any);
  };

  const goBack = () => {
    router.back();
  };

  const getCurrentChat = () => {
    return chats.find(chat => chat.id === currentChatId);
  };

  return {
    navigateToChat,
    navigateToNewChat,
    navigateToLibrary,
    navigateToExplore,
    goBack,
    getCurrentChat,
    currentChatId,
    chats,
  };
}; 