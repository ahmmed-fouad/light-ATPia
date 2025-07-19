import { Slot, usePathname, useRouter } from "expo-router";
import { View } from "react-native";
import { CustomBar } from "@/components";
import { nutritionFeatures } from "@/shared/data/tabItems";

const NutritionLayout = () => {
  const router = useRouter();
  const pathname = usePathname();

  const getActiveTab = () => {
    if (pathname.includes("/diet-calculator")) return "diet-calculator";
    if (pathname.includes("/meal-plans")) return "meal-plans";
    if (pathname.includes("/recipes")) return "recipes";
    if (pathname.includes("/grocery-list")) return "grocery-list";
    return "diet-calculator"; // default
  };

  const activeTab = getActiveTab();

  const handleTabPress = (
    tabName: "diet-calculator" | "meal-plans" | "recipes" | "grocery-list"
  ) => {
    router.push(`/(main)/(nutration)/${tabName}`);
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
