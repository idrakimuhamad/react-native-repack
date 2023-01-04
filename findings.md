# Todo

- React-navigation with remote chunks

# Findings

- Initial Loading remote in development took considerable time. Micro-app `products` remote only a basic sample RN introductory screen, and took 7 seconds to finish loading. Subsequent refresh should be faster.
- In release build, with a small bundle seems fine (might affect UX if wasn't manage properly)
- static assets (images, fonts) within micro-app doesn't load inside host app. Works fine in standalone micro-app. [#147](https://github.com/callstack/repack/issues/147#issuecomment-1008792049)
- Fast-reload for host/micro-app changes _slightly_ slower
- Fast-reload doesn't work for micro-app within host app. It works in standalone. (have to enable first)
- On a basic app, startup time seems similar, probably due to host app is just regular RN app with main bundle. The speed also could come from Hermes.
- Using local UI library within monorepo will require each micro-app and host app to have resolver's alias for some shared RN deps (RN, Restyle, SVG etc) to avoid deps clash, and this is gonna be repetitive (could have singular file exported with this deps, but not all deps might be the same)
- log output from the app doesn't pipe to the webpack terminal (can rely on other tool like Flipper, but took away a simple method)
- Error thrown doesn't always point to the right stacktrace/filename or even correct error. Will be hard to debug.
- Remote bundle from micro-app update works with a certain URL management (eg versioning). However, Re.Pack is not an OTA solution, thus it doesn't have hash or bundle management and proper update solution. It will just invalidate the old bundle and download new bundle, replace and cache it, and execute the bundle. Also, whenever the remote bundle is inaccessible, if there are no cached bundle exists in app, it will crash the app in release build.
- \*Creating navigation stack _inside_ the micro-app and loading in host app seems get the remote loading indefinitely.
