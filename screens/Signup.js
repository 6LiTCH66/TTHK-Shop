import React, { Component } from 'react'
import { Text, View, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import { registerWithEmail } from '../components/Firebase/firebase';

import { db } from  '../components/Firebase/firebase';

class Signup extends React.Component {

    state = {email: '', password: '', name: '', secondname: ''}

    handleSingUp = () => {
        const {email, password, name, secondname } = this.state;

        registerWithEmail(email, password)
        .then(function(data){
            db.collection("users").doc(data.user.uid).set({
                name: name,
                secondname: secondname,
                email: email
            })
        })
        .catch(function(error){
            console.log('error', error)
        })
        
    }

    render() {
        return (
            <View style={styles.container}>
                    <TextInput
                        style={styles.inputBox}
                        value={this.state.name}
                        onChangeText={name => this.setState({ name })}
                        placeholder='Name'
                    />

                    <TextInput
                        style={styles.inputBox}
                        value={this.state.secondname}
                        onChangeText={secondname => this.setState({ secondname })}
                        placeholder='Second name'
                    />

                    <TextInput
                        style={styles.inputBox}
                        value={this.state.email}
                        onChangeText={email => this.setState({ email })}
                        placeholder='Email'
                        autoCapitalize='none'
                    />
                    <TextInput
                        style={styles.inputBox}
                        value={this.state.password}
                        onChangeText={password => this.setState({ password })}
                        placeholder='Password'
                        secureTextEntry={true}
                    />
                    <TouchableOpacity style={styles.button} onPress={this.handleSingUp}>
                        <Text style={styles.buttonText}>Signup</Text>
                    </TouchableOpacity>
                </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    inputBox: {
        width: '85%',
        margin: 10,
        padding: 15,
        fontSize: 16,
        borderColor: '#d3d3d3',
        borderBottomWidth: 1,
        textAlign: 'center'
    },
    button: {
        marginTop: 30,
        marginBottom: 20,
        paddingVertical: 5,
        alignItems: 'center',
        backgroundColor: '#832438',
        borderColor: '#832438',
        borderWidth: 1,
        borderRadius: 5,
        width: 200
    },
    buttonText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff'
    },
    buttonSignup: {
        fontSize: 12
    }
})

export default Signup