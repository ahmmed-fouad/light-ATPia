import BottomNavBar from "@/components/BottomNavBar";
import { images } from "@/constans";
import { ChatDrawer } from "@/features/ai/chatbot/components/drawer/ChatDrawer";
import { ChatService } from "@/features/ai/chatbot/services/chatService";
import { useChatStore } from "@/features/ai/chatbot/stores/chatStore";
import { useHomeData } from "@/features/home/hooks/useHomeData";
import { useScrollToHide } from "@/hooks/useScrollToHide";
import { Feather } from "@expo/vector-icons";
import { Slot, usePathname, useRouter } from "expo-router";
import { Bell, Menu } from "lucide-react-native";
import { createContext, useContext } from "react";
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

  // Simplified navigation mapping for Version 1 (including food scanner)
  const tabRoutes = {
    ai: "/(main)/(ai)/chatbot",
    "food-scanner": "/(main)/(ai)/food-scanner/food-scanner",
    tracking: "/(main)/(tracking)/tracker",
    nutrition: "/(main)/(nutrition)/diet-calculator",
    home: "/(main)/home",
  } as const;

  // Determine active tab based on current route
  const getActiveTab = () => {
    const screenToTab = {
      "/ai": "ai",
      "/food-scanner": "food-scanner",
      "/tracker": "tracking",
      "/habits": "tracking",
      "/diet-calculator": "nutrition",
      "/meal-plans": "nutrition",
      "/home": "home",
    };

    for (const [screen, tab] of Object.entries(screenToTab)) {
      if (pathname.includes(screen)) return tab;
    }

    return "ai"; // default
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
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              zIndex: 1000,
            }
          ]}
        >
          <View className="flex-row items-center space-x-3">
            {/* avatarr */}
            <View className="flex-row items-center">
              <Image
                style={{ width: 60, height: 60, borderRadius: 100 }}
                source={{ uri: homeData?.user.avatarUrl }}
                resizeMode="contain"
              />
              <Text className="text-gray-500 ml-2 text-xl font-bold">User</Text>
            </View>
          </View>
          <View style={styles.topBarRight}>
            <TouchableOpacity onPress={() => {}}>
              <Feather name="calendar" size={24} color="#374151" />
            </TouchableOpacity>

            {/* bell */}
            <TouchableOpacity>
              <Bell size={25} color="#374151" />
            </TouchableOpacity>
            {/* menu */}
            <TouchableOpacity>
              <Menu size={25} color="#374151" />
            </TouchableOpacity>

            {/* ATPiaLogo */}
            <Image
              source={images.ATPiaLogo}
              style={{ width: 60, height: 60 }}
              resizeMode="contain"
            />
          </View>
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
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    height: 80, // Fixed height for consistent animation
  },
  topBarRight: {
    flexDirection: "row",
    gap: 20,
    alignItems: "center",
    backgroundColor: "#18b888",
    // paddingVertical: 10,
    paddingLeft: 30,
    // paddingRight: 10,
    borderRadius: 30,
  },
});

export default MainLayout; 