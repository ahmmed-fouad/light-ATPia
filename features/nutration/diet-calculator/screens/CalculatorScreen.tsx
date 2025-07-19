import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Calculator, ArrowRight, RefreshCw } from 'lucide-react-native';
import { useCalculator } from '../hooks/useCalculator';
import { CalculatorForm } from '../components/forms/CalculatorForm';
import { GradientButton } from '../components/ui/GradientButton';

export const CalculatorScreen: React.FC = () => {
  const {
    form,
    results,
    isLoading,
    showResults,
    formValidation,
    handleCalculate,
    handleReset,
    isFormValid,
    setShowResults
  } = useCalculator();

  const handleCalculatePress = () => {
    handleCalculate();
  };

  const handleResetPress = () => {
    handleReset();
  };

  const handleViewResults = () => {
    setShowResults(true);
  };

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
              <View style={styles.headerLeft}>
                <View style={styles.headerIcon}>
                  <Calculator size={24} color="#059669" />
                </View>
                <View>
                  <Text style={styles.title}>Diet Calculator</Text>
                  <Text style={styles.subtitle}>
                    Calculate your personalized nutrition plan
                  </Text>
                </View>
              </View>
              
              <TouchableOpacity
                onPress={handleResetPress}
                style={styles.resetButton}
                activeOpacity={0.8}
              >
                <RefreshCw size={20} color="#64748b" />
              </TouchableOpacity>
            </View>

            {/* Quick Stats */}
            <View style={styles.statsRow}>
              <View style={styles.statCard}>
                <Text style={styles.statValue}>{form.age}</Text>
                <Text style={styles.statLabel}>Age</Text>
              </View>
              
              <View style={styles.statCard}>
                <Text style={styles.statValue}>{form.height}cm</Text>
                <Text style={styles.statLabel}>Height</Text>
              </View>
              
              <View style={styles.statCard}>
                <Text style={styles.statValue}>{form.weight}kg</Text>
                <Text style={styles.statLabel}>Weight</Text>
              </View>
            </View>
          </View>

          {/* Form */}
          <CalculatorForm />

          {/* Calculate Button */}
          <View style={styles.buttonSection}>
            <GradientButton
              title={isLoading ? "Calculating..." : "Calculate Nutrition Plan"}
              onPress={handleCalculatePress}
              variant="primary"
              size="large"
              disabled={!isFormValid() || isLoading}
              icon={Calculator}
              iconPosition="left"
              fullWidth
            />

            {/* Validation Errors */}
            {Object.keys(formValidation.errors).length > 0 && (
              <View style={styles.errorCard}>
                <Text style={styles.errorTitle}>
                  Please fix the following errors:
                </Text>
                {Object.entries(formValidation.errors).map(([field, error]) => (
                  <Text key={field} style={styles.errorText}>
                    • {error}
                  </Text>
                ))}
              </View>
            )}

            {/* Results Preview */}
            {results && !showResults && (
              <View style={styles.resultsPreview}>
                <View style={styles.resultsHeader}>
                  <View>
                    <Text style={styles.resultsTitle}>Results Ready!</Text>
                    <Text style={styles.resultsSubtitle}>
                      Your personalized nutrition plan is calculated
                    </Text>
                  </View>
                  <View style={styles.successIcon}>
                    <Text style={styles.checkmark}>✓</Text>
                  </View>
                </View>

                <View style={styles.resultsStats}>
                  <View style={styles.resultStat}>
                    <Text style={styles.resultValue}>
                      {results.calories.toLocaleString()}
                    </Text>
                    <Text style={styles.resultLabel}>Calories</Text>
                  </View>
                  <View style={styles.resultStat}>
                    <Text style={styles.resultValue}>
                      {results.protein}g
                    </Text>
                    <Text style={styles.resultLabel}>Protein</Text>
                  </View>
                  <View style={styles.resultStat}>
                    <Text style={styles.resultValue}>
                      {results.carbs}g
                    </Text>
                    <Text style={styles.resultLabel}>Carbs</Text>
                  </View>
                </View>

                <GradientButton
                  title="View Full Results"
                  onPress={handleViewResults}
                  variant="success"
                  size="medium"
                  icon={ArrowRight}
                  iconPosition="right"
                  fullWidth
                />
              </View>
            )}
          </View>

          {/* Tips Section */}
          <View style={styles.tipsSection}>
            <View style={styles.tipsCard}>
              <Text style={styles.tipsTitle}>💡 Tips</Text>
              <View style={styles.tipsList}>
                <Text style={styles.tipText}>
                  • Fill in all required fields for accurate calculations
                </Text>
                <Text style={styles.tipText}>
                  • Be honest about your activity level for best results
                </Text>
                <Text style={styles.tipText}>
                  • Consider your dietary preferences and allergies
                </Text>
                <Text style={styles.tipText}>
                  • Results are based on scientific formulas (Mifflin-St Jeor)
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
  header: {
    marginBottom: 16,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  headerIcon: {
    width: 48,
    height: 48,
    backgroundColor: '#05966920',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#059669',
    marginBottom: 2,
  },
  subtitle: {
    fontSize: 14,
    color: '#64748b',
  },
  resetButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.97)',
    shadowColor: '#a7f3d0',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: Platform.OS === 'ios' ? 0.10 : 0.13,
    shadowRadius: 6,
    elevation: 3,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.97)',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    shadowColor: '#a7f3d0',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: Platform.OS === 'ios' ? 0.10 : 0.13,
    shadowRadius: 6,
    elevation: 3,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#64748b',
  },
  buttonSection: {
    marginBottom: 16,
  },
  errorCard: {
    marginTop: 16,
    padding: 12,
    backgroundColor: '#fef2f2',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#fecaca',
  },
  errorTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#dc2626',
    marginBottom: 8,
  },
  errorText: {
    fontSize: 12,
    color: '#ef4444',
  },
  resultsPreview: {
    marginTop: 16,
    backgroundColor: 'rgba(255,255,255,0.97)',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#a7f3d0',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: Platform.OS === 'ios' ? 0.10 : 0.13,
    shadowRadius: 10,
    elevation: 4,
  },
  resultsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  resultsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 2,
  },
  resultsSubtitle: {
    fontSize: 14,
    color: '#64748b',
  },
  successIcon: {
    width: 48,
    height: 48,
    backgroundColor: '#10B98120',
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkmark: {
    fontSize: 20,
    color: '#10B981',
    fontWeight: 'bold',
  },
  resultsStats: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 16,
  },
  resultStat: {
    flex: 1,
    alignItems: 'center',
  },
  resultValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  resultLabel: {
    fontSize: 12,
    color: '#64748b',
  },
  tipsSection: {
    marginBottom: 16,
  },
  tipsCard: {
    backgroundColor: 'rgba(255,255,255,0.97)',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#a7f3d0',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: Platform.OS === 'ios' ? 0.10 : 0.13,
    shadowRadius: 6,
    elevation: 3,
  },
  tipsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#059669',
    marginBottom: 12,
  },
  tipsList: {
    gap: 8,
  },
  tipText: {
    fontSize: 14,
    color: '#374151',
    lineHeight: 20,
  },
}); 