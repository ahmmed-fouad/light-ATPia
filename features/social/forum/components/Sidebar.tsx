import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { TagChip } from './TagChip';

interface SidebarProps {
  tags: string[];
  selectedTag: string;
  onSelect: (tag: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ tags, selectedTag, onSelect }) => (
  <View style={styles.container}>
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
      {tags.map(tag => (
        <TagChip
          key={tag}
          label={tag}
          selected={selectedTag === tag}
          onPress={() => onSelect(tag)}
        />
      ))}
    </ScrollView>
  </View>
);

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingBottom: 10,
  },
  scrollContent: {
    alignItems: 'center',
    paddingVertical: 2,
  },
}); 