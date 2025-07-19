import React from 'react';
import { View, Text, Platform } from 'react-native';

export default function HabitsHeader() {
  return (
    <View style={{ alignItems: 'center', marginBottom: 8 }}>
      <Text style={{
        fontSize: 28,
        fontWeight: 'bold',
        color: '#059669',
        fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif',
        marginBottom: 4,
        letterSpacing: 0.5,
      }}>
        Habit Tracker
      </Text>
      <Text style={{
        fontSize: 16,
        color: '#64748b',
        fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif',
        textAlign: 'center',
        fontWeight: '500',
        letterSpacing: 0.2,
      }}>
        Build healthy habits and track your daily progress
      </Text>
    </View>
  );
} 