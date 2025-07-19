// import React from 'react';
import { View, ScrollView, StyleSheet, Platform } from 'react-native';
import { useHabitsStore } from '../stores/habitsStore';
import { LinearGradient } from 'expo-linear-gradient';
import HabitsHeader from '../components/HabitsHeader';
import HabitsList from '../components/HabitsList';
import HabitsChart from '../components/HabitsChart';
import StreaksAchievements from '../components/StreaksAchievements';
import MotivationalQuote from '../components/MotivationalQuote';
import CalendarView from '../components/CalendarView';
import NotesSection from '../components/NotesSection';
import ExportButton from '../components/ExportButton';

// Remove the placeholder CalendarView
// const CalendarView = () => <View style={styles.card} />;
// Remove the placeholder NotesSection
// const NotesSection = () => <View style={styles.card} />;
// Remove the placeholder ExportButton
// const ExportButton = () => <View style={styles.card} />;

export default function HabitsScreen() {
  // Get state from store (for future use)
  const { habits, checked, quoteIdx, note, streak, view } = useHabitsStore();

  return (
    <LinearGradient
      colors={["#f5f7fa", "#e0f7fa", "#d1fae5"]}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <HabitsHeader />
        <HabitsList />
        <HabitsChart />
        <StreaksAchievements />
        <MotivationalQuote />
        <View style={styles.col}>
          <CalendarView />
          <NotesSection />
        </View>
        <ExportButton />
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 32,
    gap: 16,
  },
  card: {
    backgroundColor: 'rgba(255,255,255,0.96)',
    borderRadius: 18,
    padding: 18,
    marginBottom: 0,
    shadowColor: '#a7f3d0',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: Platform.OS === 'ios' ? 0.10 : 0.13,
    shadowRadius: 10,
    elevation: 4,
    minHeight: 60,
  },
  row: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 0,
  },
  col: {
    flexDirection: 'column',
    gap: 16,
    marginBottom: 0,
  },
}); 