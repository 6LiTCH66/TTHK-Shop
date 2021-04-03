import React, {useState} from 'react'
import { TouchableOpacity } from 'react-native'

import { createStackNavigator} from '@react-navigation/stack';

import Icon from 'react-native-vector-icons/Ionicons';

import ProductDetail from '../screens/ProductDetail';


const ProductsStack = createStackNavigator();

class ProductDetailNav extends React.Component {
    render() {
        return (
            <ProductsStack.Navigator screenOptions={{
                headerStyle: {
                    backgroundColor: '#FFF',
                },
                headerTintColor: 'black'
                }}>
                <ProductsStack.Screen name="Products Detail" component={ProductDetail} options={{
                    headerLeft: () => (
                        <Icon.Button 
                        name="arrow-back-outline" 
                        size={25} 
                        backgroundColor="#FFF"
                        color="black"
                        onPress={() => {this.props.navigation.goBack()}}
                        ></Icon.Button>
                    )
                }}/>
            </ProductsStack.Navigator>
        )
    }
}

export default ProductDetailNav;