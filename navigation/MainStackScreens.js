import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

import ViewProducts from '../screens/ViewProducts';

import HomeScreen from '../screens/HomeScreen';

import CartScreen from '../screens/CartScreen';

const MainStack = createMaterialBottomTabNavigator();

function MainStackScreens({ navigation }) {
    return(
        <MainStack.Navigator
            initialRouteName="Shop"
            activeColor="#fff"
            barStyle={{ backgroundColor: '#832438' }}
            >
            <MainStack.Screen 
            name="HomeScreen" 
            component={HomeScreen}
            options={{
                tabBarLabel: 'Home',
                tabBarIcon: ({ color }) => (
                <Icon name="ios-home" color={color} size={26} />
                ),
            }}

            />
            <MainStack.Screen 
            name="ViewProducts" 
            component={ViewProducts}
            options={{
                tabBarLabel: 'Products',
                tabBarIcon: ({ color }) => (
                <Icon name="cart" color={color} size={26} />
                ),
            }}
            />
            <MainStack.Screen 
            name="CartScreen" 
            component={CartScreen}
            options={{
                tabBarLabel: 'Cart',
                tabBarIcon: ({ color }) => (
                <Icon name="md-cart-outline" color={color} size={26} />
                ),
            }}
            />
        </MainStack.Navigator>
    )
}
export default MainStackScreens;