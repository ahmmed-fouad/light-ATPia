import React from 'react';
import { View, Text, Platform } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { calendarDemo } from '../data/habitsData';

// Mark completed days
const markedDates = calendarDemo.reduce((acc, day) => {
  acc[day.date] = day.completed
    ? { marked: true, dotColor: '#059669', selected: true, selectedColor: '#34d399' }
    : { marked: false };
  return acc;
}, {} as Record<string, any>);

export default function CalendarView() {
  return (
    <View style={{ backgroundColor: 'rgba(255,255,255,0.97)', borderRadius: 16, padding: 8, alignItems: 'center', shadowColor: '#a7f3d0', shadowOffset: { width: 0, height: 2 }, shadowOpacity: Platform.OS === 'ios' ? 0.10 : 0.13, shadowRadius: 6, elevation: 2 }}>
      <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#059669', marginBottom: 6 }}>Calendar</Text>
      <Calendar
        markedDates={markedDates}
        theme={{
          backgroundColor: 'transparent',
          calendarBackground: 'transparent',
          textSectionTitleColor: '#64748b',
          selectedDayBackgroundColor: '#34d399',
          selectedDayTextColor: '#fff',
          todayTextColor: '#059669',
          dayTextColor: '#222',
          textDisabledColor: '#d1d5db',
          dotColor: '#059669',
          selectedDotColor: '#fff',
          arrowColor: '#059669',
          monthTextColor: '#059669',
          indicatorColor: '#059669',
          textDayFontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif',
          textMonthFontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif',
          textDayHeaderFontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif',
          textDayFontWeight: '500',
          textMonthFontWeight: 'bold',
          textDayHeaderFontWeight: '500',
        }}
        style={{ borderRadius: 12, width: 260 }}
        hideExtraDays
        disableMonthChange={false}
      />
    </View>
  );
} 