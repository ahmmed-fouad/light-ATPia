// FAQ data for React Native FAQ feature

export type FAQ = {
  q: string;
  a: string;
  topic: string;
};

export const faqs: FAQ[] = [
  {
    q: 'How do I reset my password?',
    a: "Go to your profile page, tap 'Change password', and follow the instructions.",
    topic: 'Account',
  },
  {
    q: 'How do I upgrade my plan?',
    a: "Visit the Plans & Pricing page and tap 'Upgrade' on your desired plan.",
    topic: 'Plans',
  },
  {
    q: 'How do I use the AI Chatbot?',
    a: 'Go to the AI Chatbot section from the menu and start chatting!',
    topic: 'Features',
  },
  {
    q: 'Can I share my progress with friends?',
    a: 'Yes! Use the social sharing options on your dashboard.',
    topic: 'Features',
  },
  {
    q: 'How do I contact support?',
    a: 'Fill out the support form below or email us at support@nutrimind.com.',
    topic: 'Support',
  },
  {
    q: 'Is my data private?',
    a: 'Yes, your data is securely stored and never shared without your consent.',
    topic: 'Account',
  },
];

export type ChartData = {
  name: string;
  value: number;
};

export const chartDatFaq: ChartData[] = [
  { name: 'Account', value: 2 },
  { name: 'Plans', value: 1 },
  { name: 'Features', value: 2 },
  { name: 'Support', value: 1 },
];

export const COLORS = ['#34d399', '#60a5fa', '#fbbf24', '#f87171'];

export type FormField = {
  name: 'name' | 'email' | 'subject' | 'message';
  type: 'text' | 'email' | 'textarea';
  placeholder: string;
  required: boolean;
};

export const formFields: FormField[] = [
  {
    name: 'name',
    type: 'text',
    placeholder: 'Your Name',
    required: true,
  },
  {
    name: 'email',
    type: 'email',
    placeholder: 'Your Email',
    required: true,
  },
  {
    name: 'subject',
    type: 'text',
    placeholder: 'Subject',
    required: true,
  },
  {
    name: 'message',
    type: 'textarea',
    placeholder: 'How can we help you?',
    required: true,
  },
]; 