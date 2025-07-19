import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Pressable, Switch } from 'react-native';
import { useSettingsStore } from '../stores/settingsStore';
import { preferenceOptions, notificationTypes } from '../data/settingsData';

const PreferencesCard = () => {
  const preferences = useSettingsStore(s => s.preferences);
  const setPreferences = useSettingsStore(s => s.setPreferences);
  const [langModal, setLangModal] = useState(false);

  // Theme picker
  const setTheme = (theme: 'auto' | 'light' | 'dark') => {
    setPreferences({ theme });
  };

  // Language picker
  const setLanguage = (language: string) => {
    setPreferences({ language });
    setLangModal(false);
  };

  // Notification toggles
  const toggleNotif = (key: 'email' | 'push' | 'inApp') => {
    setPreferences({ notifications: { ...preferences.notifications, [key]: !preferences.notifications[key] } });
  };

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Preferences</Text>
      {/* Theme Picker */}
      <View style={styles.sectionRow}>
        <Text style={styles.label}>Theme:</Text>
        <View style={styles.pillRow}>
          {preferenceOptions.theme.map(opt => (
            <TouchableOpacity
              key={opt.key}
              style={[styles.pill, preferences.theme === opt.key && styles.pillActive]}
              onPress={() => setTheme(opt.key as any)}
            >
              <Text style={[styles.pillText, preferences.theme === opt.key && styles.pillTextActive]}>{opt.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      {/* Language Picker */}
      <View style={styles.sectionRow}>
        <Text style={styles.label}>Language:</Text>
        <TouchableOpacity style={styles.langBtn} onPress={() => setLangModal(true)}>
          <Text style={styles.langText}>{preferenceOptions.language.find(l => l.key === preferences.language)?.label || 'Select'}</Text>
        </TouchableOpacity>
        <Modal visible={langModal} transparent animationType="fade" onRequestClose={() => setLangModal(false)}>
          <Pressable style={styles.modalOverlay} onPress={() => setLangModal(false)}>
            <View style={styles.modalBox}>
              {preferenceOptions.language.map(opt => (
                <TouchableOpacity key={opt.key} style={styles.modalItem} onPress={() => setLanguage(opt.key)}>
                  <Text style={styles.modalText}>{opt.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </Pressable>
        </Modal>
      </View>
      {/* Notification Toggles */}
      <View style={styles.sectionRow}>
        <Text style={styles.label}>Notifications:</Text>
        <View style={styles.notifToggles}>
          {notificationTypes.map(opt => (
            <View key={opt.key} style={styles.notifRow}>
              <Text style={styles.notifLabel}>{opt.label}</Text>
              <Switch
                value={preferences.notifications[opt.key as keyof typeof preferences.notifications]}
                onValueChange={() => toggleNotif(opt.key as any)}
                trackColor={{ false: '#e5e7eb', true: '#6366f1' }}
                thumbColor={preferences.notifications[opt.key as keyof typeof preferences.notifications] ? '#6366f1' : '#f3f4f6'}
              />
            </View>
          ))}
        </View>
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
    marginBottom: 12,
  },
  sectionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 8,
  },
  label: {
    fontSize: 15,
    color: '#64748b',
    fontWeight: '600',
    width: 90,
  },
  pillRow: {
    flexDirection: 'row',
    gap: 8,
    flex: 1,
  },
  pill: {
    backgroundColor: '#f3f4f6',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 7,
    marginRight: 6,
  },
  pillActive: {
    backgroundColor: '#6366f1',
  },
  pillText: {
    color: '#334155',
    fontWeight: '700',
    fontSize: 15,
  },
  pillTextActive: {
    color: '#fff',
  },
  langBtn: {
    backgroundColor: '#f3f4f6',
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 7,
    marginLeft: 4,
  },
  langText: {
    color: '#334155',
    fontWeight: '700',
    fontSize: 15,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.18)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 18,
    minWidth: 180,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  modalItem: {
    paddingVertical: 10,
    paddingHorizontal: 8,
  },
  modalText: {
    fontSize: 16,
    color: '#334155',
    fontWeight: '600',
  },
  notifToggles: {
    flex: 1,
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'flex-end',
  },
  notifRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginRight: 8,
  },
  notifLabel: {
    fontSize: 14,
    color: '#64748b',
    marginRight: 2,
  },
});

export default PreferencesCard; 