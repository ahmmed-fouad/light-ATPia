import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';

interface QuickActionsProps {
  onAction: (action: string) => void;
}

export const QuickActions: React.FC<QuickActionsProps> = ({ onAction }) => (
  <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 10 }}>
    <TouchableOpacity onPress={() => onAction('log-meal')}>
      <Text>Log Meal</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => onAction('share-progress')}>
      <Text>Share Progress</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => onAction('ask-ai')}>
      <Text>Ask AI</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => onAction('set-reminder')}>
      <Text>Set Reminder</Text>
    </TouchableOpacity>
  </View>
); 