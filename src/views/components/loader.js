import React from "react";
import {View,Text,StyleSheet, useWindowDimensions, ActivityIndicator} from "react-native";
import colors from "../../files/Colors";

const Loader=({visible})=>{
    const {height,width}=useWindowDimensions()
    return (visible && 
    <View style={[styles.container,{height,width}]}>
        { <View style={styles.loader} >
            <ActivityIndicator size="large" color={colors.blue}/>
            <Text style={styles.text}>Loading.....</Text>
        </View> }

    </View>
    )
}

const styles=StyleSheet.create({
container:{
    position:"absolute",
    zIndex:10,
    backgroundColor:"rgba(0,0,0,0.7)",
    justifyContent:"center"
},
loader:{
    height:"10%",
    backgroundColor:colors.white,
    marginHorizontal:"20%",
    borderRadius:5,
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"center",
    paddingHorizontal:"10%"
},
text:{
    marginLeft:"10%",
    fontSize:14,
    color:colors.greyBlue,
    fontWeight:"bold"
}
})
export default Loader;
