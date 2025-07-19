import { useRouter } from 'expo-router';
// import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { CategorySection } from '../components/CategorySection';
import { HeroSection } from '../components/HeroSection';
import { FeatureCardData } from '../types';

const HomeScreenV1: React.FC = () => {
  const router = useRouter();

  // Simplified AI features for Version 1 (including food scanner)
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

  // Simplified nutrition features for Version 1
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
      onPress: () => router.push('/(main)/(nutrition)/diet-calculator'),
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
      onPress: () => router.push('/(main)/(nutrition)/meal-plans'),
    },
  ];

  // Simplified tracking features for Version 1
  const trackingFeatures: FeatureCardData[] = [
    {
      id: "progress",
      title: "Progress Tracker",
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
  ];

  return (
    <ScrollView style={styles.bg} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <HeroSection />
      <CategorySection
        data={{ id: 'ai', title: 'AI & Smart Tools', features: aiFeatures }}
        description="Get personalized diet advice and scan food with AI."
        vertical
      />
      <CategorySection
        data={{ id: 'nutrition', title: 'Nutrition', features: nutritionFeatures }}
        description="Calculate your needs and plan your meals."
        vertical
      />
      <CategorySection
        data={{ id: 'tracking', title: 'Tracking', features: trackingFeatures }}
        description="Track your progress and build healthy habits."
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

export default HomeScreenV1; 