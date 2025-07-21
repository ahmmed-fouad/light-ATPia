import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MealCard from '../components/MealCard';
import SectionHeader from '../components/SectionHeader';
import { getMealsSections } from '../services/mealsService';
import { Meal, MealsSection } from '../types/mealsTypes';
import { ScrollAwareView } from '@/components';
import { SafeAreaView } from 'react-native-safe-area-context';

const DaysMealsScreen = () => {
  const router = useRouter();
  const [meals, setMeals] = useState<Meal[]>([]);
  const [sections, setSections] = useState<MealsSection[]>([]);

  useEffect(() => {
    // Initialize meals from service
    const initialSections = getMealsSections();
    const allMeals = [...initialSections[0].data, ...initialSections[1].data];
    setMeals(allMeals);
    updateSections(allMeals);
  }, []);

  const updateSections = (mealsList: Meal[]) => {
    const activeMeals = mealsList.filter(meal => meal.isActive);
    const inactiveMeals = mealsList.filter(meal => !meal.isActive);
    
    setSections([
      { title: 'Active', data: activeMeals },
      { title: 'Inactive', data: inactiveMeals },
    ]);
  };

  const handleMealToggle = (mealId: string) => {
    const updatedMeals = meals.map(meal => 
      meal.id === mealId 
        ? { ...meal, isActive: !meal.isActive }
        : meal
    );
    setMeals(updatedMeals);
    updateSections(updatedMeals);
  };

  const activeCount = sections[0]?.data.length || 0;

  const handleBackPress = () => {
    router.push('/(main)/(nutrition)/personal-program' as any);
  };

  return (
    <View style={styles.root}>
      <ScrollAwareView
        showsVerticalScrollIndicator={false}
      >
      <View style={styles.headerRow}>
        <TouchableOpacity style={styles.backBtn} onPress={handleBackPress}>
          <Feather name="chevron-left" size={28} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.title}>Day's meals</Text>
        <View style={styles.badge}><Text style={styles.badgeText}>{activeCount}</Text></View>
      </View>
      {sections.map(section => (
        <View key={section.title}>
          <SectionHeader title={section.title} />
          {section.data.map(meal => (
            <MealCard 
              key={meal.id} 
              meal={meal} 
              isActive={section.title === 'Active'} 
              onToggle={() => handleMealToggle(meal.id)}
            />
          ))}
        </View>
      ))}
      <View style={{ height: 32 }} />
    </ScrollAwareView>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 18,
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 36,
    paddingBottom: 0,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 18,
    marginTop: 120,
  },
  backBtn: {
    padding: 18,
    borderRadius: 35,
    backgroundColor: "#18b888",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#173430",
  },
  badge: {
    minWidth: 66,
    height: 66,
    borderRadius: 38,
    backgroundColor: "#18b888",
    alignItems: "center",
    justifyContent: "center",
  },
  badgeText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 18,
  },
});

export default DaysMealsScreen; 