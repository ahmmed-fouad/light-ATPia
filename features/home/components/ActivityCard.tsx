import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';

interface ActivityCardProps {
  activitiesCount: number;
  totalBurnt: number;
  onPress?: () => void;
}

const ActivityCard: React.FC<ActivityCardProps> = ({ activitiesCount, totalBurnt, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      <Feather name="activity" size={28} color="#222" style={styles.icon} />
      <View style={styles.info}>
        <Text style={styles.label}>Activities</Text>
        <View
          style={styles.countContainer}
        >
          <Text style={styles.count}>{activitiesCount}</Text>
          <Text style={{ fontSize: 15, color: "#6b7280", fontWeight: "700" }}>
            Activities
          </Text>
        </View>
      </View>
      <Text style={styles.burnt}>-{totalBurnt}</Text>
      <Text style={{ fontSize: 15, color: "#6b7280", fontWeight: "700" }}>
        kcal burnt
      </Text>
      <Feather
        name="chevron-right"
        size={25}
        color="#22C55E"
        style={styles.chevron}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f7f7f7",
    borderRadius: 16,
    padding: 14,
    marginHorizontal: 17,
    // marginVertical: 10,
    paddingVertical: 30,
    shadowColor: "#000",
    shadowOpacity: 0.03,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
  icon: {
    marginRight: 12,
  },
  info: {
    flex: 1,
  },
  label: {
    fontSize: 18,
    fontWeight: "700",
    color: "#12281D",
    marginBottom: 2,
  },
  count: {
    fontSize: 16,
    color: "#12281D",
    fontWeight: "700",
  },
  burnt: {
    fontSize: 15,
    color: "#EF4444",
    fontWeight: "700",
    marginRight: 8,
  },
  chevron: {
    marginLeft: 4,
  },
  countContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
});

export default ActivityCard; 