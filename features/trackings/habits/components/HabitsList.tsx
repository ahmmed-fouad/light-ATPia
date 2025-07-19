import React from 'react';
import { View, Text, TouchableOpacity, Platform } from 'react-native';
import { useHabitsStore } from '../stores/habitsStore';
import type { Habit } from '../types/index';

function getHabitProgress(idx: number, demoProgress: any[]) {
  const total = demoProgress.length;
  let done = 0;
  for (let i = 0; i < total; i++) {
    if (Object.values(demoProgress[i])[idx + 1]) done++;
  }
  return Math.round((done / total) * 100);
}

// For demo, import demoProgress from data
import { demoProgress } from '../data/habitsData';

export default function HabitsList() {
  const { habits, checked, setChecked } = useHabitsStore();

  const toggleHabit = (idx: number) => {
    const newChecked = [...checked];
    newChecked[idx] = !newChecked[idx];
    setChecked(newChecked);
  };

  return (
    <View style={{ gap: 14 }}>
      {habits.map((habit: Habit, idx: number) => (
        <View
          key={habit.id}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: 'rgba(255,255,255,0.97)',
            borderRadius: 14,
            paddingVertical: 12,
            paddingHorizontal: 14,
            shadowColor: habit.color,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: Platform.OS === 'ios' ? 0.08 : 0.10,
            shadowRadius: 6,
            elevation: 2,
          }}
        >
          <TouchableOpacity
            onPress={() => toggleHabit(idx)}
            style={{
              width: 24,
              height: 24,
              borderRadius: 12,
              borderWidth: 2,
              borderColor: checked[idx] ? habit.color : '#d1d5db',
              backgroundColor: checked[idx] ? habit.color : 'transparent',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: 14,
            }}
          >
            {checked[idx] && (
              <View style={{ width: 12, height: 12, borderRadius: 6, backgroundColor: '#fff' }} />
            )}
          </TouchableOpacity>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 16, fontWeight: '600', color: '#222', fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif' }}>{habit.name}</Text>
            <View style={{ height: 8, backgroundColor: '#e5e7eb', borderRadius: 4, marginTop: 6, overflow: 'hidden' }}>
              <View style={{
                width: `${getHabitProgress(idx, demoProgress)}%`,
                height: 8,
                backgroundColor: habit.color,
                borderRadius: 4,
              }} />
            </View>
            <Text style={{ fontSize: 12, color: '#64748b', marginTop: 2 }}>{getHabitProgress(idx, demoProgress)}% complete</Text>
          </View>
        </View>
      ))}
    </View>
  );
} 