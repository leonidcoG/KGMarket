/*
 * @Description: Shops screen
 */

import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { MaterialIcons } from '@expo/vector-icons';
import { colors, spacing, typography, borderRadius, shadows } from '@/constants/theme';
import { commonStyles } from '@/constants/styles';
import { ShopCard, ProductCard } from '@/components';
import { getShops, getFeedItems } from '@/services/feedService';
import { getProducts } from '@/services/productService';

export default function ShopsScreen() {
  const insets = useSafeAreaInsets();
  const shops = getShops();
  const [selectedShop] = useState(shops[0]);
  const feedItems = getFeedItems();
  const products = getProducts().slice(0, 6);

  return (
    <SafeAreaView style={commonStyles.container} edges={['top']}>
      <View style={[styles.header, { paddingTop: Math.max(8, insets.top) }]}>
        <Text style={styles.title}>Магазины</Text>
      </View>

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Shop Header */}
        <View style={styles.shopHeader}>
          <Image
            source={{ uri: selectedShop.image }}
            style={styles.shopCover}
            contentFit="cover"
            transition={200}
          />
          
          <View style={styles.shopLogoContainer}>
            <Image
              source={{ uri: selectedShop.logo }}
              style={styles.shopLogo}
              contentFit="cover"
              transition={200}
            />
          </View>

          <View style={styles.shopInfo}>
            <Text style={styles.shopName}>{selectedShop.name}</Text>
            
            <View style={styles.shopRating}>
              <MaterialIcons name="star" size={18} color={colors.accent} />
              <Text style={styles.shopRatingText}>{selectedShop.rating}</Text>
              <Text style={styles.shopReviewCount}>({selectedShop.reviewCount})</Text>
            </View>

            <Text style={styles.shopDescription}>{selectedShop.description}</Text>

            <View style={styles.shopAddresses}>
              {selectedShop.addresses.map((address, index) => (
                <View key={index} style={styles.addressRow}>
                  <MaterialIcons name="location-on" size={16} color={colors.primary} />
                  <Text style={styles.addressText}>{address}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* Video Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Видео от магазина</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.videoList}
          >
            {feedItems.map(item => (
              <Pressable key={item.id} style={styles.videoItem}>
                <Image
                  source={{ uri: item.type === 'video' ? item.thumbnail : item.mediaUrl }}
                  style={styles.videoThumbnail}
                  contentFit="cover"
                  transition={200}
                />
                {item.type === 'video' && (
                  <View style={styles.playButton}>
                    <MaterialIcons name="play-arrow" size={32} color={colors.textOnPrimary} />
                  </View>
                )}
                <View style={styles.videoStats}>
                  <View style={styles.videoStat}>
                    <MaterialIcons name="favorite" size={14} color={colors.textOnPrimary} />
                    <Text style={styles.videoStatText}>{item.likes}</Text>
                  </View>
                </View>
              </Pressable>
            ))}
          </ScrollView>
        </View>

        {/* Products Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Товары магазина</Text>
            <Pressable>
              <Text style={styles.seeAll}>Все товары</Text>
            </Pressable>
          </View>

          <View style={styles.productGrid}>
            {products.map(product => (
              <View key={product.id} style={styles.productItem}>
                <ProductCard product={product} onPress={() => {}} />
              </View>
            ))}
          </View>
        </View>

        {/* Other Shops */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Другие магазины</Text>
          {shops.slice(1).map(shop => (
            <ShopCard key={shop.id} shop={shop} onPress={() => {}} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
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
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: spacing.xl,
  },
  shopHeader: {
    backgroundColor: colors.surface,
    marginBottom: spacing.lg,
    ...shadows.md,
  },
  shopCover: {
    width: '100%',
    height: 200,
  },
  shopLogoContainer: {
    position: 'absolute',
    top: 160,
    left: spacing.lg,
    width: 80,
    height: 80,
    borderRadius: borderRadius.lg,
    borderWidth: 3,
    borderColor: colors.surface,
    overflow: 'hidden',
    ...shadows.lg,
  },
  shopLogo: {
    width: '100%',
    height: '100%',
  },
  shopInfo: {
    padding: spacing.lg,
    paddingTop: spacing.xl + spacing.lg,
  },
  shopName: {
    fontSize: typography.sizes.xxl,
    fontWeight: typography.weights.bold,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  shopRating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    marginBottom: spacing.sm,
  },
  shopRatingText: {
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.medium,
    color: colors.text,
  },
  shopReviewCount: {
    fontSize: typography.sizes.sm,
    color: colors.textSecondary,
  },
  shopDescription: {
    fontSize: typography.sizes.sm,
    color: colors.textSecondary,
    lineHeight: typography.sizes.sm * 1.5,
    marginBottom: spacing.md,
  },
  shopAddresses: {
    backgroundColor: colors.surfaceRed,
    padding: spacing.md,
    borderRadius: borderRadius.md,
  },
  addressRow: {
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
  section: {
    marginBottom: spacing.lg,
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
    paddingHorizontal: spacing.md,
    marginBottom: spacing.md,
  },
  seeAll: {
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.medium,
    color: colors.primary,
  },
  videoList: {
    paddingHorizontal: spacing.md,
    gap: spacing.sm,
  },
  videoItem: {
    width: 140,
    height: 220,
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    position: 'relative',
    ...shadows.md,
  },
  videoThumbnail: {
    width: '100%',
    height: '100%',
  },
  playButton: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -20 }, { translateY: -20 }],
    width: 40,
    height: 40,
    borderRadius: borderRadius.full,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoStats: {
    position: 'absolute',
    bottom: spacing.sm,
    left: spacing.sm,
    right: spacing.sm,
  },
  videoStat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  videoStatText: {
    fontSize: typography.sizes.xs,
    fontWeight: typography.weights.semibold,
    color: colors.textOnPrimary,
    textShadowColor: 'rgba(0,0,0,0.8)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
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
