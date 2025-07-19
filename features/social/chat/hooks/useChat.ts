import { useEffect } from 'react';
import { useChatStore } from '../stores/chatStore';
import { ChatMessage, MessageType, User } from '../types';

export const useChat = () => {
  const { messages, isLoading, user, sendMessage, receiveMessage, clearChat } = useChatStore();

  // Simulate AI response for demo
  const sendAIResponse = (userMsg: ChatMessage) => {
    setTimeout(() => {
      const aiUser: User = {
        id: 'ai-1',
        name: 'ATPia Coach',
        avatarUrl: undefined,
        isAI: true,
      };
      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        type: 'text',
        user: aiUser,
        content: `AI Coach: I see you said "${userMsg.content}". Keep up the great work! 💪`,
        timestamp: Date.now(),
      };
      receiveMessage(aiMsg);
    }, 1200);
  };

  const handleSend = (content: string, type: MessageType = 'text', data?: any) => {
    const msg: Omit<ChatMessage, 'id' | 'timestamp'> = {
      type,
      user,
      content,
      data,
    };
    sendMessage(msg);
    // Simulate AI response
    sendAIResponse({ ...msg, id: '', timestamp: 0 });
  };

  // Add welcome message on first load
  useEffect(() => {
    if (messages.length === 0) {
      const aiUser: User = {
        id: 'ai-1',
        name: 'ATPia Coach',
        avatarUrl: undefined,
        isAI: true,
      };
      const welcomeMsg: ChatMessage = {
        id: `ai-welcome`,
        type: 'text',
        user: aiUser,
        content: '👋 Hi! I am your ATPia AI Coach. Ask me anything about your diet, health, or progress!',
        timestamp: Date.now(),
      };
      receiveMessage(welcomeMsg);
    }
  }, [messages.length, receiveMessage]);

  return {
    messages,
    isLoading,
    user,
    sendMessage: handleSend,
    clearChat,
  };
}; 