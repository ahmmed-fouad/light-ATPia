export interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export interface Chat {
  id: string;
  title: string;
  messages: Message[];
  timestamp: Date;
  lastModified: Date;
}

export interface ChatHistoryItem {
  id: string;
  title: string;
  timestamp: Date;
  messageCount: number;
}

export interface ChatState {
  chats: Chat[];
  currentChatId: string | null;
  isLoading: boolean;
  error: string | null;
}

export interface ChatActions {
  addChat: (chat: Chat) => void;
  updateChat: (id: string, messages: Message[], title?: string) => void;
  updateChatWithTitle: (id: string, messages: Message[], title: string) => void;
  deleteChat: (id: string) => void;
  setCurrentChat: (id: string) => void;
  clearCurrentChat: () => void;
  loadChats: () => Promise<void>;
  saveChats: () => Promise<void>;
  clearError: () => void;
}

export type ChatStore = ChatState & ChatActions; 