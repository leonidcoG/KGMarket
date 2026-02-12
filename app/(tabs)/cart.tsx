/*
 * @Description: Shopping cart screen
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { colors, spacing, typography } from '@/constants/theme';
import { commonStyles } from '@/constants/styles';

export default function CartScreen() {
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView style={commonStyles.container} edges={['top']}>
      <View style={[styles.header, { paddingTop: Math.max(8, insets.top) }]}>
        <Text style={styles.title}>Корзина</Text>
      </View>

      <View style={styles.emptyContainer}>
        <Image
          source={require('@/assets/images/empty-cart.png')}
          style={styles.emptyImage}
          contentFit="contain"
          transition={200}
        />
        <Text style={styles.emptyTitle}>Корзина пуста</Text>
        <Text style={styles.emptyText}>
          Добавьте товары в корзину, чтобы оформить заказ
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.md,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  title: {
    fontSize: typography.sizes.xxl,
    fontWeight: typography.weights.bold,
    color: colors.text,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
  },
  emptyImage: {
    width: 200,
    height: 200,
    marginBottom: spacing.lg,
  },
  emptyTitle: {
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.semibold,
    color: colors.text,
    marginBottom: spacing.sm,
  },
  emptyText: {
    fontSize: typography.sizes.md,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});
