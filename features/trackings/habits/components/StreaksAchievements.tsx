import React from 'react';
import { View, Text, Platform } from 'react-native';
import { Trophy } from 'lucide-react-native';
import { useHabitsStore } from '../stores/habitsStore';

const badges = [
  { label: '7 Day Streak', color: '#fbbf24' },
  { label: '30 Day Streak', color: '#34d399' },
  { label: 'Consistency Star', color: '#60a5fa' },
];

export default function StreaksAchievements() {
  const { streak } = useHabitsStore();
  return (
    <View style={{ backgroundColor: 'rgba(255,255,255,0.97)', borderRadius: 16, padding: 16, alignItems: 'center', shadowColor: '#fbbf24', shadowOffset: { width: 0, height: 2 }, shadowOpacity: Platform.OS === 'ios' ? 0.08 : 0.10, shadowRadius: 6, elevation: 2 }}>
      <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#059669', marginBottom: 8 }}>
        <Trophy size={22} color="#fbbf24" />  {streak} Day Streak
      </Text>
      <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 4 }}>
        {badges.map((badge, i) => (
          <View key={i} style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 10 }}>
            <Trophy size={18} color={badge.color} />
            <Text style={{ fontSize: 14, color: badge.color, fontWeight: '600', marginLeft: 4 }}>{badge.label}</Text>
          </View>
        ))}
      </View>
    </View>
  );
} 