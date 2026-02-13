/*
 * @Description: Theme constants for Kyrgyz marketplace
 */

// Kyrgyz flag-inspired and Premium color palette
export const colors = {
  // Primary - Crimson red from Kyrgyz flag
  primary: '#DC143C',
  primaryDark: '#B01030',
  primaryLight: '#FF4D6A',

  // Accent - Golden yellow from Kyrgyz sun
  accent: '#FFD700',
  accentDark: '#E5C100',
  accentLight: '#FFED4E',

  // Premium Palette
  gold: '#D4AF37',
  champagne: '#F7E7CE',
  graphite: '#1C1C1C',
  charcoal: '#36454F',
  platinum: '#E5E4E2',

  // Backgrounds
  background: '#FFFFFF',
  backgroundSecondary: '#F8F9FA',
  backgroundDark: '#121212',

  // Surface
  surface: '#FFFFFF',
  surfaceSecondary: '#F1F3F5',
  surfaceGold: '#FFFAF0',

  // Text
  text: '#1C1C1C',
  textSecondary: '#4A4A4A',
  textLight: '#8E8E93',
  textOnPrimary: '#FFFFFF',
  textOnAccent: '#1C1C1C',

  // Status
  success: '#34C759',
  error: '#FF3B30',
  warning: '#FF9500',
  info: '#007AFF',

  // Border & divider
  border: '#E9ECEF',
  borderLight: '#F1F3F5',
  divider: '#F1F3F5',

  // Shadow
  shadow: 'rgba(0, 0, 0, 0.08)',
  shadowDark: 'rgba(0, 0, 0, 0.12)',
};

export const gradients = {
  premium: ['#1C1C1C', '#36454F'],
  gold: ['#D4AF37', '#F7E7CE'],
  soft: ['#FFFFFF', '#F8F9FA'],
  red: ['#DC143C', '#FF4D6A'],
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const typography = {
  sizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
    xxxl: 32,
  },
  weights: {
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
  },
  lineHeights: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.6,
  },
};

export const borderRadius = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
  full: 999,
};

export const shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 8,
  },
};
