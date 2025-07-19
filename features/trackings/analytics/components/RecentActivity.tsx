
import { View, Text, StyleSheet } from 'react-native';
import { useAnalyticsStore } from '../stores/analyticsStore';

const RecentActivity = () => {
  const feed = useAnalyticsStore(s => s.activityFeed);
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Recent Activity</Text>
      {feed.map((a, i) => (
        <View key={i} style={styles.row}>
          <Text style={styles.dot}>•</Text>
          <Text style={styles.desc}>{a.desc}</Text>
          <Text style={styles.time}>{a.time}</Text>
        </View>
      ))}
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
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
    gap: 6,
  },
  dot: {
    color: '#6366f1',
    fontSize: 18,
    marginRight: 2,
  },
  desc: {
    fontSize: 14,
    color: '#334155',
    flex: 1,
  },
  time: {
    fontSize: 12,
    color: '#94a3b8',
    marginLeft: 8,
  },
});

export default RecentActivity; 