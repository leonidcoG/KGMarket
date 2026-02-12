/*
 * @Description: Mall screen
 */

import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { colors, spacing, typography } from '@/constants/theme';
import { commonStyles } from '@/constants/styles';
import { MallCard } from '@/components';
import { getMalls } from '@/services/feedService';

export default function MallScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const malls = getMalls();

  return (
    <SafeAreaView style={commonStyles.container} edges={['top']}>
      <View style={[styles.header, { paddingTop: Math.max(8, insets.top) }]}>
        <Text style={styles.title}>Торговые центры</Text>
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
        {malls.map(mall => (
          <MallCard key={mall.id} mall={mall} />
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
});
