/*
 * @Description: Shop card component
 */

import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Image } from 'expo-image';
import { MaterialIcons } from '@expo/vector-icons';
import { colors, spacing, borderRadius, typography, shadows } from '@/constants/theme';
import { Shop } from '@/types/feed';

interface ShopCardProps {
  shop: Shop;
  onPress: () => void;
  onCallPress: () => void;
  onChatPress: () => void;
  onMapPress: () => void;
  onSchemaPress: () => void;
}

export const ShopCard: React.FC<ShopCardProps> = ({
  shop,
  onPress,
  onCallPress,
  onChatPress,
  onMapPress,
  onSchemaPress
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % shop.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + shop.images.length) % shop.images.length);
  };

  return (
    <Pressable style={styles.card} onPress={onPress}>
      <View style={styles.imageContainer}>
        <Image
          key={`shop-img-${currentImageIndex}`}
          source={typeof shop.images[currentImageIndex] === 'string' ? { uri: shop.images[currentImageIndex] } : shop.images[currentImageIndex]}
          style={styles.image}
          contentFit="cover"
        />

        {shop.images.length > 1 && (
          <>
            <Pressable style={[styles.navButton, styles.leftButton]} onPress={prevImage}>
              <MaterialIcons name="chevron-left" size={32} color={colors.surface} />
            </Pressable>
            <Pressable style={[styles.navButton, styles.rightButton]} onPress={nextImage}>
              <MaterialIcons name="chevron-right" size={32} color={colors.surface} />
            </Pressable>

            <View style={styles.imageCounter}>
              <Text style={styles.counterText}>
                {currentImageIndex + 1} / {shop.images.length}
              </Text>
            </View>
          </>
        )}
      </View>

      <View style={styles.logoContainer}>
        <Image
          source={typeof shop.logo === 'string' ? { uri: shop.logo } : shop.logo}
          style={styles.logo}
          contentFit="cover"
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

        <View style={styles.actions}>
          {/* Ряд 1: Позвонить и Чат */}
          <View style={styles.actionRow}>
            <Pressable style={[styles.button, styles.primaryButton]} onPress={onCallPress}>
              <MaterialIcons name="call" size={20} color={colors.textOnPrimary} />
              <Text style={styles.primaryButtonText}>Позвонить</Text>
            </Pressable>

            <Pressable style={[styles.button, styles.secondaryButton]} onPress={onChatPress}>
              <MaterialIcons name="chat" size={20} color={colors.primary} />
              <Text style={styles.secondaryButtonText}>Чат с продавцом</Text>
            </Pressable>
          </View>

          {/* Ряд 2: На карте и Схема */}
          <View style={styles.actionRow}>
            <Pressable style={[styles.button, styles.outlineButton]} onPress={onMapPress}>
              <MaterialIcons name="map" size={20} color={colors.text} />
              <Text style={styles.outlineButtonText}>На карте</Text>
            </Pressable>

            {shop.schemaUrl && (
              <Pressable style={[styles.button, styles.outlineButton]} onPress={onSchemaPress}>
                <MaterialIcons name="grid-on" size={20} color={colors.text} />
                <Text style={styles.outlineButtonText}>Схема ТЦ</Text>
              </Pressable>
            )}
          </View>
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
    borderWidth: 1,
    borderColor: colors.border,
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: 180,
  },
  image: {
    width: '100%',
    height: '100%',
    backgroundColor: '#eee',
  },
  navButton: {
    position: 'absolute',
    top: '50%',
    marginTop: -20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  leftButton: {
    left: spacing.sm,
  },
  rightButton: {
    right: spacing.sm,
  },
  imageCounter: {
    position: 'absolute',
    bottom: spacing.sm,
    right: spacing.sm,
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: borderRadius.sm,
  },
  counterText: {
    color: colors.surface,
    fontSize: 12,
    fontWeight: 'bold',
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
    backgroundColor: '#eee',
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
    marginBottom: spacing.lg,
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
  actions: {
    gap: spacing.sm,
  },
  actionRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.md,
  },
  primaryButton: {
    backgroundColor: colors.primary,
  },
  secondaryButton: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  outlineButton: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  primaryButtonText: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.bold,
    color: colors.textOnPrimary,
  },
  secondaryButtonText: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.bold,
    color: colors.primary,
  },
  outlineButtonText: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.medium,
    color: colors.text,
  },
});
