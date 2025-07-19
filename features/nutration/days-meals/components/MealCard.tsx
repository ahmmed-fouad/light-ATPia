import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Meal } from '../types/mealsTypes';

interface MealCardProps {
  meal: Meal;
  isActive: boolean;
}

const MealCard: React.FC<MealCardProps> = ({ meal, isActive }) => {
  return (
    <View style={[styles.card, isActive ? styles.active : styles.inactive]}>
      <Image source={{ uri: meal.image }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.name}>{meal.name}</Text>
        <Text style={styles.kcal}><Text style={styles.kcalBold}>{meal.kcal}</Text> kcal</Text>
      </View>
      <Feather name="menu" size={22} color="#6b7280" style={styles.drag} />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 28,
    padding: 18,
    marginBottom: 16,
    marginHorizontal: 0,
  },
  active: {
    backgroundColor: '#F1F9E9',
  },
  inactive: {
    backgroundColor: '#F7F7F7',
  },
  image: {
    width: 44,
    height: 44,
    borderRadius: 22,
    marginRight: 16,
    backgroundColor: '#fff',
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 17,
    fontWeight: '700',
    color: '#12281D',
    marginBottom: 2,
  },
  kcal: {
    fontSize: 15,
    color: '#6b7280',
    fontWeight: '400',
  },
  kcalBold: {
    fontWeight: '700',
    color: '#12281D',
  },
  drag: {
    marginLeft: 12,
  },
});

export default MealCard; 