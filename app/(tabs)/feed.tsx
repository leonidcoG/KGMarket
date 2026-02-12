/*
 * @Description: Feed screen with vertical video scrolling
 */

import React, { useState, useRef } from 'react';
import { View, StyleSheet, FlatList, ViewToken } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '@/constants/theme';
import { FeedVideoCard } from '@/components';
import { getFeedItems } from '@/services/feedService';

export default function FeedScreen() {
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
});
