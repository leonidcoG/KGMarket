import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Dimensions } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, spacing, typography, borderRadius } from '@/constants/theme';
import { commonStyles } from '@/constants/styles';
import { MallCard, MallMap, MallMapRef } from '@/components';
import { getMalls } from '@/services/feedService';
import { Mall } from '@/types/feed';

export default function MallScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const malls = getMalls();
  const mapRef = useRef<MallMapRef>(null);

  const [region] = useState({
    latitude: 42.8746,
    longitude: 74.5698,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const handleMapPress = (mall: Mall) => {
    mapRef.current?.animateToRegion({
      latitude: mall.coordinates.latitude,
      longitude: mall.coordinates.longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    });
  };

  const handleShopsPress = () => {
    router.push('/shops');
  };

  const handleNewsPress = () => {
    router.push('/feed');
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
                <Text style={styles.subtitleHeader}>Ваш гид по городу</Text>
                <Text style={styles.title}>Торговые центры</Text>
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
          <View style={styles.mapSection}>
            <Text style={styles.sectionTitleSmall}>Интерактивная карта</Text>
            <View style={styles.mapContainer}>
              <MallMap
                ref={mapRef}
                initialRegion={region}
                malls={malls}
              />
            </View>
          </View>

          <View style={styles.listHeader}>
            <Text style={styles.sectionTitle}>Лучшие площадки</Text>
            <Text style={styles.sectionSubtitle}>Выбирайте лучшее место для шопинга</Text>
          </View>

          {malls.map(mall => (
            <View key={mall.id} style={styles.cardWrapper}>
              <MallCard
                mall={mall}
                onMapPress={() => handleMapPress(mall)}
                onShopsPress={() => handleShopsPress()}
                onNewsPress={() => handleNewsPress()}
              />
            </View>
          ))}
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
  mapSection: {
    marginTop: spacing.md,
    marginBottom: spacing.lg,
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
  mapContainer: {
    height: 250,
    marginHorizontal: spacing.md,
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    backgroundColor: colors.surfaceSecondary,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)',
  },
  listHeader: {
    paddingHorizontal: spacing.md,
    marginBottom: spacing.md,
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
  cardWrapper: {
    paddingHorizontal: spacing.md,
    marginBottom: spacing.md,
  },
});
