import { Chat, Message } from '../types/chat';

const generateId = () => Math.random().toString(36).substr(2, 9);

export class ChatService {
  static createNewChat(): Chat {
    const id = generateId();
    return {
      id,
      title: 'New Chat',
      messages: [],
      timestamp: new Date(),
      lastModified: new Date(),
    };
  }

  static updateChatTitle(chat: Chat, firstMessage: string): Chat {
    const title = firstMessage.length > 50 
      ? `${firstMessage.substring(0, 50)}...` 
      : firstMessage;
    
    return {
      ...chat,
      title,
      lastModified: new Date(),
    };
  }

  static addMessage(chat: Chat, text: string, isUser: boolean): Chat {
    const message: Message = {
      id: generateId(),
      text,
      isUser,
      timestamp: new Date(),
    };

    return {
      ...chat,
      messages: [...chat.messages, message],
      lastModified: new Date(),
    };
  }

  static async sendMessageToAI(message: string): Promise<string> {
    // Simulate AI response - replace with actual API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(`AI response to: "${message}"`);
      }, 1000);
    });
  }

  static formatTimestamp(date: Date | string | number | undefined | null): string {
    if (!date) return '';
    let d: Date;
    if (date instanceof Date) {
      d = date;
    } else if (typeof date === 'string' || typeof date === 'number') {
      d = new Date(date);
    } else {
      return '';
    }
    if (isNaN(d.getTime())) return '';
    const now = new Date();
    const diffInHours = (now.getTime() - d.getTime()) / (1000 * 60 * 60);
    
    if (diffInHours < 1) {
      return 'Just now';
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)}h ago`;
    } else if (diffInHours < 168) {
      return `${Math.floor(diffInHours / 24)}d ago`;
    } else {
      return d.toLocaleDateString();
    }
  }

  static getChatHistoryItem(chat: Chat) {
    return {
      id: chat.id,
      title: chat.title,
      timestamp: chat.lastModified,
      messageCount: chat.messages.length,
    };
  }
} 