import React from 'react';
import { View, Text, TouchableOpacity, ColorValue } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { AlertTriangle, Info } from 'lucide-react-native';
import { FoodItem } from '../../types';
import { FoodScannerService } from '../../services/foodScannerService';

interface AllergenWarningCardProps {
  food: FoodItem;
  onViewDetails?: () => void;
}

export const AllergenWarningCard: React.FC<AllergenWarningCardProps> = ({ 
  food, 
  onViewDetails 
}) => {
  const hasAllergens = FoodScannerService.hasAllergens(food);
  const highPriorityAllergens = FoodScannerService.getHighPriorityAllergens(food);

  if (!hasAllergens) {
    return null;
  }

  const isHighPriority = highPriorityAllergens.length > 0;
  const warningColor = isHighPriority ? '#EF4444' : '#F59E0B';
  const gradientColors = isHighPriority 
    ? ['rgba(239, 68, 68, 0.2)', 'rgba(248, 113, 113, 0.1)']
    : ['rgba(245, 158, 11, 0.2)', 'rgba(251, 191, 36, 0.1)'];

  return (
    <View className="bg-slate-800/50 rounded-2xl p-4 border border-slate-700/50 mb-4">
      <LinearGradient
        colors={gradientColors as [ColorValue, ColorValue]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="absolute inset-0 rounded-2xl"
      />
      
      <View className="flex-row items-start mb-3">
        <AlertTriangle 
          size={24} 
          color={warningColor} 
          className="mr-3 mt-1"
        />
        <View className="flex-1">
          <Text className="text-white font-bold text-base mb-1">
            {isHighPriority ? '⚠️ High Priority Allergen Warning' : '⚠️ Allergen Warning'}
          </Text>
          <Text className="text-gray-300 text-sm leading-5">
            This food contains allergens that may cause adverse reactions.
          </Text>
        </View>
      </View>

      {/* Allergen List */}
      <View className="mb-3">
        <Text className="text-gray-300 text-sm font-medium mb-2">Contains:</Text>
        <View className="flex-row flex-wrap">
          {food.allergens.map((allergen, index) => {
            const isHighPriority = highPriorityAllergens.includes(allergen);
            return (
              <View 
                key={index}
                className={`px-3 py-1 rounded-full mr-2 mb-2 ${
                  isHighPriority 
                    ? 'bg-red-600/20 border border-red-500/30' 
                    : 'bg-yellow-600/20 border border-yellow-500/30'
                }`}
              >
                <Text 
                  className={`text-xs font-medium ${
                    isHighPriority ? 'text-red-400' : 'text-yellow-400'
                  }`}
                >
                  {allergen}
                </Text>
              </View>
            );
          })}
        </View>
      </View>

      {/* Priority Warning */}
      {isHighPriority && (
        <View className="bg-red-600/20 rounded-xl p-3 mb-3 border border-red-500/30">
          <Text className="text-red-400 text-sm font-medium mb-1">
            ⚠️ High Priority Allergens Detected
          </Text>
          <Text className="text-red-300 text-xs">
            These allergens are among the most common causes of severe allergic reactions. 
            Please consult with a healthcare professional if you have known allergies.
          </Text>
        </View>
      )}

      {/* Action Button */}
      <TouchableOpacity
        onPress={onViewDetails}
        className="flex-row items-center justify-center py-2"
        activeOpacity={0.8}
      >
        <Info size={16} color={warningColor} className="mr-2" />
        <Text 
          className="text-sm font-medium"
          style={{ color: warningColor }}
        >
          View Allergen Details
        </Text>
      </TouchableOpacity>
    </View>
  );
}; 