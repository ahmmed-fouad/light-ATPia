import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Header: React.FC = () => (
  <View style={styles.container}>
    <Text style={styles.crown}>👑</Text>
    <Text style={styles.title}>Upgrade plan to{'\n'}get the best of LifeFit</Text>
    <Text style={styles.recommendation}>
      <Text style={styles.percent}>99%</Text>
      <Text style={styles.recommendText}> of LifeFit user recommended{'\n'}you to upgrade plan!</Text>
    </Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    // marginTop: 32,
    paddingTop: 120,
    marginBottom: 32,
    paddingHorizontal: 16,
  },
  crown: {
    fontSize: 38,
    marginBottom: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#173430',
    textAlign: 'center',
    marginBottom: 8,
    lineHeight: 36,
  },
  recommendation: {
    fontSize: 16,
    textAlign: 'center',
    color: '#64748b',
    fontWeight: '400',
    marginBottom: 0,
  },
  percent: {
    color: '#18b888',
    fontWeight: '700',
    fontSize: 16,
  },
  recommendText: {
    color: '#64748b',
    fontWeight: '400',
    fontSize: 16,
  },
});

export default Header; 