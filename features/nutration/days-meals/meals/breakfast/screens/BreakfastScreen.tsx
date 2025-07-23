import { ScrollAwareView } from '@/components';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {
  AddFoodButton,
  BreakfastChart,
  BreakfastHeader,
  DescriptionCard,
  FoodItemCard,
  SearchBar
} from '../components';
import { fetchFoodsPage } from '../services/breakfastService';
import { useBreakfastStore } from '../stores/breakfastStore';
import { FoodItem } from '../types/breakfastTypes';

const BreakfastScreen = () => {
  const { data, removeFoodItem } = useBreakfastStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [chosenItems, setChosenItems] = useState<FoodItem[]>([]);
  const [doneIds, setDoneIds] = useState<string[]>([]);
  const [chartCurves, setChartCurves] = useState({
    kcal: [0],
    carbs: [0],
    fat: [0],
    protein: [0],
    date: new Date().toISOString().slice(0, 10),
  });
  const [foodItems, setFoodItems] = useState<FoodItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const pageSize = 20;

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

  // Load doneIds on mount
  useEffect(() => {
    const loadDoneIds = async () => {
      try {
        const storedDoneIds = await AsyncStorage.getItem('doneIds');
        setDoneIds(storedDoneIds ? JSON.parse(storedDoneIds) : []);
      } catch {
        setDoneIds([]);
      }
    };
    loadDoneIds();
  }, []);

  // Save doneIds to storage whenever it changes
  useEffect(() => {
    AsyncStorage.setItem('doneIds', JSON.stringify(doneIds));
  }, [doneIds]);

  // Load chartCurves from AsyncStorage on mount
  useEffect(() => {
    const loadCurves = async () => {
      try {
        const stored = await AsyncStorage.getItem('breakfastChartCurves');
        if (stored) {
          setChartCurves(JSON.parse(stored));
        }
      } catch {}
    };
    loadCurves();
  }, []);

  // Calculate progress from done chosen items
  const doneChosenItems = chosenItems.filter(item => doneIds.includes(item.id));
  const doneProgress = {
    currentKcal: doneChosenItems.reduce((sum, item) => sum + (item.kcal || 0), 0),
    targetKcal: data.progress.targetKcal,
    currentCarbs: doneChosenItems.reduce((sum, item) => sum + (item.carbs || 0), 0),
    targetCarbs: data.progress.targetCarbs,
    currentFat: doneChosenItems.reduce((sum, item) => sum + (item.fat || 0), 0),
    targetFat: data.progress.targetFat,
    currentProtein: doneChosenItems.reduce((sum, item) => sum + (item.protein || 0), 0),
    targetProtein: data.progress.targetProtein,
  };

  // On every change in doneProgress, append new values to the arrays and persist
  useEffect(() => {
    const round2 = (val: number) => Math.round((val + Number.EPSILON) * 100) / 100;
    const safeNumber = (val: any) => (Number.isFinite(val) ? val : 0);
    setChartCurves(prevCurves => {
      const today = new Date().toISOString().slice(0, 10);
      const lastKcal = round2(safeNumber(prevCurves.kcal[prevCurves.kcal.length - 1]));
      const lastCarbs = round2(safeNumber(prevCurves.carbs[prevCurves.carbs.length - 1]));
      const lastFat = round2(safeNumber(prevCurves.fat[prevCurves.fat.length - 1]));
      const lastProtein = round2(safeNumber(prevCurves.protein[prevCurves.protein.length - 1]));

      const newKcal = round2(safeNumber(doneProgress.currentKcal));
      const newCarbs = round2(safeNumber(doneProgress.currentCarbs * 4));
      const newFat = round2(safeNumber(doneProgress.currentFat * 4));
      const newProtein = round2(safeNumber(doneProgress.currentProtein * 4));

      const shouldAppend =
        newKcal !== lastKcal ||
        newCarbs !== lastCarbs ||
        newFat !== lastFat ||
        newProtein !== lastProtein;

      if (shouldAppend) {
        const newCurves = {
          kcal: [...prevCurves.kcal, newKcal],
          carbs: [...prevCurves.carbs, newCarbs],
          fat: [...prevCurves.fat, newFat],
          protein: [...prevCurves.protein, newProtein],
          date: today,
        };
        AsyncStorage.setItem('breakfastChartCurves', JSON.stringify(newCurves));
        console.log('BreakfastChart Curves:', newCurves);
        return newCurves;
      }
      return prevCurves;
    });
  }, [doneProgress]);

  // Fetch first page on mount and when searchQuery changes
  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const { products, totalCount } = await fetchFoodsPage(searchQuery || 'breakfast', 1, pageSize);
        if (isMounted) {
          setFoodItems(products);
          setTotalCount(totalCount);
          setPage(1);
        }
      } catch (e) {
        if (isMounted) setError('Failed to fetch foods');
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    fetchData();
    return () => { isMounted = false; };
  }, [searchQuery]);

  // Load more handler
  const handleLoadMore = async () => {
    setLoading(true);
    try {
      const { products } = await fetchFoodsPage(searchQuery || 'breakfast', page + 1, pageSize);
      setFoodItems(prev => [...prev, ...products]);
      setPage(prev => prev + 1);
    } catch {
      setError('Failed to fetch more foods');
    } finally {
      setLoading(false);
    }
  };

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

  // Filter food items based on search query (client-side substring match)
  const filteredItems = foodItems.filter(item =>
    item.name.toLowerCase().includes(searchQuery.trim().toLowerCase())
  );
  const isSearching = searchQuery.length > 0;

  return (
    <View style={styles.container}>
      {loading && (
        <Text style={{ textAlign: 'center', marginTop: 24, color: '#18b888', fontWeight: 'bold' }}>Loading foods...</Text>
      )}
      {error && (
        <Text style={{ textAlign: 'center', marginTop: 24, color: 'red', fontWeight: 'bold' }}>{error}</Text>
      )}
      <ScrollAwareView showsVerticalScrollIndicator={false}>
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <BreakfastHeader />
          <SearchBar value={searchQuery} onChangeText={setSearchQuery} />
          {/* Only show chart and description if not searching */}
          {!isSearching && (
            <>
              <BreakfastChart chartCurves={chartCurves} />
              {/* Reset Chart Curves Button for testing */}
              <TouchableOpacity
                style={{
                  backgroundColor: "#18b888",
                  paddingVertical: 10,
                  paddingHorizontal: 24,
                  borderRadius: 22,
                  alignSelf: "center",
                  marginBottom: 22,
                }}
                onPress={async () => {
                  const today = new Date().toISOString().slice(0, 10);
                  const resetCurves = {
                    kcal: [0],
                    carbs: [0],
                    fat: [0],
                    protein: [0],
                    date: today,
                  };
                  setChartCurves(resetCurves);
                  await AsyncStorage.setItem(
                    "breakfastChartCurves",
                    JSON.stringify(resetCurves)
                  );
                  console.log("BreakfastChart Curves RESET:", resetCurves);
                }}
              >
                <Text
                  style={{ color: "#fff", fontWeight: "bold", fontSize: 16 }}
                >
                  Reset Chart Curves
                </Text>
              </TouchableOpacity>
              <DescriptionCard progress={doneProgress} />
            </>
          )}
          {/* Chosen Breakfast Section */}
          {!isSearching && (
            <View style={styles.chosenSection}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 8,
                }}
              >
                <Text
                  style={{ fontSize: 20, fontWeight: "500", color: "#173430" }}
                >
                  Chosen Breakfast
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#18b888",
                    borderRadius: 22,
                    paddingHorizontal: 18,
                    paddingVertical: 4,
                  }}
                >
                  <Text
                    style={{ color: "#fff", fontSize: 16, fontWeight: "700" }}
                  >
                    {chosenItems.length}
                  </Text>
                </View>
              </View>
              {chosenItems.length === 0 ? (
                <View style={styles.placeholderBox}>
                  <Text style={{ color: "#9ca3af", fontSize: 16 }}>
                    add your breakfast meals
                  </Text>
                </View>
              ) : (
                <View style={{ marginHorizontal: -24, gap: 18 }}>
                  {chosenItems.map((item) => (
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
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingHorizontal: 24,
              paddingVertical: 16,
            }}
          >
            <Text style={{ fontSize: 22, fontWeight: "500", color: "#173430" }}>
              {isSearching ? "Search result" : "Breakfast Log"}
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#18b888",
                borderRadius: 22,
                paddingHorizontal: 25,
                paddingVertical: 8,
              }}
            >
              <Text style={{ color: "#fff", fontSize: 18, fontWeight: "700" }}>
                {filteredItems.length}
              </Text>
            </View>
          </View>
          <View style={styles.foodList}>
            {filteredItems.map((item) => (
              <FoodItemCard
                key={item.id}
                item={item}
                onRemove={handleRemoveFood}
                onEdit={() => handleAddToChosen(item)}
              />
            ))}
            {/* Load more button */}
            {filteredItems.length < totalCount && (
              <TouchableOpacity
                style={{
                  backgroundColor: '#18b888',
                  paddingVertical: 12,
                  paddingHorizontal: 32,
                  borderRadius: 22,
                  alignSelf: 'center',
                  marginVertical: 18,
                }}
                onPress={handleLoadMore}
                disabled={loading}
              >
                <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>
                  {loading ? 'Loading...' : 'Load more'}
                </Text>
              </TouchableOpacity>
            )}
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
    backgroundColor: "#fff",
  },
  content: {
    flex: 1,
  },

  foodList: {
    marginTop: 8,
    gap: 18,
  },
  chosenSection: {
    marginTop: 8,
    marginHorizontal: 24,
    marginBottom: 8,
    paddingHorizontal: 12,
    paddingVertical: 16,
    backgroundColor: "#ebf6d6",
    borderRadius: 16,
  },
  placeholderBox: {
    alignItems: "center",
    paddingVertical: 16,
  },
  chosenCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    // paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 8,
    marginBottom: 8,
    shadowColor: "#000",
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