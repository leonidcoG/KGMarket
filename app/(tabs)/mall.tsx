import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Dimensions, Platform } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { colors, spacing, typography } from '@/constants/theme';
import { commonStyles } from '@/constants/styles';
import { MallCard, MallMap, MallMapRef } from '@/components';
import { getMalls } from '@/services/feedService';
import { Mall } from '@/types/feed';

const { width } = Dimensions.get('window');

export default function MallScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const malls = getMalls();
  const mapRef = useRef<MallMapRef>(null);

  // Center on Bishkek by default
  const [region, setRegion] = useState({
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

  const handleShopsPress = (mall: Mall) => {
    router.push('/shops');
  };

  const handleNewsPress = (mall: Mall) => {
    router.push('/feed');
  };

  return (
    <SafeAreaView style={commonStyles.container} edges={['top']}>
      <View style={[styles.header, { paddingTop: Math.max(8, insets.top) }]}>
        <Text style={styles.title}>Торговые центры</Text>
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
        </View>
      </View>

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.mapContainer}>
          <MallMap
            ref={mapRef}
            initialRegion={region}
            malls={malls}
          />
        </View>

        <Text style={styles.sectionTitle}>Список ТЦ</Text>

        {malls.map(mall => (
          <MallCard
            key={mall.id}
            mall={mall}
            onMapPress={() => handleMapPress(mall)}
            onShopsPress={() => handleShopsPress(mall)}
            onNewsPress={() => handleNewsPress(mall)}
          />
        ))}
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
    padding: spacing.md,
  },
  mapContainer: {
    height: 250,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  sectionTitle: {
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.bold,
    color: colors.text,
    marginBottom: spacing.md,
  },
});
