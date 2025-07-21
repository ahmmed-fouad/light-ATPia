import { ScrollAwareView } from '@/components';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
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
import { FoodItem } from '../types/breakfastTypes';

const BreakfastScreen = () => {
  const { data, removeFoodItem } = useBreakfastStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [chosenItems, setChosenItems] = useState<FoodItem[]>([]);
  const [doneIds, setDoneIds] = useState<string[]>([]);

  // Helper to get today's 08:00 AM as a Date
  const getToday8AM = () => {
    const now = new Date();
    const eightAM = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 8, 0, 0, 0);
    return eightAM;
  };

  // On mount, load chosenItems and lastReset, and clear if needed
  useEffect(() => {
    const loadAndCheckReset = async () => {
      try {
        const [storedItems, storedReset] = await Promise.all([
          AsyncStorage.getItem('chosenItems'),
          AsyncStorage.getItem('chosenItemsLastReset'),
        ]);
        let items: FoodItem[] = storedItems ? JSON.parse(storedItems) : [];
        let lastReset = storedReset ? new Date(storedReset) : null;
        const now = new Date();
        const today8AM = getToday8AM();
        // If lastReset is before today 8AM and now is after 8AM, clear
        if (!lastReset || (now >= today8AM && lastReset < today8AM)) {
          items = [];
          lastReset = now;
          await AsyncStorage.setItem('chosenItemsLastReset', now.toISOString());
        }
        setChosenItems(items);
      } catch (e) {
        setChosenItems([]);
      }
    };
    loadAndCheckReset();
  }, []);

  // Save chosenItems to storage whenever it changes
  useEffect(() => {
    AsyncStorage.setItem('chosenItems', JSON.stringify(chosenItems));
  }, [chosenItems]);

  // Optionally, set a timer to clear at next 8AM if app stays open
  useEffect(() => {
    const now = new Date();
    let next8AM = getToday8AM();
    if (now >= next8AM) {
      next8AM.setDate(next8AM.getDate() + 1);
    }
    const msUntil8AM = next8AM.getTime() - now.getTime();
    const timer = setTimeout(async () => {
      setChosenItems([]);
      await AsyncStorage.setItem('chosenItemsLastReset', new Date().toISOString());
    }, msUntil8AM);
    return () => clearTimeout(timer);
  }, [chosenItems]);

  const handleAddFood = () => {
    // TODO: Implement add food functionality
    console.log('Add food pressed');
  };

  const handleRemoveFood = (itemId: string) => {
    removeFoodItem(itemId);
  };

  // Add to chosen breakfast
  const handleAddToChosen = (item: FoodItem) => {
    if (!chosenItems.some(i => i.id === item.id)) {
      setChosenItems([...chosenItems, item]);
    }
  };

  // Remove from chosen breakfast
  const handleRemoveFromChosen = (itemId: string) => {
    setChosenItems(chosenItems.filter(i => i.id !== itemId));
  };

  const handleMarkDone = (itemId: string) => {
    setDoneIds(prev => prev.includes(itemId)
      ? prev.filter(id => id !== itemId)
      : [...prev, itemId]
    );
  };

  // Filter food items based on search query
  const filteredItems = searchQuery
    ? data.foodItems.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : data.foodItems;
  const isSearching = searchQuery.length > 0;

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
      {/* Only show chart and description if not searching */}
      {!isSearching && (
        <>
          <BreakfastChart progress={data.progress} />
          <DescriptionCard progress={data.progress} />
        </>
      )}
      {/* Chosen Breakfast Section */}
      {!isSearching && (
        <View style={styles.chosenSection}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8}}>
            <Text style={{fontSize: 20, fontWeight: '500', color: '#173430'}}>Chosen Breakfast</Text>
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#18b888', borderRadius: 22, paddingHorizontal: 18, paddingVertical: 4}}>
              <Text style={{color: '#fff', fontSize: 16, fontWeight: '700'}}>{chosenItems.length}</Text>
            </View>
          </View>
          {chosenItems.length === 0 ? (
            <View style={styles.placeholderBox}>
              <Text style={{color: '#9ca3af', fontSize: 16}}>add your breakfast meals</Text>
            </View>
          ) : (
            <View>
              {chosenItems.map(item => (
                <FoodItemCard
                  key={item.id}
                  item={item}
                  onRemove={handleRemoveFromChosen}
                  onDone={() => handleMarkDone(item.id)}
                  isDone={doneIds.includes(item.id)}
                />
              ))}
            </View>
          )}
        </View>
      )}
      {/* Header Section */}
      <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 24, paddingVertical: 16}}>
        <Text style={{fontSize: 22, fontWeight: '500', color: '#173430'}}>
          {isSearching ? 'Search result' : 'Breakfast Log'}
        </Text>
        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#18b888', borderRadius: 22, paddingHorizontal: 25, paddingVertical: 8}}>
          <Text style={{color: '#fff', fontSize: 18, fontWeight: '700'}}>{filteredItems.length}</Text>
        </View>
      </View>
      <View style={styles.foodList}>
        {filteredItems.map(item => (
          <FoodItemCard 
            key={item.id} 
            item={item} 
            onRemove={handleRemoveFood}
            onEdit={() => handleAddToChosen(item)}
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
  chosenSection: {
    marginTop: 8,
    marginHorizontal: 24,
    marginBottom: 8,
    padding: 12,
    backgroundColor: '#f7f7f7',
    borderRadius: 16,
  },
  placeholderBox: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  chosenCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 8,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 1 },
    elevation: 1,
  },
  removeBtn: {
    marginLeft: 8,
    padding: 2,
  },
});

export default BreakfastScreen; 