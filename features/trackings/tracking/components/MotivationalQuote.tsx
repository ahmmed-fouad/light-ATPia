
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Trophy } from 'lucide-react-native';
import type { MotivationalQuoteProps } from '../types/index';

export default function MotivationalQuote({ 
  motivationalQuotes, 
  quoteIdx, 
  setQuoteIdx, 
  streak 
}: MotivationalQuoteProps) {
  return (
    <View style={{
      backgroundColor: 'transparent',
      borderRadius: 16,
      padding: 0,
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
    }}>
      <Text style={{ fontSize: 16, fontStyle: 'italic', color: '#444', textAlign: 'center', marginBottom: 10 }}>
        "{motivationalQuotes[quoteIdx]}"
      </Text>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
        <Trophy size={22} color="#34d399" />
        <Text style={{ color: '#222', fontWeight: 'bold', fontSize: 18, marginLeft: 6 }}>
          {streak} Day Streak
        </Text>
      </View>
      <TouchableOpacity onPress={() => setQuoteIdx((quoteIdx + 1) % motivationalQuotes.length)}>
        <Text style={{ color: '#2563eb', fontWeight: '500', fontSize: 14 }}>New Quote</Text>
      </TouchableOpacity>
    </View>
  );
} 