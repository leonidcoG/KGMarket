/*
 * @Description: Home screen with feed
 */

import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList, Pressable } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { colors, spacing, typography, borderRadius } from '@/constants/theme';
import { commonStyles } from '@/constants/styles';
import { SearchBar, CategoryChip, HeroBanner, ProductCard, FilterModal, Filters } from '@/components';
import { getBanners, getCategories, getProducts, searchProducts } from '@/services/productService';

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [filters, setFilters] = useState<Filters>({});

  const banners = getBanners();
  const categories = getCategories();
  const products = searchQuery || Object.keys(filters).length > 0
    ? searchProducts(searchQuery, filters)
    : getProducts();

  const handleCategoryPress = (categoryName: string) => {
    setSelectedCategory(prev => prev === categoryName ? null : categoryName);
    setFilters({ ...filters, category: categoryName });
  };

  const handleApplyFilters = (newFilters: Filters) => {
    setFilters(newFilters);
  };

  return (
    <SafeAreaView style={commonStyles.container} edges={['top']}>
      <View style={[styles.header, { paddingTop: Math.max(8, insets.top) }]}>
        <View style={styles.headerTop}>
          <Text style={styles.logo}>KG Market</Text>
          <Pressable>
            <MaterialIcons name="notifications-none" size={24} color={colors.text} />
          </Pressable>
        </View>
        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          onFilterPress={() => setFilterModalVisible(true)}
        />
      </View>

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.categorySection}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoryList}
          >
            {categories.map(cat => (
              <CategoryChip
                key={cat.id}
                icon={cat.icon as any}
                label={cat.name}
                isSelected={selectedCategory === cat.name}
                onPress={() => handleCategoryPress(cat.name)}
              />
            ))}
          </ScrollView>
        </View>

        {banners.map(banner => (
          <HeroBanner
            key={banner.id}
            banner={banner}
            onPress={() => {}}
          />
        ))}

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Популярные товары</Text>
            <Pressable>
              <Text style={styles.seeAll}>Все</Text>
            </Pressable>
          </View>

          <View style={styles.productGrid}>
            {products.map(product => (
              <View key={product.id} style={styles.productItem}>
                <ProductCard
                  product={product}
                  onPress={() => router.push(`/product/${product.id}`)}
                />
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      <FilterModal
        visible={filterModalVisible}
        onClose={() => setFilterModalVisible(false)}
        onApply={handleApplyFilters}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.sm,
  },
  logo: {
    fontSize: typography.sizes.xxl,
    fontWeight: typography.weights.bold,
    color: colors.primary,
  },
  content: {
    flex: 1,
  },
  categorySection: {
    paddingVertical: spacing.md,
  },
  categoryList: {
    paddingHorizontal: spacing.md,
    gap: spacing.sm,
  },
  section: {
    paddingVertical: spacing.md,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    marginBottom: spacing.md,
  },
  sectionTitle: {
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.bold,
    color: colors.text,
  },
  seeAll: {
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.medium,
    color: colors.primary,
  },
  productGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: spacing.sm,
  },
  productItem: {
    width: '50%',
    padding: spacing.sm,
  },
});
