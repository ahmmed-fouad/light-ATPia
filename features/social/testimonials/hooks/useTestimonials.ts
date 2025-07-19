import { useTestimonialsStore } from '../stores/testimonialsStore';
import { useEffect } from 'react';

export const useTestimonials = () => {
  const {
    testimonials,
    counters,
    satisfactionData,
    modalFields,
    isModalVisible,
    isLoading,
    error,
    fetchTestimonials,
    setModalVisible,
    addTestimonial,
    clearError,
  } = useTestimonialsStore();

  useEffect(() => {
    fetchTestimonials();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    testimonials,
    counters,
    satisfactionData,
    modalFields,
    isModalVisible,
    isLoading,
    error,
    setModalVisible,
    addTestimonial,
    clearError,
  };
}; 