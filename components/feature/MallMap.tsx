/*
 * @Description: Mall map component (Native implementation)
 */

import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Marker, PROVIDER_DEFAULT } from 'react-native-maps';
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

export const MallMap = forwardRef<MallMapRef, MallMapProps>(({ initialRegion, malls }, ref) => {
    const mapRef = useRef<MapView>(null);

    useImperativeHandle(ref, () => ({
        animateToRegion: (region, duration) => {
            mapRef.current?.animateToRegion(region, duration);
        },
    }));

    return (
        <MapView
            ref={mapRef}
            style={styles.map}
            provider={PROVIDER_DEFAULT}
            initialRegion={initialRegion}
            showsUserLocation
            showsMyLocationButton
        >
            {malls.map(mall => (
                <Marker
                    key={mall.id}
                    coordinate={mall.coordinates}
                    title={mall.name}
                    description={mall.address}
                />
            ))}
        </MapView>
    );
});

const styles = StyleSheet.create({
    map: {
        width: '100%',
        height: '100%',
    },
});
