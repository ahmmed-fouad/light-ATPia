import React from 'react';
import { View, Text, TextInput, Platform } from 'react-native';
import { useHabitsStore } from '../stores/habitsStore';

export default function NotesSection() {
  const { note, setNote } = useHabitsStore();
  return (
    <View style={{ backgroundColor: 'rgba(255,255,255,0.97)', borderRadius: 16, padding: 16, alignItems: 'flex-start', shadowColor: '#a7f3d0', shadowOffset: { width: 0, height: 2 }, shadowOpacity: Platform.OS === 'ios' ? 0.10 : 0.13, shadowRadius: 6, elevation: 2, minWidth: 180, flex: 1 }}>
      <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#059669', marginBottom: 8 }}>Notes</Text>
      <TextInput
        style={{
          width: '100%',
          minHeight: 60,
          borderRadius: 10,
          backgroundColor: '#f3f4f6',
          padding: 10,
          fontSize: 15,
          color: '#222',
          fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif',
        }}
        placeholder="Write your thoughts here..."
        placeholderTextColor="#9ca3af"
        value={note}
        onChangeText={setNote}
        multiline
        textAlignVertical="top"
      />
    </View>
  );
} 