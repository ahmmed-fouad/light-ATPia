import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FoodItem } from '../../types';
import { FoodScannerService } from '../../services/foodScannerService';
import { Plus, Heart, Share2 } from 'lucide-react-native';

interface FoodInfoCardProps {
  food: FoodItem;
  onAddToDiary?: () => void;
  onFavorite?: () => void;
  onShare?: () => void;
}

export const FoodInfoCard: React.FC<FoodInfoCardProps> = ({ 
  food, 
  onAddToDiary, 
  onFavorite, 
  onShare 
}) => {
  const nutritionScore = FoodScannerService.calculateNutritionScore(food);
  const scoreColor = nutritionScore >= 80 ? '#10B981' : 
                    nutritionScore >= 60 ? '#F59E0B' : '#EF4444';

  return (
    <View className="bg-slate-800/50 rounded-2xl p-4 border border-slate-700/50 mb-4">
      <LinearGradient
        colors={['rgba(52, 211, 153, 0.1)', 'rgba(96, 165, 250, 0.1)']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="absolute inset-0 rounded-2xl"
      />
      
      {/* Header */}
      <View className="flex-row items-center justify-between mb-4">
        <View className="flex-1">
          <Text className="text-white font-bold text-xl mb-1">{food.name}</Text>
          <Text className="text-gray-400 text-sm">{food.serving}</Text>
        </View>
        <View className="flex-row items-center space-x-2">
          <TouchableOpacity 
            onPress={onFavorite}
            className="p-2 rounded-full bg-slate-700/50"
          >
            <Heart size={20} color="#EF4444" />
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={onShare}
            className="p-2 rounded-full bg-slate-700/50"
          >
            <Share2 size={20} color="#60A5FA" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Calories and Score */}
      <View className="flex-row items-center justify-between mb-4">
        <View>
          <Text className="text-white text-2xl font-bold">
            {FoodScannerService.formatCalories(food.calories)}
          </Text>
          <Text className="text-gray-400 text-sm">Total Calories</Text>
        </View>
        <View className="items-center">
          <View 
            className="w-12 h-12 rounded-full items-center justify-center mb-1"
            style={{ backgroundColor: scoreColor + '20' }}
          >
            <Text 
              className="text-lg font-bold"
              style={{ color: scoreColor }}
            >
              {nutritionScore}
            </Text>
          </View>
          <Text className="text-gray-400 text-xs">Score</Text>
        </View>
      </View>

      {/* Macros */}
      <View className="mb-4">
        <Text className="text-white font-semibold text-base mb-2">Macronutrients</Text>
        <View className="space-y-2">
          <View className="flex-row justify-between items-center">
            <View className="flex-row items-center">
              <View className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: '#34D399' }} />
              <Text className="text-gray-300">Protein</Text>
            </View>
            <Text className="text-white font-semibold">
              {FoodScannerService.formatMacro(food.macros.protein)}g
            </Text>
          </View>
          <View className="flex-row justify-between items-center">
            <View className="flex-row items-center">
              <View className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: '#60A5FA' }} />
              <Text className="text-gray-300">Carbs</Text>
            </View>
            <Text className="text-white font-semibold">
              {FoodScannerService.formatMacro(food.macros.carbs)}g
            </Text>
          </View>
          <View className="flex-row justify-between items-center">
            <View className="flex-row items-center">
              <View className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: '#FBBF24' }} />
              <Text className="text-gray-300">Fat</Text>
            </View>
            <Text className="text-white font-semibold">
              {FoodScannerService.formatMacro(food.macros.fat)}g
            </Text>
          </View>
        </View>
      </View>

      {/* Action Button */}
      <TouchableOpacity
        onPress={onAddToDiary}
        className="bg-green-600 rounded-xl py-3 flex-row items-center justify-center"
        activeOpacity={0.8}
      >
        <Plus size={20} color="white" className="mr-2" />
        <Text className="text-white font-semibold text-base ml-2">
          Add to Food Diary
        </Text>
      </TouchableOpacity>
    </View>
  );
}; 