export type ProgramSummary = {
  startWeight: number;
  endWeight: number;
  durationWeeks: number;
  weeklyChange: number;
  totalChange: number;
  startDate: string;
  endDate: string;
};

export type ChartPoint = {
  x: string;
  y: number;
};

export type Recommendation = {
  label: string;
  value: number | string;
  percent?: number;
  color?: string;
};

export type Activity = {
  label: string;
  icon: string; // icon name or uri
};

export type PersonalProgram = {
  summary: ProgramSummary;
  chartData: ChartPoint[];
  recommendations: Recommendation[];
  activities: Activity[];
}; 