import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, spacing, typography, borderRadius, shadows, gradients } from '@/constants/theme';
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
    <View style={styles.container}>
      <LinearGradient
        colors={['#FFFFFF', '#F8F9FA', '#F1F3F5']}
        style={StyleSheet.absoluteFill}
      />

      <SafeAreaView style={commonStyles.container} edges={['top']}>
        <View style={styles.headerWrapper}>
          <BlurView intensity={80} style={styles.headerBlur}>
            <View style={[styles.header, { paddingTop: Math.max(8, insets.top) }]}>
              <View style={styles.headerTop}>
                <View>
                  <Text style={styles.greeting}>Добро пожаловать,</Text>
                  <Text style={styles.logo}>KG Market</Text>
                </View>
                <View style={styles.headerIcons}>
                  <Pressable
                    style={styles.iconButton}
                    onPress={() => router.push('/favorites')}
                  >
                    <MaterialIcons name="favorite-border" size={26} color={colors.text} />
                  </Pressable>
                  <Pressable
                    style={styles.iconButton}
                    onPress={() => router.push('/cart')}
                  >
                    <View style={styles.cartBadgeContainer}>
                      <MaterialIcons name="shopping-bag" size={26} color={colors.text} />
                      <View style={styles.badge}>
                        <Text style={styles.badgeText}>3</Text>
                      </View>
                    </View>
                  </Pressable>
                </View>
              </View>
              <View style={styles.searchWrapper}>
                <SearchBar
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                  onFilterPress={() => setFilterModalVisible(true)}
                />
              </View>
            </View>
          </BlurView>
        </View>

        <ScrollView
          style={styles.content}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
        >
          <View style={styles.categorySection}>
            <Text style={styles.sectionTitleSmall}>Категории</Text>
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

          <View style={styles.bannerSection}>
            {banners.map(banner => (
              <HeroBanner
                key={banner.id}
                banner={banner}
                onPress={() => { }}
              />
            ))}
          </View>

          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <View>
                <Text style={styles.sectionTitle}>Вам понравится</Text>
                <Text style={styles.sectionSubtitle}>Лучшие предложения сегодня</Text>
              </View>
              <Pressable style={styles.seeAllButton}>
                <Text style={styles.seeAllText}>Все</Text>
                <MaterialIcons name="chevron-right" size={20} color={colors.primary} />
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerWrapper: {
    zIndex: 10,
    backgroundColor: 'transparent',
  },
  headerBlur: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  header: {
    paddingBottom: spacing.sm,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.sm,
  },
  greeting: {
    fontSize: typography.sizes.xs,
    color: colors.textLight,
    fontWeight: typography.weights.medium,
    marginBottom: 2,
  },
  logo: {
    fontSize: typography.sizes.xxl,
    fontWeight: typography.weights.bold,
    color: colors.text,
    letterSpacing: -0.5,
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  iconButton: {
    padding: spacing.xs,
  },
  cartBadgeContainer: {
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: colors.primary,
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.surface,
  },
  badgeText: {
    color: colors.surface,
    fontSize: 10,
    fontWeight: 'bold',
  },
  searchWrapper: {
    paddingHorizontal: spacing.sm,
  },
  content: {
    flex: 1,
  },
  categorySection: {
    paddingVertical: spacing.md,
  },
  sectionTitleSmall: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.bold,
    color: colors.textSecondary,
    paddingHorizontal: spacing.md,
    marginBottom: spacing.sm,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  categoryList: {
    paddingHorizontal: spacing.md,
    gap: spacing.sm,
  },
  bannerSection: {
    paddingVertical: spacing.xs,
  },
  section: {
    paddingVertical: spacing.md,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingHorizontal: spacing.md,
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.bold,
    color: colors.text,
    letterSpacing: -0.5,
  },
  sectionSubtitle: {
    fontSize: typography.sizes.sm,
    color: colors.textLight,
    marginTop: 2,
  },
  seeAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceSecondary,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.full,
  },
  seeAllText: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.semibold,
    color: colors.primary,
    marginRight: 2,
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
