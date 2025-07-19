import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export const HeroSection: React.FC = () => (
  <LinearGradient colors={["#a7f3d0", "#f0fdfa", "#e0e7ff"]} style={styles.hero}>
    <View style={styles.logoRow}>
      <Image source={require('../../../assets/images/ATPia_Logo.png')} style={styles.logo} />
      <Text style={styles.brand}>ATPia</Text>
    </View>
    <Text style={styles.tagline}>Your AI-powered health & nutrition companion</Text>
  </LinearGradient>
);

const styles = StyleSheet.create({
  hero: {
    borderRadius: 28,
    margin: 18,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#a7f3d0',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 4,
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  logo: {
    width: 48,
    height: 48,
    borderRadius: 12,
    marginRight: 10,
  },
  brand: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#059669',
    letterSpacing: 1.2,
  },
  tagline: {
    fontSize: 18,
    color: '#334155',
    textAlign: 'center',
    marginBottom: 2,
    marginTop: 2,
    fontWeight: '500',
  },
}); 