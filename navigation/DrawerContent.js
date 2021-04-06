import React, { useState, useEffect } from 'react';
import {View, StyleSheet, Text, NativeModules } from 'react-native';
import { Avatar, Title, Drawer, Caption,} from 'react-native-paper';

import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';

import { logout } from '../components/Firebase/firebase'

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { auth, db, fireStorage } from '../components/Firebase/firebase';

import GetUser from '../functions/GetUser';
import GetUserPhoto from '../functions/GetUserPhoto';

export default function DrawerContent(props) {

    return(
        <View style={{flex:1}}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                    <View style={styles.userInfoSection}>
                        <View style={{flexDirection: 'row', marginTop: 15}}>
                            {auth.currentUser ?(
                                <GetUserPhoto/>
                                
                            ):(
                                <Avatar.Image
                                source={{
                                    uri: 'http://www.coogfans.com/uploads/db5902/original/3X/8/1/81173237ffa580ef710b0862fdddaac163274db1.jpeg'
                                }}
                                size = {50}
                            />
                            )}
                            <View style={{marginLeft:15, flexDirection: 'column'}}>
                                    <Title style={styles.title}>
                                        {auth.currentUser ?(
                                            <Text>
                                                <GetUser/>
                                            </Text> 
                                                
                                            ):(
                                                <Text></Text>
                                            )} 
                                    </Title>
                                    <Caption style={styles.caption}>
                                    {auth.currentUser ? (
                                        <Text>{auth.currentUser.email}</Text>
                                    ):(
                                        <Text> </Text>
                                    )
                                    }
                                    </Caption>
                            </View>
                        </View>
                    </View>
                    <Drawer.Section style={styles.drawerSection}>
                        <DrawerItem
                            icon={({color, size}) => (
                                <Icon 
                                    name='account-cowboy-hat'
                                    color = {color}
                                    size = {size}
                                />
                            )}
                            label="My profile"
                            onPress = {() => {props.navigation.navigate("HomeScreen")}}
                        />

                        <DrawerItem
                            icon={({color, size}) => (
                                <Icon 
                                    name='shopping'
                                    color = {color}
                                    size = {size}
                                />
                            )}
                            label="Products"
                            onPress = {() => {props.navigation.navigate("ViewProducts")}}
                        />

                        <DrawerItem
                            icon={({color, size}) => (
                                <Icon 
                                    name='cart'
                                    color = {color}
                                    size = {size}
                                />
                            )}
                            label="My cart"
                            onPress = {() => {props.navigation.navigate("CartScreen")}}
                        />
                        
                    </Drawer.Section>
                </View>
            </DrawerContentScrollView>
            <Drawer.Section style={styles.bottomDrawerSection}>
                <DrawerItem
                    icon={({color, size}) => (
                        <Icon 
                            name='exit-to-app'
                            color = {color}
                            size = {size}
                        />
                    )}
                    label="Sign Out"
                    onPress = {() => {logout().then(props.navigation.closeDrawer).then()}}
                />
            </Drawer.Section>
        </View>
    );
}

const styles = StyleSheet.create({
    drawerContent: {
      flex: 1,
    },
    userInfoSection: {
      paddingLeft: 20,
    },
    title: {
      fontSize: 16,
      marginTop: 3,
      fontWeight: 'bold',
    },
    caption: {
      fontSize: 14,
      lineHeight: 14,
    },
    row: {
      marginTop: 20,
      flexDirection: 'row',
      alignItems: 'center',
    },
    section: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 15,
    },
    paragraph: {
      fontWeight: 'bold',
      marginRight: 3,
    },
    drawerSection: {
      marginTop: 15,
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1
    },
    preference: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 12,
      paddingHorizontal: 16,
    },
  });