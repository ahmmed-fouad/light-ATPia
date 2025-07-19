import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Utensils, Clock, Target } from 'lucide-react-native';
import { MealPlanItem } from '../../types';

interface MealPlanCardProps {
  meals: MealPlanItem[];
  title?: string;
  subtitle?: string;
}

export const MealPlanCard: React.FC<MealPlanCardProps> = ({
  meals,
  title = "Sample Meal Plan",
  subtitle = "Suggested meals to meet your nutrition goals"
}) => {
  const getMealColor = (index: number) => {
    const colors = ['#34D399', '#60A5FA', '#FBBF24', '#8B5CF6'];
    return colors[index % colors.length];
  };

  const formatCalories = (calories: number) => {
    return `${calories} kcal`;
  };

  const formatMacro = (value: number) => {
    return `${value}g`;
  };

  return (
    <View className="bg-slate-800/50 rounded-2xl p-4 border border-slate-700/50">
      <LinearGradient
        colors={['rgba(251, 191, 36, 0.1)', 'rgba(245, 158, 11, 0.1)']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="absolute inset-0 rounded-2xl"
      />
      
      {/* Header */}
      <View className="flex-row items-center mb-4">
        <Utensils size={20} color="#FBBF24" className="mr-2" />
        <View className="flex-1">
          <Text className="text-white text-lg font-semibold">{title}</Text>
          <Text className="text-gray-400 text-sm">{subtitle}</Text>
        </View>
      </View>

      {/* Meals */}
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="space-y-3">
          {meals.map((meal, index) => (
            <View 
              key={index}
              className="bg-slate-700/50 rounded-xl p-4 border border-slate-600/50"
            >
              <LinearGradient
                colors={[getMealColor(index) + '10', getMealColor(index) + '05']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                className="absolute inset-0 rounded-xl"
              />
              
              <View className="flex-row items-start justify-between mb-3">
                <View className="flex-row items-center flex-1">
                  <Text className="text-2xl mr-3">{meal.icon}</Text>
                  <View className="flex-1">
                    <Text className="text-white font-semibold text-base mb-1">
                      {meal.meal}
                    </Text>
                    <Text className="text-gray-400 text-sm">
                      {meal.description}
                    </Text>
                  </View>
                </View>
                
                <View className="items-end">
                  <Text 
                    className="text-lg font-bold"
                    style={{ color: getMealColor(index) }}
                  >
                    {formatCalories(meal.calories)}
                  </Text>
                </View>
              </View>

              {/* Nutrition Breakdown */}
              <View className="flex-row justify-between">
                <View className="flex-row items-center">
                  <View 
                    className="w-2 h-2 rounded-full mr-1"
                    style={{ backgroundColor: '#34D399' }}
                  />
                  <Text className="text-gray-300 text-xs">
                    {formatMacro(meal.protein)} protein
                  </Text>
                </View>
                
                <View className="flex-row items-center">
                  <View 
                    className="w-2 h-2 rounded-full mr-1"
                    style={{ backgroundColor: '#60A5FA' }}
                  />
                  <Text className="text-gray-300 text-xs">
                    {formatMacro(meal.carbs)} carbs
                  </Text>
                </View>
                
                <View className="flex-row items-center">
                  <View 
                    className="w-2 h-2 rounded-full mr-1"
                    style={{ backgroundColor: '#FBBF24' }}
                  />
                  <Text className="text-gray-300 text-xs">
                    {formatMacro(meal.fat)} fat
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Tips */}
      <View className="mt-4 p-3 bg-slate-700/30 rounded-xl">
        <View className="flex-row items-center mb-2">
          <Target size={16} color="#FBBF24" className="mr-2" />
          <Text className="text-white font-medium text-sm">Tips</Text>
        </View>
        <Text className="text-gray-400 text-xs">
          • Adjust portion sizes based on your calorie needs
        </Text>
        <Text className="text-gray-400 text-xs">
          • Include a variety of foods for balanced nutrition
        </Text>
        <Text className="text-gray-400 text-xs">
          • Stay hydrated throughout the day
        </Text>
      </View>
    </View>
  );
}; 