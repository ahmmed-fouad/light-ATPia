import { create } from 'zustand';
import { TestimonialsStore, Testimonial } from '../types';
import { TestimonialsService } from '../services/testimonialsService';

export const useTestimonialsStore = create<TestimonialsStore>((set, get) => ({
  testimonials: [],
  counters: [],
  satisfactionData: [],
  modalFields: [],
  isModalVisible: false,
  isLoading: false,
  error: null,

  fetchTestimonials: async () => {
    set({ isLoading: true, error: null });
    try {
      const [testimonials, counters, satisfactionData, modalFields] = await Promise.all([
        TestimonialsService.fetchTestimonials(),
        TestimonialsService.fetchCounters(),
        TestimonialsService.fetchSatisfactionData(),
        TestimonialsService.fetchModalFields(),
      ]);
      set({ testimonials, counters, satisfactionData, modalFields, isLoading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to fetch testimonials',
        isLoading: false,
      });
    }
  },

  setModalVisible: (visible: boolean) => set({ isModalVisible: visible }),
  addTestimonial: (testimonial: Testimonial) => set({ testimonials: [testimonial, ...get().testimonials] }),
  clearError: () => set({ error: null }),
})); 