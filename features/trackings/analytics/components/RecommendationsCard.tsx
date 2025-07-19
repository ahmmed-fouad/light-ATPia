
import { View, Text, StyleSheet } from 'react-native';
import { useAnalyticsStore } from '../stores/analyticsStore';

const RecommendationsCard = () => {
  const recs = useAnalyticsStore(s => s.recommendations);
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Recommendations</Text>
      <View style={styles.pillsRow}>
        {recs.map((r, i) => (
          <View key={i} style={styles.pill}>
            <Text style={styles.pillText}>{r.text}</Text>
          </View>
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
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#334155',
    marginBottom: 8,
  },
  pillsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    justifyContent: 'center',
  },
  pill: {
    backgroundColor: '#e0e7ff',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 6,
    marginBottom: 4,
  },
  pillText: {
    color: '#334155',
    fontWeight: '700',
    fontSize: 14,
  },
});

export default RecommendationsCard; 