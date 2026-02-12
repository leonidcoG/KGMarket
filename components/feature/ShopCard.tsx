/*
 * @Description: Shop card component
 */

import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Image } from 'expo-image';
import { MaterialIcons } from '@expo/vector-icons';
import { colors, spacing, borderRadius, typography, shadows } from '@/constants/theme';
import { Shop } from '@/types/feed';

interface ShopCardProps {
  shop: Shop;
  onPress: () => void;
}

export const ShopCard: React.FC<ShopCardProps> = ({ shop, onPress }) => {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <Image
        source={{ uri: shop.image }}
        style={styles.image}
        contentFit="cover"
        transition={200}
      />
      
      <View style={styles.logoContainer}>
        <Image
          source={{ uri: shop.logo }}
          style={styles.logo}
          contentFit="cover"
          transition={200}
        />
      </View>

      <View style={styles.content}>
        <Text style={styles.name}>{shop.name}</Text>
        
        <View style={styles.rating}>
          <MaterialIcons name="star" size={16} color={colors.accent} />
          <Text style={styles.ratingText}>{shop.rating}</Text>
          <Text style={styles.reviewCount}>({shop.reviewCount} отзывов)</Text>
        </View>

        <Text style={styles.description}>{shop.description}</Text>

        <View style={styles.stats}>
          <View style={styles.statItem}>
            <MaterialIcons name="videocam" size={20} color={colors.primary} />
            <Text style={styles.statText}>{shop.videoCount} видео</Text>
          </View>
          <View style={styles.statItem}>
            <MaterialIcons name="inventory" size={20} color={colors.primary} />
            <Text style={styles.statText}>{shop.productCount} товаров</Text>
          </View>
        </View>

        <View style={styles.addresses}>
          <Text style={styles.addressTitle}>Адреса:</Text>
          {shop.addresses.map((address, index) => (
            <View key={index} style={styles.addressItem}>
              <MaterialIcons name="location-on" size={16} color={colors.textSecondary} />
              <Text style={styles.addressText}>{address}</Text>
            </View>
          ))}
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.xl,
    overflow: 'hidden',
    marginBottom: spacing.lg,
    ...shadows.lg,
  },
  image: {
    width: '100%',
    height: 180,
  },
  logoContainer: {
    position: 'absolute',
    top: 140,
    left: spacing.lg,
    width: 80,
    height: 80,
    borderRadius: borderRadius.lg,
    borderWidth: 3,
    borderColor: colors.surface,
    overflow: 'hidden',
    ...shadows.lg,
  },
  logo: {
    width: '100%',
    height: '100%',
  },
  content: {
    padding: spacing.lg,
    paddingTop: spacing.xl + spacing.lg,
  },
  name: {
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.bold,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    marginBottom: spacing.sm,
  },
  ratingText: {
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.medium,
    color: colors.text,
  },
  reviewCount: {
    fontSize: typography.sizes.sm,
    color: colors.textSecondary,
  },
  description: {
    fontSize: typography.sizes.sm,
    color: colors.textSecondary,
    lineHeight: typography.sizes.sm * 1.5,
    marginBottom: spacing.md,
  },
  stats: {
    flexDirection: 'row',
    gap: spacing.lg,
    marginBottom: spacing.md,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  statText: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.medium,
    color: colors.text,
  },
  addresses: {
    backgroundColor: colors.surfaceRed,
    padding: spacing.md,
    borderRadius: borderRadius.md,
  },
  addressTitle: {
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.semibold,
    color: colors.text,
    marginBottom: spacing.sm,
  },
  addressItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.xs,
    marginBottom: spacing.xs,
  },
  addressText: {
    fontSize: typography.sizes.sm,
    color: colors.textSecondary,
    flex: 1,
  },
});
