import React, { Component } from 'react'
import { Button, Text, View, StyleSheet } from 'react-native'

import Icon from 'react-native-vector-icons/Ionicons';

import { createStackNavigator} from '@react-navigation/stack';

import { auth, logout } from '../components/Firebase/firebase';

import ShoppingCartIcon from '../Icons/ShoppingCartIcon';


const MyStack = createStackNavigator();

const Home = () => {
    return(
        <View style={styles.container}>
            <Text>Home Screen</Text>
            <Text>{auth.currentUser.uid}</Text>
            <Button
                title="Logout"
                onPress={() => logout()}
            />
        </View>
    )
} 

class HomeScreen extends React.Component {

    render() {
        return (
            <MyStack.Navigator screenOptions={{
                headerStyle: {
                    backgroundColor: '#832438',
                },
                headerTintColor: '#fff'
            }}>
                <MyStack.Screen name="Profile" component={Home} options={{
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
            </MyStack.Navigator>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    }
})

export default HomeScreen
