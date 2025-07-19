import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react-native';

interface MetricCardProps {
  title: string;
  value: string | number;
  unit?: string;
  change?: number;
  changeType?: 'increase' | 'decrease' | 'stable';
  color?: string;
  onPress?: () => void;
  subtitle?: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  unit,
  change,
  changeType = 'stable',
  color = '#8B5CF6',
  onPress,
  subtitle,
}) => {
  const getGradientColors = () => {
    switch (changeType) {
      case 'increase':
        return ['rgba(16, 185, 129, 0.2)', 'rgba(34, 197, 94, 0.1)'];
      case 'decrease':
        return ['rgba(239, 68, 68, 0.2)', 'rgba(248, 113, 113, 0.1)'];
      default:
        return ['rgba(139, 92, 246, 0.2)', 'rgba(168, 85, 247, 0.1)'];
    }
  };

  const getTrendIcon = () => {
    switch (changeType) {
      case 'increase':
        return <TrendingUp size={16} color="#10B981" />;
      case 'decrease':
        return <TrendingDown size={16} color="#EF4444" />;
      default:
        return <Minus size={16} color="#6B7280" />;
    }
  };

  const getChangeColor = () => {
    switch (changeType) {
      case 'increase':
        return '#10B981';
      case 'decrease':
        return '#EF4444';
      default:
        return '#6B7280';
    }
  };

  const CardContent = () => (
    <View className="bg-slate-800/50 rounded-2xl p-4 border border-slate-700/50">
      <LinearGradient
        colors={getGradientColors() as [string, string]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="absolute inset-0 rounded-2xl"
      />
      
      <View className="flex-row items-center justify-between mb-2">
        <Text className="text-gray-300 text-sm font-medium">{title}</Text>
        {change !== undefined && (
          <View className="flex-row items-center">
            {getTrendIcon()}
            <Text 
              className="text-xs font-medium ml-1"
              style={{ color: getChangeColor() }}
            >
              {change > 0 ? '+' : ''}{change}%
            </Text>
          </View>
        )}
      </View>

      <View className="flex-row items-baseline">
        <Text className="text-white text-2xl font-bold mr-1">
          {typeof value === 'number' ? value.toFixed(1) : value}
        </Text>
        {unit && (
          <Text className="text-gray-400 text-sm">{unit}</Text>
        )}
      </View>

      {subtitle && (
        <Text className="text-gray-400 text-xs mt-1">{subtitle}</Text>
      )}
    </View>
  );

  if (onPress) {
    return (
      <TouchableOpacity 
        className="mb-4"
        onPress={onPress}
        activeOpacity={0.8}
      >
        <CardContent />
      </TouchableOpacity>
    );
  }

  return (
    <View className="mb-4">
      <CardContent />
    </View>
  );
}; 