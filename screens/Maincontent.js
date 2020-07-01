import React, { Component } from 'react';
import { Switch, ScrollView, StyleSheet, Text, View, TouchableOpacity, TouchableNativeFeedback } from 'react-native';
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

    render() {
      const {container, content, collapsing } = styles;

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
            {/* <RVcollapsibleSingle
              title = "Single Collapsible"
              renderHeader={this.renderHeaderSingle()}
            > 
              <View style={content}>
                <Text>
                  Bacon ipsum dolor amet chuck turducken landjaeger tongue spare
                  ribs
                </Text>
              </View>
            </RVcollapsibleSingle> */}

            {/* <Text style={styles.title}>Accordion Example</Text>
            <View style={styles.multipleToggle}>
              <Text style={styles.multipleToggle__title}>Multiple Select?</Text>
              <Switch
                value={multipleSelect}
                onValueChange={a => this.setState({ multipleSelect: a })}
              />
            </View> */}

            {/* <View style={styles.selectors}>
              <Text style={styles.selectTitle}>Select:</Text>
              {SELECTORS.map(selector => (
                <TouchableOpacity
                  key={selector.title}
                  onPress={() => this.setSections([selector.value])}
                >
                  <View style={styles.selector}>
                    <Text
                      style={
                        activeSections.includes(selector.value) &&
                        styles.activeSelector
                      }
                    >
                      {selector.title}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View> */}

            {/* <TouchableOpacity onPress={this.toggleExpanded}>
              <View style={header}>
                <Text style={headerText}>Single Collapsible</Text>
              </View>
            </TouchableOpacity>
            <Collapsible collapsed={this.state.collapsed} align="center">
              <View style={content}>
                <Text>
                  Bacon ipsum dolor amet chuck turducken landjaeger tongue spare
                  ribs
                </Text>
              </View>
            </Collapsible> */}
            {/* <Accordion
              activeSections={activeSections}
              sections={CONTENT}
              touchableComponent={TouchableOpacity}
              expandMultiple={multipleSelect}
              renderHeader={this.renderHeader}
              renderContent={this.renderContent}
              duration={400}
              onChange={this.setSections}
            /> */}
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