import {
  Apple,
  BotMessageSquare,
  Calculator,
  ChartNoAxesCombined,
  Camera,
  Users,
  BookOpen,
  ShoppingCart,
  Target,
  TrendingUp,
  Calendar,
  BarChart3,
  Star,
  MessageSquare,
  ForkKnife,
  
} from "lucide-react-native";

export type TabItem = {
  id: "ai" | "tracking" | "nutrition" | "social";
  label: string;
  icon: React.ComponentType<{ size: number; color: string }>;
};

export type NutritionFeatures = {
  id: "diet-calculator" | "meal-plans" | "recipes" | "grocery-list";
  label: string;
  icon: React.ComponentType<{ size: number; color: string }>;
};

export type TrackingFeatures = {
  id: "tracker" | "habits" | "form" | "analytics";
  label: string;
  icon: React.ComponentType<{ size: number; color: string }>;
};

export type SocialFeatures = {
  id: "forum" | "blog" | "testimonials" | "chat";
  label: string;
  icon: React.ComponentType<{ size: number; color: string }>;
};

export const tabItems: TabItem[] = [
  { id: "ai", label: "AI", icon: BotMessageSquare },
  { id: "tracking", label: "Tracking", icon: ChartNoAxesCombined },
  { id: "nutrition", label: "Nutrition", icon: Apple },
  { id: "social", label: "Social", icon: Users },
];

export const nutritionFeatures: NutritionFeatures[] = [
  { id: "diet-calculator", label: "Diet Calculator", icon: Calculator },
  { id: "meal-plans", label: "Meal Plans", icon: BookOpen },
  { id: "recipes", label: "Recipes", icon: ForkKnife },
  { id: "grocery-list", label: "Grocery List", icon: ShoppingCart },
];

export const trackingFeatures: TrackingFeatures[] = [
  {id: "tracker",label: "Progress Tracker",icon: Target,},
  {id: "habits",label: "Habits",icon: TrendingUp,},
  {id: "form",label: "Form",icon: Calendar, },
  {id: "analytics",label: "Analytics",icon: BarChart3,},
];

export const socialFeatures: SocialFeatures[] = [
   {id: "forum", label: "Forum", icon: Users,},
   {id: "blog",label: "Blog",icon: BookOpen,},
   {id: "testimonials",label: "Testimonials", icon: Star,},
   {id: "chat",label: "Chat",icon: MessageSquare,},
 ];
