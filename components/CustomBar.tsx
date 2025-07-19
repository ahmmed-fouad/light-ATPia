import { Text, TouchableOpacity, View } from 'react-native';

export interface TabItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ size: number; color: string }>;
}

export interface CustomBarProps<T extends string = string> {
  tabItems: TabItem[];
  activeTab: string;
  onTabPress: (tabName: T) => void;
  containerStyle?: any;
  itemStyle?: any;
  iconSize?: number;
  activeIconColor?: string;
  inactiveIconColor?: string;
  activeTextColor?: string;
  inactiveTextColor?: string;
  textStyle?: any;
}

const CustomBar = <T extends string = string>({ 
  tabItems, 
  activeTab, 
  onTabPress,
  containerStyle,
  itemStyle,
  iconSize = 28,
  activeIconColor = "#3b82f6",
  inactiveIconColor = "#6b7280",
  activeTextColor = "text-blue-500",
  inactiveTextColor = "text-gray-500",
  textStyle
}: CustomBarProps<T>) => {
  return (
    <View className={`flex-row bg-white border-t border-gray-200 py-2 ${containerStyle || ''}`}>
      {tabItems.map((item) => {
        const IconComponent = item.icon;
        return (
          <TouchableOpacity 
            key={item.id}
            className={`flex-1 items-center py-2 ${itemStyle || ''}`}
            onPress={() => onTabPress(item.id as T)}
          >
            <IconComponent 
              size={iconSize} 
              color={activeTab === item.id ? activeIconColor : inactiveIconColor} 
            />
            <Text 
              className={`text-sm mt-1 font-semibold ${
                activeTab === item.id ? activeTextColor : inactiveTextColor
              } ${textStyle || ''}`}
            >
              {item.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default CustomBar; 