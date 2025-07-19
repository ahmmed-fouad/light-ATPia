import { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowLeft, Search, Filter, Trash2, Calendar, TrendingUp } from 'lucide-react-native';
import { useFoodScanner } from '../hooks/useFoodScanner';
import { FoodScannerService } from '../services/foodScannerService';

export const RecentScansScreen: React.FC = () => {
  const { recentScans, clearRecentScans } = useFoodScanner();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'high-score' | 'low-score'>('all');

  const filteredScans = recentScans.filter(food => {
    const matchesSearch = food.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         food.ingredients.some(ingredient => 
                           ingredient.toLowerCase().includes(searchQuery.toLowerCase())
                         );
    
    const matchesFilter = selectedFilter === 'all' ||
                         (selectedFilter === 'high-score' && food.nutritionScore >= 80) ||
                         (selectedFilter === 'low-score' && food.nutritionScore < 60);
    
    return matchesSearch && matchesFilter;
  });

  const handleClearHistory = () => {
    clearRecentScans();
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return '#10B981';
    if (score >= 60) return '#F59E0B';
    return '#EF4444';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    return 'Fair';
  };

  const renderFoodItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      className="bg-slate-800/50 rounded-2xl p-4 mb-3 border border-slate-700/50"
      activeOpacity={0.8}
    >
      <LinearGradient
        colors={['rgba(52, 211, 153, 0.1)', 'rgba(96, 165, 250, 0.1)']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="absolute inset-0 rounded-2xl"
      />
      
      <View className="flex-row items-center justify-between mb-3">
        <View className="flex-1">
          <Text className="text-white font-semibold text-base mb-1">{item.name}</Text>
          <Text className="text-gray-400 text-sm">{item.serving}</Text>
        </View>
        <View className="items-end">
          <View 
            className="px-2 py-1 rounded-full"
            style={{ backgroundColor: getScoreColor(item.nutritionScore) + '20' }}
          >
            <Text 
              className="text-xs font-medium"
              style={{ color: getScoreColor(item.nutritionScore) }}
            >
              {item.nutritionScore}
            </Text>
          </View>
          <Text className="text-gray-400 text-xs mt-1">
            {getScoreLabel(item.nutritionScore)}
          </Text>
        </View>
      </View>

      <View className="flex-row items-center justify-between mb-3">
        <View className="flex-row items-center">
          <Calendar size={14} color="#6B7280" className="mr-1" />
          <Text className="text-gray-400 text-xs">{item.formattedDate}</Text>
        </View>
        <Text className="text-white font-medium text-sm">
          {FoodScannerService.formatCalories(item.calories)}
        </Text>
      </View>

      <View className="flex-row items-center justify-between">
        <View className="flex-row space-x-3">
          <View className="flex-row items-center">
            <View className="w-2 h-2 rounded-full mr-1" style={{ backgroundColor: '#34D399' }} />
            <Text className="text-gray-300 text-xs">
              {item.macros.protein}g protein
            </Text>
          </View>
          <View className="flex-row items-center">
            <View className="w-2 h-2 rounded-full mr-1" style={{ backgroundColor: '#60A5FA' }} />
            <Text className="text-gray-300 text-xs">
              {item.macros.carbs}g carbs
            </Text>
          </View>
        </View>
        {item.allergens.length > 0 && (
          <View className="bg-red-600/20 px-2 py-1 rounded-full">
            <Text className="text-red-400 text-xs">⚠️ Allergens</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );

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
            <View className="flex-row items-center">
              <TouchableOpacity className="mr-4">
                <ArrowLeft size={24} color="#8B5CF6" />
              </TouchableOpacity>
              <View>
                <Text className="text-white text-2xl font-bold">Recent Scans</Text>
                <Text className="text-gray-400 text-sm">
                  {recentScans.length} items scanned
                </Text>
              </View>
            </View>
            <TouchableOpacity
              onPress={handleClearHistory}
              className="p-2 rounded-full bg-red-600/20"
            >
              <Trash2 size={20} color="#EF4444" />
            </TouchableOpacity>
          </View>

          {/* Search Bar */}
          <View className="mb-4">
            <View className="flex-row items-center bg-slate-800/50 rounded-xl px-4 py-3 border border-slate-700/50">
              <Search size={20} color="#6B7280" className="mr-3" />
              <TextInput
                value={searchQuery}
                onChangeText={setSearchQuery}
                placeholder="Search scanned foods..."
                placeholderTextColor="#9CA3AF"
                className="flex-1 text-white"
              />
            </View>
          </View>

          {/* Filter Buttons */}
          <View className="mb-6">
            <Text className="text-white text-lg font-semibold mb-3">Filter by Score</Text>
            <View className="flex-row space-x-2">
              <TouchableOpacity
                onPress={() => setSelectedFilter('all')}
                className={`px-4 py-2 rounded-xl ${
                  selectedFilter === 'all' ? 'bg-purple-600' : 'bg-slate-700/50'
                }`}
                activeOpacity={0.8}
              >
                <Text className={`text-sm font-medium ${
                  selectedFilter === 'all' ? 'text-white' : 'text-gray-400'
                }`}>
                  All ({recentScans.length})
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setSelectedFilter('high-score')}
                className={`px-4 py-2 rounded-xl ${
                  selectedFilter === 'high-score' ? 'bg-green-600' : 'bg-slate-700/50'
                }`}
                activeOpacity={0.8}
              >
                <Text className={`text-sm font-medium ${
                  selectedFilter === 'high-score' ? 'text-white' : 'text-gray-400'
                }`}>
                  High Score ({recentScans.filter(f => f.nutritionScore >= 80).length})
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setSelectedFilter('low-score')}
                className={`px-4 py-2 rounded-xl ${
                  selectedFilter === 'low-score' ? 'bg-red-600' : 'bg-slate-700/50'
                }`}
                activeOpacity={0.8}
              >
                <Text className={`text-sm font-medium ${
                  selectedFilter === 'low-score' ? 'text-white' : 'text-gray-400'
                }`}>
                  Low Score ({recentScans.filter(f => f.nutritionScore < 60).length})
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Statistics */}
          <View className="mb-6">
            <Text className="text-white text-lg font-semibold mb-3">Scan Statistics</Text>
            <View className="flex-row space-x-3">
              <View className="flex-1 bg-slate-800/50 rounded-2xl p-4 border border-slate-700/50">
                <LinearGradient
                  colors={['rgba(16, 185, 129, 0.1)', 'rgba(34, 197, 94, 0.1)']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  className="absolute inset-0 rounded-2xl"
                />
                <Text className="text-white text-2xl font-bold">
                  {recentScans.length}
                </Text>
                <Text className="text-gray-400 text-sm">Total Scans</Text>
              </View>
              <View className="flex-1 bg-slate-800/50 rounded-2xl p-4 border border-slate-700/50">
                <LinearGradient
                  colors={['rgba(59, 130, 246, 0.1)', 'rgba(96, 165, 250, 0.1)']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  className="absolute inset-0 rounded-2xl"
                />
                <Text className="text-white text-2xl font-bold">
                  {Math.round(recentScans.reduce((sum, food) => sum + food.nutritionScore, 0) / recentScans.length) || 0}
                </Text>
                <Text className="text-gray-400 text-sm">Avg Score</Text>
              </View>
              <View className="flex-1 bg-slate-800/50 rounded-2xl p-4 border border-slate-700/50">
                <LinearGradient
                  colors={['rgba(251, 191, 36, 0.1)', 'rgba(245, 158, 11, 0.1)']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  className="absolute inset-0 rounded-2xl"
                />
                <Text className="text-white text-2xl font-bold">
                  {recentScans.filter(food => food.allergens.length > 0).length}
                </Text>
                <Text className="text-gray-400 text-sm">With Allergens</Text>
              </View>
            </View>
          </View>

          {/* Food List */}
          <View className="mb-8">
            <Text className="text-white text-lg font-semibold mb-3">
              {filteredScans.length > 0 ? 'Scanned Foods' : 'No Results'}
            </Text>
            
            {filteredScans.length > 0 ? (
              <FlatList
                data={filteredScans}
                renderItem={renderFoodItem}
                keyExtractor={(item) => item.id}
                scrollEnabled={false}
                showsVerticalScrollIndicator={false}
              />
            ) : (
              <View className="bg-slate-800/50 rounded-2xl p-8 border border-slate-700/50 items-center">
                <TrendingUp size={48} color="#6B7280" className="mb-4" />
                <Text className="text-gray-400 text-center">
                  {searchQuery ? 'No foods match your search' : 'No scans yet'}
                </Text>
                <Text className="text-gray-500 text-sm text-center mt-2">
                  Start scanning foods to see them here
                </Text>
              </View>
            )}
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
}; 