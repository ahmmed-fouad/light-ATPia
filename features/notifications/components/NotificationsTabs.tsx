import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNotificationsStore } from '../stores/notificationsStore';

const tabOptions = [
  { key: 'all', label: 'All' },
  { key: 'current', label: 'Current' },
  { key: 'old', label: 'Old' },
];

const NotificationsTabs = () => {
  const tab = useNotificationsStore(s => s.tab);
  const setTab = useNotificationsStore(s => s.setTab);

  return (
    <View style={styles.tabsBg}>
      <View style={styles.tabsRow}>
        {tabOptions.map(t => (
          <TouchableOpacity
            key={t.key}
            style={[styles.tabBtn, tab === t.key && styles.tabBtnActive]}
            onPress={() => setTab(t.key as any)}
            activeOpacity={0.85}
          >
            <Text style={[styles.tab, tab === t.key && styles.tabActive]}>{t.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tabsBg: {
    backgroundColor: '#e0e7ff',
    borderRadius: 16,
    padding: 6,
    marginHorizontal: 2,
    marginBottom: 2,
  },
  tabsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 8,
  },
  tabBtn: {
    flex: 1,
    paddingVertical: 10,
    marginHorizontal: 2,
    borderRadius: 16,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: 'transparent',
  },
  tabBtnActive: {
    backgroundColor: '#6366f1',
    shadowColor: '#6366f1',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 2,
  },
  tab: {
    fontSize: 15,
    fontWeight: '700',
    color: '#64748b',
    letterSpacing: 0.1,
  },
  tabActive: {
    color: '#fff',
    fontWeight: '800',
  },
});

export default NotificationsTabs; 