import React, { Component } from 'react'
import { Button, Text, View, StyleSheet, Image, NativeModules } from 'react-native'

import Icon from 'react-native-vector-icons/Ionicons';

import { createStackNavigator} from '@react-navigation/stack';

import ShoppingCartIcon from '../Icons/ShoppingCartIcon';

import { fireStorage, auth, db } from '../components/Firebase/firebase'

import * as ImagePicker from 'expo-image-picker';

import { Alert } from 'react-native';

import * as Updates from 'expo-updates';

class Profile extends Component {

    constructor(props){
        super(props);
        this.state= {
            userPhotoUri: ""
        }
    
    }



    onChooseImagePress = async () => {
        let result = await ImagePicker.launchImageLibraryAsync();
        if(!result.cancelled){
            this.uploadImage(result.uri, auth.currentUser.uid)
            .then(async () => {
                Alert.alert("Success"); 
                
                const imageUri = await fireStorage.ref("images/" + auth.currentUser.uid).getDownloadURL();
                db.collection("users").doc(auth.currentUser.uid).update({
                    userPhoto: imageUri
        })
            })
            .catch((error) => {
                Alert.alert(error);
            })
        }
    }

    uploadImage = async (uri, imageName) => {
        const response = await fetch(uri);
        const blob = await response.blob();

        var ref = fireStorage.ref().child("images/" + imageName);
        return ref.put(blob)
        
    }

    render() {
        return (
            <View style={styles.container}>
                <Button title="Choose image..." onPress={this.onChooseImagePress}/>
                <Image source={{ uri: this.state.userPhotoUri !== "" ? this.state.userPhotoUri : undefined }} style={{width: 66, height: 58,}}/>
                <Text>{this.state.userPhotoUri}</Text>
            </View>
        )
    }
}

export default Profile

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    }
})

