import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { planFaqs } from '../data/pricingData';

const PlansFAQ: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Frequently Asked</Text>
      {planFaqs.map((faq, i) => (
        <View key={i} style={styles.card}>
          <Text style={styles.question}>{faq.q}</Text>
          <Text style={styles.answer}>{faq.a}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#6366f1',
    marginBottom: 12,
    textAlign: 'center',
  },
  card: {
    marginBottom: 16,
  },
  question: {
    fontWeight: '600',
    color: '#334155',
    fontSize: 16,
    marginBottom: 2,
  },
  answer: {
    color: '#64748b',
    fontSize: 15,
    marginBottom: 2,
  },
});

export default PlansFAQ; 