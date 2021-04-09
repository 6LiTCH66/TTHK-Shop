import React, { Component } from 'react'
import
{
    Button,
    Text,
    View,
    StyleSheet, 
    Image, 
    TouchableOpacity, 
    TextInput, 
    Alert, 
    Dimensions,   
} from 'react-native'

import Icon from 'react-native-vector-icons/Ionicons';

import { fireStorage, auth, db } from '../components/Firebase/firebase'

import * as ImagePicker from 'expo-image-picker';

import { Avatar, Title, Caption} from 'react-native-paper';

import GetUser from '../functions/GetUser';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

class Profile extends Component {

    constructor(props){
        super(props);
        this.state= {
            userPhotoUri: "",
            name: "",
            secondname: "",
            email: "",
            getUserPhoto: "",
            newName: "",
            newSecondName: ""
        }
        this.getPhoto();
    
    }
    async getPhoto(){
        const subscriber = await db.collection("users").doc(auth.currentUser.uid).onSnapshot(doc => {
            if(!doc.data()){
                this.setState({ getUserPhoto: 'http://www.coogfans.com/uploads/db5902/original/3X/8/1/81173237ffa580ef710b0862fdddaac163274db1.jpeg' })
            } else{
                this.setState({ 
                    getUserPhoto: doc.data().userPhoto,
                    name: doc.data().name,
                    secondname: doc.data().secondname,
                    email: doc.data().email
                })
            }
            
        })
        return subscriber;
    }


    onChooseImagePress = async () => {
        let result = await ImagePicker.launchImageLibraryAsync();
        if(!result.cancelled){
            this.uploadImage(result.uri, auth.currentUser.uid)
            .then(async () => {
                //Alert.alert("Success"); 
                const imageUri = await fireStorage.ref("images/" + auth.currentUser.uid).getDownloadURL();
                db.collection("users").doc(auth.currentUser.uid).update({
                    userPhoto: imageUri
            })
            }).catch((error) => {
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
    onChangeUserData = () => {
        if(this.state.newName && this.state.newSecondName !== ""){
            db.collection("users").doc(auth.currentUser.uid).update({
                name: this.state.newName,
                secondname: this.state.newSecondName
            })
            this.textInput.clear()
            this.textInput2.clear()
        }
        else{
            alert("Name or Secondname cannot be empty");
        }
        
    }
    render() {
        return (
            <KeyboardAwareScrollView style={{ flex: 1}}>  
                <View style={styles.container}>
                    <View style={{alignItems:"center", width: '100%'}}>
                        <View style={{ marginTop: 10 }}>
                            {auth.currentUser ?(
                                <Avatar.Image
                                    source={{
                                        uri: this.state.getUserPhoto !== "" ? this.state.getUserPhoto : undefined
                                    }}
                                    size = {100} 
                                />
                                
                            ):(
                                <Avatar.Image
                                    source={{
                                        uri: 'http://www.coogfans.com/uploads/db5902/original/3X/8/1/81173237ffa580ef710b0862fdddaac163274db1.jpeg'
                                    }}
                                    size = {100} 
                                />
                            )}
                        </View>
                        <View style={{alignItems: 'center'}}>
                            <Title style={styles.userData}>
                                {auth.currentUser !== null ?
                                (<GetUser/>)
                                :(<Text> </Text>)} 
                            </Title>

                            <Caption style={styles.caption}>
                                    {auth.currentUser ?
                                    (<Text>{auth.currentUser.email}</Text>)
                                    :(<Text>Loading...</Text>)}
                            </Caption>
                        </View>
                        <View style={{ position: 'absolute', right: 0, bottom: 0, marginRight: 10 }}>
                            <TouchableOpacity onPress={this.onChooseImagePress}>
                                <Icon name="image-outline" size={50}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.myAccount}>
                        <Text style={styles.myAccountText}>MY ACCOUNT</Text>
                    </View>
                    <View style={styles.myCart}>
                        <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => {this.props.navigation.jumpTo('CartScreen')}}>
                            <Text style={styles.myCartText}>My Cart</Text>
                            <Icon name="arrow-forward" size={20} style={{ position: 'absolute', right: 0 }}/>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.myCart}>
                        <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => {this.props.navigation.navigate('ResetPassword')}}>
                            <Text style={styles.myCartText}>Change password</Text>
                            <Icon name="arrow-forward" size={20} style={{ position: 'absolute', right: 0 }}/>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.myAccount}>
                        <Text style={styles.myAccountText}>USER INFORMATION</Text>
                    </View>

                    <View style={{ marginTop: 15 }}>
                        <Text style={styles.userNameText}>Name</Text>
                        <TextInput style={styles.input} placeholder={this.state.name} autoCorrect={false}
                            onChangeText={(text) => {this.setState({ newName: text })}}
                            ref={input => { this.textInput = input }}
                        />
                    </View>
                    <View style={{ marginTop: 15 }}>
                        <Text style={styles.userNameText}>Secondname</Text>
                        <TextInput style={styles.input} placeholder={this.state.secondname} autoCorrect={false} 
                        onChangeText={(text) => {this.setState({ newSecondName: text })}}
                        ref={input => { this.textInput2 = input }}
                        />
                    </View>
                    
                    <View>
                        <TouchableOpacity style={styles.button} onPress={this.onChangeUserData}>
                                <Text style={styles.buttonText}>Update</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                
            </KeyboardAwareScrollView>
        )
    }
}

export default Profile

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 100 / 2,
        overflow: "hidden",
    },
    userData: {
        fontSize: 16,
        marginTop: 10,
        fontWeight: 'bold',
    },
    updateUser: {
        flexDirection: 'row',
        marginTop: 100,
        marginLeft: 10
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
    myAccount: {
        backgroundColor: '#832438',
        marginTop: 20,
        width: Dimensions.get("window").width - 25,
        height:50,
        borderRadius: 7,
        justifyContent: 'center'
    },
    myAccountText:{
        fontSize: 17,
        fontWeight: 'bold',
        color: '#fff',
        marginLeft: 20
    },
    myCart:{ 
        //backgroundColor: 'blue',
        marginTop: 20,
        width: Dimensions.get("window").width - 60,
        height: 40,
        justifyContent: 'center',
        borderBottomColor: '#888',
        borderBottomWidth: 2,
    },
    myCartText: {
        fontSize: 17,
        fontWeight: 'bold',
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
        marginBottom: 5
    },
    userNameText:{
        marginBottom: 5,
        fontSize: 20,
        marginLeft: 5
    },
    caption: {
        fontSize: 12,
        lineHeight: 15,
        
    },
})

