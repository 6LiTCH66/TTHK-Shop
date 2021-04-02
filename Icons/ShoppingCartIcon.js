import React from "react";
import {
    View,
    Text,
    StyleSheet
} from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import { fire, auth } from '../components/Firebase/firebase';


export default class ShoppingCartIcon extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            totalQuantity: 0
        }
    }
    componentDidMount(){
        fire.ref("cart/"+ auth.currentUser.uid + "/products").on('value', (snapshot)=>{
            var countQuantity = 0;
            snapshot.forEach((child)=>{
                countQuantity += child.val().quantity;
                
            })
            this.setState({ totalQuantity: countQuantity })
        })
    }

    render(){
        return(
            <View style={{ padding:5 }}>
                <View style={styles.iconStyle}>
                    <Text style={{color: 'white', fontWeight: 'bold'}}>{this.state.totalQuantity}</Text>
                </View>
                <Icon name="ios-cart" size={30}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    iconStyle: {
        position: 'absolute',
        height: 30,
        width: 30,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        borderTopRightRadius: 15,
        borderTopLeftRadius: 15,
        backgroundColor: 'rgba(95, 197, 123,0.8)',
        justifyContent: 'center',
        alignItems: 'center',
        right: 15, bottom:15,
        zIndex: 2000
    }
})
