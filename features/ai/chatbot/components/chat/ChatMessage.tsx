import { Ionicons } from '@expo/vector-icons';
// import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Message } from '../../types/chat';

interface ChatMessageProps {
  message: Message;
  isLastMessage?: boolean;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ 
  message, 
  isLastMessage = false 
}) => {
  const isUser = message.isUser;

  return (
    <View style={[
      styles.container,
      isUser ? styles.userContainer : styles.aiContainer
    ]}>
      <View style={[
        styles.messageBubble,
        isUser ? styles.userBubble : styles.aiBubble
      ]}>
        {!isUser && (
          <View style={styles.aiAvatar}>
            <Ionicons name="logo-github" size={16} color="#FFFFFF" />
          </View>
        )}
        
        <View style={[
          styles.messageContent,
          isUser ? styles.userContent : styles.aiContent
        ]}>
          <Text style={[
            styles.messageText,
            isUser ? styles.userText : styles.aiText
          ]}>
            {message.text}
          </Text>
          
          <Text style={[
            styles.timestamp,
            isUser ? styles.userTimestamp : styles.aiTimestamp
          ]}>
            {new Date(message.timestamp).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit'
            })}
          </Text>
        </View>
        
        {isUser && (
          <View style={styles.userAvatar}>
            <Ionicons name="person" size={16} color="#FFFFFF" />
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 4,
    paddingHorizontal: 16,
  },
  userContainer: {
    alignItems: 'flex-end',
  },
  aiContainer: {
    alignItems: 'flex-start',
  },
  messageBubble: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    maxWidth: '80%',
  },
  userBubble: {
    backgroundColor: '#3B82F6',
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginLeft: 40,
  },
  aiBubble: {
    backgroundColor: '#F3F4F6',
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginRight: 40,
  },
  aiAvatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#10B981',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  userAvatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#6B7280',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  messageContent: {
    flex: 1,
  },
  userContent: {
    alignItems: 'flex-end',
  },
  aiContent: {
    alignItems: 'flex-start',
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 4,
  },
  userText: {
    color: '#FFFFFF',
  },
  aiText: {
    color: '#374151',
  },
  timestamp: {
    fontSize: 12,
    opacity: 0.7,
  },
  userTimestamp: {
    color: '#E0E7FF',
  },
  aiTimestamp: {
    color: '#9CA3AF',
  },
}); 