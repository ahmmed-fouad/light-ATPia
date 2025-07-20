import { FontAwesome5 } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface ActivityCardProps {
  label: string;
  icon: string;
  onPress?: () => void;
}

const ActivityCard: React.FC<ActivityCardProps> = ({ label, icon, onPress }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'salad':
        return <FontAwesome5 name="leaf" size={34} color="#fff" />;
      case 'balance':
        return <FontAwesome5 name="balance-scale" size={34} color="#fff" />;
      case 'drink':
        return <FontAwesome5 name="wine-glass-alt" size={34} color="#fff" />;
      case 'chart':
        return <FontAwesome5 name="chart-line" size={34} color="#fff" />;
      default:
        return <FontAwesome5 name="dumbbell" size={34} color="#fff" />;
    }
  };

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      <View style={styles.iconContainer}>
        {getIcon(icon)}
      </View>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#25443f",
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    margin: 6,
    width: 140,
    height: 190,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  iconContainer: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: "#18b888",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  label: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
    textAlign: "center",
    lineHeight: 18,
  },
});

export default ActivityCard; 