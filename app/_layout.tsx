/*
 * @Description: Root layout
 */

import { Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AlertProvider } from '@/template';

import { Platform, View, StyleSheet } from 'react-native';

export default function RootLayout() {
  const content = (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="product/[id]" options={{ headerShown: true, title: 'Товар' }} />
    </Stack>
  );

  return (
    <AlertProvider>
      <SafeAreaProvider>
        {Platform.OS === 'web' ? (
          <View style={styles.webContainer}>
            <View style={styles.phoneWrapper}>
              {content}
            </View>
          </View>
        ) : (
          content
        )}
      </SafeAreaProvider>
    </AlertProvider>
  );
}

const styles = StyleSheet.create({
  webContainer: {
    flex: 1,
    // @ts-ignore
    minHeight: '100vh',
    // @ts-ignore
    width: '100vw',
    backgroundColor: '#121212',
    alignItems: 'center',
    justifyContent: 'center',
  },
  phoneWrapper: {
    width: '100%',
    maxWidth: 500,
    // @ts-ignore
    height: '100vh',
    backgroundColor: '#000',
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: '#333',
    overflow: 'hidden',
  },
});
