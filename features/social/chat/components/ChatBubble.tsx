import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { ChatMessage } from '../types';

interface ChatBubbleProps {
  message: ChatMessage;
  isUser: boolean;
}

export const ChatBubble: React.FC<ChatBubbleProps> = ({ message, isUser }) => {
  const bubbleStyle = isUser ? styles.userBubble : styles.aiBubble;
  const textStyle = isUser ? styles.userText : styles.aiText;
  const containerStyle = isUser ? styles.userContainer : styles.aiContainer;
  const avatar = message.user.avatarUrl || (isUser
    ? 'https://ui-avatars.com/api/?name=You&background=059669&color=fff'
    : 'https://ui-avatars.com/api/?name=AI&background=60a5fa&color=fff');

  return (
    <View style={[styles.row, containerStyle]}>
      {!isUser && <Image source={{ uri: avatar }} style={styles.avatar} />}
      <View style={[styles.bubble, bubbleStyle]}>
        <Text style={textStyle}>{message.content}</Text>
      </View>
      {isUser && <Image source={{ uri: avatar }} style={styles.avatar} />}
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginVertical: 6,
    paddingHorizontal: 8,
  },
  userContainer: {
    justifyContent: 'flex-end',
  },
  aiContainer: {
    justifyContent: 'flex-start',
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginHorizontal: 6,
    backgroundColor: '#e0e7ef',
  },
  bubble: {
    maxWidth: '75%',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 18,
    shadowColor: '#a7f3d0',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },
  userBubble: {
    backgroundColor: '#059669',
    borderTopRightRadius: 6,
    marginLeft: 'auto',
  },
  aiBubble: {
    backgroundColor: '#f3f4f6',
    borderTopLeftRadius: 6,
    marginRight: 'auto',
  },
  userText: {
    color: '#fff',
    fontSize: 15,
  },
  aiText: {
    color: '#222',
    fontSize: 15,
  },
}); 