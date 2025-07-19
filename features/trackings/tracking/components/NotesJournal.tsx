// import React from 'react';
import { View, Text, TouchableOpacity, TextInput, Platform } from 'react-native';
import { FileText } from 'lucide-react-native';
import type { NotesJournalProps } from '../types/index';

export default function NotesJournal({ note, setNote }: NotesJournalProps) {
  return (
    <View style={{
      backgroundColor: 'transparent',
      borderRadius: 16,
      padding: 0,
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      minHeight: 180,
    }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
        <FileText size={20} color="#34d399" />
        <Text style={{ fontSize: 17, fontWeight: 'bold', color: '#222', marginLeft: 6 }}>
          Notes & Journal
        </Text>
      </View>
      <TextInput
        style={{
          width: '100%',
          minHeight: 60,
          borderRadius: 10,
          backgroundColor: '#f3f4f6',
          padding: 10,
          fontSize: 15,
          color: '#222',
          marginBottom: 10,
          fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif',
        }}
        placeholder="Write your thoughts here..."
        placeholderTextColor="#9ca3af"
        value={note}
        onChangeText={setNote}
        multiline
        textAlignVertical="top"
      />
      <TouchableOpacity style={{ alignSelf: 'flex-end' }}>
        <FileText size={18} color="#2563eb" />
      </TouchableOpacity>
    </View>
  );
} 