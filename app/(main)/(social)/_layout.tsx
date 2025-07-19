import { Slot, usePathname, useRouter } from "expo-router";
import { View } from "react-native";
import { CustomBar } from "@/components";
import { socialFeatures } from "@/shared/data/tabItems";

const SocialLayout = () => {
  const router = useRouter();
  const pathname = usePathname();

  const getActiveTab = () => {
    if (pathname.includes("/forum")) return "forum";
    if (pathname.includes("/blog")) return "blog";
    if (pathname.includes("/testimonials")) return "testimonials";
    if (pathname.includes("/chat")) return "chat";
    return "forum"; // default
  };

  const activeTab = getActiveTab();

  const handleTabPress = (
    tabName: "forum" | "blog" | "testimonials" | "chat"
  ) => {
    router.push(`/(main)/(social)/${tabName}`);
  };

  return (
    <View className="flex-1 bg-gray-50">
      {/* CustomBar at the top */}
      <CustomBar
        tabItems={socialFeatures}
        activeTab={activeTab}
        onTabPress={handleTabPress}
        inactiveIconColor="#9ca3af"
        activeTextColor="#6366f1"
      />

      {/* Content area - child screens will render here */}
      <View className="flex-1">
        <Slot />
      </View>
    </View>
  );
};

export default SocialLayout;
