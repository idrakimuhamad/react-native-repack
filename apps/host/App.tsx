// eslint-disable-next-line import/no-extraneous-dependencies
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Routes from './src/navigation';

export default function App() {
  return (
    <SafeAreaProvider>
      <Routes />
    </SafeAreaProvider>
  );
}
