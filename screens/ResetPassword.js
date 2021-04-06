import React, { Component } from 'react'
import { Alert } from 'react-native';
import { Text, View, StyleSheet, TextInput, Dimensions, TouchableOpacity } from 'react-native';

import { cred, auth } from '../components/Firebase/firebase'

export class ResetPassword extends Component {
    constructor(props){
        super(props);
        this.state = { 
            currentPassword: "",
            newPassword: ""
        }
    }
    reauthenticate = (currentPassword) => {
        var user = auth.currentUser;
        var credUser = cred(user.email, currentPassword);
        return user.reauthenticateWithCredential(credUser);
    }

    onChangePasswordPress = () =>{
        this.reauthenticate(this.state.currentPassword).then(() =>{
            var user = auth.currentUser;
            user.updatePassword(this.state.newPassword).then(() => {
                Alert.alert("Password was changed");
                this.textInput.clear()
                this.textInput2.clear()
            }).catch((error) => {
                Alert.alert(error.message)
            })
        }).catch((error)=> {
            Alert.alert(error.message)
        }) 
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={{ marginTop: 190 }}>
                    <TextInput style={styles.input} value={this.state.currentPassword}
                        placeholder="Current Password" autoCapitalize="none" secureTextEntry={true}
                        onChangeText={(text) => {this.setState({ currentPassword: text })}}
                        ref={input => { this.textInput = input }}
                    />
                    <TextInput style={styles.input} value={this.state.newPassword}
                        placeholder="New Password" autoCapitalize="none" secureTextEntry={true}
                        onChangeText={(text) => {this.setState({ newPassword: text })}}
                        ref={input => { this.textInput2 = input }}
                    />
                    <TouchableOpacity style={styles.button} onPress={this.onChangePasswordPress}>
                            <Text style={styles.buttonText}>Change Password</Text>
                    </TouchableOpacity>
                </View>
                
            </View>
            
        )
    }
}

export default ResetPassword;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        //justifyContent: 'center',
        //marginTop: 190
    },
    input: {
        width: Dimensions.get("window").width - 60,
        height: 40,
        backgroundColor: '#fff',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 10, 
        fontSize: 16,
        marginBottom: 5,
    },
    button: {
        marginTop: 20,
        marginBottom: 20,
        paddingVertical: 5,
        alignItems: 'center',
        backgroundColor: '#832438',
        borderColor: '#832438',
        borderWidth: 1,
        borderRadius: 5,
        width: 200,
        justifyContent: 'center',
        alignSelf: 'center',
    },
    buttonText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
    },
})
