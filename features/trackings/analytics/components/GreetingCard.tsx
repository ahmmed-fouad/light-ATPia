import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useAnalyticsStore } from '../stores/analyticsStore';

const GreetingCard = () => {
  const user = useAnalyticsStore(s => s.user);
  return (
    <View style={styles.card}>
      <Image source={{ uri: user.avatar }} style={styles.avatar} />
      <Text style={styles.name}>Hello, {user.name}!</Text>
      <Text style={styles.quote}>"Stay motivated and keep tracking!"</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    marginBottom: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: '700',
    color: '#334155',
    marginBottom: 4,
  },
  quote: {
    fontSize: 14,
    color: '#64748b',
    fontStyle: 'italic',
  },
});

export default GreetingCard; 