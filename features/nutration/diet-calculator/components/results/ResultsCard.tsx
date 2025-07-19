// import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { CalculatorResults } from '../../types';
import { useCalculator } from '../../hooks/useCalculator';

interface ResultsCardProps {
  results: CalculatorResults;
  onAddToDiary?: () => void;
  onShare?: () => void;
}

export const ResultsCard: React.FC<ResultsCardProps> = ({
  results,
  onAddToDiary,
  onShare
}) => {
  const { formatCalories, formatMacro, formatWater, calculateBMI, getBMICategory } = useCalculator();

  const bmi = calculateBMI();
  const bmiCategory = bmi ? getBMICategory(bmi) : null;

  const getCalorieColor = (calories: number) => {
    if (calories < 1500) return '#F59E0B';
    if (calories < 2000) return '#10B981';
    if (calories < 2500) return '#3B82F6';
    return '#8B5CF6';
  };

  const getMacroColor = (macro: 'protein' | 'carbs' | 'fat') => {
    const colors = {
      protein: '#34D399',
      carbs: '#60A5FA',
      fat: '#FBBF24'
    };
    return colors[macro];
  };

  return (
    <View className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50">
      <LinearGradient
        colors={['rgba(139, 92, 246, 0.1)', 'rgba(34, 197, 94, 0.1)']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="absolute inset-0 rounded-2xl"
      />
      
      {/* Header */}
      <View className="mb-6">
        <Text className="text-white text-2xl font-bold mb-2">Your Results</Text>
        <Text className="text-gray-400 text-sm">
          Personalized nutrition plan based on your profile
        </Text>
      </View>

      {/* Main Calorie Display */}
      <View className="mb-6">
        <View className="items-center mb-4">
          <Text 
            className="text-4xl font-bold mb-2"
            style={{ color: getCalorieColor(results.calories) }}
          >
            {formatCalories(results.calories)}
          </Text>
          <Text className="text-gray-400 text-sm">Daily Calorie Target</Text>
        </View>

        {/* BMI Display */}
        {bmi && bmiCategory && (
          <View className="bg-slate-700/50 rounded-xl p-3 mb-4">
            <View className="flex-row items-center justify-between">
              <Text className="text-white font-medium">BMI</Text>
              <View className="flex-row items-center">
                <Text className="text-white font-bold text-lg mr-2">{bmi}</Text>
                <View 
                  className="px-2 py-1 rounded-full"
                  style={{ backgroundColor: bmiCategory.color + '20' }}
                >
                  <Text 
                    className="text-xs font-medium"
                    style={{ color: bmiCategory.color }}
                  >
                    {bmiCategory.category}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        )}
      </View>

      {/* Macronutrients */}
      <View className="mb-6">
        <Text className="text-white text-lg font-semibold mb-4">Macronutrients</Text>
        <View className="space-y-3">
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center">
              <View 
                className="w-3 h-3 rounded-full mr-3"
                style={{ backgroundColor: getMacroColor('protein') }}
              />
              <Text className="text-white font-medium">Protein</Text>
            </View>
            <Text className="text-white font-bold text-lg">
              {formatMacro(results.protein)}
            </Text>
          </View>

          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center">
              <View 
                className="w-3 h-3 rounded-full mr-3"
                style={{ backgroundColor: getMacroColor('carbs') }}
              />
              <Text className="text-white font-medium">Carbohydrates</Text>
            </View>
            <Text className="text-white font-bold text-lg">
              {formatMacro(results.carbs)}
            </Text>
          </View>

          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center">
              <View 
                className="w-3 h-3 rounded-full mr-3"
                style={{ backgroundColor: getMacroColor('fat') }}
              />
              <Text className="text-white font-medium">Fat</Text>
            </View>
            <Text className="text-white font-bold text-lg">
              {formatMacro(results.fat)}
            </Text>
          </View>
        </View>
      </View>

      {/* Additional Info */}
      <View className="mb-6">
        <Text className="text-white text-lg font-semibold mb-4">Additional Information</Text>
        <View className="space-y-3">
          <View className="flex-row items-center justify-between">
            <Text className="text-gray-300">Water Intake</Text>
            <Text className="text-white font-semibold">
              {formatWater(results.water)}
            </Text>
          </View>

          <View className="flex-row items-center justify-between">
            <Text className="text-gray-300">BMR (Basal Metabolic Rate)</Text>
            <Text className="text-white font-semibold">
              {formatCalories(results.bmr)}
            </Text>
          </View>

          <View className="flex-row items-center justify-between">
            <Text className="text-gray-300">TDEE (Total Daily Energy Expenditure)</Text>
            <Text className="text-white font-semibold">
              {formatCalories(results.tdee)}
            </Text>
          </View>
        </View>
      </View>

      {/* Action Buttons */}
      <View className="space-y-3">
        <TouchableOpacity
          onPress={onAddToDiary}
          className="bg-green-600 rounded-xl py-4 items-center"
          activeOpacity={0.8}
        >
          <Text className="text-white font-semibold text-base">
            Add to Food Diary
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={onShare}
          className="bg-slate-700/50 rounded-xl py-4 items-center border border-slate-600/50"
          activeOpacity={0.8}
        >
          <Text className="text-gray-300 font-semibold text-base">
            Share Results
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}; 