import React, {Component, useState, useEffect} from 'react'
import { View, StyleSheet, Text, FlatList, Dimensions, ImageBackground, TouchableOpacity } from 'react-native'

import { Card } from 'react-native-paper';

import Icon from 'react-native-vector-icons/Ionicons';

import { Button } from 'react-native-elements'

import { fire, auth, fireStore } from '../components/Firebase/firebase';



export default class Products extends Component{
    constructor(props){
        super(props);
        this.state = {
            products: [],
            userCart: [],
            uri : ''
        }
        
    }
    componentDidMount(){
        fire.ref('products').on('value', (snapshot)=>{
            var prodArray = []
            snapshot.forEach((child)=>{
                prodArray.push({
                    id: child.key,
                    name: child.val().name,
                    price: child.val().price,
                    quantity: child.val().quantity
                })
            })
            this.setState({products: prodArray})
        })
        fire.ref("cart/"+ auth.currentUser.uid + "/products/").on('value', (snapshot)=>{
            var userArray = []
            snapshot.forEach((child)=>{
                userArray.push({
                    productId: child.key,
                    id: child.val().id,
                    name: child.val().name,
                    price: child.val().price,
                    quantity: child.val().quantity
                })
                
            })
            this.setState({userCart: userArray})
        })

        //const ref = fireStore.child('shop/img.jpg').getDownloadUrl();
        //const url = ref.getDownloadURL();
        //console.log(ref);

    }

    addToCart = (products) => {
        const ItemInCart = this.state.userCart.find(item => products.id === item.id);
        if(ItemInCart){
            fire.ref('cart/'+ auth.currentUser.uid + "/products/" + ItemInCart.productId).update({
                quantity: ItemInCart.quantity += 1
            })
        }
        else{
            fire.ref("cart/"+ auth.currentUser.uid + "/products").push(products);
        }
    
    }
    

    renderItemFooter = (info) => (
        <View style={styles.itemFooter}>
            <Text>${info.price}</Text>
            <Button
                size='small'
                icon={
                    <Icon name='cart' style={styles.iconButton}/>
                }
                onPress={() => this.addToCart(info)}
            />
        </View>
    )
    renderItemHeader = () => (
        <TouchableOpacity onPress={() => alert("On image press")} style={styles.itemHeader}>
            <ImageBackground style={styles.itemHeader} source={{
                uri: 'https://in-media.apjonlinecdn.com/catalog/product/cache/b3b166914d87ce343d4dc5ec5117b502/c/0/c06970886.png'
            }}/>
        </TouchableOpacity>
        
    )

    render(){
        return(
            <View>
                    <FlatList
                        numColumns={2}
                        keyExtractor = {(item) => item.id}
                        data = {this.state.products}
    
                        style={styles.productList}
                        renderItem = {({ item }) => (
                            <Card style={styles.productItem}>
    
                                {this.renderItemHeader()}
                                <View style={{ borderColor: '#E5E3DD', borderBottomWidth: 1, padding: 20, borderTopWidth: 1, }}>
                                    <Text>{item.name}</Text>
                                </View>
    
                                {this.renderItemFooter(item)}
                                
                            </Card>
                        )}
                    />
                </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
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
        maxWidth: Dimensions.get("window").width / 2 - 24,
        backgroundColor: '#fff',
    },
    productList: {
        paddingHorizontal: 8,
        paddingVertical: 5
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
        height: 140,
    }
    
})
