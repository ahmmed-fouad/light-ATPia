export interface Testimonial {
  id: number;
  name: string;
  quote: string;
  goal: string;
  rating: number;
  date: string;
}

export interface Counter {
  label: string;
  value: number;
}

export interface SatisfactionData {
  name: string;
  value: number;
}

export interface ModalField {
  key: string;
  label: string;
  placeholder: string;
  type: 'text' | 'number' | 'date';
}

export interface TestimonialsState {
  testimonials: Testimonial[];
  counters: Counter[];
  satisfactionData: SatisfactionData[];
  modalFields: ModalField[];
  isModalVisible: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface TestimonialsStore extends TestimonialsState {
  fetchTestimonials: () => Promise<void>;
  setModalVisible: (visible: boolean) => void;
  addTestimonial: (testimonial: Testimonial) => void;
  clearError: () => void;
} 