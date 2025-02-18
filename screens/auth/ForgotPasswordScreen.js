import React from 'react';
import {StyleSheet, View, Text, TextInput, Button, Alert, Image} from 'react-native';
// import * as firebase from 'firebase';
import AngryCat from './../../images/angryCat.png';
import Firebase from './../../src/Database/Firebase';

export default class ForgotPasswordScreen extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            email: "",
        };
    }

    onResetPasswordPress() {
        Firebase.ResetPassword(this.state.email)
        .then(function(result){
            Alert.alert("Password reset email has been sent.");
            this.props.navigation.reset({
                index: 0,
                routes: [{name: "Login"}]
            });
        }.bind(this)).catch(error => {
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
                {/* <Text>Forgot Password</Text> */}
                <TextInput style={{width:200, height:40, borderWidth:1}} 
                    value={this.state.email}
                    onChangeText={(text) => {this.setState({email:text}) }}
                    placeholder="Email"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                />
                <View style={{paddingTop: 10}}/>
                <Button title="Reset Password" onPress={this.onResetPasswordPress.bind(this)}/>
                <View style={{paddingTop: 10}}/>
                <Button title="Back to Login" onPress={()=> { this.onBackToLoginPress(); }}/>
                <Image source={AngryCat}/>
            </View>
            );
    }
}

const styels = StyleSheet.create({

});