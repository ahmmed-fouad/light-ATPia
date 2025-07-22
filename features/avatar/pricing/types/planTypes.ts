export type PlanType = {
  id: string;
  name: string;
  price: number;
  period: 'month' | 'year';
  description: string;
  label: string;
  icon: string; // emoji or icon name
  iconColor: string;
  bgColor: string;
  textColor: string;
}; 