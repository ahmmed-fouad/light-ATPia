import { CustomBar } from "@/components";
import { images } from "@/constans";
import { ChatDrawer } from "@/features/ai/chatbot/components/drawer/ChatDrawer";
import { ChatService } from "@/features/ai/chatbot/services/chatService";
import { useChatStore } from "@/features/ai/chatbot/stores/chatStore";
import { SettingsDropdown } from "@/features/settings/components";
import { useSettingsDropdown } from "@/features/settings/hooks";
import { tabItems } from "@/shared/data/tabItems";
import { Slot, usePathname, useRouter } from "expo-router";
import { Bell, HomeIcon, Menu, Search, Settings } from "lucide-react-native";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AvatarDropdown } from "@/features/avatar/main/components";
import { useAvatarDropdown } from "@/features/avatar/main/hooks";
import { MenuDropdown } from "@/features/menu/components";
import { useMenuDropdown } from "@/features/menu/hooks";
import { NotificationsDropdown } from "@/features/notifications/components";
import { useNotificationsDropdown } from "@/features/notifications/hooks";

const MainLayout = () => {
  const router = useRouter();
  const pathname = usePathname();
  const addChat = useChatStore((state) => state.addChat);
  const deleteChat = useChatStore((state) => state.deleteChat);
  const chats = useChatStore((state) => state.chats);

  // Settings dropdown hook
  const {
    isDropdownVisible,
    currentLanguage,
    currentMode,
    toggleDropdown,
    closeDropdown,
    handleLanguageChange,
    handleModeChange,
    handleSettingsPress,
  } = useSettingsDropdown();

  // Avatar dropdown hook
  const {
    isDropdownVisible: isAvatarDropdownVisible,
    toggleDropdown: toggleAvatarDropdown,
    closeDropdown: closeAvatarDropdown,
  } = useAvatarDropdown();

  // Menu dropdown hook
  const {
    isDropdownVisible: isMenuDropdownVisible,
    toggleDropdown: toggleMenuDropdown,
    closeDropdown: closeMenuDropdown,
  } = useMenuDropdown();

  // Notifications dropdown hook
  const {
    isDropdownVisible: isNotificationsDropdownVisible,
    toggleDropdown: toggleNotificationsDropdown,
    closeDropdown: closeNotificationsDropdown,
  } = useNotificationsDropdown();

  // Navigation mapping - much cleaner!
  const tabRoutes = {
    ai: "/(main)/(ai)/chatbot",
    tracking: "/(main)/(tracking)/tracker",
    nutrition: "/(main)/(nutration)/diet-calculator",
    social: "/(main)/(social)/forum",
    home: "/(main)/home",
  } as const;

  // Path to tab mapping for active state
  const pathToTab = {
    "/ai": "ai",
    "/tracking": "tracking",
    "/nutration": "diet-calculator",
    "/social": "social",
    "/home": "home",
  } as const;

  // Determine active tab based on current route - CLEANER
  const getActiveTab = () => {
    // Map specific screens to their parent tabs
    const screenToTab = {
      "/ai": "ai",
      "/tracker": "tracking",
      "/habits": "tracking",
      "/analytics": "tracking",
      "/recipes": "nutrition",
      "/diet-calculator": "nutrition",
      "/meal-plans": "nutrition",
      "/grocery-list": "nutrition",
      "/forum": "social",
      "/blog": "social",
      "/testimonials": "social",
      "/chat": "social",
      "/home": "home",
    };

    for (const [screen, tab] of Object.entries(screenToTab)) {
      if (pathname.includes(screen)) return tab;
    }

    return "ai"; // default
  };

  const activeTab = getActiveTab();
  const isHomeScreen = activeTab === "home";

  const handleTabPress = (tabName: keyof typeof tabRoutes) => {
    const route = tabRoutes[tabName];
    router.push(route as any); // Fix type error for new AI route
  };

  // Drawer navigation handlers
  const handleNewChat = () => {
    const newChat = ChatService.createNewChat();
    addChat(newChat);
    router.push(`/(main)/(ai)/chatbot/(chat)/${newChat.id}` as any);
  };

  const handleSelectChat = (chatId: string) => {
    router.push(`/(main)/(ai)/chatbot/(chat)/${chatId}` as any); // Fix type error for new AI chat route
  };

  const handleSelectSection = (section: "chats" | "library" | "explore") => {
    if (section === "library")
      router.push("/(main)/(ai)/chatbot/library" as any);
    else if (section === "explore")
      router.push("/(main)/(ai)/chatbot/explore" as any);
  };

  const handleDeleteChat = (chatId: string) => {
    deleteChat(chatId);
    // If we're currently on the deleted chat, navigate to a new chat or home
    if (pathname.includes(`/ai/(chat)/${chatId}`)) {
      router.push("/(main)/(ai)/chatbot" as any);
    }
  };

  const handleDeleteAllChats = () => {
    // Delete all chats by clearing the chats array
    chats.forEach((chat) => {
      deleteChat(chat.id);
    });
    // Navigate to AI home screen
    router.push("/(main)/(ai)/chatbot" as any);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/*1st Top Bar */}
      {/* Logo & avatar*/}
      <View
        className="flex-row items-center justify-between px-4 
        py-3 bg-white border-b border-gray-200"
      >
        <View className="flex-row items-center space-x-3 justify-between bg-white">
          <View className="flex-row items-center">
            <TouchableOpacity
              onPress={toggleAvatarDropdown}
              activeOpacity={0.7}
              className="flex-row gap-2 items-center"
            >
              <Image
                source={images.avatarr}
                className="w-10 h-10"
                resizeMode="contain"
              />
              <Text className="text-gray-500 ml-2 text-xl font-bold">
                Ahmed
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View className="flex-row items-center gap-2">
          <Text className="text-gray-500 text-xl font-bold">ATPia</Text>
          <Image
            source={images.ATPiaLogo}
            className="w-10 h-10"
            resizeMode="contain"
          />
        </View>
      </View>

      {/* 2nd Top Bar */}
      <View className="flex-row items-center space-x-3 justify-between px-4  bg-white border-b border-gray-200">
        {/* Left Icons */}
        <View className="flex-row items-center space-x-3  py-3 gap-4">
          <TouchableOpacity onPress={toggleMenuDropdown}>
            <Menu size={25} color="#374151" />
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleNotificationsDropdown}>
            <Bell size={25} color="#374151" />
          </TouchableOpacity>
        </View>

        {/* Search */}
        <View className="flex-row items-center space-x-3 px-2 py-3 gap-2">
          <TouchableOpacity
            className="flex-row h-10 w-[160px] items-center
             border border-gray-300 rounded-full px-4 py-2"
          >
            <Search size={25} color="#374151" />
            <Text className="text-gray-500 ml-2 text-sm ">Search...</Text>
          </TouchableOpacity>
        </View>

        {/* Right Icons */}
        <View className="flex-row items-center space-x-3  py-3 gap-4">
          <TouchableOpacity onPress={toggleDropdown}>
            <Settings size={25} color="#374151" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleTabPress("home")}>
            <HomeIcon size={25} color={isHomeScreen ? "#3b82f6" : "#374151"} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Screen Content - Expo Router handles this automatically */}
      <View className="flex-1">
        <Slot />
      </View>

      {/* Chat Drawer as a global portal */}
      <ChatDrawer
        onNewChat={handleNewChat}
        onSelectChat={handleSelectChat}
        onSelectSection={handleSelectSection}
        onProfilePress={() => {}}
        onSettingsPress={() => {}}
        onDeleteChat={handleDeleteChat}
        onDeleteAllChats={handleDeleteAllChats}
      />

      {/* Custom Bottom Bar */}
      <CustomBar
        tabItems={tabItems}
        activeTab={isHomeScreen ? "none" : activeTab}
        onTabPress={handleTabPress}
        inactiveIconColor="#9ca3af"
        activeTextColor="#6366f1"
      />

      {/* Settings Dropdown */}
      <SettingsDropdown
        isVisible={isDropdownVisible}
        onClose={closeDropdown}
        onLanguageChange={handleLanguageChange}
        onModeChange={handleModeChange}
        onSettingsPress={handleSettingsPress}
        currentLanguage={currentLanguage}
        currentMode={currentMode}
      />

      {/* Avatar Dropdown */}
      <AvatarDropdown
        isVisible={isAvatarDropdownVisible}
        onClose={closeAvatarDropdown}
      />

      {/* Menu Dropdown */}
      <MenuDropdown
        isVisible={isMenuDropdownVisible}
        onClose={closeMenuDropdown}
      />

      {/* Notifications Dropdown */}
      <NotificationsDropdown
        isVisible={isNotificationsDropdownVisible}
        onClose={closeNotificationsDropdown}
      />
    </SafeAreaView>
  );
};

export default MainLayout;
