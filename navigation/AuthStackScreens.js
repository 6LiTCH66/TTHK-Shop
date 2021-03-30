import React, { Component } from 'react'
import Login from '../screens/Login'
import Signup from '../screens/Signup'
import { createStackNavigator } from '@react-navigation/stack'


const AuthStack = createStackNavigator();


function AuthStackScreens() {
    return(
        <AuthStack.Navigator>
            <AuthStack.Screen name="Login" component={Login}/>
            <AuthStack.Screen name="Signup" component={Signup}/>
        </AuthStack.Navigator>
    )
}

export default AuthStackScreens;
