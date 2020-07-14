import React from 'react';
import {StyleSheet, View, Text, TextInput, Button, Alert, Image} from 'react-native';
import * as firebase from 'firebase';
import SignUpCat from './../../images/signUpCat.jpg';
import Firebase from './../../src/Database/Firebase';

export default class SignupScreen extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            email: "",
            password: "",
            passwordConfirm: "",
        };
    }


    onSignupPress = () => {
        if (this.state.password != this.state.passwordConfirm){
            Alert.alert("Passwords do not match");
            return;
        }
        Firebase.SignUp(this.state.email, this.state.password)
        .then(function(result){
            this.props.navigation.reset({
                index: 0,
                routes: [{name: "Maincontent"}]
            }); //this.doesn't exist => react - need to bind to get the data from this
        }.bind(this)) .catch(function(error){
            Alert.alert(error.message);
        });

    }

    onBackToLoginPress = () => {
        this.props.navigation.reset({
            index: 0,
            routes: [{name: "Login"}]

        });
    }

    render(){
        return( 
            <View style={{paddingTop:50, alignItems:"center"}}>
                {/* <Text>Signup</Text> */}
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

                <TextInput style={{width:200, height:40, borderWidth:1}} 
                    value={this.state.passwordConfirm}
                    onChangeText={(text) => {this.setState({passwordConfirm:text}) }}
                    placeholder="Password Confirm"
                    secureTextEntry={true}
                    autoCapitalize="none"
                    autoCorrect={false}
                />
                <View style={{paddingTop: 10}}/>
                <Button title="Signup" onPress={this.onSignupPress.bind(this)}/>
                <View style={{paddingTop: 10}}/>
                {/* <Button title="Creat Account" onPress={this.onCreateAccountPress.bind(this)}/> */}
                <Button title="Back to Login" onPress={this.onBackToLoginPress.bind(this)}/>
    
                <Image source={SignUpCat}/>
            </View>
            );
    }
}

const styels = StyleSheet.create({

});