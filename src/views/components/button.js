import React from "react";
import {TouchableOpacity,StyleSheet,Text} from "react-native";
import colors from "../../files/Colors";

export const MyButton=( {title, onPress=()=>{}})=>{
    return (
    <TouchableOpacity 
    onPress={onPress}
    activeOpacity={0.5} style={styles.touchOpacity}>
        <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
    );
}

const styles=StyleSheet.create({
    touchOpacity:{ 
        // backgroundColor: "#86C0DD",
        // width:"100%",
        // height:40,
        // alignSelf:"center",
        // justifyContent:"center",
        // alignItems:"center",
        // marginVertical:15
        backgroundColor: "#86C0DD",
        width: 300,
        height: 50,
        borderRadius: 10,
        marginTop: 20,
        padding: 10,
        alignSelf: "center"

    },
    text:{
        fontSize: 15,
        color: "white",
        textAlign:"center",
        textAlignVertical: "center",
        padding: 5,
        fontWeight: "bold"
        
    }
})