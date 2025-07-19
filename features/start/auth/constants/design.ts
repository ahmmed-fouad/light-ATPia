// Colors based on Figma screens
export const COLORS = {
  primary: '#1F2937', // Dark Green
  secondary: '#10B981', // Light Green
  error: '#EF4444', // Red
  background: '#FFFFFF', // White
  text: {
    primary: '#1F2937', // Dark Green
    secondary: '#6B7280', // Gray
    light: '#9CA3AF', // Light Gray
  },
  border: {
    primary: '#D1D5DB', // Light Gray
    error: '#EF4444', // Red
    success: '#10B981', // Green
  },
  input: {
    background: '#F9FAFB', // Very Light Gray
    focused: '#10B981', // Green
  },
} as const;

// Spacing based on Figma screens
export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const;

// Border radius
export const BORDER_RADIUS = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  full: 9999,
} as const;

// Typography
export const FONT_SIZES = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 20,
  xxl: 24,
  xxxl: 32,
} as const;

export const FONT_WEIGHTS = {
  normal: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
} as const; 