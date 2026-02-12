/*
 * @Description: Filter modal component
 */

import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, Pressable, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors, spacing, borderRadius, typography, shadows } from '@/constants/theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface FilterModalProps {
  visible: boolean;
  onClose: () => void;
  onApply: (filters: Filters) => void;
}

export interface Filters {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  sizes?: string[];
  brands?: string[];
}

const categories = ['Все', 'Женщинам', 'Мужчинам', 'Детям', 'Аксессуары'];
const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
const brands = ['Bishkek Fashion', 'Ala-Too Style', 'Denim KG', 'Warm KG', 'Elite Fashion'];
const priceRanges = [
  { label: 'До 2000 сом', min: 0, max: 2000 },
  { label: '2000 - 5000 сом', min: 2000, max: 5000 },
  { label: '5000 - 10000 сом', min: 5000, max: 10000 },
  { label: 'Более 10000 сом', min: 10000, max: 999999 },
];

export const FilterModal: React.FC<FilterModalProps> = ({ visible, onClose, onApply }) => {
  const insets = useSafeAreaInsets();
  const [selectedCategory, setSelectedCategory] = useState<string>('Все');
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState<number>(0);

  const toggleSize = (size: string) => {
    setSelectedSizes(prev =>
      prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]
    );
  };

  const toggleBrand = (brand: string) => {
    setSelectedBrands(prev =>
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    );
  };

  const handleReset = () => {
    setSelectedCategory('Все');
    setSelectedSizes([]);
    setSelectedBrands([]);
    setSelectedPriceRange(0);
  };

  const handleApply = () => {
    const range = priceRanges[selectedPriceRange];
    onApply({
      category: selectedCategory === 'Все' ? undefined : selectedCategory,
      minPrice: range?.min,
      maxPrice: range?.max,
      sizes: selectedSizes.length > 0 ? selectedSizes : undefined,
      brands: selectedBrands.length > 0 ? selectedBrands : undefined,
    });
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={[styles.container, { paddingTop: insets.top }]}>
          <View style={styles.header}>
            <Text style={styles.title}>Фильтры</Text>
            <Pressable onPress={onClose}>
              <MaterialIcons name="close" size={24} color={colors.text} />
            </Pressable>
          </View>

          <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Категория</Text>
              <View style={styles.chipGrid}>
                {categories.map(cat => (
                  <Pressable
                    key={cat}
                    style={[styles.chip, selectedCategory === cat && styles.chipSelected]}
                    onPress={() => setSelectedCategory(cat)}
                  >
                    <Text style={[styles.chipText, selectedCategory === cat && styles.chipTextSelected]}>
                      {cat}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Цена</Text>
              <View style={styles.chipGrid}>
                {priceRanges.map((range, index) => (
                  <Pressable
                    key={index}
                    style={[styles.chip, selectedPriceRange === index && styles.chipSelected]}
                    onPress={() => setSelectedPriceRange(index)}
                  >
                    <Text style={[styles.chipText, selectedPriceRange === index && styles.chipTextSelected]}>
                      {range.label}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Размер</Text>
              <View style={styles.chipGrid}>
                {sizes.map(size => (
                  <Pressable
                    key={size}
                    style={[styles.sizeChip, selectedSizes.includes(size) && styles.chipSelected]}
                    onPress={() => toggleSize(size)}
                  >
                    <Text style={[styles.chipText, selectedSizes.includes(size) && styles.chipTextSelected]}>
                      {size}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Бренд</Text>
              <View style={styles.chipGrid}>
                {brands.map(brand => (
                  <Pressable
                    key={brand}
                    style={[styles.chip, selectedBrands.includes(brand) && styles.chipSelected]}
                    onPress={() => toggleBrand(brand)}
                  >
                    <Text style={[styles.chipText, selectedBrands.includes(brand) && styles.chipTextSelected]}>
                      {brand}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </View>
          </ScrollView>

          <View style={[styles.footer, { paddingBottom: Math.max(16, insets.bottom) }]}>
            <Pressable style={styles.resetButton} onPress={handleReset}>
              <Text style={styles.resetText}>Сбросить</Text>
            </Pressable>
            <Pressable style={styles.applyButton} onPress={handleApply}>
              <Text style={styles.applyText}>Применить</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  container: {
    backgroundColor: colors.background,
    borderTopLeftRadius: borderRadius.xxl,
    borderTopRightRadius: borderRadius.xxl,
    maxHeight: '90%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  title: {
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.bold,
    color: colors.text,
  },
  content: {
    flex: 1,
    padding: spacing.lg,
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
  chipGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  chip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.full,
    backgroundColor: colors.surfaceRed,
    borderWidth: 1,
    borderColor: colors.border,
  },
  chipSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  sizeChip: {
    width: 60,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.md,
    backgroundColor: colors.surfaceRed,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
  },
  chipText: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.medium,
    color: colors.text,
  },
  chipTextSelected: {
    color: colors.textOnPrimary,
  },
  footer: {
    flexDirection: 'row',
    gap: spacing.md,
    padding: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  resetButton: {
    flex: 1,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.lg,
    backgroundColor: colors.surfaceRed,
    alignItems: 'center',
  },
  resetText: {
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.semibold,
    color: colors.primary,
  },
  applyButton: {
    flex: 1,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.lg,
    backgroundColor: colors.primary,
    alignItems: 'center',
    ...shadows.md,
  },
  applyText: {
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.semibold,
    color: colors.textOnPrimary,
  },
});
