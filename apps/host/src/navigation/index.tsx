import {
  NavigationContainer,
  NavigatorScreenParams,
} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Federated } from '@callstack/repack/client';
import { Text } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HostScreen from '../screen/HostScreen';
import TabHostScreen from '../screen/TabHostScreen';

export type MainStackParamList = {
  Profile: undefined;
  Host: undefined;
};
export type ProductStackParamList = {
  ProductLanding: undefined;
};

export type RootTabParamList = {
  Home: NavigatorScreenParams<MainStackParamList>;
  TabHost: undefined;
};

export type RootStackParamList = {
  Root: NavigatorScreenParams<RootTabParamList> | undefined;
  Product: ProductStackParamList;
};

const ProfileHomeScreen = React.lazy(() =>
  Federated.importModule('profile', './ProfileScreen')
);
const ProductScreen = React.lazy(() =>
  Federated.importModule('products', 'product-screen')
);

export type ProfileScreenProps = NativeStackScreenProps<
  MainStackParamList,
  'Profile'
>;

function ProfileScreenWrapper(props: ProfileScreenProps) {
  return (
    <React.Suspense
      fallback={<Text style={{ textAlign: 'center' }}>Loading...</Text>}
    >
      <ProfileHomeScreen {...props} />
    </React.Suspense>
  );
}

const productRouteConfig = {
  profile: {
    screen: 'Profile',
  },
};

export type ProductScreenProps = NativeStackScreenProps<
  ProductStackParamList,
  'ProductLanding'
>;

function ProductScreenWrapper(props: ProductScreenProps) {
  return (
    <React.Suspense
      fallback={<Text style={{ textAlign: 'center' }}>Loading...</Text>}
    >
      <ProductScreen routeConfig={productRouteConfig} {...props} />
    </React.Suspense>
  );
}

const Stack = createNativeStackNavigator<MainStackParamList>();
const RootStack = createNativeStackNavigator<RootStackParamList>();
const ProductStack = createNativeStackNavigator<ProductStackParamList>();
const Tab = createBottomTabNavigator<RootTabParamList>();

const ProductNavigator = () => {
  return (
    <ProductStack.Navigator
      initialRouteName="ProductLanding"
      screenOptions={{ headerShown: false }}
    >
      <ProductStack.Screen
        name="ProductLanding"
        component={ProductScreenWrapper}
        options={{
          title: 'Product',
          headerBackVisible: true,
        }}
      />
    </ProductStack.Navigator>
  );
};

const MainStack = () => {
  return (
    <Stack.Navigator initialRouteName="Profile">
      <Stack.Screen name="Profile" component={ProfileScreenWrapper} />
      <Stack.Screen name="Host" component={HostScreen} />
    </Stack.Navigator>
  );
};

function BottomNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen name="Home" component={MainStack} />
      <Tab.Screen name="TabHost" component={TabHostScreen} />
    </Tab.Navigator>
  );
}

const Routes = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator>
        <RootStack.Screen
          name="Root"
          component={BottomNavigator}
          options={{ headerShown: false }}
        />
        <RootStack.Screen name="Product" component={ProductNavigator} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
