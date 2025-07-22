import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import FAQAccordion from '../components/FAQAccordion';
import FAQChart from '../components/FAQChart';
import FAQContactForm from '../components/FAQContactForm';
import { ScrollAwareView } from '@/components';
import { SafeAreaView } from 'react-native-safe-area-context';

const FAQScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.root}>
      <ScrollAwareView
        showsVerticalScrollIndicator={false}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.pageHeader}>FAQ & Support</Text>
          <FAQChart />
          <FAQAccordion />
          <FAQContactForm />
        </ScrollView>
      </ScrollAwareView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingTop: -36,
  },
  container: {
    padding: 16,
    backgroundColor: "#fff",
    flexGrow: 1,
  },
  pageHeader: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#25443f",
    // stroke: "#18b888",
    marginBottom: 18,
    paddingTop: 110,
    textAlign: "center",
    marginTop: 8,
  },
});

export default FAQScreen; 