import React, { Component } from 'react';
export { Switch, ScrollView, StyleSheet, Text, View, TouchableOpacity, TouchableNativeFeedback, StatusBar, Platform } from 'react-native';
export * as firebase from 'firebase';
export {Asset} from 'expo-asset';
export {AppLoading, Notifications} from 'expo';
export {Font} from 'expo-font';
// export ApiKeys from './constants/ApiKeys';
export { createStackNavigator } from '@react-navigation/stack';
// export { NavigationContainer } from '@react-navigation/native';
import RootNavigation from './navigation/RootNavigation';
export *  as Permissions from 'expo-permissions';
import Maincontent from './screens/Maincontent';
export {auth, db} from './src/Database/Firebase';

export default {React,
                RootNavigation,
                Maincontent 
            }