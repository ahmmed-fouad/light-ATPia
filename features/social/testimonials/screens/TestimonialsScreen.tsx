import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator, StyleSheet, Dimensions, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTestimonials } from '../hooks/useTestimonials';
import SatisfactionChart from '../components/SatisfactionChart';
import Counters from '../components/Counters';
import TestimonialCarousel from '../components/TestimonialCarousel';
import ModalForm from '../components/ModalForm';

const accentColor = '#059669';
const cardBg = 'rgba(255,255,255,0.97)';
const { width } = Dimensions.get('window');

const TestimonialsScreen = () => {
  const {
    testimonials,
    counters,
    satisfactionData,
    modalFields,
    isModalVisible,
    isLoading,
    setModalVisible,
    error,
  } = useTestimonials();

  const [carousel, setCarousel] = useState(0);
  const [counterAnim, setCounterAnim] = useState([0, 0, 0]);

  // Animate counters
  useEffect(() => {
    if (!counters.length) return;
    setCounterAnim([0, 0, 0]);
    const interval = setInterval(() => {
      setCounterAnim(prev => prev.map((v, i) => v < counters[i]?.value ? v + Math.ceil((counters[i]?.value || 0) / 40) : counters[i]?.value || 0));
    }, 40);
    return () => clearInterval(interval);
  }, [counters]);

  // Carousel navigation
  const next = () => {
    if (testimonials.length === 0) return;
    setCarousel((carousel + 1) % testimonials.length);
  };
  const prev = () => {
    if (testimonials.length === 0) return;
    setCarousel((carousel - 1 + testimonials.length) % testimonials.length);
  };

  if (isLoading) {
    return <View style={styles.center}><ActivityIndicator size="large" color={accentColor} /></View>;
  }
  if (error) {
    return <View style={styles.center}><Text style={{ color: 'red' }}>{error}</Text></View>;
  }

  return (
    <LinearGradient colors={["#f5f7fa", "#e0f7fa", "#d1fae5"]} style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.card}>
          <Text style={styles.title}>Testimonials</Text>
          <Text style={styles.subtitle}>What our users say and how satisfied they are</Text>

          <View style={styles.sectionCard}>
            <Text style={styles.sectionTitle}>User Satisfaction</Text>
            <SatisfactionChart satisfactionData={satisfactionData} starColors={[accentColor, "#34d399", "#a7f3d0"]} />
            <Counters counters={counters} counterAnim={counterAnim} />
          </View>

          <View style={styles.sectionCard}>
            <Text style={styles.sectionTitle}>What Users Say</Text>
            {testimonials.length > 0 ? (
              <TestimonialCarousel testimonials={testimonials} carousel={carousel} next={next} prev={prev} />
            ) : (
              <View style={styles.emptyState}>
                <Text style={styles.emptyText}>No testimonials yet</Text>
              </View>
            )}
          </View>

          <TouchableOpacity style={styles.addBtn} onPress={() => setModalVisible(true)} activeOpacity={0.85}>
            <Text style={styles.addBtnText}>Add Your Story</Text>
          </TouchableOpacity>
        </View>
        {isModalVisible && (
          <ModalForm modalFields={modalFields} setShowModal={setModalVisible} />
        )}
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 32,
    alignItems: 'center',
    gap: 16,
  },
  card: {
    width: width > 500 ? 500 : width - 16,
    backgroundColor: cardBg,
    borderRadius: 18,
    padding: 18,
    shadowColor: '#a7f3d0',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: Platform.OS === 'ios' ? 0.10 : 0.13,
    shadowRadius: 10,
    elevation: 4,
    alignItems: 'center',
    gap: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: accentColor,
    marginBottom: 4,
    letterSpacing: 0.5,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#64748b',
    textAlign: 'center',
    fontWeight: '500',
    letterSpacing: 0.2,
    marginBottom: 8,
  },
  sectionCard: {
    width: '100%',
    backgroundColor: cardBg,
    borderRadius: 16,
    padding: 12,
    alignItems: 'center',
    shadowColor: '#a7f3d0',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: Platform.OS === 'ios' ? 0.10 : 0.13,
    shadowRadius: 8,
    elevation: 3,
    marginBottom: 0,
    gap: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: accentColor,
    marginBottom: 6,
    textAlign: 'center',
    marginTop: 4,
  },
  addBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: accentColor,
    borderRadius: 24,
    paddingHorizontal: 28,
    paddingVertical: 12,
    shadowColor: accentColor,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: Platform.OS === 'ios' ? 0.10 : 0.13,
    shadowRadius: 6,
    elevation: 2,
    marginTop: 8,
  },
  addBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 4,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 300,
  },
  emptyState: {
    width: '100%',
    backgroundColor: cardBg,
    borderRadius: 16,
    padding: 18,
    alignItems: 'center',
    shadowColor: '#a7f3d0',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
    marginVertical: 8,
  },
  emptyText: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
  },
});

export default TestimonialsScreen; 