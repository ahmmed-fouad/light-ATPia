import { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  Modal,
  StyleSheet,
  Platform,
} from 'react-native';
import { useRouter, usePathname } from 'expo-router';
import {
  Bot,
  MessageCircle,
  ScanBarcode,
  Activity,
  TrendingUp,
  Repeat,
  ClipboardList,
  BarChart2,
  Utensils,
  Calculator,
  BookOpen,
  ShoppingCart,
  Users,
  MessageSquare,
  Star,
  MessageCircleMore,
  Menu,
  ChevronRight,
} from 'lucide-react-native';

interface MenuDropdownProps {
  isVisible: boolean;
  onClose: () => void;
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

const categories = [
  {
    key: 'ai',
    label: 'AI',
    icon: <Bot size={25} color="#6366f1" />,
    items: [
      { key: 'chatbot', label: 'AI Chatbot', icon: <MessageCircle size={22} color="#6366f1" />, route: '/(main)/(ai)/chatbot' },
      { key: 'foodscanner', label: 'Food Scanner', icon: <ScanBarcode size={22} color="#6366f1" />, route: '/(main)/(ai)/food-scanner/food-scanner' },
    ],
  },
  {
    key: 'tracking',
    label: 'Tracking',
    icon: <Activity size={25} color="#06b6d4" />,
    items: [
      { key: 'progress', label: 'Progress', icon: <TrendingUp size={22} color="#06b6d4" />, route: '/(main)/(tracking)/tracker' },
      { key: 'habits', label: 'Habits', icon: <Repeat size={22} color="#06b6d4" />, route: '/(main)/(tracking)/habits' },
      { key: 'form', label: 'Form', icon: <ClipboardList size={22} color="#06b6d4" />, route: '/(main)/(tracking)/form' },
      { key: 'analytics', label: 'Analytics', icon: <BarChart2 size={22} color="#06b6d4" />, route: '/(main)/(tracking)/analytics' },
    ],
  },
  {
    key: 'nutrition',
    label: 'Nutrition',
    icon: <Utensils size={25} color="#f59e42" />,
    items: [
      { key: 'calculator', label: 'Calculator', icon: <Calculator size={22} color="#f59e42" />, route: '/(main)/(nutration)/diet-calculator' },
      { key: 'mealplans', label: 'Meal Plans', icon: <BookOpen size={22} color="#f59e42" />, route: '/(main)/(nutration)/meal-plans' },
      { key: 'recipes', label: 'Recipes', icon: <BookOpen size={22} color="#f59e42" />, route: '/(main)/(nutration)/recipes' },
      { key: 'grocerylist', label: 'Grocery List', icon: <ShoppingCart size={22} color="#f59e42" />, route: '/(main)/(nutration)/grocery-list' },
    ],
  },
  {
    key: 'social',
    label: 'Social',
    icon: <Users size={25} color="#10b981" />,
    items: [
      { key: 'forum', label: 'Forum', icon: <MessageSquare size={22} color="#10b981" />, route: '/(main)/(social)/forum' },
      { key: 'blog', label: 'Blog', icon: <MessageCircleMore size={22} color="#10b981" />, route: '/(main)/(social)/blog' },
      { key: 'testimonials', label: 'Testimonials', icon: <Star size={22} color="#10b981" />, route: '/(main)/(social)/testimonials' },
      { key: 'chat', label: 'Chat', icon: <MessageCircle size={22} color="#10b981" />, route: '/(main)/(social)/chat' },
    ],
  },
];

const MenuDropdown: React.FC<MenuDropdownProps> = ({ isVisible, onClose }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [animation] = useState(new Animated.Value(0));
  const [scaleAnimation] = useState(new Animated.Value(0.95));
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const handleNavigation = (route: any) => {
    onClose();
    router.push(route);
  };

  // Only highlight the item whose route matches the current pathname (partial match for nested routes)
  const isActiveItem = (route: string) => pathname.startsWith(route);

  const handleCategoryPress = (key: string) => {
    setExpandedCategory(expandedCategory === key ? null : key);
  };

  useEffect(() => {
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
            <Text style={styles.headerText}>Explore</Text>
          </View>
          {categories.map((cat, idx) => (
            <View key={cat.key} style={styles.categorySection}>
              <TouchableOpacity
                style={styles.categoryRow}
                onPress={() => handleCategoryPress(cat.key)}
                activeOpacity={0.7}
              >
                <View style={[styles.categoryIconCircle, { backgroundColor: getCategoryBg(cat.key) }]}>{cat.icon}</View>
                <Text style={styles.categoryLabel}>{cat.label}</Text>
                <ChevronRight
                  size={20}
                  color="#64748b"
                  style={{
                    marginLeft: 'auto',
                    transform: [{ rotate: expandedCategory === cat.key ? '90deg' : '0deg' }],
                  }}
                />
              </TouchableOpacity>
              {expandedCategory === cat.key && (
                <View style={styles.subItemsList}>
                  {cat.items.map((item) => {
                    const isActive = isActiveItem(item.route);
                    return (
                      <TouchableOpacity 
                        key={item.key} 
                        style={[
                          styles.subItem,
                          isActive && styles.activeSubItem
                        ]} 
                        activeOpacity={0.7}
                        onPress={() => handleNavigation(item.route)}
                      >
                        <View style={[
                          styles.subItemIconCircle,
                          isActive && styles.activeSubItemIconCircle
                        ]}>
                          {item.icon}
                        </View>
                        <Text style={[
                          styles.subItemLabel,
                          isActive && styles.activeSubItemLabel
                        ]}>
                          {item.label}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              )}
              {idx !== categories.length - 1 && <View style={styles.divider} />}
            </View>
          ))}
          <View style={styles.footer}>
            <Text style={styles.footerText}>Tap outside to close</Text>
          </View>
        </Animated.View>
      </TouchableOpacity>
    </Modal>
  );
};

function getCategoryBg(key: string) {
  switch (key) {
    case 'ai': return '#e0e7ff';
    case 'tracking': return '#cffafe';
    case 'nutrition': return '#fef3c7';
    case 'social': return '#d1fae5';
    default: return '#f3f4f6';
  }
}

const styles = StyleSheet.create({
  dropdown: {
    position: "absolute",
    top: 95,
    right: 5,
    minWidth: 200,
    backgroundColor: "#173430",
    borderRadius: 16,
    borderTopRightRadius: 0,
    overflow: "hidden",

  },
  header: {
    paddingVertical: 4,
    paddingHorizontal: 12,
    backgroundColor: "#173430",
    borderTopLeftRadius: 0,
    borderTopRightRadius: 18,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
    marginBottom: 6,
  },
  headerText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#d4dbd4",
    letterSpacing: 0.2,
  },
  categorySection: {
    backgroundColor: "#173430",
  },
  categoryRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 4,
    paddingBottom: 10,
  },
  categoryIconCircle: {
    width: 25,
    height: 25,
    borderRadius: 19,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  categoryLabel: {
    fontSize: 16,
    color: "#d4dbd4",
    fontWeight: "700",
  },
  subItemsList: {
    marginLeft: 60,
  },
  subItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 5,
    paddingHorizontal: 0,
    borderRadius: 10,
    marginBottom: 2,
  },
  subItemIconCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#22C55E",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  subItemLabel: {
    fontSize: 15,
    color: "#d4dbd4",
    fontWeight: "600",
  },
  activeSubItem: {
    paddingVertical: 8,
    paddingHorizontal: 4,
    borderRadius: 12,
    backgroundColor: "#22C55E",
    borderBottomWidth: 2,
    borderBottomColor: "#6366f1",
    marginBottom: 4,
  },
  activeSubItemIconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#22C55E",
  },
  activeSubItemLabel: {
    fontSize: 16,
    color: "#d4dbd4",
    fontWeight: "700",
  },
  divider: {
    height: 1,
    backgroundColor: "#22C55E",
    marginHorizontal: 24,
    marginVertical: 6,
    marginBottom: 10,
  },
  footer: {
    backgroundColor: "#173430",
    paddingVertical: 1,
    alignItems: "center",
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 18,
  },
  footerText: {
    color: "#d4dbd4",
    fontSize: 13,
    fontWeight: "500",
  },
});

export default MenuDropdown; 