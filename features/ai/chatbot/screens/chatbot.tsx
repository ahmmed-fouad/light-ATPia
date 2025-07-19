import AsyncStorage from '@react-native-async-storage/async-storage';
import { Bot, Send, Sparkles, User } from "lucide-react-native";
import { useEffect, useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { streamChat } from "../services/streamApi";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const Chatbot = () => {
    const [input, setInput] = useState<string>("");
    const [messages, setMessages] = useState<Message[]>([]);
    const [aiResponse, setAiResponse] = useState<string>("");
    const [isFetching, setIsFetching] = useState<boolean>(false);
    const [hasError, setHasError] = useState<boolean>(false);
    const [cleanupFunction, setCleanupFunction] = useState<(() => void) | null>(null);
    useEffect(() => {
        const loadPrefill = async () => {
            try {
                const prefill = await AsyncStorage.getItem("chatbot_prefill");
                if (prefill) {
                    setInput(prefill);
                    await AsyncStorage.removeItem("chatbot_prefill");
                }
            } catch (error) {
                console.error("Error loading prefill:", error);
            }
        };
        loadPrefill();
    }, []);

    // Cleanup effect for streaming connections
    useEffect(() => {
        return () => {
            if (cleanupFunction) {
                cleanupFunction();
            }
        };
    }, [cleanupFunction]);

    const handleSend = async () => {
        if (!input.trim()) return;
        
        // Clean up any existing connection
        if (cleanupFunction) {
            cleanupFunction();
            setCleanupFunction(null);
        }
        
        const userMessage: Message = {
            id: Date.now().toString(),
            text: input.trim(),
            isUser: true,
            timestamp: new Date()
        };
        
        setMessages(prev => [...prev, userMessage]);
        setInput("");
        setIsFetching(true);
        setAiResponse("");
        setHasError(false);
        
        let responseText = "";
        
        try {
            const cleanup = await streamChat(userMessage.text, (chunk: string) => {
                responseText += chunk;
                setAiResponse(responseText);
            });
            
            setCleanupFunction(() => cleanup);
            
            // Add AI message to chat history when streaming is complete
            if (responseText.trim()) {
                const aiMessage: Message = {
                    id: (Date.now() + 1).toString(),
                    text: responseText.trim(),
                    isUser: false,
                    timestamp: new Date()
                };
                setMessages(prev => [...prev, aiMessage]);
            }
        } catch (error) {
            console.error("Error in chat:", error);
            setHasError(true);
            setAiResponse("Sorry, I encountered an error. Please try again.");
        } finally {
            setIsFetching(false);
            setAiResponse(""); // Clear the streaming response
        }
    };

    const renderMessage = (message: Message) => (
        <View key={message.id} className={`flex-row mb-4 ${message.isUser ? 'justify-end' : 'justify-start'}`}>
            <View className={`flex-row w-full ${message.isUser ? 'flex-row-reverse' : 'flex-row'}`}>
                {/* Avatar */}
                <View className={`w-8 h-8 rounded-full items-center justify-center mx-2 ${
                    message.isUser 
                        ? 'bg-gradient-to-br from-blue-500 to-blue-600' 
                        : 'bg-gradient-to-br from-emerald-500 to-emerald-600'
                }`}>
                    {message.isUser ? (
                        <User size={20} color="white" />
                    ) : (
                        <Bot size={20} color="white" />
                    )}
                </View>
                
                {/* Message Bubble */}
                <View className={`px-4 py-3 rounded-2xl max-w-[80%] ${
                    message.isUser 
                        ? 'bg-gradient-to-r from-blue-500 to-blue-600' 
                        : 'bg-gray-100 border border-gray-200'
                }`}>
                    <Text className={`text-base leading-6 ${
                        message.isUser ? 'text-white' : 'text-gray-800'
                    }`}>
                        {message.text}
                    </Text>
                </View>
            </View>
        </View>
    );

    return (
      <View className="flex-1 bg-green-100 p-4">
        {/* Header */}
        <View className="px-6 py-4 pt-12">
          <View className="flex-row items-center">
            <View className="w-10 h-10 rounded-full bg-green-500 items-center justify-center mr-3">
              <Sparkles size={20} color="white" />
            </View>
            <View className="flex-1">
              <Text className="text-md font-bold text-gray-800">
                ATPia AI Assistant
              </Text>
              <Text className="text-sm text-gray-600">
                Powered by advanced AI
              </Text>
            </View>
          </View>
        </View>

        {/* Messages */}
        <ScrollView
          className="flex-1 px-4 pt-4"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 80, paddingTop: 12 }}
          keyboardShouldPersistTaps="handled"
        >
          {/* Welcome area - only show if no messages */}
          {messages.length === 0 && (
            <View className="flex-1 items-center justify-center py-8">
              <View className="rounded-full items-center justify-center mb-4">
                <Bot size={38} color="green" />
              </View>
              <Text className="text-2xl font-bold text-gray-800 pb-2">
                Welcome to ATPia AI
              </Text>
              <Text className="text-gray-600 text-center text-base px-4">
                I'm here to help you with your health and nutrition journey. Ask
                me anything!
              </Text>
            </View>
          )}

          {/* Show all messages */}
          {messages.map(renderMessage)}

          {/* Show AI response in dedicated area */}
          {aiResponse && (
            <View className="flex-row mb-4 justify-start">
              <View className="flex-row max-w-[80%]">
                <View className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 items-center justify-center mx-2">
                  <Bot size={20} color="white" />
                </View>
                <View
                  className={`px-4 py-3 rounded-2xl ${
                    hasError ? "bg-red-100 border border-red-200" : "bg-gray-100 border border-gray-200"
                  }`}
                >
                  <Text
                    className={`text-base leading-6 ${
                      hasError ? "text-red-800" : "text-gray-800"
                    }`}
                  >
                    {aiResponse}
                  </Text>
                </View>
              </View>
            </View>
          )}

          {isFetching && (
            <View className="flex-row mb-4 justify-start">
              <View className="flex-row max-w-[80%]">
                <View className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 items-center justify-center mx-2">
                  <Bot size={20} color="white" />
                </View>
                <View className="px-4 py-3 rounded-2xl bg-gray-100 border border-gray-200">
                  <View className="flex-row space-x-1">
                    <View className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" />
                    <View
                      className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"
                      style={{ animationDelay: "0.2s" }}
                    />
                    <View
                      className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"
                      style={{ animationDelay: "0.4s" }}
                    />
                  </View>
                </View>
              </View>
            </View>
          )}
        </ScrollView>

        {/* Input Area */}
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "position"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 160}
        >
          <View className="bg-white border-t border-gray-200">
            <View className="flex-row items-end p-4">
              <View className="flex-1 bg-gray-50 rounded-2xl border border-gray-200">
                <TextInput
                  value={input}
                  onChangeText={setInput}
                  multiline={true}
                  numberOfLines={3}
                  placeholder="Type your message..."
                  className="text-base text-gray-800 w-full p-4"
                  style={{
                    textAlignVertical: "top",
                    minHeight: 80,
                  }}
                  onSubmitEditing={handleSend}
                  editable={!isFetching}
                />
                <TouchableOpacity
                  onPress={handleSend}
                  disabled={isFetching || !input.trim()}
                  className={`absolute right-2 bottom-2 w-12 h-12 rounded-full items-center justify-center ${
                    isFetching || !input.trim() ? 'bg-gray-400' : 'bg-green-500'
                  }`}
                >
                  <Send size={20} color="white" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
    );
}

export default Chatbot;
