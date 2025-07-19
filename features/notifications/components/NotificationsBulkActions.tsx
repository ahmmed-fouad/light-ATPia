
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNotificationsStore } from '../stores/notificationsStore';

const NotificationsBulkActions = () => {
  const markAllRead = useNotificationsStore(s => s.markAllRead);
  const deleteAll = useNotificationsStore(s => s.deleteAll);
  const markSelectedRead = useNotificationsStore(s => s.markSelectedRead);
  const deleteSelected = useNotificationsStore(s => s.deleteSelected);
  const selected = useNotificationsStore(s => s.selected);

  return (
    <View style={styles.actionsRow}>
      <TouchableOpacity style={styles.actionBtn} onPress={markAllRead}>
        <Text style={styles.actionText}>Mark all read</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.actionBtn} onPress={deleteAll}>
        <Text style={styles.actionText}>Delete all</Text>
      </TouchableOpacity>
      {selected.length > 0 && (
        <TouchableOpacity style={styles.actionBtn} onPress={markSelectedRead}>
          <Text style={styles.actionText}>Mark selected read</Text>
        </TouchableOpacity>
      )}
      {selected.length > 0 && (
        <TouchableOpacity style={styles.actionBtn} onPress={deleteSelected}>
          <Text style={styles.actionText}>Delete selected</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  actionsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, justifyContent: 'space-between', paddingVertical: 8 },
  actionBtn: { backgroundColor: '#e0e7ff', borderRadius: 8, paddingHorizontal: 10, paddingVertical: 6, margin: 2 },
  actionText: { fontSize: 14, fontWeight: '600', color: '#2563eb' },
});

export default NotificationsBulkActions; 