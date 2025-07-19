import React from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import GreetingHeader from "../components/GreetingHeader";
import CalorieProgress from "../components/CalorieProgress";
import MacroSummary from "../components/MacroSummary";
import MealCard from "../components/MealCard";
import WaterTracker from "../components/WaterTracker";
import ActivityCard from "../components/ActivityCard";
import BottomNavBar from "../../../components/BottomNavBar";
import { useHomeData } from "../hooks/useHomeData";
import { router } from "expo-router";

const HomeScreen = () => {
  const { homeData, loading } = useHomeData();

  if (loading || !homeData) {
    return (
      <View style={styles.loadingWrap}>
        <ActivityIndicator size="large" color="#22C55E" />
      </View>
    );
  }

  const handleTabPress = (tab: string) => {
    router.push("/(main)/home");
  };

  return (
    <View style={styles.root}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <GreetingHeader
          avatarUrl={homeData.user.avatarUrl}
          date={homeData.date}
          greeting={homeData.greeting}
          summary={homeData.summary}
          weightChange={homeData.weightChange}
          weightChangeColor={homeData.weightChangeColor}
        />
        <View
          style={{
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
            marginHorizontal: 12,
            marginTop: 18,

          }}
        >
          <TouchableOpacity
            style={{
              backgroundColor: "#173430",
              padding: 10,
              borderRadius: 10,
              margin: 10,
              width: 150,
              alignItems: "center",
            }}
            onPress={() => router.push("/(main)/(nutrition)/days-meals")}
          >
            <Text style={{ color: "#fff", fontSize: 16, fontWeight: "700" }}>
              Days's Meals
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: "#173430",
              padding: 10,
              borderRadius: 10,
              margin: 10,
              width: 150,
              alignItems: "center",
            }}
            onPress={() => router.push("/(main)/(tracking)/personal-program")}
          >
            <Text style={{ color: "#fff", fontSize: 16, fontWeight: "700" }}>
              Personal Program
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: "#173430",
              padding: 10,
              borderRadius: 10,
              margin: 10,
              width: 150,
              alignItems: "center",
            }}
            onPress={() => router.push("/(auth)/onboarding")}
          >
            <Text style={{ color: "#fff", fontSize: 16, fontWeight: "700" }}>
              Onboarding
            </Text>
          </TouchableOpacity>
        </View>
        <CalorieProgress
          calories={homeData.calorieProgress.calories}
          total={homeData.calorieProgress.total}
        />
        <MacroSummary macros={homeData.macros} />
        <View style={styles.sectionTitleContainer}>
          <Text style={styles.sectionTitle}>Today's Meal</Text>
          <TouchableOpacity style={styles.dotsButton}>
            <View style={styles.dotsContainer}>
              <Text style={styles.dotsText}>...</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.cardList}>
          {homeData.meals.map((meal) => (
            <MealCard
              key={meal.id}
              image={meal.image}
              label={meal.label}
              foods={meal.foods}
              calories={meal.calories}
              totalCalories={meal.totalCalories}
            />
          ))}
        </View>
        <View style={styles.sectionTitleContainer}>
          <Text style={styles.sectionTitle}>Water</Text>
          <TouchableOpacity style={styles.dotsButton}>
            <View style={styles.dotsContainer}>
              <Text style={styles.dotsText}>...</Text>
            </View>
          </TouchableOpacity>
        </View>
        <WaterTracker
          consumed={homeData.water.consumed}
          goal={homeData.water.goal}
        />
        <Text style={styles.sectionTitle}>Activity</Text>
        <ActivityCard
          activitiesCount={homeData.activity.activities.length}
          totalBurnt={homeData.activity.totalBurnt}
        />
        <View style={{ height: 80 }} />
      </ScrollView>
      <BottomNavBar activeTab="home" onTabPress={() => handleTabPress} />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContent: {
    paddingBottom: 24,
  },
  loadingWrap: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#12281D",
    marginLeft: 28,
    marginTop: 18,
    marginBottom: 18,
  },
  cardList: {
    marginHorizontal: 12,
  },
  dotsButton: {
    backgroundColor: "#173430",
    height: 32,
    width: 60,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
    marginRight: 10,
  },
  dotsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // marginRight: 30,
  },
  dotsText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
    lineHeight: 18,
    paddingTop: 2,
    paddingBottom: 10,
    textAlign: "center",
    includeFontPadding: false,
  },
  sectionTitleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 12,
    marginVertical: 18,
  },
});

export default HomeScreen;
