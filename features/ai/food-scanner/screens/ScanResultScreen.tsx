// import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowLeft, Share2, Heart, Plus, CheckCircle } from 'lucide-react-native';
import { useFoodScanner } from '../hooks/useFoodScanner';
import { MacroPieChart } from '../components/charts/MacroPieChart';
import { MicroBarChart } from '../components/charts/MicroBarChart';
import { FoodInfoCard } from '../components/cards/FoodInfoCard';
import { AllergenWarningCard } from '../components/cards/AllergenWarningCard';
import { IngredientChip } from '../components/cards/IngredientChip';

export const ScanResultScreen: React.FC = () => {
  const {
    scannedFood,
    macroChartData,
    microChartData,
    nutritionScore,
    hasAllergens,
    highPriorityAllergens,
    getConfidenceColor,
    getNutritionScoreColor,
    formatCalories,
    formatMacro,
    formatServing,
  } = useFoodScanner();

  if (!scannedFood) {
    return (
      <SafeAreaView className="flex-1 bg-slate-900">
        <LinearGradient
          colors={['#0F172A', '#1E293B', '#334155']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          className="flex-1 justify-center items-center px-4"
        >
          <Text className="text-white text-lg text-center">
            No scan results available
          </Text>
        </LinearGradient>
      </SafeAreaView>
    );
  }

  const handleAddToDiary = () => {
    console.log('Add to diary:', scannedFood.name);
    // TODO: Implement add to diary functionality
  };

  const handleFavorite = () => {
    console.log('Favorite:', scannedFood.name);
    // TODO: Implement favorite functionality
  };

  const handleShare = () => {
    console.log('Share:', scannedFood.name);
    // TODO: Implement share functionality
  };

  const handleViewAllergenDetails = () => {
    console.log('View allergen details');
    // TODO: Navigate to allergen details screen
  };

  return (
    <SafeAreaView className="flex-1 bg-slate-900">
      <LinearGradient
        colors={['#0F172A', '#1E293B', '#334155']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="flex-1"
      >
        <ScrollView className="flex-1 px-4 pt-4" showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View className="flex-row items-center justify-between mb-6">
            <TouchableOpacity className="mr-4">
              <ArrowLeft size={24} color="#8B5CF6" />
            </TouchableOpacity>
            <View className="flex-1">
              <Text className="text-white text-2xl font-bold">{scannedFood.name}</Text>
              <Text className="text-gray-400 text-sm">{formatServing(scannedFood.serving)}</Text>
            </View>
            <View className="flex-row items-center space-x-2">
              <TouchableOpacity 
                onPress={handleFavorite}
                className="p-2 rounded-full bg-slate-700/50"
              >
                <Heart size={20} color="#EF4444" />
              </TouchableOpacity>
              <TouchableOpacity 
                onPress={handleShare}
                className="p-2 rounded-full bg-slate-700/50"
              >
                <Share2 size={20} color="#60A5FA" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Food Image */}
          {scannedFood.imageUrl && (
            <View className="mb-6">
              <Image
                source={{ uri: scannedFood.imageUrl }}
                className="w-full h-48 rounded-2xl"
                resizeMode="cover"
              />
            </View>
          )}

          {/* Food Info Card */}
          <FoodInfoCard
            food={scannedFood}
            onAddToDiary={handleAddToDiary}
            onFavorite={handleFavorite}
            onShare={handleShare}
          />

          {/* Allergen Warning */}
          <AllergenWarningCard
            food={scannedFood}
            onViewDetails={handleViewAllergenDetails}
          />

          {/* Macro Nutrients Chart */}
          {macroChartData.length > 0 && (
            <View className="mb-6">
              <MacroPieChart
                data={macroChartData}
                title="Macronutrient Breakdown"
                subtitle="Protein, Carbs, and Fat distribution"
              />
            </View>
          )}

          {/* Micro Nutrients Chart */}
          {microChartData.length > 0 && (
            <View className="mb-6">
              <MicroBarChart
                data={microChartData}
                title="Micronutrients"
                subtitle="Vitamins and minerals content"
              />
            </View>
          )}

          {/* Ingredients */}
          <View className="mb-6">
            <Text className="text-white text-lg font-semibold mb-3">Ingredients</Text>
            <View className="bg-slate-800/50 rounded-2xl p-4 border border-slate-700/50">
              <LinearGradient
                colors={['rgba(139, 92, 246, 0.1)', 'rgba(34, 197, 94, 0.1)']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                className="absolute inset-0 rounded-2xl"
              />
              
              <View className="flex-row flex-wrap">
                {scannedFood.ingredients.map((ingredient, index) => (
                  <IngredientChip
                    key={index}
                    ingredient={ingredient}
                    variant="default"
                  />
                ))}
              </View>
              
              <Text className="text-gray-400 text-xs mt-3">
                {scannedFood.ingredients.length} ingredients listed
              </Text>
            </View>
          </View>

          {/* Nutrition Score */}
          <View className="mb-6">
            <Text className="text-white text-lg font-semibold mb-3">Nutrition Score</Text>
            <View className="bg-slate-800/50 rounded-2xl p-4 border border-slate-700/50">
              <LinearGradient
                colors={['rgba(16, 185, 129, 0.1)', 'rgba(34, 197, 94, 0.1)']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                className="absolute inset-0 rounded-2xl"
              />
              
              <View className="flex-row items-center justify-between mb-4">
                <View>
                  <Text className="text-white text-3xl font-bold">
                    {nutritionScore}/100
                  </Text>
                  <Text className="text-gray-400 text-sm">Overall Nutrition Score</Text>
                </View>
                <View 
                  className="w-16 h-16 rounded-full items-center justify-center"
                  style={{ backgroundColor: getNutritionScoreColor(nutritionScore) + '20' }}
                >
                  <CheckCircle 
                    size={32} 
                    color={getNutritionScoreColor(nutritionScore)} 
                  />
                </View>
              </View>

              <View className="space-y-2">
                <View className="flex-row justify-between">
                  <Text className="text-gray-300 text-sm">Protein Quality</Text>
                  <Text className="text-white text-sm font-medium">
                    {nutritionScore >= 80 ? 'Excellent' : nutritionScore >= 60 ? 'Good' : 'Fair'}
                  </Text>
                </View>
                <View className="flex-row justify-between">
                  <Text className="text-gray-300 text-sm">Fiber Content</Text>
                  <Text className="text-white text-sm font-medium">
                    {scannedFood.micros.find(m => m.name.toLowerCase().includes('fiber')) ? 'Good' : 'Low'}
                  </Text>
                </View>
                <View className="flex-row justify-between">
                  <Text className="text-gray-300 text-sm">Sugar Content</Text>
                  <Text className="text-white text-sm font-medium">
                    {scannedFood.micros.find(m => m.name.toLowerCase().includes('sugar'))?.value || 0 < 10 ? 'Low' : 'High'}
                  </Text>
                </View>
              </View>
            </View>
          </View>

          {/* Action Buttons */}
          <View className="mb-8">
            <TouchableOpacity
              onPress={handleAddToDiary}
              className="bg-green-600 rounded-xl py-4 flex-row items-center justify-center mb-3"
              activeOpacity={0.8}
            >
              <Plus size={20} color="white" className="mr-2" />
              <Text className="text-white font-semibold text-base ml-2">
                Add to Food Diary
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              className="bg-slate-700/50 rounded-xl py-4 flex-row items-center justify-center border border-slate-600/50"
              activeOpacity={0.8}
            >
              <Text className="text-gray-300 font-semibold text-base">
                View Similar Foods
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
}; 