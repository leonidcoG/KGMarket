/*
 * @Description: Shops screen
 */

import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Linking } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { colors, spacing, typography, borderRadius, shadows } from '@/constants/theme';
import { commonStyles } from '@/constants/styles';
import { ShopCard, ProductCard } from '@/components';
import { getShops, getFeedItems } from '@/services/feedService';
import { getProducts } from '@/services/productService';

export default function ShopsScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const shops = getShops();
  const [selectedShop] = useState(shops[0]);
  const feedItems = getFeedItems();
  const products = getProducts().slice(0, 6);

  const handleCall = (phone: string) => {
    Linking.openURL(`tel:${phone}`);
  };

  const handleChat = (phone: string) => {
    // Открыть WhatsApp
    Linking.openURL(`whatsapp://send?phone=${phone}`);
  };

  const handleMap = (coords: { latitude: number; longitude: number }) => {
    // Открыть карту (Google Maps или аналоги)
    const url = `geo:${coords.latitude},${coords.longitude}?q=${coords.latitude},${coords.longitude}`;
    Linking.openURL(url);
  };

  const handleSchema = (url?: string) => {
    if (url) Linking.openURL(url);
  };

  return (
    <SafeAreaView style={commonStyles.container} edges={['top']}>
      <View style={[styles.header, { paddingTop: Math.max(8, insets.top) }]}>
        <Text style={styles.title}>Магазины</Text>
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
        {/* Главный магазин */}
        <ShopCard
          shop={selectedShop}
          onPress={() => { }}
          onCallPress={() => handleCall(selectedShop.phone)}
          onChatPress={() => handleChat(selectedShop.phone)}
          onMapPress={() => handleMap(selectedShop.coordinates)}
          onSchemaPress={() => handleSchema(selectedShop.schemaUrl)}
        />

        {/* Секция видео */}
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
                <ProductCard product={product} onPress={() => { }} />
              </View>
            ))}
          </View>
        </View>

        {/* Other Shops */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Другие магазины</Text>
          {shops.slice(1).map(shop => (
            <ShopCard
              key={shop.id}
              shop={shop}
              onPress={() => { }}
              onCallPress={() => handleCall(shop.phone)}
              onChatPress={() => handleChat(shop.phone)}
              onMapPress={() => handleMap(shop.coordinates)}
              onSchemaPress={() => handleSchema(shop.schemaUrl)}
            />
          ))}
        </View>
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
    paddingBottom: spacing.xl,
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
