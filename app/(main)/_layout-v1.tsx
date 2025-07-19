import { CustomBar } from "@/components";
import { images } from "@/constans";
import { ChatDrawer } from "@/features/ai/chatbot/components/drawer/ChatDrawer";
import { ChatService } from "@/features/ai/chatbot/services/chatService";
import { useChatStore } from "@/features/ai/chatbot/stores/chatStore";
import { tabItemsV1 } from "@/shared/data/tabItems-v1";
import { Slot, usePathname, useRouter } from "expo-router";
import { Bell, HomeIcon, Menu, Search, Settings } from "lucide-react-native";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const MainLayoutV1 = () => {
  const router = useRouter();
  const pathname = usePathname();
  const addChat = useChatStore((state) => state.addChat);
  const deleteChat = useChatStore((state) => state.deleteChat);
  const chats = useChatStore((state) => state.chats);

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

  const handleTabPress = (tabName: keyof typeof tabRoutes) => {
    const route = tabRoutes[tabName];
    router.push(route as any);
  };

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

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Simplified Top Bar */}
      <View className="flex-row items-center justify-between px-4 py-3 bg-white border-b border-gray-200">
        <View className="flex-row items-center space-x-3">
          <View className="flex-row items-center">
            <Image
              source={images.avatarr}
              className="w-10 h-10"
              resizeMode="contain"
            />
            <Text className="text-gray-500 ml-2 text-xl font-bold">
              User
            </Text>
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

      {/* Simplified Second Bar */}
      <View className="flex-row items-center justify-between px-4 py-3 bg-white border-b border-gray-200">
        <View className="flex-row items-center space-x-3 gap-4">
          <TouchableOpacity>
            <Menu size={25} color="#374151" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Bell size={25} color="#374151" />
          </TouchableOpacity>
        </View>

        <View className="flex-row items-center space-x-3 px-2 gap-2">
          <TouchableOpacity className="flex-row h-10 w-[160px] items-center border border-gray-300 rounded-full px-4 py-2">
            <Search size={25} color="#374151" />
            <Text className="text-gray-500 ml-2 text-sm">Search...</Text>
          </TouchableOpacity>
        </View>

        <View className="flex-row items-center space-x-3 gap-4">
          <TouchableOpacity>
            <Settings size={25} color="#374151" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleTabPress("home")}>
            <HomeIcon size={25} color={isHomeScreen ? "#3b82f6" : "#374151"} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Screen Content */}
      <View className="flex-1">
        <Slot />
      </View>

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
      <CustomBar
        tabItems={tabItemsV1}
        activeTab={isHomeScreen ? "none" : activeTab}
        onTabPress={handleTabPress}
        inactiveIconColor="#9ca3af"
        activeTextColor="#6366f1"
      />
    </SafeAreaView>
  );
};

export default MainLayoutV1; 