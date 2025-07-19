import { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, StyleSheet, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Camera, Barcode, Search, History, ArrowRight, Upload, Image as ImageIcon } from 'lucide-react-native';
import { useFoodScanner } from '../hooks/useFoodScanner';
import { ImageUploadButton } from '../components/ui/ImageUploadButton';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';

export const FoodScannerScreen: React.FC = () => {
  const {
    recentScans,
    isScanning,
    isProcessing,
    handleImageScan,
    handleBarcodeScan,
    handleManualInput,
    setShowResults,
  } = useFoodScanner();

  const [imageUri, setImageUri] = useState<string | undefined>();
  const [barcode, setBarcode] = useState('');
  const [manualInput, setManualInput] = useState('');

  const handleCameraPress = () => {
    // TODO: Implement camera functionality
    console.log('Camera pressed');
    setImageUri('https://via.placeholder.com/300x200/34D399/FFFFFF?text=Food+Image');
  };

  const handleGalleryPress = () => {
    // TODO: Implement gallery picker
    console.log('Gallery pressed');
    setImageUri('https://via.placeholder.com/300x200/60A5FA/FFFFFF?text=Gallery+Image');
  };

  const handleUploadPress = async () => {
    if (imageUri) {
      await handleImageScan(imageUri);
      setShowResults(true);
    }
  };

  const handleBarcodeSubmit = async () => {
    if (barcode.trim()) {
      await handleBarcodeScan(barcode.trim());
      setShowResults(true);
      setBarcode('');
    }
  };

  const handleManualSubmit = async () => {
    if (manualInput.trim()) {
      await handleManualInput(manualInput.trim());
      setShowResults(true);
      setManualInput('');
    }
  };

  if (isProcessing) {
    return (
      <LinearGradient
        colors={["#f5f7fa", "#e0f7fa", "#d1fae5"]}
        style={{ flex: 1 }}
      >
        <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16 }}>
          <LoadingSpinner 
            message="Analyzing your food..." 
            size="large"
          />
        </SafeAreaView>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient
      colors={["#f5f7fa", "#e0f7fa", "#d1fae5"]}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView 
          contentContainerStyle={styles.container} 
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Food Scanner</Text>
            <Text style={styles.subtitle}>
              Scan food items to get detailed nutrition information
            </Text>
          </View>

          {/* Image Upload */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>📸 Image Scanning</Text>
            <ImageUploadButton
              imageUri={imageUri}
              onCameraPress={handleCameraPress}
              onGalleryPress={handleGalleryPress}
              onUploadPress={handleUploadPress}
              isUploading={isScanning}
            />
          </View>

          {/* Barcode Scanner */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>📊 Barcode Scanner</Text>
            <View style={styles.inputCard}>
              <View style={styles.inputHeader}>
                <Barcode size={20} color="#059669" />
                <Text style={styles.inputTitle}>Scan Product Barcode</Text>
              </View>
              
              <View style={styles.inputRow}>
                <TextInput
                  value={barcode}
                  onChangeText={setBarcode}
                  placeholder="Enter barcode number"
                  placeholderTextColor="#9CA3AF"
                  style={styles.textInput}
                  keyboardType="numeric"
                />
                <TouchableOpacity
                  onPress={handleBarcodeSubmit}
                  disabled={!barcode.trim()}
                  style={[
                    styles.searchButton,
                    !barcode.trim() && styles.searchButtonDisabled
                  ]}
                  activeOpacity={0.8}
                >
                  <Search size={20} color="white" />
                </TouchableOpacity>
              </View>
              
              <Text style={styles.inputHint}>
                Enter the barcode number from any food product
              </Text>
            </View>
          </View>

          {/* Manual Input */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>✍️ Manual Input</Text>
            <View style={styles.inputCard}>
              <View style={styles.inputHeader}>
                <Search size={20} color="#F59E0B" />
                <Text style={styles.inputTitle}>Search Food Database</Text>
              </View>
              
              <View style={styles.inputRow}>
                <TextInput
                  value={manualInput}
                  onChangeText={setManualInput}
                  placeholder="Enter food name"
                  placeholderTextColor="#9CA3AF"
                  style={styles.textInput}
                />
                <TouchableOpacity
                  onPress={handleManualSubmit}
                  disabled={!manualInput.trim()}
                  style={[
                    styles.searchButton,
                    { backgroundColor: '#F59E0B' },
                    !manualInput.trim() && styles.searchButtonDisabled
                  ]}
                  activeOpacity={0.8}
                >
                  <Search size={20} color="white" />
                </TouchableOpacity>
              </View>
              
              <Text style={styles.inputHint}>
                Search our database for common foods
              </Text>
            </View>
          </View>

          {/* Recent Scans */}
          {recentScans.length > 0 && (
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Recent Scans</Text>
                <TouchableOpacity style={styles.viewAllButton}>
                  <Text style={styles.viewAllText}>View All</Text>
                  <ArrowRight size={16} color="#059669" />
                </TouchableOpacity>
              </View>
              
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {recentScans.slice(0, 5).map((food, index) => (
                  <TouchableOpacity
                    key={food.id}
                    style={styles.recentScanCard}
                    activeOpacity={0.8}
                  >
                    <Text style={styles.foodName} numberOfLines={1}>
                      {food.name}
                    </Text>
                    <Text style={styles.foodDate}>
                      {food.formattedDate}
                    </Text>
                    <View style={styles.scoreSection}>
                      <View 
                        style={[
                          styles.scoreDot,
                          { 
                            backgroundColor: food.nutritionScore >= 80 ? '#10B981' : 
                                          food.nutritionScore >= 60 ? '#F59E0B' : '#EF4444' 
                          }
                        ]}
                      />
                      <Text style={styles.scoreText}>
                        Score: {food.nutritionScore}
                      </Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          )}

          {/* Quick Tips */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>💡 Quick Tips</Text>
            <View style={styles.tipsCard}>
              <View style={styles.tipsList}>
                <Text style={styles.tipText}>
                  • 📸 Take clear, well-lit photos for best results
                </Text>
                <Text style={styles.tipText}>
                  • 📊 Barcode scanning provides the most accurate data
                </Text>
                <Text style={styles.tipText}>
                  • 🔍 Use manual search for homemade or restaurant foods
                </Text>
                <Text style={styles.tipText}>
                  • ⚠️ Always check allergen warnings before consuming
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 32,
    gap: 16,
  },
  header: {
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#059669',
    fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif',
    marginBottom: 4,
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 16,
    color: '#64748b',
    fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif',
    textAlign: 'center',
    fontWeight: '500',
    letterSpacing: 0.2,
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#059669',
    marginBottom: 12,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewAllText: {
    fontSize: 14,
    color: '#059669',
    fontWeight: '600',
    marginRight: 4,
  },
  inputCard: {
    backgroundColor: 'rgba(255,255,255,0.97)',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#a7f3d0',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: Platform.OS === 'ios' ? 0.10 : 0.13,
    shadowRadius: 6,
    elevation: 3,
  },
  inputHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  inputTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginLeft: 8,
  },
  inputRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 8,
  },
  textInput: {
    flex: 1,
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#111827',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  searchButton: {
    backgroundColor: '#059669',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchButtonDisabled: {
    backgroundColor: '#d1d5db',
  },
  inputHint: {
    fontSize: 12,
    color: '#64748b',
  },
  recentScanCard: {
    backgroundColor: 'rgba(255,255,255,0.97)',
    borderRadius: 12,
    padding: 12,
    marginRight: 12,
    minWidth: 120,
    shadowColor: '#a7f3d0',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: Platform.OS === 'ios' ? 0.10 : 0.13,
    shadowRadius: 6,
    elevation: 3,
  },
  foodName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  foodDate: {
    fontSize: 12,
    color: '#64748b',
    marginBottom: 8,
  },
  scoreSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  scoreDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  scoreText: {
    fontSize: 12,
    color: '#64748b',
  },
  tipsCard: {
    backgroundColor: 'rgba(255,255,255,0.97)',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#a7f3d0',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: Platform.OS === 'ios' ? 0.10 : 0.13,
    shadowRadius: 6,
    elevation: 3,
  },
  tipsList: {
    gap: 8,
  },
  tipText: {
    fontSize: 14,
    color: '#374151',
    lineHeight: 20,
  },
}); 