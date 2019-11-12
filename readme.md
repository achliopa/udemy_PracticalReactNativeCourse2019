# Udemy Course: React Native - The Practical Guide [2019 Update]

* [Course Link](https://www.udemy.com/react-native-the-practical-guide/)
* [Course Repo]()


## Section 1 - Getting Started

* our business logic in React Native apps runs in JS but React Native components are compile to native code
* RN <View> is compiled to 'android.view' in Android or 'UIView' in iOS
* RN <Text> is compiled to 'EditText' in Android or 'UITextField' in iOS
* RN hosts a thread for our business logic in a JS Core (VM like) giving it access to native apis and libs through a Bridge
* Bridge logic is offered by RN
* 2 ways to do [RN](https://facebook.github.io/react-native/docs/getting-started) dev
    * using Expo CLI. a 3rd party service for managed App dev. simplifies dev but limited to Expo ecosystem
    * using React native CLI
* Follow [Expo](https://docs.expo.io) instructions 
    * install latest node
    * `npm install -g expo-cli`
    * create the project `expo init rn-first-app` select 'blank', enter a name
    * we run `npm start` in  th project folder
    * disable watchman
```
echo 999999 | sudo tee -a /proc/sys/fs/inotify/max_user_watches     && \
  echo 999999 | sudo tee -a /proc/sys/fs/inotify/max_queued_events  && \
  echo 999999 | sudo tee -a /proc/sys/fs/inotify/max_user_instances && \
  watchman shutdown-server
```
* to run expo in Cloud9 AWS add in app.json
```
{
  "expo": {
    "packagerOpts": {
      "port": 8080
    }
  }
}
```
* run `export env REACT_NATIVE_PACKAGER_HOSTNAME=127.0.0.1 && expo start --tunnel`
* we scan QR code and see our app in  EXPO app on our device
* We install Material ICon Theme to Visual Code
* RN Stylesheet is used for CSS styling of app using JS
* For our first app we use React Hooks to  change the text in a functional component without transforming it to class
```
import React, { useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default function App() {
  const [outputText, setOutputText] = useState('Hello! I am in HELPE Control Room');
  return (
    <View style={styles.container}>
      <Text>{outputText}</Text>
      <Button title="Click Me" onPress={() => setOutputText('Now I am Home!')}/>
    </View>
  );
}
```
* RN offers:
* no ir very little cross styling of components. we need to style manualy per platform
* only basic set of prebuilt components
* RN offers tools for responsive design but not out-of-box
* iOnic takes a web app and wraps it as a native app. low performance