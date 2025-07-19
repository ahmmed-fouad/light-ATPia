import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Platform, ViewStyle } from 'react-native';

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  style?: ViewStyle;
}

export const SearchBar: React.FC<SearchBarProps> = ({ 
  onSearch, 
  placeholder = "Search recipes...",
  style
}) => {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    onSearch(query);
  };

  const handleClear = () => {
    setQuery('');
    onSearch('');
  };

  return (
    <View style={[styles.container, style]}>
      <TextInput
        value={query}
        onChangeText={setQuery}
        placeholder={placeholder}
        placeholderTextColor="#9CA3AF"
        style={styles.input}
        onSubmitEditing={handleSearch}
        returnKeyType="search"
      />
      {query.length > 0 && (
        <TouchableOpacity onPress={handleClear} style={styles.clearBtn}>
          <Text style={styles.clearText}>×</Text>
        </TouchableOpacity>
      )}
      <TouchableOpacity onPress={handleSearch} style={styles.searchBtn}>
        <Text style={styles.searchText}>Search</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginBottom: 0,
    shadowColor: '#a7f3d0',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: Platform.OS === 'ios' ? 0.08 : 0.10,
    shadowRadius: 6,
    elevation: 2,
    width: '100%',
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: '#222',
    fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif',
    paddingVertical: 6,
    minHeight: 36,
    backgroundColor: '#f3f4f6',
    borderRadius: 16,
    marginRight: 8,
    minWidth: 120,
  },
  clearBtn: {
    marginRight: 4,
    padding: 2,
  },
  clearText: {
    color: '#64748b',
    fontSize: 20,
    fontWeight: 'bold',
  },
  searchBtn: {
    backgroundColor: '#059669',
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 6,
    marginLeft: 2,
  },
  searchText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
}); 