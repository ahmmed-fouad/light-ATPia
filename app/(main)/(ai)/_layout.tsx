import { Slot, useRouter } from 'expo-router';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useChatStore } from '@/features/ai/chatbot/stores/chatStore';
import { useDrawer } from '@/features/ai/chatbot/hooks/useDrawer';

export default function AILayout() {
  const router = useRouter();
  const { toggle } = useDrawer();
  const { chats, currentChatId } = useChatStore();

  // Get current chat info if available
  const currentChat = chats.find(chat => chat.id === currentChatId);
  const chatTitle = currentChat?.title || 'New Chat';
  const messageCount = currentChat?.messages.length || 0;

  // Handler for food scanner
  const handleFoodScanner = () => {
    router.push('/(main)/(ai)/food-scanner/food-scanner' as any);
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      {/* Persistent AI Header */}
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 10,
        marginTop: 105,
        borderBottomWidth: 1,
        borderBottomColor: '#E5E7EB',
        backgroundColor: '#FFFFFF',
      }}>
        <TouchableOpacity onPress={toggle} style={{ padding: 8, borderRadius: 8 }}>
          <Ionicons name="menu" size={24} color="#374151" />
        </TouchableOpacity>
        <View style={{ flex: 1, marginHorizontal: 12 }}>
          <Text style={{ fontSize: 18, fontWeight: '600', color: '#111827' }} numberOfLines={1}>
            {chatTitle}
          </Text>
          <Text style={{ fontSize: 14, color: '#6B7280', marginTop: 2 }}>
            {messageCount > 0 ? `${messageCount} messages` : ''}
          </Text>
        </View>
        <TouchableOpacity style={{ padding: 8, borderRadius: 8, flexDirection: 'row', alignItems: 'center', gap: 8 }} onPress={handleFoodScanner}>
          <Ionicons name="scan" size={24} color="#3B82F6" />
          <Text>food scanner</Text>
        </TouchableOpacity>
      </View>
      {/* AI Content */}
      <View style={{ flex: 1 }}>
        <Slot />
      </View>
    </View>
  );
} 