import React from 'react';
import { View, Text, ScrollView, StyleSheet, SafeAreaView } from 'react-native';
import PlansGrid from '../components/PlansGrid';
import PlansRadarChart from '../components/PlansRadarChart';
import PlansFAQ from '../components/PlansFAQ';
import { ScrollAwareView } from '@/components';

const PricingScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.root}>
      <ScrollAwareView
        showsVerticalScrollIndicator={false}
      >
    <ScrollView showsVerticalScrollIndicator={false}>
      <Text style={styles.pageHeader}>Plans & Pricing</Text>
      <PlansGrid />
      <PlansRadarChart />
      <PlansFAQ />
    </ScrollView>
    </ScrollAwareView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
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