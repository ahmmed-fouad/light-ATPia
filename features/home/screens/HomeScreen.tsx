import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';
import { HeroSection } from '../components/HeroSection';
import { CategorySection } from '../components/CategorySection';
import { CategorySectionData, FeatureCardData } from '../types';

const router = useRouter();

const aiFeatures: FeatureCardData[] = [
  {
    id: "chatbot",
    title: "AI Chatbot",
    description:
      "• Get personalized health advice from your AI coach 24/7\n• Ask questions about nutrition, exercise, and wellness\n• Receive motivation and goal-setting guidance\n• Track your progress with intelligent insights\n• Get instant answers to health-related queries",
    icon: "🤖",
    color: "#059669",
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80",
    chartData: [8, 12, 15, 18, 22, 25, 28],
    chartTitle: "Daily Conversations",
    stat: { label: "Chats", value: 124, type: "progress" },
    actionLabel: "Start Chat",
    onPress: () => router.push("/(main)/(ai)/chatbot"),
  },
  {
    id: "food-scanner",
    title: "Food Scanner",
    description:
      "• Point your camera at any food to get instant nutrition facts\n• Identify ingredients and allergens automatically\n• Track calories, macros, and micronutrients\n• Build a personal food database\n• Get meal suggestions based on your goals",
    icon: "📷",
    color: "#60a5fa",
    image:
      "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80",
    chartData: [5, 8, 12, 15, 18, 22, 25],
    chartTitle: "Foods Scanned",
    stat: { label: "Scans", value: 42, type: "progress" },
    actionLabel: "Scan Food",
    onPress: () => router.push("/(main)/(ai)/food-scanner/food-scanner"),
  },
];

const nutritionFeatures: FeatureCardData[] = [
  {
    id: 'calculator',
    title: 'Diet Calculator',
    description: '• Calculate your daily calorie needs based on age, weight, and activity\n• Determine optimal macronutrient ratios for your goals\n• Get personalized recommendations for weight loss or muscle gain\n• Track your BMR and TDEE with precision\n• Adjust calculations as your body composition changes',
    icon: '🧮',
    color: '#fbbf24',
    image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=800&q=80',
    chartData: [1800, 1850, 1900, 1950, 2000, 2050, 2100],
    chartTitle: 'Daily Calories',
    actionLabel: 'Calculate',
    onPress: () => router.push('/(main)/(nutration)/diet-calculator'),
  },
  {
    id: 'recipes',
    title: 'Recipes',
    description: '• Browse thousands of healthy recipes from nutrition experts\n• Filter by dietary restrictions, allergies, and preferences\n• Get step-by-step cooking instructions with photos\n• Calculate nutrition facts for each recipe automatically\n• Save your favorite recipes and create custom collections',
    icon: '🥗',
    color: '#34d399',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80',
    chartData: [3, 5, 7, 4, 6, 8, 5],
    chartTitle: 'Recipes Tried',
    actionLabel: 'Browse Recipes',
    onPress: () => router.push('/(main)/(nutration)/recipes'),
  },
  {
    id: 'grocery-list',
    title: 'Grocery List',
    description: '• Create smart shopping lists based on your meal plans\n• Organize items by store sections for efficient shopping\n• Get price estimates and budget-friendly alternatives\n• Sync with recipe ingredients automatically\n• Share lists with family members and roommates',
    icon: '🛒',
    color: '#60a5fa',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=800&q=80',
    chartData: [12, 15, 18, 14, 16, 20, 17],
    chartTitle: 'Items Purchased',
    actionLabel: 'View List',
    onPress: () => router.push('/(main)/(nutration)/grocery-list'),
  },
  {
    id: 'meal-plans',
    title: 'Meal Plans',
    description: '• Get personalized weekly meal plans tailored to your goals\n• Choose from various diet types: keto, vegan, Mediterranean\n• Automatically adjust portion sizes based on your calorie needs\n• Generate shopping lists from your meal plans\n• Track your adherence and adjust plans based on preferences',
    icon: '🍽️',
    color: '#a78bfa',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
    chartData: [85, 90, 88, 92, 87, 95, 89],
    chartTitle: 'Plan Adherence %',
    actionLabel: 'See Plans',
    onPress: () => router.push('/(main)/(nutration)/meal-plans'),
  },
];

const trackingFeatures: FeatureCardData[] = [
  {
    id: "progress",
    title: "Progress",
    description:
      "• Track daily calorie intake and macronutrient balance\n• Monitor weight changes and body composition over time\n• Set and achieve fitness goals with visual progress charts\n• Celebrate milestones and maintain motivation streaks\n• Get insights on what works best for your body",
    icon: "📈",
    color: "#fbbf24",
    image:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800&q=80",
    chartData: [75, 78, 82, 85, 88, 90, 92],
    chartTitle: "Goal Progress %",
    stat: { label: "Streak", value: 7, unit: " days", type: "streak" },
    actionLabel: "View Progress",
    onPress: () => router.push("/(main)/(tracking)/tracker"),
  },
  {
    id: "habits",
    title: "Habits",
    description:
      "• Build sustainable healthy habits with daily reminders\n• Track consistency and build momentum over time\n• Create custom habit categories: nutrition, exercise, sleep\n• Get streak counters and habit completion statistics\n• Receive positive reinforcement and habit-building tips",
    icon: "✅",
    color: "#059669",
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80",
    chartData: [4, 5, 6, 7, 8, 9, 10],
    chartTitle: "Habits Completed",
    actionLabel: "Track Habits",
    onPress: () => router.push("/(main)/(tracking)/habits"),
  },
  {
    id: "analytics",
    title: "Analytics",
    description:
      "• Visualize your health data with interactive charts and graphs\n• Analyze trends in nutrition, exercise, and wellness metrics\n• Compare performance across different time periods\n• Identify patterns and correlations in your health journey\n• Export data for sharing with healthcare professionals",
    icon: "📊",
    color: "#60a5fa",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
    chartData: [65, 72, 78, 85, 82, 88, 91],
    chartTitle: "Health Score",
    actionLabel: "View Analytics",
    onPress: () => router.push("/(main)/(tracking)/analytics"),
  },
];

const socialFeatures: FeatureCardData[] = [
  {
    id: 'forum',
    title: 'Forum',
    description: '• Join vibrant discussions about nutrition, fitness, and wellness\n• Share your journey and get support from the community\n• Ask questions and get answers from experienced members\n• Participate in challenges and group activities\n• Build lasting connections with like-minded health enthusiasts',
    icon: '💬',
    color: '#60a5fa',
    image: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=800&q=80',
    chartData: [15, 22, 18, 25, 20, 28, 24],
    chartTitle: 'Active Discussions',
    actionLabel: 'Go to Forum',
    onPress: () => router.push('/(main)/(social)/forum'),
  },
  {
    id: 'blog',
    title: 'Blog',
    description: '• Read expert articles written by nutritionists and fitness professionals\n• Stay updated with the latest health and wellness trends\n• Learn practical tips for meal prep and healthy cooking\n• Discover new workout routines and exercise techniques\n• Get motivation and inspiration for your health journey',
    icon: '📚',
    color: '#fbbf24',
    image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=800&q=80',
    chartData: [2, 3, 1, 4, 2, 3, 2],
    chartTitle: 'Articles Read',
    actionLabel: 'Read Blog',
    onPress: () => router.push('/(main)/(social)/blog'),
  },
  {
    id: 'testimonials',
    title: 'Testimonials',
    description: '• Read inspiring success stories from real ATPia users\n• See before-and-after transformations and progress photos\n• Learn from others\' experiences and strategies\n• Get motivated by community achievements and milestones\n• Share your own success story and inspire others',
    icon: '⭐',
    color: '#a78bfa',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80',
    chartData: [5, 8, 6, 10, 7, 9, 8],
    chartTitle: 'Stories Shared',
    actionLabel: 'See Stories',
    onPress: () => router.push('/(main)/(social)/testimonials'),
  },
  {
    id: 'chat',
    title: 'Chat',
    description: '• Connect with the ATPia community in real-time chat\n• Get instant support and advice from fellow users\n• Share quick updates and celebrate wins together\n• Join topic-specific chat rooms for focused discussions\n• Build friendships with people on similar health journeys',
    icon: '💬',
    color: '#059669',
    image: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=800&q=80',
    chartData: [12, 18, 15, 22, 19, 25, 21],
    chartTitle: 'Messages Sent',
    actionLabel: 'Open Chat',
    onPress: () => router.push('/(main)/(social)/chat'),
  },
];

export const HomeScreen: React.FC = () => {
  const router = useRouter();
  
  return (
    <ScrollView style={styles.bg} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <HeroSection />
      <CategorySection
        data={{ id: 'ai', title: 'AI & Smart Tools', features: aiFeatures }}
        description="Leverage the power of AI to get instant advice and analyze your meals."
        vertical
      />
      <CategorySection
        data={{ id: 'nutrition', title: 'Nutrition', features: nutritionFeatures }}
        description="Everything you need to eat smarter and plan your nutrition."
        vertical
      />
      <CategorySection
        data={{ id: 'tracking', title: 'Tracking', features: trackingFeatures }}
        description="Track your progress, habits, and health trends."
        vertical
      />
      <CategorySection
        data={{ id: 'social', title: 'Social & Community', features: socialFeatures }}
        description="Connect, share, and get inspired by the ATPia community."
        vertical
      />
      <View style={{ height: 32 }} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  content: {
    paddingBottom: 32,
  },
}); 