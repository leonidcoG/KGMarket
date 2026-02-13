/*
 * @Description: Mall map component (Web implementation)
 */

import React, { forwardRef, useImperativeHandle } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors, spacing, typography, borderRadius, shadows } from '@/constants/theme';
import { Mall } from '@/types/feed';

interface MallMapProps {
    initialRegion: {
        latitude: number;
        longitude: number;
        latitudeDelta: number;
        longitudeDelta: number;
    };
    malls: Mall[];
}

export interface MallMapRef {
    animateToRegion: (region: any, duration?: number) => void;
}

export const MallMap = forwardRef<MallMapRef, MallMapProps>((props, ref) => {
    useImperativeHandle(ref, () => ({
        animateToRegion: () => {
            // No-op for web
            console.log('Map animation is not supported on web');
        },
    }));

    return (
        <View style={styles.webMapPlaceholder}>
            <MaterialIcons name="map" size={48} color={colors.textSecondary} />
            <Text style={styles.webMapText}>Карта доступна в мобильной версии</Text>
        </View>
    );
});

const styles = StyleSheet.create({
    webMapPlaceholder: {
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        gap: spacing.sm,
    },
    webMapText: {
        fontSize: typography.sizes.sm,
        color: colors.textSecondary,
    },
});
