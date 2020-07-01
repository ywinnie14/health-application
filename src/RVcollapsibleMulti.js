import React, { Component } from 'react';
import { Switch,ScrollView,StyleSheet,Text,View,TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';
import * as Animatable from 'react-native-animatable';
import Collapsible from 'react-native-collapsible';
import Accordion from 'react-native-collapsible/Accordion';

export class RVcollapsibleMulti extends Component {
  state = {
    activeSections: [],
    //collapsed: true,
    multipleSelect: false,
  };

  setSections = sections => {
    this.setState({
      activeSections: sections.includes(undefined) ? [] : sections
    })
  }

  isMultipleSelect = (flag) => {
      this.setState({multipleSelect: flag})
  }

  render (){
      const {activeSections, multipleSelect} = this.state
      const {listSections, renderHeader, renderContent, duration} = this.props

      return(
          <Accordion
            activeSections={activeSections}
            sections={listSections}
            touchableComponent={TouchableOpacity}
            renderHeader={renderHeader}
            renderContent={renderContent}
            expandMultiple={multipleSelect}
            duration={duration}
            onChange={this.setSections}
          />
      )
  }

}

//export default RVcollapsibleMulti;