import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

interface Testimonial {
  id: number;
  name: string;
  quote: string;
  goal: string;
}

interface TestimonialCarouselProps {
  testimonials: Testimonial[];
  carousel: number;
  next: () => void;
  prev: () => void;
}

const { width } = Dimensions.get('window');

const TestimonialCarousel: React.FC<TestimonialCarouselProps> = ({ testimonials, carousel, next, prev }) => {
  const testimonial = testimonials[carousel];
  return (
    <View style={styles.container}>
      <Text style={styles.quote}>{testimonial.quote}</Text>
      <Text style={styles.goal}>{testimonial.goal}</Text>
      <Text style={styles.name}>- {testimonial.name}</Text>
      <View style={styles.navRow}>
        <TouchableOpacity onPress={prev} style={styles.navBtn}>
          <Text style={styles.navText}>{'<'}</Text>
        </TouchableOpacity>
        <Text style={styles.counter}>{carousel + 1} / {testimonials.length}</Text>
        <TouchableOpacity onPress={next} style={styles.navBtn}>
          <Text style={styles.navText}>{'>'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width * 0.8,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 18,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
    marginVertical: 8,
  },
  quote: {
    fontSize: 16,
    fontStyle: 'italic',
    color: '#333',
    textAlign: 'center',
    marginBottom: 8,
  },
  goal: {
    fontSize: 13,
    color: '#6366f1',
    marginBottom: 4,
    textAlign: 'center',
  },
  name: {
    fontSize: 13,
    color: '#888',
    marginBottom: 10,
    textAlign: 'center',
  },
  navRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  navBtn: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#f3f4f6',
    marginHorizontal: 8,
  },
  navText: {
    fontSize: 18,
    color: '#6366f1',
    fontWeight: 'bold',
  },
  counter: {
    fontSize: 13,
    color: '#6366f1',
    marginHorizontal: 8,
  },
});

export default TestimonialCarousel; 