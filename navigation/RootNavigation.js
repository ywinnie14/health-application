import { Notifications } from 'expo';
import React from 'react';
// import { StackNavigator } from 'react-navigation';
// import MainTabNavigator from './MainTabNavigator';
import registerForPushNotificationsAsync from '../api/registerForPushNotificationsAsync';

import LoginScreen from './../screens/auth/LoginScreen';
import SignupScreen from './../screens/auth/SignupScreen';
import ForgotPasswordScreen from './../screens/auth/ForgotPasswordScreen';
import Maincontent from './../screens/Maincontent';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createStackNavigator();

function RootStackNavigator()
  {
    return(
    <NavigationContainer>
        <Stack.Navigator initialRouteName="Login" >
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Signup" component={SignupScreen} />
          <Stack.Screen name="Forgot Password" component={ForgotPasswordScreen} />
          <Stack.Screen name="Maincontent" component={Maincontent} />
        </Stack.Navigator>
    </NavigationContainer>
    // Login: { screen: LoginScreen },
    // Signup: { screen: SignupScreen },
    // ForgotPassword: { screen: ForgotPasswordScreen },

    // Main: { screen: Maincontent, },
    )};
    
  

// const Stack = createStackNavigator();


export default class RootNavigator extends React.Component {
  componentDidMount() {
    this._notificationSubscription = this._registerForPushNotifications();
  }

  componentWillUnmount() {
    this._notificationSubscription && this._notificationSubscription.remove();
  }

  render() {
    return <RootStackNavigator />;
    // return(
    //     <NavigationContainer>
    //      <Stack.Navigator>
    //        <Stack.Screen name="Login" component={LoginScreen} />
    //        <Stack.Screen name="Signup" component={SignupScreen} />
    //        <Stack.Screen name="Forgot Password" component={ForgotPasswordScreen} />
    //        <Stack.Screen name="MainContent" component={MainContent} />
    //      </Stack.Navigator>
    //    </NavigationContainer>
    // );
  }

  _registerForPushNotifications() {
    // Send our push token over to our backend so we can receive notifications
    // You can comment the following line out if you want to stop receiving
    // a notification every time you open the app. Check out the source
    // for this function in api/registerForPushNotificationsAsync.js
    registerForPushNotificationsAsync();

    // Watch for incoming notifications
    this._notificationSubscription = Notifications.addListener(this._handleNotification);
  }

  _handleNotification = ({ origin, data }) => {
    console.log(`Push notification ${origin} with data: ${JSON.stringify(data)}`);
  };
}