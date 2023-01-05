# Findings

- Initial Loading remote in development took considerable time. Micro-app `products` remote with only a basic sample RN introductory screen, and took 7 seconds to finish bundle build. Subsequent refresh should be faster.
- The more micro-app, the more bundle == the more bundling needed (on fresh start)
- In release build, with a small bundle seems fine (might affect UX if wasn't manage properly)
- static assets (images, fonts) within micro-app doesn't load inside host app. Works fine in standalone micro-app. [#147](https://github.com/callstack/repack/issues/147#issuecomment-1008792049)
- The need to use remote URL assets would be drawback on UI presentation due to network latency to download the image first.
- Can probably use certain assets as SVG component as workaround
- Fast-reload for host/micro-app changes _slightly_ slower
- Fast-reload doesn't work for micro-app within host app. It works in standalone. (have to enable first)
- On a basic app, startup time seems similar, probably due to host app is just regular RN app with main bundle. The speed also could come from Hermes.
- Using local UI library within monorepo will require each micro-app and host app to have resolver's alias for some shared RN deps (RN, Restyle, SVG etc) to avoid deps clash, and this is gonna be repetitive (could have singular file exported with this deps, but not all deps might be the same)
- log output from the app doesn't pipe to the webpack terminal (can rely on other tool like Flipper, but took away a simple method)
- Error thrown doesn't always point to the right stacktrace/filename or even correct error. Will be hard to debug.
- Remote bundle from micro-app update works with a certain URL management (eg versioning). However, Re.Pack is not an OTA solution, thus it doesn't have hash or bundle management and proper update solution. It will just invalidate the old bundle and download new bundle, replace and cache it, and execute the bundle. Also, whenever the remote bundle is inaccessible, if there are no cached bundle exists in app, it will crash the app in release build.
- Host application can't use remotes
- Native module dependencies must be available in host app too (eg both microapp and host app have the same deps) and to be added into `shared` configuration, as same as `react` and `react-Native`
- Putting `console.log` inside the app root somehow crash the app (standalone), with `invalid expression encountered` (also not mentioning the exact position of the issue). _update_: also crash in host app

  ```jsx
  const App = () => {

    console.log('app'); // crash

    useEffect(() => {
        console.log('app'); // crash
    }, []);

    return (...)
  }
  ```

- debugger and devTools doesn't seem to work or opening. Can manually open the UI by visiting to the bundler port `/debugger-ui` eg `http://localhost:8081/debugger-ui` but its not connected with the app.

## Navigation

- Having react-navigation stack created within micro-app and loaded into remote causing the host app to load remote infinitely
- Navigation likely need to be initialized within the host, though this will complicates the micro-app development as it also will have its own stack (for development purposes) but it also need to know the host routes so it would know the screen name that it would go. One way is to share the host navigation stack routes, and making sure both micro and host app use the same navigation name.
- This means it is going to produce redundancy navigation stack configuration since one need to exists in micro-app and also need to be available in the host app.
- Also, we might lose the navigation's typings. Not a breaker but lose type-safety.
- Any modular/separate app approach would probably need the same approach
