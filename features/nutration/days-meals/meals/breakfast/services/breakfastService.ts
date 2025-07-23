import axios from 'axios';
import { BreakfastData, BreakfastProgress, FoodItem } from '../types/breakfastTypes';

const mockProgress: BreakfastProgress = {
  targetKcal: 800,
  currentKcal: 450,
  targetProtein: 30,
  currentProtein: 18,
  targetCarbs: 80,
  currentCarbs: 45,
  targetFat: 25,
  currentFat: 15,
};

const mockFoodItems: FoodItem[] = [
  {
    id: "1",
    name: "Oatmeal with Berries",
    kcal: 250,
    protein: 8,
    carbs: 45,
    fat: 4,
    image: "https://img.icons8.com/emoji/48/000000/oatmeal-emoji.png",
    category: "carbs",
  },
  {
    id: "2",
    name: "Greek Yogurt",
    kcal: 120,
    protein: 15,
    carbs: 8,
    fat: 2,
    image: "https://img.icons8.com/emoji/48/000000/yogurt-emoji.png",
    category: "protein",
  },
  {
    id: "3",
    name: "Almonds",
    kcal: 80,
    protein: 3,
    carbs: 3,
    fat: 7,
    image: "https://img.icons8.com/emoji/48/000000/almonds-emoji.png",
    category: "fat",
  },
  {
    id: "4",
    name: "Oatmeal with Berries",
    kcal: 250,
    protein: 8,
    carbs: 45,
    fat: 4,
    image: "https://img.icons8.com/emoji/48/000000/oatmeal-emoji.png",
    category: "carbs",
  },
  {
    id: "5",
    name: "Greek Yogurt",
    kcal: 120,
    protein: 15,
    carbs: 8,
    fat: 2,
    image: "https://img.icons8.com/emoji/48/000000/yogurt-emoji.png",
    category: "protein",
  },
  {
    id: "6",
    name: "Almonds",
    kcal: 80,
    protein: 3,
    carbs: 3,
    fat: 7,
    image: "https://img.icons8.com/emoji/48/000000/almonds-emoji.png",
    category: "fat",
  },
  {
    id: "7",
    name: "Oatmeal with Berries",
    kcal: 250,
    protein: 8,
    carbs: 45,
    fat: 4,
    image: "https://img.icons8.com/emoji/48/000000/oatmeal-emoji.png",
    category: "carbs",
  },
];

export const getBreakfastData = (): BreakfastData => {
  return {
    progress: mockProgress,
    foodItems: mockFoodItems,
  };
};

export const addFoodItem = (item: FoodItem) => {
  // Add food item logic
  console.log('Adding food item:', item);
};

export const removeFoodItem = (itemId: string) => {
  // Remove food item logic
  console.log('Removing food item:', itemId);
};

export const fetchFoods = async (searchTerm = 'breakfast') => {
  const url = `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(searchTerm)}&search_simple=1&action=process&json=1&lc=en&fields=code,product_name_en,image_url,nutriments,categories`;
  const response = await axios.get(url, {
    headers: {
      'User-Agent': 'ATPiaApp/1.0 (your@email.com)'
    }
  });
  const products = response.data.products
    .filter((product: any) => !!product.product_name_en && typeof product.product_name_en === 'string' && product.product_name_en.trim().length > 0)
    .map((product: any) => ({
      id: product.code,
      name: product.product_name_en.trim(),
      kcal: Number(Number(product.nutriments?.["energy-kcal_100g"]).toFixed(2)) || 0,
      protein: Number(Number(product.nutriments?.["proteins_100g"]).toFixed(2)) || 0,
      carbs: Number(Number(product.nutriments?.["carbohydrates_100g"]).toFixed(2)) || 0,
      fat: Number(Number(product.nutriments?.["fat_100g"]).toFixed(2)) || 0,
      image: product.image_url,
      category: product.categories,
    }));
  // Deduplicate by name (case-insensitive)
  const seenNames = new Set<string>();
  const uniqueProducts = products.filter((p: { name: string }) => {
    const lower = p.name.toLowerCase();
    if (seenNames.has(lower)) return false;
    seenNames.add(lower);
    return true;
  });
  return uniqueProducts;
};

export const fetchFoodsPage = async (searchTerm = 'breakfast', page = 1, pageSize = 20) => {
  const url = `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(searchTerm)}&search_simple=1&action=process&json=1&lc=en&fields=code,product_name_en,image_url,nutriments,categories&page=${page}&page_size=${pageSize}`;
  const response = await axios.get(url, {
    headers: {
      'User-Agent': 'ATPiaApp/1.0 (your@email.com)'
    }
  });
  const products = response.data.products
    .filter((product: any) => !!product.product_name_en && typeof product.product_name_en === 'string' && product.product_name_en.trim().length > 0)
    .map((product: any) => ({
      id: product.code,
      name: product.product_name_en.trim(),
      kcal: Number(Number(product.nutriments?.["energy-kcal_100g"]).toFixed(2)) || 0,
      protein: Number(Number(product.nutriments?.["proteins_100g"]).toFixed(2)) || 0,
      carbs: Number(Number(product.nutriments?.["carbohydrates_100g"]).toFixed(2)) || 0,
      fat: Number(Number(product.nutriments?.["fat_100g"]).toFixed(2)) || 0,
      image: product.image_url,
      category: product.categories,
    }));
  const totalCount = response.data.count || 0;
  return { products, totalCount };
}; 