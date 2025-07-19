import React from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRecipes } from '../hooks/useRecipes';
import { RecipeCard } from '../components/RecipeCard';
import { RecipeModal } from '../components/RecipeModal';
import { SearchBar } from '../components/SearchBar';
import { Recipe } from '../types';

const { width } = Dimensions.get('window');
const numColumns = 2;

export const RecipesScreen: React.FC = () => {
  const {
    recipes,
    selectedRecipe,
    isLoading,
    error,
    handleSearch,
    handleSelectRecipe,
    handleCloseModal,
  } = useRecipes();

  const renderRecipe = ({ item }: { item: Recipe }) => (
    <RecipeCard recipe={item} onPress={handleSelectRecipe} />
  );

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <Text style={styles.title}>Recipes</Text>
      <Text style={styles.subtitle}>
        Discover delicious recipes from around the world
      </Text>
      <View style={styles.searchBar}>
        <SearchBar onSearch={handleSearch} />
      </View>
    </View>
  );

  const renderEmpty = () => (
    <View style={styles.centered}>
      <Text style={styles.emptyText}>
        {error || 'No recipes found'}
      </Text>
    </View>
  );

  const renderLoading = () => (
    <View style={styles.centered}>
      <ActivityIndicator size="large" color="#059669" />
      <Text style={styles.loadingText}>
        Loading recipes...
      </Text>
    </View>
  );

  return (
    <LinearGradient
      colors={["#f5f7fa", "#e0f7fa", "#d1fae5"]}
      style={{ flex: 1 }}
    >
      <FlatList
        data={recipes}
        renderItem={renderRecipe}
        keyExtractor={(item) => item.idMeal}
        numColumns={numColumns}
        columnWrapperStyle={{ justifyContent: 'space-between', paddingHorizontal: 8 }}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={isLoading ? renderLoading : renderEmpty}
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={() => handleSearch('')}
            colors={["#059669"]}
          />
        }
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 24, paddingTop: 8, paddingHorizontal: 8 }}
      />

      <RecipeModal
        recipe={selectedRecipe}
        visible={!!selectedRecipe}
        onClose={handleCloseModal}
      />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    alignItems: 'center',
    marginBottom: 8,
    paddingTop: 8,
    paddingHorizontal: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#059669',
    marginBottom: 4,
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 16,
    color: '#64748b',
    textAlign: 'center',
    fontWeight: '500',
    letterSpacing: 0.2,
    marginBottom: 10,
  },
  searchBar: {
    marginBottom: 8,
  },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 32,
  },
  emptyText: {
    color: '#64748b',
    fontSize: 16,
    textAlign: 'center',
  },
  loadingText: {
    color: '#64748b',
    marginTop: 8,
    fontSize: 15,
  },
}); 