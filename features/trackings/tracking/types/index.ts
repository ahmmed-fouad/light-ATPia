export type Stat = {
  label: string;
  value: number;
  unit: string;
  icon: string;
};

export type Badge = {
  label: string;
  icon: string;
};

export type MetricOption = {
  key: string;
  label: string;
  color: string;
};

export type ProgressDataPoint = {
  date: string;
  weight: number;
  calories: number;
  steps: number;
  water: number;
};

export type MotivationalQuoteProps = {
  motivationalQuotes: string[];
  quoteIdx: number;
  setQuoteIdx: (idx: number) => void;
  streak: number;
};

export type NotesJournalProps = {
  note: string;
  setNote: (v: string) => void;
};

export type PhotoGalleryProps = {
  gallery: string[];
};

export type TrackerState = {
  metric: string;
  quoteIdx: number;
  note: string;
  streak: number;
  setMetric: (metric: string) => void;
  setQuoteIdx: (idx: number) => void;
  setNote: (note: string) => void;
  setStreak: (streak: number) => void;
}; 