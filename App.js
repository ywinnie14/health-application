import React, { Component } from 'react';
import {AppLoading} from 'expo';
import {Asset} from 'expo-asset';
// import {Font} from 'expo-font';
import { StyleSheet, Text, View, StatusBar, Platform } from 'react-native';
import RootNavigator from './navigation/RootNavigation';

// Navigation Header
import LoginScreen from './screens/auth/LoginScreen';
import SignupScreen from './screens/auth/SignupScreen';
import ForgotPasswordScreen from './screens/auth/ForgotPasswordScreen';
import Maincontent from './screens/Maincontent';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import *  as Permissions from 'expo-permissions';




const Stack = createStackNavigator();

export default class App extends Component {

  constructor(props) {
    super(...arguments);
    this.state = { isLoadingComplete: false, isAuthenticated: false }
  }

  render() {
    if ( (!this.state.isLoadingComplete)) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync.bind(this)}
          onError={this._handleLoadingError.bind(this)}
          onFinish={this._handleFinishLoading.bind(this)}
        />
      );
    } else {
      return (
        <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
          {Platform.OS === 'android' && <View/>}

          <NavigationContainer>
            <Stack.Navigator initialRouteName="Login" >
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="Signup" component={SignupScreen} />
              <Stack.Screen name="Forgot Password" component={ForgotPasswordScreen} />
              <Stack.Screen name="Maincontent" options={{title: "Daily Health Message"}} component={Maincontent} />
            </Stack.Navigator>
          </NavigationContainer>
        </View>
      );
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      // predownload to use later like flash page, or other resources

      // Asset.loadAsync([
      //   // require('./assets/images/robot-dev.png'),
      //   // require('./assets/images/robot-prod.png'),
      // ]),
      // Font.loadAsync({
      //   // This is the font that we are using for our tab bar
      //   ...Ionicons.font,
      //   // We include SpaceMono because we use it in HomeScreen.js. Feel free
      //   // to remove this if you are not using it in your app
      //   // 'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
      // }),
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

