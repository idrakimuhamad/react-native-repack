import { View, Text, Pressable } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Federated } from '@callstack/repack/client';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CompositeScreenProps } from '@react-navigation/native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { RootStackParamList, RootTabParamList } from '../navigation';

const ProfileDetails = React.lazy(() =>
  Federated.importModule('profile', 'profile-comp')
);

const user = {
  avatar:
    'https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ',
  fullName: 'John Doe',
  email: 'johndoe@example.com',
};

export type TabHostScreenProps = CompositeScreenProps<
  BottomTabScreenProps<RootTabParamList, 'TabHost'>,
  NativeStackScreenProps<RootStackParamList, 'Root'>
>;

export default function TabHostScreen({ navigation }: TabHostScreenProps) {
  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView>
        <View
          style={{
            paddingHorizontal: 24,
          }}
        >
          <Text>Host App in tab view</Text>
        </View>
        <View>
          <React.Suspense fallback={<Text>Loading...</Text>}>
            <ProfileDetails user={user} />
          </React.Suspense>
        </View>
        <View
          style={{
            flexDirection: 'row',
            padding: 24,
          }}
        >
          <Pressable
            accessibilityRole="button"
            onPress={() => navigation.navigate('Product')}
          >
            <View
              style={{
                paddingHorizontal: 12,
                paddingVertical: 6,
                backgroundColor: '#3b82f6',
                borderRadius: 4,
              }}
            >
              <Text style={{ color: 'white' }}>Go to product screen</Text>
            </View>
          </Pressable>
        </View>
      </SafeAreaView>
    </View>
  );
}
