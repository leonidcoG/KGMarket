/*
 * @Description: Theme constants for Kyrgyz marketplace
 */

// Kyrgyz flag-inspired color palette
export const colors = {
  // Primary - Crimson red from Kyrgyz flag
  primary: '#DC143C',
  primaryDark: '#B01030',
  primaryLight: '#FF4D6A',
  
  // Accent - Golden yellow from Kyrgyz sun
  accent: '#FFD700',
  accentDark: '#E5C100',
  accentLight: '#FFED4E',
  
  // Backgrounds
  background: '#FFFFFF',
  backgroundSecondary: '#FFF5F5',
  backgroundDark: '#1A0000',
  
  // Surface
  surface: '#FFFFFF',
  surfaceRed: '#FFF0F0',
  surfaceGold: '#FFFAF0',
  
  // Text
  text: '#1A1A1A',
  textSecondary: '#666666',
  textLight: '#999999',
  textOnPrimary: '#FFFFFF',
  textOnAccent: '#1A0000',
  
  // Status
  success: '#10B981',
  error: '#EF4444',
  warning: '#F59E0B',
  info: '#3B82F6',
  
  // Border & divider
  border: '#E5E5E5',
  borderLight: '#F5F5F5',
  divider: '#EEEEEE',
  
  // Shadow
  shadow: 'rgba(220, 20, 60, 0.15)',
  shadowDark: 'rgba(0, 0, 0, 0.1)',
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
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  xxl: 24,
  full: 999,
};

export const shadows = {
  sm: {
    shadowColor: colors.shadowDark,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  md: {
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  lg: {
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
};
