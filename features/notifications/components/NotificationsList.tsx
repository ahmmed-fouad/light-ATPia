import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useNotificationsStore } from '../stores/notificationsStore';
import { notificationTypes } from '../data/notificationTypes';
import { typeColors } from '../data/typeColors';
import { Bell, CheckCircle, MessageCircle, Flame, Droplet, Star, Trash2 } from 'lucide-react-native';

const iconMap = {
  CheckCircle: <CheckCircle size={22} color={typeColors.success} />,
  MessageCircle: <MessageCircle size={22} color={typeColors.message} />,
  Flame: <Flame size={22} color={typeColors.activity} />,
  Droplet: <Droplet size={22} color={typeColors.hydration} />,
  Star: <Star size={22} color={typeColors.achievement} />,
};

function getTypeIcon(type: string) {
  const found = notificationTypes.find(t => t.type === type);
  if (found && found.icon && iconMap[found.icon as keyof typeof iconMap]) {
    return iconMap[found.icon as keyof typeof iconMap];
  }
  return <Bell size={22} color="#64748b" />;
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

interface NotificationsListProps {
  ListHeaderComponent?: React.ReactElement | null;
}

const NotificationsList: React.FC<NotificationsListProps> = ({ ListHeaderComponent }) => {
  const notifications = useNotificationsStore(s => s.notifications);
  const selected = useNotificationsStore(s => s.selected);
  const toggleSelect = useNotificationsStore(s => s.toggleSelect);
  const markRead = useNotificationsStore(s => s.markRead);
  const markUnread = useNotificationsStore(s => s.markUnread);
  const deleteNotification = useNotificationsStore(s => s.deleteNotification);
  const tab = useNotificationsStore(s => s.tab);

  // Filter notifications by tab
  const filtered =
    tab === 'all'
      ? notifications
      : tab === 'current'
      ? notifications.filter(n => n.unread)
      : notifications.filter(n => !n.unread);

  return (
    <FlatList
      data={filtered}
      keyExtractor={item => item.id.toString()}
      renderItem={({ item }) => {
        const isSelected = selected.includes(item.id);
        return (
          <View style={styles.itemWrapper}>
            <TouchableOpacity
              style={[styles.item, isSelected && styles.itemSelected]}
              onPress={() => toggleSelect(item.id)}
              activeOpacity={0.85}
            >
              <View style={styles.iconCircle}>{getTypeIcon(item.type)}</View>
              <View style={{ flex: 1 }}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.desc} numberOfLines={2}>{item.description}</Text>
                <Text style={styles.time}>{timeAgo(item.date)}</Text>
              </View>
              {item.unread && <View style={styles.unreadDot} />}
              <View style={styles.actionsCol}>
                {item.unread ? (
                  <TouchableOpacity onPress={() => markRead(item.id)} style={[styles.actionBtn, styles.actionBtnRead]}>
                    <Text style={[styles.actionText, styles.actionTextRead]}>Mark read</Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity onPress={() => markUnread(item.id)} style={[styles.actionBtn, styles.actionBtnUnread]}>
                    <Text style={[styles.actionText, styles.actionTextUnread]}>Mark unread</Text>
                  </TouchableOpacity>
                )}
                <TouchableOpacity onPress={() => deleteNotification(item.id)} style={[styles.actionBtn, styles.actionBtnDelete]}>
                  <Trash2 size={16} color="#fff" />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
            <View style={styles.divider} />
          </View>
        );
      }}
      contentContainerStyle={styles.list}
      ListEmptyComponent={<Text style={styles.emptyText}>No notifications</Text>}
      ListHeaderComponent={ListHeaderComponent}
    />
  );
};

const styles = StyleSheet.create({
  list: { gap: 0, paddingVertical: 8 },
  itemWrapper: {
    marginBottom: 10,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  itemSelected: {
    borderWidth: 2,
    borderColor: '#6366f1',
    backgroundColor: '#e0e7ff',
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  title: { fontSize: 16, fontWeight: '800', color: '#334155', marginBottom: 2 },
  desc: { fontSize: 13, color: '#64748b', marginTop: 0, marginBottom: 2 },
  time: { fontSize: 12, color: '#94a3b8', marginTop: 0 },
  unreadDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#22c55e',
    marginLeft: 8,
  },
  actionsCol: {
    flexDirection: 'column',
    alignItems: 'flex-end',
    marginLeft: 10,
    gap: 6,
  },
  actionBtn: {
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginBottom: 2,
    flexDirection: 'row',
    alignItems: 'center',
    minWidth: 70,
    justifyContent: 'center',
  },
  actionBtnRead: {
    backgroundColor: '#e0e7ff',
  },
  actionBtnUnread: {
    backgroundColor: '#f1f5f9',
  },
  actionBtnDelete: {
    backgroundColor: '#ef4444',
    marginTop: 2,
  },
  actionText: { fontSize: 13, fontWeight: '700', marginRight: 2 },
  actionTextRead: { color: '#2563eb' },
  actionTextUnread: { color: '#6366f1' },
  emptyText: { color: '#94a3b8', fontSize: 15, textAlign: 'center', marginTop: 40 },
  divider: {
    height: 10,
    backgroundColor: 'transparent',
  },
});

export default NotificationsList; 