import React, { Component } from 'react'

import { Button, Text, View, StyleSheet } from 'react-native'

import Icon from 'react-native-vector-icons/Ionicons';

import { createStackNavigator} from '@react-navigation/stack';

import ShoppingCartIcon from '../Icons/ShoppingCartIcon';

import Cart from '../screens/Cart';

const MyStack = createStackNavigator();



class CartScreen extends React.Component {
    render() {
        return (
            <MyStack.Navigator screenOptions={{
                headerStyle: {
                    backgroundColor: '#832438',
                },
                headerTintColor: '#fff'
            }}>
                <MyStack.Screen name="CartScreen" component={Cart} options={{
                    headerLeft: () => (
                        <Icon.Button 
                        name="ios-menu" 
                        size={25} 
                        backgroundColor="#832438"
                        onPress={() => {this.props.navigation.openDrawer()}}
                        ></Icon.Button>
                    ),
                    headerRight: () =>(
                        <ShoppingCartIcon />
                    )
                }}/>
            </MyStack.Navigator>
        )
    }
}

export default CartScreen;
