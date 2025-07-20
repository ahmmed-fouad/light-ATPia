import { View, Text, StyleSheet} from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { useNotificationsStore } from '../stores/notificationsStore';
import { notificationTypes } from '../data/notificationTypes';
import { typeColors } from '../data/typeColors';

const NotificationsHeader = () => {
  const notifications = useNotificationsStore(s => s.notifications);

  const chartData = notificationTypes.map(t => ({
    name: t.label,
    count: notifications.filter(n => n.type === t.type).length,
    color: typeColors[t.type],
    legendFontColor: '#334155',
    legendFontSize: 12,
    key: t.type,
  })).filter(d => d.count > 0);

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Notifications Summary</Text>
      <View style={styles.chartsRow}>
        <View style={styles.chartBox}>
          {chartData.length > 0 ? (
            <PieChart
              data={chartData.map(d => ({
                name: d.name,
                population: d.count,
                color: d.color,
                legendFontColor: d.legendFontColor,
                legendFontSize: d.legendFontSize,
              }))}
              width={270}
              height={130}
              chartConfig={pieChartConfig}
              accessor="population"
              backgroundColor="transparent"
              paddingLeft={"20"}
              hasLegend={true}
              center={[-13, 2]}
            />
          ) : (
            <Text style={styles.emptyText}>No Data</Text>
          )}
          <Text style={styles.chartLabel}>Pie Chart</Text>
        </View>
      </View>
      <View style={styles.divider} />
    </View>
  );
};

const pieChartConfig = {
  color: (opacity = 1) => `rgba(99, 102, 241, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(51, 65, 85, ${opacity})`,
  backgroundColor: 'transparent',
  backgroundGradientFrom: '#fff',
  backgroundGradientTo: '#fff',
  decimalPlaces: 0,
};

const barChartConfig = {
  backgroundGradientFrom: '#fff',
  backgroundGradientTo: '#fff',
  color: (opacity = 1) => `rgba(99, 102, 241, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(51, 65, 85, ${opacity})`,
  fillShadowGradient: '#6366f1',
  fillShadowGradientOpacity: 1,
  decimalPlaces: 0,
  barPercentage: 0.7,
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 16,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 8,
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: '800',
    color: '#334155',
    marginBottom: 10,
    letterSpacing: 0.1,
  },
  chartsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    marginTop: 10,
  },
  chartBox: {
    backgroundColor: '#f3f4f6',
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
    width: 320,
    height: 160,
    marginLeft: 12,
    marginRight: 12,
  },
  chartLabel: { fontSize: 12, color: '#64748b', marginTop: 2, fontWeight: '600' },
  emptyText: { color: '#94a3b8', fontSize: 13 },
  legendRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
    gap: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 2,
  },
  legendItem: { flexDirection: 'row', alignItems: 'center', marginRight: 12 },
  legendDot: { width: 12, height: 12, borderRadius: 6, marginRight: 4 },
  legendLabel: { fontSize: 12, color: '#334155', fontWeight: '700' },
  divider: {
    height: 1,
    backgroundColor: '#f1f5f9',
    marginTop: 10,
  },
});

export default NotificationsHeader; 