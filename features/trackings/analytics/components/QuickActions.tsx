
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Plus, Droplet, Footprints } from 'lucide-react-native';

const QuickActions = () => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Quick Actions</Text>
      <View style={styles.row}>
        <TouchableOpacity style={[styles.btn, styles.btnPrimary]}>
          <Plus size={16} color="#fff" />
          <Text style={styles.btnText}>Log Meal</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.btn, styles.btnAccent]}>
          <Droplet size={16} color="#fff" />
          <Text style={styles.btnText}>Add Water</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.btn, styles.btnSecondary]}>
          <Footprints size={16} color="#1e293b" />
          <Text style={[styles.btnText, { color: '#1e293b' }]}>Add Steps</Text>
        </TouchableOpacity>
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
    gap: 10,
    justifyContent: 'space-between',
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 14,
    gap: 6,
  },
  btnPrimary: {
    backgroundColor: '#34d399',
  },
  btnAccent: {
    backgroundColor: '#60a5fa',
  },
  btnSecondary: {
    backgroundColor: '#fbbf24',
  },
  btnText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 15,
  },
});

export default QuickActions; 