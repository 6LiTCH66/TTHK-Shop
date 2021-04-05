import React, { Component } from 'react'
import { Button } from 'react-native';
import { View, ImageBackground, SafeAreaView, StyleSheet, Text, TouchableOpacity, Dimensions } from 'react-native'

export default class ProductDetail extends Component{
  constructor(props){
    super(props);
    this.state = {

    } 
  }

  renderHeader = (info) => (
    <View style={styles.header}>
    <ImageBackground style={styles.image} source={{ uri: info.image }} />
    <View style={styles.detailsContainer}>
      <Text style={{ fontWeight: "bold", fontSize: 20 }}>
        {info.name}
      </Text>
      <Text style={styles.price}>
          ${info.price}
      </Text>
      <Text style={styles.description} >
        {info.description}
      </Text>
      <View style={styles.actionContainer}>
        <TouchableOpacity onPress={() => alert('buy')} style={styles.buttonStyle}>
          <Text style={styles.textStyle}>Buy</Text>
        </TouchableOpacity>
      </View>
    </View>
  </View>
  )

  render() {
    const {data} = this.props.route.params;
    return(
        <React.Fragment>
          <SafeAreaView>
            {this.renderHeader(data)}
          </SafeAreaView>
        </React.Fragment>
    )
  }

}

const styles = StyleSheet.create({
      header: {
        marginBottom: 8,
      },
      image: {
        height: 340,
        width: "100%",
      },
      detailsContainer: {
        paddingVertical: 24,
        paddingHorizontal: 16,
      },
      price: {
        position: "absolute",
        top: 24,
        right: 16,
        fontSize: 17,
      },
      description: {
        marginVertical: 16,
        color: "#888"
      },
      actionContainer: {
        flexDirection: "row",
        marginHorizontal: -8,
        marginTop: 24,
      },
      buttonStyle: {
        alignItems: "center",
        backgroundColor: "blue",
        padding: 10,
        width: Dimensions.get("window").width / 3,
        borderRadius: 5,
      },
      textStyle: {
        color: '#FFFF',
        fontSize: 20,
        fontWeight: "bold"
      }
});
