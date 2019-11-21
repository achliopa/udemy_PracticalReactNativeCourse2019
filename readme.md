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
* no to very little cross styling of components. we need to style manualy per platform
* only basic set of prebuilt components
* RN offers tools for responsive design but not out-of-box
* iOnic takes a web app and wraps it as a native app. low performance
* we can develop for iOS on a windows/linux mahine using expo app
* to run our RN app on Android emulator expo.io => docs => managed workflow => android studio emulator
* we follow the instructions (in our case we have it setup from previous course)
* in expo web dev tools (http://localhost:19002/) we select Run on Android device/emulator with emulator running and expo app gets installed on emulator running our app
* [React native Docs](https://facebook.github.io/react-native/docs/getting-started)

## Section 2: Diving into the Basics [COURSE GOALS APP]

* use RN core components where possible
* no CSS. JS for stylining CSS style but compiled to native.  
  * inline styles
  * StyleSheet objects
* make a new expo app `expo init rn-complete-guide` using the blank template and name it 'RN Guide'
* we run with `npm start` or if on cloud9 we follow the instructions above
* we will build a TODO list app. an input field a button and a list of items we create. 
* taping on list items will delete them. 
* a variation will be to render a modal on button press to enter the input text
* text in RN must always be in <Text>
* RN offers no more than 10 core components
* Button tag in Rn takes title as prop `<Button title="ADD"/>`
* we do styling in stylesheet object or inline `<View style={{padding: 30 }}>`
* we use JS like syntax for styling `style={{borderBottomColor: 'blue', borderBottomWidth: 1}}`
* RN uses Flexbox by default in <View> and organizes children in a column direction (top-bottom) 
* in Web dev the default in Flexbox is row direction
* every box in Flexbox is as wide and high as its child needs it to be
* setting height and wdth in parent contaienr of boxes has effect only on cross axes
* axes can be reversed.
* justify content alligns on main axes and align-itmes on cross axis
* flexbox children aka 'boxes' have flex property. if set 1 `flex: 1` 1st item takes up as much space as it can along main axes get leaving the minimum space for other boxes given the configuration
* flex number is a proportion of available space.
* stylesheet objects are conventient for heavy styling. StyleSheet is offered by RN. it also offers validation by RN
```
 const styles = StyleSheet.create({
  screen: {
    padding: 50
  }
});
```
* we can nest multiple object per tag and use them `<View style={styles.screen}>`
* TIP: use format document command in VS Code to autoindent source file
* RN supports hooks. we use useState()
* console.log is supported in RN and outputs on dev tools and terminal
* View offers more styling than Text
* in ios scrolable view if it eceeds boundaries is auto. in android no. we need ScrollView
* only part wrapped with scrollview is scrollable and scrollbar appears at this components boundary
* FlatList is a scrolled list that renders only whats viewd to save BW.good for very long lists
* In FlatList we pass in the list and a callback to do the actual render of each element (no map(0 needed))
```
      <FlatList data={courseGoals} renderItem={itemData => (
          <View style={styles.listItem}>
            <Text>{itemData.item}</Text>
          </View>      
      )}>
```
* flatlist expects list of objects and adds unique keys to list items. if not we have to pass them explicitly with keyExtractor prop
* to pass arguments into callbacks without running them we can wrap them in anonymous arrow functions or use bind `props.onAddGoal.bind(this, enteredGoal)`
* we can wrap any component i RN (eg View) with <Touchable> and make it touchable (onPress). touchable is abstract. we need to use one of its concrete classes like TouchableOpacity and others:
  * TouchableNative (only android)
  * TouchableHighlight
  * TouchableNoFeedback
  * TouchableOpacity
* Rn offers a Modal Component for modals. modal has visible prop and animationType for slide in animation
* View takes only the necessary space the children require to render.flex 1 maximazes to take available space

## Section 3: Debugging React Native Apps

* in expo apps on real devices shake the device to fire up debugger
* debug mode on emulators: ios ctrl+d , android ctrl+m => degug remotly. it opens chrome debugger (in lan mode is ok in tunnel mode is SLOW) =>open chrome dev tools. we get console log. in sources we have a debugger-ui folder where have the surce files where we can add breakpoints
* in debug mode we can:
  * reload the app
  * control reloading
  * see perf monitor
  * toggle inspector to see dev tools on expo app like in chrome
* better than inspector is [RN debugger](https://github.com/jhen0409/react-native-debugger) and install it in our OS
* to use it we have to enable remoteJS debuging in the app. it rplaces chrome debugger. we have also react tools or debug network reqs
* [Expo Debugging Docs](https://docs.expo.io/versions/v34.0.0/workflow/debugging/)
* [Chrome Dev Tools Docs](https://developers.google.com/web/tools/chrome-devtools/)

## Section 4: Components, Styling, Layouts - Building Real Apps [GUESS A NUMBER APP]

* we make a new app `expo init rn-number-app`
* shadow styles are supported in iOS but not on Android, we need to add 'elevation'