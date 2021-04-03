import React, { useState } from 'react';
import {View, StyleSheet, Text} from 'react-native';
import { Avatar, Title, Drawer, Caption,} from 'react-native-paper';

import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';

import { logout } from '../components/Firebase/firebase'

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { auth } from '../components/Firebase/firebase';

import GetUser from '../functions/GetUser';


export default function DrawerContent(props) {
    return(
        <View style={{flex:1}}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                    <View style={styles.userInfoSection}>
                        <View style={{flexDirection: 'row', marginTop: 15}}>
                            <Avatar.Image
                                source={{
                                    uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTm1vmQA9FgyAsC8zK9N0NPEBo03gYETUB97A&usqp=CAU'
                                }}
                                size = {50}
                            />
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
                                        <Text>  </Text>
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