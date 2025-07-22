import React, { useState } from 'react';
import { View, Text, TouchableOpacity, LayoutAnimation, Platform, UIManager, StyleSheet } from 'react-native';
import { faqs } from '../data/faqData';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const FAQAccordion: React.FC = () => {
  const [open, setOpen] = useState<number | null>(null);

  const handlePress = (idx: number) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setOpen(open === idx ? null : idx);
  };

  return (
    <View style={{ marginBottom: 24 }}>
      <Text style={styles.header}>Frequently Asked Questions</Text>
      {faqs.map((faq, i) => (
        <View key={i} style={styles.card}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handlePress(i)}
            activeOpacity={0.8}
          >
            <Text style={styles.question}>{faq.q}</Text>
            <Text style={[styles.chevron, open === i && styles.chevronOpen]}>▼</Text>
          </TouchableOpacity>
          {open === i && (
            <View style={styles.answerContainer}>
              <Text style={styles.answer}>{faq.a}</Text>
            </View>
          )}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#6366f1',
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  question: {
    fontSize: 16,
    fontWeight: '600',
    color: '#334155',
    flex: 1,
  },
  chevron: {
    fontSize: 18,
    color: '#64748b',
    marginLeft: 12,
    transform: [{ rotate: '0deg' }],
  },
  chevronOpen: {
    transform: [{ rotate: '180deg' }],
  },
  answerContainer: {
    paddingHorizontal: 16,
    paddingBottom: 14,
  },
  answer: {
    fontSize: 15,
    color: '#64748b',
    marginTop: 2,
  },
});

export default FAQAccordion; 