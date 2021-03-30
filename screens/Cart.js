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
            totalQuantity: 0
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
                    
                })
                this.setState({ totalQuantity: this.state.totalQuantity += child.val().quantity })
                
            })
            console.log(this.state.totalQuantity)
            this.setState({products: prodArray});

        })
    }
    
    renderItemHeader = (info) => (
        <TouchableOpacity onPress={() => alert("On image press")} style={styles.itemHeader}>
            <ImageBackground style={styles.image} source={{
                uri: 'https://in-media.apjonlinecdn.com/catalog/product/cache/b3b166914d87ce343d4dc5ec5117b502/c/0/c06970886.png'
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
    GetTotalQuantity = () => {
        return(
            <View>
                {this.state.products.map((item)=>(
                    <Text>{item}</Text>
                ))}
            </View>
        )
    }
        
    

    renderRightSide = (info) => (
        <View style={styles.renderRight}>
            <Text style={styles.titleText}>{info.name}</Text>
            <Text>${info.price}</Text>
            <View style={styles.bottomItems}>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start'}}>
                    <TouchableOpacity onPress={() => this.increaseItem(info)}>
                        <Icon name="plus-circle" size={25} style={styles.iconLeft}/>
                    </TouchableOpacity>
                </View>
                
                <Text style={styles.textNumber}>{info.quantity}</Text>
                
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
                    <TouchableOpacity onPress={() => this.decreaseItem(info)}>
                        <Icon name="minus-circle" size={25} style={styles.iconRight}/>
                    </TouchableOpacity>
                </View>
                <Text>{this.state.totalQuantity}</Text>
            </View>
            
        </View>
    )

    render(){
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
                                    {this.renderItemHeader()}
                                    {this.renderRightSide(item)}
                                </View>
                            </Card>
                        )}
                    />
                </View>
        )
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
        height: 130,
        width: 170,
        
    },
    renderRight: {
        width: 50,
        flex: 2,
    },
    image: {
        flex: 1,
        width: '100%',
        height: '100%',
        resizeMode: 'contain'
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
        width: 22,
        color: 'red'
    },
    iconLeft: {
        width: 22,
        color: 'green'
    },
    textNumber: {
        fontWeight: 'bold',
        textAlign: 'center'
    }
    
})
