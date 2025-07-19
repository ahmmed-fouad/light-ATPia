import { useMemo } from 'react';
import { useFoodScannerStore } from '../stores/foodScannerStore';
import { FoodScannerService } from '../services/foodScannerService';
import { FoodItem, MacroChartData, MicroChartData } from '../types';

export const useFoodScanner = () => {
  const {
    recentScans,
    currentScan,
    scannedFood,
    isScanning,
    isProcessing,
    scanMethod,
    showResults,
    showCamera,
    showBarcodeScanner,
    setScanning,
    setProcessing,
    setScanMethod,
    setShowResults,
    setShowCamera,
    setShowBarcodeScanner,
    addRecentScan,
    setCurrentScan,
    setScannedFood,
    clearRecentScans,
    scanImage,
    scanBarcode,
    processScanResult,
  } = useFoodScannerStore();

  // Chart data generation
  const macroChartData = useMemo(() => {
    if (!scannedFood) return [];
    return FoodScannerService.generateMacroChartData(scannedFood);
  }, [scannedFood]);

  const microChartData = useMemo(() => {
    if (!scannedFood) return [];
    return FoodScannerService.generateMicroChartData(scannedFood);
  }, [scannedFood]);

  // Nutrition calculations
  const nutritionScore = useMemo(() => {
    if (!scannedFood) return 0;
    return FoodScannerService.calculateNutritionScore(scannedFood);
  }, [scannedFood]);

  const macroPercentages = useMemo(() => {
    if (!scannedFood) return { protein: 0, carbs: 0, fat: 0 };
    return FoodScannerService.calculateMacroPercentages(scannedFood);
  }, [scannedFood]);

  // Allergen analysis
  const hasAllergens = useMemo(() => {
    if (!scannedFood) return false;
    return FoodScannerService.hasAllergens(scannedFood);
  }, [scannedFood]);

  const highPriorityAllergens = useMemo(() => {
    if (!scannedFood) return [];
    return FoodScannerService.getHighPriorityAllergens(scannedFood);
  }, [scannedFood]);

  // Recent scans processing
  const recentScansFormatted = useMemo(() => {
    return recentScans.map(food => ({
      ...food,
      formattedDate: FoodScannerService.formatDate(food.scannedAt),
      nutritionScore: FoodScannerService.calculateNutritionScore(food),
    }));
  }, [recentScans]);

  // Scanning functions
  const handleImageScan = async (imageUri: string) => {
    try {
      setScanning(true);
      const result = await scanImage(imageUri);
      processScanResult(result);
    } catch (error) {
      console.error('Image scan error:', error);
      processScanResult({
        success: false,
        error: 'Failed to scan image. Please try again.',
      });
    } finally {
      setScanning(false);
    }
  };

  const handleBarcodeScan = async (barcode: string) => {
    try {
      setScanning(true);
      const result = await scanBarcode(barcode);
      processScanResult(result);
    } catch (error) {
      console.error('Barcode scan error:', error);
      processScanResult({
        success: false,
        error: 'Failed to scan barcode. Please try again.',
      });
    } finally {
      setScanning(false);
    }
  };

  const handleManualInput = async (foodName: string) => {
    try {
      setProcessing(true);
      // Simulate manual food lookup
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockResult = {
        success: true,
        food: {
          id: Date.now().toString(),
          name: foodName,
          serving: '1 serving',
          calories: 150,
          macros: { protein: 10, carbs: 20, fat: 5 },
          micros: [
            { name: 'Fiber', value: 2, unit: 'g' },
            { name: 'Vitamin C', value: 10, unit: 'mg' },
          ],
          ingredients: [foodName],
          allergens: [],
          scannedAt: new Date().toISOString(),
        },
        confidence: 60,
      };
      
      processScanResult(mockResult);
    } catch (error) {
      console.error('Manual input error:', error);
      processScanResult({
        success: false,
        error: 'Failed to find food item. Please try again.',
      });
    } finally {
      setProcessing(false);
    }
  };

  // Utility functions
  const formatCalories = (calories: number) => {
    return FoodScannerService.formatCalories(calories);
  };

  const formatMacro = (macro: number, unit: string = 'g') => {
    return FoodScannerService.formatMacro(macro, unit);
  };

  const formatServing = (serving: string) => {
    return FoodScannerService.formatServing(serving);
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return '#10B981';
    if (confidence >= 70) return '#F59E0B';
    return '#EF4444';
  };

  const getNutritionScoreColor = (score: number) => {
    if (score >= 80) return '#10B981';
    if (score >= 60) return '#F59E0B';
    return '#EF4444';
  };

  return {
    // Data
    recentScans: recentScansFormatted,
    currentScan,
    scannedFood,
    
    // Chart data
    macroChartData,
    microChartData,
    
    // Calculations
    nutritionScore,
    macroPercentages,
    
    // Allergen analysis
    hasAllergens,
    highPriorityAllergens,
    
    // UI state
    isScanning,
    isProcessing,
    scanMethod,
    showResults,
    showCamera,
    showBarcodeScanner,
    
    // Actions
    setScanning,
    setProcessing,
    setScanMethod,
    setShowResults,
    setShowCamera,
    setShowBarcodeScanner,
    addRecentScan,
    setCurrentScan,
    setScannedFood,
    clearRecentScans,
    
    // Scanning functions
    handleImageScan,
    handleBarcodeScan,
    handleManualInput,
    
    // Utility functions
    formatCalories,
    formatMacro,
    formatServing,
    getConfidenceColor,
    getNutritionScoreColor,
  };
}; 