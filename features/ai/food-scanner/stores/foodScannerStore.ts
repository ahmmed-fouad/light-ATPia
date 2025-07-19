import { create } from 'zustand';
import { ScannerState, FoodItem, ScanResult, ScanMethod } from '../types';

// Demo data for development
const demoFoodItems: FoodItem[] = [
  {
    id: '1',
    name: 'Greek Yogurt Bowl',
    serving: '1 bowl (200g)',
    calories: 180,
    macros: { protein: 15, carbs: 22, fat: 4 },
    micros: [
      { name: 'Calcium', value: 180, unit: 'mg' },
      { name: 'Potassium', value: 240, unit: 'mg' },
      { name: 'Vitamin B12', value: 1.2, unit: 'mcg' },
      { name: 'Iron', value: 0.3, unit: 'mg' },
    ],
    ingredients: ['Greek Yogurt', 'Blueberries', 'Honey', 'Almonds'],
    allergens: ['Almonds', 'Dairy'],
    scannedAt: '2024-01-29T10:30:00Z',
  },
  {
    id: '2',
    name: 'Grilled Chicken Breast',
    serving: '1 piece (150g)',
    calories: 250,
    macros: { protein: 45, carbs: 0, fat: 5 },
    micros: [
      { name: 'Iron', value: 1.2, unit: 'mg' },
      { name: 'Zinc', value: 2.1, unit: 'mg' },
      { name: 'Vitamin B6', value: 0.8, unit: 'mg' },
      { name: 'Selenium', value: 35, unit: 'mcg' },
    ],
    ingredients: ['Chicken Breast', 'Olive Oil', 'Herbs', 'Spices'],
    allergens: [],
    scannedAt: '2024-01-29T09:15:00Z',
  },
  {
    id: '3',
    name: 'Quinoa Salad',
    serving: '1 bowl (180g)',
    calories: 220,
    macros: { protein: 8, carbs: 35, fat: 6 },
    micros: [
      { name: 'Fiber', value: 5, unit: 'g' },
      { name: 'Magnesium', value: 120, unit: 'mg' },
      { name: 'Folate', value: 45, unit: 'mcg' },
      { name: 'Manganese', value: 1.2, unit: 'mg' },
    ],
    ingredients: ['Quinoa', 'Cherry Tomatoes', 'Cucumber', 'Olive Oil'],
    allergens: [],
    scannedAt: '2024-01-28T14:20:00Z',
  },
];

export const useFoodScannerStore = create<ScannerState>((set, get) => ({
  // Initial data
  recentScans: demoFoodItems,
  currentScan: null,
  scannedFood: null,
  
  // UI State
  isScanning: false,
  isProcessing: false,
  scanMethod: 'camera',
  showResults: false,
  showCamera: false,
  showBarcodeScanner: false,
  
  // Actions
  setScanning: (scanning: boolean) => set({ isScanning: scanning }),
  setProcessing: (processing: boolean) => set({ isProcessing: processing }),
  setScanMethod: (method: ScanMethod) => set({ scanMethod: method }),
  setShowResults: (show: boolean) => set({ showResults: show }),
  setShowCamera: (show: boolean) => set({ showCamera: show }),
  setShowBarcodeScanner: (show: boolean) => set({ showBarcodeScanner: show }),
  
  // Data Actions
  addRecentScan: (food: FoodItem) => 
    set((state) => ({ 
      recentScans: [food, ...state.recentScans.slice(0, 9)] // Keep last 10
    })),
    
  setCurrentScan: (result: ScanResult) => set({ currentScan: result }),
  setScannedFood: (food: FoodItem | null) => set({ scannedFood: food }),
  clearRecentScans: () => set({ recentScans: [] }),
  
  // Scanning Actions
  scanImage: async (imageUri: string): Promise<ScanResult> => {
    set({ isProcessing: true });
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Demo: Return first food item for any image
    const demoResult: ScanResult = {
      success: true,
      food: {
        ...demoFoodItems[0],
        id: Date.now().toString(),
        imageUrl: imageUri,
        scannedAt: new Date().toISOString(),
      },
      confidence: 85,
    };
    
    set({ isProcessing: false });
    return demoResult;
  },
  
  scanBarcode: async (barcode: string): Promise<ScanResult> => {
    set({ isProcessing: true });
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Demo: Return different food based on barcode
    const foodIndex = parseInt(barcode.slice(-1)) % demoFoodItems.length;
    const demoResult: ScanResult = {
      success: true,
      food: {
        ...demoFoodItems[foodIndex],
        id: Date.now().toString(),
        barcode: barcode,
        scannedAt: new Date().toISOString(),
      },
      confidence: 95,
    };
    
    set({ isProcessing: false });
    return demoResult;
  },
  
  processScanResult: (result: ScanResult) => {
    set({ currentScan: result });
    
    if (result.success && result.food) {
      set({ 
        scannedFood: result.food,
        showResults: true 
      });
      
      // Add to recent scans
      get().addRecentScan(result.food);
    }
  },
})); 