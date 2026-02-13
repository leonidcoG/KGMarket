import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Dimensions } from 'react-native';
import { Image } from 'expo-image';
import { useVideoPlayer, VideoView } from 'expo-video';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, spacing, typography, borderRadius, shadows } from '@/constants/theme';
import { FeedItem } from '@/types/feed';
import { useRouter } from 'expo-router';
import { useIsFocused } from '@react-navigation/native';

interface FeedVideoCardProps {
  item: FeedItem;
  isActive: boolean;
}

const { width, height } = Dimensions.get('window');

export const FeedVideoCard: React.FC<FeedVideoCardProps> = ({ item, isActive }) => {
  const router = useRouter();
  const isFocused = useIsFocused();
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(item.likes);

  const player = item.type === 'video' ? useVideoPlayer(item.mediaUrl, (player) => {
    player.loop = true;
    player.muted = false;
  }) : null;

  React.useEffect(() => {
    if (player) {
      if (isActive && isFocused) {
        player.play();
      } else {
        player.pause();
      }
    }
  }, [isActive, isFocused, player]);

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
          contentFit="cover"
        />
      ) : (
        <Image
          source={typeof item.mediaUrl === 'string' ? { uri: item.mediaUrl } : item.mediaUrl}
          style={styles.media}
          contentFit="cover"
          contentPosition="top"
          transition={400}
        />
      )}

      <LinearGradient
        colors={['rgba(0,0,0,0.4)', 'transparent', 'rgba(0,0,0,0.7)']}
        style={styles.overlay}
      >
        <View style={styles.sidebar}>
          <Pressable style={styles.sidebarButton} onPress={handleLike}>
            <View style={[styles.iconCircle, isLiked && styles.iconCircleActive]}>
              <MaterialIcons
                name={isLiked ? "favorite" : "favorite-border"}
                size={28}
                color={isLiked ? "#FFF" : "#FFF"}
              />
            </View>
            <Text style={styles.sidebarText}>{likes}</Text>
          </Pressable>

          <Pressable style={styles.sidebarButton}>
            <View style={styles.iconCircle}>
              <MaterialIcons name="chat-bubble-outline" size={26} color="#FFF" />
            </View>
            <Text style={styles.sidebarText}>{item.comments}</Text>
          </Pressable>

          <Pressable style={styles.sidebarButton}>
            <View style={styles.iconCircle}>
              <MaterialIcons name="share" size={26} color="#FFF" />
            </View>
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
            <View>
              <Text style={styles.authorName}>{item.author.name}</Text>
              <Text style={styles.videoDesc}>Оцените новую коллекцию! 🔥</Text>
            </View>
          </View>

          <Pressable style={styles.productCard} onPress={handleProductPress}>
            <View style={styles.productInfo}>
              <Text style={styles.productBrand}>{item.product.brand}</Text>
              <Text style={styles.productName} numberOfLines={1}>{item.product.name}</Text>
              <Text style={styles.productPrice}>{item.product.price.toLocaleString('ru-RU')} сом</Text>
            </View>
            <View style={styles.buyButton}>
              <Text style={styles.buyButtonText}>В корзину</Text>
              <MaterialIcons name="add-shopping-cart" size={18} color="#FFF" />
            </View>
          </Pressable>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width,
    height,
    backgroundColor: '#000',
  },
  media: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
  },
  sidebar: {
    position: 'absolute',
    right: spacing.md,
    bottom: 220,
    gap: spacing.lg,
  },
  sidebarButton: {
    alignItems: 'center',
    gap: 6,
  },
  iconCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  iconCircleActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  sidebarText: {
    fontSize: typography.sizes.xs,
    fontWeight: typography.weights.bold,
    color: '#FFF',
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  bottom: {
    padding: spacing.md,
    paddingBottom: 120, // TabBar height + safety
  },
  author: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 2,
    borderColor: '#FFF',
  },
  authorName: {
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.bold,
    color: '#FFF',
  },
  videoDesc: {
    fontSize: typography.sizes.sm,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 2,
  },
  productCard: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,1)',
    borderRadius: borderRadius.xl,
    padding: spacing.md,
    alignItems: 'center',
    gap: spacing.md,
    ...shadows.lg,
  },
  productInfo: {
    flex: 1,
  },
  productBrand: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.primary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  productName: {
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.bold,
    color: colors.text,
    marginVertical: 2,
  },
  productPrice: {
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.bold,
    color: colors.text,
  },
  buyButton: {
    backgroundColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.lg,
    gap: 6,
  },
  buyButtonText: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.bold,
    color: '#FFF',
  },
});
