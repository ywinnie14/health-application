import React from 'react';
import {StyleSheet, View, Text, TextInput, Button} from 'react-native';

export default class ForgotPasswordScreen extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            email: "",
        };
    }

    onResetPasswordPress = () => {

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
                />
    
                <Button title="Reset Password" onPress={this.onResetPasswordPress}/>
                {/* <Button title="Creat Account" onPress={this.onCreateAccountPress.bind(this)}/> */}
                <Button title="Back to Login" onPress={()=> { this.onBackToLoginPress(); }}/>

    
                {/* <Image source={AngryCat}/> */}
            </View>
            );
    
    }
}

const styels = StyleSheet.create({

});