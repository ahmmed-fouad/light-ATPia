import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { PlanType } from '../types/planTypes';

interface PlanCardProps {
  plan: PlanType;
  selected?: boolean;
}

const deepBg = '#173430';
const deepText = '#fff';
const deepIcon = '#bce2bd';

const PlanCard: React.FC<PlanCardProps> = ({ plan, selected }) => {
  const bgColor = selected ? deepBg : plan.bgColor;
  const textColor = selected ? deepText : plan.textColor;
  const iconColor = selected ? deepIcon : plan.iconColor;
  return (
    <View style={[styles.card, { backgroundColor: bgColor, borderColor: selected ? '#18b888' : 'transparent', borderWidth: selected ? 2 : 0 }]}> 
      <View style={styles.row}>
        <View style={styles.infoSection}>
          <Text style={[styles.name, { color: textColor }]}>{plan.name}</Text>
          <View style={{ flexDirection: 'row', alignItems: 'flex-end', marginTop: 2 }}>
            <Text style={[styles.price, { color: textColor }]}>${plan.price}</Text>
            <Text style={[styles.period, { color: textColor }]}>/{plan.period}</Text>
          </View>
          <Text style={[styles.label, selected && { color: '#bce2bd' }]}>{plan.label}</Text>
        </View>
        <View style={styles.iconSection}>
          <Text style={{ fontSize: 54, color: iconColor }}>{plan.icon}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 24,
    padding: 24,
    marginBottom: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'space-between',
  },
  infoSection: {
    flex: 1,
  },
  name: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 2,
  },
  price: {
    fontSize: 38,
    fontWeight: 'bold',
    marginRight: 2,
  },
  period: {
    fontSize: 18,
    fontWeight: '400',
    marginBottom: 4,
  },
  label: {
    color: '#ef4444',
    fontSize: 14,
    marginTop: 2,
    fontWeight: '500',
  },
  iconSection: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 18,
  },
});

export default PlanCard; 