import { FontAwesome5 } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

const TABS = [
  { key: "home", icon: "home", label: "Home" },
  { key: "ai", icon: "robot", label: "AI Chat" }, 
  { key: "nutrition", icon: "apple-alt", label: "Nutrition" },
  { key: "tracking", icon: "chart-line", label: "Tracking" },
];

interface BottomNavBarProps {
  activeTab: string;
  onTabPress: (tab: string) => void;
}

const BottomNavBar: React.FC<BottomNavBarProps> = ({ activeTab, onTabPress }) => {
  return (
    <View style={styles.container}>
      {TABS.map((tab) => (
        <TouchableOpacity
          key={tab.key}
          style={[styles.tab]}
          onPress={() => onTabPress(tab.key)}
        >
          <FontAwesome5
            name={tab.icon as any}
            size={26}
            color={activeTab === tab.key ? "#22C55E" : "#176801"}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#13332B",
    borderRadius: 24,
    paddingVertical: 16,
    paddingHorizontal: 16,
    marginHorizontal: 17,
    justifyContent: "space-between",
    alignItems: "center",
  },
  tab: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 6,
  },
});

export default BottomNavBar; 