/*
 * @Description: Mall card component
 */

import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Linking } from 'react-native';
import { Image } from 'expo-image';
import { MaterialIcons } from '@expo/vector-icons';
import { colors, spacing, borderRadius, typography, shadows } from '@/constants/theme';
import { Mall } from '@/types/feed';

interface MallCardProps {
  mall: Mall;
  onMapPress: () => void;
  onShopsPress: () => void;
  onNewsPress: () => void;
}

export const MallCard: React.FC<MallCardProps> = ({ mall, onMapPress, onShopsPress, onNewsPress }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % mall.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + mall.images.length) % mall.images.length);
  };

  const handleWebsitePress = () => {
    if (mall.websiteUrl) {
      Linking.openURL(mall.websiteUrl).catch(err => console.error("Couldn't load page", err));
    } else if (mall.schemaUrl) {
      // Fallback to schema url if website is not provided
      Linking.openURL(mall.schemaUrl).catch(err => console.error("Couldn't load page", err));
    }
  };

  const handleSchemaPress = () => {
    if (mall.schemaUrl) {
      Linking.openURL(mall.schemaUrl).catch(err => console.error("Couldn't load page", err));
    }
  };

  return (
    <View style={styles.card}>
      <View style={styles.imageContainer}>
        <Image
          key={`mall-img-${currentImageIndex}`}
          source={typeof mall.images[currentImageIndex] === 'string' ? { uri: mall.images[currentImageIndex] } : mall.images[currentImageIndex]}
          style={styles.image}
          contentFit="cover"
        />

        {mall.images.length > 1 && (
          <>
            <Pressable style={[styles.navButton, styles.leftButton]} onPress={prevImage}>
              <MaterialIcons name="chevron-left" size={32} color={colors.surface} />
            </Pressable>
            <Pressable style={[styles.navButton, styles.rightButton]} onPress={nextImage}>
              <MaterialIcons name="chevron-right" size={32} color={colors.surface} />
            </Pressable>

            <View style={styles.imageCounter}>
              <Text style={styles.counterText}>
                {currentImageIndex + 1} / {mall.images.length}
              </Text>
            </View>
          </>
        )}
      </View>

      <View style={styles.content}>
        <View style={styles.nameRow}>
          <Text style={styles.name}>{mall.name}</Text>
          {mall.websiteUrl && (
            <Pressable onPress={handleWebsitePress} style={styles.websiteIconButton}>
              <MaterialIcons name="public" size={24} color={colors.primary} />
            </Pressable>
          )}
        </View>

        <Text style={styles.description} numberOfLines={2}>
          {mall.description}
        </Text>

        <View style={styles.infoRow}>
          <MaterialIcons name="location-on" size={18} color={colors.primary} />
          <Text style={styles.infoText}>{mall.address}</Text>
        </View>

        <View style={styles.infoRow}>
          <MaterialIcons name="schedule" size={18} color={colors.primary} />
          <Text style={styles.infoText}>{mall.schedule}</Text>
        </View>

        <View style={styles.infoRow}>
          <MaterialIcons name="phone" size={18} color={colors.primary} />
          <Text style={styles.infoText}>{mall.phone}</Text>
        </View>

        <View style={styles.promotions}>
          <Text style={styles.promotionsTitle}>Текущие акции:</Text>
          {mall.promotions.map((promo, index) => (
            <View key={index} style={styles.promotionItem}>
              <MaterialIcons name="local-offer" size={16} color={colors.accent} />
              <Text style={styles.promotionText}>{promo}</Text>
            </View>
          ))}
        </View>

        <View style={styles.buttonRow}>
          <Pressable style={[styles.button, styles.newsButton]} onPress={onNewsPress}>
            <MaterialIcons name="article" size={20} color={colors.textOnPrimary} />
            <Text style={styles.buttonText}>Новости</Text>
          </Pressable>

          <Pressable style={[styles.button, styles.shopsButton]} onPress={onShopsPress}>
            <MaterialIcons name="store" size={20} color={colors.textOnPrimary} />
            <Text style={styles.buttonText}>Магазины</Text>
          </Pressable>
        </View>

        <View style={styles.buttonRow}>
          <Pressable style={[styles.button, styles.outlineButton]} onPress={onMapPress}>
            <MaterialIcons name="map" size={20} color={colors.text} />
            <Text style={styles.outlineButtonText}>На карте</Text>
          </Pressable>

          {mall.schemaUrl && (
            <Pressable style={[styles.button, styles.outlineButton]} onPress={handleSchemaPress}>
              <MaterialIcons name="grid-on" size={20} color={colors.text} />
              <Text style={styles.outlineButtonText}>Схема ТЦ</Text>
            </Pressable>
          )}
        </View>
      </View>
    </View>
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
    height: 200,
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
  content: {
    padding: spacing.lg,
  },
  nameRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  name: {
    fontSize: typography.sizes.xxl,
    fontWeight: typography.weights.bold,
    color: colors.text,
    flex: 1,
  },
  websiteIconButton: {
    padding: spacing.xs,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.sm,
  },
  infoText: {
    fontSize: typography.sizes.md,
    color: colors.textSecondary,
    flex: 1,
  },
  promotions: {
    marginTop: spacing.md,
    padding: spacing.md,
    backgroundColor: colors.surfaceRed,
    borderRadius: borderRadius.md,
  },
  promotionsTitle: {
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.bold,
    color: colors.text,
    marginBottom: spacing.sm,
  },
  promotionItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.sm,
    marginBottom: spacing.xs,
  },
  promotionText: {
    fontSize: typography.sizes.sm,
    color: colors.textSecondary,
    flex: 1,
  },
  description: {
    fontSize: typography.sizes.md,
    color: colors.textSecondary,
    marginBottom: spacing.md,
    lineHeight: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: spacing.md,
    marginTop: spacing.md,
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
    paddingVertical: spacing.md * 0.7, // Reduced height by 30%
    borderRadius: borderRadius.lg,
    ...shadows.md,
  },
  newsButton: {
    backgroundColor: colors.primary,
  },
  shopsButton: {
    backgroundColor: colors.primary,
  },
  outlineButton: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.text, // Changed to black/text color
  },
  buttonText: {
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.bold,
    color: colors.textOnPrimary,
  },
  outlineButtonText: {
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.regular,
    color: colors.text,
  },
});
