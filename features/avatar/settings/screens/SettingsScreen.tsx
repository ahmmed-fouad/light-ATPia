import React from 'react';
import { ScrollView, View, StyleSheet, SafeAreaView } from 'react-native';
import ProfileCard from '../components/ProfileCard';
import PreferencesCard from '../components/PreferencesCard';
import UsageChart from '../components/UsageChart';
import ConnectedAccountsCard from '../components/ConnectedAccountsCard';
import SecurityPrivacyCard from '../components/SecurityPrivacyCard';
import FeedbackCard from '../components/FeedbackCard';
import AppInfoCard from '../components/AppInfoCard';
import { ScrollAwareView } from '@/components';

const SettingsScreen = () => {
  return (

    <SafeAreaView style={styles.root}>
      <ScrollAwareView
        showsVerticalScrollIndicator={false}
      >
    <ScrollView style={styles.bg} contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      <ProfileCard />
      <PreferencesCard />
      <UsageChart />
      <ConnectedAccountsCard />
      <SecurityPrivacyCard />
      <FeedbackCard />
      <AppInfoCard />
    </ScrollView>
    </ScrollAwareView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  bg: { flex: 1, backgroundColor: '#f3f4f6' },
  container: {
    // padding: 16,
    paddingHorizontal: 16,
    paddingTop: 110,
    gap: 18,
    paddingBottom: 22,
  },
});

export default SettingsScreen; 