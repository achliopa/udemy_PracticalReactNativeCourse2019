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
* shadow styles are supported in iOS but not 
* on Android, we need to add 'elevation'
* `<View style={{...styles.card, ...props.style}}>` props overwrite any common style attribute and both objects are merged to one
* spread and the props into child comp. `<TextInput {...props} style={{...styles.input, ...props.style }}/>` overriding what we want e.g style prop
* numeric keyboard with decimal `keyboardType="numeric"` keyboard nodecimals `keyboardType="number-pad"` in android we need validator
* replace anything that is not number with empty string (using regex) `inputText.replace(/[^0-9]/g, '')`
* to be able to dismiss keyboard on press in iOS `<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>`
* setters of useStste hook operate on state on next render cycle
* native Alert example
```
Alert.alert(
                'Invalid number',
                'Number has to be a value between 1 and 99',
                [{text: 'Okay',style: 'destructive', onPress: resetInputHandler}]);
```
* Hooks setters can be passed down as props to child components
* to pass an input argument to a handler withough invoiking it we use bind `onPress={nextGuessHandler.bind(this,'lower')}`
* ref Hook allows it allows to create an object and bind it as input to JSX. it also allows to create a valu ethat survives component rerender a.k.a Persistence
* how to use it  define it: `const currentLow = useRef(1);` set its current val `currentLow.current = currentGuess; ` 
* the difference with state is it does not cause rerender
* effect prop is calld at render if the values in the array passed as second argument  change
```
    useEffect(()=>{
        if(currentGuess === userChoice) {
            onGameOver(rounds);
        }
    },[currentGuess, userChoice, onGameOver]);
```
* to add custom fonts we add a /fonts folder in /assets folder and store the .ttf files (get them from google fonts eg)
* to be able to use them in our App.js file we add `import * as Font from 'expo-font';`
* expo-fonts should be installed in an expo project. to be sure we run `expo install expo-font` or `npm install --save expo-font`
* wxpo-install is preferred for expo packages as it installs the correct version for the version of expo we use in the project
* then we define an font load method (async) to call in our code
```
const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  });
};
```
* we need to make sure that the promise resolves before rendering anything using the fonts. 
* we use AppLoading from expo `import { AppLoading } from 'expo';`
* it provides a splash screen to prolong load untill prep code resolves. we use hooks state with a flag
* we use the Apploading passing the async function and a callback to be run when the promise resolves
```
  if(!dataLoaded) {
    return <AppLoading 
      startAsync={fetchFonts} 
      onFinish={() => setDataLoaded(true)}
      onError={(err)=>console.log(err)}
    />;
  }
  
```
* we can now use the fonts in styles `fontFamily: 'open-sans-bold'`
* RN does not support cascading of styles
* an option is to create a thin wrapper component to replace Text and style it. then use it instead
* an alternative is in /constants to add a 'default-styles.js' file add some styling setting the fonts then use it in our code
* RN has <Image> component to show images. we can use local images in our app bundle or from the net
* for local we use the /assets folder and import them  `<Image source={require('../assets/success.png')} />`
* we need to style it. by default it is full screen. we style it. we also need to set its aspect ratio using the 'resizeMode' prop
* wrappper views can not use tha width of their child if its set to relative (in %)
* for network images we pass in an object as source `source={{uri: 'https://www.geeky-gadgets.com/wp-content/uploads/2010/10/Everest-Summit.jpg'}}`
* with local images RN gets width and height. for net images we need to set it as RN doesnt know it at render time (async).
* net images fade in (def 300ms) we can set it as prop `fadeDuration={500}`
* We can wrap <Text> in <Text> for different styling. we get style inheritance
* be careful when nesting VIew in Text
* Text wrpas into new line
* You can avoid wrapping by setting the numberOfLines prop, possibly combined with ellipsizeMode.
* A custonm Button can be made using  View, Text, Touchable
* expo offers built in icon sets. we first need to iport the set e.g `import { Ionicons } from '@expo/vector-icons';`
* we then use them as components with name `<Ionicons name="md-remove" size={24} color="white" />`
* Expo offers prebuilt UI packages with ready prestyled components [UI comp libs](https://docs.expo.io/versions/latest/guides/userinterface/)
* we will store history of guesses in react hooks state making in an array
* be carreful when using state vars in code as they get updated in next render cycle (prefer temps for immediate action)
* to style a list properly we need to wrap it to a View and style the View. 
* in Androind to have a scrollable list the wrapping View must have flex:1 in styles
* setting a width in list items puts them on left. we canuse flexbox
* styling ScrollView and FlatList we need to use a special prop `<ScrollView contentContainerStyle={styles.list}>`
* to make list increment bottom up we use
```
        justifyContent: 'flex-end',
        flexGrow: 1
```
* use FlatList for large lists. it does incremental Render andtakes the aray as argument and a callback to render the list item
```
                <FlatList 
                    keyExtractor={(item) => item} 
                    data={pastGuesses} 
                    renderItem={renderListItem.bind(this, pastGuesses.length )}
                    contentContainerStyle={styles.list}
                />
```
* to fix render issues limit container with and give list a full width

## Section 5: Responsive & Adaptive User Interfaces and Apps

* create a small virtual device with emulator to test
* play with styling rules so that min is not that smal for small devices (set a hard limit)
```
        width: '80%',
        minWidth: 300,
        maxWidth: '95%',
```
* in cases where % is not enough we use Dimensions from RN `width: Dimensions.get('window').width / 3`
* we can do conditional styling in StyleSheet `marginTop: Dimensions.get('window').height > 600 ? 20 : 10,` if checks can be done anywhere we write JS
* in app.json  we can config orientation of the app, "default" means both orientations allowed 
* wrapping our view with RN KeyboardAvoidingView makes sure Keyboard will never cover our input view `<KeyboardAvoidingView behavior="position"> `
* if we set styling based on Dimensions our app breaks when we rotate as dimensions are clculated only when app starts
* if we want syling to adapt to orientation we need to manage it in state, we also need a handler and to register the handler to the dimension change event
```
    const [buttonWidth, setButtonWidth] = useState(Dimensions.get('window').width / 4);

    const updateLayout = () => {
        setButtonWidth(Dimensions.get('window').width / 3)
    }

    Dimensions.addEventListener('change', updateLayout);
```
* this code pollutes mem with listeres in any change event. we  can use useEffect hook to add handler and remove th old
```
useEffect(() => {
        const updateLayout = () => {
            setButtonWidth(Dimensions.get('window').width / 3)
        }

        Dimensions.addEventListener('change', updateLayout);

        return () => {
            Dimensions.removeEventListener('change',updateLayout);
        };
    });
```
* in expo apps we can use the ScreenOrientation object for adaptive design. it detects screen orientation and can lock it in runtime
* e.g to lock it `ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);`
* with screenlock we listen for dimension changes. with screenorienatation we query screen orientation
* RN offers Platform object to query the platform our app runs on. `color: Platform.OS === "ios" ? Colors.primary : 'white',`
* platform allows us to select objects or stylesheets based on OS `<View style={{...styles.headerBase, ...Platform.select({ios: styles.headerIos, android: styles.headerAndroid})}}>`
* RN offers the TouchableNativeFeedback for native feel on touchables. we can use Platfrom and JSX to select proper native comp
```
let ButtonComponent = TouchableOpacity;
    
    if (Platform.OS === "android" && Platform.Version >= 21) {
        ButtonComponent = TouchableNativeFeedback;
    }
```
* we can import OS specific files in our code. e.g 'MainButton.ios.js' and 'MainButton.android.js' but we import without os spec `import MainButton from '../components/MainButton';`as RN selects the appropriate at build time
* modern devices have notches and not a pure rectangular real estate. 
* RN offers SafeAreaView comp for this purpose. we wrap our JSX with it to protect. good practice is to wrap the topmost view
* safeareaview is not needed if we use navigation as that lib takes care of it
* [Dimensions API](https://facebook.github.io/react-native/docs/dimensions#docsNav)
* [Platform-specific Code](https://facebook.github.io/react-native/docs/platform-specific-code)

## Section 6: Navigation with React Navigation [THE MEALS APP]

* in web apps routing in react is based on urls. in native we have no urls
*  in native apps we usually have tabs or stacks of pages
* our lib of choice is [react-navigation](https://reactnavigation.org/) `npm install --save react-navigation`
* for expo projects we need to install dependencies `expo install react-native-gesture-handler react-native-reanimated`
* we add a new folder in our project /navigation and add 'MealsNavigation.js'
* in react-navigation v4 and up we need to import specific navigators separately
```
npm install --save react-navigation-stack react-navigation-drawer react-navigation-tabs
```
* and then import them in the files we use them
```
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createDrawerNavigator } from 'react-navigation-drawer';
```
* in MealsNavigator we use stack navigator
* we import it `import { createStackNavigator } from 'react-navigation-stack';`
* and instantiate it as a component passing in a cofig object with the screens ref as attibutes (router style)
```
const MealsNavigator = createStackNavigator({
    Categories: CategoriesScreen,
    CategoryMeals: CategoryMealsScreen,
    MealDetail: MealDetailScreen
});
```
* to use it in JSX we need to wrap it in an app container `export default createAppContainer(MealsNavigator);`
* we import app container from react-navigation `import { createAppContainer } from 'react-navigation';`
* we import it and use it in App.js. we get first Screen on top render and a menu for free
* every Component rendered in Navigator gets a navigation prop object with a bunch of methods (like pop and push)
* we use navigate passing in the defined route name  in a button press callback
```
 <Button title="Go to Meals" onPress={()=>{
                props.navigation.navigate({routeName: 'CategoryMeals'})
            }}/>
```
* we see animation and also the back button in header
* `props.navigation.navigate('CategoryMeals')` is also valid
* instead of navigate() i can use  `.push('RouteName')` with push i can navigate to the same screen i am in. (e.g same screen different content)
* to programmaticaly go back `props.navigation.goBack();` pop() also goes to previous screen on stack
* `props.navigation.popToTop();` takes us to the topmost screen in the stack
* `props.navigation.replace( 'CategoryMeals')` replace the screen in the stack. (no animation, not added to the stack). we use it when we dont want to go back
* in /models folder we add a category js file for the data class and in /data we write the script that creates an array of object to pass in FlatList
* FlatList supports multiple columns with the numColumns prop
* props is not available outside the functional component
* we can navigate propgramatically in onPress handlers
* JS functions are objects and can have properties. react navigation uses the navigationOptions property we define e.g for header
```
CategoriesScreen.navigationOptions = {
    headerTitle: 'Meal Categories'
};
```
* we can pass in additional prameters to the component we navigate to with react navigation as an object
```
 props.navigation.navigate({routeName: 'CategoryMeals', params: {
                    categoryId: itemData.item.id
                }});
```
* alternate syntax `.navigate('CategoryMeals',{categoryId: itemData.item.id})`
* in the invoked component we can access the param value as `props.navigation.getParam('categpryId)` 
* to dynamicaly set navigationOptions such as title per instance we use a function which gets the navigation object. what we return from this method is the options object
```
CategoryMealsScreen.navigationOptions = (navigationData) => {

    const catId = navigationData.navigation.getParam('categoryId');
    const selectedCategory = CATEGORIES.find(cat => cat.id === catId);

    return {
        headerTitle: selectedCategory.title
    };
}
```
* if we have navigationOptions that are common for all screens (like styling of Header) we can apply them to the navigator
* navigation options can be passed per route as an object
```
const MealsNavigator = createStackNavigator({
    Categories: CategoriesScreen,
    CategoryMeals: {
      screen: CategoryMealsScreen,
      navigationOptions: {
        ....
      }
    },
    MealDetail: MealDetailScreen
});
```
* better yet we can pass a second cofig object to the createStackNavigator() using the `defaultNavigationoptions` param. specific options win over default. other options are available (mode, initialRoutename)
* for efficiency we install `expo install react-native-screens` so that optimized screen comps are used under the hood. we import it `import { useScreens } from 'react-native-screens';` and use it at app start `useScreens();`
* RN offers ImageBackground to add backgroundimage. we wrap the content to put infron with it
```
<ImageBackground source={{uri: props.image}} style={styles.bgImage}>
                            <Text style={styles.title}>{props.title}</Text>
                        </ImageBackground>
```
* we should style text background color in a wrapping View and not on Text styling
* we can add header buttons using the navigationOptions `headerRight: <Text>FAV!</Text>`
* install a package `npm install --save react-navigation-header-buttons` to help with adding header buttons
* we install `expo install @expo/vector-icons` and import Ionicons `import { Ionicons } from '@expo/vector-icons';` 
* we create a custom HeaderButton importing `import { HeaderButton } from  'react-navigation-header-buttons';`
* we add our styling and functionality
```
    return <HeaderButton 
        {...props} 
        IconComponent={Ionicons} 
        iconSize={20}
        color={Platform.OS === 'android' ? 'white' : Colors.primaryColor}
    />;
```
* in the navigationOptions of the screen we we use <HeaderButtons> which we import from 'react-navigation-header-buttons'
```
        headerRight: (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item title="Favorite" iconName="ios-star" onPress={() => {
                    console.log('Mark as Favorite');
                }} />
            </HeaderButtons>
        )
```
* to setup bottom tab navigator:
  * we import it `import { createBottomTabNavigator } from 'react-navigation-tabs';`
  * we instantiate it: 
```
const MealsFavTabNavigator = createBottomTabNavigator({
    Meals: MealsNavigator,
    Favorites: FavoritesScreen
});
```
* note that navigators are components and can be used in other navigators
* we use the topmost navigator in the app
* navigationOptions in the config (2nd argument) of a navigator only matter if that navigator is used inside another navigator
* anytime we use JSX we need to import React
* the pattern to add icons in tabs and color
```
    Favorites: {
        screen: FavoritesScreen,
        navigationOptions: {
            tabBarLabel: 'Favorites!',
            tabBarIcon: (tabInfo) => {
                return <Ionicons name="ios-star" size={20} color={tabInfo.tintColor} />;
            } 
        }        
    }
},{
    tabBarOptions: {
        activeTintColor: Colors.accentColor
    }
```
* we can use material tab navigator `expo install react-navigation-material-bottom-tabs`
* we also need to install `expo install react-native-paper`
* we import it `import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';`
* we will use it only for android. material tab bar supprot shifting and works with tabBarColor option for effect
```
barStyle: {
            backgroundColor: Colors.primaryColor
        }
```
* above changes background color for Material tab
* navigationOptions prop is not passes automaticaly to nested components
* for side drawer menu navigation `import { createDrawerNavigation } from 'react-navigation-drawer'; `
* menu icon does not show by default. we have to add it in navigationOptions of the screens it applies. we use headerButtons and we also need the navigation object at runtime to get the toggleDrawer() method. we use the arrow function pattern
```
CategoriesScreen.navigationOptions = (navData) => {
    return {
        headerTitle: 'Meal Categories',
        headerLeft: <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item title="Menu" iconName="ios-menu" onPress={() => { 
                navData.navigation.toggleDrawer();
            }} />
        </HeaderButtons>
    };
};
```
* we see 2 wayus to pass navigationoptions for screens when they are sused as pats of navigation. we see also how to style drawer
```
const FiltersNavigator = createStackNavigator({
    Filters: FiltersScreen
}, {
    // navigationOptions: {
    //     drawerLabel: 'Filters!!!'
    // },
    defaultNavigationOptions: defaultStackNavOptions
});

const MainNavigator = createDrawerNavigator({
    MealsFavs: {
        screen: MealsFavTabNavigator,
        navigationOptions: {
            drawerLabel: 'Meals'
        }
    },
    Filters: FiltersNavigator
},{
    contentOptions: {
        activeTintColor: Colors.accentColor,
        labelStyle: {
            fontFamily: 'open-sans-bold'
        }
    }
});
```
* headerStyle styles the container, headerTitleStyle styles the header text, headerBackTitleStyle styles the secondary text
* in tab navigation we set style as `labelStyle: {fontFamily: 'open-sans'},`
* in material `tabBarlabel: Platform.OS === 'android' ? <Text style={{fontFamily: 'open-sans-bold'}}>Meals</Text> : 'Meals'`
* RN offers Switch component that has a state
```
            <Switch
                trackColor={{ true: Colors.primaryColor }}
                thumbColor={Platform.OS === 'android' ? Colors.primaryColor : ''}
                value={props.state}
                onValueChange={props.onChange}
            />
```
* to communicate between component state and navigationOptions we use params
```
    const saveFilters = useCallback(() => {
        const appliedFilters = {
            glutenFree: isGlutenFree,
            lactoseFree: isLactoseFree,
            vegan: isVegan,
            vegeterian: isVegeterian
        };

        console.log(appliedFilters);
    }, [isGlutenFree, isLactoseFree, isVegan, isVegeterian]);

    useEffect(() => {
        navigation.setParams({
            save: saveFilters
        });
    }, [saveFilters]);
```
* we add the cakkback on press
```
        headerRight: <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item 
                title="Save" 
                iconName="ios-save" 
                onPress={navData.navigation.getParam('save')} 
            />
```
* be careful with inner functions ans useEffect()!!!! useEffect runs at each render  so if we call inner methods that cause rerender (infinite loop) useCallback() solves it

## Section 7: State Management & Redux

* we install redux and react-redux and add a /store folder and in there an actions and reducers folder
* mapStateToProps Hooks equivalent `const availableMeals = useSelector(state => state.meals.filteredMeals);`
* we use params to pass redux state in navigationOptions
```
    props.navigation.setParams({
        mealTitle: selectedMeal.title
    });
```
* the above causes infinite loop as it changes the props and causes rerender so the functional component runs again rerunning the method. we use useEffect(). only when the dependency changes it will rerun
```
    useEffect(()=>{
        props.navigation.setParams({
            mealTitle: selectedMeal.title
        });
    },[selectedMeal]);
```
* we use the title in the navigationOptions header settings but it has a delay. useEffect() runs after render time
* a cheap solution is to forward the title from the previous component we are coming from in MealList together with id
* pattern how to pass action creators into navigationOptions as header button handler
```
    const dispatch = useDispatch();

    const toggleFavoriteHandler = useCallback(() => {
        dispatch(toggleFavorite(mealId));
    }, [dispatch,mealId]);

    useEffect(()=>{
        props.navigation.setParams({
            toggleFav: toggleFavoriteHandler
        });
    }, [toggleFavoriteHandler]);
```
* You can debug Redux in React Native apps with help of the [React Native Debugger tool](https://github.com/jhen0409/react-native-debugger/blob/master/docs/redux-devtools-integration.md)
    * Make sure you got the [React Native Debugger](https://github.com/jhen0409/react-native-debugger) installed 
    * Enable JS Debugging in the running app (open development overlay via CTRL + M / CMD + M on Android devices, CMD + D on iOS devices)
    * Install the [redux-devtools-extension package](https://www.npmjs.com/package/redux-devtools-extension) via `npm install --save-dev redux-devtools-extension` 
    * Enable Redux debugging in your code:
```
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

const store = createStore(reducer, composeWithDevTools());
```
* Important: Make sure you remove this code when building your app for production!

## Section 8: Time to Practice - THE SHOP APP

## Section 9: Handling User Inputcd

### Lecture 185. Configuring TextInputs

* in the downloaded shop app we go to EditProductScreen to work on TextInputs
* `keyboardType="decimal-pad"` prop in `<TextInput>` makes the keybad numeric 'cross platform'
* autocapitalize prop is use to autocapitalize text `autoCapitalize="sentences"` * `autoCorrect` prop does autocorrection
* we can config the pad return key with `returnKeyType="next"` which only configs presentation
* we can pass `onEndEditing={()=> console.log("done editing")}` event handler which fires when we exit the input field. there are many handlers available for input `onSubmitEditing`

### Lecture 186. Adding Basic Validation

* we add `titleIsValid` to state using Hooks for validations
* we add a validation helper method
```
  const titleChangeHandler = text => {
    if(text.trim().length === 0) {
      setTitleIsValid(false)
    }
    setTitle(text);
  };
```
* we do conditional rendering `{!titleIsValid && <Text>Please enter a valid title</Text>}`
* we can use 'ValidateJS' package in our code for cleaner code
* we also need to add `titleIsValid` in the suseCallback() so that it wont rebuild everytime it changes.

### Lecture 187. Getting Started with useReducer()

* we use a React Hook Reducer `useReducer()` to combine state and build complex state and facilitate our code
* we import it from React
* we create the reducer outside the component so it wont rebuild at its rerender. we do this if we dont depend on props
```

```
* in the component we call useReducer passing in the reducer object and the initial state
```
  const [formState,dispatchFormState] = useReducer(formReducer, { 
    inputValues: {
      title: editedProduct ? editedProduct.title : '',
      imageUrl: editedProduct ? editedProduct.imageUrl : '',
      description: editedProduct ? editedProduct.description : '',
      pride: ''
    }, 
    inputValidities: {
      title: editedProduct ? true : false,
      imageUrl: editedProduct ? true : false,
      description: editedProduct ? true : false,
      price: editedProduct ? true : false,
    }, 
    formIsValid: editedProduct ? true : false 
  });
```
* we see that reducer combines all different states. we can now get rid of useState()
* useReducer returns the state and a dispatch action to call to rigger actions.
* we alter initial state with UPDATE action dispatched when we interact with text inputs (in the change handler)
```
dispatchFormState({
    type: FORM_INPUT_UPDATE, 
    value: text, 
    isValid,
    input: 'title'
});
```

### Lecture 188. Finishing the Merged Form & Input Management

* we mod the titleChangeHandler to textChangeHandler passing in the identifier
* we use the Handler in onChangeHadler of inputs passing in identifier ` onChangeText={textChangeHandler.bind(this,"price")}`
* it only validates inputs for length
* form reducer parametrical becomes
```
const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid
      
    };
    let updatedFormIsValid = true;
    for(const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }
    return {
      updatedFormIsValid,
      inputValues: updatedValues,
      inputValidities: updatedValidities
    };
  }
  return state;
};
```
* we now can use form state in out code `value={formState.inputValues.title}`
* in submitHandler() we use the formState to pass in the values
* we updae useCallback to reflect state

### Lecture 189. Moving Input Logic Into A Separate Component

* using hooks we can split logic from view easily
* in /UI we add Input.js for Input reusable view component where we put the JSX for 1 of the inputs
* vazoume kai to validation sto input xrisimopoiwntas React Hook reducer kai handler to enforce validations.
* we can use ValidateJS lib instead

### Lecture 190. Connecting Input Component & Form

* we use useEffect() for lifecycle method to forward vals to parent component with a callback. wthe method is called when inputstate changes
```
    const { onInputChange } = props;

    useEffect(()=>{
        if(inputState.touched){
            onInputChange(inputState.value, inputState.isValid);
        }
    }, [inputState, onInputChange]);
```
* the callback in the parent component we wrap in useCallback hook to avoid unnecessary rebuild
```
  const inputChangeHandler = useCallback((inputIdentifier, inputValue, inputValidity) => {
    dispatchFormState({
      type: FORM_INPUT_UPDATE, 
      value: inputValue, 
      isValid: inputValidity,
      input: inputIdentifier
    });
  },[dispatchFormState]);
```
* we get stack overflow for rerendering way too often
* the problem is `inputChangeHandler` we use useCallback to avoid unnecessary Recreation
* but the way we bind it as prop to Input `onInputChange={inputChangeHandler.bind(this, 'title')}` will create a function binding for every render cycle
* we remove bind and add an id prop instead e.g.`id='imageUrl'`

### Lecture 191. Tweaking Styles & Handling the Soft Keyboard

* we just style error message
* we add KeyboardAvoidingView to be able to reach all inputs. we wrap with it the ScroolView
* we config it `<KeyboardAvoidingView style={{flex: 1}} behavior="padding" keyboardVerticalOffset={100}>`

### Lecture 192. Alternatives & Wrap Up

* in production consider [validate.js](https://validatejs.org/) lib
* our pattern is reusable
* also [formik](https://jaredpalmer.com/formik/) lib is useful

## Section 10: Http Requests & Adding a Web Server + Database

### Lecture 195. Setup & How To Send Requests

* we will add backend to store data
* we will add firebase backend. we go to [console](https://console.firebase.google.com/)
* we create a new project 'rn-complete-guide'
* at the project dashboard we need only the database
* to connect to a DB from a RN app we go through a Web server. firebase offers both
* we opt for RT database NOT Firestore and Start in Test Mode (no auth required)
* we cp the URL of our firebase API

### Lecture 196. Installing Redux Thunk

* we know that
* in App.js we add thunk as middleware after importing it

### Lecture 197. Storing Products on a Server

* in actions/products.js we work on createProduct action creator using thunk
* we return a method that gets dispatch as an argument and call it when ready to pass the action to reducer
```
export const createProduct = (title, description, imageUrl, price) => {
  return async dispatch => {
    // write async code
    const response = await fetch('https://rn-complete-guide-32172.firebaseio.com/products.json', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title, description, imageUrl, price
      })
    });

    const resData = await response.json();
    dispatch({
      type: CREATE_PRODUCT,
      productData: {
        id: resData.name,
        title,
        description,
        imageUrl,
        price
      }
    });
  };
};
```

### Lecture 198. Fetching Products from the Server

* we add 'fetchProducts' action to get products from backend.
* in /screens/shop/ProductsOvrviewScreen we add the action. 
```
export const fetchProducts = () => {
  return async dispatch => {
    const response = await fetch('https://rn-complete-guide-32172.firebaseio.com/products.json');
    const resData = await response.json();
    // console.log(resData);
    const loadedProducts = [];

    for (const key in resData){
      loadedProducts.push(new Product(
        key, 
        'u1',
        resData[key].title, 
        resData[key].imageUrl,
        resData[key].description,
        resData[key].price,
      ));
    }

    dispatch({ type: SET_PRODUCTS, products: loadedProducts});
  };
};
```
* we use udseEffect to call it at mount time to populate the screen
```
  useEffect(()=>{
    dispatch(productsActions.fetchProducts());
  },[dispatch]);
```
* what we get from backend is an object
* we add a case to reducer
```
    case SET_PRODUCTS:
      return {
        availableProducts: action.products,
        userProducts: action.products.filter(prod => prod.ownerId === 'u1')
      };
```

### Lecture 199. Displaying a Loading Spinner & Handling Errors

* we want a loading spinner when we load the data
* at ProductOverviewScreen we use state hook fo loading flag
* we turn dispatch to async/awai using a wrapper
```
  useEffect(()=>{
    const loadProducts = async () => {
      setIsLoading(true);
      await dispatch(productsActions.fetchProducts());
      setIsLoading(false);
    };
    loadProducts();
  },[dispatch]);
```
* ActivityIndicator is the spinner in RN
* when using async.await use try/catch statement to capture unhandled promise exceptions
* in screen comp we need to handle the error to avoid breaking the app
* we take out the async loadProducts method from useEffect to make it reusable
* the way to do it is 
```
  const loadProducts = useCallback(async () => {
    setIsLoading(true);
    try {
      await dispatch(productsActions.fetchProducts());
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  },[dispatch, setIsLoading, seError]);

  useEffect(()=>{
    loadProducts();
  },[dispatch,loadProducts]);
```
* we put it in dependencies to avoid unnecesary recalls and put it in callback to avoid recreations

### lecture 200. Setting Up a Navigation Listener

* in navigation all screens are kept in memory 
* so if we alter backend data we dont see the change unless we restart the app.
* in stack navigation it gets destroyed and recreated so no prob
* in drawer navigation that we use we have a problem
* we use useEffect to add a navigation listener to re fetch data on navigation
```
  useEffect(()=>{
    const willFocusSub = props.navigation.addListener('willFocus', ()=>{
      loadProducts();
    });

    return () => {
      willFocusSub.remove();
    };
  },[loadProducts]);
```
* we also do cleanup on return which is a good practice
* we need both useEffect() as this does refetch when we come back from navigation and the other the initial at first render (component mount)

### Lecture 201. Updating & Deleting Products

* we add the edit and delete product action
* we use thunk to make it async
* we do the same for delte product action creator

### Lecture 202. Handling Additional Errors

* In EditProductScreen when we dispatch update or create using thunk we get back a promise which can have a state
* we want to add a loading activity spinner so we useState hook and a flag
* we use try/catch for errors like before...
* to throw an alert we use useEffect
```
useEffect(() => {
    if(error) {
      Alert,alert('An error occured', error, [{ text: 'Okay' }]);
    }
  },[error]);
```

### Lecture 203. Storing Orders

* 