import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';

const TABS = [
  { key: 'home', icon: 'home' },
  { key: 'water', icon: 'droplet' },
  { key: 'chart', icon: 'pie-chart' },
  { key: 'user', icon: 'user' },
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
          style={[styles.tab, activeTab === tab.key && styles.activeTab]}
          onPress={() => onTabPress(tab.key)}
        >
          <Feather
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
    backgroundColor: "#173430",
    borderRadius: 24,
    // borderTopRightRadius: 24,
    paddingVertical: 16,
    paddingHorizontal: 16,
    marginHorizontal: 17,
    // marginBottom: 25,
    justifyContent: "space-between",
    alignItems: "center",
  },
  tab: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 6,
  },
  activeTab: {
    borderBottomWidth: 3,
    borderBottomColor: "#22C55E",
  },
});

export default BottomNavBar; 