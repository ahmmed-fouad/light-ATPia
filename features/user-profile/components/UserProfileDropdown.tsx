import { FontAwesome5 } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Animated, StyleSheet, Text, TouchableOpacity } from 'react-native';

interface UserProfileDropdownProps {
  isVisible: boolean;
  onClose: () => void;
  onMenuItemPress: (menuItem: string) => void;
}

const UserProfileDropdown: React.FC<UserProfileDropdownProps> = ({
  isVisible,
  onClose,
  onMenuItemPress,
}) => {
  const [animation] = useState(new Animated.Value(0));

  React.useEffect(() => {
    Animated.timing(animation, {
      toValue: isVisible ? 1 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [isVisible]);

  const menuItems = [
    // { id: 'profile', label: 'Profile', icon: 'user' },
    { id: 'settings', label: 'Settings', icon: 'cog' },
    { id: 'faq', label: 'FAQ', icon: 'question-circle' },
    { id: 'pricing', label: 'Plan & Pricing', icon: 'credit-card' },
    { id: 'auth', label: 'Login/Logout', icon: 'sign-in-alt' },
  ];

  if (!isVisible) return null;

  return (
    <TouchableOpacity
      style={styles.overlay}
      onPress={onClose}
      activeOpacity={1}
    >
      <Animated.View
        style={[
          styles.dropdown,
          {
            opacity: animation,
            transform: [
              {
                translateY: animation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [-20, 0],
                }),
              },
            ],
          },
        ]}
      >
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={item.id}
            style={styles.menuItem}
            onPress={() => {
              onMenuItemPress(item.id);
              onClose();
            }}
          >
            <FontAwesome5 name={item.icon} size={22} color="#e1e8e1" />
            <Text style={styles.menuText}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    zIndex: 1001,
  },
  dropdown: {
    position: "absolute",
    top: 145,
    left: 5,
    backgroundColor: "#173430",
    borderRadius: 16,
    paddingVertical: 8,
    paddingHorizontal: 4,
    minWidth: 200,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderBottomWidth: 1,
    borderColor: "#374151",
    marginHorizontal: 4,
  },
  menuText: {
    marginLeft: 12,
    fontSize: 16,
    color: "#e1e8e1",
    fontWeight: "500",
  },
});

export default UserProfileDropdown; 