// import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert, StyleSheet, Dimensions, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Download } from 'lucide-react-native';
import { useTrackerStore } from '../stores/trackerStore';
import { useTracker } from '../hooks/useTracker';
import { 
  demoStats, 
  demoBadges, 
  gallery, 
  motivationalQuotes, 
  metricOptions 
} from '../data/trackerData';
import StatCards from '../components/StatCards';
import Badges from '../components/Badges';
import ProgressChart from '../components/ProgressChart';
import DailyProgress from '../components/DailyProgress';
import MotivationalQuote from '../components/MotivationalQuote';
import PhotoGallery from '../components/PhotoGallery';
import NotesJournal from '../components/NotesJournal';

const { width: screenWidth } = Dimensions.get('window');
const minChartWidth = 220;
const chartWidth = Math.max(screenWidth - 32, minChartWidth);

export default function TrackerScreen() {
  const { 
    metric, 
    quoteIdx, 
    note, 
    streak,
    setMetric, 
    setQuoteIdx, 
    setNote 
  } = useTrackerStore();

  const { 
    progressData, 
    loading, 
    error, 
    exportData 
  } = useTracker();

  const handleExportData = async () => {
    try {
      const fileName = await exportData();
      if (fileName) {
        Alert.alert('Success', `Data exported as ${fileName}`);
      } else {
        Alert.alert('Error', 'Failed to export data');
      }
    } catch (err) {
      Alert.alert('Error', 'Failed to export data');
    }
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <LinearGradient
      colors={["#f5f7fa", "#c3cfe2", "#e0c3fc"]}
      style={styles.gradientBg}
    >
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.headerSection}>
          <Text style={styles.headerTitle}>Progress Tracker</Text>
          <Text style={styles.headerSubtitle}>
            Track your fitness journey and celebrate your achievements
          </Text>
        </View>

        {/* Stat Cards */}
        <View style={styles.statCardsContainer}>
          <StatCards demoStats={demoStats} />
        </View>

        {/* Badges */}
        <View style={styles.sectionBadges}>
          <Badges demoBadges={demoBadges} />
        </View>

        {/* Progress Chart */}
        <View style={[styles.sectionCard, { width: '100%', paddingHorizontal: 16, overflow: 'hidden' }]}> 
          <ProgressChart 
            progressData={progressData}
            metric={metric}
            setMetric={setMetric}
            metricOptions={metricOptions}
            chartWidth={chartWidth}
          />
        </View>

        {/* Daily Progress & Motivational Quote */}
        <View style={styles.rowSection}>
          <View style={[styles.flex1, { marginRight: 10 }]}> 
            <View style={styles.modernCard}>
              <DailyProgress />
            </View>
          </View>
          <View style={[styles.flex1, { marginLeft: 10 }]}> 
            <View style={styles.modernCard}>
              <MotivationalQuote 
                motivationalQuotes={motivationalQuotes}
                quoteIdx={quoteIdx}
                setQuoteIdx={setQuoteIdx}
                streak={streak}
              />
            </View>
          </View>
        </View>

        {/* Photo Gallery & Notes */}
        <View style={styles.rowSection}>
          <View style={[styles.flex1, { marginRight: 10 }]}> 
            <View style={styles.sectionCard}>
              <PhotoGallery gallery={gallery} />
            </View>
          </View>
          <View style={[styles.flex1, { marginLeft: 10 }]}> 
            <View style={styles.sectionCard}>
              <NotesJournal note={note} setNote={setNote} />
            </View>
          </View>
        </View>

        {/* Export Data */}
        <View style={styles.exportSection}>
          <TouchableOpacity 
            style={styles.exportButton}
            onPress={handleExportData}
            activeOpacity={0.85}
          >
            <Download size={24} color="#fff" />
            <Text style={styles.exportButtonText}>Export Data</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradientBg: {
    flex: 1,
  },
  container: {
    padding: 16,
    paddingBottom: 40,
  },
  headerSection: {
    marginBottom: 28,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 34,
    fontWeight: 'bold',
    color: '#4f46e5',
    marginBottom: 6,
    textAlign: 'center',
    letterSpacing: 0.5,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif',
  },
  headerSubtitle: {
    fontSize: 17,
    color: '#64748b',
    textAlign: 'center',
    fontWeight: '500',
    letterSpacing: 0.2,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif',
  },
  statCardsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 22,
  },
  sectionCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 16,
    marginBottom: 22,
    shadowColor: '#a78bfa',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: Platform.OS === 'ios' ? 0.13 : 0.18,
    shadowRadius: 12,
    elevation: 5,
  },
  sectionBadges: {
    backgroundColor: 'rgba(139, 92, 246, 0.08)',
    borderRadius: 16,
    paddingVertical: 10,
    paddingHorizontal: 8,
    marginBottom: 22,
    alignItems: 'center',
  },
  rowSection: {
    flexDirection: 'row',
    marginBottom: 22,
  },
  flex1: {
    flex: 1,
  },
  exportSection: {
    alignItems: 'center',
    marginBottom: 32,
  },
  exportButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 30,
    backgroundColor: 'linear-gradient(90deg, #6366f1 0%, #06b6d4 100%)', // fallback for web, will be overridden by LinearGradient if used
    shadowColor: '#6366f1',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.18,
    shadowRadius: 8,
    elevation: 4,
  },
  exportButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
    marginLeft: 10,
    letterSpacing: 0.5,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f7fa',
  },
  loadingText: {
    fontSize: 18,
    color: '#64748b',
  },
  errorText: {
    fontSize: 18,
    color: '#ef4444',
  },
  modernCard: {
    backgroundColor: 'rgba(255,255,255,0.92)',
    borderRadius: 20,
    padding: 18,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#a78bfa',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: Platform.OS === 'ios' ? 0.13 : 0.18,
    shadowRadius: 12,
    elevation: 5,
    marginBottom: 0,
  },
}); 