import React, { Component } from 'react';
import { Switch, ScrollView, StyleSheet, Text, View, TouchableOpacity, TouchableNativeFeedback, Button, Alert} from 'react-native';
import Constants from 'expo-constants';
import {RVcollapsibleSingle} from '../src/RVcollapsibleSingle';
import * as Animatable from 'react-native-animatable';
import { RVcollapsibleMulti } from '../src/RVcollapsibleMulti';
import * as firebase from 'firebase';
import { Notifications} from 'expo';
import ApiKeys from '../constants/ApiKeys';

const CONTENT = [
    {
      title: '誰說糙米健康多了?',
      content: '糙米的砒霜含量比白米高。砒霜溶於水，生長中的大米吸取水分同時也積儲砒霜，大多存在糙米殼裡。糙米去殼成白米，砒霜含量大大減低。如常，煮前洗淨或以水隔夜浸泡，砒霜隨之洗棄，糙米或白米都應該不會對成人構成問題。幼兒和小孩體積較小，砒霜吸取量相對較高，雖然糙米營養成分比白米高，常被認為健康多了，其實不宜幼小兒童，就是白米也該適量、與其他食物組均勻飲食。大米的砒霜含量於耕植地的水質有關，有機耕農不會減輕砒霜含量。',
    },
    {
      title: '將心比心也有錯? ',
      content: '心臟病發的症狀男女不一，男性症狀歷來冠為典型，孰不知男女有別? 由急性心肌梗塞引發的心臟病症狀有典型的胸口緊悶、氣短、噁心、冒冷汗、頭暈。胸口擠壓的感受可能轉往或只呈現於左肩、下顎、頸部、手臂。其他相關的非典型症狀有如腹痛、背痛、體虛、疲倦、右肩和手臂緊壓等。男性症狀大數以典型症狀求醫，女性病發症狀比起來較複雜，典型症狀仍然居多，但亦可以非典型症狀呈現、或被忽略。',
    },
    {
      title: 'Don’t skip breakfast.',
      content: 'Studies show that eating a proper breakfast is one of the most positive things you can do if you are trying to lose weight. Breakfast skippers tend to gain weight. A balanced breakfast includes fresh fruit or fruit juice, a high-fibre breakfast cereal, low-fat milk or yoghurt, wholewheat toast, and a boiled egg.',
    },
    {
      title: 'Neurobics for your mind. ',
      content: 'Get your brain fizzing with energy. American researchers coined the term ‘neurobics’ for tasks which activate the brains own biochemical pathways and to bring new pathways online that can help to strengthen or preserve brain circuits. Brush your teeth with your ‘other’ hand, take a new route to work or choose your clothes based on sense of touch rather than sight. People with mental agility tend to have lower rates of Alzheimer’s disease and age-related mental decline.',
    },
    {
      title: 'Knock one back.',
      content: 'A glass of red wine a day is good for you. A number of studies have found this, but a recent one found that the polyphenols (a type of antioxidant) in green tea, red wine and olives may also help protect you against breast cancer. It’s thought that the antioxidants help protect you from environmental carcinogens such as passive tobacco smoke.',
    },
  ];

export default class Maincontent extends Component {

  constructor(props){
    super(props);
    this.state = {};
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
      firebase.auth().signOut();
  }

    render() {
      const {container, content, collapsing }  = styles;

      return (
        <View style={container}>
          <ScrollView contentContainerStyle={{ paddingTop: 30 }}>
            <RVcollapsibleSingle
              // title = "Daily Health App"
              renderHeader={this.renderHeaderSingle()}
            /> 
            <RVcollapsibleMulti
              ref={(target) => this.refMultiCollapsible = target}
              listSections={CONTENT}
              renderHeader={this.renderHeader}
              renderContent={this.renderContent}
              duration={400}
            />

            <Button title="Signout" onPress={this.onSignoutPress}/>   
            
          </ScrollView>
        </View>
      );
    }
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F5FCFF',
      paddingTop: Constants.statusBarHeight,
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