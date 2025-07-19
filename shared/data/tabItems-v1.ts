import {
    Apple,
    BotMessageSquare,
    Camera,
    ChartNoAxesCombined,
    Home,
} from "lucide-react-native";

export type TabItemV1 = {
  id: "ai" | "food-scanner" | "tracking" | "nutrition" | "home";
  label: string;
  icon: React.ComponentType<{ size: number; color: string }>;
};

export type NutritionFeaturesV1 = {
  id: "diet-calculator" | "meal-plans";
  label: string;
  icon: React.ComponentType<{ size: number; color: string }>;
};

export type TrackingFeaturesV1 = {
  id: "tracker" | "habits";
  label: string;
  icon: React.ComponentType<{ size: number; color: string }>;
};

// Simplified tab items for Version 1 (including food scanner)
export const tabItemsV1: TabItemV1[] = [
  { id: "ai", label: "AI Chat", icon: BotMessageSquare },
  { id: "food-scanner", label: "Food Scanner", icon: Camera },
  { id: "tracking", label: "Tracking", icon: ChartNoAxesCombined },
  { id: "nutrition", label: "Nutrition", icon: Apple },
  { id: "home", label: "Home", icon: Home },
];

// Simplified nutrition features for Version 1
export const nutritionFeaturesV1: NutritionFeaturesV1[] = [
  { id: "diet-calculator", label: "Diet Calculator", icon: Apple },
  { id: "meal-plans", label: "Meal Plans", icon: Apple },
];

// Simplified tracking features for Version 1
export const trackingFeaturesV1: TrackingFeaturesV1[] = [
  { id: "tracker", label: "Progress Tracker", icon: ChartNoAxesCombined },
  { id: "habits", label: "Habits", icon: ChartNoAxesCombined },
]; 