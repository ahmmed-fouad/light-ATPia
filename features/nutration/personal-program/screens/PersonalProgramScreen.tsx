import  { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { Feather } from '@expo/vector-icons';
import ProgramChart from '../components/ProgramChart';
import RecommendationCard from '../components/RecommendationCard';
import ToggleFooter from '../components/ToggleFooter';
import { getPersonalProgram } from '../services/personalProgramService';

const PersonalProgramScreen = () => {
  const [footerOpen, setFooterOpen] = useState(true);
  const program = getPersonalProgram();
  const { summary, chartData, recommendations, activities } = program;

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.headerRow}>
        <TouchableOpacity style={styles.closeBtn}>
          <Feather name="x" size={28} color="#173430" />
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.content} contentContainerStyle={{ paddingBottom: 32 }}>
        <Text style={styles.title}>Your personal program{"\n"}is ready</Text>
        <Text style={styles.subtitle}>To achieve your target weight we’ve tailored this plan for you</Text>
        {/* <View style={styles.badgeWrap}>
          <View style={styles.badge}><Text style={styles.badgeText}>+{summary.totalChange} kg</Text></View>
        </View> */}
        <ProgramChart data={chartData} color="#A3E635" />
        <Text style={styles.sectionTitle}>Nutritional Recommendations</Text>
        <RecommendationCard recommendations={recommendations} />
      </ScrollView>
      <Text>Hello</Text>
      <ToggleFooter open={footerOpen} onToggle={() => setFooterOpen(o => !o)} activities={activities} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#fff",
    paddingBottom: 100,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingHorizontal: 18,
    paddingTop: 8,
    marginBottom: 8,
  },
  closeBtn: {
    padding: 22,
    borderRadius: 35,
    backgroundColor: "#f7f7f7",
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    flex: 1,
    paddingHorizontal: 18,
    paddingTop: 0,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#173430",
    textAlign: "center",
    marginTop: 8,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    width: 240,
    alignSelf: "center",
    color: "#6b7280",
    textAlign: "center",
    marginBottom: 18,
  },
  badgeWrap: {
    alignItems: "center",
    marginBottom: 8,
  },
  badge: {
    backgroundColor: "#fff",
    borderRadius: 18,
    paddingHorizontal: 24,
    paddingVertical: 8,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#A3E635",
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  badgeText: {
    color: "#173430",
    fontWeight: "700",
    fontSize: 20,
  },
  chartLabels: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: -12,
    marginBottom: 2,
    paddingHorizontal: 8,
  },
  chartLabel: {
    color: "#173430",
    fontWeight: "700",
    fontSize: 15,
  },
  chartDates: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 18,
    paddingHorizontal: 8,
  },
  chartDate: {
    color: "#6b7280",
    fontSize: 13,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#12281D",
    marginTop: 18,
    marginBottom: 10,
  },
});

export default PersonalProgramScreen; 