import React, {Component, useState} from 'react'
import { View, StyleSheet, Text, FlatList, Dimensions, ImageBackground, TouchableOpacity } from 'react-native'

import { Card } from 'react-native-paper';

import Icon from 'react-native-vector-icons/FontAwesome'

import { fire, auth } from '../components/Firebase/firebase';


export default class Cart extends Component {
    constructor(props){
        super(props);
        this.state = {
            products: [],
        }
        
    }
    componentDidMount(){
        fire.ref("cart/"+ auth.currentUser.uid + "/products").on('value', (snapshot)=>{
            var prodArray = []
            snapshot.forEach((child)=>{
                prodArray.push({
                    productId: child.key,
                    id: child.val().id,
                    name: child.val().name,
                    price: child.val().price,
                    quantity: child.val().quantity,
                    image: child.val().image,
                    description: child.val().description
                })
                
            })
            this.setState({products: prodArray});

        })
    }
    
    renderItemHeader = (info) => (
        <TouchableOpacity onPress={() => alert("On image press")} style={styles.itemHeader}>
            <ImageBackground style={styles.image} source={{
                uri: info.image
            }}/>
        </TouchableOpacity>
    )
    
    increaseItem = (info) => {
        fire.ref('cart/'+ auth.currentUser.uid + "/products/" + info.productId).update({
            quantity: info.quantity += 1
        })  
    }

    decreaseItem = (info) => {
        if(info.quantity > 1){
            fire.ref('cart/'+ auth.currentUser.uid + "/products/" + info.productId).update({
                quantity: info.quantity -= 1
            })
        }
    }
    deleteItem = (info) => {
        fire.ref('cart/' + auth.currentUser.uid + '/products/' + info.productId).remove();
    }

    renderRightSide = (info) => (
        <View style={styles.renderRight}>
            <Text style={styles.titleText}>{info.name}</Text>
            <Text style={{ marginBottom: 10 }}>${info.price}</Text>
            <View style={styles.bottomItems}>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start'}}>
                    <TouchableOpacity onPress={() => this.increaseItem(info)}>
                        <Icon name="plus-circle" size={30} style={styles.iconLeft}/>
                    </TouchableOpacity>
                </View>
                
                <Text style={styles.textNumber}>{info.quantity}</Text>
                
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
                    <TouchableOpacity onPress={() => this.decreaseItem(info)}>
                        <Icon name="minus-circle" size={30} style={styles.iconRight}/>
                    </TouchableOpacity>
                </View>
            </View>
            <Text style={styles.descText}>{info.description}</Text>

            <View style={styles.renderLeft}>
                <View>
                    <TouchableOpacity onPress={() => this.deleteItem(info)}>
                        <Icon name="trash" size={45}/>
                    </TouchableOpacity>
                </View>
            </View>
            
        </View>

    )


    render(){
        if(this.state.products.length > 0){
            return(
                <View>
                    <FlatList
                        numColumns={1}
                        keyExtractor = {(item) => item.id}
                        data = {this.state.products}
    
                        style={styles.productList}
                        renderItem = {({ item }) => (
                            <Card style={styles.productItem}>
                                <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                                    {this.renderItemHeader(item)}
                                    {this.renderRightSide(item)}
                                    
                                </View>
                            </Card>
                        )}
                    />
                    </View>
            )
        }
        else{
            return(
                <Text style={styles.noItems}>There are currently no items in your cart!</Text>
            )
        }
        
    }
}

const styles = StyleSheet.create({
    item: {
        marginTop: 24,
        padding: 30,
        backgroundColor: 'pink',
        fontSize: 24,
        marginHorizontal: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    productItem : {
        flex: 1,
        margin: 8,
        maxWidth: Dimensions.get("window").width,
        backgroundColor: '#fff',
    },
    productList: {
        paddingHorizontal: 8,
        paddingVertical: 5,
        height: '100%',
    },
    itemFooter: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 10,
        
      },
    iconButton: {
        paddingHorizontal: 0,
    },
    itemHeader: {
        height: 210,
        resizeMode: "contain",
        width: 170,
        
    },
    renderRight: {
        width: 50,
        flex: 2,
    },
    image: {
        height: 210,
        resizeMode: "contain",
    },
    titleText: {
        fontSize: 20,
        fontWeight: 'bold',
        paddingBottom: 15,
    },
    bottomItems: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: '50%',
        alignItems: 'center',
        position: 'absolute',
        bottom: 0,
        justifyContent: 'space-between'
    },
    iconRight: {
        color: 'red',
    },
    iconLeft: {
        color: 'green',
    },
    textNumber: {
        fontWeight: 'bold',
        textAlign: 'center'
    },
    renderLeft:{
        position: 'absolute',
        right: 0,
        marginRight: 10,
        marginTop: 75
    },
    descText : {
        width: 110,
        fontSize: 11,
        fontWeight: '400',
        color: "#888",
        textAlign: 'left',
        marginLeft: 7
    },
    noItems: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 30,
        marginTop: Dimensions.get("window").height / 3
    }
    
})
