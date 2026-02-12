/*
 * @Description: Product detail screen
 */

import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { MaterialIcons } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';
import { colors, spacing, typography, borderRadius, shadows } from '@/constants/theme';
import { getProducts } from '@/services/productService';
import { useAlert } from '@/template';

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams();
  const { showAlert } = useAlert();
  const insets = useSafeAreaInsets();
  const product = getProducts().find(p => p.id === id);
  
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  if (!product) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Товар не найден</Text>
      </View>
    );
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      showAlert('Выберите размер', 'Пожалуйста, выберите размер товара');
      return;
    }
    showAlert('Добавлено в корзину', `${product.name} добавлен в корзину`);
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Image
          source={{ uri: product.image }}
          style={styles.image}
          contentFit="cover"
          transition={200}
        />

        <View style={styles.content}>
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <Text style={styles.brand}>{product.brand}</Text>
              <Text style={styles.name}>{product.name}</Text>
              
              <View style={styles.rating}>
                <MaterialIcons name="star" size={16} color={colors.accent} />
                <Text style={styles.ratingText}>{product.rating}</Text>
                <Text style={styles.reviewCount}>({product.reviewCount} отзывов)</Text>
              </View>
            </View>
            
            <Pressable style={styles.favoriteButton}>
              <MaterialIcons name="favorite-border" size={24} color={colors.primary} />
            </Pressable>
          </View>

          <View style={styles.priceSection}>
            <Text style={styles.price}>{product.price.toLocaleString('ru-RU')} сом</Text>
            {product.originalPrice && (
              <View style={styles.discountRow}>
                <Text style={styles.originalPrice}>
                  {product.originalPrice.toLocaleString('ru-RU')} сом
                </Text>
                <View style={styles.discountBadge}>
                  <Text style={styles.discountText}>-{product.discount}%</Text>
                </View>
              </View>
            )}
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Размер</Text>
            <View style={styles.sizeGrid}>
              {product.sizes.map(size => (
                <Pressable
                  key={size}
                  style={[styles.sizeButton, selectedSize === size && styles.sizeButtonSelected]}
                  onPress={() => setSelectedSize(size)}
                >
                  <Text style={[styles.sizeText, selectedSize === size && styles.sizeTextSelected]}>
                    {size}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Цвет</Text>
            <View style={styles.colorGrid}>
              {product.colors.map((color, index) => (
                <Pressable
                  key={index}
                  style={[
                    styles.colorButton,
                    { backgroundColor: color },
                    selectedColor === color && styles.colorButtonSelected,
                  ]}
                  onPress={() => setSelectedColor(color)}
                />
              ))}
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Описание</Text>
            <Text style={styles.description}>
              Качественный товар от бренда {product.brand}. Идеально подходит для повседневного использования. 
              Изготовлено из высококачественных материалов с использованием современных технологий.
            </Text>
          </View>
        </View>
      </ScrollView>

      <View style={[styles.footer, { paddingBottom: Math.max(16, insets.bottom) }]}>
        <Pressable style={styles.addToCartButton} onPress={handleAddToCart}>
          <MaterialIcons name="shopping-cart" size={24} color={colors.textOnPrimary} />
          <Text style={styles.addToCartText}>Добавить в корзину</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: typography.sizes.lg,
    color: colors.textSecondary,
  },
  image: {
    width: '100%',
    aspectRatio: 3 / 4,
  },
  content: {
    padding: spacing.lg,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.lg,
  },
  headerLeft: {
    flex: 1,
  },
  brand: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.medium,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  name: {
    fontSize: typography.sizes.xxl,
    fontWeight: typography.weights.bold,
    color: colors.text,
    marginBottom: spacing.sm,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
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
  favoriteButton: {
    width: 48,
    height: 48,
    borderRadius: borderRadius.full,
    backgroundColor: colors.surfaceRed,
    justifyContent: 'center',
    alignItems: 'center',
  },
  priceSection: {
    marginBottom: spacing.xl,
  },
  price: {
    fontSize: typography.sizes.xxxl,
    fontWeight: typography.weights.bold,
    color: colors.primary,
    marginBottom: spacing.xs,
  },
  discountRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  originalPrice: {
    fontSize: typography.sizes.lg,
    color: colors.textLight,
    textDecorationLine: 'line-through',
  },
  discountBadge: {
    backgroundColor: colors.surfaceRed,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
  },
  discountText: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.bold,
    color: colors.primary,
  },
  section: {
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.semibold,
    color: colors.text,
    marginBottom: spacing.md,
  },
  sizeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  sizeButton: {
    minWidth: 60,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.md,
    backgroundColor: colors.surfaceRed,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
  },
  sizeButtonSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  sizeText: {
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.medium,
    color: colors.text,
  },
  sizeTextSelected: {
    color: colors.textOnPrimary,
  },
  colorGrid: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  colorButton: {
    width: 44,
    height: 44,
    borderRadius: borderRadius.full,
    borderWidth: 3,
    borderColor: 'transparent',
  },
  colorButtonSelected: {
    borderColor: colors.primary,
  },
  description: {
    fontSize: typography.sizes.md,
    color: colors.textSecondary,
    lineHeight: typography.sizes.md * 1.6,
  },
  footer: {
    padding: spacing.lg,
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  addToCartButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.lg,
    ...shadows.lg,
  },
  addToCartText: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,
    color: colors.textOnPrimary,
  },
});
