import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, Dimensions, StyleSheet, Platform } from 'react-native';
import { Recipe, RecipeCardProps } from '../types';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 32 - 14) / 2; // 2 columns, 8px padding each side, 14px gap
const FALLBACK_IMAGE = 'https://via.placeholder.com/150?text=No+Image';

export const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, onPress }) => {
  const [imgUri, setImgUri] = useState(recipe.strMealThumb || FALLBACK_IMAGE);

  const getTags = (recipe: Recipe) => {
    if (!recipe.strTags) return [];
    return recipe.strTags.split(',').map(tag => tag.trim()).filter(tag => tag).slice(0, 2);
  };

  const getCalories = () => {
    return Math.floor(Math.random() * 200) + 200;
  };

  return (
    <TouchableOpacity
      onPress={() => onPress(recipe)}
      style={styles.card}
      activeOpacity={0.92}
    >
      <Image
        source={{ uri: imgUri }}
        style={styles.image}
        resizeMode="cover"
        onError={() => setImgUri(FALLBACK_IMAGE)}
      />
      <Text style={styles.title} numberOfLines={2}>
        {recipe.strMeal}
      </Text>
      <View style={styles.categoryRow}>
        <Text style={styles.categoryText} numberOfLines={1}>
          {recipe.strCategory} | {recipe.strArea}
        </Text>
      </View>
      {getTags(recipe).length > 0 && (
        <View style={styles.tagsRow}>
          {getTags(recipe).map((tag, index) => (
            <View
              key={index}
              style={[styles.tagChip, { backgroundColor: ['#d1fae5', '#e0e7ff', '#fef9c3'][index % 3] }]}
            >
              <Text style={[styles.tagText, { color: ['#059669', '#2563eb', '#b45309'][index % 3] }]}>
                {tag}
              </Text>
            </View>
          ))}
        </View>
      )}
      <Text style={styles.caloriesText}>
        {getCalories()} calories
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'rgba(255,255,255,0.97)',
    borderRadius: 14,
    padding: 14,
    marginBottom: 14,
    width: CARD_WIDTH,
    shadowColor: '#a7f3d0',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: Platform.OS === 'ios' ? 0.10 : 0.13,
    shadowRadius: 8,
    elevation: 3,
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 90,
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: '#e5e7eb',
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#222',
    textAlign: 'center',
    marginBottom: 4,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif',
  },
  categoryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  categoryText: {
    fontSize: 12,
    color: '#64748b',
    textAlign: 'center',
    fontWeight: '500',
    fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif',
  },
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 4,
    gap: 4,
  },
  tagChip: {
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginRight: 4,
    marginBottom: 2,
  },
  tagText: {
    fontSize: 11,
    fontWeight: '600',
  },
  caloriesText: {
    fontSize: 12,
    color: '#64748b',
    textAlign: 'center',
    marginTop: 2,
  },
}); 