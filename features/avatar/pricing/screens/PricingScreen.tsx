import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import Header from '../components/Header';
import PlansGrid from '../components/PlansGrid';
import SelectPlanButton from '../components/SelectPlanButton';

const PricingScreen: React.FC = () => {
  const handleSelectPlan = () => {
    // TODO: Implement plan selection logic or navigation
  };

  return (
    <SafeAreaView style={styles.root}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <Header />
        <PlansGrid />
        <SelectPlanButton onPress={handleSelectPlan} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    paddingHorizontal: 18,
    paddingTop: 8,
    paddingBottom: 24,
    flexGrow: 1,
    justifyContent: 'flex-start',
  },
});

export default PricingScreen; 