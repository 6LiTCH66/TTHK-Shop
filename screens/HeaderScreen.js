import React, { Component } from 'react'
import { Button, Text, View, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';

import { createStackNavigator} from '@react-navigation/stack';

import ShoppingCartIcon from '../Icons/ShoppingCartIcon';

const IconStack = createStackNavigator();


const DrawerHeader = () => (
    <Icon.Button 
        name="ios-menu" 
        size={25} 
        backgroundColor="#832438"
        onPress={() => {this.props.navigation.openDrawer()}}>
    </Icon.Button>
)
export default DrawerHeader;