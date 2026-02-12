/*
 * @Description: Catalog screen
 */

import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { colors, spacing, typography, borderRadius, shadows } from '@/constants/theme';
import { commonStyles } from '@/constants/styles';
import { getCategories } from '@/services/productService';

export default function CatalogScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const categories = getCategories();

  return (
    <SafeAreaView style={commonStyles.container} edges={['top']}>
      <View style={[styles.header, { paddingTop: Math.max(8, insets.top) }]}>
        <Text style={styles.title}>Каталог</Text>
        <View style={styles.headerIcons}>
          <Pressable
            style={styles.iconButton}
            onPress={() => router.push('/favorites')}
          >
            <MaterialIcons name="favorite-border" size={24} color={colors.text} />
          </Pressable>
          <Pressable
            style={styles.iconButton}
            onPress={() => router.push('/cart')}
          >
            <MaterialIcons name="shopping-cart" size={24} color={colors.text} />
          </Pressable>
          <Pressable style={styles.iconButton}>
            <MaterialIcons name="notifications-none" size={24} color={colors.text} />
          </Pressable>
        </View>
      </View>

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {categories.map(cat => (
          <Pressable key={cat.id} style={styles.categoryCard}>
            <View style={styles.iconContainer}>
              <MaterialIcons name={cat.icon as any} size={32} color={colors.primary} />
            </View>
            <View style={styles.categoryInfo}>
              <Text style={styles.categoryName}>{cat.name}</Text>
              <Text style={styles.categoryCount}>{cat.count} товаров</Text>
            </View>
            <MaterialIcons name="chevron-right" size={24} color={colors.textSecondary} />
          </Pressable>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  iconButton: {
    padding: spacing.xs,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    padding: spacing.md,
  },
  categoryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginBottom: spacing.md,
    ...shadows.sm,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: borderRadius.md,
    backgroundColor: colors.surfaceRed,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  categoryInfo: {
    flex: 1,
  },
  categoryName: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.semibold,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  categoryCount: {
    fontSize: typography.sizes.sm,
    color: colors.textSecondary,
  },
});
