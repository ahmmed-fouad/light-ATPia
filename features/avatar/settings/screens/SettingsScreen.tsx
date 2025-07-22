import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import ProfileCard from '../components/ProfileCard';
import PreferencesCard from '../components/PreferencesCard';
import UsageChart from '../components/UsageChart';
import ConnectedAccountsCard from '../components/ConnectedAccountsCard';
import SecurityPrivacyCard from '../components/SecurityPrivacyCard';
import FeedbackCard from '../components/FeedbackCard';
import AppInfoCard from '../components/AppInfoCard';

const SettingsScreen = () => {
  return (
    <ScrollView style={styles.bg} contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      <ProfileCard />
      <PreferencesCard />
      <UsageChart />
      <ConnectedAccountsCard />
      <SecurityPrivacyCard />
      <FeedbackCard />
      <AppInfoCard />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  bg: { flex: 1, backgroundColor: '#f3f4f6' },
  container: {
    padding: 16,
    gap: 18,
    paddingBottom: 32,
  },
});

export default SettingsScreen; 