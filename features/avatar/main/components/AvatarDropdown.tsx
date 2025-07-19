import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  Modal,
  StyleSheet,
  Platform,
} from 'react-native';
import {
  User,
  HelpCircle,
  CreditCard,
  Shield,
  LogIn,
  LogOut,
  UserPlus,
} from 'lucide-react-native';
import { useRouter } from 'expo-router';

interface AvatarDropdownProps {
  isVisible: boolean;
  onClose: () => void;
  // Optionally, you could pass user state to determine log in/out/sign up
}

const CARD_BG = '#fff';
const SHADOW = Platform.OS === 'ios' ? {
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 8 },
  shadowOpacity: 0.15,
  shadowRadius: 16,
} : {
  elevation: 12,
};

const menuItems = [
  {
    key: 'profile',
    label: 'Profile',
    icon: <User size={25} color="#6366f1" />,
    route: '/(main)/(avatar)/profile',
  },
  {
    key: 'faq',
    label: 'FAQ',
    icon: <HelpCircle size={25} color="#06b6d4" />,
    route: '/(main)/(avatar)/faq',
  },
  {
    key: 'plans',
    label: 'Plans & Pricing',
    icon: <CreditCard size={25} color="#f59e42" />,
    route: '/(main)/(avatar)/pricing',
  },
  {
    key: 'admin',
    label: 'Admin',
    icon: <Shield size={25} color="#10b981" />,
    route: '/(main)/(avatar)/admin',
  },
  {
    key: 'auth',
    label: 'Log in / Log out / Sign up',
    icon: <LogIn size={25} color="#64748b" />,
    route: '/(auth)/login', // Change this to your actual auth route if needed
  },
];

const AvatarDropdown: React.FC<AvatarDropdownProps> = ({ isVisible, onClose }) => {
  const [animation] = useState(new Animated.Value(0));
  const [scaleAnimation] = useState(new Animated.Value(0.95));
  const router = useRouter();

  React.useEffect(() => {
    if (isVisible) {
      Animated.parallel([
        Animated.timing(animation, {
          toValue: 1,
          duration: 180,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnimation, {
          toValue: 1,
          tension: 120,
          friction: 10,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(animation, {
          toValue: 0,
          duration: 120,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnimation, {
          toValue: 0.95,
          duration: 120,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <Modal
      transparent
      visible={isVisible}
      animationType="none"
      onRequestClose={onClose}
    >
      <TouchableOpacity
        style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.18)' }}
        activeOpacity={1}
        onPress={onClose}
      >
        <Animated.View
          style={[
            styles.dropdown,
            SHADOW,
            {
              opacity: animation,
              transform: [
                { scale: scaleAnimation },
                { translateY: animation.interpolate({ inputRange: [0, 1], outputRange: [-16, 0] }) },
              ],
            },
          ]}
        >
          <View style={styles.header}>
            <Text style={styles.headerText}>Account</Text>
          </View>
          {menuItems.map((item, idx) => (
            <TouchableOpacity
              key={item.key}
              style={[
                styles.menuItem,
                idx === menuItems.length - 1 && { borderBottomWidth: 0 },
              ]}
              activeOpacity={0.7}
              onPress={() => {
                onClose();
                if (item.route) router.push(item.route as any);
              }}
            >
              <View style={styles.iconCircle}>{item.icon}</View>
              <Text style={styles.menuLabel}>{item.label}</Text>
            </TouchableOpacity>
          ))}
          <View style={styles.footer}>
            <Text style={styles.footerText}>Tap outside to close</Text>
          </View>
        </Animated.View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  dropdown: {
    position: 'absolute',
    top: 60,
    left: 8,
    minWidth: 260,
    backgroundColor: CARD_BG,
    borderRadius: 18,
    overflow: 'hidden',
  },
  header: {
    paddingVertical: 5,
    paddingHorizontal: 22,
    backgroundColor: '#f1f5f9',
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  headerText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#334155',
    letterSpacing: 0.2,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 22,
    backgroundColor: CARD_BG,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 17,
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  menuLabel: {
    fontSize: 18,
    color: '#334155',
    fontWeight: '600',
  },
  footer: {
    backgroundColor: '#f9fafb',
    paddingVertical: 6,
    alignItems: 'center',
    borderBottomLeftRadius: 18,
    borderBottomRightRadius: 18,
  },
  footerText: {
    color: '#94a3b8',
    fontSize: 13,
    fontWeight: '500',
  },
});

export default AvatarDropdown; 