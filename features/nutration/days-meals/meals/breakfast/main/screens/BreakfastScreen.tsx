import { ScrollAwareView } from '@/components';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
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
        <ScrollAwareView
        showsVerticalScrollIndicator={false}
      >
      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >
      <BreakfastHeader />
      <SearchBar 
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      
        <BreakfastChart progress={data.progress} />
        <DescriptionCard progress={data.progress} />
        {/* Header Section */}
        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 24, paddingVertical: 16}}>
            <Text style={{fontSize: 22, fontWeight: '500', color: '#173430'}}>Breakfast Log</Text>
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#18b888', borderRadius: 22, paddingHorizontal: 25, paddingVertical: 8}}>
                <Text style={{color: '#fff', fontSize: 18, fontWeight: '700'}}>{data.foodItems.length}</Text>
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
      </ScrollAwareView>
      <AddFoodButton onPress={handleAddFood} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
  },

  foodList: {
    marginTop: 8,
  },
});

export default BreakfastScreen; 