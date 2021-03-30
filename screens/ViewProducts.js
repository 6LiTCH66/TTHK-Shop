import React, {useState} from 'react'
import { View, StyleSheet, Text, FlatList, Dimensions, ImageBackground, TouchableOpacity } from 'react-native'

import { createStackNavigator} from '@react-navigation/stack';

import Icon from 'react-native-vector-icons/Ionicons';

import ShoppingCartIcon from '../Icons/ShoppingCartIcon';

import Products from '../screens/Products';


const ProductsStack = createStackNavigator();

class ViewProducts extends React.Component {
    render() {
        return (
            <ProductsStack.Navigator screenOptions={{
                headerStyle: {
                    backgroundColor: '#832438',
                },
                headerTintColor: '#fff'
            }}>
                <ProductsStack.Screen name="ViewProducts" component={Products} options={{
                    headerLeft: () => (
                        <Icon.Button 
                        name="ios-menu" 
                        size={25} 
                        backgroundColor="#832438"
                        onPress={() => {this.props.navigation.openDrawer()}}
                        ></Icon.Button>
                    ),
                    headerRight: () =>(
                        <ShoppingCartIcon/>
                    )
                }}/>
            </ProductsStack.Navigator>
        )
    }
}

export default ViewProducts;