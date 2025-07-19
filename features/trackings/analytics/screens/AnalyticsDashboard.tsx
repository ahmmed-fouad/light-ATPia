import React, { useState } from 'react';
import { ScrollView, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import GreetingCard from '../components/GreetingCard';
import AnimatedCounters from '../components/AnimatedCounters';
import ProgressRings from '../components/ProgressRings';
import WeeklyProgressChart from '../components/WeeklyProgressChart';
import GoalsCard from '../components/GoalsCard';
import QuickActions from '../components/QuickActions';
import RecentActivity from '../components/RecentActivity';
import RecommendationsCard from '../components/RecommendationsCard';
import { MetricCard } from '../components/cards/MetricCard';
import { InsightCard } from '../components/cards/InsightCard';
import { useAnalytics } from '../hooks/useAnalytics';

const periods = [
  { key: 'week', label: 'Week' },
  { key: 'month', label: 'Month' },
  { key: 'quarter', label: 'Quarter' },
  { key: 'year', label: 'Year' },
];

const AnalyticsDashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'quarter' | 'year'>('week');
  const { user, counters, progressRings, chartData, goals, activityFeed, recommendations } = useAnalytics();

  // Create mock insights from recommendations
  const mockInsights = recommendations.slice(0, 2).map((rec, index) => ({
    id: `insight-${index}`,
    type: 'recommendation' as const,
    title: 'Smart Tip',
    message: rec.text,
    confidence: 85,
    category: 'nutrition',
    actionable: true,
    actionText: 'Learn More',
  }));

  return (
    <ScrollView style={styles.bg} contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      <GreetingCard />
      {/* Period Selector */}
      <View style={styles.periodRow}>
        {periods.map((period) => (
          <TouchableOpacity
            key={period.key}
            style={[styles.periodBtn, selectedPeriod === period.key && styles.periodBtnActive]}
            onPress={() => setSelectedPeriod(period.key as any)}
            activeOpacity={0.7}
          >
            <Text style={[styles.periodText, selectedPeriod === period.key && styles.periodTextActive]}>
              {period.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      
      {/* Quick Stats */}
      <View style={styles.quickStatsCard}>
        <Text style={styles.sectionTitle}>Quick Stats</Text>
        <View style={styles.statsGridImproved}>
          <View style={[styles.statCardImproved, styles.statCardSuccess]}> 
            <View style={{ backgroundColor: '#34d399' }} />
            <Text style={[styles.statValue, { color: '#059669' }]}>85%</Text>
            <View style={styles.statLabelRow}>
              <Text style={styles.statLabel}>Success Rate</Text>
              <Text style={[styles.statChange, { color: '#059669' }]}>↑ +5%</Text>
            </View>
            <Text style={styles.statSubLabel}>Goal achievement</Text>
          </View>
          <View style={styles.verticalDivider} />
          <View style={[styles.statCardImproved, styles.statCardConsistency]}> 
            <View style={{ backgroundColor: '#60a5fa' }} />
            <Text style={[styles.statValue, { color: '#2563eb' }]}>78%</Text>
            <View style={styles.statLabelRow}>
              <Text style={styles.statLabel}>Consistency</Text>
              <Text style={[styles.statChange, { color: '#2563eb' }]}>↑ +3%</Text>
            </View>
            <Text style={styles.statSubLabel}>Daily adherence</Text>
          </View>
        </View>
      </View>

      <AnimatedCounters />
      <ProgressRings />
      <WeeklyProgressChart />
      <GoalsCard />
      <QuickActions />
      
      {/* AI Insights */}
      <View style={styles.insightsSection}>
        <Text style={styles.sectionTitle}>AI Insights</Text>
        {mockInsights.map((insight) => (
          <View key={insight.id} style={styles.insightCard}>
            <InsightCard
              insight={insight}
              onActionPress={() => console.log(`Action: ${insight.actionText}`)}
            />
          </View>
        ))}
      </View>
      
      <RecentActivity />
      <RecommendationsCard />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  bg: { flex: 1, backgroundColor: '#f3f4f6' },
  container: {
    padding: 16,
    gap: 18,
    paddingBottom: 32,
  },
  periodRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 12,
    gap: 8,
  },
  periodBtn: {
    paddingVertical: 7,
    paddingHorizontal: 18,
    borderRadius: 18,
    backgroundColor: '#e0e7ef',
  },
  periodBtnActive: {
    backgroundColor: '#6366f1',
  },
  periodText: {
    color: '#334155',
    fontWeight: '600',
    fontSize: 15,
  },
  periodTextActive: {
    color: '#fff',
  },
  quickStatsCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 18,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  statsGridImproved: {
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'space-between',
    gap: 0,
  },
  statCardImproved: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
  },
  verticalDivider: {
    width: 1,
    backgroundColor: '#e5e7eb',
    marginHorizontal: 8,
    borderRadius: 1,
  },
  statsSection: {
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#334155',
    marginBottom: 12,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  statCard: {
    flex: 1,
  },
  insightsSection: {
    marginBottom: 8,
  },
  insightCard: {
    marginBottom: 8,
  },
  statValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#334155',
    textAlign: 'center',
    marginBottom: 2,
  },
  statLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 2,
    gap: 6,
  },
  statLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: '#22223b',
  },
  statChange: {
    fontSize: 14,
    color: '#10b981',
    fontWeight: '700',
    marginLeft: 4,
  },
  statSubLabel: {
    fontSize: 13,
    color: '#94a3b8',
    textAlign: 'center',
    marginTop: 2,
  },
  statCardSuccess: {
    backgroundColor: '#ecfdf5', // light green
    borderRadius: 14,
    margin: 2,
    shadowColor: '#34d399',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 1,
    position: 'relative',
  },
  statCardConsistency: {
    backgroundColor: '#eff6ff', // light blue
    borderRadius: 14,
    margin: 2,
    shadowColor: '#60a5fa',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 1,
    position: 'relative',
  },
  // statAccentBar: {
  //   height: "110%",
  //   width: 4,
  //   borderTopLeftRadius: 14,
  //   borderTopRightRadius: 14,
  //   marginBottom: 8,
  //   position: 'absolute',
  //   top: 0,
  //   left: 0,
  //   right: 0,
  //   bottom: 0,
  // },
});

export default AnalyticsDashboard; 