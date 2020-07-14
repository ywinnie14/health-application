

import React, { Component } from 'react';
import { Switch, ScrollView, StyleSheet, Text, View, TouchableOpacity, TouchableNativeFeedback, StatusBar, Platform, Alert } from 'react-native';
import * as firebase from 'firebase';
import {Asset} from 'expo-asset';
import {AppLoading, Notifications} from 'expo';
import {Font} from 'expo-font';
import ApiKeys from './constants/ApiKeys';
import Firebase from './src/Database/Firebase';
// import LoginScreen from './screens/auth/LoginScreen';
// import SignupScreen from './screens/auth/SignupScreen';
// import ForgotPasswordScreen from './screens/auth/ForgotPasswordScreen';
// import MainContent from './screens/Maincontent';
//import StackNavigator from 'react-navigation';
import { createStackNavigator } from '@react-navigation/stack';
// import { NavigationContainer } from '@react-navigation/native';
import RootNavigation from './navigation/RootNavigation';

import *  as Permissions from 'expo-permissions';
import Maincontent from './screens/Maincontent';

const Stack = createStackNavigator();

export default class App extends Component {

  constructor(props){
    super(props);
    this.state= {
      isAuthenticationReady: false,
      isAuthenticated: null
    }
    // initailise firebase
    //  if(!firebase.apps.length){firebase.initializeApp(ApiKeys.firebaseConfig);}
    //  firebase.auth().onAuthStateChanged(this.onAuthStateChanged);
    Firebase.IsInitialized()
    .then(this.onInitSuccess.bind(this))
    .catch(this.onInitiFailure.bind(this))
  }

  onInitSuccess() {
    this.setState({isAuthenticated: true});
  }

  onInitiFailure(error){
    this.setState({isAuthenticated: false});
    Alert.alert(error.message);
  }

  onAuthStateChanged = (user) => {
    this.setState({isAuthenticationReady: true});
    this.setState({isAuthenticated: !!user});
  }
  componentDidMount(){
    const myitems = firebase.database().ref("users");
    myitems.on("value",datasnap=>{
      console.log(datasnap.val())
    })
  }

  // componentDidMount(){
  //   //this.registerForPushNotificationsAsync();
  //   firebase.auth().signInWithEmailAndPassword('lizzy@gmail.com', '123456').then(user =>{
  //     this.registerForPushNotificationsAsync(user)
  //   })
  // }

  // render() {
  //   return (
  //     <NavigationContainer>
  //       <Stack.Navigator>
  //         <Stack.Screen name="Login" component={LoginScreen} />
  //         <Stack.Screen name="Signup" component={SignupScreen} />
  //         <Stack.Screen name="Forgot Password" component={ForgotPasswordScreen} />
  //         <Stack.Screen name="MainContent" component={MainContent} />
  //       </Stack.Navigator>
  //     </NavigationContainer>
  //   );
  // }

  render() {
    if ( (!this.state.isLoadingComplete || !this.state.isAuthenticationReady) && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
          {Platform.OS === 'android' && <View style={styles.statusBarUnderlay} />}
          {(this.state.isAuthenticated) ? <Maincontent /> : <RootNavigation />}
          {/* {(firebase.auth().currentUser)? <Maincontent /> : <RootNavigation />} */}
          {/* <StatusBar barStyle="default"></StatusBar> */}
          {/* <Text>helloworld</Text> */}
        </View>
      );
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        // require('./assets/images/robot-dev.png'),
        // require('./assets/images/robot-prod.png'),
      ]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Ionicons.font,
        // We include SpaceMono because we use it in HomeScreen.js. Feel free
        // to remove this if you are not using it in your app
        // 'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
      }),
    ]);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };


  // registerForPushNotificationsAsync = async(user) => {
  //   const {status: existingStatus} = await Permissions.getAsync(
  //     Permissions.NOTIFICATIONS
  //   );
  //   let finalStatus = existingStatus;

  //   // ask for Permissions, iOS will ask for once & Android grant Permissions when download the app
  //   if (existingStatus != 'granted'){
  //     const {status} = await Permissions.askAsync(Permissions.NOTIFICATIONS);
  //     finalStatus = status;
  //   }
  //   // Stop if the user did not grant the Permissions
  //   if (finalStatus != 'granted'){
  //     return;
  //   }

  //   // Get the token that uniquely identifies this device
  //   let token = await Notifications.getExpoPushTokenAsync();

  //   var updates =[]
  //   updates['/expoToken'] = token
  //   firebase.database().ref('users').child(user.uid).update(updates)

  // }

}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  statusBarUnderlay: {
    height: 24,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
});
