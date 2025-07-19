// import React from 'react';
import { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  ScrollView, 
  StatusBar,
  TouchableOpacity,
  Modal,
  Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useMealPlan } from '../hooks/useMealPlan';
import { MealPlanHeader } from '../components/MealPlanHeader';
import { MealPlanGenerator } from '../components/MealPlanGenerator';
import { MealPlanCard } from '../components/MealPlanCard';
import { ProgressChart } from '../components/ProgressChart';
import { AIInsights } from '../components/AIInsights';
import { MealCalendar } from '../components/MealCalendar';
import { RecipeModal } from '../components/RecipeModal';
import { MealPlan } from '../types';

export const MealPlanScreen: React.FC = () => {
  const {
    mealPlans,
    activeMealPlan,
    suggestedMealPlans,
    progress,
    weeklyStats,
    insights,
    filteredMealPlans,
    chartData,
    mealPlanStats,
    todayMeals,
    progressPercentage,
    macroProgress,
    showMealPlanGenerator,
    showRecipeModal,
    selectedRecipe,
    isLoading,
    isGenerating,
    setActiveMealPlan,
    setShowMealPlanGenerator,
    setShowRecipeModal,
    setSelectedRecipe,
    deleteMealPlan,
    generateMealPlan
  } = useMealPlan();

  const [selectedTab, setSelectedTab] = useState<'my-plans' | 'suggestions' | 'progress'>('my-plans');

  const handleGenerateMealPlan = async () => {
    setShowMealPlanGenerator(true);
  };

  const handleMealPlanPress = (mealPlan: MealPlan) => {
    setActiveMealPlan(mealPlan);
  };

  const handleMealPlanDelete = (mealPlan: MealPlan) => {
    Alert.alert(
      'Delete Meal Plan',
      `Are you sure you want to delete "${mealPlan.name}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive',
          onPress: () => {
            deleteMealPlan(mealPlan.id);
            if (activeMealPlan?.id === mealPlan.id) {
              setActiveMealPlan(null);
            }
          }
        }
      ]
    );
  };

  const handleRecipePress = (recipe: any) => {
    setSelectedRecipe(recipe);
    setShowRecipeModal(true);
  };

  const renderTabButton = (tab: string, label: string, icon: string) => (
    <TouchableOpacity
      style={[styles.tabButton, selectedTab === tab && styles.tabButtonActive]}
      onPress={() => setSelectedTab(tab as any)}
    >
      <Ionicons 
        name={icon as any} 
        size={20} 
        color={selectedTab === tab ? '#10B981' : '#6B7280'} 
      />
      <Text style={[styles.tabLabel, selectedTab === tab && styles.tabLabelActive]}>
        {label}
      </Text>
    </TouchableOpacity>
  );

  const renderContent = () => {
    switch (selectedTab) {
      case 'my-plans':
        return (
          <View style={styles.content}>
            {filteredMealPlans.length === 0 ? (
              <View style={styles.emptyState}>
                <Ionicons name="restaurant-outline" size={64} color="#D1D5DB" />
                <Text style={styles.emptyTitle}>No meal plans yet</Text>
                <Text style={styles.emptySubtitle}>
                  Create your first AI-powered meal plan to get started
                </Text>
                <TouchableOpacity 
                  style={styles.generateButton}
                  onPress={handleGenerateMealPlan}
                >
                  <Ionicons name="sparkles" size={20} color="white" />
                  <Text style={styles.generateButtonText}>Generate Meal Plan</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <ScrollView showsVerticalScrollIndicator={false}>
                {activeMealPlan && (
                  <View style={styles.activePlanSection}>
                    <Text style={styles.sectionTitle}>Active Meal Plan</Text>
                    <MealPlanCard
                      mealPlan={activeMealPlan}
                      isActive={true}
                      onPress={() => handleMealPlanPress(activeMealPlan)}
                      onDelete={() => handleMealPlanDelete(activeMealPlan)}
                    />
                  </View>
                )}

                <View style={styles.mealPlansSection}>
                  <Text style={styles.sectionTitle}>All Meal Plans</Text>
                  {filteredMealPlans.map((mealPlan) => (
                    <MealPlanCard
                      key={mealPlan.id}
                      mealPlan={mealPlan}
                      isActive={mealPlan.id === activeMealPlan?.id}
                      onPress={() => handleMealPlanPress(mealPlan)}
                      onDelete={() => handleMealPlanDelete(mealPlan)}
                    />
                  ))}
                </View>
              </ScrollView>
            )}
          </View>
        );

      case 'suggestions':
        return (
          <View style={styles.content}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.suggestionsSection}>
                <Text style={styles.sectionTitle}>AI Recommendations</Text>
                {suggestedMealPlans.length === 0 ? (
                  <View style={styles.emptySuggestions}>
                    <Ionicons name="bulb-outline" size={48} color="#D1D5DB" />
                    <Text style={styles.emptyTitle}>No suggestions yet</Text>
                    <Text style={styles.emptySubtitle}>
                      Generate a meal plan to see AI recommendations
                    </Text>
                  </View>
                ) : (
                  suggestedMealPlans.map((mealPlan) => (
                    <MealPlanCard
                      key={mealPlan.id}
                      mealPlan={mealPlan}
                      isActive={false}
                      onPress={() => handleMealPlanPress(mealPlan)}
                      onDelete={() => handleMealPlanDelete(mealPlan)}
                    />
                  ))
                )}
              </View>
            </ScrollView>
          </View>
        );

      case 'progress':
        return (
          <View style={styles.content}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.progressSection}>
                <Text style={styles.sectionTitle}>Your Progress</Text>
                
                <ProgressChart 
                  progress={progress}
                  weeklyStats={weeklyStats}
                  chartData={chartData}
                  macroProgress={macroProgress}
                />

                <AIInsights insights={insights} />

                {activeMealPlan && (
                  <View style={styles.calendarSection}>
                    <Text style={styles.sectionTitle}>Meal Calendar</Text>
                    <MealCalendar 
                      mealPlan={activeMealPlan}
                      todayMeals={todayMeals}
                      onMealPress={handleRecipePress}
                    />
                  </View>
                )}
              </View>
            </ScrollView>
          </View>
        );

      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F9FAFB" />
      
      {/* Header */}
      <MealPlanHeader
        onGeneratePress={handleGenerateMealPlan}
        isGenerating={isGenerating}
        activeMealPlan={activeMealPlan}
      />

      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        {renderTabButton('my-plans', 'My Plans', 'list')}
        {renderTabButton('suggestions', 'Suggestions', 'bulb')}
        {renderTabButton('progress', 'Progress', 'analytics')}
      </View>

      {/* Content */}
      {renderContent()}

      {/* Meal Plan Generator Modal */}
      <Modal
        visible={showMealPlanGenerator}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setShowMealPlanGenerator(false)}
      >
        <MealPlanGenerator
          onClose={() => setShowMealPlanGenerator(false)}
          onGenerate={generateMealPlan}
          isGenerating={isGenerating}
        />
      </Modal>

      {/* Recipe Modal */}
      <Modal
        visible={showRecipeModal}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setShowRecipeModal(false)}
      >
        <RecipeModal
          recipe={selectedRecipe}
          onClose={() => setShowRecipeModal(false)}
        />
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  tabButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    marginHorizontal: 4,
  },
  tabButtonActive: {
    backgroundColor: '#F0FDF4',
  },
  tabLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
    marginLeft: 6,
  },
  tabLabelActive: {
    color: '#10B981',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#6B7280',
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#9CA3AF',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 24,
  },
  generateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#10B981',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  generateButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  activePlanSection: {
    marginBottom: 24,
  },
  mealPlansSection: {
    marginBottom: 24,
  },
  suggestionsSection: {
    marginBottom: 24,
  },
  progressSection: {
    marginBottom: 24,
  },
  calendarSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 16,
  },
  emptySuggestions: {
    alignItems: 'center',
    paddingVertical: 32,
  },
}); 