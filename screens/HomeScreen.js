import React, { Component } from 'react'
import { Button, Text, View, StyleSheet, Image } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import { createStackNavigator} from '@react-navigation/stack';
import ShoppingCartIcon from '../Icons/ShoppingCartIcon';
import { fireStorage, auth, db } from '../components/Firebase/firebase'
import * as ImagePicker from 'expo-image-picker';
import { Alert } from 'react-native';
import GetUserPhoto from '../functions/GetUserPhoto';
import Profile from '../screens/Profile';
import CartScreen from '../screens/CartScreen';

import ResetPassword from '../screens/ResetPassword';



const MyStack = createStackNavigator();

class HomeScreen extends React.Component {
    render() {
        return (
            <MyStack.Navigator screenOptions={{
                headerStyle: {
                    backgroundColor: '#832438',
                },
                headerTintColor: '#fff'
            }}>
                <MyStack.Screen name="Profile" component={Profile} options={{
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
                <MyStack.Screen name="Cart" component={CartScreen}/>
                <MyStack.Screen name="ResetPassword" component={ResetPassword}/>
            </MyStack.Navigator>
        )
    }
}
export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    }
})

