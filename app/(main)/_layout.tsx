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
import { createContext, useContext, useRef, useState } from "react";
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
  const [isProfileExpanded, setIsProfileExpanded] = useState(false);
  const avatarRotation = useRef(new Animated.Value(0)).current;

  const toggleProfile = () => {
    const next = !isProfileExpanded;
    setIsProfileExpanded(next);
    Animated.timing(avatarRotation, {
      toValue: next ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
    setIsProfileDropdownVisible(next);
  };

  const avatarSpin = avatarRotation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

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
      duration: 300,
      useNativeDriver: false,
    }).start();

    // Animate chevron rotation (360° clockwise)
    Animated.timing(chevronRotation, {
      toValue: isIconsExpanded ? 0 : 1,
      duration: 300,
      useNativeDriver: true,
    }).start();

    // Animate logo rotation (360° clockwise when chevron is pressed)
    Animated.timing(logoChevronRotation, {
      toValue: isIconsExpanded ? 0 : 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  // Rotate logo function (independent logo rotation)
  const rotateLogo = () => {
    const newDirection = logoRotationDirection === 0 ? 1 : 0;
    setLogoRotationDirection(newDirection);

    Animated.timing(logoIndependentRotation, {
      toValue: newDirection,
      duration: 300,
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
              onPress={toggleProfile}
              activeOpacity={0.8}
              style={[
                styles.userProfileContainer,
                { flexDirection: 'row', alignItems: 'center', paddingRight: 8, paddingLeft: 0, minWidth: 85, maxWidth: isProfileExpanded ? 180 : 60 }
              ]}
            >
              <Animated.Image
                source={{ uri: homeData?.user.avatarUrl }}
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: 100,
                  transform: [{ rotate: avatarSpin }],
                }}
                resizeMode="contain"
              />
              {isProfileExpanded && (
                <Text style={{ color: "#fff", fontSize: 16, fontWeight: "bold", marginLeft: 8 }}>
                  User
                </Text>
              )}
              <FontAwesome5
                name={isProfileExpanded ? "chevron-down" : "chevron-right"}
                size={16}
                color="#fff"
                style={{ paddingHorizontal: 8, paddingTop: 3 }}
              />
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
                  <ChevronRight size={25} color="#fff" />
                ) : (
                  <ChevronLeft size={25} color="#fff" />
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
                  <FontAwesome5 name="calendar-alt" size={24} color="#bce2bd" />
                </TouchableOpacity>

                {/* bell */}
                <TouchableOpacity onPress={toggleNotificationsDropdown}>
                  <FontAwesome5 name="bell" size={25} color="#bce2bd" />
                </TouchableOpacity>

                {/* menu */}
                <TouchableOpacity onPress={toggleMenuDropdown}>
                  <FontAwesome5 name="bars" size={25} color="#bce2bd" />
                </TouchableOpacity>
              </Animated.View>
            )}
            <TouchableOpacity
              onPress={toggleIcons}
              style={{ flexDirection: 'row', alignItems: 'center', position: 'absolute', right: 0 }}
            >
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
                  marginRight: 4,
                }}
              >
              </Animated.View>
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
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Image
                  source={images.ATPiaLogo}
                  style={{ width: 60, height: 60}}
                  resizeMode="contain"
                />
              </Animated.View>
            </TouchableOpacity>
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
          onClose={() => {
            setIsProfileDropdownVisible(false);
            setIsProfileExpanded(false);
            Animated.timing(avatarRotation, {
              toValue: 0,
              duration: 300,
              useNativeDriver: true,
            }).start();
          }}
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
    backgroundColor: "#ebf6d6",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 2,
    height: 80, // Fixed height for consistent animation
    marginTop: 50,
  },
  topBarRight: {
    minWidth: 85,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#13332B",
    borderRadius: 30,
    paddingLeft: 2,
    position: "relative",
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
    paddingRight: 120,
    marginRight: 52,
  },
  logoContainer: {
    width: 60,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
  },
  userProfileContainer: {
    // paddingLeft: 5,
    backgroundColor: "#13332B",
    borderRadius: 30,
    // padding: 10,
    // marginRight: 10,
  },
});

export default MainLayout; 