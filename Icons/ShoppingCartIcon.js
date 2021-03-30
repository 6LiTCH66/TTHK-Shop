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

        }
    }

    render(){
        return(
            <View style={{ padding:5 }}>
            <View style={{ 
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

            }}>
            <Text style={{color: 'white', fontWeight: 'bold'}}>0</Text>
            </View>
                <Icon name="ios-cart" size={30}/>
            </View>
        )
    }
}
