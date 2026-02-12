/*
 * @Description: Reusable style patterns
 */

import { StyleSheet } from 'react-native';
import { colors, spacing, typography, borderRadius } from './theme';

export const commonStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  flexBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  
  flexCenter: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  card: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
  },
  
  heading1: {
    fontSize: typography.sizes.xxxl,
    fontWeight: typography.weights.bold,
    color: colors.text,
    lineHeight: typography.sizes.xxxl * typography.lineHeights.tight,
  },
  
  heading2: {
    fontSize: typography.sizes.xxl,
    fontWeight: typography.weights.bold,
    color: colors.text,
    lineHeight: typography.sizes.xxl * typography.lineHeights.tight,
  },
  
  heading3: {
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.semibold,
    color: colors.text,
    lineHeight: typography.sizes.xl * typography.lineHeights.tight,
  },
  
  bodyLarge: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.regular,
    color: colors.text,
    lineHeight: typography.sizes.lg * typography.lineHeights.normal,
  },
  
  body: {
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.regular,
    color: colors.text,
    lineHeight: typography.sizes.md * typography.lineHeights.normal,
  },
  
  bodySmall: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.regular,
    color: colors.textSecondary,
    lineHeight: typography.sizes.sm * typography.lineHeights.normal,
  },
  
  caption: {
    fontSize: typography.sizes.xs,
    fontWeight: typography.weights.regular,
    color: colors.textLight,
    lineHeight: typography.sizes.xs * typography.lineHeights.normal,
  },
});
