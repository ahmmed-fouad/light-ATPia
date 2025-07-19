import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import FAQAccordion from '../components/FAQAccordion';
import FAQChart from '../components/FAQChart';
import FAQContactForm from '../components/FAQContactForm';

const FAQScreen: React.FC = () => {
  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.pageHeader}>FAQ & Support</Text>
      <FAQAccordion />
      <FAQChart />
      <FAQContactForm />
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

export default FAQScreen; 