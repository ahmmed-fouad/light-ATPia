import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowLeft, Brain, TrendingUp, Target, Zap } from 'lucide-react-native';
import { useAnalytics } from '../hooks/useAnalytics';
import { InsightCard } from '../components/cards/InsightCard';
import { MetricCard } from '../components/cards/MetricCard';
import { AnimatedProgress } from '../components/ui/AnimatedProgress';

export const AIInsights: React.FC = () => {
  const {
    user,
    counters,
    progressRings,
    chartData,
    goals,
    activityFeed,
    recommendations,
  } = useAnalytics();

  // For now, we'll use recommendations as insights since we don't have AI insights yet
  const mockInsights = recommendations.map((rec, index) => ({
    id: `insight-${index}`,
    type: 'recommendation' as const,
    title: 'Recommendation',
    message: rec.text,
    confidence: 85,
    category: 'nutrition',
    actionable: true,
    actionText: 'Learn More',
  }));

  const handleInsightAction = (insightId: string, actionText: string) => {
    console.log(`Action pressed for insight ${insightId}: ${actionText}`);
    // Handle different actions based on insight type
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
          <View className="flex-row items-center mb-6">
            <TouchableOpacity className="mr-4">
              <ArrowLeft size={24} color="#8B5CF6" />
            </TouchableOpacity>
            <View>
              <Text className="text-white text-2xl font-bold">AI Insights</Text>
              <Text className="text-gray-400 text-sm">Personalized recommendations</Text>
            </View>
          </View>

          {/* AI Confidence Score */}
          <View className="mb-6">
            <Text className="text-white text-lg font-semibold mb-3">AI Confidence</Text>
            <View className="bg-slate-800/50 rounded-2xl p-4 border border-slate-700/50">
              <LinearGradient
                colors={['rgba(139, 92, 246, 0.1)', 'rgba(6, 182, 212, 0.1)']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                className="absolute inset-0 rounded-2xl"
              />
              
              <View className="flex-row items-center mb-4">
                <Brain size={24} color="#8B5CF6" className="mr-3" />
                <View>
                  <Text className="text-white font-semibold text-lg">AI Analysis</Text>
                  <Text className="text-gray-400 text-sm">Based on your data patterns</Text>
                </View>
              </View>

              <View className="flex-row justify-between mb-4">
                <View className="items-center">
                  <Text className="text-white text-2xl font-bold">92%</Text>
                  <Text className="text-gray-400 text-sm">Accuracy</Text>
                </View>
                <View className="items-center">
                  <Text className="text-white text-2xl font-bold">15</Text>
                  <Text className="text-gray-400 text-sm">Patterns Found</Text>
                </View>
                <View className="items-center">
                  <Text className="text-white text-2xl font-bold">8</Text>
                  <Text className="text-gray-400 text-sm">Recommendations</Text>
                </View>
              </View>

              <AnimatedProgress
                progress={92}
                label="AI Confidence Level"
                size="medium"
              />
            </View>
          </View>

          {/* Quick Stats */}
          <View className="mb-6">
            <Text className="text-white text-lg font-semibold mb-3">Performance Metrics</Text>
            <View className="flex-row flex-wrap -mx-2">
              <View className="w-1/2 px-2 mb-4">
                <MetricCard
                  title="Success Rate"
                  value={85}
                  unit="%"
                  change={+5}
                  changeType="increase"
                  subtitle="Goal achievement"
                />
              </View>
              <View className="w-1/2 px-2 mb-4">
                <MetricCard
                  title="Consistency"
                  value={78}
                  unit="%"
                  change={+3}
                  changeType="increase"
                  subtitle="Daily adherence"
                />
              </View>
              <View className="w-1/2 px-2 mb-4">
                <MetricCard
                  title="AI Accuracy"
                  value={92}
                  unit="%"
                  change={+2}
                  changeType="increase"
                  subtitle="Prediction success"
                />
              </View>
              <View className="w-1/2 px-2 mb-4">
                <MetricCard
                  title="Improvement"
                  value={+15}
                  unit="%"
                  change={+8}
                  changeType="increase"
                  subtitle="Overall progress"
                />
              </View>
            </View>
          </View>

          {/* Recommendations */}
          {mockInsights.length > 0 && (
            <View className="mb-6">
              <Text className="text-white text-lg font-semibold mb-3">Smart Recommendations</Text>
              {mockInsights.map((insight) => (
                <InsightCard
                  key={insight.id}
                  insight={insight}
                  onActionPress={() => handleInsightAction(insight.id, insight.actionText || '')}
                />
              ))}
            </View>
          )}

          {/* AI Predictions */}
          <View className="mb-8">
            <Text className="text-white text-lg font-semibold mb-3">AI Predictions</Text>
            <View className="bg-slate-800/50 rounded-2xl p-4 border border-slate-700/50">
              <LinearGradient
                colors={['rgba(16, 185, 129, 0.1)', 'rgba(34, 197, 94, 0.1)']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                className="absolute inset-0 rounded-2xl"
              />
              
              <View className="flex-row items-center mb-4">
                <Zap size={20} color="#10B981" className="mr-2" />
                <Text className="text-white font-semibold text-base">Future Projections</Text>
              </View>

              <View className="space-y-4">
                <View className="flex-row justify-between items-center">
                  <View>
                    <Text className="text-gray-300 text-sm">Target Weight</Text>
                    <Text className="text-white font-semibold">70kg by March 1st</Text>
                  </View>
                  <View className="bg-green-600 rounded-full px-3 py-1">
                    <Text className="text-white text-xs font-medium">95% Likely</Text>
                  </View>
                </View>

                <View className="flex-row justify-between items-center">
                  <View>
                    <Text className="text-gray-300 text-sm">Protein Goal</Text>
                    <Text className="text-white font-semibold">180g daily by Feb 15th</Text>
                  </View>
                  <View className="bg-yellow-600 rounded-full px-3 py-1">
                    <Text className="text-white text-xs font-medium">85% Likely</Text>
                  </View>
                </View>

                <View className="flex-row justify-between items-center">
                  <View>
                    <Text className="text-gray-300 text-sm">Sleep Quality</Text>
                    <Text className="text-white font-semibold">9/10 by Feb 1st</Text>
                  </View>
                  <View className="bg-green-600 rounded-full px-3 py-1">
                    <Text className="text-white text-xs font-medium">100% Achieved</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
}; 