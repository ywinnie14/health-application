import React, { Component } from 'react';
import { Switch, ScrollView, StyleSheet, Text, View, TouchableOpacity, TouchableNativeFeedback } from 'react-native';
import Constants from 'expo-constants';
import {RVcollapsibleSingle} from './src/RVcollapsibleSingle';
import * as Animatable from 'react-native-animatable';
import { RVcollapsibleMulti } from './src/RVcollapsibleMulti';
import * as firebase from 'firebase';
import { Notifications} from 'expo';
import ApiKeys from './constants/ApiKeys';
import LoginScreen from './screens/auth/LoginScreen';
import SignupScreen from './screens/auth/SignupScreen';
import ForgotPasswordScreen from './screens/auth/ForgotPasswordScreen';
import MainContent from './screens/Maincontent';
//import StackNavigator from 'react-navigation';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';


//import * as Permissions from 'expo-permissions'

// const firebaseConfig = {
//   apiKey: "AIzaSyABREs-vaHtNsbtIU-QfPtHyBPpM_vuy2k",
//   authDomain: "daily-health-mobile-app.firebaseapp.com",
//   databaseURL: "https://daily-health-mobile-app.firebaseio.com",
//   projectId: "daily-health-mobile-app",
//   storageBucket: "daily-health-mobile-app.appspot.com",
//   messagingSenderId: "1077299941084",
//   appId: "1:1077299941084:web:e7babca1f5920aad0fee19",
//   measurementId: "G-P734VDQ9P1"
// };
// if(!firebase.apps.length){
//   firebase.initializeApp(firebaseConfig)
// }
// if(!firebase.apps.length){firebase.initializeApp(ApiKeys.firebaseConfig); }
// import * as Animatable from 'react-native-animatable';
// import Collapsible from 'react-native-collapsible';
// import Accordion from 'react-native-collapsible/Accordion';

// const CONTENT = [
//   {
//     title: '誰說糙米健康多了?',
//     content: '糙米的砒霜含量比白米高。砒霜溶於水，生長中的大米吸取水分同時也積儲砒霜，大多存在糙米殼裡。糙米去殼成白米，砒霜含量大大減低。如常，煮前洗淨或以水隔夜浸泡，砒霜隨之洗棄，糙米或白米都應該不會對成人構成問題。幼兒和小孩體積較小，砒霜吸取量相對較高，雖然糙米營養成分比白米高，常被認為健康多了，其實不宜幼小兒童，就是白米也該適量、與其他食物組均勻飲食。大米的砒霜含量於耕植地的水質有關，有機耕農不會減輕砒霜含量。',
//   },
//   {
//     title: '將心比心也有錯? ',
//     content: '心臟病發的症狀男女不一，男性症狀歷來冠為典型，孰不知男女有別? 由急性心肌梗塞引發的心臟病症狀有典型的胸口緊悶、氣短、噁心、冒冷汗、頭暈。胸口擠壓的感受可能轉往或只呈現於左肩、下顎、頸部、手臂。其他相關的非典型症狀有如腹痛、背痛、體虛、疲倦、右肩和手臂緊壓等。男性症狀大數以典型症狀求醫，女性病發症狀比起來較複雜，典型症狀仍然居多，但亦可以非典型症狀呈現、或被忽略。',
//   },
//   {
//     title: '宅男宅女注意了，宅中自有氡輻射',
//     content: '不透氣的住宅可能積蓄氡氣體。這是一種有輻射線的放射性氣體，由土壤及建築材料天然產生、發散，長久吸入體內可能導致肺癌。防預的方法很簡單，常常開門窗通風即可。',
//   },
//   {
//     title: '煮熟的米飯乘熱吃',
//     content: '不吃就應該即速將其降溫冷卻至攝氏五度以下。生米可能藏有細菌孢子，蒸煮過程對其無損，蒸煮後的米飯供其有利的生長環境，半小時就足以生長、釋放毒素、引致食物中毒，因此通常建議煮熟的米飯若不在四小時內食用或冷藏就應該扔掉，降低食物中毒的風險。隔夜飯即使再煮熟、高溫殺菌也除不去已釋放的毒素。冷藏除不去細菌只是緩慢細菌的生長，因此建議米飯冷藏超過三天也應該扔掉。',
//   },
// ];


import *  as Permissions from 'expo-permissions';

const Stack = createStackNavigator();

export default class App extends Component {

  constructor(props){
    super(props);
    this.state= {
      
    }
    // initailise firebase
     if(!firebase.apps.length){firebase.initializeApp(ApiKeys.firebaseConfig);}
    //  firebase.auth().onAuthStateChanged(this.onAuthStateChanged);
  }

  componentDidMount(){
    //this.registerForPushNotificationsAsync();
    firebase.auth().signInWithEmailAndPassword('lizzy@gmail.com', '123456').then(user =>{
      this.registerForPushNotificationsAsync(user)
    })
  }

  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Signup" component={SignupScreen} />
          <Stack.Screen name="Forgot Password" component={ForgotPasswordScreen} />
          <Stack.Screen name="MainContent" component={MainContent} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }

  registerForPushNotificationsAsync = async(user) => {
    const {status: existingStatus} = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;

    // ask for Permissions, iOS will ask for once & Android grant Permissions when download the app
    if (existingStatus != 'granted'){
      const {status} = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }
    // Stop if the user did not grant the Permissions
    if (finalStatus != 'granted'){
      return;
    }

    // Get the token that uniquely identifies this device
    let token = await Notifications.getExpoPushTokenAsync();

    var updates =[]
    updates['/expoToken'] = token
    firebase.database().ref('users').child(user.uid).update(updates)

  }

}
