import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { useSettingsStore } from '../stores/settingsStore';
import { FileText } from 'lucide-react-native';

const APP_VERSION = '1.0.0'; // Placeholder, replace with real version if needed

const AppInfoCard = () => {
  const legalLinks = useSettingsStore(s => s.legalLinks);

  const openLink = (url: string) => {
    Linking.openURL(url).catch(() => alert('Could not open link.'));
  };

  return (
    <View style={styles.card}>
      <Text style={styles.title}>App Info & Legal</Text>
      <Text style={styles.version}>Version: {APP_VERSION}</Text>
      <View style={styles.linksList}>
        {legalLinks.map(link => (
          <TouchableOpacity key={link.url} style={styles.linkRow} onPress={() => openLink(link.url)}>
            <FileText size={18} color="#6366f1" style={{ marginRight: 8 }} />
            <Text style={styles.linkText}>{link.label}</Text>
          </TouchableOpacity>
        ))}
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
    marginBottom: 8,
  },
  version: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 10,
  },
  linksList: {
    gap: 8,
  },
  linkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  linkText: {
    fontSize: 15,
    color: '#6366f1',
    fontWeight: '700',
  },
});

export default AppInfoCard; 