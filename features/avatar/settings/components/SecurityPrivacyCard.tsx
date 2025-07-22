import React from 'react';
import { View, Text, StyleSheet, Switch, FlatList } from 'react-native';
import { useSettingsStore } from '../stores/settingsStore';
import { Monitor } from 'lucide-react-native';

const SecurityPrivacyCard = () => {
  const twoFA = useSettingsStore(s => s.twoFA);
  const setTwoFA = useSettingsStore(s => s.setTwoFA);
  const recentLogins = useSettingsStore(s => s.recentLogins);

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Security & Privacy</Text>
      {/* 2FA Toggle */}
      <View style={styles.row}>
        <Text style={styles.label}>2FA:</Text>
        <Switch
          value={twoFA}
          onValueChange={setTwoFA}
          trackColor={{ false: '#e5e7eb', true: '#22c55e' }}
          thumbColor={twoFA ? '#22c55e' : '#f3f4f6'}
        />
        <Text style={[styles.status, { color: twoFA ? '#22c55e' : '#64748b' }]}>{twoFA ? 'Enabled' : 'Disabled'}</Text>
      </View>
      {/* Recent Logins */}
      <Text style={styles.sectionTitle}>Recent Logins</Text>
      <FlatList
        data={recentLogins}
        keyExtractor={(_, i) => i.toString()}
        renderItem={({ item }) => (
          <View style={styles.loginRow}>
            <Monitor size={18} color="#6366f1" style={{ marginRight: 8 }} />
            <View style={{ flex: 1 }}>
              <Text style={styles.loginDevice}>{item.device}</Text>
              <Text style={styles.loginMeta}>{item.location} • {item.date}</Text>
            </View>
          </View>
        )}
        style={styles.loginsList}
        contentContainerStyle={{ paddingBottom: 2 }}
        scrollEnabled={false}
      />
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
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    gap: 8,
  },
  label: {
    fontSize: 15,
    color: '#64748b',
    fontWeight: '600',
    width: 60,
  },
  status: {
    fontSize: 14,
    fontWeight: '700',
    marginLeft: 10,
  },
  sectionTitle: {
    fontSize: 15,
    color: '#334155',
    fontWeight: '700',
    marginTop: 8,
    marginBottom: 4,
  },
  loginsList: {
    marginTop: 2,
  },
  loginRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 10,
    marginBottom: 6,
  },
  loginDevice: {
    fontSize: 14,
    color: '#334155',
    fontWeight: '600',
  },
  loginMeta: {
    fontSize: 12,
    color: '#64748b',
  },
});

export default SecurityPrivacyCard; 