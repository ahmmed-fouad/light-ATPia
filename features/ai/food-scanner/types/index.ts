export type MacroNutrients = {
  protein: number;
  carbs: number;
  fat: number;
};

export type MicroNutrient = {
  name: string;
  value: number;
  unit?: string;
};

export type FoodItem = {
  id: string;
  name: string;
  serving: string;
  calories: number;
  macros: MacroNutrients;
  micros: MicroNutrient[];
  ingredients: string[];
  allergens: string[];
  barcode?: string;
  imageUrl?: string;
  scannedAt: string;
};

export type ScanResult = {
  success: boolean;
  food?: FoodItem;
  error?: string;
  confidence?: number;
};

export type ScanMethod = 'camera' | 'barcode' | 'manual';

export type ScannerState = {
  // Data
  recentScans: FoodItem[];
  currentScan: ScanResult | null;
  scannedFood: FoodItem | null;
  
  // UI State
  isScanning: boolean;
  isProcessing: boolean;
  scanMethod: ScanMethod;
  showResults: boolean;
  showCamera: boolean;
  showBarcodeScanner: boolean;
  
  // Actions
  setScanning: (scanning: boolean) => void;
  setProcessing: (processing: boolean) => void;
  setScanMethod: (method: ScanMethod) => void;
  setShowResults: (show: boolean) => void;
  setShowCamera: (show: boolean) => void;
  setShowBarcodeScanner: (show: boolean) => void;
  
  // Data Actions
  addRecentScan: (food: FoodItem) => void;
  setCurrentScan: (result: ScanResult) => void;
  setScannedFood: (food: FoodItem | null) => void;
  clearRecentScans: () => void;
  
  // Scanning Actions
  scanImage: (imageUri: string) => Promise<ScanResult>;
  scanBarcode: (barcode: string) => Promise<ScanResult>;
  processScanResult: (result: ScanResult) => void;
};

export type ChartData = {
  labels: string[];
  data: number[];
  colors: string[];
};

export type MacroChartData = {
  name: string;
  value: number;
  color: string;
  percentage: number;
};

export type MicroChartData = {
  name: string;
  value: number;
  color: string;
  unit: string;
}; 