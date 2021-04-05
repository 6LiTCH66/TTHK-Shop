import React, { Component, useEffect } from 'react'
import { Alert } from 'react-native';
import { Text, View, Image } from 'react-native'

import { db, auth, authStateChange } from '../components/Firebase/firebase';

import { Avatar } from 'react-native-paper';


class GetUserPhoto extends Component {
    
    constructor(props){
        super(props);
        this.state= {
            userPhotoUri: "",

        }
        this.getUserUri();
    
    }

    async getUserUri(){
        const subscriber = await db.collection("users").doc(auth.currentUser.uid).onSnapshot(doc => {
            if(!doc.data()){
                this.setState({ userPhotoUri: 'http://www.coogfans.com/uploads/db5902/original/3X/8/1/81173237ffa580ef710b0862fdddaac163274db1.jpeg' })
            } else{
                this.setState({ userPhotoUri: doc.data().userPhoto })
            }
            
        })
        return subscriber; 
    }

    render() {
        return (
            <Avatar.Image source={{uri: this.state.userPhotoUri !== "" ? this.state.userPhotoUri : undefined}} size={50}/>
        )
        
    }
}

export default GetUserPhoto
