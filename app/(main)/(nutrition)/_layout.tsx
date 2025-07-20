import { Slot, usePathname, useRouter } from "expo-router";
import { View } from "react-native";
import { CustomBar } from "@/components";
import { nutritionFeatures } from "@/shared/data/tabItems";

const NutritionLayout = () => {
  const router = useRouter();
  const pathname = usePathname();

  const getActiveTab = () => {
    if (pathname.includes("/days-meals")) return "days-meals";
    if (pathname.includes("/personal-program")) return "personal-program";
    return "days-meals"; // default
  };

  const activeTab = getActiveTab();

  const handleTabPress = (
    tabName: "days-meals" | "personal-program"
  ) => {
    router.push(`/(main)/(nutrition)/${tabName}`);
  };

  return (
    <View className="flex-1 bg-gray-50">
      {/* CustomBar at the top */}
      <CustomBar
        tabItems={nutritionFeatures}
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

export default NutritionLayout;
