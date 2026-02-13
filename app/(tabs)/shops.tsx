import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Linking } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
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
    Linking.openURL(`whatsapp://send?phone=${phone}`);
  };

  const handleMap = (coords: { latitude: number; longitude: number }) => {
    const url = `geo:${coords.latitude},${coords.longitude}?q=${coords.latitude},${coords.longitude}`;
    Linking.openURL(url);
  };

  const handleSchema = (url?: string) => {
    if (url) Linking.openURL(url);
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
              <View>
                <Text style={styles.subtitleHeader}>Модные бутики</Text>
                <Text style={styles.title}>Магазины</Text>
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
                  <MaterialIcons name="shopping-bag" size={26} color={colors.text} />
                </Pressable>
              </View>
            </View>
          </BlurView>
        </View>

        <ScrollView
          style={styles.content}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Главный магазин */}
          <View style={styles.featuredShop}>
            <Text style={styles.sectionTitleSmall}>Рекомендуемый выбор</Text>
            <ShopCard
              shop={selectedShop}
              onPress={() => { }}
              onCallPress={() => handleCall(selectedShop.phone)}
              onChatPress={() => handleChat(selectedShop.phone)}
              onMapPress={() => handleMap(selectedShop.coordinates)}
              onSchemaPress={() => handleSchema(selectedShop.schemaUrl)}
            />
          </View>

          {/* Секция видео */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <View>
                <Text style={styles.sectionTitle}>Вдохновение</Text>
                <Text style={styles.sectionSubtitleText}>Видео от наших магазинов</Text>
              </View>
            </View>
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
                    transition={400}
                  />
                  <LinearGradient
                    colors={['transparent', 'rgba(0,0,0,0.6)']}
                    style={styles.videoOverlay}
                  />
                  {item.type === 'video' && (
                    <View style={styles.playButton}>
                      <MaterialIcons name="play-arrow" size={28} color="#FFF" />
                    </View>
                  )}
                  <View style={styles.videoStats}>
                    <View style={styles.videoStat}>
                      <MaterialIcons name="favorite" size={12} color="#FFF" />
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
              <View>
                <Text style={styles.sectionTitle}>Новые коллекции</Text>
                <Text style={styles.sectionSubtitleText}>Последние поступления</Text>
              </View>
              <Pressable style={styles.seeAllButton}>
                <Text style={styles.seeAllText}>Все</Text>
                <MaterialIcons name="chevron-right" size={20} color={colors.primary} />
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
            <View style={styles.otherShopsList}>
              {shops.slice(1).map(shop => (
                <View key={shop.id} style={styles.otherShopItem}>
                  <ShopCard
                    shop={shop}
                    onPress={() => { }}
                    onCallPress={() => handleCall(shop.phone)}
                    onChatPress={() => handleChat(shop.phone)}
                    onMapPress={() => handleMap(shop.coordinates)}
                    onSchemaPress={() => handleSchema(shop.schemaUrl)}
                  />
                </View>
              ))}
            </View>
          </View>
        </ScrollView>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.md,
  },
  subtitleHeader: {
    fontSize: typography.sizes.xs,
    color: colors.textLight,
    fontWeight: typography.weights.medium,
    marginBottom: 2,
  },
  title: {
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
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: spacing.xl,
  },
  featuredShop: {
    marginTop: spacing.md,
    paddingHorizontal: spacing.md,
    marginBottom: spacing.lg,
  },
  sectionTitleSmall: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.bold,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  section: {
    marginBottom: spacing.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingHorizontal: spacing.md,
    marginBottom: spacing.md,
  },
  sectionTitle: {
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.bold,
    color: colors.text,
    letterSpacing: -0.5,
  },
  sectionSubtitleText: {
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
  videoList: {
    paddingHorizontal: spacing.md,
    gap: spacing.md,
  },
  videoItem: {
    width: 160,
    height: 240,
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    position: 'relative',
    ...shadows.md,
    backgroundColor: colors.surfaceSecondary,
  },
  videoThumbnail: {
    width: '100%',
    height: '100%',
  },
  videoOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '50%',
  },
  playButton: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -20 }, { translateY: -20 }],
    width: 40,
    height: 40,
    borderRadius: borderRadius.full,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.4)',
  },
  videoStats: {
    position: 'absolute',
    bottom: spacing.sm,
    left: spacing.sm,
  },
  videoStat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  videoStatText: {
    fontSize: typography.sizes.xs,
    fontWeight: typography.weights.bold,
    color: '#FFF',
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
  otherShopsList: {
    paddingHorizontal: spacing.md,
  },
  otherShopItem: {
    marginBottom: spacing.md,
  },
});
