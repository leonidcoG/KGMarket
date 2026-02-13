import React, { useState, useRef } from 'react';
import { View, StyleSheet, FlatList, ViewToken, Pressable, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { BlurView } from 'expo-blur';
import { colors, spacing, borderRadius } from '@/constants/theme';
import { FeedVideoCard } from '@/components';
import { getFeedItems } from '@/services/feedService';

export default function FeedScreen() {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(0);
  const feedItems = getFeedItems();

  const onViewableItemsChanged = useRef(({ viewableItems }: { viewableItems: ViewToken[] }) => {
    if (viewableItems.length > 0) {
      setActiveIndex(viewableItems[0].index || 0);
    }
  }).current;

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 80,
  }).current;

  return (
    <SafeAreaView style={styles.container} edges={[]}>
      <View style={styles.topIcons}>
        <BlurView intensity={30} tint="dark" style={styles.blurWrapper}>
          <Pressable
            style={styles.iconButton}
            onPress={() => router.push('/favorites')}
          >
            <MaterialIcons name="favorite-border" size={26} color="#FFF" />
          </Pressable>

          <View style={styles.divider} />

          <Pressable
            style={styles.iconButton}
            onPress={() => router.push('/cart')}
          >
            <View style={styles.cartBadgeContainer}>
              <MaterialIcons name="shopping-bag" size={26} color="#FFF" />
              <View style={styles.badge}>
                <Text style={styles.badgeText}>3</Text>
              </View>
            </View>
          </Pressable>

          <View style={styles.divider} />

          <Pressable style={styles.iconButton}>
            <MaterialIcons name="notifications-none" size={26} color="#FFF" />
          </Pressable>
        </BlurView>
      </View>

      <FlatList
        data={feedItems}
        renderItem={({ item, index }) => (
          <FeedVideoCard item={item} isActive={index === activeIndex} />
        )}
        keyExtractor={item => item.id}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        decelerationRate="fast"
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        removeClippedSubviews={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  topIcons: {
    position: 'absolute',
    top: 60,
    right: spacing.md,
    zIndex: 10,
  },
  blurWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: borderRadius.xl,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    overflow: 'hidden',
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  iconButton: {
    padding: spacing.sm,
  },
  divider: {
    width: 1,
    height: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    marginHorizontal: spacing.xs,
  },
  cartBadgeContainer: {
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: colors.primary,
    minWidth: 16,
    height: 16,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#000',
  },
  badgeText: {
    color: '#FFF',
    fontSize: 9,
    fontWeight: 'bold',
  },
});
