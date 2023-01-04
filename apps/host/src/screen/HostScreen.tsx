import { View, Text } from 'react-native';
import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Federated } from '@callstack/repack/client';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

const Products = React.lazy(() => Federated.importModule('products', './App'));

export default function HostScreen() {
  const bottomBar = useBottomTabBarHeight();
  return (
    <View style={{ flex: 1, paddingBottom: bottomBar }}>
      <View
        style={{
          padding: 24,
        }}
      >
        <Text>Host App screen in native stack</Text>
      </View>
      <React.Suspense fallback={<Text>Loading Products...</Text>}>
        <Products />
      </React.Suspense>
    </View>
  );
}
