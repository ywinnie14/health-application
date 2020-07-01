import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';
// import * as Animatable from 'react-native-animatable';
import Collapsible from 'react-native-collapsible';
// import Accordion from 'react-native-collapsible/Accordion';


export class RVcollapsibleSingle extends Component {
    state = {
        collapsed: true,
    };

    toggleExpanded = () => {
        this.setState({ collapsed: !this.state.collapsed });
    };


    render() {
        const { header, headerText, collapsing } = styles
        const { title, children, renderHeader } = this.props

        return (
            <View style={collapsing}>
                <TouchableOpacity onPress={this.toggleExpanded}>
                    {
                        renderHeader ? renderHeader :
                            <View style={header}>
                                <Text style={headerText}>{title}</Text>
                            </View>
                    }

                </TouchableOpacity>
                <Collapsible collapsed={this.state.collapsed} align="center">
                    {children}
                </Collapsible>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    //   container: {
    //     flex: 1,
    //     backgroundColor: '#F5FCFF',
    //     paddingTop: Constants.statusBarHeight,
    //   },
    collapsing: {
        borderBottomWidth: 1,
        borderBottomColor: '#a5b0b5'
    },
    header: {
        backgroundColor: '#F5FCFF',
        padding: 10,
    },
    headerText: {
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '500',
    },


});