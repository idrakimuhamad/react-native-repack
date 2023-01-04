import { AppRegistry, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
// eslint-disable-next-line import/no-extraneous-dependencies
import { ScriptManager, Script, Federated } from '@callstack/repack/client';
import { name as appName } from './app.json';
import App from './App';

ScriptManager.shared.setStorage(AsyncStorage);
ScriptManager.shared.addResolver(async (scriptId, caller) => {
  // console.log('addresolver called');
  let bundleVersion = 1;

  if (!__DEV__) {
    const { version } = await fetch('http://localhost:4040/version').then(
      (res) => res.json()
    );

    bundleVersion = version;
  }

  const resolveURL = Federated.createURLResolver({
    containers: {
      // app1: `http://localhost:4040/version-${
      // version ?? '1'
      // }/app1/ios/[name][ext]`,
      profile: 'http://localhost:9001/[name][ext]',
      products: __DEV__
        ? 'http://localhost:9000/[name][ext]'
        : `http://localhost:4040/version-${bundleVersion}/products/${Platform.OS}/[name][ext]`,
    },
  });

  let url;
  if (caller === 'main') {
    url = Script.getDevServerURL(scriptId);
  } else {
    url = resolveURL(scriptId, caller);
  }

  if (!url) {
    return undefined;
  }

  return {
    url,
    cache: !__DEV__, // For development
    query: {
      platform: Platform.OS,
    },
  };
});

AppRegistry.registerComponent(appName, () => App);
