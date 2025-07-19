import { testimonials, counters, satisfactionData, modalFields } from '../data/testimonialsData';
import { Testimonial, Counter, SatisfactionData, ModalField } from '../types';

export class TestimonialsService {
  static async fetchTestimonials(): Promise<Testimonial[]> {
    await new Promise(res => setTimeout(res, 300));
    return testimonials;
  }
  static async fetchCounters(): Promise<Counter[]> {
    await new Promise(res => setTimeout(res, 100));
    return counters;
  }
  static async fetchSatisfactionData(): Promise<SatisfactionData[]> {
    await new Promise(res => setTimeout(res, 100));
    return satisfactionData;
  }
  static async fetchModalFields(): Promise<ModalField[]> {
    await new Promise(res => setTimeout(res, 50));
    return modalFields;
  }
} 