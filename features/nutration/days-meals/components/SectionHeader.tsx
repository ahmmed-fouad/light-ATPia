import React from 'react';
import { Text, StyleSheet } from 'react-native';

interface SectionHeaderProps {
  title: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title }) => (
  <Text style={styles.header}>{title}</Text>
);

const styles = StyleSheet.create({
  header: {
    fontSize: 18,
    fontWeight: '700',
    color: '#12281D',
    marginTop: 24,
    marginBottom: 12,
    marginLeft: 0,
  },
});

export default SectionHeader; 