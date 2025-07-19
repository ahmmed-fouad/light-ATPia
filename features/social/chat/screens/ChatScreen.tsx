import React, { useRef, useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useChat } from '../hooks/useChat';
import { ChatBubble } from '../components/ChatBubble';
import { QuickActions } from '../components/QuickActions';

const { height } = Dimensions.get('window');



export const ChatScreen: React.FC = () => {
  const { messages, sendMessage } = useChat();
  const [input, setInput] = useState('');
  const flatListRef = useRef<FlatList>(null);

  const handleSend = () => {
    if (input.trim()) {
      sendMessage(input.trim());
      setInput('');
    }
  };
  

  const handleAction = (action: string) => {
    if (action === 'log-meal') sendMessage('I want to log a meal.');
    if (action === 'share-progress') sendMessage('Here is my progress for today!');
    if (action === 'ask-ai') sendMessage('Can you give me a nutrition tip?');
    if (action === 'set-reminder') sendMessage('Remind me to drink water every hour.');
  };

  return (
    <LinearGradient colors={["#e0e7ff", "#f0fdfa", "#f3e8ff"]} style={styles.bg}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={80}
      >
        <View style={styles.flex1}>
          <FlatList
            ref={flatListRef}
            data={messages}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <ChatBubble message={item} isUser={!item.user.isAI} />
            )}
            contentContainerStyle={styles.listContent}
            onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
            onLayout={() => flatListRef.current?.scrollToEnd({ animated: true })}
          />
        </View>
        <QuickActions onAction={handleAction} />
        <View style={styles.inputRow}>
          <TextInput
            value={input}
            onChangeText={setInput}
            placeholder="Type a message..."
            placeholderTextColor="#94a3b8"
            style={styles.input}
            onSubmitEditing={handleSend}
            returnKeyType="send"
          />
          <TouchableOpacity style={styles.sendBtn} onPress={handleSend}>
            <Text style={styles.sendText}>Send</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    minHeight: height,
  },
  flex1: {
    flex: 1,
  },
  listContent: {
    paddingTop: 18,
    paddingBottom: 12,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 24,
    margin: 10,
    paddingHorizontal: 14,
    paddingVertical: 6,
    shadowColor: '#a7f3d0',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#222',
    paddingVertical: 8,
    paddingHorizontal: 6,
  },
  sendBtn: {
    backgroundColor: '#059669',
    borderRadius: 16,
    paddingHorizontal: 18,
    paddingVertical: 8,
    marginLeft: 8,
  },
  sendText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
}); 