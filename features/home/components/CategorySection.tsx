// import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { CategorySectionData } from '../types';
import { FeatureCard } from './FeatureCard';

interface CategorySectionProps {
  data: CategorySectionData;
  description?: string;
  vertical?: boolean;
}

export const CategorySection: React.FC<CategorySectionProps> = ({ data, description, vertical }) => (
  <View style={styles.section}>
    <Text style={styles.title}>{data.title}</Text>
    {description && <Text style={styles.desc}>{description}</Text>}
    {vertical ? (
      <View style={styles.verticalCards}>
        {data.features.map((feature) => (
          <FeatureCard key={feature.id} data={feature} />
        ))}
      </View>
    ) : (
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.cardsRow}>
        {data.features.map((feature) => (
          <FeatureCard key={feature.id} data={feature} />
        ))}
      </ScrollView>
    )}
  </View>
);

const styles = StyleSheet.create({
  section: {
    marginVertical: 18,
    marginLeft: 8,
    marginRight: 8,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#334155',
    marginBottom: 2,
    textAlign: 'center',
    letterSpacing: 0.2,
  },
  desc: {
    fontSize: 15,
    color: '#64748b',
    textAlign: 'center',
    marginBottom: 10,
    marginTop: 2,
    fontWeight: '500',
  },
  cardsRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingRight: 16,
  },
  verticalCards: {
    flexDirection: 'column',
    gap: 16,
    alignItems: 'center',
    width: '100%',
  },
}); 