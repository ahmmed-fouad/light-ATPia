import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import SectionHeader from '../components/SectionHeader';
import MealCard from '../components/MealCard';
import { getMealsSections } from '../services/mealsService';

const DaysMealsScreen = () => {
  const sections = getMealsSections();
  const activeCount = sections[0].data.length;

  return (
    <ScrollView style={styles.root} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <View style={styles.headerRow}>
        <TouchableOpacity style={styles.backBtn}>
          <Feather name="chevron-left" size={28} color="#173430" />
        </TouchableOpacity>
        <Text style={styles.title}>Day’s meals</Text>
        <View style={styles.badge}><Text style={styles.badgeText}>{activeCount}</Text></View>
      </View>
      {sections.map(section => (
        <View key={section.title}>
          <SectionHeader title={section.title} />
          {section.data.map(meal => (
            <MealCard key={meal.id} meal={meal} isActive={section.title === 'Active'} />
          ))}
        </View>
      ))}
      <View style={{ height: 32 }} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 0,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 18,
    marginTop: 8,
  },
  backBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#F1F9E9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#173430',
  },
  badge: {
    minWidth: 44,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#18b888',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  badgeText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 18,
  },
});

export default DaysMealsScreen; 