import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Platform } from 'react-native';

interface TagChipProps {
  label: string;
  selected: boolean;
  onPress: () => void;
}

export const TagChip: React.FC<TagChipProps> = ({ label, selected, onPress }) => (
  <TouchableOpacity
    style={[styles.chip, selected && styles.chipSelected]}
    onPress={onPress}
    activeOpacity={0.8}
  >
    <Text style={[styles.chipText, selected && styles.chipTextSelected]}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  chip: {
    backgroundColor: '#f3f4f6',
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 7,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  chipSelected: {
    backgroundColor: '#059669',
    borderColor: '#059669',
  },
  chipText: {
    fontSize: 14,
    color: '#374151',
    fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif',
  },
  chipTextSelected: {
    color: '#fff',
    fontWeight: 'bold',
  },
}); 