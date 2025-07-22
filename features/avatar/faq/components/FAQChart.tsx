import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { chartDatFaq, COLORS } from '../data/faqData';

const screenWidth = Dimensions.get('window').width;

const FAQChart: React.FC = () => {
  const data = chartDatFaq.map((d, i) => ({
    name: d.name,
    population: d.value,
    color: COLORS[i % COLORS.length],
    legendFontColor: '#334155',
    legendFontSize: 14,
  }));

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Most Asked Topics</Text>
      <PieChart
        data={data}
        width={600}
        height={180}
        chartConfig={chartConfig}
        accessor={'population'}
        backgroundColor={'transparent'}
        paddingLeft={'10'}
        absolute
        hasLegend={false}
      />
      <View style={styles.legendContainer}>
        {data.map((item, idx) => (
          <View key={item.name} style={styles.legendRow}>
            <View style={[styles.legendColor, { backgroundColor: item.color }]} />
            <Text style={styles.legendLabel}>{item.name}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const chartConfig = {
  backgroundGradientFrom: '#fff',
  backgroundGradientTo: '#fff',
  color: (opacity = 1) => `rgba(99, 102, 241, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(51, 65, 85, ${opacity})`,
  strokeWidth: 2,
  useShadowColorFromDataset: false,
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#64748b',
    marginBottom: 12,
    textAlign: 'center',
  },
  legendContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 10,
  },
  legendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 8,
    marginBottom: 4,
  },
  legendColor: {
    width: 14,
    height: 14,
    borderRadius: 7,
    marginRight: 6,
  },
  legendLabel: {
    fontSize: 14,
    color: '#334155',
  },
});

export default FAQChart; 