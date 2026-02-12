/*
 * @Description: Feed screen with vertical video scrolling
 */

import React, { useState, useRef } from 'react';
import { View, StyleSheet, FlatList, ViewToken, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { colors, spacing } from '@/constants/theme';
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
    itemVisiblePercentThreshold: 50,
  }).current;

  return (
    <SafeAreaView style={styles.container} edges={[]}>
      <View style={styles.topIcons}>
        <Pressable
          style={styles.iconButton}
          onPress={() => router.push('/favorites')}
        >
          <MaterialIcons name="favorite-border" size={28} color="#fff" />
        </Pressable>
        <Pressable
          style={styles.iconButton}
          onPress={() => router.push('/cart')}
        >
          <MaterialIcons name="shopping-cart" size={28} color="#fff" />
        </Pressable>
        <Pressable style={styles.iconButton}>
          <MaterialIcons name="notifications-none" size={28} color="#fff" />
        </Pressable>
      </View>
      <FlatList
        data={feedItems}
        renderItem={({ item, index }) => (
          <FeedVideoCard item={item} isActive={index === activeIndex} />
        )}
        keyExtractor={item => item.id}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        snapToInterval={1}
        snapToAlignment="start"
        decelerationRate="fast"
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  topIcons: {
    position: 'absolute',
    top: spacing.xl,
    right: spacing.md,
    zIndex: 10,
    flexDirection: 'row',
    gap: spacing.sm,
  },
  iconButton: {
    padding: spacing.xs,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 20,
  },
});
