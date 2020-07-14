import React, { Component } from 'react';
import { Switch, ScrollView, StyleSheet, Text, View, TouchableOpacity, TouchableNativeFeedback, Button, Alert} from 'react-native';
import Constants from 'expo-constants';
import {RVcollapsibleSingle} from '../src/RVcollapsibleSingle';
import * as Animatable from 'react-native-animatable';
import { RVcollapsibleMulti } from '../src/RVcollapsibleMulti';
import * as firebase from 'firebase';
import { Notifications} from 'expo';
import ApiKeys from '../constants/ApiKeys';
import Firebase from './../src/Database/Firebase';
import FirebaseMessages from './../src/Database/FirebaseMessages';


export default class Maincontent extends Component {

  constructor(props){
    super(props);
    this.state = { messages: [] };
  }

  componentDidMount() {
    FirebaseMessages.OnSnapshot(this.onMessagesSnapshot.bind(this));
  }

  onMessagesSnapshot(snapshot) {
    let temp = [];
    snapshot.forEach(doc => temp.push(doc.data()));
    this.setState({ messages: temp.sort((a, b) => { return a.timestamp - b.timestamp; }) });
  }

  renderHeaderSingle=()=> {
      const {header, heading} = styles
      return(
        <View style={header}>
          <Text style={heading}>Daily Health App</Text>
        </View>
      )
    }


    renderHeader = (section, _, isActive) => {
      return (
        <Animatable.View
          duration={400}
          style={[styles.header, isActive ? styles.active : styles.inactive]}
          transition="backgroundColor"
        >
          <Text style={styles.headerText}>{section.title}</Text>
        </Animatable.View>
      );
    };

    renderContent(section, _, isActive) {
      return (
        <Animatable.View
          duration={400}
          style={[styles.content, isActive ? styles.active : styles.inactive]}
          transition="backgroundColor"
        >
          <Animatable.Text animation={isActive ? 'bounceIn' : undefined}>
            {section.content}
          </Animatable.Text>
        </Animatable.View>
      );
    }

    onSignoutPress = () => {
      Firebase.SignOut();
      this.props.navigation.reset({
        index:0,
        routes:[{name: "Login"}]
      })
  }

    render() {
      const {container, content, collapsing }  = styles;

      return (
        <View style={container}>
          <ScrollView >
            <RVcollapsibleSingle
              // title = "Daily Health App"
              renderHeader={this.renderHeaderSingle()}
            /> 
            <RVcollapsibleMulti
              ref={(target) => this.refMultiCollapsible = target}
              listSections={this.state.messages}
              renderHeader={this.renderHeader}
              renderContent={this.renderContent}
              duration={400}
            />

            <Button title="Signout" onPress={this.onSignoutPress.bind(this)}/>   
            
          </ScrollView>
        </View>
      );
    }
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F5FCFF',
      // paddingTop: Constants.statusBarHeight,
    },
    collapsing: {
      borderBottomWidth: 1,
      borderBottomColor: '#a5b0b5'
    },
    // title: {
    //   textAlign: 'center',
    //   fontSize: 22,
    //   fontWeight: '300',
    //   marginBottom: 20,
    // },
    header: {
      backgroundColor: '#ADD8E6',
      padding: 10,
    },
    heading: {
      textAlign: 'center',
      fontSize: 20,
      fontWeight: '500',
      fontWeight: 'bold',
    },
    headerText: {
      textAlign: 'left',
      fontSize: 16,
      fontWeight: '500',
      fontWeight: 'bold',
    },
    content: {
      padding: 20,
      backgroundColor: '#fff',
      
    },
    active: {
      backgroundColor: '#E5E4E2',
    },
    inactive: {
      backgroundColor: 'rgba(245,252,255,1)',
      borderBottomWidth: 1,
      borderBottomColor: '#a5b0b5',
    },
  
  });