import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { formFields } from '../data/faqData';

const initialForm = { name: '', email: '', subject: '', message: '' };

const FAQContactForm: React.FC = () => {
  const [form, setForm] = useState(initialForm);
  const [sent, setSent] = useState(false);

  const handleChange = (name: string, value: string) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    // Simple validation
    if (!form.name || !form.email || !form.subject || !form.message) {
      Alert.alert('Please fill in all fields.');
      return;
    }
    setSent(true);
    setForm(initialForm);
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Contact Support</Text>
      <Text style={styles.subtitle}>Fill out the form below and our team will get back to you soon.</Text>
      <View style={styles.form}>
        {formFields.map((field) =>
          field.type === 'textarea' ? (
            <TextInput
              key={field.name}
              style={[styles.input, styles.textarea]}
              placeholder={field.placeholder}
              value={form[field.name]}
              onChangeText={(text) => handleChange(field.name, text)}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
              required={field.required}
            />
          ) : (
            <TextInput
              key={field.name}
              style={styles.input}
              placeholder={field.placeholder}
              value={form[field.name]}
              onChangeText={(text) => handleChange(field.name, text)}
              keyboardType={field.type === 'email' ? 'email-address' : 'default'}
              autoCapitalize={field.name === 'email' ? 'none' : 'sentences'}
              required={field.required}
            />
          )
        )}
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Send</Text>
        </TouchableOpacity>
        {sent && <Text style={styles.success}>Message sent successfully!</Text>}
      </View>
      <Text style={styles.supportHours}>
        Support available at{' '}
        <Text style={styles.email} onPress={() => {}}>
          support@nutrimind.com
        </Text>
      </Text>
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
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 12,
    textAlign: 'center',
  },
  form: {
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#f8fafc',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 15,
    color: '#334155',
    marginBottom: 10,
  },
  textarea: {
    minHeight: 80,
  },
  button: {
    backgroundColor: '#6366f1',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 4,
    marginBottom: 4,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  success: {
    color: '#22c55e',
    textAlign: 'center',
    marginTop: 6,
    fontSize: 15,
  },
  supportHours: {
    color: '#94a3b8',
    fontSize: 13,
    textAlign: 'center',
    marginTop: 10,
  },
  email: {
    color: '#6366f1',
    textDecorationLine: 'underline',
  },
});

export default FAQContactForm; 