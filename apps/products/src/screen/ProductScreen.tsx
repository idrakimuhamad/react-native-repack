import {View, Text, Pressable} from 'react-native';
import React from 'react';

type RouteConfig = {
  profile: {
    screen: string;
  };
};

export default function ProductScreen({
  navigation,
  routeConfig,
}: {
  navigation: any;
  routeConfig: RouteConfig;
}) {
  return (
    <View style={{padding: 24}}>
      <Text>Product Screen from Product micro-app</Text>
      <View
        style={{
          flexDirection: 'row',
          paddingVertical: 24,
        }}>
        <Pressable
          onPress={() => navigation.navigate(routeConfig?.profile.screen)}>
          <View
            style={{
              paddingHorizontal: 12,
              paddingVertical: 6,
              backgroundColor: '#3b82f6',
              borderRadius: 4,
            }}>
            <Text style={{color: 'white'}}>Go to profile screen</Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
}
