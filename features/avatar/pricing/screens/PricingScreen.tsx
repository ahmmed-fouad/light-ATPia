import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import PlansGrid from '../components/PlansGrid';
import PlansRadarChart from '../components/PlansRadarChart';
import PlansFAQ from '../components/PlansFAQ';

const PricingScreen: React.FC = () => {
  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.pageHeader}>Plans & Pricing</Text>
      <PlansGrid />
      <PlansRadarChart />
      <PlansFAQ />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f1f5f9',
    flexGrow: 1,
  },
  pageHeader: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#334155',
    marginBottom: 18,
    textAlign: 'center',
    marginTop: 8,
  },
});

export default PricingScreen; 