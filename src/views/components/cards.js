import React, { useState } from "react"
import {View,Text,StyleSheet,Image} from "react-native"
import colors from "../../files/Colors";



const Card=({title,imageSource,color})=>{

    
    const source=imageSource;
    return(
        <View style={[styles.cardView]}>
            <Image style={[styles.image]} source={imageSource} resizeMode="contain"></Image>
            <Text style={styles.text} >{title}</Text>
        </View>
    )
};

const styles=StyleSheet.create({
    cardView:{
        flex:1,
        flexDirection:"column",
        borderColor:'#86C0DD',
        borderWidth:2,
        height:150,
        width:"100%",
        marginTop:10,
        marginBottom:10
    },
    image:{
        height:"80%",
        width:"100%"
    },

    text:{
        fontWeight:"bold",
        fontSize:20,
        color:colors.darkGreyBlue,
        textAlign:"center",
        height:"20%",
        width:"100%"
    }
 

});


export default Card;