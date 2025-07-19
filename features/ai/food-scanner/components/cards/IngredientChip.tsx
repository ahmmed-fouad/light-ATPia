import React from 'react';
import { View, Text, TouchableOpacity, ColorValue } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface IngredientChipProps {
  ingredient: string;
  onPress?: () => void;
  variant?: 'default' | 'primary' | 'secondary';
}

export const IngredientChip: React.FC<IngredientChipProps> = ({ 
  ingredient, 
  onPress, 
  variant = 'default' 
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return {
          container: 'bg-green-600/20 border border-green-500/30',
          text: 'text-green-400',
          gradient: ['rgba(34, 197, 94, 0.2)', 'rgba(16, 185, 129, 0.1)'],
        };
      case 'secondary':
        return {
          container: 'bg-blue-600/20 border border-blue-500/30',
          text: 'text-blue-400',
          gradient: ['rgba(59, 130, 246, 0.2)', 'rgba(96, 165, 250, 0.1)'],
        };
      default:
        return {
          container: 'bg-gradient-to-r from-green-100/20 via-blue-100/20 to-yellow-100/20 border border-slate-600/30',
          text: 'text-gray-300',
          gradient: ['rgba(139, 92, 246, 0.1)', 'rgba(96, 165, 250, 0.1)'],
        };
    }
  };

  const styles = getVariantStyles();

  const ChipContent = () => (
    <View className={`px-3 py-2 rounded-full ${styles.container}`}>
      <LinearGradient
        colors={styles.gradient as [ColorValue, ColorValue]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="absolute inset-0 rounded-full"
      />
      <Text className={`text-xs font-semibold ${styles.text}`}>
        {ingredient}
      </Text>
    </View>
  );

  if (onPress) {
    return (
      <TouchableOpacity 
        onPress={onPress}
        activeOpacity={0.8}
        className="mr-2 mb-2"
      >
        <ChipContent />
      </TouchableOpacity>
    );
  }

  return (
    <View className="mr-2 mb-2">
      <ChipContent />
    </View>
  );
}; 