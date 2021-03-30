import React, { Component, useState, useEffect } from 'react'
import { StyleSheet } from 'react-native'
//import { Divider, Drawer, DrawerItem } from "@ui-kitten/components";
import { createDrawerNavigator } from "@react-navigation/drawer";


import {authStateChange} from '../components/Firebase/firebase';

import DrawerContent from '../navigation/DrawerContent';

import MainStackScreens from '../navigation/MainStackScreens';
import AuthStackScreens from '../navigation/AuthStackScreens';


const Drawer = createDrawerNavigator();

const DrawerNavigation = ( props, navigation ) =>{
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState();

    function onAuthStateChanged(user) {
        setUser(user);
        if (initializing) setInitializing(false);
    }

    useEffect(() => {
        const subscriber = authStateChange(onAuthStateChanged);
        return subscriber; 
    }, []);

    if (initializing) return null;

    return(
        <Drawer.Navigator drawerContent= {props => <DrawerContent{...props}/>}>
            
            {!user ? (
                <Drawer.Screen name="Auth" component={AuthStackScreens} options={{ gestureEnabled: false }}/>
            ):(
                <Drawer.Screen name="Home" component={MainStackScreens}/>
            )}
            
             
        </Drawer.Navigator>
    )
}

const styles = StyleSheet.create({
    header: {
      height: 250,
      flexDirection: "row",
      alignItems: "center",
    },
  });

export default DrawerNavigation
