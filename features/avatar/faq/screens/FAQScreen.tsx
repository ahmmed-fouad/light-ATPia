import React from 'react';
import { View, Text, ScrollView, StyleSheet, SafeAreaView } from 'react-native';
import FAQAccordion from '../components/FAQAccordion';
import FAQChart from '../components/FAQChart';
import FAQContactForm from '../components/FAQContactForm';
import { ScrollAwareView } from '@/components';

const FAQScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.root}>
      <ScrollAwareView
        // contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <ScrollView contentContainerStyle={{ paddingBottom: 32 }} showsVerticalScrollIndicator={false}>
          <Text style={styles.pageHeader}>FAQ & Support</Text>
          <FAQAccordion />
          <FAQChart />
          <FAQContactForm />
        </ScrollView>
      </ScrollAwareView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
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