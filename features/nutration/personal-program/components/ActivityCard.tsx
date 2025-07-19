import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';

interface ActivityCardProps {
  label: string;
  icon: string;
}

const ActivityCard: React.FC<ActivityCardProps> = ({ label, icon }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'salad':
        return <Feather name="coffee" size={34} color="#fff" />;
      case 'balance':
        return <Feather name="target" size={34} color="#fff" />;
      case 'drink':
        return <Feather name="droplet" size={34} color="#fff" />;
      case 'chart':
        return <Feather name="bar-chart-2" size={34} color="#fff" />;
      default:
        return <Feather name="activity" size={34} color="#fff" />;
    }
  };

  return (
    <View style={styles.card}>
      <View style={styles.iconContainer}>
        {getIcon(icon)}
      </View>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#25443f",
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    // paddingVertical: 20,
    // paddingHorizontal: 16,
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