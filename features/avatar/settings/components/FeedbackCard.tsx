import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useSettingsStore } from '../stores/settingsStore';

const MAX_LENGTH = 500;

const FeedbackCard = () => {
  const feedback = useSettingsStore(s => s.feedback);
  const setFeedback = useSettingsStore(s => s.setFeedback);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = () => {
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      Alert.alert('Thank you!', 'Your feedback has been submitted.');
      setFeedback('');
    }, 800);
  };

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Feedback</Text>
      <TextInput
        style={styles.input}
        value={feedback}
        onChangeText={t => t.length <= MAX_LENGTH && setFeedback(t)}
        placeholder="Let us know your thoughts..."
        multiline
        numberOfLines={4}
        maxLength={MAX_LENGTH}
        editable={!submitting}
        textAlignVertical="top"
      />
      <View style={styles.row}>
        <Text style={styles.count}>{feedback.length}/{MAX_LENGTH}</Text>
        <TouchableOpacity
          style={[styles.submitBtn, submitting && { opacity: 0.6 }]}
          onPress={handleSubmit}
          disabled={submitting || feedback.trim().length === 0}
        >
          <Text style={styles.submitText}>{submitting ? 'Submitting...' : 'Submit'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#334155',
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#f3f4f6',
    borderRadius: 10,
    padding: 12,
    fontSize: 15,
    color: '#334155',
    minHeight: 80,
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  count: {
    fontSize: 13,
    color: '#64748b',
  },
  submitBtn: {
    backgroundColor: '#18b888',
    borderRadius: 8,
    paddingHorizontal: 18,
    paddingVertical: 8,
  },
  submitText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 15,
  },
});

export default FeedbackCard; 