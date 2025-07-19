export interface FeatureCardData {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  image?: string;
  chartData?: number[];
  chartTitle?: string;
  stat?: Stat;
  actionLabel?: string;
  onPress?: () => void;
}

export interface CategorySectionData {
  id: string;
  title: string;
  features: FeatureCardData[];
}

export interface Stat {
  label: string;
  value: number;
  unit?: string;
  type?: 'progress' | 'calories' | 'macros' | 'streak';
}

export interface ActionButtonData {
  id: string;
  label: string;
  icon: string;
  color: string;
  onPress: () => void;
} 