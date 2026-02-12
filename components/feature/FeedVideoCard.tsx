/*
 * @Description: Feed video card component
 */

import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, Pressable, Dimensions } from 'react-native';
import { Image } from 'expo-image';
import { useVideoPlayer, VideoView } from 'expo-video';
import { MaterialIcons } from '@expo/vector-icons';
import { colors, spacing, typography, borderRadius } from '@/constants/theme';
import { FeedItem } from '@/types/feed';
import { useRouter } from 'expo-router';

interface FeedVideoCardProps {
  item: FeedItem;
  isActive: boolean;
}

const { width, height } = Dimensions.get('window');

export const FeedVideoCard: React.FC<FeedVideoCardProps> = ({ item, isActive }) => {
  const router = useRouter();
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(item.likes);
  
  const player = item.type === 'video' ? useVideoPlayer(item.mediaUrl, (player) => {
    player.loop = true;
    player.muted = false;
    if (isActive) {
      player.play();
    }
  }) : null;

  React.useEffect(() => {
    if (player) {
      if (isActive) {
        player.play();
      } else {
        player.pause();
      }
    }
  }, [isActive, player]);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes(prev => isLiked ? prev - 1 : prev + 1);
  };

  const handleProductPress = () => {
    router.push(`/product/${item.product.id}`);
  };

  return (
    <View style={styles.container}>
      {item.type === 'video' && player ? (
        <VideoView
          style={styles.media}
          player={player}
          allowsFullscreen={false}
          nativeControls={false}
        />
      ) : (
        <Image
          source={{ uri: item.mediaUrl }}
          style={styles.media}
          contentFit="cover"
          transition={200}
        />
      )}

      <View style={styles.overlay}>
        <View style={styles.sidebar}>
          <Pressable style={styles.sidebarButton} onPress={handleLike}>
            <MaterialIcons 
              name={isLiked ? "favorite" : "favorite-border"} 
              size={32} 
              color={isLiked ? colors.primary : colors.textOnPrimary} 
            />
            <Text style={styles.sidebarText}>{likes}</Text>
          </Pressable>

          <Pressable style={styles.sidebarButton}>
            <MaterialIcons name="comment" size={32} color={colors.textOnPrimary} />
            <Text style={styles.sidebarText}>{item.comments}</Text>
          </Pressable>

          <Pressable style={styles.sidebarButton}>
            <MaterialIcons name="share" size={32} color={colors.textOnPrimary} />
            <Text style={styles.sidebarText}>{item.shares}</Text>
          </Pressable>
        </View>

        <View style={styles.bottom}>
          <View style={styles.author}>
            <Image
              source={{ uri: item.author.avatar }}
              style={styles.avatar}
              contentFit="cover"
            />
            <Text style={styles.authorName}>{item.author.name}</Text>
          </View>

          <Pressable style={styles.productCard} onPress={handleProductPress}>
            <View style={styles.productInfo}>
              <Text style={styles.productBrand}>{item.product.brand}</Text>
              <Text style={styles.productName}>{item.product.name}</Text>
              <Text style={styles.productPrice}>{item.product.price.toLocaleString('ru-RU')} сом</Text>
            </View>
            <Pressable style={styles.buyButton} onPress={handleProductPress}>
              <Text style={styles.buyButtonText}>Купить</Text>
            </Pressable>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width,
    height,
    backgroundColor: colors.background,
  },
  media: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'space-between',
  },
  sidebar: {
    position: 'absolute',
    right: spacing.md,
    bottom: 200,
    gap: spacing.xl,
  },
  sidebarButton: {
    alignItems: 'center',
    gap: spacing.xs,
  },
  sidebarText: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.semibold,
    color: colors.textOnPrimary,
    textShadowColor: 'rgba(0,0,0,0.8)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  bottom: {
    padding: spacing.lg,
    paddingBottom: 100,
  },
  author: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.full,
    borderWidth: 2,
    borderColor: colors.textOnPrimary,
  },
  authorName: {
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.semibold,
    color: colors.textOnPrimary,
    textShadowColor: 'rgba(0,0,0,0.8)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  productCard: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    alignItems: 'center',
    gap: spacing.md,
  },
  productInfo: {
    flex: 1,
  },
  productBrand: {
    fontSize: typography.sizes.xs,
    fontWeight: typography.weights.medium,
    color: colors.textSecondary,
  },
  productName: {
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.semibold,
    color: colors.text,
    marginVertical: spacing.xs / 2,
  },
  productPrice: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,
    color: colors.primary,
  },
  buyButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.md,
  },
  buyButtonText: {
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.bold,
    color: colors.textOnPrimary,
  },
});
