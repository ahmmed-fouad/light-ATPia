// import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Lightbulb, Heart, Droplets, Dumbbell, Utensils } from 'lucide-react-native';
import { SuccessTip } from '../../types';

interface TipsCardProps {
  tips: SuccessTip[];
  title?: string;
  subtitle?: string;
}

export const TipsCard: React.FC<TipsCardProps> = ({
  tips,
  title = "Tips for Success",
  subtitle = "Follow these guidelines to achieve your nutrition goals"
}) => {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'nutrition':
        return <Utensils size={16} color="#34D399" />;
      case 'hydration':
        return <Droplets size={16} color="#06B6D4" />;
      case 'exercise':
        return <Dumbbell size={16} color="#F59E0B" />;
      case 'lifestyle':
        return <Heart size={16} color="#EF4444" />;
      default:
        return <Lightbulb size={16} color="#8B5CF6" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'nutrition':
        return '#34D399';
      case 'hydration':
        return '#06B6D4';
      case 'exercise':
        return '#F59E0B';
      case 'lifestyle':
        return '#EF4444';
      default:
        return '#8B5CF6';
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'nutrition':
        return 'Nutrition';
      case 'hydration':
        return 'Hydration';
      case 'exercise':
        return 'Exercise';
      case 'lifestyle':
        return 'Lifestyle';
      default:
        return 'General';
    }
  };

  const groupedTips = tips.reduce((acc, tip) => {
    if (!acc[tip.category]) {
      acc[tip.category] = [];
    }
    acc[tip.category].push(tip);
    return acc;
  }, {} as Record<string, SuccessTip[]>);

  return (
    <View className="bg-slate-800/50 rounded-2xl p-4 border border-slate-700/50">
      <LinearGradient
        colors={['rgba(139, 92, 246, 0.1)', 'rgba(34, 197, 94, 0.1)']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="absolute inset-0 rounded-2xl"
      />
      
      {/* Header */}
      <View className="flex-row items-center mb-4">
        <Lightbulb size={20} color="#8B5CF6" className="mr-2" />
        <View className="flex-1">
          <Text className="text-white text-lg font-semibold">{title}</Text>
          <Text className="text-gray-400 text-sm">{subtitle}</Text>
        </View>
      </View>

      {/* Tips by Category */}
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="space-y-4">
          {Object.entries(groupedTips).map(([category, categoryTips]) => (
            <View key={category} className="space-y-2">
              <View className="flex-row items-center mb-2">
                {getCategoryIcon(category)}
                <Text 
                  className="text-sm font-semibold ml-2"
                  style={{ color: getCategoryColor(category) }}
                >
                  {getCategoryLabel(category)}
                </Text>
              </View>
              
              {categoryTips.map((tip, index) => (
                <TouchableOpacity
                  key={tip.id}
                  className="bg-slate-700/50 rounded-xl p-3 border border-slate-600/50"
                  activeOpacity={0.8}
                >
                  <LinearGradient
                    colors={[getCategoryColor(category) + '10', getCategoryColor(category) + '05']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    className="absolute inset-0 rounded-xl"
                  />
                  
                  <View className="flex-row items-start">
                    <Text className="text-xl mr-3">{tip.icon}</Text>
                    <View className="flex-1">
                      <Text className="text-white font-medium text-sm mb-1">
                        {tip.title}
                      </Text>
                      <Text className="text-gray-400 text-xs leading-4">
                        {tip.description}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Additional Advice */}
      <View className="mt-4 p-3 bg-slate-700/30 rounded-xl">
        <Text className="text-white font-medium text-sm mb-2">Remember</Text>
        <Text className="text-gray-400 text-xs leading-4">
          Consistency is key! Small changes over time lead to lasting results. 
          Track your progress and adjust your plan as needed.
        </Text>
      </View>
    </View>
  );
}; 