// import React from 'react';
import { View, Text, TouchableOpacity, Platform } from 'react-native';
import { useHabitsStore } from '../stores/habitsStore';
import { motivationalQuotes } from '../data/habitsData';

export default function MotivationalQuote() {
  const { quoteIdx, setQuoteIdx } = useHabitsStore();
  return (
    <View style={{ backgroundColor: 'rgba(255,255,255,0.97)', borderRadius: 16, padding: 16, alignItems: 'center', shadowColor: '#a7f3d0', shadowOffset: { width: 0, height: 2 }, shadowOpacity: Platform.OS === 'ios' ? 0.10 : 0.13, shadowRadius: 6, elevation: 2 }}>
      <Text style={{ fontSize: 16, fontStyle: 'italic', color: '#64748b', textAlign: 'center', marginBottom: 10 }}>
        “{motivationalQuotes[quoteIdx]}”
      </Text>
      <TouchableOpacity
        onPress={() => setQuoteIdx((quoteIdx + 1) % motivationalQuotes.length)}
        style={{ backgroundColor: '#059669', borderRadius: 12, paddingHorizontal: 18, paddingVertical: 6 }}
      >
        <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 15 }}>New Quote</Text>
      </TouchableOpacity>
    </View>
  );
} 