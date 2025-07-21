import { useState } from 'react';
import { ScrollView, StyleSheet, View, Text } from 'react-native';
import {
    AddFoodButton,
    BreakfastChart,
    BreakfastHeader,
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
        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 24, paddingVertical: 16}}>
            <Text style={{fontSize: 22, fontWeight: '500', color: '#173430'}}>Breakfast Log</Text>
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#18b888', borderRadius: 22, paddingHorizontal: 25, paddingVertical: 8}}>
                <Text style={{color: '#fff', fontSize: 18, fontWeight: '700'}}>3</Text>
            </View>
        </View>
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