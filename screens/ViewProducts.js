import React, {useState} from 'react'
import { View, StyleSheet, Text, FlatList, Dimensions, ImageBackground, TouchableOpacity } from 'react-native'

import { createStackNavigator} from '@react-navigation/stack';

import Icon from 'react-native-vector-icons/Ionicons';

import ShoppingCartIcon from '../Icons/ShoppingCartIcon';

import Products from '../screens/Products';

import ProductDetail from '../screens/ProductDetail';

const ProductsStack = createStackNavigator();

class ViewProducts extends React.Component {
    render() {
        return (
            <ProductsStack.Navigator initialRouteName="Products" screenOptions={{
                headerStyle: {
                    backgroundColor: '#832438',
                },
                headerTintColor: '#fff'
            }}>
                <ProductsStack.Screen name="Products" component={Products} options={{
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

                <ProductsStack.Screen name="ProductDetail" component={ProductDetail} options={{ 
                    title: 'Product Detail',
                    headerBackTitleVisible: false
                }}/>
            </ProductsStack.Navigator>
        )
    }
}

export default ViewProducts;