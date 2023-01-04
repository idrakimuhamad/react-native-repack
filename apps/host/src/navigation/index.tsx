import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Federated } from '@callstack/repack/client';
import { Text } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HostScreen from '../screen/HostScreen';
import TabHostScreen from '../screen/TabHostScreen';

const ProfileHomeScreen = React.lazy(() =>
  Federated.importModule('profile', './ProfileScreen')
);

function ProfileScreenWrapper(props) {
  return (
    <React.Suspense
      fallback={<Text style={{ textAlign: 'center' }}>Loading...</Text>}
    >
      <ProfileHomeScreen {...props} />
    </React.Suspense>
  );
}

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const Root = () => {
  return (
    <Stack.Navigator initialRouteName="Profile">
      <Stack.Screen name="Profile" component={ProfileScreenWrapper} />
      <Stack.Screen name="Host" component={HostScreen} />
    </Stack.Navigator>
  );
};

export default function Routes() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="App1"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Tab.Screen name="Root" component={Root} />
        <Tab.Screen name="TabHost" component={TabHostScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
