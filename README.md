# Module-Federation on React-Native with Re.Pack

## Get started

Install deps of the workspaces

```sh
yarn
```

Start all of the bundler in workspaces

```sh
yarn concurrent
```

Run the host (iOS) app

```sh
yarn host:ios
```

## Release build

To test release build, run the express server which will host the micro app bundle

```sh
yarn workspace express-bundle-host run start
```

Open the host app xcworkspace in Xcode and change the build type as Release. Then build the app to any simulator.

The micro app bundle already exists inside the `public` folder.

To generate new bundle for the micro app, run below:

```sh
yarn workspace products run bundle
```

Copy the generated bundle from the `build` folder and paste inside the express-bundle-host app `public` folder, under the latest version. Create new version folder if you wish to simulate updating the API version.

Kill the app, and re-open. It _should_ fetch the new bundle. It might take few attempt as the bundle will be cache before, so up to Re.Pack to invalidate the new bundle.

Re.Pack is not a OTA solution, as such it doesn't provide any bundle or hash management or anyway to manage the update. It will just, download the remote if the URL, body or header changed.