import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import {
    AddFoodButton,
    BreakfastChart,
    BreakfastHeader,
    BreakfastSectionHeader,
    DescriptionCard,
    FoodItemCard,
    SearchBar
} from '../components';
import { useBreakfastStore } from '../stores/breakfastStore';

const BreakfastScreen = () => {
  const { data, removeFoodItem } = useBreakfastStore();
  const [searchQuery, setSearchQuery] = useState('');

  const handleAddFood = () => {
    // TODO: Implement add food functionality
    console.log('Add food pressed');
  };

  const handleRemoveFood = (itemId: string) => {
    removeFoodItem(itemId);
  };

  return (
    <View style={styles.container}>
      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
      <BreakfastHeader />
      <SearchBar 
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      
        <BreakfastChart progress={data.progress} />
        <DescriptionCard progress={data.progress} />
        <BreakfastSectionHeader count={data.foodItems.length} />
        
        <View style={styles.foodList}>
          {data.foodItems.map(item => (
            <FoodItemCard 
              key={item.id} 
              item={item} 
              onRemove={handleRemoveFood}
            />
          ))}
        </View>
      </ScrollView>
      
      <AddFoodButton onPress={handleAddFood} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ebf6d6',
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    // marginBottom: 200, // Space for floating button
  },
  foodList: {
    marginTop: 8,
  },
});

export default BreakfastScreen; 