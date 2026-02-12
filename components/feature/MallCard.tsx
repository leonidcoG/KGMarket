/*
 * @Description: Mall card component
 */

import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Image } from 'expo-image';
import { MaterialIcons } from '@expo/vector-icons';
import { colors, spacing, borderRadius, typography, shadows } from '@/constants/theme';
import { Mall } from '@/types/feed';

interface MallCardProps {
  mall: Mall;
}

export const MallCard: React.FC<MallCardProps> = ({ mall }) => {
  return (
    <View style={styles.card}>
      <Image
        source={{ uri: mall.image }}
        style={styles.image}
        contentFit="cover"
        transition={200}
      />
      
      <View style={styles.content}>
        <Text style={styles.name}>{mall.name}</Text>
        
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

        <Pressable style={styles.button}>
          <MaterialIcons name="directions" size={20} color={colors.textOnPrimary} />
          <Text style={styles.buttonText}>Как добраться</Text>
        </Pressable>
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
    ...shadows.lg,
  },
  image: {
    width: '100%',
    height: 200,
  },
  content: {
    padding: spacing.lg,
  },
  name: {
    fontSize: typography.sizes.xxl,
    fontWeight: typography.weights.bold,
    color: colors.text,
    marginBottom: spacing.md,
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
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.lg,
    marginTop: spacing.md,
    ...shadows.md,
  },
  buttonText: {
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.bold,
    color: colors.textOnPrimary,
  },
});
