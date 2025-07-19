import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';

interface MealCardProps {
  image: string;
  label: string;
  foods: number;
  calories: number;
  totalCalories: number;
  onPress?: () => void;
}

const MealCard: React.FC<MealCardProps> = ({ image, label, foods, calories, totalCalories, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      <Image source={{ uri: image }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.foods}>{foods} Foods</Text>
      </View>
      <View style={styles.caloriesWrap}>
        <Text style={styles.calories}>{calories}</Text>
        <Text style={styles.slash}>/</Text>
        <Text style={styles.totalCalories}>{totalCalories} kcal</Text>
      </View>
      <Feather name="chevron-right" size={22} color="#22C55E" style={styles.chevron} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f7f7f7',
    marginHorizontal: 10,
    borderRadius: 26,
    paddingVertical: 32,
    paddingHorizontal: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
    backgroundColor: '#F3F4F6',
  },
  info: {
    flex: 1,
  },
  label: {
    fontSize: 16,
    fontWeight: '700',
    color: '#222',
    marginBottom: 2,
  },
  foods: {
    fontSize: 13,
    color: '#6b7280',
  },
  caloriesWrap: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginRight: 8,
  },
  calories: {
    fontSize: 16,
    fontWeight: '700',
    color: '#22C55E',
  },
  slash: {
    fontSize: 16,
    color: '#6b7280',
    marginHorizontal: 2,
  },
  totalCalories: {
    fontSize: 13,
    color: '#6b7280',
    fontWeight: '500',
  },
  chevron: {
    marginLeft: 4,
  },
});

export default MealCard; 