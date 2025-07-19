
import { View, Text, StyleSheet } from 'react-native';
import { useAnalyticsStore } from '../stores/analyticsStore';

const ProgressRings = () => {
  const rings = useAnalyticsStore(s => s.progressRings);
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Daily Progress</Text>
      <View style={styles.row}>
        {rings.map((r, i) => (
          <View key={i} style={styles.ringBox}>
            <View style={[styles.ring, { borderColor: r.color }]}>
              <Text style={[styles.percent, { color: r.color }]}>{Math.round((r.value / r.goal) * 100)}%</Text>
            </View>
            <Text style={styles.label}>{r.label}</Text>
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
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#334155',
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    gap: 16,
    justifyContent: 'center',
  },
  ringBox: {
    alignItems: 'center',
  },
  ring: {
    width: 54,
    height: 54,
    borderRadius: 27,
    borderWidth: 6,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  percent: {
    fontSize: 15,
    fontWeight: '700',
  },
  label: {
    fontSize: 13,
    color: '#64748b',
    fontWeight: '600',
  },
});

export default ProgressRings; 