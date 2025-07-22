import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { plans } from '../data/pricingData';

const PlansGrid: React.FC = () => {
  return (
    <View style={styles.grid}>
      {plans.map((plan) => (
        <View
          key={plan.name}
          style={[styles.card, plan.highlight && styles.highlightCard]}
        >
          <Text style={styles.planName}>{plan.name}</Text>
          <Text style={styles.price}>{plan.price === 0 ? 'Free' : `$${plan.price}`}</Text>
          <Text style={styles.priceSub}>{plan.price === 0 ? 'Forever' : 'Per month'}</Text>
          <View style={styles.featuresList}>
            {plan.features.map((f) => (
              <View key={f} style={styles.featureRow}>
                <View style={styles.bullet} />
                <Text style={styles.featureText}>{f}</Text>
              </View>
            ))}
          </View>
          <TouchableOpacity
            style={[styles.button, plan.highlight ? styles.buttonHighlight : styles.buttonDefault]}
          >
            <Text style={plan.highlight ? styles.buttonTextHighlight : styles.buttonTextDefault}>
              {plan.price === 0 ? 'Get Started' : 'Upgrade'}
            </Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 16,
    marginBottom: 16,
    width: '100%',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    alignItems: 'center',
    marginHorizontal: 0,
  },
  highlightCard: {
    borderColor: '#6366f1',
    borderWidth: 2,
    transform: [{ scale: 1.04 }],
  },
  planName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#6366f1',
    marginBottom: 4,
  },
  price: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#334155',
    marginBottom: 2,
  },
  priceSub: {
    color: '#94a3b8',
    marginBottom: 10,
  },
  featuresList: {
    width: '100%',
    marginBottom: 12,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  bullet: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#6366f1',
    marginRight: 8,
  },
  featureText: {
    color: '#334155',
    fontSize: 15,
  },
  button: {
    width: '100%',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 4,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 4,
    elevation: 1,
  },
  buttonHighlight: {
    backgroundColor: '#6366f1',
  },
  buttonDefault: {
    backgroundColor: '#e5e7eb',
  },
  buttonTextHighlight: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  buttonTextDefault: {
    color: '#334155',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default PlansGrid; 