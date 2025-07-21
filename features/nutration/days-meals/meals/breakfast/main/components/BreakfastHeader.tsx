import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const BreakfastHeader = () => {
  const router = useRouter();

  const handleBackPress = () => {
    router.back();
  };

  const handleScannerPress = () => {
    // TODO: Navigate to food scanner
    console.log('Scanner pressed');
  };

  return (
    <View style={styles.container}>
        <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
          <Feather name="chevron-left" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.title}>Breakfast</Text>
      
      <TouchableOpacity style={styles.scannerButton} onPress={handleScannerPress}>
        <Feather name="camera" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingTop: 120,
    paddingBottom: 20,
    backgroundColor: "#ebf6d6",
  },
  leftSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  backButton: {
    padding: 20,
    borderRadius: 30,
    backgroundColor: "#18b888",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  title: {
    fontSize: 24,

    fontWeight: "700",
    color: "#173430",
  },
  scannerButton: {
    // width: 48,
    // height: 48,
    padding: 20,
    borderRadius: 30,
    backgroundColor: "#18b888",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#18b888",
    shadowOpacity: 0.3,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
});

export default BreakfastHeader; 