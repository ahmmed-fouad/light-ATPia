import BottomNavBar from "@/components/BottomNavBar";
import { images } from "@/constans";
import { ChatDrawer } from "@/features/ai/chatbot/components/drawer/ChatDrawer";
import { ChatService } from "@/features/ai/chatbot/services/chatService";
import { useChatStore } from "@/features/ai/chatbot/stores/chatStore";
import { useHomeData } from "@/features/home/hooks/useHomeData";
import MenuDropdown from "@/features/menu/components/MenuDropdown";
import { useMenuDropdown } from "@/features/menu/hooks";
import { NotificationsDropdown } from "@/features/notifications/components/NotificationsDropdown";
import { useNotificationsDropdown } from "@/features/notifications/hooks";
import UserProfileDropdown from "@/features/user-profile/components/UserProfileDropdown";
import { useScrollToHide } from "@/hooks/useScrollToHide";
import { FontAwesome5 } from "@expo/vector-icons";
import { Slot, usePathname, useRouter } from "expo-router";
import { ChevronLeft, ChevronRight } from "lucide-react-native";
import { createContext, useContext, useState } from "react";
import { Animated, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Create context for scroll state
const ScrollContext = createContext<{
  handleScroll: (event: any) => void;
  topBarAnimation: Animated.Value;
  isTopBarVisible: boolean;
} | null>(null);

export const useScrollContext = () => {
  const context = useContext(ScrollContext);
  if (!context) {
    throw new Error('useScrollContext must be used within a ScrollProvider');
  }
  return context;
};

const MainLayout = () => {
  const router = useRouter();
  const pathname = usePathname();
  const addChat = useChatStore((state) => state.addChat);
  const deleteChat = useChatStore((state) => state.deleteChat);
  const chats = useChatStore((state) => state.chats);

  // Use scroll hook
  const { handleScroll, topBarAnimation, isTopBarVisible } = useScrollToHide();

  // Toggle state for icons
  const [isIconsExpanded, setIsIconsExpanded] = useState(false);
  const [iconsAnimation] = useState(new Animated.Value(0));
  const [chevronRotation] = useState(new Animated.Value(0));
  const [logoRotation] = useState(new Animated.Value(0));
  const [logoRotationDirection, setLogoRotationDirection] = useState(0);
  const [logoChevronRotation] = useState(new Animated.Value(0));
  const [logoIndependentRotation] = useState(new Animated.Value(0));

  // User profile dropdown state
  const [isProfileDropdownVisible, setIsProfileDropdownVisible] = useState(false);

  // Handle profile dropdown toggle
  const toggleProfileDropdown = () => {
    setIsProfileDropdownVisible(!isProfileDropdownVisible);
  };

  // Handle profile menu item press
  const handleProfileMenuItemPress = (menuItem: string) => {
    // Add navigation logic here
    switch (menuItem) {
      case "profile":
        router.push("/(main)/profile" as any);
        break;
      case "settings":
        router.push("/(main)/settings" as any);
        break;
      case "faq":
        router.push("/(main)/faq" as any);
        break;
      case "pricing":
        router.push("/(main)/pricing" as any);
        break;
      case "auth":
        router.push("/(auth)/login" as any);
        break;
    }
  };

  // Toggle icons function
  const toggleIcons = () => {
    const toValue = isIconsExpanded ? 0 : 1;
    setIsIconsExpanded(!isIconsExpanded);

    // Animate icons container
    Animated.timing(iconsAnimation, {
      toValue,
      duration: 200,
      useNativeDriver: false,
    }).start();

    // Animate chevron rotation (360° clockwise)
    Animated.timing(chevronRotation, {
      toValue: isIconsExpanded ? 0 : 1,
      duration: 100,
      useNativeDriver: true,
    }).start();

    // Animate logo rotation (360° clockwise when chevron is pressed)
    Animated.timing(logoChevronRotation, {
      toValue: isIconsExpanded ? 0 : 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  // Rotate logo function (independent logo rotation)
  const rotateLogo = () => {
    const newDirection = logoRotationDirection === 0 ? 1 : 0;
    setLogoRotationDirection(newDirection);

    Animated.timing(logoIndependentRotation, {
      toValue: newDirection,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  // Simplified navigation mapping for Version 1
  const tabRoutes = {
    home: "/(main)/home",
    ai: "/(main)/(ai)/chatbot",
    tracking: "/(main)/(tracking)/tracker",
    nutrition: "/(main)/(nutrition)/personal-program",
  } as const;

  // Determine active tab based on current route
  const getActiveTab = () => {
    const screenToTab = {
      "/home": "home",
      "/chatbot": "ai",
      "/tracker": "tracking",
      "/habits": "tracking",
      "/days-meals": "nutrition",
      "/breakfast": "nutrition",
      "/lunch": "nutrition",
      "/diner": "nutrition",
      "/personal-program": "nutrition",
    };

    for (const [screen, tab] of Object.entries(screenToTab)) {
      if (pathname.includes(screen)) return tab;
    }

    return "home"; // default to home
  };

  const activeTab = getActiveTab();
  const isHomeScreen = activeTab === "home";

  // Simplified drawer navigation handlers
  const handleNewChat = () => {
    const newChat = ChatService.createNewChat();
    addChat(newChat);
    router.push(`/(main)/(ai)/chatbot/(chat)/${newChat.id}` as any);
  };

  const handleSelectChat = (chatId: string) => {
    router.push(`/(main)/(ai)/chatbot/(chat)/${chatId}` as any);
  };

  const handleSelectSection = (section: "chats" | "library" | "explore") => {
    if (section === "library")
      router.push("/(main)/(ai)/chatbot/library" as any);
    else if (section === "explore")
      router.push("/(main)/(ai)/chatbot/explore" as any);
  };

  const handleDeleteChat = (chatId: string) => {
    deleteChat(chatId);
    if (pathname.includes(`/ai/(chat)/${chatId}`)) {
      router.push("/(main)/(ai)/chatbot" as any);
    }
  };

  const handleDeleteAllChats = () => {
    chats.forEach((chat) => {
      deleteChat(chat.id);
    });
    router.push("/(main)/(ai)/chatbot" as any);
  };

  const handleTabPress = (tab: string) => {
    const route = tabRoutes[tab as keyof typeof tabRoutes];
    router.push(route as any);
  };

  const { homeData, loading } = useHomeData();

  // Notifications dropdown hook
  const {
    isDropdownVisible: isNotificationsDropdownVisible,
    toggleDropdown: toggleNotificationsDropdown,
    closeDropdown: closeNotificationsDropdown,
  } = useNotificationsDropdown();

  // Menu dropdown hook
  const {
    isDropdownVisible: isMenuDropdownVisible,
    toggleDropdown: toggleMenuDropdown,
    closeDropdown: closeMenuDropdown,
  } = useMenuDropdown();

  return (
    <ScrollContext.Provider
      value={{ handleScroll, topBarAnimation, isTopBarVisible }}
    >
      <SafeAreaView className="flex-1 bg-white">
        {/* Screen Content - Full Screen */}
        <View className="flex-1">
          <Slot />
        </View>

        {/* Animated Top Bar - Absolute Positioned */}
        <Animated.View
          style={[
            styles.topBar,
            {
              transform: [{ translateY: topBarAnimation }],
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              zIndex: 1000,
            },
          ]}
        >
          <View className="flex-row items-center space-x-3">
            {/* User Profile Section */}
            <TouchableOpacity
              onPress={toggleProfileDropdown}
              style={styles.userProfileContainer}
            >
              <View className="flex-row items-center">
                <Image
                  style={{ width: 60, height: 60, borderRadius: 100 }}
                  source={{ uri: homeData?.user.avatarUrl }}
                  resizeMode="contain"
                />
                <Text className="text-gray-500 ml-2 text-xl font-bold">
                  User
                </Text>
                <FontAwesome5
                  name="chevron-down"
                  size={16}
                  color="#374151"
                  style={{ marginLeft: 8 }}
                />
              </View>
            </TouchableOpacity>
          </View>

          {/* Animated Icons Container */}
          <Animated.View
            style={[
              styles.topBarRight,
              {
                width: iconsAnimation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [75, 200], // Collapsed vs expanded width
                }),
                overflow: "hidden",
              },
            ]}
          >
            {/* Toggle Button */}
            <TouchableOpacity onPress={toggleIcons} style={styles.toggleButton}>
              <Animated.View
                style={{
                  transform: [
                    {
                      rotate: chevronRotation.interpolate({
                        inputRange: [0, 1],
                        outputRange: ["0deg", "180deg"],
                      }),
                    },
                  ],
                }}
              >
                {isIconsExpanded ? (
                  <ChevronRight size={25} color="#22C55E" />
                ) : (
                  <ChevronLeft size={25} color="#22C55E" />
                )}
              </Animated.View>
            </TouchableOpacity>

            {/* Icons Container */}
            {isIconsExpanded && (
              <Animated.View
                style={[
                  styles.iconsContainer,
                  {
                    opacity: iconsAnimation,
                    transform: [
                      {
                        translateX: iconsAnimation.interpolate({
                          inputRange: [0, 1],
                          outputRange: [-50, 0], // Slide from left
                        }),
                      },
                    ],
                  },
                ]}
              >
                <TouchableOpacity onPress={() => {}}>
                  <FontAwesome5 name="calendar-alt" size={24} color="#22C55E" />
                </TouchableOpacity>

                {/* bell */}
                <TouchableOpacity onPress={toggleNotificationsDropdown}>
                  <FontAwesome5 name="bell" size={25} color="#22C55E" />
                </TouchableOpacity>

                {/* menu */}
                <TouchableOpacity onPress={toggleMenuDropdown}>
                  <FontAwesome5 name="bars" size={25} color="#22C55E" />
                </TouchableOpacity>
              </Animated.View>
            )}
            <Animated.View
              style={{
                transform: [
                  {
                    rotate: logoChevronRotation.interpolate({
                      inputRange: [0, 1],
                      outputRange: ["0deg", "360deg"],
                    }),
                  },
                  {
                    rotate: logoIndependentRotation.interpolate({
                      inputRange: [0, 1],
                      outputRange: ["0deg", "180deg"],
                    }),
                  },
                ],
                position: "absolute",
                right: 0,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <TouchableOpacity
                onPress={rotateLogo}
                style={styles.logoContainer}
              >
                <Image
                  source={images.ATPiaLogo}
                  style={{ width: 60, height: 60 }}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </Animated.View>
          </Animated.View>
        </Animated.View>

        {/* Chat Drawer */}
        <ChatDrawer
          onNewChat={handleNewChat}
          onSelectChat={handleSelectChat}
          onSelectSection={handleSelectSection}
          onProfilePress={() => {}}
          onSettingsPress={() => {}}
          onDeleteChat={handleDeleteChat}
          onDeleteAllChats={handleDeleteAllChats}
        />

        {/* User Profile Dropdown */}
        <UserProfileDropdown
          isVisible={isProfileDropdownVisible}
          onClose={() => setIsProfileDropdownVisible(false)}
          onMenuItemPress={handleProfileMenuItemPress}
        />

        {/* Notifications Dropdown */}
        <NotificationsDropdown
          isVisible={isNotificationsDropdownVisible}
          onClose={closeNotificationsDropdown}
        />

        {/* Menu Dropdown */}
        <MenuDropdown
          isVisible={isMenuDropdownVisible}
          onClose={closeMenuDropdown}
        />

        {/* Simplified Bottom Bar */}
        <BottomNavBar activeTab={activeTab} onTabPress={handleTabPress} />
      </SafeAreaView>
    </ScrollContext.Provider>
  );
};

const styles = StyleSheet.create({
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: "#f7f7f7",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    height: 80, // Fixed height for consistent animation
    marginTop: 60,
  },
  topBarRight: {
    minWidth: 85,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#173430",
    borderRadius: 30,
    paddingLeft: 4,
    position: 'relative',
  },
  toggleButton: {
    height: 60,
    alignItems: "center",
    justifyContent: "center",
  },
  iconsContainer: {
    flexDirection: "row",
    gap: 20,
    alignItems: "center",
    paddingLeft: 5,
    paddingRight: 80, // Give space for the logo
  },
  logoContainer: {
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  userProfileContainer: {
    paddingHorizontal: 5,
  },
});

export default MainLayout; 