import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Meal } from '../types/mealsTypes';

interface MealCardProps {
  meal: Meal;
  isActive: boolean;
  onToggle?: () => void;
}

const MealCard: React.FC<MealCardProps> = ({ meal, isActive, onToggle }) => {
  const router = useRouter();

  const handleActiveMealPress = () => {
    const mealName = meal.name.toLowerCase();
    switch (mealName) {
      case 'breakfast':
        router.push('/(main)/(nutrition)/breakfast' as any);
        break;
      case 'lunch':
        router.push('/(main)/(nutrition)/lunch' as any);
        break;
      case 'dinner':
        router.push('/(main)/(nutrition)/dinner' as any);
        break;
      default:
        // For other meals, navigate to a generic meal screen
        router.push(`/(main)/(nutrition)/meal/${meal.id}` as any);
        break;
    }
  };

  const renderIcon = () => {
    if (isActive) {
      return (
        <View style={styles.iconContainer}>
          <TouchableOpacity 
            style={styles.arrowContainer} 
            onPress={onToggle}
            activeOpacity={0.7}
          >
            <Feather 
              name="arrow-down" 
              size={22} 
              color="#ef4444" 
              style={styles.arrow} 
            />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.arrowContainer} 
            onPress={handleActiveMealPress}
            activeOpacity={0.7}
          >
            <Feather 
              name="arrow-right-circle" 
              size={22} 
              color="#18b888" 
              style={styles.arrow} 
            />
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <TouchableOpacity 
          style={styles.arrowContainer} 
          onPress={onToggle}
          activeOpacity={0.7}
        >
          <Feather 
            name="arrow-up" 
            size={22} 
            color="#10b981" 
            style={styles.arrow} 
          />
        </TouchableOpacity>
      );
    }
  };

  return (
    <View style={[styles.card, isActive ? styles.active : styles.inactive]}>
      <Image source={{ uri: meal.image }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.name}>{meal.name}</Text>
        <Text style={styles.kcal}><Text style={styles.kcalBold}>{meal.kcal}</Text> kcal</Text>
      </View>
      {renderIcon()}
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
  arrowContainer: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    marginLeft: 12,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  arrow: {
    marginLeft: 0,
  },
});

export default MealCard; 