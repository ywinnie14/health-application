import React from 'react';
import {Image, StyleSheet, View, Text, TextInput, Button, Alert} from 'react-native';
import SleepyCat from './../../images/sleepyCat.png';
// import {NavigationActions} from 'react-navigation';
import * as firebase from 'firebase';

export default class LoginScreen extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            email: "",
            password:"",
        };
    }

    onLoginPress = () => {
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
            .then(function(result){
                Alert.alert("Hello!");
            }) .catch(function(error){
                Alert.alert(error.message);
            });
    }

    onCreateAccountPress = () => {
        // var navActions = this.props.navigation.reset({
        //     index: 0,
        //     actions: [this.props.navigation.navigate("SignupScreen")]
        // });
        // this.navigation.dispatch(navActions);
        // this.props.navigation.navigate("SignupScreen");
        
        
        this.props.navigation.reset({
            index: 0,
            routes: [{name: "Signup"}]

        });

        

    }


    onForgotPasswordPress= () => {
        this.props.navigation.reset({
            index: 0,
            routes: [{name: "Forgot Password"}]

        });
    }
        // this.props.navigation.navigate("SignupScreen");

    render(){
        // this.navigation = navigation;
        // const {navigation,route}=this.props;

        return( 
        <View style={{paddingTop:50, alignItems:"center"}}>
            {/* <Text>Login</Text> */}
            <TextInput style={{width:200, height:40, borderWidth:1}} 
                value={this.state.email}
                onChangeText={(text) => {this.setState({email:text}) }}
                placeholder="Email"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
            />

            <View style={{paddingTop: 10}}/>

            <TextInput style={{width:200, height:40, borderWidth:1}} 
                value={this.state.password} 
                onChangeText={(text) => {this.setState({password:text}) }}
                placeholder="Password"
                secureTextEntry={true}
                autoCapitalize="none"
                autoCorrect={false}
            /> 
            <View style={{paddingTop: 10}}/>

            <Button title="Login" onPress={this.onLoginPress}/>
            <View style={{paddingTop: 10}}/>
            {/* <Button title="Creat Account" onPress={this.onCreateAccountPress.bind(this)}/> */}
            <Button title="Creat Account" onPress={()=> { this.onCreateAccountPress(); }}/>
            <View style={{paddingTop: 10}}/>
            <Button title="Forgot Password" onPress={()=> { this.onForgotPasswordPress(); }}/>

            <Image source={SleepyCat}/>
        </View>
        );

    }
}

const styels = StyleSheet.create({
});