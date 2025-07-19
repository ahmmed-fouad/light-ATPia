// import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowLeft, Share2, Download, Plus } from 'lucide-react-native';
import { useCalculator } from '../hooks/useCalculator';
import { ResultsCard } from '../components/results/ResultsCard';
import { MacroPieChart } from '../components/charts/MacroPieChart';
import { CalorieBarChart } from '../components/charts/CalorieBarChart';
import { MealPlanCard } from '../components/results/MealPlanCard';
import { TipsCard } from '../components/results/TipsCard';
import { GradientButton } from '../components/ui/GradientButton';

export const ResultsScreen: React.FC = () => {
  const {
    results,
    sampleMealPlan,
    successTips,
    getMacroChartData,
    getCalorieChartData,
    setShowResults
  } = useCalculator();

  if (!results) {
    return (
      <LinearGradient
        colors={["#f5f7fa", "#e0f7fa", "#d1fae5"]}
        style={{ flex: 1 }}
      >
        <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16 }}>
          <Text style={styles.noResultsText}>
            No results available. Please calculate your nutrition plan first.
          </Text>
        </SafeAreaView>
      </LinearGradient>
    );
  }

  const handleBack = () => {
    setShowResults(false);
  };

  const handleAddToDiary = () => {
    console.log('Add to diary:', results);
    // TODO: Implement add to diary functionality
  };

  const handleShare = () => {
    console.log('Share results:', results);
    // TODO: Implement share functionality
  };

  const handleDownload = () => {
    console.log('Download results:', results);
    // TODO: Implement download functionality
  };

  const macroChartData = getMacroChartData();
  const calorieChartData = getCalorieChartData();

  return (
    <LinearGradient
      colors={["#f5f7fa", "#e0f7fa", "#d1fae5"]}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView 
          contentContainerStyle={styles.container} 
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerContent}>
              <TouchableOpacity
                onPress={handleBack}
                style={styles.backButton}
                activeOpacity={0.8}
              >
                <ArrowLeft size={24} color="#059669" />
                <Text style={styles.backText}>Back to Calculator</Text>
              </TouchableOpacity>
              
              <View style={styles.actionButtons}>
                <TouchableOpacity
                  onPress={handleShare}
                  style={styles.actionButton}
                  activeOpacity={0.8}
                >
                  <Share2 size={20} color="#3B82F6" />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={handleDownload}
                  style={styles.actionButton}
                  activeOpacity={0.8}
                >
                  <Download size={20} color="#10B981" />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.titleSection}>
              <Text style={styles.title}>Your Results</Text>
              <Text style={styles.subtitle}>
                Your personalized nutrition plan is ready
              </Text>
            </View>
          </View>

          {/* Results Card */}
          <View style={styles.section}>
            <ResultsCard
              results={results}
              onAddToDiary={handleAddToDiary}
              onShare={handleShare}
            />
          </View>

          {/* Charts Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Nutrition Breakdown</Text>
            
            {/* Macro Chart */}
            <View style={styles.chartContainer}>
              <MacroPieChart
                data={macroChartData}
                title="Macronutrient Distribution"
                subtitle="Protein, Carbs, and Fat breakdown"
                height={200}
              />
            </View>

            {/* Calorie Chart */}
            <View style={styles.chartContainer}>
              <CalorieBarChart
                data={calorieChartData}
                title="Daily Calorie Target"
                subtitle="Your personalized calorie goal"
                height={120}
              />
            </View>
          </View>

          {/* Meal Plan Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Sample Meal Plan</Text>
            <MealPlanCard meals={sampleMealPlan} />
          </View>

          {/* Tips Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Success Tips</Text>
            <TipsCard tips={successTips} />
          </View>

          {/* Action Buttons */}
          <View style={styles.section}>
            <View style={styles.buttonContainer}>
              <GradientButton
                title="Add to Food Diary"
                onPress={handleAddToDiary}
                variant="success"
                size="large"
                icon={Plus}
                iconPosition="left"
                fullWidth
              />
              
              <GradientButton
                title="Share Results"
                onPress={handleShare}
                variant="secondary"
                size="medium"
                icon={Share2}
                iconPosition="left"
                fullWidth
              />
              
              <GradientButton
                title="Download PDF"
                onPress={handleDownload}
                variant="primary"
                size="medium"
                icon={Download}
                iconPosition="left"
                fullWidth
              />
            </View>
          </View>

          {/* Additional Information */}
          <View style={styles.section}>
            <View style={styles.infoCard}>
              <Text style={styles.infoTitle}>📊 About Your Results</Text>
              <View style={styles.infoList}>
                <Text style={styles.infoText}>
                  • <Text style={styles.infoBold}>BMR:</Text> Your basal metabolic rate (calories burned at rest)
                </Text>
                <Text style={styles.infoText}>
                  • <Text style={styles.infoBold}>TDEE:</Text> Total daily energy expenditure (calories burned with activity)
                </Text>
                <Text style={styles.infoText}>
                  • <Text style={styles.infoBold}>Macros:</Text> Optimized for your dietary preference and goals
                </Text>
                <Text style={styles.infoText}>
                  • <Text style={styles.infoBold}>Water:</Text> Recommended daily hydration based on your weight
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 32,
    gap: 16,
  },
  noResultsText: {
    fontSize: 18,
    color: '#374151',
    textAlign: 'center',
  },
  header: {
    marginBottom: 16,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#059669',
    marginLeft: 8,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.97)',
    shadowColor: '#a7f3d0',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: Platform.OS === 'ios' ? 0.10 : 0.13,
    shadowRadius: 6,
    elevation: 3,
  },
  titleSection: {
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#059669',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#64748b',
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#059669',
    marginBottom: 12,
  },
  chartContainer: {
    marginBottom: 16,
  },
  buttonContainer: {
    gap: 12,
  },
  infoCard: {
    backgroundColor: 'rgba(255,255,255,0.97)',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#a7f3d0',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: Platform.OS === 'ios' ? 0.10 : 0.13,
    shadowRadius: 6,
    elevation: 3,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#059669',
    marginBottom: 12,
  },
  infoList: {
    gap: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#374151',
    lineHeight: 20,
  },
  infoBold: {
    fontWeight: '600',
    color: '#111827',
  },
}); 