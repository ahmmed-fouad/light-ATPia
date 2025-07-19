
import { View, Text, TouchableOpacity, Modal, StyleSheet, Platform, FlatList } from 'react-native';
import { useNotificationsStore } from '../stores/notificationsStore';
import { notificationTypes } from '../data/notificationTypes';
import { typeColors } from '../data/typeColors';
import { Bell, CheckCircle, MessageCircle, Flame, Droplet, Star, Trash2, ArrowRight } from 'lucide-react-native';
import { useRouter } from 'expo-router';

const iconMap = {
  CheckCircle: <CheckCircle size={20} color={typeColors.success} />,
  MessageCircle: <MessageCircle size={20} color={typeColors.message} />,
  Flame: <Flame size={20} color={typeColors.activity} />,
  Droplet: <Droplet size={20} color={typeColors.hydration} />,
  Star: <Star size={20} color={typeColors.achievement} />,
};

function getTypeIcon(type: string) {
  const found = notificationTypes.find(t => t.type === type);
  if (found && found.icon && iconMap[found.icon as keyof typeof iconMap]) {
    return iconMap[found.icon as keyof typeof iconMap];
  }
  return <Bell size={20} color="#64748b" />;
}

function timeAgo(dateStr: string) {
  const date = new Date(dateStr);
  const now = new Date();
  const diff = Math.floor((now.getTime() - date.getTime()) / 1000);
  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

export const NotificationsDropdown = ({ isVisible, onClose }: { isVisible: boolean, onClose: () => void }) => {
  const router = useRouter();
  const notifications = useNotificationsStore(s => s.notifications);
  const markAllRead = useNotificationsStore(s => s.markAllRead);
  const deleteAll = useNotificationsStore(s => s.deleteAll);

  return (
    <Modal
      transparent
      visible={isVisible}
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableOpacity
        style={styles.overlay}
        activeOpacity={1}
        onPress={onClose}
      >
        <View style={styles.dropdown}>
          <Text style={styles.header}>Notifications</Text>
          {notifications.length === 0 ? (
            <View style={styles.emptyBox}>
              <Text style={styles.emptyText}>No notifications</Text>
            </View>
          ) : (
            <FlatList
              data={notifications.slice(0, 5)}
              keyExtractor={item => item.id.toString()}
              renderItem={({ item }) => (
                <View style={styles.notifRow}>
                  <View style={styles.iconCircle}>{getTypeIcon(item.type)}</View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.notifTitle} numberOfLines={1}>{item.title}</Text>
                    <Text style={styles.notifTime}>{timeAgo(item.date)}</Text>
                  </View>
                  {item.unread && <View style={styles.unreadDot} />}
                </View>
              )}
              style={{ maxHeight: 260 }}
              showsVerticalScrollIndicator={false}
            />
          )}
          <View style={styles.actionsRow}>
            <TouchableOpacity style={styles.actionBtn} onPress={markAllRead}>
              <CheckCircle size={18} color="#22c55e" />
              <Text style={styles.actionText}>Mark all read</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionBtn} onPress={deleteAll}>
              <Trash2 size={18} color="#ef4444" />
              <Text style={styles.actionText}>Delete all</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity 
            style={styles.seeMoreBtn} 
            onPress={() => {
              onClose();
              router.push('/(main)/notifications');
            }}
          >
            <Text style={styles.seeMoreText}>See more</Text>
            <ArrowRight size={16} color="#3b82f6" />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.18)',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },
  dropdown: {
    marginTop: Platform.OS === 'ios' ? 70 : 140,
    marginRight: 100,
    width: 320,
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 12,
  },
  header: {
    fontSize: 18,
    fontWeight: '700',
    color: '#334155',
    marginBottom: 10,
  },
  notifRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  notifTitle: {
    fontSize: 15,
    color: '#334155',
    fontWeight: '600',
  },
  notifTime: {
    fontSize: 12,
    color: '#94a3b8',
  },
  unreadDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#22c55e',
    marginLeft: 8,
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 14,
    marginHorizontal: 2,
  },
  actionText: {
    fontSize: 14,
    color: '#334155',
    fontWeight: '600',
    marginLeft: 6,
  },
  emptyBox: {
    alignItems: 'center',
    paddingVertical: 30,
  },
  emptyText: {
    color: '#94a3b8',
    fontSize: 15,
  },
  seeMoreBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f9ff',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginTop: 12,
    borderWidth: 1,
    borderColor: '#dbeafe',
  },
  seeMoreText: {
    fontSize: 15,
    color: '#3b82f6',
    fontWeight: '600',
    marginRight: 8,
  },
}); 