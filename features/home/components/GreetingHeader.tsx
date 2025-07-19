import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';

interface GreetingHeaderProps {
  avatarUrl: string;
  date: string;
  greeting: string;
  summary: string;
  weightChange: string;
  weightChangeColor: string;
  onCalendarPress?: () => void;
}

const GreetingHeader: React.FC<GreetingHeaderProps> = ({
  avatarUrl,
  date,
  greeting,
  summary,
  weightChange,
  weightChangeColor,
  onCalendarPress,
}) => {
  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <View style={styles.row}>
        <Image source={{ uri: avatarUrl }} style={styles.avatar} />
        <Text style={styles.date}>{date}</Text>
        <TouchableOpacity style={styles.calendarBtn} onPress={onCalendarPress}>
          <Feather name="calendar" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
      <Text style={styles.greeting}>{greeting}</Text>
      <View style={styles.summaryRow}>
        <Text style={styles.summary}>{summary} </Text>
        <Text style={[styles.weightChange, { color: weightChangeColor }]}>{weightChange}</Text>
        <Text style={styles.summary}> yesterday keep it up!</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    paddingTop: 8,
    paddingHorizontal: 25,
    backgroundColor: "#fff",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 48,
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 8,
  },
  date: {
    flex: 1,
    textAlign: "center",
    fontSize: 20,
    color: "#173430",
    fontWeight: "500",
  },
  calendarBtn: {
    padding: 23,
    borderRadius: 40,
    backgroundColor: "#18b888",
  },
  greeting: {
    fontSize: 30,
    fontWeight: "700",
    color: "#173430",
    textAlign: "center",
    marginBottom: 10,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    // marginBottom: 8,
    marginBottom: 20,
  },
  summary: {
    fontSize: 18,
    color: "#778f8b",
    textAlign: "center",
  },
  weightChange: {
    color: "red",
    fontSize: 15,
    fontWeight: "700",
    marginHorizontal: 2,
  },
});

export default GreetingHeader; 